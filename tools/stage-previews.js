#!/usr/bin/env node
// Bake the stage select's preview pictures: every stage as it looks in a
// match (painting, props, conveyors, vats, lighting), with no fighters and
// no HUD, at 1920x1080. Writes assets/stages.js (window.__STAGES__).
//
//   node tools/stage-previews.js            (after python3 tools/build.py)
//
// Needs Playwright with a Chromium build.
const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");
const ROOT = path.resolve(__dirname, "..");
(async () => {
  // A copy of the game that exposes its engine and camera to the page.
  let html = fs
    .readFileSync(path.join(ROOT, "index.html"), "utf8")
    .replace("      e = new pt(a),", "      e = (window.__eng = new pt(a)),")
    .replace("      t = new xt(),", "      t = (window.__fx = new xt()), __Ax = (window.__A = A),");
  const tmp = path.join(require("os").tmpdir(), "pb-stage-previews.html");
  fs.writeFileSync(tmp, html);
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 1.5 });
  await p.goto("file://" + tmp);
  await p.waitForTimeout(4000);
  await p.keyboard.press("Enter"), await p.waitForTimeout(900);
  await p.keyboard.press("Enter"), await p.waitForTimeout(1200);
  const n = await p.evaluate(() => window.__eng && 8);
  const out = {};
  for (let c = 0; c < n; c++) {
    await p.evaluate((c) => {
      const A = window.__A;
      (A.arena = c), (A.gameMode = 2), (A.items = 0);
      const e = window.__eng;
      e.startMatch("ffa", ["charizard"], ["snorlax", "lucario", "venusaur"]);
      window.__ui.screen = "play";
      // No fighters in the picture: idle and hidden from the start, so
      // nothing fights and leaves marks on the floor either.
      clearInterval(window.__hide);
      window.__hide = setInterval(
        () => e.players.forEach((q) => ((q.brain = null), (q.hidden = !0), (q.out = !0), (q.state = "faint"))),
        5,
      );
    }, c);
    await p.waitForTimeout(3500);
    out[c] = await p.evaluate(() => {
      const e = window.__eng, f = window.__fx;
      // Fighters out of sight, camera on the whole arena.
      f.follow = () => {}, f.computeView = () => {}, (f.view = { z: 1, ox: 0, oy: 0 });
      return new Promise((res) =>
        setTimeout(() => {
          const c = document.createElement("canvas");
          (c.width = 1920), (c.height = 1080);
          const g = c.getContext("2d"),
            bg = document.getElementById("bg"),
            gm = document.getElementById("game");
          bg && bg.width && g.drawImage(bg, 0, 0, 1920, 1080);
          (g.imageSmoothingEnabled = !1), g.drawImage(gm, 0, 0, 1920, 1080);
          res(c.toDataURL("image/webp", 0.86));
        }, 700),
      );
    });
    console.log("stage", c, Math.round(out[c].length / 1365), "KB");
  }
  await b.close();
  const js =
    "// Stage select previews: each stage as it looks in a match, no fighters\n" +
    "// (built by tools/stage-previews.js).\n" +
    "window.__STAGES__=" + JSON.stringify(out) + ";\n";
  fs.writeFileSync(path.join(ROOT, "assets/stages.js"), js);
  console.log("wrote assets/stages.js", Math.round(js.length / 1024), "KB");
})();
