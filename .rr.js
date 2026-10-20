// Empirical risk vs reward per move class, from CPU duels.
const { chromium } = require('playwright');
const [,, html, kitsArg, oppArg, reps, level] = process.argv;
(async()=>{const br=await chromium.launch();const p=await br.newPage();
p.on('pageerror',e=>console.log('ERR',e.stack));
await p.goto('file://'+html);await p.waitForTimeout(4000);
const r=await p.evaluate(([kits,opps,reps,level])=>{const e=window.__eng,A=window.__A;A.items=0;A.legends=0;
 const idle={ mx: 0, my: 0, ax: 0, ay: 0, aimHeld: false, pressed: new Set(), held: new Set(), source: 'keys' };
 const PASS=new Set(['move','hurt','launched','down','getup','stunned','guard','guardEnd','dodge','faint','summon','spawn','ko','summonAim','hitstop']);
 const out={};
 for(const k of kits){const M={};let g=0,w=0;
  for(const o of opps){ if(o===k)continue; for(let rep=0;rep<reps;rep++){A.arena=rep%3===2?3:rep%3;
   e.startMatch('vs',[k],[o]);const Bn=e.players[1].brain.constructor;e.players[0].brain=new Bn(e.rand,level);e.players[1].brain=new Bn(e.rand,level);
   const P=e.players[0];let cur=null;
   const close=()=>{if(cur){cur.post=20;}};
   const act=[];
   for(let t=0;t<60*180&&e.match.phase==='fight';t++){
    const hp0=P.slot.hp, ohp=e.players[1].slot.hp;
    e.step(idle);
    const st=P.state, lab= st==='attack'?'A': (st==='smashCharge'||st==='smash')?'RS': st==='ex'?('ex:'+P.exMove): PASS.has(st)?null:('sp:'+st);
    if(lab && (!cur || cur.lab!==lab || cur.post>0)){ if(!cur||cur.lab!==lab){ cur={lab,post:0}; act.push(cur); (M[lab]??={uses:0,dealt:0,taken:0}).uses++; } }
    if(!lab && cur && cur.post===0) cur.post=20;
    const dealt=Math.max(0,ohp-e.players[1].slot.hp), taken=Math.max(0,hp0-P.slot.hp);
    if(cur){ M[cur.lab].dealt+=dealt*(cur.post>0?0:1); M[cur.lab].taken+=taken; if(cur.post>0&&--cur.post===0)cur=null; }
   }
   g++; if(e.match.result==='win')w++; else if(!e.match.result&&P.slot.hp/P.slot.maxHp>e.players[1].slot.hp/e.players[1].slot.maxHp)w++;
  }}
  out[k]={win:(w/g).toFixed(2),moves:Object.fromEntries(Object.entries(M).filter(([l,v])=>v.uses>=4).map(([l,v])=>[l,[v.uses,(v.dealt/v.uses).toFixed(1),(v.taken/v.uses).toFixed(1)]]))};
 }
 return JSON.stringify(out);},[kitsArg.split(','),oppArg.split(','),+reps,+level]);
console.log(r);await br.close();})();
