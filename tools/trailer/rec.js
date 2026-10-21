// Trailer capture: drives the game on a virtual clock (30 fps, two sim ticks
// per frame) and saves every frame. Usage: node rec.js page.html outdir [segments]
const { chromium } = require('playwright');
const fs = require('fs');
const [, , html, out, only] = process.argv;
fs.mkdirSync(out, { recursive: true });
let N = 0;
const marks = [];

(async () => {
  const b = await chromium.launch({ args: ['--autoplay-policy=no-user-gesture-required'] });
  const p = await b.newPage({ viewport: { width: 1280, height: 720 } });
  const errs = [];
  p.on('pageerror', (e) => errs.push(e.stack));
  await p.addInitScript(() => {
    let T = 0;
    const q = [];
    performance.now = () => T;
    window.requestAnimationFrame = (cb) => (q.push(cb), q.length);
    window.__frame = (ms) => {
      T += ms;
      for (const f of q.splice(0)) f(T);
    };
    localStorage.clear();
  });
  await p.goto('file://' + html);
  // Let the assets decode (real time), with the clock idling.
  for (let i = 0; i < 40; i++) {
    await p.evaluate(() => window.__frame(16.7));
    await p.waitForTimeout(100);
  }
  await p.addStyleTag({
    content: `#fs{display:none!important}
#cap{position:fixed;inset:0;pointer-events:none;z-index:99;font-family:"Lilita One",sans-serif;color:#fff}
#cap .low{position:absolute;left:54px;bottom:150px;transform:skewX(-8deg);opacity:0;transition:none}
#cap .low b{display:block;font-size:64px;letter-spacing:1px;text-shadow:0 4px 0 #1b1428,0 0 24px rgba(0,0,0,.6);-webkit-text-stroke:2px #1b1428}
#cap .low i{display:inline-block;font-style:normal;font-family:Fredoka,sans-serif;font-weight:700;font-size:26px;background:#ffcf3a;color:#1b1428;padding:4px 14px;border-radius:6px;margin-bottom:8px}
#cap .full{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;background:radial-gradient(circle at 50% 45%,#2b1d5c,#0b0918 70%);opacity:0}
#cap .full b{font-size:96px;transform:skewX(-8deg);text-shadow:0 6px 0 #1b1428,0 0 40px rgba(255,207,58,.5);-webkit-text-stroke:3px #1b1428}
#cap .full span{font-family:Fredoka,sans-serif;font-weight:700;font-size:30px;color:#cfcaea;margin-top:14px}`,
  });
  await p.evaluate(() => {
    const d = document.createElement('div');
    d.id = 'cap';
    d.innerHTML = '<div class="low"><i></i><b></b></div><div class="full"><b></b><span></span></div>';
    document.body.appendChild(d);
  });

  // ---- helpers ----
  const shot = async () => {
    await p.screenshot({ path: `${out}/${String(N).padStart(5, '0')}.jpg`, type: 'jpeg', quality: 92 });
    N++;
  };
  // n frames of 1/30 s; fn(i) runs before each.
  const frames = async (n, fn) => {
    for (let i = 0; i < n; i++) {
      if (fn) await fn(i);
      await p.evaluate(() => window.__frame(1000 / 30));
      await shot();
    }
  };
  const skip = async (n) => {
    for (let i = 0; i < n; i++) await p.evaluate(() => window.__frame(1000 / 30));
  };
  const key = (k) => p.keyboard.press(k);
  const ev = (f, a) => p.evaluate(f, a);
  // Lower-third caption: [tag, title] fading with frame count t.
  const cap = (tag, title, op = 1) =>
    ev(([tag, title, op]) => {
      const l = document.querySelector('#cap .low');
      l.querySelector('i').textContent = tag ?? '';
      l.querySelector('i').style.display = tag ? '' : 'none';
      l.querySelector('b').textContent = title ?? '';
      l.style.opacity = op;
    }, [tag, title, op]);
  const full = (title, sub, op = 1) =>
    ev(([title, sub, op]) => {
      const l = document.querySelector('#cap .full');
      l.querySelector('b').textContent = title ?? '';
      l.querySelector('span').textContent = sub ?? '';
      l.style.opacity = op;
    }, [title, sub, op]);
  // Caption over n frames with a fade in and out.
  const captioned = async (tag, title, n, fn) => {
    await frames(n, async (i) => {
      const op = Math.min(1, i / 6, (n - i) / 6);
      await cap(tag, title, Math.max(0, op));
      fn && (await fn(i));
    });
    await cap('', '', 0);
  };
  const card = async (title, sub, n) => {
    await frames(n, async (i) => full(title, sub, Math.max(0, Math.min(1, i / 6, (n - i) / 6))));
    await full('', '', 0);
  };
  // A CPU-vs-CPU match on arena ar; mode/teams; warm-up ticks skipped.
  const match = async (o) =>
    ev((o) => {
      const e = window.__eng, A = window.__A, s = window.__ui;
      A.arena = o.ar;
      A.items = o.items ?? 1;
      A.legends = o.legends ? 1 : 0;
      A.gameMode = o.gm ?? 0;
      A.ffaPlayers = o.ffa ?? 4;
      A.cpuLevel = 2;
      e.stockN = o.lives ?? 1;
      e.shinyTeams = o.shiny ?? null;
      e.match.youLegend = o.lg?.[0] ?? null;
      e.match.cpuLegends = o.lg?.slice(1) ?? [];
      s.arcade = null;
      e.startMatch(o.mode ?? 'vs', o.you, o.cpu);
      s.screen = 'play';
      s.cards = [];
      s.trail = {};
      s.hintT = 0;
      s.paused = false;
      const Bn = e.players[1].brain.constructor;
      const cpu = new Bn(e.rand, 2);
      e.players[0].brain = { net: true, local: true, cpu, think: (a, b) => cpu.think(a, b) };
      if (!o.intro) e.intro = 0;
      if (o.pos) o.pos.forEach(([x, y], i) => { const q = e.players[i]; q && ((q.x = q.px = x), (q.y = q.py = y)); });
    }, o);

  const segs = {
    // Title screen, the main menu, team select, legendary, stage select.
    async open() {
      marks.push(['title', N]);
      await frames(130);
      await key('Enter');
      await frames(30);
      marks.push(['menu', N]);
      for (const k of ['ArrowDown', 'ArrowDown', 'ArrowDown', 'ArrowUp', 'ArrowUp', 'ArrowUp']) {
        await key(k);
        await frames(9);
      }
      await frames(10);
      await key('Enter');
      marks.push(['select', N]);
      await frames(25);
      // X steps through the modes (and back round to VS CPU).
      for (let m = 0; m < 8; m++) {
        await key('KeyL');
        await frames(m === 7 ? 12 : 15);
      }
      for (const k of ['KeyD', 'KeyD', 'KeyS', 'KeyD', 'KeyD', 'KeyS', 'KeyA']) {
        await key(k);
        await frames(7);
      }
      await frames(8);
      await key('KeyJ');
      await frames(80);
      // Legendary pick, then the stage select.
      await key('KeyD');
      await frames(10);
      await key('KeyJ');
      await frames(30);
      marks.push(['stages', N]);
      for (const k of ['KeyD', 'KeyD', 'KeyS', 'KeyD']) {
        await key(k);
        await frames(26);
      }
      for (const k of ['KeyA', 'KeyA', 'KeyA', 'KeyW']) {
        await key(k);
        await frames(5);
      }
      await frames(24);
      await key('KeyJ');
      await frames(30);
    },
    async modes() {
      marks.push(['modes', N]);
      await match({ ar: 3, mode: 'vs', gm: 6, you: ['garchomp', 'gardevoir'], cpu: ['metagross', 'froslass'], pos: [[260, 200], [380, 210]] });
      await skip(30);
      await captioned('MODES', 'TAG TEAM', 105);
      await match({ ar: 6, mode: 'ffa', gm: 2, you: ['dragapult'], cpu: ['scizor', 'tyrantrum', 'chandelure'] });
      await skip(40);
      await captioned('MODES', 'FREE-FOR-ALL', 105);
      await match({ ar: 2, mode: 'team', gm: 3, you: ['blastoise'], cpu: ['volcarona'] });
      await skip(40);
      await captioned('MODES', 'TEAM 2V2', 95);
      await match({ ar: 7, mode: 'zone', gm: 4, you: ['lucario'], cpu: ['zoroark'] });
      await skip(60);
      await captioned('MODES', 'ZONE CONTROL', 95);
    },
    async stadium() {
      marks.push(['stadium', N]);
      await match({ ar: 0, you: ['charizard'], cpu: ['venusaur'], pos: [[270, 200], [370, 205]] });
      await skip(10);
      await captioned('STAGE', 'STADIUM', 150);
    },
    async plant() {
      marks.push(['plant', N]);
      await match({ ar: 4, you: ['magnezone'], cpu: ['rhyperior'], pos: [[150, 200], [210, 210]] });
      await skip(20);
      await captioned('STAGE', 'POWER PLANT', 190, async (i) => {
        // Pop a vat mid-shot.
        i === 70 &&
          (await ev(() => {
            const e = window.__eng;
            e.hitVat(0, 999);
          }));
      });
    },
    async magma() {
      marks.push(['magma', N]);
      await match({ ar: 5, you: ['volcarona'], cpu: ['inteleon'] });
      await skip(30);
      await captioned('NEW STAGE', 'MAGMA ISLE', 200);
    },
    async legends() {
      marks.push(['legends', N]);
      let first = true;
      for (const [you, cpu, lg, ar] of [
        [['lucario'], ['golurk'], ['zekrom', 'zekrom'], 0],
        [['greninja'], ['snorlax'], ['dialga', 'dialga'], 6],
        [['garchomp'], ['metagross'], ['rayquaza', 'rayquaza'], 3],
      ]) {
        await match({ ar, you, cpu, legends: 1, lg, pos: [[280, 200], [360, 210]] });
        await ev(() => { const e = window.__eng; e.players[0].lgMeter = 100; e.players[1].brain.level = 0; });
        first && (await card('SUMMON LEGENDARIES', 'Zekrom · Dialga · Rayquaza · and seven more', 50));
        first = false;
        await skip(10);
        let called = -1;
        await frames(150, async (i) => {
          const st = await ev(() => window.__eng.summons.length);
          st && called < 0 && (called = i);
          // Nudge: the CPU calls it when in range.
          i % 20 === 0 && (await ev(() => { const e = window.__eng; e.players[0].lgMeter = Math.max(e.players[0].lgMeter, 100); }));
        });
        console.log('legend', lg[0], 'called at', called);
      }
    },
    async extras() {
      marks.push(['extras', N]);
      // Shinies coming in.
      await match({ ar: 1, intro: 1, you: ['charizard'], cpu: ['greninja'], shiny: [[true], [true]], pos: [[285, 205], [355, 205]] });
      await captioned('UNLOCK', 'SHINY POKÉMON', 120);
      // Lives: a K.O. and back in.
      await match({ ar: 0, lives: 3, you: ['scizor'], cpu: ['lurantis'], pos: [[270, 200], [370, 205]] });
      await skip(40);
      await captioned('NEW', 'LIVES MODE', 150, async (i) => {
        i === 10 && (await ev(() => { const q = window.__eng.players[1]; q.slot.hp = 1; }));
      });
      // Taunts.
      await match({ ar: 5, you: ['milotic'], cpu: ['ceruledge'], pos: [[260, 200], [380, 205]] });
      await skip(95);
      await ev(() => { const e = window.__eng; e.players.forEach((q, k) => (q.brain = { net: true, local: k === 0, think: () => ({ mx: 0, my: 0, ax: 0, ay: 0, aimHeld: false, pressed: new Set(), held: new Set(), source: 'keys' }) })); });
      await captioned('NEW', 'TAUNTS & EMOTES', 120, async (i) => {
        const press = (k, mx, my) =>
          ev(([k, mx, my]) => {
            const e = window.__eng;
            const q = e.players[k];
            let once = true;
            q.brain = { net: true, local: k === 0, think: () => { const r = { mx: once ? mx : 0, my: once ? my : 0, ax: 0, ay: 0, aimHeld: false, pressed: new Set(once ? ['taunt'] : []), held: new Set(), source: 'keys' }; once = false; return r; } };
          }, [k, mx, my]);
        i === 4 && (await press(0, 0, -1));
        i === 24 && (await press(1, -1, 0));
        i === 76 && (await press(0, 1, 0));
        i === 90 && (await press(1, 0, 0));
      });
      // Ruins boulder.
      await match({ ar: 1, you: ['tyrantrum'], cpu: ['gardevoir'] });
      await ev(() => { const e = window.__eng; e.rollT = 4; });
      await skip(2);
      await captioned('STAGE', 'RUINS', 150);
    },
    async end() {
      marks.push(['end', N]);
      await ev(() => { window.__ui.screen = 'title'; });
      await card('POKÉMON POCKET BRAWL', '25 fighters · 8 stages · play free in your browser', 75);
      await card('PLAY NOW', 'silverbits1001.github.io/PokeBattler', 90);
    },
  };
  const order = (only ?? 'open,modes,stadium,plant,magma,legends,extras,end').split(',');
  for (const k of order) {
    const t0 = Date.now();
    await segs[k]();
    console.log(k, 'done', N, 'frames', ((Date.now() - t0) / 1000).toFixed(0) + 's');
  }
  fs.writeFileSync(`${out}/marks.json`, JSON.stringify(marks));
  console.log(errs.length ? errs.slice(0, 5).join('\n') : 'no errors');
  await b.close();
})();
