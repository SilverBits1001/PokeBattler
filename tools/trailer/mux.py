"""Frames + music -> trailer.mp4. Usage: python3 mux.py framesdir out.mp4"""
import json, subprocess, sys, glob, os
d, out = sys.argv[1], sys.argv[2]
here = os.path.dirname(os.path.abspath(__file__))
marks = dict(json.load(open(f'{d}/marks.json')))
n = len(glob.glob(f'{d}/*.jpg'))
fps = 30
T = n / fps
cut = marks['modes'] / fps          # title theme -> battle theme
fade = 2.5
af = (
    f"[1:a]atrim=0:{cut + 0.6},afade=t=out:st={cut - 0.4}:d=1.0,asetpts=PTS-STARTPTS[a1];"
    f"[2:a]atrim=0:{T - cut},afade=t=in:st=0:d=0.4,afade=t=out:st={T - cut - fade}:d={fade},"
    f"adelay={int(cut * 1000)}|{int(cut * 1000)},asetpts=PTS-STARTPTS[a2];"
    f"[a1][a2]amix=inputs=2:normalize=0,volume=0.9,atrim=0:{T}[a]"
)
subprocess.run([
    'ffmpeg', '-y', '-loglevel', 'error',
    '-framerate', str(fps), '-i', f'{d}/%05d.jpg',
    '-i', f'{here}/title.mp3', '-i', f'{here}/rse.mp3',
    '-filter_complex', af, '-map', '0:v', '-map', '[a]',
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '18', '-pix_fmt', 'yuv420p',
    '-vf', f'fade=t=in:st=0:d=0.5,fade=t=out:st={T - 0.8}:d=0.8',
    '-c:a', 'aac', '-b:a', '192k', '-movflags', '+faststart', out,
], check=True)
print(out, f'{T:.1f}s', n, 'frames')
