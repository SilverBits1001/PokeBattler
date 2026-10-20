const { chromium } = require('playwright');
const [,, html, N, kitsArg, mode] = process.argv;
(async () => {
  const b = await chromium.launch(); const p = await b.newPage();
  p.on('pageerror', (e) => console.log('ERR', e.stack));
  await p.goto('file://' + html); await p.waitForTimeout(4000);
  const r = await p.evaluate(([N, kits, mode]) => {
    const e = window.__eng, A = window.__A; A.items = 0; A.legends = 1;
    const idle = { mx: 0, my: 0, ax: 0, ay: 0, aimHeld: false, pressed: new Set(), held: new Set(), source: 'keys' };
    const W = {}, G = {};
    for (let g = 0; g < N; g++) {
      A.arena = g % 5;
      const pick = [...kits].sort(() => Math.random() - 0.5).slice(0, 4);
      if (mode === 'team') { e.startMatch('team', [pick[0]], [pick[1]]); e.match.extra = [[pick[2]], [pick[3]]]; e.startMatch('team', [pick[0]], [pick[1]], true); }
      else { e.startMatch('ffa', [pick[0]], [pick[1]]); e.match.extra = [[pick[2]], [pick[3]]]; e.startMatch('ffa', [pick[0]], [pick[1]], true); }
      const Bn = e.players[1].brain.constructor; for (const q of e.players) q.brain = new Bn(e.rand, 2);
      for (let t = 0; t < 60 * 300 && e.match.phase === 'fight'; t++) e.step(idle);
      const alive = e.players.filter((z) => z.slots.some((s) => s.hp > 0));
      e.players.forEach((q) => { const k = q.slots[0].kit.id; G[k] = (G[k] || 0) + 1;
        if (mode === 'team') { if (alive.length && alive.every((z) => z.team === alive[0].team) && q.team === alive[0].team) W[k] = (W[k] || 0) + 1; }
        else if (alive.length === 1 && alive[0] === q) W[k] = (W[k] || 0) + 1; });
    }
    return Object.fromEntries(Object.keys(G).map((k) => [k, [((W[k] || 0) / G[k]).toFixed(2), G[k]]]));
  }, [+N, kitsArg.split(','), mode || 'ffa']);
  console.log(JSON.stringify(r)); await b.close();
})();
