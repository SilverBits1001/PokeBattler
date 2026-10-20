const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch(); const p = await b.newPage();
  const errors = []; p.on('pageerror', e => errors.push(e.stack));
  await p.goto('file://' + process.argv[2]); await p.waitForTimeout(5000);
  const reps = +(process.argv[3] || 3), arena = +(process.argv[4] || 0);
  const kl = (process.argv[5] || 'charizard,venusaur,blastoise,dragapult,magnezone,snorlax,noivern,lucario').split(',');
  const OVR = JSON.parse(process.env.OVR || '{}'), FOC = (process.env.FOC || '').split(',').filter(Boolean);
  const res = await p.evaluate(([reps, arena, kl, OVR, FOC]) => {
    const e = window.__eng, A = window.__A; A.arena = arena; A.items = 0;
    const kits = kl;
    for (const [k, o] of Object.entries(OVR)) { e.startMatch('vs', [k], [k === 'snorlax' ? 'lucario' : 'snorlax']); const K = e.players[0].slots[0].kit; for (const [path, v] of Object.entries(o)) { const ps = path.split('.'); let x = K; for (const q of ps.slice(0, -1)) x = x[q]; x[ps[ps.length - 1]] = v; } }
    const idle = { mx: 0, my: 0, ax: 0, ay: 0, aimHeld: false, pressed: new Set(), held: new Set(), source: 'keys' };
    const W = {}, G = {}, src = {}, T = {}, pair = {};
    for (const k of kits) { W[k] = 0; G[k] = 0; src[k] = {}; T[k] = 0; }
    for (const a of kits) for (const c of kits) if (a !== c && (!FOC.length || FOC.includes(a) || FOC.includes(c))) for (let r = 0; r < reps; r++) {
      e.startMatch('vs', [a], [c]);
      const Bn = e.players[1].brain.constructor; e.players[0].brain = new Bn(e.rand, 2);
      let t = 0;
      for (; t < 60 * 180 && e.match.phase === 'fight'; t++) { e.step(idle);
        for (const v of e.events) if (v.type === 'hit' && v.attacker) { const at = v.attacker.kind === 'player' ? v.attacker : v.attacker.summoner || v.attacker.owner; const k = at && at.kit ? at.kit.id : '?'; if (src[k]) src[k][v.src] = (src[k][v.src] || 0) + v.dmg; } }
      const hp = e.players.map(q => q.slots[0].hp / q.slots[0].maxHp);
      const w = e.match.result === 'win' ? a : e.match.result === 'lose' ? c : (hp[0] > hp[1] ? a : c);
      W[w]++; G[a]++; G[c]++; T[a] += t; T[c] += t; pair[[a, c].sort().join('-')] = (pair[[a, c].sort().join('-')] || '') + (w === [a, c].sort()[0] ? 'L' : 'R');
    }
    return { win: Object.fromEntries(kits.map(k => [k, (W[k] / G[k]).toFixed(2)])), avgS: Object.fromEntries(kits.map(k => [k, (T[k] / G[k] / 60).toFixed(0)])), pair, src };
  }, [reps, arena, kl, OVR, FOC]);
  console.log(JSON.stringify(res, null, 0).replace(/\],/g, '],\n').replace(/},"/g, '},\n"')); console.log(errors.length ? errors.slice(0, 3).join('\n') : 'no errors'); await b.close();
})();
