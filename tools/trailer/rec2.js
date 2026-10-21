// Trailer 2: title, menu, team select (Tag Team + the legendary picks),
// Stadium / Power Plant / Magma Isle fights, Tag Team switching, a
// Free-for-All, legendary
// summons, Slugma Tag, Pidgey Sweep and Training. Nothing else: no other
// stages, modes, items, shinies, taunts or Lives.
// Usage: node rec2.js page.html outdir   (page = an instrumented build)
const { chromium } = require('playwright');
const fs = require('fs');
const [, , html, out] = process.argv;
fs.mkdirSync(out, { recursive: true });
let N = 0;
const marks = [];

(async () => {
  const b = await chromium.launch();
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
  for (let i = 0; i < 40; i++) {
    await p.evaluate(() => window.__frame(16.7));
    await p.waitForTimeout(100);
  }
  // Keep the pick-related prefs on what we show: Stadium, no items, no lives.
  await p.evaluate(() => {
    const A = window.__A;
    A.arena = 0;
    A.items = 0;
    A.lives = 1;
    A.legends = 1;
    A.cpuLevel = 2;
  });
  await p.addStyleTag({
    content: `#fs{display:none!important}
#cap{position:fixed;inset:0;pointer-events:none;z-index:99;font-family:"Lilita One",sans-serif;color:#fff}
#cap .low{position:absolute;left:54px;bottom:150px;transform:skewX(-8deg);opacity:0}
#cap .low b{display:block;font-size:64px;letter-spacing:1px;text-shadow:0 4px 0 #1b1428,0 0 24px rgba(0,0,0,.6);-webkit-text-stroke:2px #1b1428}
#cap .low i{display:inline-block;font-style:normal;font-family:Fredoka,sans-serif;font-weight:700;font-size:26px;background:#ffcf3a;color:#1b1428;padding:4px 14px;border-radius:6px;margin-bottom:8px}
#cap .full{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;background:radial-gradient(circle at 50% 45%,#2b1d5c,#0b0918 70%);opacity:0}
#cap .full b{font-size:92px;transform:skewX(-8deg);text-shadow:0 6px 0 #1b1428,0 0 40px rgba(255,207,58,.5);-webkit-text-stroke:3px #1b1428}
#cap .full span{font-family:Fredoka,sans-serif;font-weight:700;font-size:30px;color:#cfcaea;margin-top:14px}`,
  });
  await p.evaluate(() => {
    const d = document.createElement('div');
    d.id = 'cap';
    d.innerHTML = '<div class="low"><i></i><b></b></div><div class="full"><b></b><span></span></div>';
    document.body.appendChild(d);
  });

  const shot = async () => {
    await p.screenshot({ path: `${out}/${String(N).padStart(5, '0')}.jpg`, type: 'jpeg', quality: 92 });
    N++;
  };
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
  const captioned = async (tag, title, n, fn) => {
    await frames(n, async (i) => {
      await cap(tag, title, Math.max(0, Math.min(1, i / 6, (n - i) / 6)));
      fn && (await fn(i));
    });
    await cap('', '', 0);
  };
  const card = async (title, sub, n) => {
    await frames(n, async (i) => full(title, sub, Math.max(0, Math.min(1, i / 6, (n - i) / 6))));
    await full('', '', 0);
  };
  // A CPU-vs-CPU fight. Every brain is wrapped so it never taunts, and
  // player 1 wears the P1 tag. Extra options: switchAt (frames to press
  // Switch for player 1), it (Slugma Tag), mode, extras, pos.
  const match = async (o) =>
    ev((o) => {
      const e = window.__eng, A = window.__A, s = window.__ui;
      A.arena = o.ar;
      A.items = 0;
      A.legends = o.legends ? 1 : 0;
      A.gameMode = o.gm ?? 0;
      A.ffaPlayers = 4;
      A.cpuLevel = 2;
      e.stockN = 1;
      e.shinyTeams = null;
      e.itGame = !!o.it;
      e.bonusGame = 0;
      e.match.youLegend = o.lg?.[0] ?? null;
      e.match.cpuLegends = o.lg?.slice(1) ?? [];
      e.match.extraPreset = o.extras ?? null;
      s.arcade = null;
      e.startMatch(o.mode ?? 'vs', o.you, o.cpu ?? []);
      s.screen = 'play';
      s.cards = [];
      s.trail = {};
      s.hintT = 0;
      s.paused = false;
      s.readyPhase = s.lgPhase = s.stagePhase = false;
      const Bn = window.__BN;
      e.players.forEach((q, k) => {
        const cpu = k === 0 || !q.brain ? new Bn(e.rand, 2) : q.brain;
        cpu.level = 2;
        q.brain = {
          net: k === 0,
          local: k === 0,
          cpu,
          sw: o.switchAt ?? [],
          f: 0,
          think(a, me) {
            const r = cpu.think(a, me);
            r.pressed = new Set(r.pressed);
            r.pressed.delete('taunt');
            // Hold Switch for a moment so it lands between attacks.
            const fr = Math.floor(a.tick / 2) - this.t0;
            k === 0 && this.sw.some((w) => fr >= w && fr < w + 24) && (r.pressed.add('switch'), r.held.add('switch'));
            return r;
          },
          t0: Math.floor(e.tick / 2),
        };
        if (k !== 0) q.brain.net = false;
      });
      o.intro || (e.intro = 0);
      o.pos && o.pos.forEach(([x, y], i) => { const q = e.players[i]; q && ((q.x = q.px = x), (q.y = q.py = y)); });
    }, o);

  const segs = {
    async open() {
      marks.push(['title', N]);
      // 4.5 s on the title screen (it doubles as the Reddit thumbnail).
      await frames(135);
      await key('Enter');
      await frames(26);
      marks.push(['menu', N]);
      for (const k of ['ArrowDown', 'ArrowDown', 'ArrowUp', 'ArrowUp']) {
        await key(k);
        await frames(10);
      }
      await frames(8);
      await key('Enter');
      marks.push(['select', N]);
      await frames(22);
      // X once: Tag Team. Then two picks.
      await key('KeyL');
      await frames(18);
      for (const k of ['KeyD', 'KeyD', 'KeyS']) {
        await key(k);
        await frames(7);
      }
      await key('KeyJ');
      await frames(16);
      // The cursor goes back to the first tile after a pick: down twice to
      // Gardevoir for the partner.
      for (const k of ['KeyS', 'KeyS']) {
        await key(k);
        await frames(8);
      }
      await key('KeyJ');
      await frames(60);
      // The legendary picks: browse every card.
      marks.push(['legendPick', N]);
      await frames(14);
      for (let i = 0; i < 10; i++) {
        await key('KeyD');
        await frames(9);
      }
      await frames(10);
    },
    async stages() {
      marks.push(['stadium', N]);
      await match({ ar: 0, you: ['charizard'], cpu: ['lucario'], pos: [[296, 205], [344, 208]] });
      await skip(18);
      await captioned('STAGE', 'STADIUM', 140);
      marks.push(['plant', N]);
      await match({ ar: 4, you: ['magnezone'], cpu: ['garchomp'], pos: [[140, 200], [190, 205]] });
      await skip(18);
      await captioned('STAGE', 'POWER PLANT', 150, async (i) => {
        i === 60 && (await ev(() => window.__eng.hitVat(0, 999)));
      });
      marks.push(['magma', N]);
      await match({ ar: 5, you: ['volcarona'], cpu: ['greninja'], pos: [[300, 200], [350, 210]] });
      await skip(18);
      await captioned('STAGE', 'MAGMA ISLE', 150);
    },
    async tag() {
      marks.push(['tag', N]);
      await match({
        ar: 4,
        gm: 6,
        you: ['garchomp', 'gardevoir'],
        cpu: ['metagross', 'blastoise'],
        pos: [[300, 205], [345, 210]],
        switchAt: [40, 110],
      });
      await skip(6);
      await captioned('TEAM UP', 'TAG TEAM', 170);
    },
    async ffa() {
      marks.push(['ffa', N]);
      await match({
        ar: 0,
        gm: 2,
        mode: 'ffa',
        you: ['charizard'],
        cpu: ['lucario'],
        extras: [['garchomp'], ['gardevoir']],
        pos: [[280, 185], [360, 185], [280, 235], [360, 235]],
      });
      await skip(12);
      await captioned('PARTY', 'FREE-FOR-ALL', 170);
    },
    async legends() {
      marks.push(['legends', N]);
      await card('SUMMON LEGENDARIES', 'charge the meter, then call in a legend', 48);
      for (const [you, cpu, lg, ar] of [
        [['lucario'], ['golurk'], ['zekrom', 'groudon'], 0],
        [['inteleon'], ['snorlax'], ['dialga', 'zekrom'], 4],
        [['garchomp'], ['scizor'], ['rayquaza', 'darkrai'], 5],
      ]) {
        await match({ ar, you, cpu, legends: 1, lg, pos: [[285, 205], [355, 210]] });
        await ev(() => { const e = window.__eng; e.players[0].lgMeter = 100; e.players[1].brain.cpu.level = 0; });
        await skip(6);
        await frames(145, async (i) => {
          i % 15 === 0 && (await ev(() => { const e = window.__eng; e.summons.length || (e.players[0].lgMeter = 100); }));
        });
      }
    },
    async slugma() {
      marks.push(['slugma', N]);
      await match({
        ar: 5,
        gm: 8,
        mode: 'ffa',
        it: 1,
        you: ['greninja'],
        cpu: ['charizard'],
        extras: [['snorlax'], ['gardevoir']],
      });
      await ev(() => { window.__eng.it.wait = 0; });
      await skip(30);
      await captioned('MINIGAME', 'SLUGMA TAG', 200, async (i) => {
        // Make sure a tag happens on camera.
        (i === 70 || i === 140) &&
          (await ev(() => {
            const e = window.__eng, w = e.it.who;
            if (!w) return;
            const o = e.players.filter((q) => q !== w && !q.out).sort((a, b) => Math.hypot(a.x - w.x, a.y - w.y) - Math.hypot(b.x - w.x, b.y - w.y))[0];
            o && e.itGive(o, w);
          }));
      });
    },
    async pidgey() {
      marks.push(['pidgey', N]);
      await ev(() => {
        const e = window.__eng, A = window.__A, s = window.__ui;
        A.gameMode = 7;
        e.stockN = 1;
        e.itGame = false;
        e.shinyTeams = null;
        e.startMatch('sweep', ['scizor'], []);
        e.intro = 0;
        e.sweep.left = 1800;
        s.screen = 'play';
        s.paused = false;
        s.cards = [];
        const cpu = new window.__BN(e.rand, 2);
        e.players[0].brain = { net: true, local: true, think: (a, q) => { const r = cpu.think(a, q); r.pressed = new Set(r.pressed); r.pressed.delete('taunt'); return r; } };
      });
      await skip(150);
      await captioned('MINIGAME', 'PIDGEY SWEEP', 180, async (i) => {
        i === 40 && (await ev(() => { window.__eng.spawnBird('shiny'); window.__eng.spawnBird('pidgeotto'); }));
      });
    },
    async training() {
      marks.push(['training', N]);
      // The briefing, then the dummies.
      await ev(() => {
        const A = window.__A, s = window.__ui;
        A.gameMode = 1;
        s.screen = 'select';
        s.picks = ['lucario'];
        s.readyPhase = true;
        s.readyT = 0;
        s.briefKit = 0;
        s.lgPhase = s.stagePhase = false;
      });
      await captioned('PRACTICE', 'TRAINING', 75);
      await ev(() => {
        const e = window.__eng, A = window.__A, s = window.__ui;
        A.arena = 0;
        A.dummyCount = 3;
        A.dummyMode = 1;
        e.itGame = false;
        e.startMatch('practice', ['lucario'], []);
        e.intro = 0;
        s.screen = 'play';
        s.readyPhase = false;
        s.paused = false;
        s.cards = [];
        const cpu = new window.__BN(e.rand, 2);
        e.players[0].brain = { net: true, local: true, think: (a, q) => { const r = cpu.think(a, q); r.pressed = new Set(r.pressed); r.pressed.delete('taunt'); return r; } };
        e.players[0].x = e.players[0].px = 250;
      });
      await skip(20);
      await frames(120);
    },
    async end() {
      marks.push(['end', N]);
      await ev(() => { window.__ui.screen = 'title'; });
      // No web address on screen: the game isn't public yet.
      await card('POKÉMON POCKET BRAWL', '25 fighters · play free in your browser', 75);
    },
  };
  // The CPU brain class, borrowed from a throwaway duel.
  await ev(() => { const e = window.__eng; e.startMatch('vs', ['charizard'], ['lucario']); window.__BN = e.players[1].brain.constructor; e.startMatch('practice', ['charizard', 'dragapult'], []); });
  for (const k of ['open', 'stages', 'tag', 'ffa', 'legends', 'slugma', 'pidgey', 'training', 'end']) {
    const t0 = Date.now();
    await segs[k]();
    console.log(k, 'done', N, ((Date.now() - t0) / 1000).toFixed(0) + 's');
  }
  // The title theme until the first fight.
  fs.writeFileSync(`${out}/marks.json`, JSON.stringify([...marks, ['modes', marks.find((m) => m[0] === 'stadium')[1]]]));
  console.log(errs.length ? errs.slice(0, 5).join('\n') : 'no errors');
  await b.close();
})();
