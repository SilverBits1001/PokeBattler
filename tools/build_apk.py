#!/usr/bin/env python3
"""Build the Android APK (android/) around the built game (index.html).

  python3 tools/build.py && python3 tools/build_apk.py

Writes dist/PocketBrawl.apk: a full-screen landscape WebView that runs the
whole game from the APK, offline (online play still works with internet).
The built-in controller is read natively (MainActivity.smali) and handed to
the page through window.AndroidPad; the shim below turns that into a
standard gamepad, so the game's own controller code needs no changes.

Tools (downloaded once into .apk-tools/, git-ignored): Apktool, which carries
aapt2 and the smali assembler, and uber-apk-signer (zipalign + v1/v2/v3
signing with its debug key, so later builds install as updates).
"""
import io, os, shutil, subprocess, sys, urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "android"
TOOLS = ROOT / ".apk-tools"
BUILD = ROOT / ".apk-build"
OUT = ROOT / "dist" / "PocketBrawl.apk"
VERSION_CODE = int(os.environ.get("APK_VERSION_CODE", "1"))
VERSION_NAME = os.environ.get("APK_VERSION_NAME", "1.0")
JARS = {
    "apktool.jar": "https://github.com/iBotPeaches/Apktool/releases/download/v2.10.0/apktool_2.10.0.jar",
    "uber-apk-signer.jar": "https://github.com/patrickfav/uber-apk-signer/releases/download/v1.3.0/uber-apk-signer-1.3.0.jar",
}

# Runs before the game: window.AndroidPad (the native controller) becomes
# navigator.getGamepads()[0], a standard-mapping pad. The fullscreen button
# is hidden: the app is always full screen.
SHIM = """<script>
(function () {
  var P = window.AndroidPad;
  if (!P) return;
  var pad = { id: "Built-in controller", index: 0, connected: true,
    mapping: "standard", timestamp: 0, buttons: [], axes: [0, 0, 0, 0] };
  for (var i = 0; i < 17; i++) pad.buttons.push({ pressed: false, touched: false, value: 0 });
  var at = -1;
  navigator.getGamepads = function () {
    var now = performance.now();
    if (now - at > 2) {
      at = now;
      var a = String(P.state()).split(","), m = +a[0] || 0;
      for (var i = 0; i < 17; i++) {
        var on = !!(m & (1 << i));
        pad.buttons[i].pressed = pad.buttons[i].touched = on;
        pad.buttons[i].value = on ? 1 : 0;
      }
      // Analog triggers: their travel, and pressed past a third.
      [[6, +a[5] || 0], [7, +a[6] || 0]].forEach(function (t) {
        var b = pad.buttons[t[0]];
        if (t[1] > b.value) b.value = t[1];
        b.pressed = b.touched = b.pressed || t[1] > 0.35;
      });
      pad.axes[0] = +a[1] || 0; pad.axes[1] = +a[2] || 0;
      pad.axes[2] = +a[3] || 0; pad.axes[3] = +a[4] || 0;
      pad.timestamp = now;
    }
    return [pad, null, null, null];
  };
})();
</script>
<style>#fs{display:none!important}</style>
"""


def fetch_tools():
    TOOLS.mkdir(exist_ok=True)
    for name, url in JARS.items():
        f = TOOLS / name
        if not f.exists():
            print("downloading", name)
            with urllib.request.urlopen(url, timeout=120) as r:
                f.write_bytes(r.read())


def icons(dst):
    """Launcher icons from the title screen's portraits and logo colours."""
    from PIL import Image, ImageDraw
    sizes = {"mdpi": 48, "hdpi": 72, "xhdpi": 96, "xxhdpi": 144, "xxxhdpi": 192}
    src = ROOT / "android" / "icon.png"
    base = Image.open(src).convert("RGBA")
    for d, s in sizes.items():
        p = dst / "res" / f"mipmap-{d}"
        p.mkdir(parents=True, exist_ok=True)
        base.resize((s, s), Image.LANCZOS).save(p / "ic_launcher.png")


def main():
    if not (ROOT / "index.html").exists():
        sys.exit("Build the game first: python3 tools/build.py")
    fetch_tools()
    if BUILD.exists():
        shutil.rmtree(BUILD)
    shutil.copytree(SRC, BUILD, ignore=shutil.ignore_patterns("icon.png", "README.md"))
    icons(BUILD)
    page = (ROOT / "index.html").read_text(encoding="utf-8")
    i = page.index("<head>") + len("<head>")
    (BUILD / "assets").mkdir(exist_ok=True)
    (BUILD / "assets" / "index.html").write_text(page[:i] + "\n" + SHIM + page[i:], encoding="utf-8")
    (BUILD / "apktool.yml").write_text(
        f"""!!brut.androlib.meta.MetaInfo
apkFileName: PocketBrawl.apk
compressionType: false
doNotCompress:
- resources.arsc
isFrameworkApk: false
packageInfo:
  forcedPackageId: '127'
  renameManifestPackage: null
sdkInfo:
  minSdkVersion: '24'
  targetSdkVersion: '33'
sharedLibrary: false
sparseResources: false
unknownFiles: {{}}
usesFramework:
  ids:
  - 1
  tag: null
version: 2.10.0
versionInfo:
  versionCode: '{VERSION_CODE}'
  versionName: '{VERSION_NAME}'
""")
    unsigned = BUILD.parent / ".apk-unsigned.apk"
    subprocess.run(["java", "-jar", str(TOOLS / "apktool.jar"), "b", str(BUILD), "-o", str(unsigned), "-f"], check=True)
    signed_dir = BUILD.parent / ".apk-signed"
    if signed_dir.exists():
        shutil.rmtree(signed_dir)
    subprocess.run(["java", "-jar", str(TOOLS / "uber-apk-signer.jar"), "--apks", str(unsigned), "-o", str(signed_dir)], check=True)
    out = next(signed_dir.glob("*.apk"))
    OUT.parent.mkdir(exist_ok=True)
    shutil.copy(out, OUT)
    unsigned.unlink()
    print("wrote", OUT, f"{OUT.stat().st_size / 1e6:.1f} MB")


main()
