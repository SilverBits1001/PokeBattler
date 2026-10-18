"use strict";
(() => {
  var Xt = {
      speedScale: 0.85,
      accelTicks: 2,
      decelTicks: 4,
      walkAnimRate: 2.6,
      atkStartup: 4,
      atkActive: 3,
      atkRecovery: 9,
      atkLunge: 7,
      finStartup: 7,
      finActive: 4,
      finRecovery: 15,
      finLunge: 14,
      meleeAssist: 70,
      hitstopLight: 6,
      hitstopHeavy: 12,
      hitstopKO: 22,
      hitstunLight: 18,
      hitstunHeavy: 26,
      hitstunDodgeCancel: 14,
      kbLight: 2.6,
      kbHeavy: 6.8,
      kbFriction: 0.86,
      shake: 1,
      closeCallWindow: 6,
      switchCooldown: 60,
      assistCooldown: 540,
      bufferTicks: 5,
      deadzone: 0.2,
      gameMode: 0,
      cpuLevel: 2,
      arena: 1,
      items: 1,
      dummyCount: 1,
      dummyMode: 0,
      showHitboxes: 0,
      swapFace: 0,
      volume: 0.7,
      music: 0.55,
      slowmo: 0,
    },
    A = { ...Xt },
    $t = "starter-brawl-tuning-v5",
    La = [
      "music",
      "volume",
      "gameMode",
      "cpuLevel",
      "dummyCount",
      "dummyMode",
      "showHitboxes",
      "swapFace",
      "slowmo",
      "arena",
      "items",
    ];
  function Vt() {
    try {
      let a = localStorage.getItem($t);
      if (a) {
        Object.assign(A, JSON.parse(a));
        return;
      }
      let e =
        localStorage.getItem("starter-brawl-tuning-v4") ??
        localStorage.getItem("starter-brawl-tuning-v3") ??
        localStorage.getItem("starter-brawl-tuning-v2");
      if (e) {
        let t = JSON.parse(e);
        for (let s of La) s in t && (A[s] = t[s]);
        Ze();
      }
    } catch {}
  }
  function Ze() {
    try {
      localStorage.setItem($t, JSON.stringify(A));
    } catch {}
  }
  function jt() {
    Object.assign(A, Xt), Ze();
  }
  var Re = [
    { kind: "header", label: "Sound" },
    {
      kind: "num",
      key: "music",
      label: "Music volume",
      step: 0.05,
      min: 0,
      max: 1,
    },
    {
      kind: "num",
      key: "volume",
      label: "Sound effects",
      step: 0.05,
      min: 0,
      max: 1,
    },
    { kind: "header", label: "Match" },
    {
      kind: "choice",
      key: "gameMode",
      label: "Mode (next battle)",
      options: ["VS CPU", "Training"],
    },
    {
      kind: "choice",
      key: "cpuLevel",
      label: "CPU level",
      options: ["Easy", "Normal", "Hard"],
    },
    {
      kind: "choice",
      key: "arena",
      label: "Arena (next battle)",
      options: ["Stadium", "Ruins"],
    },
    {
      kind: "choice",
      key: "items",
      label: "Items (Sitrus Berry)",
      options: ["Off", "On"],
    },
    { kind: "header", label: "Practice" },
    {
      kind: "choice",
      key: "dummyCount",
      label: "Dummies",
      options: ["0", "1", "2", "3"],
    },
    {
      kind: "choice",
      key: "dummyMode",
      label: "Dummy behavior",
      options: ["Stand", "Wander", "Shooter"],
    },
    {
      kind: "choice",
      key: "slowmo",
      label: "Game speed",
      options: ["Normal", "1/2", "1/4"],
    },
    {
      kind: "choice",
      key: "showHitboxes",
      label: "Hitboxes",
      options: ["Hidden", "Shown"],
    },
    { kind: "header", label: "Controls" },
    {
      kind: "choice",
      key: "swapFace",
      label: "Face buttons",
      options: ["Xbox", "Nintendo"],
    },
    {
      kind: "num",
      key: "bufferTicks",
      label: "Input buffer",
      step: 1,
      min: 0,
      max: 15,
    },
    {
      kind: "num",
      key: "deadzone",
      label: "Stick deadzone",
      step: 0.02,
      min: 0,
      max: 0.5,
    },
    {
      kind: "num",
      key: "meleeAssist",
      label: "Aim assist\xB0",
      step: 5,
      min: 0,
      max: 90,
    },
    { kind: "header", label: "Movement" },
    {
      kind: "num",
      key: "speedScale",
      label: "Speed scale",
      step: 0.05,
      min: 0.5,
      max: 2,
    },
    {
      kind: "num",
      key: "accelTicks",
      label: "Accel ticks",
      step: 1,
      min: 1,
      max: 20,
    },
    {
      kind: "num",
      key: "decelTicks",
      label: "Decel ticks",
      step: 1,
      min: 1,
      max: 20,
    },
    { kind: "header", label: "Charizard combo" },
    {
      kind: "num",
      key: "atkStartup",
      label: "Startup",
      step: 1,
      min: 1,
      max: 20,
    },
    {
      kind: "num",
      key: "atkRecovery",
      label: "Recovery",
      step: 1,
      min: 1,
      max: 30,
    },
    {
      kind: "num",
      key: "finStartup",
      label: "Finisher startup",
      step: 1,
      min: 1,
      max: 20,
    },
    {
      kind: "num",
      key: "finRecovery",
      label: "Finisher recovery",
      step: 1,
      min: 1,
      max: 40,
    },
    { kind: "header", label: "Impact" },
    {
      kind: "num",
      key: "hitstopLight",
      label: "Hitstop light",
      step: 1,
      min: 0,
      max: 20,
    },
    {
      kind: "num",
      key: "hitstopHeavy",
      label: "Hitstop heavy",
      step: 1,
      min: 0,
      max: 30,
    },
    {
      kind: "num",
      key: "hitstunLight",
      label: "Hitstun light",
      step: 1,
      min: 0,
      max: 40,
    },
    {
      kind: "num",
      key: "hitstunHeavy",
      label: "Hitstun heavy",
      step: 1,
      min: 0,
      max: 60,
    },
    {
      kind: "num",
      key: "kbLight",
      label: "Knockback light",
      step: 0.2,
      min: 0,
      max: 10,
    },
    {
      kind: "num",
      key: "kbHeavy",
      label: "Knockback heavy",
      step: 0.2,
      min: 0,
      max: 16,
    },
    {
      kind: "num",
      key: "shake",
      label: "Screen shake",
      step: 0.1,
      min: 0,
      max: 3,
    },
    { kind: "header", label: "Team" },
    {
      kind: "num",
      key: "switchCooldown",
      label: "Switch cooldown",
      step: 5,
      min: 0,
      max: 120,
    },
    {
      kind: "num",
      key: "assistCooldown",
      label: "Assist cooldown",
      step: 30,
      min: 0,
      max: 900,
    },
    { kind: "header", label: "" },
    { kind: "action", id: "copy", label: "Copy tuning as JSON" },
    { kind: "action", id: "reset", label: "Reset to defaults" },
  ];
  var Rt = {
      FIRE: "#f08030",
      GRASS: "#78c850",
      WATER: "#6890f0",
      DRAGON: "#7038f8",
      GHOST: "#705898",
    },
    xe = {
      charizard: {
        id: "charizard",
        name: "CHARIZARD",
        type: "FIRE",
        color: "#ff8a3d",
        typeInk: "#2a1206",
        hp: 920,
        speed: 2.9,
        weight: 1.05,
        r: 9,
        hurtR: 11,
        size: 1,
        tall: 29,
        role: "Rushdown \xB7 fragile",
        stats: { speed: 4, power: 4, defense: 2, range: 2, difficulty: 3 },
        basic: () => [
          {
            anim: "Attack",
            startup: A.atkStartup,
            active: A.atkActive,
            recovery: A.atkRecovery,
            lunge: A.atkLunge,
            dmg: 30,
            kb: A.kbLight,
            heavy: !1,
            shape: "circle",
            reach: 15,
            radius: 14,
            heat: 9,
          },
          {
            anim: "Strike",
            startup: A.atkStartup,
            active: A.atkActive,
            recovery: A.atkRecovery,
            lunge: A.atkLunge,
            dmg: 30,
            kb: A.kbLight * 1.15,
            heavy: !1,
            shape: "circle",
            reach: 15,
            radius: 14,
            heat: 9,
          },
          {
            anim: "Swing",
            startup: A.finStartup,
            active: A.finActive,
            recovery: A.finRecovery,
            lunge: A.finLunge,
            dmg: 52,
            kb: A.kbHeavy,
            heavy: !0,
            shape: "circle",
            reach: 17,
            radius: 17,
            heat: 14,
          },
        ],
        dodge: {
          kind: "air",
          dist: 92,
          ticks: 14,
          iframes: 9,
          cooldown: 36,
          anim: "Walk",
        },
        smash: {
          name: "FLARE BLITZ",
          anim: "Swing",
          windup: 6,
          maxCharge: 48,
          active: 5,
          recovery: 26,
          lunge: 26,
          dmg: 66,
          kb: 7.6,
          shape: "circle",
          reach: 16,
          radius: 18,
        },
        xName: "FLAMETHROWER",
        yName: "FLY",
        xCd: 40,
        yCd: 200,
      },
      venusaur: {
        id: "venusaur",
        name: "VENUSAUR",
        type: "GRASS",
        color: "#6cc04a",
        typeInk: "#0f2a08",
        hp: 1020,
        speed: 2.35,
        weight: 0.85,
        r: 11,
        hurtR: 13,
        size: 1.32,
        tall: 25,
        role: "Zoner \xB7 trapper",
        stats: { speed: 2, power: 3, defense: 3, range: 5, difficulty: 3 },
        basic: () => [
          {
            anim: "Attack",
            startup: 8,
            active: 3,
            recovery: 13,
            lunge: 3,
            dmg: 30,
            kb: 3,
            heavy: !1,
            shape: "vine",
            reach: 42,
            radius: 7,
          },
          {
            anim: "Swing",
            startup: 9,
            active: 3,
            recovery: 16,
            lunge: 2,
            dmg: 40,
            kb: 4.4,
            heavy: !0,
            shape: "vine",
            reach: 48,
            radius: 8,
            pull: !0,
          },
        ],
        dodge: {
          kind: "roll",
          dist: 52,
          ticks: 12,
          iframes: 7,
          cooldown: 36,
          anim: "Hop",
        },
        smash: {
          name: "POWER WHIP",
          anim: "Swing",
          windup: 11,
          maxCharge: 50,
          active: 4,
          recovery: 30,
          lunge: 2,
          dmg: 58,
          kb: 7.2,
          shape: "vine",
          reach: 60,
          radius: 10,
        },
        xName: "RAZOR LEAF",
        yName: "SOLAR BEAM",
        xCd: 45,
        yCd: 30,
        seedCd: 70,
      },
      blastoise: {
        id: "blastoise",
        name: "BLASTOISE",
        type: "WATER",
        color: "#5aa9e6",
        typeInk: "#06203a",
        hp: 1120,
        speed: 2.15,
        weight: 0.6,
        r: 10,
        hurtR: 12,
        size: 0.94,
        tall: 29,
        role: "Tank \xB7 artillery",
        stats: { speed: 1, power: 4, defense: 5, range: 4, difficulty: 3 },
        // Shell Bash -> Aqua Tail -> Body Slam. Only the slam is armored.
        basic: () => [
          {
            anim: "Attack",
            startup: 6,
            active: 3,
            recovery: 11,
            lunge: 6,
            dmg: 24,
            kb: 2.4,
            heavy: !1,
            shape: "circle",
            reach: 14,
            radius: 13,
          },
          {
            anim: "Swing",
            startup: 6,
            active: 4,
            recovery: 12,
            lunge: 6,
            dmg: 28,
            kb: 3,
            heavy: !1,
            shape: "circle",
            reach: 15,
            radius: 16,
          },
          {
            anim: "Attack",
            startup: 10,
            active: 4,
            recovery: 20,
            lunge: 12,
            dmg: 46,
            kb: 5.8,
            heavy: !0,
            shape: "circle",
            reach: 15,
            radius: 15,
            armor: !0,
          },
        ],
        dodge: {
          kind: "shell",
          dist: 84,
          ticks: 18,
          iframes: 4,
          cooldown: 32,
          anim: "Withdraw",
        },
        smash: {
          name: "SKULL BASH",
          anim: "Attack",
          windup: 8,
          maxCharge: 54,
          active: 6,
          recovery: 30,
          lunge: 44,
          dmg: 76,
          kb: 8.2,
          shape: "circle",
          reach: 15,
          radius: 16,
          armor: !0,
        },
        xName: "WATER PULSE",
        yName: "HYDRO CANNON",
        xCd: 40,
        yCd: 150,
      },
      dragapult: {
        id: "dragapult",
        name: "DRAGAPULT",
        type: "DRAGON",
        type2: "GHOST",
        color: "#a184f5",
        typeInk: "#170c33",
        hp: 780,
        speed: 3.25,
        weight: 1.2,
        r: 8,
        hurtR: 12,
        size: 1.24,
        tall: 41,
        role: "Skirmisher \xB7 summoner",
        stats: { speed: 5, power: 3, defense: 1, range: 4, difficulty: 5 },
        basic: () => [
          {
            anim: "Attack",
            startup: 4,
            active: 3,
            recovery: 7,
            lunge: 7,
            dmg: 18,
            kb: 1.4,
            heavy: !1,
            shape: "circle",
            reach: 16,
            radius: 13,
          },
          {
            anim: "Double",
            startup: 4,
            active: 3,
            recovery: 9,
            lunge: 8,
            dmg: 20,
            kb: 1.8,
            heavy: !1,
            shape: "circle",
            reach: 17,
            radius: 14,
          },
          {
            anim: "Swing",
            startup: 6,
            active: 4,
            recovery: 15,
            lunge: 10,
            dmg: 34,
            kb: 6,
            heavy: !0,
            shape: "circle",
            reach: 18,
            radius: 18,
            hex: 1.4,
          },
        ],
        dodge: {
          kind: "phantom",
          dist: 70,
          ticks: 12,
          iframes: 11,
          cooldown: 34,
          anim: "Walk",
        },
        smash: {
          name: "DRAGON RUSH",
          anim: "Charge",
          windup: 8,
          maxCharge: 44,
          active: 9,
          recovery: 30,
          lunge: 78,
          dmg: 40,
          kb: 7,
          shape: "circle",
          reach: 4,
          radius: 17,
          pierce: !0,
        },
        xName: "DRAGON DARTS",
        yName: "WILL-O-WISP",
        xCd: 30,
        yCd: 150,
      },
    },
    ge = ["charizard", "venusaur", "blastoise", "dragapult"],
    ut = 360,
    // Deliberate pacing: every move commits a little longer, so attacks can be
    // read and whiffs can be punished. Scales the per-kit frame data below.
    PACE = { startup: 1.3, recovery: 1.35, windup: 1.25, cooldown: 1.3 };
  for (let a of Object.values(xe)) {
    let e = a.basic;
    (a.basic = () =>
      e().map((t) => ({
        ...t,
        startup: Math.round(t.startup * PACE.startup),
        recovery: Math.round(t.recovery * PACE.recovery),
      }))),
      (a.smash.windup = Math.round(a.smash.windup * PACE.windup)),
      (a.smash.recovery = Math.round(a.smash.recovery * PACE.recovery)),
      (a.dodge.cooldown = Math.round(a.dodge.cooldown * PACE.cooldown)),
      (a.xCd = Math.round(a.xCd * PACE.cooldown)),
      a.seedCd && (a.seedCd = Math.round(a.seedCd * PACE.cooldown)),
      (a.yCd = Math.round(a.yCd * PACE.cooldown));
  }
  var qt = [
      {
        react: 32,
        dodge: 0.1,
        aggr: 0.38,
        think: 24,
        chain: 0.4,
        mistake: 0.3,
        guard: 0.3,
        punish: 0.15,
        tech: 0.1,
      },
      {
        react: 22,
        dodge: 0.3,
        aggr: 0.52,
        think: 17,
        chain: 0.62,
        mistake: 0.17,
        guard: 0.5,
        punish: 0.4,
        tech: 0.35,
      },
      {
        react: 15,
        dodge: 0.5,
        aggr: 0.62,
        think: 13,
        chain: 0.8,
        mistake: 0.1,
        guard: 0.6,
        punish: 0.75,
        tech: 0.6,
      },
    ],
    Ga = Math.PI * 2,
    It = (a, e) => Math.atan2(Math.sin(a - e), Math.cos(a - e)),
    ft = class {
      constructor(e, t) {
        this.rand = e;
        this.level = t;
        this.strafe = 1;
        this.strafeT = 0;
        this.holdX = 0;
        this.holdY = 0;
        this.holdB = 0;
        this.phantomAway = !1;
        this.threatT = -1;
        this.nextAct = 0;
        this.plantT = 0;
        this.chainedSwing = -1;
        this.spinOut = !1;
        this.spinIntent = !1;
        this.smashHold = 0;
        this.guardHold = 0;
        this.techTried = !1;
        this.punishedT = -1;
      }
      think(e, t) {
        return this.adapt(e, t, this.decide(e, t));
      }
      // Arena awareness layered over the fighting brain: berries, cover and line of sight.
      adapt(e, t, i) {
        if (t.state === "faint" || e.match.phase !== "fight" || e.intro > 20)
          return i;
        let s = e.nearestTarget(t.team, t.x, t.y),
          r = t.slot,
          o = e.item;
        if (s && t.kit.id !== "dragapult" && e.losBlocked(t.x, t.y, s.x, s.y))
          i.pressed.delete("special1"),
            t.kit.id === "blastoise" && i.pressed.delete("special2"),
            t.state === "move" && (this.holdX = 0);
        if (o && t.state === "move" && !i.pressed.size) {
          this.berryId !== o.id &&
            ((this.berryId = o.id),
            (this.berryWant =
              this.rand() < [0.35, 0.7, 0.95][this.level ?? A.cpuLevel]));
          let l = Math.hypot(o.x - t.x, o.y - t.y),
            f = s ? Math.hypot(o.x - s.x, o.y - s.y) : 1 / 0;
          if (
            this.berryWant &&
            r.hp < r.maxHp * 0.9 &&
            (l < f + 40 || r.hp < r.maxHp * 0.35) &&
            (o.state === "ready" || l > 34)
          ) {
            let u = Math.max(1, l);
            (i.mx = (o.x - t.x) / u), (i.my = (o.y - t.y) / u);
          }
        }
        t.state === "solar" &&
          s &&
          Math.hypot(s.x - t.x, s.y - t.y) < 75 &&
          r.cdDodge === 0 &&
          (i.pressed.add("dodge"),
          (i.mx = (t.x - s.x) / 75),
          (i.my = (t.y - s.y) / 75));
        t.kit.id === "dragapult" &&
          t.state === "attack" &&
          t.combo === 1 &&
          t.swingHit &&
          this.flurrySwing !== t.swingId &&
          ((this.flurrySwing = t.swingId),
          this.rand() < [0.2, 0.45, 0.65][this.level ?? A.cpuLevel] &&
            (this.holdA = 18 + Math.floor(this.rand() * 26)));
        this.holdA > 0 && (i.held.add("attack"), this.holdA--);
        let l = Math.hypot(i.mx, i.my);
        if (l > 0.2 && e.rocks.length) {
          let f = i.mx / l,
            u = i.my / l;
          for (let h of e.rocks) {
            if (h.state !== "solid") continue;
            let c = h.x - t.x,
              y = h.y - t.y,
              b = c * f + y * u;
            if (b <= 0 || b > h.r + t.r + 26) continue;
            let p = c - b * f,
              k = y - b * u,
              M = Math.hypot(p, k);
            if (M > h.r + t.r + 3) continue;
            M < 0.5 && ((p = -u * this.strafe), (k = f * this.strafe), (M = 1));
            let P = f * 0.35 - p / M,
              C = u * 0.35 - k / M,
              x = Math.hypot(P, C) || 1;
            (i.mx = (P / x) * l), (i.my = (C / x) * l);
            break;
          }
        }
        return i;
      }
      decide(e, t) {
        let s = qt[this.level ?? A.cpuLevel] ?? qt[2],
          i = {
            mx: 0,
            my: 0,
            ax: 0,
            ay: 0,
            aimHeld: !1,
            pressed: new Set(),
            held: new Set(["lock"]),
            source: "pad",
          },
          r = this.rand,
          o = e.nearestTarget(t.team, t.x, t.y);
        if (t.state === "faint" || e.match.phase !== "fight" || e.intro > 20)
          return (this.holdX = this.holdY = this.holdB = 0), i;
        if (!o) {
          --this.strafeT <= 0 &&
            ((this.strafe = r() < 0.5 ? -1 : 1),
            (this.strafeT = 40 + Math.floor(r() * 40)));
          let N = Math.atan2(Te - t.y, Se - t.x) + this.strafe * 1.2;
          return (i.mx = Math.cos(N) * 0.8), (i.my = Math.sin(N) * 0.8), i;
        }
        let l = e.tick,
          f = t.kit.id,
          u = t.slot,
          h = o.x - t.x,
          c = o.y - t.y,
          y = Math.hypot(h, c),
          b = Math.atan2(c, h),
          p = t.state === "move" || t.state === "switchIn";
        if (
          (this.holdX > 0 &&
            (f === "charizard" && u.heat > 72
              ? (this.holdX = 0)
              : (i.held.add("special1"), this.holdX--)),
          this.holdY > 0 &&
            (i.held.add("special2"), this.holdY--, this.holdY === 0))
        )
          return (
            (this.spinOut = this.spinIntent || (y < 80 && r() < 0.55)),
            (this.spinIntent = !1),
            this.spinOut && ((i.mx = Math.cos(b)), (i.my = Math.sin(b))),
            i
          );
        if (t.state === "withdraw" && this.guardHold <= 0)
          return (
            y < 80 &&
              r() < 0.55 &&
              ((i.mx = Math.cos(b)), (i.my = Math.sin(b))),
            i
          );
        if (t.state === "launched") {
          if (
            !this.techTried &&
            t.t >= t.hitstun - 5 &&
            ((this.techTried = !0), r() < s.tech)
          ) {
            i.pressed.add("dodge");
            let N = Math.atan2(Te - t.y, Se - t.x);
            (i.mx = Math.cos(N)), (i.my = Math.sin(N));
          }
          return i;
        }
        if (
          ((this.techTried = !1),
          ["down", "stunned", "getup", "guardEnd"].includes(t.state))
        )
          return (this.guardHold = 0), (this.smashHold = 0), i;
        if (this.smashHold > 0 || t.state === "smashCharge")
          return (
            this.smashHold > 0 &&
            (t.state === "smashCharge" ||
              t.state === "move" ||
              t.state === "attack")
              ? (this.smashHold--, (i.ax = Math.cos(b)), (i.ay = Math.sin(b)))
              : (this.smashHold = 0),
            i
          );
        if (this.guardHold > 0) {
          if (
            (this.guardHold--,
            i.held.add("guard"),
            t.state === "guard" && u.guard < 25 && u.cdDodge === 0)
          ) {
            (this.guardHold = 0), i.held.delete("guard");
            let N = b + (Math.PI / 2) * (r() < 0.5 ? 1 : -1);
            (i.mx = Math.cos(N)), (i.my = Math.sin(N)), i.pressed.add("dodge");
          }
          return i;
        }
        if (this.holdB > 0 || t.state === "phantom") {
          this.holdB > 0 && (i.held.add("dodge"), this.holdB--);
          let N = b + Math.PI,
            J = Math.atan2(Te - t.y, Se - t.x),
            fe = this.phantomAway ? (Math.cos(N - J) < -0.2 ? J : N) : b;
          return (
            !this.phantomAway && y < 22
              ? (this.holdB = 0)
              : ((i.mx = Math.cos(fe)), (i.my = Math.sin(fe))),
            i
          );
        }
        let k = t.aliveSlot(1);
        if (
          p &&
          k !== null &&
          t.switchCd === 0 &&
          u.hp < u.maxHp * 0.3 &&
          t.slots[k].hp > t.slots[k].maxHp * 0.5 &&
          r() < 0.02 * s.aggr
        )
          return i.pressed.add("switch"), i;
        t.assistCd === 0 &&
          t.assistSlot() !== null &&
          y < 170 &&
          r() < 0.012 * s.aggr &&
          i.pressed.add("assist"),
          --this.strafeT <= 0 &&
            ((this.strafe = r() < 0.5 ? -1 : 1),
            (this.strafeT = 70 + Math.floor(r() * 90)));
        let M = u.horns.filter((N) => N === "loaded").length,
          P =
            f === "charizard"
              ? u.heat > 78
                ? 110
                : 16
              : f === "venusaur"
                ? 50
                : f === "dragapult"
                  ? M === 0
                    ? 28
                    : 100
                  : 20;
        f === "venusaur" && this.plantT > 0
          ? (this.plantT--, (P = y))
          : f === "venusaur" &&
            y > 80 &&
            y < 170 &&
            r() < 0.01 &&
            (this.plantT = 70);
        let C = b + Math.PI / 2,
          x = P > 40 ? 22 : 8,
          v = o.x - Math.cos(b) * P + Math.cos(C) * this.strafe * x,
          E = o.y - Math.sin(b) * P + Math.sin(C) * this.strafe * x,
          Q = Math.min(t.x - B.x0, B.x1 - t.x, t.y - B.y0, B.y1 - t.y);
        if (f === "dragapult" && Q < 44 && y < 120) {
          let N = Math.atan2(Te - t.y, Se - t.x),
            J = It(N, b) > 0 ? 1 : -1,
            fe = N + J * 0.6;
          if (
            ((v = t.x + Math.cos(fe) * 80),
            (E = t.y + Math.sin(fe) * 80),
            p && y < 80 && u.cdDodge === 0 && r() < 0.06 * s.aggr)
          )
            return (
              (i.mx = Math.cos(fe)),
              (i.my = Math.sin(fe)),
              i.pressed.add("dodge"),
              u.pfCd === 0 &&
                r() < 0.5 &&
                ((this.holdB = 28), (this.phantomAway = !0)),
              i
            );
        }
        (v = Math.max(B.x0 + 34, Math.min(B.x1 - 34, v))),
          (E = Math.max(B.y0 + 30, Math.min(B.y1 - 24, E)));
        let ie = v - t.x,
          K = E - t.y,
          $ = Math.hypot(ie, K);
        if ($ > 5 && !(f === "venusaur" && this.plantT > 0)) {
          let N = Math.min(1, $ / 24);
          (i.mx = (ie / $) * N), (i.my = (K / $) * N);
        }
        if (
          f === "blastoise" &&
          o.kind === "player" &&
          o.state === "flyUp" &&
          o.t > 6 &&
          p &&
          e.canWithdraw(t) &&
          r() < s.dodge
        )
          return i.held.add("guard"), (this.guardHold = 44 - o.t + 8), i;
        let w = o.kind === "player" ? o : null,
          U = t.kit.smash,
          re = U.reach + U.radius + U.lunge + 14;
        if (
          w &&
          w.state === "smashCharge" &&
          p &&
          y < w.kit.smash.reach + w.kit.smash.lunge + 50 &&
          l - this.punishedT > 20
        ) {
          if (((this.punishedT = l), y < 36 && r() < s.punish))
            return i.pressed.add("attack"), i;
          if (r() < s.dodge)
            return (i.mx = -Math.cos(b)), (i.my = -Math.sin(b)), i;
        }
        if (w && p && y < re) {
          let N = w.state === "attack" ? w.kit.basic()[w.combo] : null;
          if (
            (w.state === "stunned" ||
              w.state === "guardEnd" ||
              (w.state === "dodge" && w.t > w.kit.dodge.ticks) ||
              (w.state === "smash" && w.t > w.kit.smash.active + 2) ||
              (N !== null && !w.swingHit && w.t > N.startup + N.active + 2)) &&
            l - this.punishedT > 12 &&
            ((this.punishedT = l), r() < s.punish)
          )
            return (
              i.pressed.delete("attack"),
              (this.smashHold =
                w.state === "stunned"
                  ? 30 + Math.floor(r() * 25)
                  : 1 + Math.floor(r() * 3)),
              (i.ax = Math.cos(b)),
              (i.ay = Math.sin(b)),
              i
            );
          if (w.state === "guard" && w.t > 10 && r() < 0.05 * s.aggr)
            return (
              (this.smashHold = 18 + Math.floor(r() * 20)),
              (i.ax = Math.cos(b)),
              (i.ay = Math.sin(b)),
              i
            );
        }
        let se = this.threat(e, t, o, y);
        if (
          (se === null
            ? (this.threatT = -1)
            : this.threatT === -1 && (this.threatT = l),
          se !== null &&
            se.melee &&
            t.armored &&
            t.state === "attack" &&
            (this.threatT = 1 / 0),
          se !== null && this.threatT >= 0 && l - this.threatT >= s.react)
        ) {
          if (
            ((this.threatT = 1 / 0),
            se.dreepy && p && r() < s.dodge * he.cpuSwat)
          ) {
            let N = se.dreepy,
              J = Math.atan2(N.y - t.y, N.x - t.x);
            return (
              i.held.delete("lock"),
              (i.mx = Math.cos(J)),
              (i.my = Math.sin(J)),
              i.pressed.add("attack"),
              i
            );
          }
          if (!se.dreepy && p && u.guard > 35 && r() < s.dodge * s.guard * 1.4)
            return (
              i.held.add("guard"),
              (this.guardHold = 12 + Math.floor(r() * 14)),
              i
            );
          if (r() < s.dodge) {
            // Blastoise answers pressure by Withdrawing when it stands in water.
            if (
              f === "blastoise" &&
              !se.dreepy &&
              p &&
              e.canWithdraw(t) &&
              (se.projectile || se.melee)
            )
              return (
                i.held.add("guard"),
                (this.guardHold = 10 + Math.floor(r() * 12)),
                i
              );
            if (u.cdDodge === 0) {
              let N = se.dir + (Math.PI / 2) * (r() < 0.5 ? 1 : -1),
                J = Math.atan2(Te - t.y, Se - t.x);
              return (
                Math.cos(N - J) < -0.3 && (N += Math.PI),
                se.melee && (N = se.dir + (r() < 0.5 ? 0.6 : -0.6)),
                (i.mx = Math.cos(N)),
                (i.my = Math.sin(N)),
                i.pressed.add("dodge"),
                f === "dragapult" &&
                  u.pfCd === 0 &&
                  u.hp < u.maxHp * 0.45 &&
                  r() < 0.5 &&
                  ((this.holdB = 30), (this.phantomAway = !0)),
                (this.holdX = 0),
                i
              );
            }
          }
        }
        if (t.state === "attack") {
          let N = t.kit.basic()[t.combo];
          t.swingId !== this.chainedSwing &&
            t.t >= N.startup &&
            t.combo < t.kit.basic().length - 1 &&
            ((this.chainedSwing = t.swingId),
            r() < s.chain && y < 60 && i.pressed.add("attack"));
        }
        if (
          (t.state === "flyUp" &&
            t.t >= 14 &&
            Math.hypot(t.markX - o.x, t.markY - o.y) < 10 &&
            i.pressed.add("attack"),
          p && l >= this.nextAct)
        ) {
          if (
            ((this.nextAct = l + s.think + Math.floor(r() * s.think)),
            r() > s.aggr)
          )
            return i;
          let N = r() < s.mistake;
          if (y > 26 && y < re && r() < 0.1)
            return (
              (this.smashHold = 1 + Math.floor(r() * (N ? 30 : 8))),
              (i.ax = Math.cos(b)),
              (i.ay = Math.sin(b)),
              i
            );
          if (f === "charizard")
            y > 55 && y < 120 && u.cdDodge === 0 && u.heat < 70 && r() < 0.35
              ? ((i.mx = Math.cos(b)),
                (i.my = Math.sin(b)),
                i.pressed.add("dodge"))
              : y < 30 || (N && y < 55)
                ? i.pressed.add("attack")
                : u.cdX === 0 && y < 96 && u.heat < 55 && r() < 0.4
                  ? (i.pressed.add("special1"),
                    (this.holdX = 22 + Math.floor(r() * 28)))
                  : u.cdY === 0 &&
                    y > 60 &&
                    r() < 0.3 &&
                    i.pressed.add("special2");
          else if (f === "venusaur") {
            let J = u.solar ?? 0,
              fe = !e.losBlocked(t.x, t.y, o.x, o.y);
            if (o.kind === "player" && o.state === "withdraw")
              return (
                u.cdX === 0 &&
                  r() < 0.5 &&
                  (i.pressed.add("special1"), (this.holdX = 16)),
                i
              );
            J >= 0.45 && u.cdY === 0 && fe && y < 250 && r() < 0.5
              ? i.pressed.add("special2")
              : y < 22 && u.cdDodge === 0 && r() < 0.4
                ? ((i.mx = -Math.cos(b)),
                  (i.my = -Math.sin(b)),
                  i.pressed.add("dodge"))
                : y < 50 || (N && y < 70)
                  ? i.pressed.add("attack")
                  : u.cdX === 0 && y < 140 && r() < 0.35
                    ? (i.pressed.add("special1"), (this.holdX = 16))
                    : u.cdY === 0 && J < 0.05 && y > 110 && r() < 0.3
                      ? i.pressed.add("special2")
                      : u.cdX === 0 &&
                        y < 220 &&
                        (i.pressed.add("special1"), (this.holdX = 0));
          } else if (f === "dragapult") {
            let J = (o.burnT ?? 0) > 0,
              fe = o.kind === "player" && o.kit.type === "FIRE",
              ce = e.dreepy.filter(
                (we) =>
                  we.owner === t &&
                  !we.temp &&
                  we.state !== "dazed" &&
                  !we.recalled,
              ),
              pe = ce.some(
                (we) =>
                  Math.hypot(we.x - t.x, we.y - t.y) > y + 10 &&
                  Math.abs(It(Math.atan2(we.y - t.y, we.x - t.x), b)) < 0.5,
              );
            M === 0 && ce.length && (pe ? r() < 0.7 : r() < 0.04)
              ? i.pressed.add("special1")
              : y < 34
                ? r() < 0.75 || N
                  ? i.pressed.add("attack")
                  : u.cdDodge === 0 &&
                    ((i.mx = -Math.cos(b)),
                    (i.my = -Math.sin(b)),
                    i.pressed.add("dodge"))
                : !J && !fe && u.cdY === 0 && y > 45 && y < 200 && r() < 0.6
                  ? i.pressed.add("special2")
                  : M > 0 &&
                      u.cdX === 0 &&
                      y > 40 &&
                      y < 230 &&
                      r() < (J || fe ? 0.8 : 0.5)
                    ? i.pressed.add("special1")
                    : u.pfCd === 0 &&
                      u.cdDodge === 0 &&
                      y > 60 &&
                      y < 150 &&
                      r() < 0.12 &&
                      ((i.mx = Math.cos(b)),
                      (i.my = Math.sin(b)),
                      i.pressed.add("dodge"),
                      (this.holdB = 26),
                      (this.phantomAway = !1));
          } else
            y > 45 && y < 110 && u.cdDodge === 0 && r() < 0.3
              ? ((i.mx = Math.cos(b)),
                (i.my = Math.sin(b)),
                i.pressed.add("dodge"))
              : y < 30 || (N && y < 50)
                ? i.pressed.add("attack")
                : u.cdY === 0 &&
                    y < 120 &&
                    (e.recovering(o.kind === "player" ? o : t) || r() < 0.2)
                  ? (i.pressed.add("special2"),
                    (this.holdY = 10 + Math.floor(r() * 40)))
                  : u.cdX === 0 &&
                    y > 40 &&
                    y < 210 &&
                    r() < 0.45 &&
                    (i.pressed.add("special1"),
                    (this.holdX = r() < 0.5 ? 20 : 0));
        }
        return i;
      }
      threat(e, t, s, i) {
        let r = Math.atan2(t.y - s.y, t.x - s.x);
        if (s.kind === "player") {
          let o = s;
          if (o.state === "attack") {
            let l = o.kit.basic()[o.combo];
            if (
              o.t <= l.startup + l.active &&
              i < l.reach + l.radius + t.hurtR + 8
            )
              return { dir: r, melee: !0, projectile: !1 };
          }
          if (
            o.state === "smash" &&
            o.t <= o.kit.smash.active + 2 &&
            i <
              o.kit.smash.reach +
                o.kit.smash.radius +
                o.kit.smash.lunge +
                t.hurtR
          )
            return { dir: r, melee: !0, projectile: !1 };
          if (
            o.state === "smashCharge" &&
            o.smashCharge > 0.3 &&
            i < o.kit.smash.reach + o.kit.smash.lunge + 30
          )
            return { dir: r, melee: !0, projectile: !1 };
          if (e.isFlaming(o) && i < FLAME.range + 12)
            return { dir: r, melee: !0, projectile: !1 };
          if (
            ((o.state === "flyUp" && o.t > 12) ||
              (o.state === "flySlam" && o.t < 6)) &&
            Math.hypot(o.markX - t.x, o.markY - t.y) < 36
          )
            return {
              dir: Math.atan2(t.y - o.markY, t.x - o.markX),
              melee: !0,
              projectile: !1,
            };
          if (e.isPumping(o) && Math.abs(It(o.dir2, r)) < 0.3)
            return { dir: r, melee: !1, projectile: !0 };
          if (
            (o.state === "pfStrike" && o.t < 7 && i < 46) ||
            (o.state === "qa" && i < 50)
          )
            return { dir: r, melee: !0, projectile: !1 };
        }
        for (let o of e.dreepy) {
          if (o.team === t.team || o.state === "dazed" || o.hits === 99)
            continue;
          let l = t.x - o.x,
            f = t.y - o.y,
            u = o.vx * o.vx + o.vy * o.vy;
          if (u < 0.01) continue;
          let h = (l * o.vx + f * o.vy) / u;
          if (
            !(h <= 0 || h > 14) &&
            Math.hypot(l - o.vx * h, f - o.vy * h) < t.hurtR + 10
          )
            return {
              dir: Math.atan2(o.vy, o.vx),
              melee: !1,
              projectile: !0,
              dreepy: o,
            };
        }
        for (let o of e.projectiles) {
          if (o.team === t.team || o.kind === "seed" || o.dodged) continue;
          let l = t.x - o.x,
            f = t.y - o.y,
            u = o.vx * o.vx + o.vy * o.vy;
          if (u < 0.01) continue;
          let h = (l * o.vx + f * o.vy) / u;
          if (h <= 0 || h > (o.kind === "wisp" ? 30 : 16)) continue;
          let c = l - o.vx * h,
            y = f - o.vy * h;
          if (Math.hypot(c, y) < t.hurtR + o.r + 3)
            return {
              dir: Math.atan2(o.vy, o.vx) % Ga,
              melee: !1,
              projectile: !0,
            };
        }
        return null;
      }
    };
  var Y = 640,
    _ = 360,
    B = { x0: 30, y0: 72, x1: 610, y1: 344 },
    Se = (B.x0 + B.x1) / 2,
    Te = (B.y0 + B.y1) / 2,
    mt = 0,
    Oa = 1,
    Na = 2,
    yt = { strong: 1.05, weak: 0.95 },
    he = {
      base: 11,
      per: 0.04,
      cap: 17,
      back: 0.6,
      hex: 1.3,
      stun: 10,
      kb: 1.8,
      burn: 240,
      daze: 120,
      swatR: 4,
      cpuSwat: 0.5,
      leafDeflect: 1,
      leafR: 1,
      launch: 4.2,
      outMax: 40,
      wispSpeed: 3.2,
      light: 1.15,
      clawHex: 1.4,
    },
    ae = {
      dmg: 1.3,
      launchAt: 6.4,
      whiffLag: 12,
      dodgeLag: 11,
      decay: 0.12,
      guardDrain: 0.16,
      guardRegen: 0.35,
      guardCost: 0.8,
      parryWin: 6,
      parryStun: 40,
      guardRelease: 6,
      breakStun: 110,
      smashGuard: 55,
      smashGuardCharge: 50,
      splat: 30,
      downT: 20,
      getupT: 10,
      techWin: 10,
      softRange: 90,
    },
    _t = { FIRE: "GRASS", GRASS: "WATER", WATER: "FIRE" },
    Wa = { DRAGON: ["FIRE", "WATER", "GRASS"] },
    // Ruins arena: breakable boulders that block bodies, shots and beams.
    // Symmetric: four around the contested centre, one guarding each flank.
    RUINS = {
      r: 15,
      hp: 125,
      respawn: 720,
      warn: 120,
      spots: [
        [Se - 72, Te - 60],
        [Se + 72, Te - 60],
        [Se - 72, Te + 60],
        [Se + 72, Te + 60],
        [Se - 214, Te],
        [Se + 214, Te],
      ],
    },
    // Sitrus Berry: one contested heal at centre, announced before it lands.
    SITRUS = {
      firstAt: 900,
      every: 1200,
      warn: 90,
      life: 600,
      heal: 0.15,
      r: 9,
    },
    // Hits from more than ~107 degrees off a guard's facing get through it.
    FLANK_COS = -0.3,
    // Flamethrower reach, and damage scale from point-blank down to the very tip.
    FLAME = { range: 108, near: 1.45, far: 0.35 },
    // Blastoise artillery. Mega Launcher: shots fired from its own puddle hit harder
    // and fly further. Withdraw is now guard pressed while standing in a puddle.
    // Venusaur Solar Beam: charge, keep it stored by dodging or guarding, fire later.
    SOLAR = {
      chargeTicks: 100,
      rootedRate: 1.6,
      range: 280,
      minDmg: 18,
      maxDmg: 90,
    },
    // Dragapult rapid claws: hold A after the second hit.
    FLURRY = { every: 4, dmg: 6, minTicks: 10, maxTicks: 50 },
    BLAST = {
      pulseDmg: 14,
      pulseSpeed: 3.6,
      pulseLife: 60,
      daze: 50,
      cannonLen: 140,
      cannonDmg: 11,
      megaDmg: 1.25,
      megaRange: 1.3,
      withdrawCd: 60,
    },
    PUNISH_GAP = 40;
  function Ua(a, e) {
    return a === "DRAGON" && e === "DRAGON"
      ? yt.strong
      : Wa[e]?.includes(a)
        ? yt.weak
        : _t[a] === e
          ? yt.strong
          : _t[e] === a
            ? yt.weak
            : 1;
  }
  function rt(a) {
    return () => {
      (a |= 0), (a = (a + 1831565813) | 0);
      let e = Math.imul(a ^ (a >>> 15), 1 | a);
      return (
        (e = (e + Math.imul(e ^ (e >>> 7), 61 | e)) ^ e),
        ((e ^ (e >>> 14)) >>> 0) / 4294967296
      );
    };
  }
  var me = (a, e, t) => Math.max(e, Math.min(t, a)),
    $e = (a, e) => Math.atan2(Math.sin(a - e), Math.cos(a - e)),
    We = (a, e, t) => {
      let s = $e(e, a);
      return a + me(s, -t, t);
    },
    bt = class {
      constructor(e, t, s, i, r) {
        this.team = i;
        this.kind = "player";
        this.active = 0;
        this.z = 0;
        this.pz = 0;
        this.r = 9;
        this.hurtR = 11;
        this.facing = 0;
        this.kvx = 0;
        this.kvy = 0;
        this.hitstop = 0;
        this.flash = 0;
        this.tint = 0;
        this.tintColor = "#ff8a3d";
        this.sqx = 1;
        this.sqy = 1;
        this.animName = "Idle";
        this.animFrame = -1;
        this.spinRow = -1;
        this.alpha = 1;
        this.state = "move";
        this.t = 0;
        this.mvx = 0;
        this.mvy = 0;
        this.combo = 0;
        this.chainQueued = !1;
        this.atkDir = 0;
        this.swingId = 0;
        this.dodgeDir = 0;
        this.dodgeId = 0;
        this.hitstun = 0;
        this.buf = {};
        this.lock = null;
        this.flickArmed = !0;
        this.dir2 = 0;
        this.markX = 0;
        this.markY = 0;
        this.spinVX = 0;
        this.spinVY = 0;
        this.moveId = 0;
        this.stillT = 0;
        this.rooted = !1;
        this.switchCd = 0;
        this.assistCd = 0;
        this.closeCalls = 0;
        this.walkClock = 0;
        this.lastStepFrame = -1;
        this.prevMoveAngle = 0;
        this.holdX = !1;
        this.holdY = !1;
        this.holdB = !1;
        this.flameEnd = 0;
        this.pfDir = 0;
        this.koCount = 0;
        this.lastKoTick = -999;
        this.seededT = 0;
        this.seedOwner = null;
        this.seedSlot = 0;
        this.comboTaken = 0;
        this.armorUsed = 0;
        this.swingHit = !1;
        this.lungeDist = 0;
        this.smashCharge = 0;
        this.smashAim = 0;
        this.rsPrev = !1;
        this.rsHeld = !1;
        this.smashArmed = !1;
        this.launchH = 0;
        this.techAt = -99;
        this.techDir = 0;
        this.tech = !1;
        this.splatted = !1;
        this.stats = {
          dealt: 0,
          taken: 0,
          kos: 0,
          smashHits: 0,
          parries: 0,
          breaks: 0,
          swings: 0,
          landed: 0,
          bestCombo: 0,
          launches: 0,
          techs: 0,
          punishes: 0,
        };
        this.punishT = -99;
        this.dazeT = 0;
        this.pulseShots = 0;
        this.mega = !1;
        this.brain = null;
        (this.slots = r.map((o) => {
          let l = xe[o];
          return {
            kit: l,
            mon: e[o],
            hp: l.hp,
            maxHp: l.hp,
            heat: 0,
            cdX: 0,
            cdY: 0,
            cdDodge: 0,
            burnT: 0,
            pfCd: 0,
            horns: ["loaded", "loaded"],
            guard: 100,
            cdW: 0,
          };
        })),
          (this.mon = this.slots[0].mon),
          (this.x = this.px = t),
          (this.y = this.py = s),
          this.applyKit();
      }
      get isCpu() {
        return !!this.brain;
      }
      get slot() {
        return this.slots[this.active];
      }
      get kit() {
        return this.slot.kit;
      }
      applyKit() {
        let e = this.kit;
        (this.mon = this.slot.mon),
          (this.r = e.r),
          (this.hurtR = e.hurtR),
          (this.tintColor = e.color);
      }
      get invincible() {
        return this.state === "dodge"
          ? this.t < this.kit.dodge.iframes
          : (this.state === "flyUp" && this.t >= 3) ||
              (this.state === "flySlam" && this.t < 5) ||
              this.state === "faint" ||
              this.state === "phantom" ||
              (this.state === "pfStrike" && this.t < 3) ||
              this.state === "down" ||
              (this.state === "getup" && this.t < ae.getupT);
      }
      get vanished() {
        return (
          this.state === "phantom" ||
          (this.state === "dodge" &&
            this.kit.dodge.kind === "phantom" &&
            this.t >= 2 &&
            this.t <= 10)
        );
      }
      get burnT() {
        return this.slot.burnT;
      }
      set burnT(e) {
        this.slot.burnT = e;
      }
      assistSlot() {
        return this.aliveSlot(2) ?? this.aliveSlot(1);
      }
      get armorBudget() {
        if (this.state === "withdraw") return 1 / 0;
        if (this.state === "spin") return this.t < 42 ? 1 : 0;
        if (this.state === "dodge" && this.kit.dodge.kind === "shell") return 1;
        if (this.state === "attack") {
          let e = this.kit.basic()[this.combo];
          return e.armor && this.t <= e.startup + e.active ? 1 : 0;
        }
        return (this.state === "smashCharge" ||
          (this.state === "smash" && this.t <= this.kit.smash.active + 2)) &&
          this.kit.smash.armor
          ? 1
          : 0;
      }
      get armored() {
        return this.armorUsed < this.armorBudget;
      }
      get airborne() {
        return (
          this.state === "flyUp" ||
          (this.state === "flySlam" && this.t < 6) ||
          this.state === "launched"
        );
      }
      aliveSlot(e) {
        let t = 0;
        for (let s = 1; s < this.slots.length; s++) {
          let i = (this.active + s) % this.slots.length;
          if (this.slots[i].hp > 0 && ++t === e) return i;
        }
        return null;
      }
      meter() {
        if (this.hitstop > 0) return "hitstop";
        if (this.invincible) return "iframe";
        if (this.armored) return "armor";
        switch (this.state) {
          case "dodge":
            return "dodge";
          case "hurt":
          case "overheat":
          case "faint":
          case "stunned":
          case "launched":
          case "down":
            return "hurt";
          case "guard":
            return "armor";
          case "smashCharge":
            return "startup";
          case "smash":
            return this.t <= this.kit.smash.active + 2 ? "active" : "recovery";
          case "attack": {
            let e = this.kit.basic()[this.combo];
            return this.t <= e.startup
              ? "startup"
              : this.t <= e.startup + e.active
                ? "active"
                : "recovery";
          }
          case "move":
            return Math.hypot(this.mvx, this.mvy) > 0.3 ? "move" : "idle";
          case "switchIn":
            return "startup";
          default:
            return "active";
        }
      }
    },
    Et = class {
      constructor(e, t, s, i) {
        this.mon = e;
        this.index = i;
        this.kind = "dummy";
        this.team = Oa;
        this.z = 0;
        this.pz = 0;
        this.r = 8;
        this.hurtR = 11;
        this.facing = Math.PI;
        this.kvx = 0;
        this.kvy = 0;
        this.hitstop = 0;
        this.flash = 0;
        this.tint = 0;
        this.tintColor = "#6fd3e8";
        this.sqx = 1;
        this.sqy = 1;
        this.animName = "Idle";
        this.animFrame = -1;
        this.state = "idle";
        this.t = 0;
        this.hitstun = 0;
        this.hp = 600;
        this.maxHp = 600;
        this.combo = 0;
        this.comboDmg = 0;
        this.bestCombo = 0;
        this.tx = 0;
        this.ty = 0;
        this.shootTimer = 60;
        this.aim = Math.PI;
        this.idleT = 0;
        this.alpha = 1;
        this.scale = 1;
        this.hidden = !1;
        this.seededT = 0;
        this.seedOwner = null;
        this.seedSlot = 0;
        this.burnT = 0;
        (this.x = this.px = this.homeX = t),
          (this.y = this.py = this.homeY = s),
          (this.shootTimer = 50 + i * 25);
      }
    },
    Ft = class {
      constructor(e, t, s, i, r, o, l, f) {
        this.mon = e;
        this.kit = t;
        this.slotIndex = s;
        this.summoner = i;
        this.kind = "assist";
        this.z = 0;
        this.pz = 0;
        this.r = 9;
        this.hurtR = 0;
        this.kvx = 0;
        this.kvy = 0;
        this.hitstop = 0;
        this.flash = 0;
        this.tint = 0;
        this.sqx = 1;
        this.sqy = 1;
        this.animName = "Idle";
        this.animFrame = -1;
        this.t = 0;
        this.done = !1;
        this.alpha = 1;
        this.scale = 0;
        (this.x = this.px = r),
          (this.y = this.py = o),
          (this.facing = this.dir = l),
          (this.tintColor = t.color),
          (this.moveId = f);
      }
      get team() {
        return this.summoner.team;
      }
    },
    Ya = [
      [Se + 120, Te],
      [Se + 180, Te - 66],
      [Se + 180, Te + 66],
    ],
    pt = class {
      constructor(e) {
        this.mons = e;
        this.tick = 0;
        this.players = [];
        this.dummies = [];
        this.assists = [];
        this.projectiles = [];
        this.dreepy = [];
        this.puddles = [];
        this.mines = [];
        this.grass = [];
        this.rocks = [];
        this.item = null;
        this.itemT = 0;
        this.arena = 0;
        this.hitboxes = [];
        this.beams = [];
        this.vines = [];
        this.events = [];
        this.meter = [];
        this.slowTicks = 0;
        this.slowScale = 1;
        this.rand = rt(1234);
        this.nextId = 1;
        this.hitLog = new Map();
        this.intro = 70;
        this.match = {
          mode: "vs",
          round: 1,
          wins: 0,
          losses: 0,
          phase: "fight",
          endT: 0,
          result: null,
          combo: 0,
          you: [],
          cpu: [],
          dealt: 0,
          taken: 0,
          ticks: 0,
        };
        this.startMatch("practice", ["charizard", "dragapult"], []);
      }
      get player() {
        return this.players[0];
      }
      get cpu() {
        return this.players[1] ?? null;
      }
      startMatch(e, t, s, i = !1) {
        let r = this.match;
        if (
          ((r.mode = e),
          (r.you = [...t]),
          (r.cpu = [...s]),
          i ? r.round++ : ((r.round = 1), (r.wins = 0), (r.losses = 0)),
          (r.phase = "fight"),
          (r.result = null),
          (r.combo = 0),
          (r.endT = 0),
          (r.dealt = 0),
          (r.taken = 0),
          (r.ticks = 0),
          (this.players = [new bt(this.mons, Se - 120, Te, mt, t)]),
          (this.projectiles = []),
          (this.puddles = []),
          (this.mines = []),
          (this.grass = []),
          (this.arena = A.arena),
          (this.rocks =
            A.arena === 1
              ? RUINS.spots.map(([o, l]) => ({
                  id: this.nextId++,
                  x: o,
                  y: l,
                  r: RUINS.r,
                  hp: RUINS.hp,
                  max: RUINS.hp,
                  state: "solid",
                  t: 0,
                  hitT: 0,
                }))
              : []),
          (this.item = null),
          (this.itemT = SITRUS.firstAt),
          (this.assists = []),
          (this.dreepy = []),
          this.hitLog.clear(),
          (this.slowTicks = 0),
          e === "vs" && s.length)
        ) {
          let o = new bt(this.mons, Se + 120, Te, Na, s);
          (o.facing = Math.PI),
            (o.brain = new ft(this.rand)),
            this.players.push(o),
            (this.dummies = []);
        } else (this.dummies = []), this.syncDummies();
        (this.intro = 70),
          this.emit({
            type: "roundStart",
            round: r.round,
            cpuKit: (this.cpu ?? this.player).kit,
          });
      }
      rematch() {
        this.startMatch(this.match.mode, this.match.you, this.match.cpu, !0);
      }
      syncDummies() {
        if (this.match.mode === "vs") {
          this.dummies = [];
          return;
        }
        let e = A.dummyCount;
        for (; this.dummies.length < e; ) {
          let t = this.dummies.length,
            [s, i] = Ya[t];
          this.dummies.push(new Et(this.mons.wobbuffet, s, i, t));
        }
        for (; this.dummies.length > e; ) {
          let t = this.dummies.pop();
          this.player.lock === t && (this.player.lock = null);
        }
      }
      emit(e) {
        this.events.push(e);
      }
      bodies() {
        return [...this.players, ...this.dummies, ...this.assists];
      }
      liveDummies() {
        return this.dummies.filter((e) => this.canBeHit(e));
      }
      timeScale() {
        return this.slowTicks > 0 ? this.slowScale : 1;
      }
      slow(e, t) {
        (t <= this.timeScale() || this.slowTicks < e) &&
          ((this.slowTicks = e), (this.slowScale = t));
      }
      targetsFor(e) {
        let t = [];
        for (let s of this.players)
          s.team !== e && s.state !== "faint" && !s.vanished && t.push(s);
        for (let s of this.dummies)
          s.team !== e && this.canBeHit(s) && t.push(s);
        return t;
      }
      victimsFor(e) {
        let t = [];
        for (let s of this.players)
          s.team !== e && !s.invincible && !s.airborne && t.push(s);
        for (let s of this.dummies)
          s.team !== e && this.canBeHit(s) && t.push(s);
        return t;
      }
      nearestTarget(e, t, s) {
        let i = null,
          r = 1 / 0;
        for (let o of this.targetsFor(e)) {
          let l = Math.hypot(o.x - t, o.y - s);
          l < r && ((r = l), (i = o));
        }
        return i;
      }
      step(e) {
        this.tick++,
          (this.events = []),
          (this.hitboxes = []),
          (this.beams = []),
          (this.vines = []);
        for (let i of this.bodies()) (i.px = i.x), (i.py = i.y), (i.pz = i.z);
        for (let i of this.projectiles)
          (i.px = i.x), (i.py = i.y), (i.pz = i.z);
        for (let i of this.dreepy) (i.px = i.x), (i.py = i.y), (i.pz = i.z);
        this.match.phase === "fight" && this.intro <= 0 && this.match.ticks++,
          this.intro > 0 &&
            (this.intro--, this.intro === 20 && this.emit({ type: "readyGo" }));
        let t = this.players.map((i) => (i.brain ? i.brain.think(this, i) : e)),
          s =
            this.tick % 2 === 0
              ? this.players.map((i, r) => r)
              : this.players.map((i, r) => this.players.length - 1 - r);
        for (let i of s) this.updatePlayer(this.players[i], t[i]);
        for (let i of this.assists) this.updateAssist(i);
        this.assists = this.assists.filter((i) => !i.done);
        for (let i of this.dummies) this.updateDummy(i);
        this.updateProjectiles(),
          this.updateDreepy(),
          this.updateGround(),
          this.updateArena(),
          this.updateSeeds(),
          this.resolveHits(),
          this.pushApart(),
          this.updateMatch();
        for (let i of this.bodies())
          i.flash > 0 && i.flash--,
            i.tint > 0 && i.tint--,
            (i.sqx += (1 - i.sqx) * 0.35),
            (i.sqy += (1 - i.sqy) * 0.35);
        if ((this.slowTicks > 0 && this.slowTicks--, this.tick % 120 === 0))
          for (let [i, r] of this.hitLog) {
            let o = !1;
            for (let l of r.values()) this.tick - l < 120 && (o = !0);
            o || this.hitLog.delete(i);
          }
        this.meter.push(this.player.meter()),
          this.meter.length > 90 && this.meter.shift();
      }
      updateMatch() {
        let e = this.match;
        e.mode !== "vs" ||
          e.phase !== "end" ||
          (--e.endT <= 0 && (e.phase = "results"));
      }
      endRound(e) {
        let t = this.match;
        t.phase !== "end" &&
          ((t.phase = "end"),
          (t.endT = 150),
          (t.result = e),
          e === "win" ? t.wins++ : t.losses++,
          this.emit({ type: "roundEnd", result: e }));
      }
      updatePlayer(e, t) {
        this.cur = e;
        let s = e.kit,
          i = e.slot;
        (e.holdX = t.held.has("special1")),
          (e.holdG = t.held.has("guard")),
          (e.holdA = t.held.has("attack")),
          (e.holdY = t.held.has("special2")),
          (e.holdB = t.held.has("dodge"));
        let r = [
          "attack",
          "dodge",
          "special1",
          "special2",
          "switch",
          "assist",
          "guard",
          "smash",
        ];
        for (let v of r)
          v !== "smash" && t.pressed.has(v) && (e.buf[v] = A.bufferTicks + 1);
        let o = Math.hypot(t.ax, t.ay);
        e.rsHeld = o > 0.6;
        let l = t.held.has("lock") && this.targetsFor(e.team).length > 1;
        e.rsHeld &&
          !e.rsPrev &&
          !l &&
          ((e.buf.smash = A.bufferTicks + 3),
          (e.smashArmed = !0),
          (e.smashAim = Math.atan2(t.ay, t.ax))),
          e.rsHeld || (e.smashArmed = !1),
          (e.rsPrev = e.rsHeld),
          e.smashArmed && (e.buf.smash = Math.max(e.buf.smash ?? 0, 2)),
          e.rsHeld && (e.smashAim = Math.atan2(t.ay, t.ax)),
          t.pressed.has("dodge") &&
            e.state === "launched" &&
            (e.techAt = this.tick);
        let f = (v) => (e.buf[v] ?? 0) > 0,
          u = (v) => {
            e.buf[v] = 0;
          };
        this.updateLock(e, t);
        for (let v of e.slots)
          v.cdX > 0 && v.cdX--,
            v.cdY > 0 && v.cdY--,
            v.cdDodge > 0 && v.cdDodge--,
            v.pfCd > 0 && v.pfCd--,
            v.cdW > 0 && v.cdW--,
            v.burnT > 0 &&
              (v.burnT--,
              v === i &&
                v.burnT % 30 === 0 &&
                e.state !== "faint" &&
                v.hp > 1 &&
                this.match.phase === "fight" &&
                ((v.hp = Math.max(1, v.hp - 4)),
                this.emit({ type: "burnTick", who: e, x: e.x, y: e.y }))),
            (v === i && (e.state === "guard" || e.state === "stunned")) ||
              (v.guard = Math.min(
                100,
                v.guard + ae.guardRegen * (v === i ? 1 : 2),
              )),
            !(v === i && e.state === "flame") &&
              v.heat > 0 &&
              (v.heat = Math.max(0, v.heat - (v === i ? 0.35 : 0.6)));
        if (
          (e.switchCd > 0 && e.switchCd--,
          e.assistCd > 0 && e.assistCd--,
          e.seededT > 0 && e.seededT--,
          e.dazeT > 0 && e.dazeT--,
          e.hitstop > 0)
        ) {
          e.hitstop--;
          return;
        }
        for (let v of r) e.buf[v] && e.buf[v]--;
        e.t++;
        let h = this.intro <= 20 && this.match.phase === "fight",
          c = (e.seededT > 0 ? 0.5 : 1) * (e.dazeT > 0 ? 0.65 : 1),
          y = t.mx * c,
          b = t.my * c,
          p = Math.hypot(t.mx, t.my),
          k = Math.atan2(t.my, t.mx),
          M = e.lock ? Math.atan2(e.lock.y - e.y, e.lock.x - e.x) : null,
          P = M ?? (p > 0.3 ? k : e.facing);
        if (e.state === "faint") {
          this.tickFaint(e);
          return;
        }
        if (s.id === "venusaur") {
          let v = p < 0.25 && e.state !== "dodge" && e.state !== "hurt";
          e.stillT = v ? e.stillT + 1 : 0;
          let E = e.rooted;
          (e.rooted = e.stillT >= 50),
            e.rooted !== E &&
              this.emit({ type: "rooted", who: e, on: e.rooted });
        } else e.rooted && ((e.rooted = !1), (e.stillT = 0));
        let C =
          h &&
          e.switchCd === 0 &&
          e.aliveSlot(1) !== null &&
          ![
            "hurt",
            "flyUp",
            "flySlam",
            "overheat",
            "switchIn",
            "phantom",
            "pfStrike",
            "qa",
            "stunned",
            "launched",
            "down",
            "getup",
            "smashCharge",
            "smash",
          ].includes(e.state);
        if (f("switch") && C) {
          u("switch"), this.doSwitch(e, e.aliveSlot(1), !1);
          return;
        }
        f("assist") &&
          h &&
          e.assistCd === 0 &&
          e.assistSlot() !== null &&
          !["hurt", "stunned", "launched", "down"].includes(e.state) &&
          (u("assist"), this.callAssist(e, P));
        let x =
          [
            "dodge",
            "flyUp",
            "flySlam",
            "overheat",
            "phantom",
            "pfStrike",
            "qa",
            "stunned",
            "launched",
            "down",
            "getup",
            "smashCharge",
            "smash",
            "guardEnd",
          ].includes(e.state) ||
          (e.state === "hurt" && e.t < A.hitstunDodgeCancel) ||
          (e.state === "switchIn" && e.t < 4);
        switch (
          (f("dodge") &&
            h &&
            i.cdDodge === 0 &&
            !x &&
            (u("dodge"),
            this.startDodge(
              e,
              p > 0.3 ? k : M !== null ? M + Math.PI : e.facing,
            )),
          s.id === "blastoise" &&
            e.state === "hurt" &&
            e.t >= A.hitstunDodgeCancel &&
            h &&
            e.holdG &&
            this.canWithdraw(e) &&
            this.startWithdraw(e),
          e.state)
        ) {
          case "move":
          case "switchIn": {
            if (e.state === "switchIn") {
              if (e.t >= 12) (e.state = "move"), (e.t = 0);
              else if (e.t < 4) {
                this.locomote(e, y * 0.4, b * 0.4);
                break;
              }
            }
            if (!h) {
              this.locomote(e, 0, 0), M !== null && (e.facing = M);
              break;
            }
            if (
              t.held.has("guard") &&
              e.state === "move" &&
              this.canWithdraw(e)
            ) {
              u("guard"), this.startWithdraw(e);
              break;
            }
            if (t.held.has("guard") && e.state === "move") {
              u("guard"), this.startGuard(e);
              break;
            }
            if (f("smash")) {
              u("smash"), this.startSmash(e, e.smashAim);
              break;
            }
            if (f("attack")) {
              u("attack"), this.startAttack(e, 0, P);
              break;
            }
            if (f("special1") && i.cdX === 0) {
              u("special1"), this.startSpecial(e, "x", P);
              break;
            }
            if (f("special2") && i.cdY === 0) {
              u("special2"), this.startSpecial(e, "y", P);
              break;
            }
            this.locomote(e, y, b),
              M !== null ? (e.facing = M) : p > 0.3 && (e.facing = k);
            let v = Math.hypot(e.mvx, e.mvy);
            p > 0.5 &&
              v > s.speed * 0.6 &&
              (Math.abs($e(k, e.prevMoveAngle)) > 2 &&
                this.emit({
                  type: "step",
                  who: e,
                  x: e.x,
                  y: e.y,
                  skid: !0,
                  dx: Math.cos(e.prevMoveAngle),
                  dy: Math.sin(e.prevMoveAngle),
                }),
              (e.prevMoveAngle = k));
            break;
          }
          case "attack":
            this.tickAttack(e, P, p);
            break;
          case "dodge":
            this.tickDodge(e, f, u, P, p);
            break;
          case "hurt":
            this.locomote(e, 0, 0),
              e.t >= e.hitstun && ((e.state = "move"), (e.t = 0));
            break;
          case "overheat":
            this.locomote(e, y * 0.3, b * 0.3),
              e.t >= 45 && ((e.state = "move"), (e.t = 0), (i.heat = 35));
            break;
          case "flame":
            this.tickFlame(e, y, b, p, k);
            break;
          case "flyUp":
          case "flySlam":
            this.tickFly(e, y, b, f, u);
            break;
          case "pump":
            this.tickPump(e, p, k);
            break;
          case "pulse":
            this.tickPulse(e, P);
            break;
          case "withdraw":
            this.tickWithdraw(e, p, k, M);
            break;
          case "spin":
            this.tickSpin(e, p, k);
            break;
          case "leaf":
            this.tickLeaf(e, y, b, P);
            break;
          case "seed":
            this.tickSeed(e, P, p, k);
            break;
          case "leafAim":
            // Tap X for Razor Leaf; keep holding past the threshold for Leech Seed.
            this.locomote(e, 0, 0),
              !e.holdX
                ? ((e.state = "leaf"), (e.t = 4))
                : e.t >= 10 && ((e.state = "seed"), (e.t = 0));
            break;
          case "solar":
            this.tickSolar(e, P, f, u);
            break;
          case "solarFire":
            this.tickSolarFire(e, P);
            break;
          case "flurry":
            this.tickFlurry(e, P);
            break;
          case "darts":
            this.tickDarts(e, P);
            break;
          case "wisp":
            this.tickWisp(e, P, y, b);
            break;
          case "phantom":
            this.tickPhantom(e, t, y, b);
            break;
          case "pfStrike":
            this.tickPfStrike(e);
            break;
          case "qa":
            this.tickQuickAttack(e);
            break;
          case "guard":
            this.tickGuard(e, t, M, p, k);
            break;
          case "guardEnd":
            this.locomote(e, 0, 0),
              e.t >= ae.guardRelease && ((e.state = "move"), (e.t = 0));
            break;
          case "stunned":
            this.locomote(e, 0, 0),
              e.t >= e.hitstun && ((e.state = "move"), (e.t = 0));
            break;
          case "launched":
            this.tickLaunched(e, p, k);
            break;
          case "down":
            this.locomote(e, 0, 0),
              (e.t >= ae.downT ||
                (e.t >= 12 &&
                  (t.pressed.has("attack") ||
                    t.pressed.has("dodge") ||
                    p > 0.5))) &&
                ((e.state = "getup"),
                (e.t = 0),
                (e.tech = !1),
                this.emit({ type: "getup", who: e }));
            break;
          case "getup":
            this.tickGetup(e);
            break;
          case "smashCharge":
            this.tickSmashCharge(e);
            break;
          case "smash":
            this.tickSmash(e, P);
            break;
        }
        if (
          (s.id === "charizard" &&
            i.heat >= 100 &&
            e.state !== "overheat" &&
            ((e.state = "overheat"),
            (e.t = 0),
            (i.heat = 100),
            this.emit({ type: "overheat", who: e })),
          s.id === "venusaur")
        )
          for (let v of this.grass)
            v.owner === e &&
              Math.hypot(v.x - e.x, v.y - e.y) < v.r &&
              i.hp < i.maxHp &&
              ((i.hp = Math.min(i.maxHp, i.hp + 0.3)),
              this.tick % 20 === 0 &&
                this.emit({
                  type: "heal",
                  x: e.x,
                  y: e.y,
                  amount: 12,
                  who: e,
                }));
        this.applyKnockback(e), this.animatePlayer(e);
      }
      tickFaint(e) {
        if (
          (this.locomote(e, 0, 0),
          this.applyKnockback(e),
          (e.animName = "Hurt"),
          (e.animFrame = 1),
          (e.alpha = e.t < 36 ? 1 : Math.max(0, 1 - (e.t - 36) / 14)),
          e.t === 60)
        ) {
          let t = e.aliveSlot(1);
          if (this.match.mode === "vs" && t === null) {
            this.endRound(e.isCpu ? "win" : "lose");
            return;
          }
          t !== null && ((e.alpha = 1), this.doSwitch(e, t, !0));
        }
      }
      updateLock(e, t) {
        let s = t.held.has("lock"),
          i = this.targetsFor(e.team);
        if (!s) {
          e.lock &&
            ((e.lock = null),
            this.emit({ type: "lock", who: e, target: null }));
          return;
        }
        e.lock && !i.includes(e.lock) && (e.lock = null),
          !e.lock &&
            i.length &&
            ((e.lock = i.reduce((o, l) =>
              Math.hypot(o.x - e.x, o.y - e.y) <
              Math.hypot(l.x - e.x, l.y - e.y)
                ? o
                : l,
            )),
            this.emit({ type: "lock", who: e, target: e.lock }));
        let r = Math.hypot(t.ax, t.ay);
        if (r < 0.35) e.flickArmed = !0;
        else if (r > 0.7 && e.flickArmed && e.lock) {
          e.flickArmed = !1;
          let o = Math.atan2(t.ay, t.ax),
            l = null,
            f = 1 / 0;
          for (let u of i) {
            if (u === e.lock) continue;
            let h = Math.abs($e(Math.atan2(u.y - e.lock.y, u.x - e.lock.x), o));
            h < 1.6 && h < f && ((f = h), (l = u));
          }
          l && ((e.lock = l), this.emit({ type: "lock", who: e, target: l }));
        }
      }
      doSwitch(e, t, s) {
        let i = e.kit;
        if (i.id === "dragapult" && !s) {
          let r = e.lock ?? this.nearestTarget(e.team, e.x, e.y);
          if (
            r &&
            Math.hypot(r.x - e.x, r.y - e.y) < 70 &&
            this.victimsFor(e.team).includes(r)
          ) {
            let o = r.x - e.x,
              l = r.y - e.y,
              f = Math.hypot(o, l) || 1;
            this.emit({
              type: "uturn",
              x1: e.x,
              y1: e.y,
              x2: r.x + (o / f) * 18,
              y2: r.y + (l / f) * 18,
              who: e,
            }),
              this.applyHit(
                r,
                e,
                24,
                3.2,
                o / f,
                l / f,
                !1,
                5,
                16,
                i.color,
                r.x,
                r.y,
                !1,
                !1,
                `${i.id}:uturn`,
                !0,
              );
          }
        }
        if (
          (e.state === "flame" && !e.flameEnd && (e.slot.cdX = i.xCd),
          e.state === "pump" && (e.slot.cdY = i.yCd),
          e.state === "solar" && this.storeSolar(e),
          (e.state === "withdraw" || e.state === "spin") &&
            (e.slot.cdW = BLAST.withdrawCd),
          (e.flameEnd = 0),
          (e.active = t),
          e.applyKit(),
          (e.state = "switchIn"),
          (e.t = 0),
          (e.combo = 0),
          (e.chainQueued = !1),
          (e.z = 0),
          (e.alpha = 1),
          (e.mvx *= 0.3),
          (e.mvy *= 0.3),
          (e.rooted = !1),
          (e.stillT = 0),
          (e.spinRow = -1),
          (e.switchCd = A.switchCooldown),
          (e.sqx = 0.6),
          (e.sqy = 1.5),
          this.clampToArena(e, !1),
          this.emit({
            type: "switch",
            who: e,
            from: i,
            to: e.kit,
            x: e.x,
            y: e.y,
            forced: s,
          }),
          e.kit.id === "dragapult")
        ) {
          let r = e.lock ?? this.nearestTarget(e.team, e.x, e.y);
          r &&
            Math.hypot(r.x - e.x, r.y - e.y) < 130 &&
            ((e.state = "qa"),
            (e.t = 0),
            (e.dir2 = Math.atan2(r.y - e.y, r.x - e.x)),
            (e.facing = e.dir2),
            (e.moveId = this.nextId++),
            this.emit({ type: "qa", who: e }));
        }
      }
      callAssist(e, t) {
        let s = e.assistSlot(),
          i = e.slots[s],
          r = e.lock ?? this.nearestTarget(e.team, e.x, e.y),
          o = r ? Math.atan2(r.y - e.y, r.x - e.x) : t,
          l = o + Math.PI / 2,
          f = me(
            e.x + Math.cos(l) * 22 - Math.cos(o) * 6,
            B.x0 + 12,
            B.x1 - 12,
          ),
          u = me(e.y + Math.sin(l) * 22 - Math.sin(o) * 6, B.y0 + 8, B.y1 - 6),
          h = new Ft(i.mon, i.kit, s, e, f, u, o, this.nextId++);
        this.assists.push(h),
          (e.assistCd = A.assistCooldown),
          this.emit({ type: "assist", kit: i.kit, who: h });
      }
      startAttack(e, t, s) {
        let i = e.kit.basic()[t];
        (e.state = "attack"),
          (e.t = 0),
          (e.combo = t),
          (e.chainQueued = !1),
          (e.armorUsed = 0),
          (e.swingHit = !1),
          e.stats.swings++,
          (e.atkDir = this.aimAssist(
            e,
            s,
            Math.max(ae.softRange, i.reach + 40),
          )),
          (e.facing = e.atkDir),
          (e.lungeDist =
            i.shape === "vine"
              ? i.lunge
              : i.lunge + this.magnet(e, e.atkDir, i.reach, i.radius, 24)),
          (e.swingId = this.nextId++),
          (e.mvx *= 0.3),
          (e.mvy *= 0.3),
          this.emit({
            type: "swing",
            who: e,
            heavy: i.heavy,
            dx: Math.cos(e.atkDir),
            dy: Math.sin(e.atkDir),
            kit: e.kit.id,
          });
      }
      tickAttack(e, t, s) {
        let i = e.kit.basic(),
          r = i[e.combo];
        if (
          (e.buf.attack &&
            e.t >= 2 &&
            ((e.chainQueued = !0), (e.buf.attack = 0)),
          e.t <= 2 &&
            (e.lock || s > 0.3) &&
            ((e.atkDir = this.aimAssist(
              e,
              t,
              Math.max(ae.softRange, r.reach + 40),
            )),
            (e.facing = e.atkDir)),
          e.t <= r.startup + r.active)
        ) {
          let u = (c) => 1 - Math.pow(1 - me(c, 0, 1), 2),
            h =
              e.lungeDist *
              (u(e.t / (r.startup + r.active)) -
                u((e.t - 1) / (r.startup + r.active)));
          for (let c of this.targetsFor(e.team))
            Math.hypot(c.x - e.x, c.y - e.y) < e.r + c.r + 6 && (h *= 0.15);
          this.moveBody(e, Math.cos(e.atkDir) * h, Math.sin(e.atkDir) * h);
        }
        let o = Math.cos(e.atkDir),
          l = Math.sin(e.atkDir);
        if (r.shape === "vine") {
          let u = r.startup + r.active + r.recovery,
            h =
              e.t <= r.startup
                ? Math.pow(e.t / r.startup, 0.5) * 0.35
                : e.t <= r.startup + r.active
                  ? 1
                  : Math.max(
                      0,
                      1 - (e.t - r.startup - r.active) / (r.recovery * 0.6),
                    );
          e.t >= r.startup - 2 &&
            e.t < u &&
            this.vines.push({
              x1: e.x + o * 8,
              y1: e.y + l * 8 - 8,
              x2: e.x + o * r.reach * h,
              y2: e.y + l * r.reach * h - 8,
              ext: h,
              owner: e,
            });
        }
        e.t === r.startup + 1 &&
          this.emit({
            type: "strike",
            who: e,
            kit: e.kit.id,
            dx: o,
            dy: l,
            reach: r.reach,
            radius: r.radius,
            heavy: r.heavy,
            combo: e.combo,
            last: e.combo === i.length - 1 && i.length > 1,
            smash: !1,
          });
        if (e.t > r.startup && e.t <= r.startup + r.active) {
          let u =
            r.shape === "vine"
              ? {
                  kind: "capsule",
                  x1: e.x + o * 10,
                  y1: e.y + l * 10,
                  x2: e.x + o * r.reach,
                  y2: e.y + l * r.reach,
                  r: r.radius,
                }
              : {
                  kind: "circle",
                  x: e.x + o * (r.reach + 2),
                  y: e.y + l * (r.reach + 2),
                  r: r.radius * 1.2,
                };
          this.hitboxes.push({
            id: e.swingId,
            team: e.team,
            owner: e,
            shape: u,
            dmg: r.dmg,
            kb: r.kb,
            kbMode: r.pull ? "pull" : "dir",
            dx: o,
            dy: l,
            heavy: r.heavy,
            hitstop: r.heavy ? A.hitstopHeavy : A.hitstopLight,
            hitstun: r.hitstun ?? (r.heavy ? A.hitstunHeavy : A.hitstunLight),
            color: e.kit.color,
            rehit: 0,
            attackerStop: !0,
            reflects: !0,
            heat: r.heat,
            fire: e.kit.id === "charizard",
            src: `basic${e.combo + 1}`,
            melee: !0,
            hex: r.hex,
          });
        }
        if (e.t > r.startup + r.active && e.swingHit) {
          let u = e.slot;
          if ((e.buf.smash ?? 0) > 0) {
            (e.buf.smash = 0), this.startSmash(e, e.smashAim);
            return;
          }
          if ((e.buf.special1 ?? 0) > 0 && u.cdX === 0) {
            (e.buf.special1 = 0), this.startSpecial(e, "x", t);
            return;
          }
          if ((e.buf.special2 ?? 0) > 0 && u.cdY === 0) {
            (e.buf.special2 = 0), this.startSpecial(e, "y", t);
            return;
          }
        }
        let f = r.startup + r.active + 2;
        if (
          e.kit.id === "dragapult" &&
          e.combo === 1 &&
          e.swingHit &&
          e.holdA &&
          !e.chainQueued &&
          e.t >= f
        ) {
          (e.state = "flurry"),
            (e.t = 0),
            (e.moveId = this.nextId++),
            this.emit({ type: "flurryStart", who: e });
          return;
        }
        if (e.chainQueued && e.swingHit && e.combo < i.length - 1 && e.t >= f) {
          this.startAttack(e, e.combo + 1, t);
          return;
        }
        e.t >=
          r.startup + r.active + r.recovery + (e.swingHit ? 0 : ae.whiffLag) &&
          ((e.state = "move"), (e.t = 0), (e.combo = 0), (e.chainQueued = !1)),
          this.locomote(e, 0, 0);
      }
      aimAssist(e, t, s) {
        if (e.lock) return Math.atan2(e.lock.y - e.y, e.lock.x - e.x);
        if (A.meleeAssist <= 0) return t;
        let i = t,
          r = 1 / 0,
          o = (A.meleeAssist * Math.PI) / 180;
        for (let l of this.targetsFor(e.team)) {
          let f = Math.hypot(l.x - e.x, l.y - e.y);
          if (f > s) continue;
          let u = Math.atan2(l.y - e.y, l.x - e.x),
            h = Math.abs($e(u, t));
          if (h > o && f > 40) continue;
          let c = h * 40 + f;
          c < r && ((r = c), (i = u));
        }
        return i;
      }
      magnet(e, t, s, i, r) {
        let o = 0;
        for (let l of this.targetsFor(e.team)) {
          let f = Math.hypot(l.x - e.x, l.y - e.y);
          f > ae.softRange ||
            Math.abs($e(Math.atan2(l.y - e.y, l.x - e.x), t)) > 0.5 ||
            (o = Math.max(o, me(f - (s + i * 0.5 + l.hurtR * 0.5), 0, r)));
        }
        return o;
      }
      startDodge(e, t) {
        e.state === "solar" && this.storeSolar(e);
        let s = e.kit.dodge;
        (e.state = "dodge"),
          (e.t = 0),
          (e.dodgeDir = t),
          (e.facing = t),
          (e.dodgeId = this.nextId++),
          (e.armorUsed = 0),
          (e.slot.cdDodge = s.cooldown),
          (e.kvx *= 0.2),
          (e.kvy *= 0.2),
          (e.chainQueued = !1),
          (e.combo = 0);
        let i = Math.abs(Math.cos(t));
        (e.sqx = 1 + 0.35 * i - 0.2 * (1 - i)),
          (e.sqy = 1 + 0.35 * (1 - i) - 0.2 * i),
          this.emit({
            type: "dodge",
            who: e,
            dx: Math.cos(t),
            dy: Math.sin(t),
            kind: s.kind,
          });
      }
      tickDodge(e, t, s, i, r) {
        let o = e.kit.dodge,
          l = o.kind === "shell" && this.inPuddle(e.x, e.y, e.team, !0),
          f = o.dist * (l ? 1.4 : 1),
          u = (c) =>
            1 -
            Math.pow(
              1 - Math.min(1, c / o.ticks),
              o.kind === "shell" ? 1.6 : 2.4,
            ),
          h = e.t <= o.ticks ? f * (u(e.t) - u(e.t - 1)) : 0;
        if (
          (this.moveBody(e, Math.cos(e.dodgeDir) * h, Math.sin(e.dodgeDir) * h),
          o.kind === "air" &&
            e.t <= o.ticks &&
            (e.z = Math.sin(Math.min(1, e.t / o.ticks) * Math.PI) * 9),
          o.kind === "phantom" &&
            (e.t === 2 && this.emit({ type: "phantom", who: e }),
            e.t === 7 && e.holdB && e.slot.pfCd === 0))
        ) {
          (e.state = "phantom"),
            (e.t = 0),
            (e.pfDir = e.dodgeDir),
            (e.lock = e.lock);
          return;
        }
        o.kind === "shell" &&
          e.t <= o.ticks &&
          ((e.spinRow = Math.floor(e.t / 2) % 8),
          this.hitboxes.push({
            id: e.dodgeId,
            team: e.team,
            owner: e,
            shape: { kind: "circle", x: e.x, y: e.y, r: 14 },
            dmg: 18,
            kb: 4,
            kbMode: "away",
            dx: Math.cos(e.dodgeDir),
            dy: Math.sin(e.dodgeDir),
            heavy: !1,
            hitstop: 4,
            hitstun: 14,
            color: e.kit.color,
            rehit: 0,
            attackerStop: !1,
            src: "shellslide",
            melee: !0,
          }),
          l &&
            e.t % 3 === 0 &&
            this.emit({
              type: "step",
              who: e,
              x: e.x,
              y: e.y,
              skid: !0,
              dx: Math.cos(e.dodgeDir),
              dy: Math.sin(e.dodgeDir),
            })),
          e.t > o.ticks
            ? (this.locomote(e, 0, 0), (e.z = 0), (e.spinRow = -1))
            : ((e.mvx = Math.cos(e.dodgeDir) * e.kit.speed * 0.6),
              (e.mvy = Math.sin(e.dodgeDir) * e.kit.speed * 0.6)),
          this.emit({
            type: "dodgeTick",
            who: e,
            t: e.t,
            iframe: e.invincible,
          }),
          e.t >= o.ticks + ae.dodgeLag &&
            ((e.state = "move"),
            (e.t = 0),
            (e.z = 0),
            (e.spinRow = -1),
            r < 0.3 && ((e.mvx *= 0.3), (e.mvy *= 0.3)),
            t("attack")
              ? (s("attack"), this.startAttack(e, 0, i))
              : t("special1") && e.slot.cdX === 0
                ? (s("special1"), this.startSpecial(e, "x", i))
                : t("special2") &&
                  e.slot.cdY === 0 &&
                  (s("special2"), this.startSpecial(e, "y", i)));
      }
      startGuard(e) {
        (e.state = "guard"),
          (e.t = 0),
          (e.combo = 0),
          (e.chainQueued = !1),
          (e.mvx *= 0.3),
          (e.mvy *= 0.3),
          this.emit({ type: "guardUp", who: e });
      }
      tickGuard(e, t, s, i, r) {
        if (
          (this.locomote(e, 0, 0),
          s !== null ? (e.facing = s) : i > 0.3 && (e.facing = r),
          (e.slot.guard -= ae.guardDrain),
          e.slot.guard <= 0)
        ) {
          this.guardBreak(e);
          return;
        }
        t.held.has("guard") || ((e.state = "guardEnd"), (e.t = 0));
      }
      guardBreak(e) {
        (e.state = "stunned"),
          (e.t = 0),
          (e.hitstun = ae.breakStun),
          (e.slot.guard = 0),
          (e.kvx *= 0.3),
          (e.kvy *= 0.3),
          this.emit({ type: "guardBreak", who: e });
      }
      guardHit(e, t, s, i, r, o, l, f, u, h) {
        let c = e.slot;
        if (
          (t &&
            t.kind === "player" &&
            f &&
            !t.swingHit &&
            ((t.swingHit = !0), t.stats.landed++),
          e.t <= ae.parryWin && !(h > 0.66))
        ) {
          let k = t && t.kind === "player" && f && !u ? t : null;
          k &&
            ((k.state = "hurt"),
            (k.t = 0),
            (k.hitstun = ae.parryStun),
            (k.combo = 0),
            (k.chainQueued = !1),
            (k.flameEnd = 0),
            (k.kvx = -i * 2.4),
            (k.kvy = -r * 2.4),
            (k.flash = 4),
            (k.hitstop = 14)),
            (e.hitstop = 14),
            (c.guard = Math.min(100, c.guard + 12)),
            e.stats.parries++,
            e.isCpu || this.slow(18, 0.35),
            this.emit({
              type: "perfectGuard",
              who: e,
              attacker: k,
              x: e.x,
              y: e.y,
            });
          return;
        }
        let y =
          h > 0
            ? ae.smashGuard + h * ae.smashGuardCharge
            : s * ae.guardCost * (o ? 1.3 : 1);
        c.guard -= y;
        let b = (h > 0 ? 3.4 : o ? 2.4 : u ? 0.5 : 1.4) * e.kit.weight;
        (e.kvx = i * b),
          (e.kvy = r * b),
          t &&
            f &&
            t.kind === "player" &&
            ((t.kvx -= i * 1.1), (t.kvy -= r * 1.1));
        let p = Math.max(3, Math.round(l * (h > 0 ? 1 : 0.6)));
        (e.hitstop = Math.max(e.hitstop, p)),
          t && f && (t.hitstop = Math.max(t.hitstop, p)),
          (e.flash = 1),
          this.emit({
            type: "guardHit",
            who: e,
            x: e.x + i * -8,
            y: e.y + r * -8,
            cost: y,
            smash: h > 0,
          }),
          c.guard <= 0 &&
            (this.guardBreak(e), t && t.kind === "player" && t.stats.breaks++);
      }
      tickLaunched(e, t, s) {
        e.mvx = e.mvy = 0;
        let i = Math.min(1, e.t / e.hitstun);
        (e.z = Math.sin(i * Math.PI) * e.launchH),
          (e.spinRow = Math.floor(e.t / 2) % 8),
          e.t >= e.hitstun &&
            ((e.z = 0),
            (e.spinRow = -1),
            (e.splatted = !1),
            this.tick - e.techAt <= ae.techWin
              ? ((e.state = "getup"),
                (e.t = 0),
                (e.tech = !0),
                (e.techDir = t > 0.3 ? s : Math.atan2(e.kvy, e.kvx)),
                (e.kvx *= 0.2),
                (e.kvy *= 0.2),
                e.stats.techs++,
                this.emit({ type: "tech", who: e }))
              : ((e.state = "down"),
                (e.t = 0),
                (e.kvx *= 0.4),
                (e.kvy *= 0.4),
                this.emit({ type: "land", who: e, x: e.x, y: e.y })));
      }
      tickGetup(e) {
        if (e.tech && e.t <= ae.getupT) {
          let t = (i) => 1 - Math.pow(1 - Math.min(1, i / ae.getupT), 2),
            s = 46 * (t(e.t) - t(e.t - 1));
          this.moveBody(e, Math.cos(e.techDir) * s, Math.sin(e.techDir) * s);
        } else this.locomote(e, 0, 0);
        e.t >= ae.getupT + 4 && ((e.state = "move"), (e.t = 0), (e.tech = !1));
      }
      startSmash(e, t) {
        let s = e.kit.smash;
        (e.smashArmed = !1),
          (e.buf.smash = 0),
          (e.state = "smashCharge"),
          (e.t = 0),
          (e.combo = 0),
          (e.chainQueued = !1),
          (e.armorUsed = 0),
          (e.swingHit = !1),
          (e.smashCharge = 0),
          e.stats.swings++,
          (e.atkDir = this.aimAssist(
            e,
            t,
            Math.max(ae.softRange, s.reach + 50),
          )),
          (e.facing = e.atkDir),
          (e.swingId = this.nextId++),
          (e.mvx *= 0.2),
          (e.mvy *= 0.2),
          this.emit({ type: "smashStart", who: e });
      }
      tickSmashCharge(e) {
        let t = e.kit.smash;
        if (
          (this.locomote(e, 0, 0),
          e.rsHeld &&
            ((e.atkDir = this.aimAssist(
              e,
              e.smashAim,
              Math.max(ae.softRange, t.reach + 50),
            )),
            (e.facing = e.atkDir)),
          e.t < t.windup)
        )
          return;
        let s = e.smashCharge;
        (e.smashCharge = Math.min(1, (e.t - t.windup) / t.maxCharge)),
          e.smashCharge >= 1 &&
            s < 1 &&
            this.emit({ type: "smashFull", who: e }),
          (!e.rsHeld || e.t >= t.windup + t.maxCharge + 30) &&
            ((e.state = "smash"),
            (e.t = 0),
            (e.lungeDist =
              t.shape === "vine"
                ? t.lunge
                : t.lunge + this.magnet(e, e.atkDir, t.reach, t.radius, 30)),
            this.emit({
              type: "smashRelease",
              who: e,
              charge: e.smashCharge,
              dx: Math.cos(e.atkDir),
              dy: Math.sin(e.atkDir),
            }),
            this.emit({
              type: "swing",
              who: e,
              heavy: !0,
              dx: Math.cos(e.atkDir),
              dy: Math.sin(e.atkDir),
              kit: e.kit.id,
            }));
      }
      tickSmash(e, t) {
        let s = e.kit.smash,
          i = e.smashCharge,
          r = 2,
          o = Math.cos(e.atkDir),
          l = Math.sin(e.atkDir);
        if (e.t <= r + s.active) {
          let f = (h) => 1 - Math.pow(1 - me(h, 0, 1), 2),
            u =
              e.lungeDist *
              (f(e.t / (r + s.active)) - f((e.t - 1) / (r + s.active)));
          if (!s.pierce)
            for (let h of this.targetsFor(e.team))
              Math.hypot(h.x - e.x, h.y - e.y) < e.r + h.r + 6 && (u *= 0.15);
          this.moveBody(e, o * u, l * u);
        }
        if (s.shape === "vine") {
          let f = r + s.active + s.recovery,
            u =
              e.t <= r
                ? 0.5
                : e.t <= r + s.active
                  ? 1
                  : Math.max(0, 1 - (e.t - r - s.active) / (s.recovery * 0.6));
          e.t < f &&
            this.vines.push({
              x1: e.x + o * 8,
              y1: e.y + l * 8 - 8,
              x2: e.x + o * s.reach * u,
              y2: e.y + l * s.reach * u - 8,
              ext: u,
              owner: e,
            });
        }
        e.t === r + 1 &&
          this.emit({
            type: "strike",
            who: e,
            kit: e.kit.id,
            dx: o,
            dy: l,
            reach: s.reach,
            radius: s.radius,
            heavy: !0,
            combo: 0,
            last: !1,
            smash: !0,
            charge: i,
          });
        if (e.t > r && e.t <= r + s.active) {
          let f =
            s.shape === "vine"
              ? {
                  kind: "capsule",
                  x1: e.x + o * 10,
                  y1: e.y + l * 10,
                  x2: e.x + o * s.reach,
                  y2: e.y + l * s.reach,
                  r: s.radius,
                }
              : {
                  kind: "circle",
                  x: e.x + o * (s.reach + 2),
                  y: e.y + l * (s.reach + 2),
                  r: s.radius * 1.2,
                };
          this.hitboxes.push({
            id: e.swingId,
            team: e.team,
            owner: e,
            shape: f,
            dmg: Math.round(s.dmg * (1 + 0.6 * i)),
            kb: s.kb * (1 + 0.35 * i),
            kbMode: "dir",
            dx: o,
            dy: l,
            heavy: !0,
            hitstop: A.hitstopHeavy + Math.round(6 * i),
            hitstun: A.hitstunHeavy,
            color: e.kit.color,
            rehit: 0,
            attackerStop: !0,
            reflects: !0,
            fire: e.kit.id === "charizard",
            src: "smash",
            melee: !0,
            smash: Math.max(0.01, i),
          });
        }
        e.t >= r + s.active + s.recovery + (e.swingHit ? 0 : ae.whiffLag) &&
          ((e.state = "move"), (e.t = 0)),
          this.locomote(e, 0, 0);
      }
      startSpecial(e, t, s) {
        let i = e.kit,
          r = e.slot;
        if (
          ((e.t = 0),
          (e.dir2 = s),
          (e.facing = s),
          (e.moveId = this.nextId++),
          (e.combo = 0),
          (e.mvx *= 0.4),
          (e.mvy *= 0.4),
          i.id === "charizard")
        )
          if (t === "x") (e.state = "flame"), (e.flameEnd = 0);
          else {
            e.state = "flyUp";
            let o = e.lock;
            (e.markX = o ? o.x : e.x + Math.cos(s) * 40),
              (e.markY = o ? o.y : e.y + Math.sin(s) * 40),
              (r.cdY = i.yCd),
              this.emit({ type: "flyUp", who: e });
          }
        else if (i.id === "blastoise")
          (e.mega = this.inPuddle(e.x, e.y, e.team, !0)),
            e.mega && this.emit({ type: "mega", who: e }),
            t === "x"
              ? ((e.state = "pulse"), (e.pulseShots = 0))
              : ((e.state = "pump"),
                (e.pumpAt = 0),
                (e.cannonC = 0),
                this.emit({ type: "pumpStart", who: e }));
        else if (i.id === "dragapult")
          if (t === "x") {
            if (!r.horns.includes("loaded")) {
              let o = this.dreepy.filter(
                (l) => l.owner === e && !l.temp && l.state !== "dazed",
              );
              if (!o.length) {
                this.emit({ type: "dartsEmpty", who: e }), (e.state = "move");
                return;
              }
              for (let l of o)
                (l.state = "back"),
                  (l.t = 0),
                  (l.speed = Math.max(l.speed, 5)),
                  (l.hits = Math.min(l.hits, 1)),
                  (l.lastHit = -99),
                  (l.recalled = !0);
              this.emit({ type: "dreepyRecall", who: e }),
                (e.state = "darts"),
                (e.t = 4);
              return;
            }
            e.state = "darts";
          } else e.state = "wisp";
        else
          t === "x"
            ? (e.state = "leafAim")
            : r.solar > 0.05
              ? ((e.state = "solarFire"),
                (e.solarC = r.solar),
                (r.solar = 0),
                this.emit({ type: "solarRelease", who: e }))
              : ((e.state = "solar"),
                (e.solarC = 0),
                this.emit({ type: "solarStart", who: e }));
      }
      tickDarts(e, t) {
        if ((e.t <= 1 && ((e.dir2 = t), (e.facing = t)), e.t === 2)) {
          let s = e.lock ?? this.dartTarget(e);
          e.slot.horns.forEach((i, r) => {
            i === "loaded" && this.launchDreepy(e, e.team, e.slot, r, !1, s);
          }),
            (e.slot.cdX = e.kit.xCd);
        }
        this.locomote(e, 0, 0), e.t >= 9 && ((e.state = "move"), (e.t = 0));
      }
      dartTarget(e) {
        let t = this.targetsFor(e.team).sort(
          (s, i) =>
            Math.hypot(s.x - e.x, s.y - e.y) - Math.hypot(i.x - e.x, i.y - e.y),
        );
        return (
          t.find(
            (s) => Math.abs($e(Math.atan2(s.y - e.y, s.x - e.x), e.dir2)) < 1.2,
          ) ??
          t[0] ??
          null
        );
      }
      launchDreepy(e, t, s, i, r, o) {
        let l = o ? Math.atan2(o.y - e.y, o.x - e.x) : e.facing,
          f = l + (i === 0 ? -0.22 : 0.22),
          u = e.x + Math.cos(l + (i === 0 ? -1.6 : 1.6)) * 6,
          h = e.y + Math.sin(l + (i === 0 ? -1.6 : 1.6)) * 3;
        s && (s.horns[i] = "out"),
          this.dreepy.push({
            id: this.nextId++,
            owner: e,
            team: t,
            slot: s,
            horn: i,
            temp: r,
            x: u,
            y: h,
            px: u,
            py: h,
            z: 16,
            pz: 16,
            vx: Math.cos(f) * he.launch,
            vy: Math.sin(f) * he.launch,
            speed: he.launch,
            travel: 0,
            facing: f,
            state: "out",
            t: 0,
            target: o,
            hits: 0,
            lastHit: -99,
            slowed: !1,
            recalled: !1,
          }),
          this.emit({ type: "dreepyLaunch", x: u, y: h - 16, who: e });
      }
      updateDreepy() {
        for (let e of this.dreepy) {
          e.t++;
          let t = e.owner;
          if (e.slot && (t.slot !== e.slot || t.state === "faint")) {
            (e.slot.horns[e.horn] = "loaded"),
              (e.t = -1),
              this.emit({ type: "dreepyPoof", x: e.x, y: e.y - e.z });
            continue;
          }
          if (e.state === "dazed") {
            (e.z = Math.max(0, e.z - 2)),
              e.t >= he.daze &&
                ((e.state = "back"), (e.t = 0), (e.speed = 1.6), (e.hits = 99));
            continue;
          }
          if (e.state === "out")
            if (
              !(e.target && this.targetsFor(e.team).includes(e.target)) ||
              e.t > he.outMax
            ) {
              if (e.temp) {
                (e.t = -1),
                  this.emit({ type: "dreepyPoof", x: e.x, y: e.y - e.z });
                continue;
              }
              e.state = "back";
            } else {
              e.speed = Math.min(7, e.speed + 0.3);
              let r = 0.06 + Math.min(0.08, e.t * 0.003),
                o = We(
                  Math.atan2(e.vy, e.vx),
                  Math.atan2(e.target.y - e.y, e.target.x - e.x),
                  r,
                );
              (e.vx = Math.cos(o) * e.speed), (e.vy = Math.sin(o) * e.speed);
            }
          if (e.state === "back") {
            if (e.temp) {
              (e.t = -1),
                this.emit({ type: "dreepyPoof", x: e.x, y: e.y - e.z });
              continue;
            }
            e.speed = Math.min(
              e.hits === 99 ? 3.6 : e.recalled ? 8 : 6.2,
              e.speed + (e.recalled ? 0.5 : 0.24),
            );
            let i = We(
              Math.atan2(e.vy, e.vx),
              Math.atan2(t.y - e.y, t.x - e.x),
              e.recalled ? 0.4 : 0.22,
            );
            if (
              ((e.vx = Math.cos(i) * e.speed),
              (e.vy = Math.sin(i) * e.speed),
              Math.hypot(t.x - e.x, t.y - e.y) < 10 || e.t > 260)
            ) {
              e.slot && (e.slot.horns[e.horn] = "loaded"),
                e.recalled && e.slot && (e.slot.cdX = Math.min(e.slot.cdX, 8)),
                (e.t = -1),
                this.emit({ type: "dreepyHome", x: t.x, y: t.y - 18, who: t });
              continue;
            }
          }
          (e.x += e.vx),
            (e.y += e.vy),
            (e.travel += e.speed),
            (e.facing = Math.atan2(e.vy, e.vx)),
            (e.z += (14 - e.z) * 0.2),
            (e.x = me(e.x, B.x0 - 6, B.x1 + 6)),
            (e.y = me(e.y, B.y0 - 6, B.y1 + 4));
          let s = e.target;
          if (
            s &&
            e.hits < 2 &&
            this.tick - e.lastHit > 18 &&
            this.victimsFor(e.team).includes(s) &&
            Math.hypot(s.x - e.x, s.y - e.y) < s.hurtR + 6
          ) {
            let i = (s.burnT ?? 0) > 0,
              r =
                Math.min(he.cap, he.base + e.travel * he.per) *
                (e.state === "back" ? he.back : 1) *
                (i ? he.hex : 1);
            e.slowed && (r *= 0.8);
            let o = Math.hypot(e.vx, e.vy) || 1;
            this.applyHit(
              s,
              e.owner,
              Math.round(r),
              he.kb,
              e.vx / o,
              e.vy / o,
              r >= 32,
              r >= 32 ? 6 : 3,
              he.stun,
              "#a184f5",
              e.x,
              e.y,
              !1,
              !1,
              this.srcLabel(e.owner, i ? "dart-hex" : "dart"),
              !1,
              !0,
            ),
              e.hits++,
              (e.lastHit = this.tick),
              e.state === "out" && ((e.state = "back"), (e.speed *= 0.7));
          }
        }
        this.dreepy = this.dreepy.filter((e) => e.t >= 0);
      }
      tickWisp(e, t, s, i) {
        if ((e.t <= 2 && ((e.dir2 = t), (e.facing = t)), e.t === 9)) {
          let r =
              e.lock ?? this.nearestInCone(e.team, e.x, e.y, e.dir2, 1.3, 260),
            o = r ? Math.atan2(r.y - e.y, r.x - e.x) : e.dir2;
          this.projectiles.push({
            id: this.nextId++,
            team: e.team,
            owner: e,
            x: e.x + Math.cos(o) * 12,
            y: e.y + Math.sin(o) * 12,
            px: e.x,
            py: e.y,
            z: 12,
            pz: 12,
            vx: Math.cos(o) * he.wispSpeed,
            vy: Math.sin(o) * he.wispSpeed,
            r: 7,
            life: 100,
            age: 0,
            dmg: 6,
            kb: 0.6,
            hitstun: 10,
            hitstop: 2,
            kind: "wisp",
            color: "#7f6bff",
            target: r,
            homing: 0.045,
          }),
            (e.slot.cdY = e.kit.yCd),
            this.emit({ type: "wisp", x: e.x, y: e.y });
        }
        this.locomote(e, s * 0.3, i * 0.3),
          e.t >= 20 && ((e.state = "move"), (e.t = 0));
      }
      tickPhantom(e, t, s, i) {
        let o = Math.hypot(s, i);
        if (
          (o > 0.2
            ? ((e.mvx = (s / Math.max(1, o)) * 3.7),
              (e.mvy = (i / Math.max(1, o)) * 3.7),
              (e.facing = Math.atan2(i, s)))
            : ((e.mvx *= 0.7), (e.mvy *= 0.7)),
          this.moveBody(e, e.mvx, e.mvy),
          (!e.holdB && e.t >= 6) || e.t >= 48)
        ) {
          (e.slot.pfCd = ut),
            (e.state = "pfStrike"),
            (e.t = 0),
            (e.moveId = this.nextId++);
          let l = e.lock ?? this.nearestTarget(e.team, e.x, e.y);
          l &&
            Math.hypot(l.x - e.x, l.y - e.y) < 70 &&
            (e.facing = Math.atan2(l.y - e.y, l.x - e.x)),
            this.emit({ type: "pfReappear", who: e, x: e.x, y: e.y });
        }
      }
      tickPfStrike(e) {
        if ((this.locomote(e, 0, 0), e.t === 7)) {
          let t = Math.cos(e.facing),
            s = Math.sin(e.facing);
          this.hitboxes.push({
            id: e.moveId,
            team: e.team,
            owner: e,
            shape: { kind: "circle", x: e.x + t * 8, y: e.y + s * 8, r: 26 },
            dmg: 46,
            kb: 5.2,
            kbMode: "away",
            dx: t,
            dy: s,
            heavy: !0,
            hitstop: A.hitstopHeavy,
            hitstun: A.hitstunHeavy,
            color: "#a184f5",
            rehit: 0,
            attackerStop: !0,
            src: "phantomforce",
            melee: !0,
          }),
            this.emit({ type: "pfStrike", x: e.x, y: e.y, who: e });
        }
        e.t >= 22 && ((e.state = "move"), (e.t = 0));
      }
      tickQuickAttack(e) {
        if (
          e.t <= 9 &&
          (this.targetsFor(e.team).find(
            (i) => Math.hypot(i.x - e.x, i.y - e.y) < e.r + i.r + 2,
          ) || this.moveBody(e, Math.cos(e.dir2) * 6.2, Math.sin(e.dir2) * 6.2),
          e.t >= 2)
        ) {
          let i = Math.cos(e.dir2),
            r = Math.sin(e.dir2);
          this.hitboxes.push({
            id: e.moveId,
            team: e.team,
            owner: e,
            shape: { kind: "circle", x: e.x + i * 8, y: e.y + r * 8, r: 13 },
            dmg: 22,
            kb: 3,
            kbMode: "dir",
            dx: i,
            dy: r,
            heavy: !1,
            hitstop: A.hitstopLight + 1,
            hitstun: 16,
            color: "#a184f5",
            rehit: 0,
            attackerStop: !0,
            src: "quickattack",
            melee: !0,
          });
        }
        e.t >= 18 && ((e.state = "move"), (e.t = 0));
      }
      flameBox(e, t, s, i, r) {
        let o = Math.cos(s),
          l = Math.sin(s),
          f = Math.max(14, this.rayLen(e.x, e.y, s, FLAME.range) + 4);
        return {
          id: i,
          team: t,
          owner: e,
          shape: {
            kind: "capsule",
            x1: e.x + o * 12,
            y1: e.y + l * 12,
            x2: e.x + o * f,
            y2: e.y + l * f,
            r: 11,
          },
          dmg: r,
          kb: 1.4,
          kbMode: "dir",
          dx: o,
          dy: l,
          heavy: !1,
          hitstop: 1,
          hitstun: 12,
          color: "#ff8a3d",
          rehit: 6,
          attackerStop: !1,
          fire: !0,
          src: "flame",
          falloff: { x: e.x, y: e.y, len: FLAME.range },
        };
      }
      tickFlame(e, t, s, i, r) {
        let o = e.slot,
          l = 6,
          f = 75,
          u = 10,
          h = e.lock
            ? Math.atan2(e.lock.y - e.y, e.lock.x - e.x)
            : i > 0.3
              ? r
              : e.dir2;
        (e.dir2 = We(e.dir2, h, e.lock ? 0.12 : 0.07)),
          (e.facing = e.dir2),
          e.t > l && e.t <= l + f && (e.holdX || e.t <= l + 12) && !e.flameEnd
            ? ((o.heat = Math.min(100, o.heat + 0.95)),
              this.hitboxes.push(this.flameBox(e, e.team, e.dir2, e.moveId, 8)),
              this.locomote(e, t * 0.35, s * 0.35))
            : e.t > l
              ? (e.flameEnd || ((e.flameEnd = e.t), (o.cdX = e.kit.xCd)),
                this.locomote(e, 0, 0),
                e.t - e.flameEnd >= u &&
                  ((e.state = "move"), (e.t = 0), (e.flameEnd = 0)))
              : this.locomote(e, t * 0.35, s * 0.35);
      }
      isFlaming(e) {
        if (e.kind === "player") {
          let t = e;
          return t.state === "flame" && t.t > 6 && !t.flameEnd;
        }
        if (e.kind === "assist") {
          let t = e;
          return t.kit.id === "charizard" && t.t > 8 && t.t <= 44;
        }
        return !1;
      }
      isPumping(e) {
        if (e.kind === "player") {
          let t = e;
          return (
            t.state === "pump" &&
            t.pumpAt > 0 &&
            t.t - t.pumpAt >= 1 &&
            t.t - t.pumpAt <= 20
          );
        }
        if (e.kind === "assist") {
          let t = e;
          return t.kit.id === "blastoise" && t.t > 10 && t.t <= 34;
        }
        return !1;
      }
      flameDir(e) {
        return e.kind === "player" ? e.dir2 : e.dir;
      }
      tickFly(e, t, s, i, r) {
        if (e.state === "flyUp") {
          if (
            ((e.z = 44 * (1 - Math.pow(1 - Math.min(1, e.t / 10), 3))), e.lock)
          ) {
            let l = e.lock.x - e.markX,
              f = e.lock.y - e.markY,
              u = Math.hypot(l, f);
            if (u > 0.1) {
              let h = Math.min(u, 3.8);
              (e.markX += (l / u) * h), (e.markY += (f / u) * h);
            }
          } else (e.markX += t * 4.2), (e.markY += s * 4.2);
          (e.markX = me(e.markX, B.x0 + 10, B.x1 - 10)),
            (e.markY = me(e.markY, B.y0 + 8, B.y1 - 6)),
            (e.x += (e.markX - e.x) * 0.12),
            (e.y += (e.markY - e.y) * 0.12),
            (e.facing = Math.atan2(e.markY - e.y, e.markX - e.x) || e.facing);
          let o = e.t >= 14 && (i("attack") || i("special2"));
          o && (r("attack"), r("special2")),
            (e.t >= 36 || o) && ((e.state = "flySlam"), (e.t = 0));
        } else {
          if (e.t <= 6) {
            let o = e.t / 6;
            (e.z = 44 * (1 - o * o)),
              (e.x += (e.markX - e.x) * 0.5),
              (e.y += (e.markY - e.y) * 0.5);
          }
          e.t === 6 &&
            ((e.z = 0),
            (e.x = e.markX),
            (e.y = e.markY),
            this.clampToArena(e, !1),
            (e.sqx = 1.5),
            (e.sqy = 0.6),
            this.hitboxes.push({
              id: e.moveId,
              team: e.team,
              owner: e,
              shape: { kind: "circle", x: e.x, y: e.y, r: 32 },
              dmg: 50,
              kb: 6.2,
              kbMode: "away",
              dx: 0,
              dy: 1,
              heavy: !0,
              hitstop: A.hitstopHeavy,
              hitstun: A.hitstunHeavy,
              color: "#ff8a3d",
              rehit: 0,
              attackerStop: !0,
              heat: 16,
              fire: !0,
              src: "fly",
              melee: !0,
            }),
            this.emit({ type: "slam", x: e.x, y: e.y, who: e })),
            e.t >= 20 && ((e.state = "move"), (e.t = 0));
        }
      }
      beamEnd(e, t, s, i) {
        let r = Math.cos(s),
          o = Math.sin(s),
          l = i;
        return (
          r > 0
            ? (l = Math.min(l, (B.x1 - e) / r))
            : r < 0 && (l = Math.min(l, (B.x0 - e) / r)),
          o > 0
            ? (l = Math.min(l, (B.y1 - t) / o))
            : o < 0 && (l = Math.min(l, (B.y0 - 6 - t) / o)),
          (l = this.rayLen(e, t, s, l)),
          { x: e + r * l, y: t + o * l, len: l }
        );
      }
      pumpBeam(e, t, s, i, r, o, len = 230, push = 1.6) {
        let l = e.x + Math.cos(s) * 12,
          f = e.y + Math.sin(s) * 12,
          u = this.beamEnd(l, f, s, len),
          h = u.x,
          c = u.y;
        for (let p of this.victimsFor(t)) {
          let k = (p.x - l) * Math.cos(s) + (p.y - f) * Math.sin(s);
          if (k < 0 || k > u.len) continue;
          let M = l + Math.cos(s) * k,
            P = f + Math.sin(s) * k;
          Math.hypot(p.x - M, p.y - P) < p.hurtR + 8 &&
            k < Math.hypot(h - l, c - f) &&
            ((h = M), (c = P));
        }
        this.beams.push({ x1: l, y1: f, x2: h, y2: c, owner: e, age: o });
        let y = Math.cos(s),
          b = Math.sin(s);
        this.hitboxes.push({
          id: i,
          team: t,
          owner: e,
          shape: {
            kind: "capsule",
            x1: l,
            y1: f,
            x2: h + y * 6,
            y2: c + b * 6,
            r: 8,
          },
          dmg: r,
          kb: 3.4,
          kbMode: "dir",
          dx: y,
          dy: b,
          heavy: !1,
          hitstop: 1,
          hitstun: 12,
          color: "#5aa9e6",
          rehit: 5,
          attackerStop: !1,
          push: push,
          src: "pump",
        }),
          o % 6 === 0 && this.addPuddle(h, c, 13, t);
      }
      // Hydro Cannon: hold Y to build pressure. Release to fire early; at full it
      // fires by itself. Once charging starts it cannot be cancelled.
      tickPump(e, t, s) {
        let i = e.lock
          ? Math.atan2(e.lock.y - e.y, e.lock.x - e.x)
          : t > 0.3
            ? s
            : e.dir2;
        if ((this.locomote(e, 0, 0), !e.pumpAt)) {
          (e.dir2 = i), (e.facing = i), (e.cannonC = Math.min(1, e.t / 48));
          ((!e.holdY && e.t >= 10) || e.cannonC >= 1) &&
            ((e.pumpAt = e.t),
            e.cannonC >= 1 && this.emit({ type: "smashFull", who: e }),
            this.emit({ type: "cannonFire", who: e, c: e.cannonC }));
          return;
        }
        let r = e.t - e.pumpAt,
          o = e.cannonC,
          l = e.mega ? BLAST.megaRange : 1;
        (e.dir2 = We(e.dir2, i, 0.03)),
          (e.facing = e.dir2),
          r >= 1 &&
            r <= 20 &&
            (this.pumpBeam(
              e,
              e.team,
              e.dir2,
              e.moveId,
              Math.round(
                BLAST.cannonDmg *
                  (0.7 + 0.6 * o) *
                  (e.mega ? BLAST.megaDmg : 1),
              ),
              r - 1,
              BLAST.cannonLen * (0.75 + 0.25 * o) * l,
              1.8 + 1.4 * o,
            ),
            (e.kvx -= Math.cos(e.dir2) * 0.16),
            (e.kvy -= Math.sin(e.dir2) * 0.16)),
          r === 21 && (e.slot.cdY = e.kit.yCd),
          r >= 48 && ((e.state = "move"), (e.t = 0));
      }
      storeSolar(e) {
        e.slot.solar = Math.max(e.slot.solar ?? 0, e.solarC ?? 0);
        e.slot.solar > 0.05 &&
          this.emit({ type: "solarStore", who: e, c: e.slot.solar });
      }
      tickSolar(e, t, s, i) {
        this.locomote(e, 0, 0),
          (e.dir2 = this.aimAssist(e, t, 260)),
          (e.facing = e.dir2);
        let r = (e.rooted ? SOLAR.rootedRate : 1) / SOLAR.chargeTicks;
        if (((e.solarC = Math.min(1, e.solarC + r)), e.solarC >= 1)) {
          (e.slot.solar = 1),
            (e.state = "move"),
            (e.t = 0),
            this.emit({ type: "smashFull", who: e }),
            this.emit({ type: "solarStore", who: e, c: 1 });
          return;
        }
        if (e.t >= 8 && s("special2")) {
          i("special2"),
            (e.state = "solarFire"),
            (e.t = 0),
            this.emit({ type: "solarRelease", who: e });
          return;
        }
        e.holdG && (this.storeSolar(e), (e.state = "move"), (e.t = 0));
      }
      tickSolarFire(e, t) {
        let s = e.solarC;
        if (
          (e.t <= 6 &&
            ((e.dir2 = this.aimAssist(e, t, 260)), (e.facing = e.dir2)),
          this.locomote(e, 0, 0),
          e.t > 6 && e.t <= 20)
        ) {
          let i = e.x + Math.cos(e.dir2) * 10,
            r = e.y + Math.sin(e.dir2) * 10,
            o = this.beamEnd(i, r, e.dir2, SOLAR.range);
          this.beams.push({
            x1: i,
            y1: r,
            x2: o.x,
            y2: o.y,
            owner: e,
            age: e.t - 6,
            solar: s,
          }),
            e.t <= 9 &&
              this.hitboxes.push({
                id: e.moveId,
                team: e.team,
                owner: e,
                shape: {
                  kind: "capsule",
                  x1: i,
                  y1: r,
                  x2: o.x,
                  y2: o.y,
                  r: 8 + 6 * s,
                },
                dmg: Math.round(
                  SOLAR.minDmg + (SOLAR.maxDmg - SOLAR.minDmg) * s,
                ),
                kb: 2.5 + 5.5 * s,
                kbMode: "dir",
                dx: Math.cos(e.dir2),
                dy: Math.sin(e.dir2),
                heavy: s > 0.6,
                hitstop: s > 0.6 ? A.hitstopHeavy : A.hitstopLight,
                hitstun: Math.round(16 + 12 * s),
                color: "#ffe27a",
                rehit: 0,
                attackerStop: !1,
                src: "solar",
              });
        }
        e.t === 21 && (e.slot.cdY = e.kit.yCd),
          e.t >= 40 && ((e.state = "move"), (e.t = 0));
      }
      // Dragapult: hold A after the second claw for a flurry, then the tail sweep.
      tickFlurry(e, t) {
        this.locomote(e, 0, 0),
          e.t <= 2 &&
            ((e.atkDir = this.aimAssist(e, t, 90)), (e.facing = e.atkDir));
        let s = Math.cos(e.atkDir),
          i = Math.sin(e.atkDir);
        e.t % FLURRY.every === 1 &&
          (this.hitboxes.push({
            id: e.moveId,
            team: e.team,
            owner: e,
            shape: { kind: "circle", x: e.x + s * 17, y: e.y + i * 17, r: 16 },
            dmg: FLURRY.dmg,
            kb: 0.8,
            kbMode: "dir",
            dx: s,
            dy: i,
            heavy: !1,
            hitstop: 1,
            hitstun: 12,
            color: e.kit.color,
            rehit: FLURRY.every,
            attackerStop: !1,
            src: "flurry",
            melee: !0,
          }),
          this.emit({ type: "flurryHit", who: e, dx: s, dy: i }));
        ((!e.holdA && e.t >= FLURRY.minTicks) || e.t >= FLURRY.maxTicks) &&
          this.startAttack(e, 2, e.atkDir);
      }
      canWithdraw(e) {
        return (
          e.kit.id === "blastoise" &&
          !(e.slot.cdW > 0) &&
          this.inPuddle(e.x, e.y, e.team, !0)
        );
      }
      startWithdraw(e) {
        (e.state = "withdraw"),
          (e.t = 0),
          (e.combo = 0),
          (e.chainQueued = !1),
          (e.armorUsed = 0),
          (e.mvx *= 0.3),
          (e.mvy *= 0.3),
          this.emit({ type: "withdraw", who: e });
      }
      // Water Pulse: tap for one ring shot, keep holding for a three-shot volley.
      tickPulse(e, t) {
        e.t <= 3 && ((e.dir2 = this.aimAssist(e, t, 200)), (e.facing = e.dir2)),
          e.t === 6 && (this.firePulse(e), (e.slot.cdX = e.kit.xCd)),
          e.pulseShots < 3 &&
            e.holdX &&
            (e.t === 14 || e.t === 22) &&
            ((e.dir2 = this.aimAssist(e, e.dir2, 200)),
            (e.facing = e.dir2),
            this.firePulse(e)),
          this.locomote(e, 0, 0),
          e.t >= (e.pulseShots > 1 ? 36 : 22) &&
            ((e.state = "move"), (e.t = 0));
      }
      firePulse(e) {
        let t = e.mega ? BLAST.megaDmg : 1,
          s = e.mega ? BLAST.megaRange : 1,
          i = Math.cos(e.dir2),
          r = Math.sin(e.dir2);
        e.pulseShots++,
          this.projectiles.push({
            id: this.nextId++,
            team: e.team,
            owner: e,
            x: e.x + i * 12,
            y: e.y + r * 12,
            px: e.x,
            py: e.y,
            z: 12,
            pz: 12,
            vx: i * BLAST.pulseSpeed * (e.mega ? 1.2 : 1),
            vy: r * BLAST.pulseSpeed * (e.mega ? 1.2 : 1),
            r: 6,
            life: Math.round(BLAST.pulseLife * s),
            age: 0,
            dmg: Math.round(BLAST.pulseDmg * t),
            kb: 2.2,
            hitstun: 14,
            hitstop: 3,
            kind: "pulse",
            color: L.water,
          }),
          (e.kvx -= i * 0.6),
          (e.kvy -= r * 0.6),
          this.emit({ type: "pulse", who: e, dx: i, dy: r, mega: !!e.mega });
      }
      // Dazed: slower, wobbly movement for a moment. Leaves a splash puddle.
      soak(e, t) {
        e.kind === "player" &&
          e.state !== "faint" &&
          ((e.dazeT = BLAST.daze), this.emit({ type: "dazed", who: e })),
          this.addPuddle(e.x, e.y + 2, 11, t);
      }
      tickWithdraw(e, t, s, i) {
        (e.spinRow = -1), this.locomote(e, 0, 0);
        for (let r of this.projectiles)
          r.dead ||
            r.team === e.team ||
            r.kind === "seed" ||
            (Math.hypot(r.x - e.x, r.y - e.y) < e.hurtR + r.r + 6 &&
              this.block(r, e));
        if ((!e.holdG && e.t >= 6) || e.t >= 100) {
          if (t <= 0.3) {
            (e.state = "move"),
              (e.t = 0),
              (e.slot.cdW = BLAST.withdrawCd),
              (e.sqx = 1.25),
              (e.sqy = 0.8);
            return;
          }
          let r = s;
          (e.state = "spin"),
            (e.t = 0),
            (e.dir2 = r),
            (e.moveId = this.nextId++),
            (e.armorUsed = 0),
            (e.spinVX = Math.cos(r) * 3.9),
            (e.spinVY = Math.sin(r) * 3.9),
            this.emit({ type: "spin", who: e });
        }
      }
      tickSpin(e, t, s) {
        if (e.t > 42) {
          (e.spinRow = -1),
            this.locomote(e, 0, 0),
            e.t >= 58 &&
              ((e.state = "move"), (e.t = 0), (e.slot.cdW = BLAST.withdrawCd));
          return;
        }
        let i = Math.atan2(e.spinVY, e.spinVX),
          r = e.lock
            ? Math.atan2(e.lock.y - e.y, e.lock.x - e.x)
            : t > 0.3
              ? s
              : i;
        i = We(i, r, 0.11);
        let o = 3.9 * (this.inPuddle(e.x, e.y, e.team, !0) ? 1.35 : 1);
        (e.spinVX = Math.cos(i) * o),
          (e.spinVY = Math.sin(i) * o),
          (e.x += e.spinVX),
          (e.y += e.spinVY),
          (e.x < B.x0 + e.r || e.x > B.x1 - e.r) &&
            ((e.spinVX *= -1),
            this.emit({
              type: "wall",
              who: e,
              x: e.x,
              y: e.y,
              nx: e.x < Se ? 1 : -1,
              ny: 0,
              speed: 3,
            })),
          (e.y < B.y0 + e.r * 0.5 || e.y > B.y1 - e.r * 0.4) &&
            ((e.spinVY *= -1),
            this.emit({
              type: "wall",
              who: e,
              x: e.x,
              y: e.y,
              nx: 0,
              ny: e.y < Te ? 1 : -1,
              speed: 3,
            })),
          this.clampToArena(e, !1),
          (e.facing = Math.atan2(e.spinVY, e.spinVX)),
          (e.spinRow = Math.floor(e.t / 2) % 8),
          this.hitboxes.push({
            id: e.moveId,
            team: e.team,
            owner: e,
            shape: { kind: "circle", x: e.x, y: e.y, r: 14 },
            dmg: 21,
            kb: 4.2,
            kbMode: "away",
            dx: e.spinVX / o,
            dy: e.spinVY / o,
            heavy: !1,
            hitstop: 4,
            hitstun: 16,
            color: "#5aa9e6",
            rehit: 14,
            attackerStop: !1,
            src: "spin",
            melee: !0,
          }),
          e.t % 7 === 0 && this.addPuddle(e.x, e.y, 12, e.team),
          e.t === 42 &&
            ((e.spinRow = -1),
            (e.mvx = e.spinVX * 0.4),
            (e.mvy = e.spinVY * 0.4));
      }
      fireLeaves(e, t, s, i, r, o, l, f, u) {
        for (let h = 0; h < o; h++) {
          let c = r + (h - (o - 1) / 2) * l;
          this.projectiles.push({
            id: this.nextId++,
            team: t,
            owner: e,
            x: s + Math.cos(c) * 10,
            y: i + Math.sin(c) * 10,
            px: s,
            py: i,
            z: 10,
            pz: 10,
            vx: Math.cos(c) * 4.4,
            vy: Math.sin(c) * 4.4,
            r: 4,
            life: 70,
            age: 0,
            dmg: f,
            kb: 2,
            hitstun: 12,
            hitstop: 2,
            kind: "leaf",
            color: "#9be36b",
            target: u,
            homing: 0.05,
          });
        }
        this.emit({ type: "leaf", x: s, y: i });
      }
      tickLeaf(e, t, s, i) {
        if ((e.t <= 2 && ((e.dir2 = i), (e.facing = i)), e.t === 6)) {
          let r =
            e.lock ?? this.nearestInCone(e.team, e.x, e.y, e.dir2, 1.2, 220);
          this.fireLeaves(
            e,
            e.team,
            e.x,
            e.y,
            e.dir2,
            e.rooted ? 4 : 3,
            e.rooted ? 0.26 : 0.32,
            12,
            r,
          ),
            (e.slot.cdX = e.kit.xCd);
        }
        this.locomote(e, t * 0.3, s * 0.3),
          e.t >= 18 && ((e.state = "move"), (e.t = 0));
      }
      tickSeed(e, t, s, i) {
        if ((e.t <= 2 && ((e.dir2 = t), (e.facing = t)), e.t === 8)) {
          let r, o;
          if (e.lock) (r = e.lock.x), (o = e.lock.y);
          else {
            let l = s > 0.3 ? i : e.dir2;
            (r = e.x + Math.cos(l) * 72), (o = e.y + Math.sin(l) * 72);
          }
          this.throwSeed(
            e,
            e,
            e.active,
            me(r, B.x0 + 8, B.x1 - 8),
            me(o, B.y0 + 8, B.y1 - 6),
          ),
            (e.slot.cdX = e.kit.seedCd);
        }
        this.locomote(e, 0, 0), e.t >= 20 && ((e.state = "move"), (e.t = 0));
      }
      throwSeed(e, t, s, i, r) {
        this.projectiles.push({
          id: this.nextId++,
          team: t.team,
          owner: e,
          x: e.x,
          y: e.y,
          px: e.x,
          py: e.y,
          z: 14,
          pz: 14,
          vx: 0,
          vy: 0,
          r: 3,
          life: 999,
          age: 0,
          dmg: 0,
          kb: 0,
          hitstun: 0,
          hitstop: 0,
          kind: "seed",
          color: "#c9e26b",
          sx: e.x,
          sy: e.y,
          tx: i,
          ty: r,
          flight: 20,
          seedOwner: t,
          seedSlot: s,
        }),
          this.emit({ type: "seedThrow", x: e.x, y: e.y });
      }
      nearestInCone(e, t, s, i, r, o) {
        let l = null,
          f = 1 / 0;
        for (let u of this.targetsFor(e)) {
          let h = Math.hypot(u.x - t, u.y - s);
          h > o ||
            Math.abs($e(Math.atan2(u.y - s, u.x - t), i)) > r ||
            (h < f && ((f = h), (l = u)));
        }
        return l;
      }
      locomote(e, t, s) {
        let i = e.kit,
          r = i.speed * A.speedScale;
        i.id === "blastoise" &&
          this.inPuddle(e.x, e.y, e.team, !0) &&
          (r *= 1.35),
          this.inPuddle(e.x, e.y, e.team, !1) && (r *= 0.6),
          i.id === "dragapult" &&
            e.slot.horns.includes("out") &&
            (r *= he.light);
        let o = t * r,
          l = s * r,
          f = Math.hypot(o, l),
          u = Math.hypot(e.mvx, e.mvy);
        if (f > 0.01) {
          let h = f >= u,
            c = r / (h ? A.accelTicks : A.decelTicks),
            y = h ? Math.min(f, u + c) : Math.max(f, u - c),
            b = Math.atan2(l, o);
          (e.mvx = Math.cos(b) * y), (e.mvy = Math.sin(b) * y);
        } else if (u > 0) {
          let h = Math.max(0, u - r / A.decelTicks);
          (e.mvx *= h / u), (e.mvy *= h / u);
        }
        this.moveBody(e, e.mvx, e.mvy);
      }
      animatePlayer(e) {
        let t = e.kit,
          s = Math.hypot(e.mvx, e.mvy),
          i = () => {
            let r = e.mon.anims.Walk,
              o = r.durations.reduce((u, h) => u + h, 0);
            e.walkClock += A.walkAnimRate * Math.max(0.5, s / t.speed);
            let l = e.walkClock % o,
              f = 0;
            for (let u = 0; u < r.durations.length; u++) {
              if (l < r.durations[u]) {
                f = u;
                break;
              }
              l -= r.durations[u];
            }
            return f;
          };
        switch (((e.animFrame = -1), e.state)) {
          case "move":
          case "switchIn":
            if (e.state === "switchIn" && e.t < 10) {
              (e.animName = "Hop"), (e.animFrame = -5);
              break;
            }
            if (s > 0.3) {
              e.animName = "Walk";
              let r = i();
              r !== e.lastStepFrame &&
                (r === 1 || r === 3) &&
                this.emit({
                  type: "step",
                  who: e,
                  x: e.x,
                  y: e.y,
                  skid: !1,
                  dx: Math.cos(e.facing),
                  dy: Math.sin(e.facing),
                }),
                (e.lastStepFrame = r),
                (e.animFrame = r);
            } else e.animName = "Idle";
            break;
          case "attack":
            (e.animName = t.basic()[e.combo].anim), (e.animFrame = -2);
            break;
          case "dodge":
            t.dodge.kind === "air"
              ? ((e.animName = "Walk"), (e.walkClock += 6), (e.animFrame = i()))
              : t.dodge.kind === "shell"
                ? ((e.animName = "Withdraw"), (e.animFrame = 99))
                : t.dodge.kind === "phantom"
                  ? ((e.animName = "Walk"),
                    (e.walkClock += 5),
                    (e.animFrame = i()))
                  : ((e.animName = "Hop"), (e.animFrame = -3));
            break;
          case "hurt":
            (e.animName = "Hurt"), (e.animFrame = e.t < 4 ? 0 : 1);
            break;
          case "overheat":
            (e.animName = "Hurt"), (e.animFrame = 1);
            break;
          case "flame":
            (e.animName = "Shoot"), (e.animFrame = e.t <= 6 ? -4 : 3);
            break;
          case "flyUp":
          case "flySlam":
            (e.animName = "Walk"),
              (e.walkClock += 4),
              (e.animFrame = i()),
              e.state === "flySlam" &&
                e.t >= 6 &&
                ((e.animName = "Hurt"), (e.animFrame = 0));
            break;
          case "pump":
            (e.animName = e.pumpAt ? "Shoot" : "Charge"),
              (e.animFrame = e.pumpAt ? 2 : Math.floor(e.t / 2.5) % 6);
            break;
          case "leafAim":
          case "solar":
            (e.animName = "Charge"), (e.animFrame = Math.floor(e.t / 4) % 4);
            break;
          case "solarFire":
            (e.animName = "Shoot"),
              (e.animFrame = Math.min(3, Math.floor(e.t / 3)));
            break;
          case "flurry":
            (e.animName = e.t % 8 < 4 ? "Attack" : "Double"),
              (e.animFrame = Math.floor(e.t / 2) % 3);
            break;
          case "pulse":
            (e.animName = "Shoot"),
              (e.animFrame = Math.min(3, Math.floor(((e.t - 2) % 8) / 2)));
            break;
          case "withdraw":
            (e.animName = "Withdraw"),
              (e.animFrame = Math.min(6, Math.floor(e.t / 1.5)));
            break;
          case "spin":
            (e.animName = "Withdraw"), (e.animFrame = 99);
            break;
          case "leaf":
            (e.animName = "Shoot"), (e.animFrame = -4);
            break;
          case "seed":
            (e.animName = "Shake"), (e.animFrame = -4);
            break;
          case "darts":
            (e.animName = "Shoot"),
              (e.animFrame = Math.min(6, Math.floor(e.t / 1.4)));
            break;
          case "wisp":
            (e.animName = "Charge"),
              (e.animFrame = Math.min(9, Math.floor(e.t / 2)));
            break;
          case "phantom":
            (e.animName = "Walk"), (e.walkClock += 3), (e.animFrame = i());
            break;
          case "pfStrike":
            (e.animName = "Swing"),
              (e.animFrame = Math.min(8, Math.floor(e.t / 2.4)));
            break;
          case "qa":
            (e.animName = "Walk"), (e.walkClock += 8), (e.animFrame = i());
            break;
          case "guard":
          case "guardEnd":
            (e.animName = t.id === "blastoise" ? "Withdraw" : "Idle"),
              (e.animFrame = t.id === "blastoise" ? 3 : -1);
            break;
          case "stunned":
            (e.animName = "Hurt"), (e.animFrame = 1);
            break;
          case "launched":
            (e.animName = "Hurt"), (e.animFrame = 0);
            break;
          case "down":
            (e.animName = "Hurt"), (e.animFrame = 1);
            break;
          case "getup":
            (e.animName = e.tech ? "Walk" : "Hop"),
              e.tech
                ? ((e.walkClock += 6), (e.animFrame = i()))
                : (e.animFrame = -5);
            break;
          case "smashCharge":
            (e.animName = t.smash.anim), (e.animFrame = 0);
            break;
          case "smash":
            (e.animName = t.smash.anim), (e.animFrame = -6);
            break;
        }
      }
      updateAssist(e) {
        e.t++,
          (e.scale =
            e.t < 8
              ? Math.min(1, e.t / 6) *
                (1 + 0.2 * Math.sin(Math.min(1, e.t / 6) * Math.PI))
              : e.t > 52
                ? Math.max(0, 1 - (e.t - 52) / 8)
                : 1),
          (e.alpha = e.t > 52 ? Math.max(0, 1 - (e.t - 52) / 8) : 1);
        let t = e.team,
          s = e.summoner.lock ?? this.nearestTarget(t, e.x, e.y);
        if (
          (e.t < 10 && s && (e.dir = Math.atan2(s.y - e.y, s.x - e.x)),
          (e.facing = e.dir),
          (e.animName = "Idle"),
          e.kit.id === "charizard")
        )
          e.t > 8 &&
            e.t <= 44 &&
            (s && (e.dir = We(e.dir, Math.atan2(s.y - e.y, s.x - e.x), 0.06)),
            this.hitboxes.push(this.flameBox(e, t, e.dir, e.moveId, 7)),
            (e.animName = "Shoot"),
            (e.animFrame = 3));
        else if (e.kit.id === "blastoise")
          e.t <= 10
            ? ((e.animName = "Charge"), (e.animFrame = Math.floor(e.t / 2)))
            : e.t <= 34 &&
              (s && (e.dir = We(e.dir, Math.atan2(s.y - e.y, s.x - e.x), 0.03)),
              this.pumpBeam(e, t, e.dir, e.moveId, 6, e.t - 10),
              (e.animName = "Shoot"),
              (e.animFrame = 2));
        else if (e.kit.id === "venusaur") {
          if (
            (e.t <= 14 &&
              ((e.animName = "Shake"),
              (e.animFrame = Math.min(5, Math.floor(e.t / 2.5)))),
            e.t === 12)
          ) {
            let i = s ? s.x : e.x + Math.cos(e.dir) * 70,
              r = s ? s.y : e.y + Math.sin(e.dir) * 70;
            this.throwSeed(
              e,
              e.summoner,
              e.slotIndex,
              me(i, B.x0 + 8, B.x1 - 8),
              me(r, B.y0 + 8, B.y1 - 6),
            );
          }
          e.t === 22 && this.fireLeaves(e, t, e.x, e.y, e.dir, 3, 0.3, 12, s);
        } else if (e.kit.id === "dragapult") {
          let i = e.dir + Math.PI / 2;
          e.t > 4 &&
            e.t < 50 &&
            ((e.x = me(e.x + Math.cos(i) * 2.6, B.x0 + 8, B.x1 - 8)),
            (e.y = me(e.y + Math.sin(i) * 2.6, B.y0 + 6, B.y1 - 4))),
            (e.animName = e.t >= 12 && e.t < 26 ? "Shoot" : "Walk"),
            (e.animFrame =
              e.animName === "Shoot"
                ? Math.min(6, Math.floor((e.t - 12) / 2))
                : Math.floor(e.t / 3) % 8),
            (e.t === 14 || e.t === 20) &&
              this.launchDreepy(e, t, null, e.t === 14 ? 0 : 1, !0, s);
        }
        e.t === 52 && this.emit({ type: "assistOut", who: e }),
          e.t >= 60 && (e.done = !0);
      }
      updateDummy(e) {
        let t = this.player;
        if (e.hitstop > 0) {
          e.hitstop--;
          return;
        }
        e.t++,
          e.burnT > 0 &&
            (e.burnT--,
            e.burnT % 30 === 0 &&
              e.state !== "ko" &&
              e.hp > 1 &&
              ((e.hp = Math.max(1, e.hp - 4)),
              this.emit({ type: "burnTick", who: e, x: e.x, y: e.y })));
        let s = Math.atan2(t.y - e.y, t.x - e.x),
          i =
            (this.inPuddle(e.x, e.y, e.team, !1) ? 0.55 : 1) *
            (e.seededT > 0 ? 0 : 1);
        switch (e.state) {
          case "spawn":
            (e.scale =
              Math.min(1, e.t / 14) *
              (1 + 0.25 * Math.sin(Math.min(1, e.t / 14) * Math.PI))),
              (e.alpha = 1),
              e.t >= 18 && ((e.state = "idle"), (e.t = 0), (e.scale = 1));
            break;
          case "ko":
            (e.alpha = e.t < 50 ? 1 : Math.max(0, 1 - (e.t - 50) / 16)),
              e.t === 1 && (e.facing = Math.atan2(-e.kvy, -e.kvx)),
              e.t === 34 && this.emit({ type: "koLand", who: e }),
              e.t >= 70 &&
                ((e.x = e.px = e.homeX),
                (e.y = e.py = e.homeY),
                (e.kvx = e.kvy = 0),
                (e.seededT = 0),
                (e.hp = e.maxHp),
                (e.state = "spawn"),
                (e.t = 0),
                (e.scale = 0),
                (e.combo = 0),
                this.emit({ type: "respawn", who: e }));
            break;
          case "hurt":
            e.t >= e.hitstun &&
              ((e.state = "idle"), (e.t = 0), (e.combo = 0), (e.idleT = 0));
            break;
          case "charge": {
            if ((e.t < 15 && (e.aim = s), (e.facing = e.aim), e.t === 24)) {
              let r = Math.cos(e.aim),
                o = Math.sin(e.aim);
              this.projectiles.push({
                id: this.nextId++,
                team: e.team,
                owner: e,
                x: e.x + r * 10,
                y: e.y + o * 10,
                px: e.x,
                py: e.y,
                z: 10,
                pz: 10,
                vx: r * 2.9,
                vy: o * 2.9,
                r: 6,
                life: 200,
                age: 0,
                dmg: 40,
                kb: 4.2,
                hitstun: 18,
                hitstop: 6,
                kind: "orb",
                color: "#6fd3e8",
              }),
                this.emit({
                  type: "orb",
                  who: e,
                  x: e.x + r * 10,
                  y: e.y + o * 10,
                });
            }
            e.t >= 34 &&
              ((e.state = "idle"),
              (e.t = 0),
              (e.shootTimer = 50 + Math.floor(this.rand() * 40)));
            break;
          }
          case "idle":
          case "walk": {
            e.idleT++;
            let r = A.dummyMode,
              o = e.homeX,
              l = e.homeY;
            r === 1 &&
              ((e.idleT % 70 === 1 || (e.tx === 0 && e.ty === 0)) &&
                ((e.tx = B.x0 + 40 + this.rand() * (B.x1 - B.x0 - 80)),
                (e.ty = B.y0 + 30 + this.rand() * (B.y1 - B.y0 - 60))),
              (o = e.tx),
              (l = e.ty));
            let f = Math.hypot(o - e.x, l - e.y);
            if (
              i > 0 &&
              ((r === 1 && f > 4) || (r !== 1 && e.idleT > 50 && f > 6))
            ) {
              let h = Math.atan2(l - e.y, o - e.x),
                c = (r === 1 ? 1.3 : 1) * i;
              this.moveBody(e, Math.cos(h) * c, Math.sin(h) * c),
                (e.facing = h),
                (e.state = "walk");
            } else (e.state = "idle"), (e.facing = s);
            r === 2 &&
              this.intro <= 0 &&
              ((e.facing = s),
              --e.shootTimer <= 0 &&
                ((e.state = "charge"),
                (e.t = 0),
                (e.aim = s),
                this.emit({ type: "charge", who: e })));
            break;
          }
        }
        this.applyKnockback(e),
          (e.animName = {
            idle: "Idle",
            walk: "Walk",
            hurt: "Hurt",
            charge: "Charge",
            ko: "Hurt",
            spawn: "Idle",
          }[e.state]),
          (e.animFrame =
            e.state === "hurt" || e.state === "ko"
              ? e.t < 4 && e.state === "hurt"
                ? 0
                : 1
              : -1);
      }
      inPuddle(e, t, s, i) {
        for (let r of this.puddles)
          if (
            !(s !== void 0 && i !== void 0 && (r.team === s) !== i) &&
            Math.hypot(r.x - e, (r.y - t) * 1.6) < r.r
          )
            return !0;
        return !1;
      }
      addPuddle(e, t, s, i) {
        for (let r of this.puddles)
          if (r.team === i && Math.hypot(r.x - e, r.y - t) < 8) {
            (r.life = r.max), (r.r = Math.min(20, r.r + 1));
            return;
          }
        this.puddles.push({
          id: this.nextId++,
          x: e,
          y: t,
          r: s,
          life: 540,
          max: 540,
          team: i,
        }),
          this.puddles.length > 20 && this.puddles.shift();
      }
      updateGround() {
        for (let e of this.puddles) e.life--;
        this.puddles = this.puddles.filter((e) => e.life > 0);
        for (let e of this.grass) e.life--;
        this.grass = this.grass.filter((e) => e.life > 0);
        for (let e of this.mines) {
          if ((e.age++, e.age > 10)) {
            for (let t of this.targetsFor(e.team))
              if (
                !(t.kind === "player" && t.airborne) &&
                Math.hypot(t.x - e.x, t.y - e.y) < t.r + 8
              ) {
                this.seedBody(t, e.owner, e.slot), (e.age = -1);
                break;
              }
          }
          e.age >= 360 &&
            (this.grass.push({
              id: this.nextId++,
              x: e.x,
              y: e.y,
              r: 20,
              life: 480,
              max: 480,
              owner: e.owner,
            }),
            this.emit({ type: "sprout", x: e.x, y: e.y }),
            (e.age = -1));
        }
        this.mines = this.mines.filter((e) => e.age >= 0);
      }
      updateArena() {
        for (let e of this.rocks)
          if ((e.hitT > 0 && e.hitT--, e.state === "broken" && --e.t <= 0)) {
            // A rock never re-forms on top of someone; it waits for the spot to clear.
            this.bodies().some(
              (t) =>
                t.state !== "faint" &&
                !t.hidden &&
                Math.hypot(t.x - e.x, t.y - e.y) < e.r + t.r + 2,
            )
              ? (e.t = 1)
              : ((e.state = "solid"),
                (e.hp = e.max),
                this.emit({ type: "rockRise", x: e.x, y: e.y }));
          }
        this.updateItem();
      }
      updateItem() {
        if (!A.items || this.match.phase !== "fight" || this.intro > 0) return;
        let e = this.item;
        if (!e) {
          --this.itemT <= 0 &&
            ((this.item = {
              id: this.nextId++,
              x: Se,
              y: Te,
              state: "warn",
              t: 0,
            }),
            this.emit({ type: "itemWarn", x: Se, y: Te }));
          return;
        }
        if ((e.t++, e.state === "warn")) {
          e.t >= SITRUS.warn &&
            ((e.state = "ready"),
            (e.t = 0),
            this.emit({ type: "itemSpawn", x: e.x, y: e.y }));
          return;
        }
        for (let t of this.players) {
          if (
            t.state === "faint" ||
            t.airborne ||
            t.vanished ||
            Math.hypot(t.x - e.x, t.y - e.y) >= t.r + SITRUS.r
          )
            continue;
          let s = t.slot,
            i = s.hp;
          (s.hp = Math.min(s.maxHp, s.hp + Math.round(s.maxHp * SITRUS.heal))),
            this.emit({
              type: "itemGet",
              who: t,
              x: e.x,
              y: e.y,
              amount: Math.round(s.hp - i),
            }),
            (this.item = null),
            (this.itemT = SITRUS.every);
          return;
        }
        e.t >= SITRUS.life &&
          (this.emit({ type: "itemGone", x: e.x, y: e.y }),
          (this.item = null),
          (this.itemT = SITRUS.every));
      }
      hitRock(e, t, s, i) {
        e.state === "solid" &&
          ((e.hp -= t * ae.dmg),
          (e.hitT = 6),
          e.hp <= 0
            ? ((e.hp = 0),
              (e.state = "broken"),
              (e.t = RUINS.respawn),
              this.emit({ type: "rockBreak", x: e.x, y: e.y }))
            : this.emit({
                type: "rockHit",
                x: s ?? e.x,
                y: i ?? e.y,
                rock: e,
              }));
      }
      // Distance a ray travels from (e,t) along angle s before meeting a standing rock.
      rayLen(e, t, s, i) {
        let r = Math.cos(s),
          o = Math.sin(s);
        for (let l of this.rocks) {
          if (l.state !== "solid") continue;
          let f = l.x - e,
            u = l.y - t,
            h = f * r + u * o;
          if (h < 0) continue;
          let c = f * f + u * u - h * h,
            y = l.r * l.r;
          if (c > y) continue;
          let b = h - Math.sqrt(y - c);
          b >= 0 && b < i && (i = b);
        }
        return i;
      }
      losBlocked(e, t, s, i) {
        let r = s - e,
          o = i - t,
          l = r * r + o * o || 1;
        for (let f of this.rocks) {
          if (f.state !== "solid") continue;
          let u = me(((f.x - e) * r + (f.y - t) * o) / l, 0, 1);
          if (Math.hypot(e + r * u - f.x, t + o * u - f.y) < f.r - 2) return !0;
        }
        return !1;
      }
      // True while a fighter is stuck in the recovery of something it committed to.
      recovering(e) {
        let t = e.kit;
        switch (e.state) {
          case "attack": {
            let s = t.basic()[e.combo];
            return e.t > s.startup + s.active;
          }
          case "smash":
            return e.t > 2 + t.smash.active;
          case "dodge":
            return e.t > t.dodge.ticks;
          case "flame":
            return !!e.flameEnd;
          case "pump":
            return e.pumpAt > 0 && e.t - e.pumpAt > 20;
          case "solarFire":
            return e.t > 20;
          case "pulse":
            return e.t > (e.pulseShots > 1 ? 30 : 16);
          case "flySlam":
            return e.t >= 6;
          case "guardEnd":
          case "overheat":
          case "stunned":
            return !0;
          default:
            return !1;
        }
      }
      // Guard only covers the front. The source is the attacker when it is close,
      // otherwise the point of contact (projectiles, Dreepy, beams).
      flanked(e, t, s, i) {
        let r =
            t &&
            (t.kind === "player" || t.kind === "assist") &&
            Math.hypot(t.x - e.x, t.y - e.y) < 70,
          o = r ? t.x : s,
          l = r ? t.y : i;
        return (
          Math.hypot(o - e.x, l - e.y) > 2 &&
          Math.cos(Math.atan2(l - e.y, o - e.x) - e.facing) < FLANK_COS
        );
      }
      seedBody(e, t, s) {
        (e.seededT = 70),
          (e.seedOwner = t),
          (e.seedSlot = s),
          e.kind === "dummy" && e.state === "walk" && (e.state = "idle"),
          this.emit({ type: "seeded", who: e });
      }
      updateSeeds() {
        let e = (t) => {
          if (!t.seededT || t.seededT % 10 !== 0) return;
          if (t.kind === "dummy") {
            let r = t;
            if (r.state === "ko") return;
            r.hp = Math.max(1, r.hp - 4);
          } else if (t.kind === "player") {
            let r = t;
            if (r.state === "faint") return;
            r.slot.hp = Math.max(1, r.slot.hp - 4);
          }
          let s = t.seedOwner,
            i = s?.slots[t.seedSlot ?? 0];
          s &&
            i &&
            i.hp > 0 &&
            i.hp < i.maxHp &&
            ((i.hp = Math.min(i.maxHp, i.hp + 3)),
            i === s.slot &&
              this.emit({ type: "heal", x: s.x, y: s.y, amount: 6, who: s }));
        };
        for (let t of this.dummies) t.seededT > 0 && (t.seededT--, e(t));
        for (let t of this.players) e(t);
      }
      moveBody(e, t, s) {
        (e.x += t), (e.y += s), this.clampToArena(e, !1);
      }
      applyKnockback(e) {
        if (Math.abs(e.kvx) < 0.02 && Math.abs(e.kvy) < 0.02) {
          e.kvx = e.kvy = 0;
          return;
        }
        (e.x += e.kvx), (e.y += e.kvy), this.clampToArena(e, !0);
        let s =
          (e.kind === "dummy" && e.state === "ko") ||
          (e.kind === "player" && e.state === "faint")
            ? 0.93
            : A.kbFriction;
        (e.kvx *= s), (e.kvy *= s);
      }
      clampToArena(e, t) {
        let s = [];
        if (
          (e.x < B.x0 + e.r && (s.push([1, 0]), (e.x = B.x0 + e.r)),
          e.x > B.x1 - e.r && (s.push([-1, 0]), (e.x = B.x1 - e.r)),
          e.y < B.y0 + e.r * 0.5 && (s.push([0, 1]), (e.y = B.y0 + e.r * 0.5)),
          e.y > B.y1 - e.r * 0.4 && (s.push([0, -1]), (e.y = B.y1 - e.r * 0.4)),
          !(e.kind === "player" && e.vanished))
        )
          for (let i of this.rocks) {
            if (i.state !== "solid") continue;
            let r = e.x - i.x,
              o = e.y - i.y,
              l = Math.hypot(r, o),
              f = i.r + e.r;
            if (l >= f) continue;
            l < 0.01 && ((r = 0), (o = 1), (l = 1));
            let u = r / l,
              h = o / l;
            (e.x = i.x + u * f), (e.y = i.y + h * f), s.push([u, h, i]);
          }
        if (t)
          for (let [i, r, rk] of s) {
            let o = e.kvx * i + e.kvy * r;
            if (!(o >= 0))
              if (-o > 2.6) {
                if (
                  ((e.kvx -= 1.55 * o * i),
                  (e.kvy -= 1.55 * o * r),
                  this.emit({
                    type: "wall",
                    who: e,
                    x: e.x - i * e.r,
                    y: e.y - r * e.r,
                    nx: i,
                    ny: r,
                    speed: -o,
                  }),
                  rk && this.hitRock(rk, Math.round(-o * 6)),
                  e.kind === "player" &&
                    e.state === "launched" &&
                    !e.splatted &&
                    -o > 3.2)
                ) {
                  let l = e,
                    f = Math.round(ae.splat * ae.dmg);
                  l.splatted = !0;
                  let u = l.slot.hp;
                  (l.slot.hp = Math.max(1, l.slot.hp - f)),
                    (l.hitstop = 8),
                    (l.flash = 3),
                    (l.stats.taken += u - l.slot.hp);
                  let h = this.players.find((c) => c.team !== l.team);
                  h && (h.stats.dealt += u - l.slot.hp),
                    l.team !== mt
                      ? (this.match.dealt += f)
                      : (this.match.taken += f),
                    this.emit({
                      type: "splat",
                      who: l,
                      x: e.x - i * e.r,
                      y: e.y - r * e.r,
                      nx: i,
                      ny: r,
                      dmg: f,
                    });
                }
              } else (e.kvx -= o * i), (e.kvy -= o * r);
          }
      }
      pushApart() {
        let e = [];
        for (let t of this.players)
          !(t.state === "dodge" && t.kit.dodge.kind !== "shell") &&
            !t.airborne &&
            t.state !== "faint" &&
            !(t.state === "smash" && t.kit.smash.pierce) &&
            e.push(t);
        for (let t of this.dummies) this.canBeHit(t) && e.push(t);
        for (let t = 0; t < e.length; t++)
          for (let s = t + 1; s < e.length; s++) {
            let i = e[t],
              r = e[s],
              o = r.x - i.x,
              l = r.y - i.y,
              f = Math.hypot(o, l),
              u = i.r + r.r;
            if (f > 0 && f < u) {
              let h = (u - f) / 2,
                c = o / f,
                y = l / f;
              (i.x -= c * h),
                (i.y -= y * h),
                (r.x += c * h),
                (r.y += y * h),
                this.clampToArena(i, !1),
                this.clampToArena(r, !1);
            }
          }
      }
      updateProjectiles() {
        for (let e of this.projectiles) {
          if ((e.age++, e.kind === "seed")) {
            let t = Math.min(1, e.age / e.flight);
            if (
              ((e.x = e.sx + (e.tx - e.sx) * t),
              (e.y = e.sy + (e.ty - e.sy) * t),
              (e.z = 14 * (1 - t) + Math.sin(t * Math.PI) * 30),
              t >= 1)
            ) {
              e.dead = !0;
              let s = this.targetsFor(e.team).find(
                (i) =>
                  !(i.kind === "player" && i.airborne) &&
                  Math.hypot(i.x - e.x, i.y - e.y) < i.hurtR + 6,
              );
              if (s) this.seedBody(s, e.seedOwner, e.seedSlot ?? 0);
              else if (
                (this.mines.push({
                  id: this.nextId++,
                  x: e.x,
                  y: e.y,
                  age: 0,
                  slot: e.seedSlot ?? 0,
                  owner: e.seedOwner,
                  team: e.team,
                }),
                this.mines.filter((i) => i.owner === e.seedOwner).length > 3)
              ) {
                let i = this.mines.findIndex((r) => r.owner === e.seedOwner);
                this.mines.splice(i, 1);
              }
              this.emit({ type: "seedLand", x: e.x, y: e.y, stuck: !!s });
            }
            continue;
          }
          if (
            (e.kind === "leaf" || e.kind === "wisp") &&
            e.target &&
            e.age > 4 &&
            this.targetsFor(e.team).includes(e.target)
          ) {
            let t = Math.hypot(e.vx, e.vy),
              s = We(
                Math.atan2(e.vy, e.vx),
                Math.atan2(e.target.y - e.y, e.target.x - e.x),
                e.homing ?? 0.06,
              );
            (e.vx = Math.cos(s) * t), (e.vy = Math.sin(s) * t);
          }
          if (
            ((e.x += e.vx),
            (e.y += e.vy),
            e.life--,
            e.kind === "leaf" && !e.reflected && he.leafDeflect)
          ) {
            let t = this.dreepy.find(
              (s) =>
                s.team !== e.team &&
                s.state === "out" &&
                Math.hypot(s.x - e.x, s.y - e.y) < e.r + he.leafR,
            );
            if (t) {
              t.temp
                ? (t.t = -1)
                : ((t.state = "back"),
                  (t.t = 0),
                  (t.speed = 1.6),
                  (t.hits = 2),
                  (t.vx = -t.vx * 0.3),
                  (t.vy = -t.vy * 0.3)),
                this.emit({
                  type: "dreepySwat",
                  x: t.x,
                  y: t.y - t.z,
                  by: e.owner,
                }),
                (e.dead = !0),
                this.emit({ type: "projDie", p: e, wall: !1 });
              continue;
            }
          }
          if (e.life <= 0) {
            (e.dead = !0), this.emit({ type: "projDie", p: e, wall: !1 });
            continue;
          }
          // Will-O-Wisp is a ghost flame and drifts through cover.
          let rk =
            e.kind !== "wisp" &&
            this.rocks.find(
              (t) =>
                t.state === "solid" &&
                Math.hypot(t.x - e.x, t.y - e.y) < t.r + e.r,
            );
          if (rk) {
            this.hitRock(rk, e.dmg, e.x, e.y),
              (e.dead = !0),
              this.emit({ type: "projDie", p: e, wall: !0 });
            continue;
          }
          (e.x < B.x0 || e.x > B.x1 || e.y < B.y0 - 4 || e.y > B.y1) &&
            ((e.dead = !0), this.emit({ type: "projDie", p: e, wall: !0 }));
        }
      }
      shapeHits(e, t, s, i) {
        if (e.kind === "circle") return Math.hypot(t - e.x, s - e.y) < e.r + i;
        let r = e.x2 - e.x1,
          o = e.y2 - e.y1,
          l = r * r + o * o || 1,
          f = me(((t - e.x1) * r + (s - e.y1) * o) / l, 0, 1);
        return Math.hypot(t - (e.x1 + r * f), s - (e.y1 + o * f)) < e.r + i;
      }
      reflect(e, t, s, i = 1.25) {
        let r = t.team,
          l =
            (t.kind === "player" ? t.lock : null) ??
            (this.targetsFor(r).includes(e.owner)
              ? e.owner
              : this.nearestTarget(r, e.x, e.y)),
          f = Math.hypot(e.vx, e.vy) * 1.6,
          u = l ? Math.atan2(l.y - e.y, l.x - e.x) : Math.atan2(-e.vy, -e.vx);
        (e.vx = Math.cos(u) * f),
          (e.vy = Math.sin(u) * f),
          (e.team = r),
          (e.owner = t),
          (e.reflected = !0),
          (e.target = l),
          (e.color = t.kind === "player" ? t.kit.color : "#ffd25e"),
          (e.dmg = Math.round(e.dmg * i)),
          (e.life = 120),
          (e.dodged = !1),
          (t.hitstop = Math.max(t.hitstop, s)),
          this.emit({ type: "reflect", p: e, x: e.x, y: e.y });
      }
      shellCounter(e, t) {
        let s = t.x - e.x,
          i = t.y - e.y,
          r = Math.hypot(s, i) || 1;
        (t.state = "hurt"),
          (t.t = 0),
          (t.hitstun = 30),
          (t.combo = 0),
          (t.chainQueued = !1),
          (t.flameEnd = 0),
          (t.kvx = (s / r) * 3.5),
          (t.kvy = (i / r) * 3.5),
          (t.flash = 3),
          (t.hitstop = 10),
          (e.hitstop = 10),
          this.emit({
            type: "parry",
            who: e,
            attacker: t,
            x: (e.x + t.x) / 2,
            y: (e.y + t.y) / 2,
          });
      }
      block(e, t) {
        (e.dead = !0),
          (t.hitstop = Math.max(t.hitstop, 2)),
          (t.flash = 1),
          this.emit({ type: "blocked", x: e.x, y: e.y, who: t });
      }
      canHitAgain(e, t) {
        let s = this.hitLog.get(e.id);
        s || ((s = new Map()), this.hitLog.set(e.id, s));
        let i = s.get(t);
        return i !== void 0 && (e.rehit === 0 || this.tick - i < e.rehit)
          ? !1
          : (s.set(t, this.tick), !0);
      }
      resolveHits() {
        for (let e of this.hitboxes) {
          for (let t of this.victimsFor(e.team)) {
            if (!this.shapeHits(e.shape, t.x, t.y, t.hurtR)) continue;
            if (
              t.kind === "player" &&
              t.state === "withdraw" &&
              t.t <= 8 &&
              e.owner.kind === "player" &&
              !e.push &&
              e.rehit === 0 &&
              Math.hypot(e.owner.x - t.x, e.owner.y - t.y) < 34
            ) {
              if (!this.canHitAgain(e, t)) continue;
              this.shellCounter(t, e.owner);
              continue;
            }
            if (
              (e.push &&
                ((t.kvx += e.dx * e.push * 0.25),
                (t.kvy += e.dy * e.push * 0.25)),
              !this.canHitAgain(e, t))
            )
              continue;
            let s = e.dx,
              i = e.dy,
              r = e.shape.kind === "circle" ? e.shape.x : e.shape.x1,
              o = e.shape.kind === "circle" ? e.shape.y : e.shape.y1;
            if (e.kbMode === "away") {
              let c = t.x - r,
                y = t.y - o,
                b = Math.hypot(c, y) || 1;
              (s = c / b), (i = y / b);
            } else if (e.kbMode === "pull") {
              let c = e.owner.x - t.x,
                y = e.owner.y - t.y,
                b = Math.hypot(c, y) || 1;
              (s = c / b), (i = y / b);
            } else {
              let c = t.x - e.owner.x,
                y = t.y - e.owner.y,
                b = Math.hypot(c, y) || 1;
              (s = e.dx * 0.6 + (c / b) * 0.4),
                (i = e.dy * 0.6 + (y / b) * 0.4);
              let p = Math.hypot(s, i) || 1;
              (s /= p), (i /= p);
            }
            let l =
                e.shape.kind === "circle" ? (t.x + e.shape.x) / 2 : t.x - s * 6,
              f =
                e.shape.kind === "circle" ? (t.y + e.shape.y) / 2 : t.y - i * 6,
              u = e.kb;
            e.kbMode === "pull" &&
              (u = Math.min(
                u,
                Math.max(
                  1.5,
                  (Math.hypot(e.owner.x - t.x, e.owner.y - t.y) - 18) *
                    (1 - A.kbFriction) *
                    1.05,
                ),
              ));
            let h = !!e.hex && (t.burnT ?? 0) > 0;
            if (
              (this.applyHit(
                t,
                e.owner,
                Math.round(
                  (h ? e.dmg * e.hex : e.dmg) *
                    (e.falloff
                      ? FLAME.far +
                        (FLAME.near - FLAME.far) *
                          me(
                            1 -
                              (Math.hypot(
                                t.x - e.falloff.x,
                                t.y - e.falloff.y,
                              ) -
                                t.hurtR * 0.5) /
                                e.falloff.len,
                            0,
                            1,
                          )
                      : 1),
                ),
                u,
                s,
                i,
                e.heavy,
                e.hitstop,
                e.hitstun,
                e.color,
                l,
                f,
                e.attackerStop,
                e.rehit > 0,
                this.srcLabel(e.owner, (e.src ?? "?") + (h ? "-hex" : "")),
                !!e.melee,
                !1,
                e.smash ?? 0,
              ),
              e.heat &&
                e.owner.kind === "player" &&
                e.owner.kit.id === "charizard")
            ) {
              let c = e.owner.slot;
              c.heat = Math.min(100, c.heat + e.heat);
            }
          }
          if (e.owner && e.owner.kind !== "dummy")
            for (let t of this.rocks)
              t.state === "solid" &&
                this.shapeHits(e.shape, t.x, t.y, t.r) &&
                this.canHitAgain(e, t) &&
                this.hitRock(t, e.dmg);
          if (e.melee)
            for (let t of this.dreepy)
              t.team === e.team ||
                t.state === "dazed" ||
                t.hits === 99 ||
                (this.shapeHits(e.shape, t.x, t.y, he.swatR) &&
                  (t.temp
                    ? (t.t = -1)
                    : ((t.state = "dazed"), (t.t = 0), (t.vx = t.vy = 0)),
                  (e.owner.hitstop = Math.max(e.owner.hitstop, 4)),
                  this.emit({
                    type: "dreepySwat",
                    x: t.x,
                    y: t.y - t.z,
                    by: e.owner,
                  })));
          if (e.reflects)
            for (let t of this.projectiles)
              t.dead ||
                t.team === e.team ||
                t.reflected ||
                t.kind === "seed" ||
                (this.shapeHits(e.shape, t.x, t.y, t.r) &&
                  this.reflect(t, e.owner, 5));
        }
        for (let e of this.projectiles)
          if (!(e.dead || e.kind === "seed"))
            for (let t of this.targetsFor(e.team)) {
              if (Math.hypot(t.x - e.x, t.y - e.y) >= e.r + t.hurtR) continue;
              if (t.kind === "player") {
                let i = t;
                if (i.invincible || i.airborne) {
                  e.dodged ||
                    ((e.dodged = !0),
                    i.state === "dodge" &&
                      i.t <= A.closeCallWindow &&
                      (i.closeCalls++,
                      (i.slot.cdDodge = 0),
                      i.isCpu || this.slow(22, 0.3),
                      this.emit({
                        type: "closeCall",
                        who: i,
                        x: i.x,
                        y: i.y,
                      })));
                  continue;
                }
                if (e.dodged) continue;
                if (i.state === "withdraw") {
                  this.block(e, i);
                  break;
                }
              }
              e.dead = !0;
              let s = Math.hypot(e.vx, e.vy) || 1;
              this.applyHit(
                t,
                e.owner,
                e.dmg,
                e.kb,
                e.vx / s,
                e.vy / s,
                !!e.reflected,
                e.hitstop,
                e.hitstun,
                e.color,
                e.x,
                e.y,
                e.owner.kind === "player",
                !1,
                this.srcLabel(e.owner, e.reflected ? "reflect" : e.kind),
              ),
                e.kind === "wisp" && this.burn(t),
                e.kind === "pulse" && this.soak(t, e.team),
                this.emit({ type: "projDie", p: e, wall: !1 });
              break;
            }
        this.projectiles = this.projectiles.filter((e) => !e.dead);
      }
      srcLabel(e, t) {
        return e.kind === "player"
          ? `${e.kit.id}:${t}`
          : e.kind === "assist"
            ? `assist-${e.kit.id}:${t}`
            : `${e.kind}:${t}`;
      }
      burn(e) {
        if (e.kind === "player") {
          let t = e;
          if (t.state === "faint") return;
          if (t.kit.type === "FIRE") {
            this.emit({ type: "burnImmune", who: e });
            return;
          }
          t.slot.burnT = he.burn;
        } else if (e.kind === "dummy") e.burnT = he.burn;
        else return;
        this.emit({ type: "burned", who: e });
      }
      canBeHit(e) {
        return !e.hidden && e.state !== "ko" && e.state !== "spawn";
      }
      attackerType(e) {
        return e && (e.kind === "player" || e.kind === "assist")
          ? e.kit.type
          : "";
      }
      outgoingMult(e) {
        if (!e || e.kind !== "player") return 1;
        let t = e;
        if (t.kit.id !== "charizard") return 1;
        let s = t.slot;
        return (1 + 0.5 * (s.heat / 100)) * (s.hp < s.maxHp * 0.3 ? 1.3 : 1);
      }
      applyHit(
        e,
        t,
        s,
        i,
        r,
        o,
        l,
        f,
        u,
        h,
        c,
        y,
        b,
        p,
        k = "?",
        M = !1,
        P = !1,
        C = 0,
      ) {
        let x = !1,
          v = 0,
          E = !1,
          Q = e.kind === "player" ? Ua(this.attackerType(t), e.kit.type) : 1,
          ie = M && t && t.kind === "player" && t.slot.burnT > 0 ? 0.7 : 1,
          K = Math.round(s * ae.dmg * this.outgoingMult(t) * Q * ie);
        let pun =
          e.kind === "player" &&
          !p &&
          !!t &&
          t.team !== e.team &&
          this.recovering(e);
        if (e.kind === "player" && e.state === "guard" && !P) {
          if (e.t <= ae.parryWin || !this.flanked(e, t, c, y)) {
            this.guardHit(e, t, K, r, o, l, f, M, p, C);
            return;
          }
          this.emit({ type: "flank", who: e, attacker: t, x: e.x, y: e.y });
        }
        if (
          (t &&
            t.kind === "player" &&
            M &&
            !t.swingHit &&
            ((t.swingHit = !0), t.stats.landed++),
          e.kind === "dummy")
        ) {
          let w = e;
          (v = w.state === "hurt" ? w.combo + 1 : 1),
            (w.combo = v),
            (w.comboDmg = v === 1 ? K : w.comboDmg + K),
            (w.bestCombo = Math.max(w.bestCombo, v)),
            (w.hp -= K),
            w.hp <= 0 && ((w.hp = 0), (x = !0), (w.seededT = 0)),
            (w.state = x ? "ko" : "hurt"),
            (w.t = 0),
            (w.hitstun = u);
          let U = l ? 1 : Math.max(0.55, 1 - (v - 1) * 0.1),
            re = i * U * (x ? 1.7 : 1) * (w.seededT > 0 ? 0.4 : 1);
          (w.kvx = r * re), (w.kvy = o * re);
        } else if (e.kind === "player") {
          let w = e,
            U = w.slot;
          (E = w.armored && !l),
            E && w.armorUsed++,
            (v = w.state === "hurt" ? w.comboTaken + 1 : 1),
            (w.comboTaken = v);
          let re = K;
          E
            ? (re = Math.round(K * 0.7))
            : w.state === "withdraw" && !P
              ? (re = Math.round(K * 0.2))
              : w.rooted && (re = Math.round(K * 0.8));
          let se = U.hp;
          if (
            ((U.hp = Math.max(0, U.hp - re)),
            (w.stats.taken += se - U.hp),
            t && t.kind === "player")
          ) {
            let N = t;
            (N.stats.dealt += se - U.hp),
              C > 0 && N.stats.smashHits++,
              p ||
                (N.stats.bestCombo = Math.max(
                  N.stats.bestCombo,
                  w.state === "hurt" ? w.comboTaken + 1 : 1,
                ));
          } else
            t && t.kind === "assist" && (t.summoner.stats.dealt += se - U.hp);
          if (
            (U.hp === 0 &&
              (this.match.mode === "practice" && !w.isCpu
                ? (U.hp = U.maxHp)
                : (x = !0)),
            x)
          ) {
            w.state === "flame" && !w.flameEnd && (U.cdX = w.kit.xCd),
              (w.state = "faint"),
              (w.t = 0),
              (w.z = 0),
              (w.spinRow = -1),
              (w.flameEnd = 0),
              (w.seededT = 0),
              (w.rooted = !1),
              (U.burnT = 0),
              t &&
                t.kind === "player" &&
                (t.koCount++, (t.lastKoTick = this.tick), t.stats.kos++);
            let N = i * w.kit.weight * 1.7;
            (w.kvx = r * N),
              (w.kvy = o * N),
              (w.mvx = w.mvy = 0),
              this.emit({ type: "faint", who: w, kit: w.kit });
          } else if (!E) {
            w.state === "flame" && !w.flameEnd && (U.cdX = w.kit.xCd),
              w.state === "pump" && (U.cdY = w.kit.yCd),
              w.state === "solar" && this.storeSolar(w),
              (w.flameEnd = 0);
            let N = p ? 1 : Math.max(0.45, 1 - ae.decay * (v - 1)),
              J = Math.round((w.rooted ? u * 0.5 : u) * N);
            p && w.state === "hurt"
              ? (w.hitstun = Math.max(w.hitstun, w.t + J))
              : ((w.state = "hurt"), (w.t = 0), (w.hitstun = J)),
              (w.combo = 0),
              (w.chainQueued = !1),
              (w.spinRow = -1),
              (w.z = 0);
            let fe = l ? 1 : Math.max(0.55, 1 - (v - 1) * 0.1),
              ce = w.rooted ? 0 : i * w.kit.weight * fe;
            (w.kvx = r * ce),
              (w.kvy = o * ce),
              (w.mvx = w.mvy = 0),
              (l || C > 0) &&
                !p &&
                !w.rooted &&
                (ce >= ae.launchAt || C > 0) &&
                ((w.state = "launched"),
                (w.t = 0),
                (w.hitstun = Math.round(14 + ce * 1.7)),
                (w.launchH = 8 + ce * 2.6),
                (w.techAt = -99),
                (w.splatted = !1),
                t && t.kind === "player" && t.stats.launches++,
                this.emit({
                  type: "launch",
                  who: w,
                  x: w.x,
                  y: w.y,
                  power: ce,
                }));
          }
        }
        let $ = x
          ? A.hitstopKO
          : C > 0
            ? f
            : Math.round(f * (l ? 1 : Math.min(1.4, 0.8 + K / 120)));
        if (
          ((e.hitstop = E ? Math.min(2, $) : $),
          t && b && (t.hitstop = Math.max(t.hitstop, $)),
          t && (t.tint = 2),
          (e.flash = l || x ? 4 : 2),
          !E)
        ) {
          let w = Math.abs(r),
            U = l || x ? 0.42 : p ? 0.12 : 0.24;
          (e.sqx = 1 + U * w - U * 0.6 * (1 - w)),
            (e.sqy = 1 + U * (1 - w) - U * 0.6 * w);
        }
        if (pun && this.tick - e.punishT > PUNISH_GAP) {
          e.punishT = this.tick;
          let w = t.kind === "player" ? t : (t.summoner ?? null);
          w && w.stats && w.stats.punishes++,
            this.emit({ type: "punish", who: e, by: w, x: e.x, y: e.y });
        }
        x && this.slow(28, 0.25),
          t &&
            t.team === mt &&
            !p &&
            (this.match.combo = Math.max(this.match.combo, v)),
          t && t.team === mt && e.kind === "player" && (this.match.dealt += K),
          e === this.player && (this.match.taken += K),
          this.emit({
            type: "hit",
            x: c,
            y,
            dx: r,
            dy: o,
            heavy: l || x,
            ko: x,
            dmg: K,
            victim: e,
            attacker: t,
            color: h,
            combo: v,
            armored: E,
            multi: p,
            src: k,
            eff: Q,
          });
      }
    };
  function Qt(a) {
    return new Promise((e, t) => {
      let s = new Image();
      (s.onload = () => e(s)), (s.onerror = t), (s.src = a);
    });
  }
  function Zt(a, e) {
    let t = document.createElement("canvas");
    return (t.width = a), (t.height = e), t;
  }
  function Jt(a, e) {
    let t = Zt(a.width, a.height),
      s = t.getContext("2d");
    return (
      s.drawImage(a, 0, 0),
      (s.globalCompositeOperation = "source-in"),
      (s.fillStyle = e),
      s.fillRect(0, 0, t.width, t.height),
      t
    );
  }
  var Ka = ["#ff8a3d", "#6fd3e8", "#ffd25e", "#a184f5", "#ef5a4f"];
  async function ea() {
    let a = {};
    for (let [e, t] of Object.entries(window.__ASSETS__)) {
      let s = {};
      for (let [r, o] of Object.entries(t.anims)) {
        let l = await Qt(o.src),
          f = Zt(l.width, l.height);
        f.getContext("2d").drawImage(l, 0, 0);
        let u = new Map();
        for (let h of Ka) u.set(h, Jt(f, h));
        s[r] = {
          name: r,
          img: f,
          white: Jt(f, "#ffffff"),
          tints: u,
          fw: o.fw,
          fh: o.fh,
          frames: Math.round(l.width / o.fw),
          rows: Math.round(l.height / o.fh),
          durations: o.durations,
          rush: o.rush,
          hit: o.hit,
          ret: o.ret,
        };
      }
      let i = {};
      for (let [r, o] of Object.entries(t.portraits ?? {})) i[r] = await Qt(o);
      a[e] = {
        name: e,
        anims: s,
        ground: Xa(s.Walk),
        credits: t.credits,
        portraits: i,
      };
    }
    return a;
  }
  function Xa(a) {
    let e = a.img.getContext("2d").getImageData(0, 0, a.fw, a.fh).data;
    for (let t = a.fh - 1; t >= 0; t--)
      for (let s = 0; s < a.fw; s++)
        if (e[(t * a.fw + s) * 4 + 3] > 0) return t - a.fh / 2;
    return a.fh / 4;
  }
  function nt(a) {
    let t = ((Math.round(a / (Math.PI / 4)) % 8) + 8) % 8;
    return [2, 1, 0, 7, 6, 5, 4, 3][t];
  }
  function Be(a, e, t = 1) {
    let s = a.durations.reduce((r, o) => r + o, 0),
      i = (e * t) % s;
    for (let r = 0; r < a.durations.length; r++) {
      if (i < a.durations[r]) return r;
      i -= a.durations[r];
    }
    return 0;
  }
  function gt(a, e, t, s, i) {
    let r = a.frames,
      o = Math.min(a.hit ?? Math.floor(r / 3), r - 1),
      l = Math.min(Math.max(a.ret ?? o + 1, o + 1), r),
      f = (u, h, c) => Math.min(h - 1, u + Math.floor(c * (h - u)));
    return e < t
      ? f(0, Math.max(1, o), e / t)
      : e < t + s
        ? f(o, l, (e - t) / s)
        : l >= r
          ? r - 1
          : f(l, r, (e - t - s) / i);
  }
  var kt = new Set(),
    Ue = new Set(),
    $a = new Set(),
    wt = "keys",
    Dt = null,
    sa = {
      KeyJ: ["attack", "confirm"],
      Space: ["attack", "confirm"],
      KeyK: ["dodge", "back"],
      ShiftLeft: ["lock"],
      ShiftRight: ["lock"],
      KeyL: ["special1"],
      KeyI: ["special2"],
      KeyQ: ["switch"],
      KeyE: ["assist"],
      KeyO: ["guard"],
      KeyF: ["guard"],
      Backspace: ["back"],
      Enter: ["start", "confirm"],
      Escape: ["start", "back"],
      Tab: ["select"],
      Backquote: ["select"],
      KeyW: ["up"],
      KeyS: ["down"],
      KeyA: ["left"],
      KeyD: ["right"],
    };
  function ia(a) {
    Dt = a;
  }
  function ra() {
    addEventListener("keydown", (a) => {
      if (
        ((a.code === "Tab" ||
          a.code.startsWith("Arrow") ||
          a.code === "Space") &&
          a.preventDefault(),
        !a.repeat)
      ) {
        kt.add(a.code), (wt = "keys");
        for (let e of sa[a.code] ?? []) Ue.add(e);
        a.code === "ArrowUp" && Ue.add("up"),
          a.code === "ArrowDown" && Ue.add("down"),
          a.code === "ArrowLeft" && Ue.add("left"),
          a.code === "ArrowRight" && Ue.add("right"),
          Dt?.();
      }
    }),
      addEventListener("keyup", (a) => kt.delete(a.code)),
      addEventListener("blur", () => kt.clear());
  }
  function na(a) {
    let e = (y) => !!a.buttons[y]?.pressed,
      t = new Set(),
      [s, i, r, o] = [e(0), e(1), e(2), e(3)],
      l = A.swapFace ? i : s,
      f = A.swapFace ? s : i,
      u = A.swapFace ? o : r,
      h = A.swapFace ? r : o;
    l && (t.add("attack"), t.add("confirm")),
      f && (t.add("dodge"), t.add("back")),
      u && t.add("special1"),
      h && t.add("special2"),
      e(4) && t.add("switch"),
      e(6) && t.add("assist"),
      e(5) && t.add("lock"),
      (e(7) || (a.buttons[7]?.value ?? 0) > 0.35) && t.add("guard"),
      e(9) && t.add("start"),
      e(8) && t.add("select"),
      e(12) && t.add("up"),
      e(13) && t.add("down"),
      e(14) && t.add("left"),
      e(15) && t.add("right");
    let c = a.axes[9];
    if (a.mapping !== "standard" && c !== void 0 && c >= -1.01 && c <= 1.01) {
      let y = Math.round((c + 1) * 3.5);
      [7, 0, 1].includes(y) && t.add("up"),
        [1, 2, 3].includes(y) && t.add("right"),
        [3, 4, 5].includes(y) && t.add("down"),
        [5, 6, 7].includes(y) && t.add("left");
    }
    return t;
  }
  function oa() {
    let a = navigator.getGamepads ? navigator.getGamepads() : [];
    for (let e of a) if (e && e.connected) return e;
    return null;
  }
  var ta = new Set();
  function la() {
    let a = oa();
    if (!a) return;
    let e = na(a);
    for (let t of e) ta.has(t) || (Ue.add(t), (wt = "pad"), Dt?.());
    ta = e;
  }
  function aa(a, e) {
    let t = Math.hypot(a, e),
      s = A.deadzone;
    if (t < s) return [0, 0];
    let i = Math.min(1, (t - s) / (1 - s));
    return [(a / t) * i, (e / t) * i];
  }
  function ha() {
    let a = oa(),
      e = 0,
      t = 0,
      s = 0,
      i = 0,
      r = new Set();
    if (a) {
      for (let p of na(a)) r.add(p);
      ([e, t] = aa(a.axes[0] ?? 0, a.axes[1] ?? 0)),
        ([s, i] = aa(a.axes[2] ?? 0, a.axes[3] ?? 0)),
        (Math.hypot(e, t) > 0.1 || Math.hypot(s, i) > 0.1) && (wt = "pad");
    }
    let o = (r.has("right") ? 1 : 0) - (r.has("left") ? 1 : 0),
      l = (r.has("down") ? 1 : 0) - (r.has("up") ? 1 : 0);
    if (o || l) {
      let p = Math.hypot(o, l);
      (e = o / p), (t = l / p);
    }
    let f = (p) => kt.has(p),
      u = (f("KeyD") ? 1 : 0) - (f("KeyA") ? 1 : 0),
      h = (f("KeyS") ? 1 : 0) - (f("KeyW") ? 1 : 0);
    if (u || h) {
      let p = Math.hypot(u, h);
      (e = u / p), (t = h / p);
    }
    let c = (f("ArrowRight") ? 1 : 0) - (f("ArrowLeft") ? 1 : 0),
      y = (f("ArrowDown") ? 1 : 0) - (f("ArrowUp") ? 1 : 0);
    if (c || y) {
      let p = Math.hypot(c, y);
      (s = c / p), (i = y / p);
    }
    for (let [p, k] of Object.entries(sa)) if (f(p)) for (let M of k) r.add(M);
    let b = new Set(Ue);
    return (
      Ue.clear(),
      ($a = r),
      {
        mx: e,
        my: t,
        ax: s,
        ay: i,
        aimHeld: Math.hypot(s, i) > 0.45,
        pressed: b,
        held: r,
        source: wt,
      }
    );
  }
  var Ie = Math.random,
    z = (a, e) => a + Ie() * (e - a),
    xt = class {
      constructor() {
        this.parts = [];
        this.ghosts = [];
        this.popups = [];
        this.banners = [];
        this.sx = 0;
        this.sy = 0;
        this.svx = 0;
        this.svy = 0;
        this.jitter = 0;
        this.zoom = 0;
        this.zx = Y / 2;
        this.zy = _ / 2;
        this.screenFlash = 0;
        this.screenFlashColor = "#ffffff";
        this.vignette = 0;
        this.vignetteColor = "111,211,232";
        this.impact = 0;
        this.speed = 0;
        this.speedX = 240;
        this.speedY = 135;
        this.speedColor = "#ffffff";
        this.leanX = 0;
        this.leanY = 0;
        this.danger = 0;
        this.camX = Y / 2;
        this.camY = _ / 2;
        this.camZ = 1;
        this.view = { z: 1, ox: 0, oy: 0 };
        this.ambient = Array.from({ length: 36 }, (e, t) => ({
          x: (t * 97) % Y,
          y: 40 + ((t * 53) % (_ - 50)),
          vx: 0.08 + (t % 5) * 0.03,
          vy: -0.03 - (t % 3) * 0.02,
          ph: t * 1.7,
        }));
      }
      add(e) {
        this.parts.push({
          z: 0,
          vx: 0,
          vy: 0,
          vz: 0,
          size: 2,
          color: "#fff",
          ...e,
          max: e.life,
        });
      }
      shake(e, t, s) {
        let i = Math.hypot(e, t) || 1,
          r = s * A.shake;
        (this.svx += (e / i) * r),
          (this.svy += (t / i) * r),
          (this.jitter = Math.max(this.jitter, r * 0.35));
      }
      punch(e, t, s) {
        (this.zoom = Math.max(this.zoom, s)), (this.zx = e), (this.zy = t);
      }
      dust(e, t, s, i = 0, r = 0, o = 1) {
        for (let l = 0; l < s; l++)
          this.add({
            kind: "dust",
            x: e + z(-3, 3),
            y: t + z(-2, 2),
            vx: -i * z(0.3, 1.2) + z(-0.5, 0.5) * o,
            vy: -r * z(0.3, 1.2) + z(-0.35, 0.35) * o,
            vz: z(0.05, 0.3),
            life: z(14, 24) | 0,
            size: z(2, 3.5),
            grow: 0.12,
            color: "#c9bfa6",
            under: !0,
          });
      }
      hitSpark(e, t, s, i, r, o) {
        let l = Math.atan2(i, s);
        this.add({
          kind: "flash",
          x: e,
          y: t,
          z: 8,
          life: r ? 5 : 3,
          size: r ? 15 : 10,
          color: "#ffffff",
        }),
          this.add({
            kind: "ring",
            x: e,
            y: t,
            z: 8,
            life: r ? 12 : 8,
            size: r ? 4 : 3,
            grow: r ? 2.2 : 1.6,
            color: o,
          });
        let f = r ? 11 : 6;
        for (let u = 0; u < f; u++) {
          let h = l + z(-0.9, 0.9) * (u % 3 === 0 ? 2.2 : 1),
            c = z(2.5, r ? 7 : 5);
          this.add({
            kind: "spark",
            x: e,
            y: t,
            z: 8,
            vx: Math.cos(h) * c,
            vy: Math.sin(h) * c,
            life: z(5, r ? 12 : 8) | 0,
            size: 1,
            color: u % 2 ? "#ffffff" : o,
          });
        }
        for (let u = 0; u < (r ? 10 : 5); u++) {
          let h = l + z(-1.2, 1.2);
          this.add({
            kind: "ember",
            x: e,
            y: t,
            z: 8,
            vx: Math.cos(h) * z(0.8, 3),
            vy: Math.sin(h) * z(0.8, 3),
            vz: z(0.2, 0.9),
            life: z(12, 26) | 0,
            size: Ie() < 0.3 ? 2 : 1,
            color: o,
          });
        }
      }
      // Crescent that sweeps around a fighter (follows it while it lunges).
      slash(e, t, s, i, r, o, l, f = 10, u = -10) {
        this.add({
          kind: "slash",
          who: e,
          x: e.x,
          y: e.y,
          ang: t,
          rad: s,
          span: i,
          w: r,
          dir: o,
          color: l,
          life: f,
          lift: u,
        });
      }
      // Three parallel rake marks across a point.
      claw(e, t, s, i, r) {
        for (let o = -1; o <= 1; o++)
          this.add({
            kind: "claw",
            x: e + Math.cos(s + Math.PI / 2) * o * 4,
            y: t + Math.sin(s + Math.PI / 2) * o * 4,
            ang: s + i,
            len: 15 - Math.abs(o) * 3,
            color: r,
            life: 9,
            delay: o + 1,
          });
      }
      burst(e, t, s, i = 14) {
        this.add({
          kind: "burst",
          x: e,
          y: t,
          z: 8,
          size: i,
          color: s,
          life: 7,
        });
      }
      streaks(e, t, s, i, r, o) {
        let l = Math.atan2(i, s);
        for (let f = 0; f < r; f++) {
          let u = z(-7, 7);
          this.add({
            kind: "streak",
            x: e + Math.cos(l + Math.PI / 2) * u,
            y: t + Math.sin(l + Math.PI / 2) * u,
            z: 8,
            ang: l,
            len: z(10, 20),
            vx: Math.cos(l) * 1.5,
            vy: Math.sin(l) * 1.5,
            color: f % 2 ? "#ffffff" : o,
            life: z(6, 10) | 0,
          });
        }
      }
      glint(e, t, s) {
        this.add({
          kind: "glint",
          who: e,
          x: e.x,
          y: e.y,
          z: t,
          color: s,
          life: 12,
        });
      }
      embers(e, t, s, i) {
        for (let r = 0; r < i; r++)
          this.add({
            kind: "ember",
            x: e + z(-2, 2),
            y: t + z(-2, 2),
            z: s,
            vx: z(-0.4, 0.4),
            vy: z(-0.4, 0.4),
            vz: z(0.2, 0.7),
            life: z(8, 18) | 0,
            size: Ie() < 0.25 ? 2 : 1,
            color: "#ff8a3d",
          });
      }
      motes(e, t, s, i, r, o = 1) {
        for (let l = 0; l < i; l++) {
          let f = Ie() * 6.283,
            u = z(0.3, 1.6) * o;
          this.add({
            kind: "mote",
            x: e,
            y: t,
            z: s,
            vx: Math.cos(f) * u,
            vy: Math.sin(f) * u,
            vz: z(-0.2, 0.4),
            life: z(10, 22) | 0,
            size: Ie() < 0.3 ? 2 : 1,
            color: r,
          });
        }
      }
      flame(e, t, s, i, f = 1 / 0, u = !1) {
        for (let r = 0; r < i; r++) {
          let o = s + z(-0.2, 0.2),
            l = u ? z(6, 9) : z(3.2, 5.2);
          this.add({
            kind: "fire",
            x: e + Math.cos(s) * z(4, 10),
            y: t + Math.sin(s) * z(4, 10),
            z: 10,
            vx: Math.cos(o) * l,
            vy: Math.sin(o) * l,
            vz: z(0, 0.25),
            // Long throw slows with drag, so cap life by the ticks it needs to reach f.
            life:
              Math.max(
                2,
                u
                  ? Math.min(
                      z(14, 20),
                      f * 0.05 < l
                        ? Math.log(1 - (f * 0.05) / l) / Math.log(0.95)
                        : 99,
                    )
                  : Math.min(z(10, 16), f / l),
              ) | 0,
            size: z(2, 3.2),
            grow: 0.28,
            color: "#ff8a3d",
            drag: u ? 0.95 : 0.9,
          });
        }
      }
      splash(e, t, s, i, r = 0, o = 0) {
        for (let l = 0; l < i; l++) {
          let f = Math.atan2(o, r) + Math.PI + z(-1.4, 1.4),
            u = z(0.6, 2.4);
          this.add({
            kind: "drop",
            x: e,
            y: t,
            z: s,
            vx: r || o ? Math.cos(f) * u : z(-1.6, 1.6),
            vy: r || o ? Math.sin(f) * u : z(-1.2, 1.2),
            vz: z(0.8, 2.2),
            life: z(14, 24) | 0,
            size: Ie() < 0.4 ? 2 : 1,
            color: Ie() < 0.3 ? "#e6f6ff" : "#7cc4f2",
          });
        }
      }
      leaves(e, t, s, i, r = 1.4) {
        for (let o = 0; o < i; o++) {
          let l = Ie() * 6.283,
            f = z(0.4, 1.6) * r;
          this.add({
            kind: "leafbit",
            x: e,
            y: t,
            z: s,
            vx: Math.cos(l) * f,
            vy: Math.sin(l) * f,
            vz: z(0.3, 1.2),
            life: z(18, 32) | 0,
            size: 2,
            color: Ie() < 0.5 ? "#6cc04a" : "#9be36b",
          });
        }
      }
      smoke(e, t, s, i) {
        for (let r = 0; r < i; r++)
          this.add({
            kind: "smoke",
            x: e + z(-4, 4),
            y: t + z(-2, 2),
            z: s,
            vx: z(-0.3, 0.3),
            vy: z(-0.2, 0.1),
            vz: z(0.4, 0.9),
            life: z(18, 30) | 0,
            size: z(2, 3.5),
          });
      }
      heal(e, t, s) {
        for (let i = 0; i < s; i++)
          this.add({
            kind: "heal",
            x: e + z(-8, 8),
            y: t + z(-3, 3),
            z: z(4, 16),
            vx: 0,
            vy: 0,
            vz: z(0.4, 0.8),
            life: z(18, 26) | 0,
            size: 1,
            color: "#9cf28a",
          });
      }
      debris(e, t, s, i, r) {
        for (let o = 0; o < s; o++)
          this.add({
            kind: "drop",
            x: e,
            y: t,
            z: z(2, 10),
            vx: i * z(0.6, 2.2) + z(-0.8, 0.8),
            vy: r * z(0.6, 2.2) + z(-0.6, 0.6),
            vz: z(0.6, 2),
            life: z(16, 28) | 0,
            size: Ie() < 0.4 ? 2 : 1,
            color: Ie() < 0.5 ? "#8a8f99" : "#c9bfa6",
          });
      }
      speedLines(e, t, s, i = "#ffffff") {
        (this.speed = s),
          (this.speedX = e),
          (this.speedY = t),
          (this.speedColor = i);
      }
      ring(e, t, s, i, r, o, l = !1, f = 0) {
        this.add({
          kind: "ring",
          x: e,
          y: t,
          z: f,
          life: r,
          size: s,
          grow: i,
          color: o,
          under: l,
        });
      }
      ghost(e, t, s, i, r, o, l = 10, f = 1) {
        this.ghosts.push({
          k: f,
          anim: e,
          frame: t,
          row: s,
          x: i,
          y: r,
          life: l,
          max: l,
          color: o,
        });
      }
      popup(e, t, s, i, r) {
        this.popups.push({
          x: e + z(-4, 4),
          y: t,
          text: s,
          life: r ? 46 : 34,
          max: r ? 46 : 34,
          color: i,
          big: r,
          vy: r ? -0.9 : -0.7,
        });
      }
      banner(e, t, s = 50, i) {
        (this.banners = this.banners.filter((r) => r.text !== e)),
          this.banners.push({ text: e, sub: i, life: s, max: s, color: t });
      }
      tick() {
        (this.svx += -this.sx * 0.42),
          (this.svy += -this.sy * 0.42),
          (this.svx *= 0.68),
          (this.svy *= 0.68),
          (this.sx += this.svx),
          (this.sy += this.svy),
          (this.jitter *= 0.78),
          (this.zoom *= 0.8),
          this.zoom < 0.001 && (this.zoom = 0),
          (this.screenFlash = Math.max(0, this.screenFlash - 1)),
          (this.vignette *= 0.9),
          this.impact > 0 && this.impact--,
          this.speed > 0 && this.speed--;
        for (let e of this.ambient)
          (e.ph += 0.03),
            (e.x += e.vx + Math.sin(e.ph) * 0.05),
            (e.y += e.vy),
            e.x > Y + 4 && (e.x = -4),
            e.y < 36 && (e.y = _ - 8);
        for (let e of this.parts)
          switch (
            (e.life--, (e.x += e.vx), (e.y += e.vy), (e.z += e.vz), e.kind)
          ) {
            case "dust":
              (e.vx *= 0.88), (e.vy *= 0.88), (e.size += e.grow ?? 0);
              break;
            case "spark":
              (e.vx *= 0.8), (e.vy *= 0.8);
              break;
            case "ember":
              (e.vx *= 0.92), (e.vy *= 0.92), (e.vz = e.vz * 0.96 + 0.02);
              break;
            case "ring":
              e.size += e.grow ?? 1;
              break;
            case "slash":
            case "glint":
              e.who && ((e.x = e.who.x), (e.y = e.who.y - (e.who.z ?? 0)));
              break;
            case "streak":
              (e.vx *= 0.8), (e.vy *= 0.8);
              break;
            case "smoke":
              (e.vx *= 0.95), (e.vy *= 0.95), (e.size += 0.15);
              break;
            case "mote":
              (e.vx *= 0.9), (e.vy *= 0.9);
              break;
            case "fire":
              (e.vx *= e.drag ?? 0.9),
                (e.vy *= e.drag ?? 0.9),
                (e.size += e.grow ?? 0.2);
              break;
            case "drop":
              (e.vx *= 0.95),
                (e.vy *= 0.95),
                (e.vz -= 0.22),
                e.z < 0 && ((e.z = 0), (e.life = Math.min(e.life, 2)));
              break;
            case "leafbit":
              (e.vx *= 0.93),
                (e.vy *= 0.93),
                (e.vz = e.vz * 0.9 - 0.04),
                (e.x += Math.sin(e.life * 0.5) * 0.3),
                e.z < 0 && (e.z = 0);
              break;
          }
        this.parts = this.parts.filter((e) => e.life > 0);
        for (let e of this.ghosts) e.life--;
        this.ghosts = this.ghosts.filter((e) => e.life > 0);
        for (let e of this.popups) e.life--, (e.y += e.vy), (e.vy *= 0.92);
        this.popups = this.popups.filter((e) => e.life > 0);
        for (let e of this.banners) e.life--;
        this.banners = this.banners.filter((e) => e.life > 0);
      }
      follow(e) {
        let t = Y / 2,
          s = _ / 2,
          i = 1;
        if (e.length) {
          let r = 1 / 0,
            o = -1 / 0,
            l = 1 / 0,
            f = -1 / 0;
          for (let u of e)
            (r = Math.min(r, u.x)),
              (o = Math.max(o, u.x)),
              (l = Math.min(l, u.y)),
              (f = Math.max(f, u.y));
          (t = (r + o) / 2),
            (s = (l + f) / 2 - 8),
            (i = Math.max(
              1,
              Math.min(1.5, Y / (o - r + 230), _ / (f - l + 170)),
            ));
        }
        (this.camX += (t - this.camX) * 0.09),
          (this.camY += (s - this.camY) * 0.09),
          (this.camZ += (i - this.camZ) * (i < this.camZ ? 0.09 : 0.04));
      }
      computeView() {
        let e = this.camZ * (1 + this.zoom),
          t = Math.min(1, this.zoom * 10),
          s = this.camX + (this.zx - this.camX) * t * 0.5,
          i = this.camY + (this.zy - this.camY) * t * 0.5,
          r = Y / 2 / e,
          o = _ / 2 / e;
        (s = Math.max(r, Math.min(Y - r, s))),
          (i = Math.max(o, Math.min(_ - o, i)));
        let l = this.cameraOffset();
        return (
          (this.view = {
            z: e,
            ox: Y / 2 - s * e + l.x,
            oy: _ / 2 - i * e + l.y,
          }),
          this.view
        );
      }
      cameraOffset() {
        let e = this.jitter;
        return {
          x: this.sx + this.leanX + (e > 0.2 ? z(-e, e) : 0),
          y: this.sy + this.leanY + (e > 0.2 ? z(-e, e) : 0),
        };
      }
    };
  var Ye = 2,
    L = {
      flame: "#ff8a3d",
      leaf: "#6cc04a",
      water: "#5aa9e6",
      cool: "#6fd3e8",
      gold: "#ffd25e",
      ink: "#eef2e6",
      shadow: "rgba(8,10,14,0.38)",
    },
    Bt = null;
  function Va(kind = 0) {
    let a = document.createElement("canvas");
    (a.width = Y), (a.height = _);
    let e = a.getContext("2d"),
      t = rt(77),
      s = (x, v, E) => {
        (e.fillStyle = E), e.fillRect(x, v, 1, 1);
      },
      i = B;
    (e.fillStyle = "#2a2f37"), e.fillRect(0, 0, Y, _);
    for (let x = 0; x < 1400; x++)
      s((t() * Y) | 0, (t() * _) | 0, t() < 0.5 ? "#323843" : "#242830");
    (e.fillStyle = "#3d5a3a"), e.fillRect(i.x0, i.y0, i.x1 - i.x0, i.y1 - i.y0);
    for (let x = 0; x < 2600; x++)
      s(
        i.x0 + ((t() * (i.x1 - i.x0)) | 0),
        i.y0 + ((t() * (i.y1 - i.y0)) | 0),
        ["#456641", "#36502f", "#4b6e45", "#3a5636"][(t() * 4) | 0],
      );
    for (let x = 0; x < 70; x++) {
      let v = i.x0 + 4 + ((t() * (i.x1 - i.x0 - 8)) | 0),
        E = i.y0 + 6 + ((t() * (i.y1 - i.y0 - 10)) | 0);
      s(v, E, "#5d8452"), s(v + 2, E, "#5d8452"), s(v + 1, E - 1, "#6f9a60");
    }
    let r = i.x0 + 22,
      o = i.y0 + 16,
      l = i.x1 - 22,
      f = i.y1 - 14;
    (e.fillStyle = "#a98f62"), e.fillRect(r, o, l - r, f - o);
    for (let x = 0; x < 3400; x++)
      s(
        r + ((t() * (l - r)) | 0),
        o + ((t() * (f - o)) | 0),
        ["#b39a6c", "#9d8458", "#a48a5d", "#b8a073"][(t() * 4) | 0],
      );
    for (let x = r; x < l; x++)
      t() < 0.4 && s(x, o - 1, "#7f7a52"), t() < 0.4 && s(x, f, "#7f7a52");
    for (let x = o; x < f; x++)
      t() < 0.4 && s(r - 1, x, "#7f7a52"), t() < 0.4 && s(l, x, "#7f7a52");
    let u = "#ece6cf",
      h = (x) => t() > x,
      c = r + 8,
      y = o + 7,
      b = l - 8,
      p = f - 7;
    for (let x = c; x <= b; x++) h(0.07) && s(x, y, u), h(0.07) && s(x, p, u);
    for (let x = y; x <= p; x++) h(0.07) && s(c, x, u), h(0.07) && s(b, x, u);
    let k = ((c + b) / 2) | 0,
      M = ((y + p) / 2) | 0;
    for (let x = y; x <= p; x++) h(0.08) && s(k, x, u);
    for (let x = 0; x < Math.PI * 2; x += 0.012)
      h(0.1) &&
        s(
          Math.round(k + Math.cos(x) * 30),
          Math.round(M + Math.sin(x) * 22),
          u,
        );
    for (let x = 0; x < Math.PI * 2; x += 0.05)
      s(Math.round(k + Math.cos(x) * 3), Math.round(M + Math.sin(x) * 2), u);
    for (let x of [c + 46, b - 46])
      for (let v = -4; v <= 4; v++)
        h(0.1) && s(x + v, M, u), h(0.1) && s(x, M + v, u);
    let P = i.y0 - 16;
    (e.fillStyle = "#5c616c"),
      e.fillRect(0, 0, Y, P),
      (e.fillStyle = "#454a54"),
      e.fillRect(0, P, Y, i.y0 - P);
    for (let x = 0; x < 2; x++) {
      let v = P + x * 8;
      (e.fillStyle = "#383c45"), e.fillRect(0, v, Y, 1);
      for (let E = (x % 2) * 9; E < Y; E += 18) e.fillRect(E, v, 1, 8);
      e.fillStyle = "#52575f";
      for (let E = (x % 2) * 9 + 1; E < Y; E += 18) e.fillRect(E, v + 1, 16, 1);
    }
    (e.fillStyle = "#717682"), e.fillRect(0, P - 2, Y, 2);
    for (let x = 0; x < 500; x++)
      s((t() * Y) | 0, (t() * (P - 2)) | 0, t() < 0.5 ? "#666b76" : "#545862");
    (e.fillStyle = "#5c616c"),
      e.fillRect(0, P, i.x0, _),
      e.fillRect(i.x1, P, Y - i.x1, _),
      e.fillRect(0, i.y1, Y, _ - i.y1),
      (e.fillStyle = "#717682"),
      e.fillRect(i.x0 - 2, i.y0, 2, i.y1 - i.y0 + 2),
      e.fillRect(i.x1, i.y0, 2, i.y1 - i.y0 + 2),
      e.fillRect(i.x0 - 2, i.y1, i.x1 - i.x0 + 4, 2);
    let C = [
      [Y * 0.2, L.leaf],
      [Y * 0.4, L.flame],
      [Y * 0.6, L.water],
      [Y * 0.8, "#a184f5"],
    ];
    for (let [x, v] of C) {
      (e.fillStyle = "#2a2f37"),
        e.fillRect(x - 9, P - 1, 18, 2),
        (e.fillStyle = v),
        e.fillRect(x - 8, P + 1, 16, 12),
        (e.fillStyle = "rgba(0,0,0,0.25)"),
        e.fillRect(x + 4, P + 1, 4, 12),
        (e.fillStyle = v);
      for (let E = 0; E < 8; E++)
        e.fillRect(x - 8 + E * 2, P + 13, 1, 1 + (E % 2) * 2);
      (e.fillStyle = "rgba(255,255,255,0.75)"),
        e.fillRect(x - 2, P + 5, 4, 4),
        (e.fillStyle = v),
        e.fillRect(x - 1, P + 6, 2, 2);
    }
    for (let x = 0; x < 8; x++)
      (e.fillStyle = `rgba(10,14,12,${0.32 - x * 0.04})`),
        e.fillRect(i.x0, i.y0 + x, i.x1 - i.x0, 1);
    for (let x = 0; x < 4; x++)
      (e.fillStyle = `rgba(10,14,12,${0.18 - x * 0.045})`),
        e.fillRect(i.x0 + x, i.y0, 1, i.y1 - i.y0),
        e.fillRect(i.x1 - 1 - x, i.y0, 1, i.y1 - i.y0);
    kind === 1 && Ka2(e, t, s);
    return a;
  }
  // Ruins floor: a worn flagstone plinth under every boulder spot, so a broken
  // rock still marks where it will rise again, plus a few cracked slabs and moss.
  function Ka2(e, t, s) {
    let i = ["#7d776b", "#8a8477", "#726c61", "#958e80"];
    for (let [r, o] of RUINS.spots) {
      (e.fillStyle = "rgba(20,18,14,0.28)"),
        e.beginPath(),
        e.ellipse(r, o + 2, 25, 13, 0, 0, Math.PI * 2),
        e.fill();
      for (let l = -24; l <= 24; l += 6)
        for (let f = -12; f <= 12; f += 4) {
          let u = l / 25,
            h = f / 13;
          if (u * u + h * h > 1 || t() < 0.12) continue;
          let c = i[(t() * i.length) | 0];
          (e.fillStyle = c),
            e.fillRect(r + l - 3 + ((f / 4) & 1) * 3, o + f, 5, 3);
          (e.fillStyle = "#5c574e"),
            e.fillRect(r + l - 3 + ((f / 4) & 1) * 3, o + f + 3, 5, 1);
        }
      for (let l = 0; l < 26; l++) {
        let f = t() * Math.PI * 2,
          u = 18 + t() * 9;
        s(
          Math.round(r + Math.cos(f) * u),
          Math.round(o + Math.sin(f) * u * 0.5),
          t() < 0.5 ? "#4f7a3c" : "#5f8f47",
        );
      }
    }
    for (let r = 0; r < 9; r++) {
      let o = B.x0 + 40 + t() * (B.x1 - B.x0 - 80),
        l = B.y0 + 20 + t() * (B.y1 - B.y0 - 40);
      if (Math.hypot(o - Se, (l - Te) * 1.6) < 50) continue;
      (e.fillStyle = "#8f8879"), e.fillRect(o | 0, l | 0, 9, 5);
      (e.fillStyle = "#6c665b"), e.fillRect(o | 0, (l | 0) + 5, 9, 1);
      s((o | 0) + 3, (l | 0) + 1, "#5c574e"),
        s((o | 0) + 4, (l | 0) + 2, "#5c574e"),
        s((o | 0) + 5, (l | 0) + 3, "#5c574e");
    }
  }
  // ---- Ruins boulders and the Sitrus Berry ----
  var Rk = null;
  function Fk() {
    let a = [];
    for (let e = 0; e < 2; e++) {
      let t = document.createElement("canvas");
      (t.width = 36), (t.height = 34);
      let s = t.getContext("2d"),
        i = rt(91 + e * 17),
        r = ["#4e4940", "#6a645a", "#857e71", "#a39b8a", "#c2baa6"],
        o = (u, h) => {
          let c = (u - 18) / 16,
            y = (h - 19) / 14,
            b = Math.atan2(y, c),
            p = 1 + 0.12 * Math.sin(b * 3 + e * 2) + 0.06 * Math.sin(b * 5 + 1);
          return c * c + y * y < p * p * (h < 12 ? 0.82 : 1);
        };
      for (let u = 0; u < 34; u++)
        for (let h = 0; h < 36; h++) {
          if (!o(h, u)) continue;
          let c = !o(h - 1, u) || !o(h + 1, u) || !o(h, u - 1) || !o(h, u + 1),
            y = (h - 18) / 16,
            b = (u - 19) / 14,
            p = -0.55 * y - 0.85 * b + 0.25 + (i() - 0.5) * 0.35,
            k = Math.max(0, Math.min(r.length - 1, Math.round(1.5 + p * 1.6)));
          u > 26 && (k = Math.min(k, 1)),
            (s.fillStyle = c ? "#2b2722" : r[k]),
            s.fillRect(h, u, 1, 1);
        }
      for (let u = 0; u < 22; u++) {
        let h = 6 + ((i() * 24) | 0),
          c = 6 + ((i() * 9) | 0);
        o(h, c) &&
          o(h, c + 2) &&
          ((s.fillStyle = i() < 0.5 ? "#5f8f47" : "#76a756"),
          s.fillRect(h, c, 1, 1));
      }
      a.push(t);
    }
    return a;
  }
  function ht2(a, e, t) {
    Rk || (Rk = Fk());
    let s = e.hitT > 0 ? (e.hitT % 2 ? 1 : -1) : 0,
      i = Math.round(e.x - 18 + s),
      r = Math.round(e.y - 27);
    a.drawImage(Rk[e.id % 2], i, r);
    let o = 1 - e.hp / e.max;
    if (o > 0.2) {
      (a.strokeStyle = "#231f1b"), (a.lineWidth = 1), a.beginPath();
      let l = rt(e.id);
      for (let f = 0; f < Math.ceil(o * 5); f++) {
        let u = i + 8 + l() * 20,
          h = r + 8 + l() * 12;
        a.moveTo(u, h),
          a.lineTo(u + (l() - 0.5) * 8, h + 3 + l() * 4),
          a.lineTo(u + (l() - 0.5) * 10, h + 7 + l() * 4);
      }
      a.stroke();
    }
    e.hitT > 3 &&
      ((a.globalAlpha = 0.35),
      (a.fillStyle = "#ffffff"),
      a.beginPath(),
      a.ellipse(e.x + s, e.y - 12, 14, 13, 0, 0, Math.PI * 2),
      a.fill(),
      (a.globalAlpha = 1));
  }
  // Ground layer for a rock: contact shadow, rubble while broken, and a pulsing
  // warning ring for the last two seconds before it rises again.
  function rockGround(a, e, t) {
    if (e.state === "solid") {
      (a.fillStyle = "rgba(8,10,14,0.42)"),
        a.beginPath(),
        a.ellipse(
          e.x + 2,
          e.y + 3,
          e.r + 3,
          (e.r + 3) * 0.42,
          0,
          0,
          Math.PI * 2,
        ),
        a.fill();
      return;
    }
    let s = rt(e.id * 7);
    for (let i = 0; i < 9; i++) {
      let r = e.x + (s() - 0.5) * 26,
        o = e.y + (s() - 0.5) * 12;
      (a.fillStyle = i % 3 ? "#6a645a" : "#4e4940"),
        a.fillRect(Math.round(r), Math.round(o), 3, 2);
    }
    if (e.t < RUINS.warn) {
      let i = 1 - e.t / RUINS.warn,
        r = 0.4 + 0.5 * Math.abs(Math.sin(t * 0.25));
      (a.globalAlpha = r),
        (a.strokeStyle = "#ffd25e"),
        (a.lineWidth = 1 + i),
        a.setLineDash([3, 2]),
        (a.lineDashOffset = -t * 0.5),
        a.beginPath(),
        a.ellipse(e.x, e.y, e.r + 4, (e.r + 4) * 0.48, 0, 0, Math.PI * 2),
        a.stroke(),
        a.setLineDash([]),
        (a.globalAlpha = 0.18 * i),
        (a.fillStyle = "#ffd25e"),
        a.beginPath(),
        a.ellipse(e.x, e.y, e.r + 4, (e.r + 4) * 0.48, 0, 0, Math.PI * 2),
        a.fill(),
        (a.globalAlpha = 1);
    }
  }
  // Wind-up warning: while an attack or smash charges, the ground under where it
  // will land fills in. Red for the CPU's moves, the fighter's colour for yours.
  function dzone(a, e, t) {
    let s = t.kit,
      i,
      r,
      o,
      l,
      f = 0,
      u = !1;
    if (t.state === "attack") {
      let b = s.basic()[t.combo];
      if (t.t > b.startup || b.startup < 3) return;
      (f = t.t / b.startup),
        (i = b),
        (r = b.reach),
        (o = b.radius),
        (l = b.lunge * 0.6);
    } else if (t.state === "smashCharge") {
      let b = s.smash;
      (f = Math.min(1, t.t / (b.windup + 8))),
        (i = b),
        (r = b.reach),
        (o = b.radius),
        (l = b.lunge * (b.shape === "vine" ? 0 : 0.8)),
        (u = !0);
    } else return;
    let c = Math.cos(t.atkDir),
      y = Math.sin(t.atkDir),
      b = t.isCpu
        ? "239,90,79"
        : t.kit.id === "dragapult"
          ? "161,132,245"
          : "111,211,232",
      p =
        (0.1 + 0.28 * f) *
        (u && t.smashCharge >= 1 && e.tick % 6 < 3 ? 1.5 : 1);
    if (
      (a.save(),
      (a.fillStyle = `rgba(${b},${p})`),
      (a.strokeStyle = `rgba(${b},${0.35 + 0.5 * f})`),
      (a.lineWidth = 1),
      i.shape === "vine")
    )
      (a.lineCap = "round"),
        (a.lineWidth = o * 2 * (0.6 + 0.4 * f)),
        (a.strokeStyle = `rgba(${b},${p})`),
        a.beginPath(),
        a.moveTo(t.x + c * 10, t.y + y * 10),
        a.lineTo(t.x + c * r, t.y + y * r),
        a.stroke(),
        (a.lineWidth = 1),
        (a.strokeStyle = `rgba(${b},${0.35 + 0.5 * f})`),
        a.beginPath(),
        a.arc(t.x + c * r, t.y + y * r, o, 0, Math.PI * 2),
        a.stroke();
    else {
      let k = t.x + c * (r + 2 + l),
        M = t.y + y * (r + 2 + l),
        P = o * 1.2 * (0.55 + 0.45 * f);
      l > 6 &&
        ((a.lineWidth = 2),
        a.setLineDash([3, 3]),
        a.beginPath(),
        a.moveTo(t.x + c * 8, t.y + y * 8),
        a.lineTo(k - c * P, M - y * P),
        a.stroke(),
        a.setLineDash([]),
        (a.lineWidth = 1)),
        a.beginPath(),
        a.arc(k, M, P, 0, Math.PI * 2),
        a.fill(),
        a.beginPath(),
        a.arc(k, M, o * 1.2, 0, Math.PI * 2),
        a.stroke();
    }
    a.restore();
  }
  function dt2(a, e, t) {
    if (e.state === "warn") {
      let l = e.t / SITRUS.warn,
        f = 10 + (1 - l) * 16;
      (a.globalAlpha = 0.5 + 0.4 * Math.abs(Math.sin(t * 0.3))),
        (a.strokeStyle = "#ffd25e"),
        (a.lineWidth = 1.5),
        a.setLineDash([3, 3]),
        (a.lineDashOffset = t * 0.6),
        a.beginPath(),
        a.ellipse(e.x, e.y, f, f * 0.45, 0, 0, Math.PI * 2),
        a.stroke(),
        a.setLineDash([]),
        (a.globalAlpha = 0.35 * l),
        (a.fillStyle = "rgba(8,10,14,1)"),
        a.beginPath(),
        a.ellipse(e.x, e.y, 3 + l * 3, (3 + l * 3) * 0.4, 0, 0, Math.PI * 2),
        a.fill(),
        (a.globalAlpha = 1);
      return;
    }
    if (SITRUS.life - e.t < 120 && t % 8 < 4) return;
    let s = Math.round(Math.sin(t * 0.12) * 1.5),
      i = Math.round(e.x),
      r = Math.round(e.y) - 9 + s;
    (a.globalAlpha = 0.3 + 0.15 * Math.sin(t * 0.2)),
      (a.strokeStyle = "#ffd25e"),
      (a.lineWidth = 1),
      a.beginPath(),
      a.ellipse(e.x, e.y, 13, 5.5, 0, 0, Math.PI * 2),
      a.stroke(),
      (a.globalAlpha = 1),
      (a.fillStyle = L.shadow),
      a.beginPath(),
      a.ellipse(e.x, e.y + 1, 5, 2, 0, 0, Math.PI * 2),
      a.fill();
    let o = [
      "....gg....",
      "...ggg....",
      "..kkkgkk..",
      ".kywwyyyk.",
      "kyywyyyyok",
      "kyyyyyyyok",
      "kyyyyyyook",
      ".kyyyyook.",
      "..kooook..",
      "...kkkk...",
    ];
    o.forEach((l, f) => {
      for (let u = 0; u < l.length; u++) {
        let h = {
          g: "#4f9a3c",
          k: "#5a3a12",
          y: "#f7d24a",
          o: "#d39a2c",
          w: "#fff6c8",
        }[l[u]];
        h && ((a.fillStyle = h), a.fillRect(i - 5 + u, r - 6 + f, 1, 1));
      }
    });
  }
  // Drawn scale for a body: its Pokémon's true size relative to Charizard.
  function Bz(a) {
    return a.kind === "dummy" ? 0.93 : (a.kit?.size ?? 1);
  }
  function Ht(a) {
    return a.mon.anims[a.animName] ?? a.mon.anims.Idle ?? a.mon.anims.Walk;
  }
  function zt(a, e, t) {
    if (a.animFrame >= 0) return Math.min(a.animFrame, e.frames - 1);
    if (a.kind === "player") {
      let s = a;
      if (a.animFrame === -2) {
        let i = s.kit.basic()[s.combo];
        return gt(e, s.t, i.startup, i.active, i.recovery);
      }
      if (a.animFrame === -3)
        return Math.min(
          e.frames - 1,
          Math.floor((s.t / s.kit.dodge.ticks) * e.frames),
        );
      if (a.animFrame === -4)
        return gt(e, s.t, s.state === "seed" ? 8 : 6, 2, 10);
      if (a.animFrame === -5)
        return Math.min(e.frames - 1, Math.floor((s.t / 10) * e.frames));
      if (a.animFrame === -6) {
        let i = s.kit.smash;
        return gt(e, s.t, 2, i.active, i.recovery);
      }
    }
    return a.kind === "dummy" && a.state === "charge"
      ? Math.min(e.frames - 1, Math.floor((a.t / 24) * e.frames))
      : Be(e, t.tick, 1);
  }
  function fa(a, e, t, s, i = !1) {
    (Bt && Bt.kind === e.arena) || ((Bt = Va(e.arena)), (Bt.kind = e.arena)),
      a.setTransform(1, 0, 0, 1, 0, 0),
      (a.imageSmoothingEnabled = !1),
      (a.fillStyle = "#2a2f37"),
      a.fillRect(0, 0, Y * Ye, _ * Ye);
    let r = t.view;
    if (
      (a.setTransform(
        r.z * Ye,
        0,
        0,
        r.z * Ye,
        Math.round(r.ox * Ye),
        Math.round(r.oy * Ye),
      ),
      a.drawImage(Bt, 0, 0),
      i)
    )
      return;
    let o = (h, c) => h + (c - h) * s,
      l = e.player;
    for (let h of e.grass) {
      let c = Math.min(1, (h.max - h.life) / 20),
        y = Math.min(1, h.life / 40);
      (a.globalAlpha = 0.55 * y),
        (a.fillStyle = "#3f8a35"),
        a.beginPath(),
        a.ellipse(h.x, h.y, h.r * c, h.r * 0.5 * c, 0, 0, Math.PI * 2),
        a.fill(),
        (a.globalAlpha = y),
        (a.fillStyle = "#7fd35d");
      let b = rt(h.id);
      for (let p = 0; p < 14; p++) {
        let k = b() * 6.283,
          M = Math.sqrt(b()) * h.r * 0.9 * c,
          P = Math.round(h.x + Math.cos(k) * M),
          C = Math.round(h.y + Math.sin(k) * M * 0.5),
          x = Math.sin(e.tick * 0.1 + p) > 0.3 ? 1 : 0;
        a.fillRect(P, C - 2, 1, 2), a.fillRect(P + 1 + x, C - 3, 1, 1);
      }
      a.globalAlpha = 1;
    }
    for (let h of e.puddles) {
      let c = Math.min(1, (h.max - h.life) / 8),
        y = Math.min(1, h.life / 60);
      (a.globalAlpha = 0.6 * y),
        (a.fillStyle = "#3f7fb5"),
        a.beginPath(),
        a.ellipse(h.x, h.y, h.r * c, h.r * 0.5 * c, 0, 0, Math.PI * 2),
        a.fill(),
        (a.globalAlpha = 0.7 * y),
        (a.fillStyle = "#8fd0f5");
      let b = Math.sin(e.tick * 0.08 + h.id) * 2;
      a.fillRect(
        Math.round(h.x - h.r * 0.4 + b),
        Math.round(h.y - h.r * 0.15),
        Math.round(h.r * 0.5),
        1,
      ),
        a.fillRect(
          Math.round(h.x + h.r * 0.1 - b),
          Math.round(h.y + h.r * 0.12),
          Math.round(h.r * 0.3),
          1,
        ),
        (a.globalAlpha = 1);
    }
    for (let h of e.mines) {
      let c = h.age > 10,
        y = c && (e.tick + h.id * 7) % 40 < 6;
      (a.fillStyle = L.shadow),
        a.beginPath(),
        a.ellipse(h.x, h.y + 1, 4, 1.6, 0, 0, Math.PI * 2),
        a.fill(),
        (a.fillStyle = "#7a5a2c"),
        a.fillRect(h.x - 2, h.y - 3, 4, 4),
        (a.fillStyle = "#c9a25a"),
        a.fillRect(h.x - 1, h.y - 3, 2, 1),
        (a.fillStyle = y ? "#d6ff8a" : "#6cc04a"),
        a.fillRect(h.x - 1, h.y - 5, 2, 2),
        c &&
          ((a.globalAlpha = 0.25),
          (a.strokeStyle = L.leaf),
          a.beginPath(),
          a.ellipse(h.x, h.y, 8, 3.5, 0, 0, Math.PI * 2),
          a.stroke(),
          (a.globalAlpha = 1));
    }
    for (let h of e.rocks) rockGround(a, h, e.tick);
    e.item && dt2(a, e.item, e.tick);
    for (let h of e.players) dzone(a, e, h);
    for (let h of e.dummies) {
      if (h.state !== "charge") continue;
      let c = h.t >= 15,
        y = Math.cos(h.aim),
        b = Math.sin(h.aim);
      a.save(),
        (a.globalAlpha = c ? 0.85 : 0.25 + 0.4 * (h.t / 15)),
        (a.strokeStyle = c ? L.cool : "#9fe6f2"),
        (a.lineWidth = c ? 2 : 1),
        a.setLineDash([4, 3]),
        (a.lineDashOffset = -e.tick * 0.8),
        a.beginPath(),
        a.moveTo(h.x + y * 12, h.y + b * 12),
        a.lineTo(h.x + y * 260, h.y + b * 260),
        a.stroke(),
        a.restore();
    }
    for (let h of e.dreepy) {
      let c = o(h.px, h.x),
        y = o(h.py, h.y);
      (a.fillStyle = L.shadow),
        a.beginPath(),
        a.ellipse(Math.round(c), Math.round(y), 4, 1.6, 0, 0, Math.PI * 2),
        a.fill();
    }
    for (let h of e.players)
      if (h.state === "pfStrike" && h.t < 8) {
        let c = 30 - h.t * 2.6;
        (a.strokeStyle = "#a184f5"),
          (a.lineWidth = 2),
          (a.globalAlpha = 0.85),
          a.beginPath(),
          a.ellipse(h.x, h.y, c, c * 0.45, 0, 0, Math.PI * 2),
          a.stroke(),
          (a.fillStyle = "rgba(161,132,245,0.18)"),
          a.beginPath(),
          a.ellipse(h.x, h.y, 26, 11, 0, 0, Math.PI * 2),
          a.fill(),
          (a.globalAlpha = 1);
      }
    for (let h of e.players) {
      if (h.state === "faint" || (h.vanished && h.isCpu)) continue;
      let c = h.isCpu ? "#ef5a4f" : "#6fd3e8";
      if (e.match.mode === "vs") {
        let y = o(h.px, h.x),
          b = o(h.py, h.y);
        (a.globalAlpha = 0.55),
          (a.strokeStyle = c),
          (a.lineWidth = 1),
          a.beginPath(),
          a.ellipse(Math.round(y), Math.round(b), 12, 5, 0, 0, Math.PI * 2),
          a.stroke(),
          (a.globalAlpha = 1);
      }
      if (h.state === "flyUp" || (h.state === "flySlam" && h.t < 6)) {
        let y = 10 + Math.sin(e.tick * 0.5) * 2,
          b = h.isCpu ? "#ef5a4f" : L.flame;
        (a.strokeStyle = b),
          (a.lineWidth = 1),
          (a.globalAlpha = 0.9),
          a.beginPath(),
          a.ellipse(h.markX, h.markY, y + 6, (y + 6) * 0.45, 0, 0, Math.PI * 2),
          a.stroke(),
          (a.fillStyle = h.isCpu
            ? "rgba(239,90,79,0.25)"
            : "rgba(255,138,61,0.22)"),
          a.beginPath(),
          a.ellipse(h.markX, h.markY, 32, 14, 0, 0, Math.PI * 2),
          a.fill(),
          (a.fillStyle = b);
        for (let [p, k] of [
          [-1, 0],
          [1, 0],
          [0, -1],
          [0, 1],
        ])
          a.fillRect(
            Math.round(h.markX + p * (y + 2)) - 1,
            Math.round(h.markY + k * (y + 2) * 0.45) - 1,
            2,
            2,
          );
        a.globalAlpha = 1;
      }
      if (h.rooted) {
        (a.strokeStyle = "#4f9a3c"), (a.globalAlpha = 0.8), (a.lineWidth = 1);
        for (let y = 0; y < 6; y++) {
          let b = (y / 6) * Math.PI * 2 + 0.3;
          a.beginPath(),
            a.moveTo(h.x + Math.cos(b) * 8, h.y + Math.sin(b) * 3.5),
            a.lineTo(h.x + Math.cos(b) * 14, h.y + Math.sin(b) * 6),
            a.stroke();
        }
        a.globalAlpha = 1;
      }
    }
    if (
      l.lock &&
      !l.lock.hidden &&
      !(l.lock.kind === "player" && l.lock.vanished)
    ) {
      let h = l.lock,
        c = o(h.px, h.x),
        y = o(h.py, h.y),
        b = 14 + Math.sin(e.tick * 0.3) * 1.5,
        p = e.tick * 0.05;
      (a.strokeStyle = l.kit.color), (a.lineWidth = 2);
      for (let k = 0; k < 4; k++) {
        let M = p + (k * Math.PI) / 2;
        a.beginPath(), a.ellipse(c, y, b, b * 0.45, 0, M, M + 0.8), a.stroke();
      }
    }
    for (let h of e.bodies()) {
      if (h.hidden || (h.kind === "player" && h.vanished && h.isCpu)) continue;
      let c = o(h.px, h.x),
        y = o(h.py, h.y),
        b = o(h.pz, h.z),
        p =
          (h.kind === "dummy" ? 7 : 9) *
          (h.scale ?? 1) *
          Bz(h) *
          Math.max(0.45, 1 - b / 70);
      (a.fillStyle = L.shadow),
        (a.globalAlpha = (h.alpha ?? 1) * Math.max(0.5, 1 - b / 80)),
        a.beginPath(),
        a.ellipse(Math.round(c), Math.round(y), p, p * 0.38, 0, 0, Math.PI * 2),
        a.fill();
    }
    a.globalAlpha = 1;
    for (let h of e.projectiles)
      (a.fillStyle = L.shadow),
        a.beginPath(),
        a.ellipse(
          Math.round(o(h.px, h.x)),
          Math.round(o(h.py, h.y)),
          Math.max(2, h.r * 0.8),
          Math.max(1, h.r * 0.35),
          0,
          0,
          Math.PI * 2,
        ),
        a.fill();
    ua(a, t, !0);
    for (let h of t.ghosts) {
      let c = h.anim.tints.get(h.color) ?? h.anim.white;
      (a.globalAlpha = (h.life / h.max) * 0.55),
        a.drawImage(
          c,
          h.frame * h.anim.fw,
          h.row * h.anim.fh,
          h.anim.fw,
          h.anim.fh,
          Math.round(h.x - (h.anim.fw * h.k) / 2),
          Math.round(h.y - (h.anim.fh * h.k) / 2),
          h.anim.fw * h.k,
          h.anim.fh * h.k,
        );
    }
    a.globalAlpha = 1;
    for (let h of e.vines)
      h.y2 < h.y1 && ca(a, h.x1, h.y1, h.x2, h.y2, h.ext, e.tick);
    let f = [
      ...e.bodies().filter((h) => !h.hidden),
      ...e.rocks.filter((h) => h.state === "solid"),
    ].sort((h, c) => h.y - c.y);
    for (let h of f)
      h.max !== void 0 && h.kind === void 0
        ? ht2(a, h, e.tick)
        : da(a, h, e, o(h.px, h.x), o(h.py, h.y), o(h.pz, h.z));
    for (let h of e.vines)
      h.y2 >= h.y1 && ca(a, h.x1, h.y1, h.x2, h.y2, h.ext, e.tick);
    for (let h of e.players) {
      if (h.state === "faint" || h.vanished) continue;
      let c = o(h.px, h.x),
        y = o(h.py, h.y) - o(h.pz, h.z),
        b = h.isCpu ? "#ef5a4f" : "#6fd3e8";
      if (h.state === "guard") {
        let p = Math.max(0, h.slot.guard) / 100,
          k = 9 + 11 * p,
          M = h.t <= 6,
          P = p < 0.3 ? "#ef5a4f" : M ? "#ffffff" : b;
        // The shield only wraps the front; the open back shows where a flank gets through.
        let C = Math.acos(FLANK_COS),
          x = h.facing - C,
          v = h.facing + C;
        (a.globalAlpha = 0.22),
          (a.fillStyle = P),
          a.beginPath(),
          a.moveTo(c, y - 12),
          a.arc(c, y - 12, k, x, v),
          a.closePath(),
          a.fill(),
          (a.globalAlpha = 0.85),
          (a.strokeStyle = P),
          (a.lineWidth = M ? 2 : 1.5),
          a.beginPath(),
          a.arc(c, y - 12, k, x, v),
          a.stroke(),
          (a.globalAlpha = 0.3),
          (a.lineWidth = 1),
          a.setLineDash([2, 3]),
          a.beginPath(),
          a.arc(c, y - 12, k, v, x + Math.PI * 2),
          a.stroke(),
          a.setLineDash([]),
          (a.globalAlpha = 0.6),
          (a.fillStyle = "#ffffff"),
          a.fillRect(
            Math.round(c - k * 0.45),
            Math.round(y - 12 - k * 0.6),
            3,
            1,
          ),
          (a.globalAlpha = 1);
      }
      if (h.state === "smashCharge") {
        let p = h.smashCharge,
          k = p >= 1,
          M = k && e.tick % 6 < 3;
        (a.globalAlpha = 0.5 + 0.4 * p),
          (a.strokeStyle = k ? (M ? "#ffffff" : L.gold) : h.kit.color),
          (a.lineWidth = 1 + (k ? 1 : 0));
        let P = 26 - p * 12;
        a.beginPath(),
          a.ellipse(c, o(h.py, h.y), P, P * 0.45, 0, 0, Math.PI * 2),
          a.stroke(),
          (a.globalAlpha = 1);
      }
      if (h.dazeT > 0)
        for (let p = 0; p < 3; p++) {
          let k = e.tick * 0.2 + (p * Math.PI * 2) / 3;
          (a.fillStyle = p % 2 ? "#8fd0f5" : "#ffffff"),
            a.fillRect(
              Math.round(c + Math.cos(k) * 9) - 1,
              Math.round(y - h.kit.tall * Bz(h) + 2 + Math.sin(k) * 2.5),
              2,
              3,
            );
        }
      if (h.state === "stunned")
        for (let p = 0; p < 3; p++) {
          let k = e.tick * 0.14 + (p * Math.PI * 2) / 3;
          (a.fillStyle = p % 2 ? "#ffd25e" : "#ffffff"),
            a.fillRect(
              Math.round(c + Math.cos(k) * 10) - 1,
              Math.round(y - 30 + Math.sin(k) * 3) - 1,
              3,
              3,
            );
        }
    }
    // Smash-style player tags: a coloured "P1" / "CPU" flag with a pointer over each fighter.
    for (let h of e.players) {
      if (h.state === "faint" || (h.vanished && h.isCpu)) continue;
      let c = Math.round(o(h.px, h.x)),
        y = Math.round(
          o(h.py, h.y) -
            o(h.pz, h.z) -
            h.kit.tall * Bz(h) -
            17 +
            Math.sin(e.tick * 0.08) * 1.2,
        ),
        b = h.isCpu ? "CPU" : "P1",
        p = h.isCpu ? "#ef5a4f" : "#33d6ff";
      (a.font = '900 8px "Big Shoulders Display", sans-serif'),
        (a.textAlign = "center"),
        (a.textBaseline = "alphabetic");
      let k = Math.ceil(a.measureText(b).width) + 6;
      (a.globalAlpha = h.vanished ? 0.5 : 1),
        (a.fillStyle = "rgba(8,10,14,0.55)"),
        a.fillRect(c - k / 2 + 1, y - 8, k, 9),
        (a.fillStyle = p),
        a.fillRect(c - k / 2, y - 9, k, 9),
        a.beginPath(),
        a.moveTo(c - 3, y),
        a.lineTo(c + 3, y),
        a.lineTo(c, y + 3),
        a.closePath(),
        a.fill(),
        (a.fillStyle = h.isCpu ? "#2e0507" : "#031730"),
        a.fillText(b, c, y - 1.5),
        (a.globalAlpha = 1),
        (a.textAlign = "start");
    }
    for (let h of e.beams) {
      if (h.solar !== void 0) {
        let C = Math.max(0, 1 - h.age / 14),
          x = (6 + 10 * h.solar) * (0.4 + 0.6 * C) + (e.tick % 2);
        a.lineCap = "round";
        for (let [v, E, Q] of [
          ["rgba(255,226,122,0.35)", 2.2, 0.9],
          ["#ffd25e", 1.2, 1],
          ["#fff6c8", 0.6, 1],
          ["#ffffff", 0.22, 1],
        ])
          (a.globalAlpha = Q * (0.3 + 0.7 * C)),
            (a.strokeStyle = v),
            (a.lineWidth = Math.max(1, x * E)),
            a.beginPath(),
            a.moveTo(h.x1, h.y1 - 9),
            a.lineTo(h.x2, h.y2 - 9),
            a.stroke();
        (a.globalAlpha = 1), (a.lineCap = "butt");
        continue;
      }
      let y = e.tick % 2,
        b = h.x1,
        p = h.y1 - 9,
        k = h.x2,
        M = h.y2 - 9;
      (a.lineCap = "round"),
        (a.strokeStyle = "rgba(63,127,181,0.55)"),
        (a.lineWidth = 11 + y),
        a.beginPath(),
        a.moveTo(b, p),
        a.lineTo(k, M),
        a.stroke(),
        (a.strokeStyle = "#5aa9e6"),
        (a.lineWidth = 7),
        a.beginPath(),
        a.moveTo(b, p),
        a.lineTo(k, M),
        a.stroke(),
        (a.strokeStyle = "#bfe6ff"),
        (a.lineWidth = 3),
        a.beginPath(),
        a.moveTo(b, p),
        a.lineTo(k, M),
        a.stroke(),
        (a.strokeStyle = "#ffffff"),
        (a.lineWidth = 1),
        a.beginPath(),
        a.moveTo(b, p - 1),
        a.lineTo(k, M - 1),
        a.stroke(),
        (a.fillStyle = "#e6f6ff"),
        a.beginPath(),
        a.arc(k, M, 6 + y * 2, 0, Math.PI * 2),
        a.fill(),
        (a.lineCap = "butt");
    }
    for (let h of e.projectiles) {
      let c = Math.round(o(h.px, h.x)),
        y = Math.round(o(h.py, h.y) - o(h.pz, h.z));
      if (h.kind === "leaf") {
        let b = Math.atan2(h.vy, h.vx) + Math.sin(h.age * 0.6) * 0.4;
        a.save(),
          a.translate(c, y),
          a.rotate(b),
          (a.fillStyle = "#3f8a35"),
          a.beginPath(),
          a.ellipse(0, 0, 5, 2.4, 0, 0, Math.PI * 2),
          a.fill(),
          (a.fillStyle = "#9be36b"),
          a.beginPath(),
          a.ellipse(0, -0.5, 4, 1.4, 0, 0, Math.PI * 2),
          a.fill(),
          (a.fillStyle = "#e8ffd0"),
          a.fillRect(-3, 0, 6, 1),
          a.restore();
      } else if (h.kind === "pulse") {
        let b = Math.atan2(h.vy, h.vx),
          p = 1 + Math.sin(h.age * 0.7) * 0.18;
        a.save(), a.translate(c, y), a.rotate(b);
        for (let k = 2; k >= 0; k--)
          (a.globalAlpha = k ? 0.22 / k : 1),
            (a.strokeStyle = k ? L.water : "#bfe6ff"),
            (a.lineWidth = k ? 1.5 : 2.2),
            a.beginPath(),
            a.ellipse(-k * 5, 0, 3.2 * p, 6.5 * p, 0, 0, Math.PI * 2),
            a.stroke();
        (a.globalAlpha = 1),
          (a.fillStyle = "#ffffff"),
          a.fillRect(1, -3, 1, 2),
          a.restore();
      } else {
        if (h.kind === "wisp") continue;
        if (h.kind === "seed")
          (a.fillStyle = "#7a5a2c"),
            a.fillRect(c - 2, y - 2, 4, 4),
            (a.fillStyle = "#c9a25a"),
            a.fillRect(c - 1, y - 2, 2, 1),
            (a.fillStyle = "#6cc04a"),
            a.fillRect(c - 1, y - 4, 2, 2);
        else {
          let b = 1 + Math.sin(e.tick * 0.5) * 0.15,
            p = h.reflected ? h.color : L.cool;
          (a.globalAlpha = 0.25),
            (a.fillStyle = p),
            a.beginPath(),
            a.arc(c, y, 10 * b, 0, Math.PI * 2),
            a.fill(),
            (a.globalAlpha = 1),
            (a.strokeStyle = p),
            (a.lineWidth = 2),
            a.beginPath(),
            a.arc(c, y, 6 * b, 0, Math.PI * 2),
            a.stroke(),
            (a.fillStyle = "#ffffff"),
            a.beginPath(),
            a.arc(c, y, 2.5, 0, Math.PI * 2),
            a.fill();
        }
      }
    }
    let u = e.mons.dreepy;
    if (u)
      for (let h of e.dreepy) {
        let c = o(h.px, h.x),
          y = o(h.py, h.y) - o(h.pz, h.z),
          b =
            h.state === "dazed"
              ? (u.anims.Sleep ?? u.anims.Hurt)
              : u.anims.Walk,
          p = h.state === "dazed" ? 0 : Math.min(nt(h.facing), b.rows - 1),
          k = h.state === "dazed" ? Be(b, e.tick, 1) : Be(b, e.tick * 3, 1);
        h.state !== "dazed" &&
          h.speed > 4 &&
          ((a.globalAlpha = 0.3),
          (a.fillStyle = "#a184f5"),
          a.beginPath(),
          a.ellipse(
            c - h.vx * 1.5,
            y - h.vy * 1.5,
            7,
            4,
            h.facing,
            0,
            Math.PI * 2,
          ),
          a.fill(),
          (a.globalAlpha = 1)),
          a.save(),
          a.translate(Math.round(c), Math.round(y));
        let P = 0.8;
        if (
          (a.scale(P, P),
          (a.globalAlpha = h.hits === 99 ? 0.6 : 1),
          a.drawImage(
            b.img,
            k * b.fw,
            p * b.fh,
            b.fw,
            b.fh,
            -b.fw / 2,
            -b.fh / 2 - u.ground * 0.5,
            b.fw,
            b.fh,
          ),
          h.team !== l.team &&
            e.match.mode === "vs" &&
            ((a.globalAlpha = 0.25),
            a.drawImage(
              b.tints.get("#ef5a4f") ?? b.white,
              k * b.fw,
              p * b.fh,
              b.fw,
              b.fh,
              -b.fw / 2,
              -b.fh / 2 - u.ground * 0.5,
              b.fw,
              b.fh,
            )),
          a.restore(),
          (a.globalAlpha = 1),
          h.state === "dazed")
        )
          for (let C = 0; C < 3; C++) {
            let x = e.tick * 0.12 + (C * Math.PI * 2) / 3;
            (a.fillStyle = "#ffd25e"),
              a.fillRect(
                Math.round(c + Math.cos(x) * 7),
                Math.round(y - 12 + Math.sin(x) * 2.5),
                2,
                2,
              );
          }
      }
    for (let h of e.projectiles) {
      if (h.kind !== "wisp") continue;
      let c = Math.round(o(h.px, h.x)),
        y = Math.round(o(h.py, h.y) - o(h.pz, h.z)),
        b = Math.sin(e.tick * 0.7 + h.id) * 1.2;
      (a.globalAlpha = 0.3),
        (a.fillStyle = "#7f6bff"),
        a.beginPath(),
        a.arc(c, y, 10 + b, 0, Math.PI * 2),
        a.fill(),
        (a.globalAlpha = 1),
        (a.fillStyle = "#5a46d6"),
        a.beginPath(),
        a.moveTo(c, y - 9 - b),
        a.quadraticCurveTo(c + 6, y - 1, c, y + 5),
        a.quadraticCurveTo(c - 6, y - 1, c, y - 9 - b),
        a.fill(),
        (a.fillStyle = "#b8a8ff"),
        a.beginPath(),
        a.moveTo(c, y - 5 - b),
        a.quadraticCurveTo(c + 3, y, c, y + 3),
        a.quadraticCurveTo(c - 3, y, c, y - 5 - b),
        a.fill(),
        (a.fillStyle = "#ffffff"),
        a.fillRect(c - 1, y - 1, 2, 2);
    }
    ua(a, t, !1);
    for (let h of t.ambient)
      (a.globalAlpha = 0.18 + 0.14 * Math.sin(h.ph * 2)),
        (a.fillStyle = "#f4ead0"),
        a.fillRect(Math.round(h.x), Math.round(h.y), 1, 1);
    if (((a.globalAlpha = 1), t.impact > 0)) {
      (a.fillStyle = "rgba(8,10,14,0.86)"),
        a.fillRect(-20, -20, Y + 40, _ + 40);
      for (let h of f)
        h.kind !== void 0 &&
          da(a, h, e, o(h.px, h.x), o(h.py, h.y), o(h.pz, h.z), !0);
    }
    if (
      (A.showHitboxes && ja(a, e),
      a.setTransform(Ye, 0, 0, Ye, 0, 0),
      t.vignette > 0.02)
    ) {
      let h = a.createRadialGradient(
        Y / 2,
        _ / 2,
        _ * 0.35,
        Y / 2,
        _ / 2,
        Y * 0.62,
      );
      h.addColorStop(0, `rgba(${t.vignetteColor},0)`),
        h.addColorStop(1, `rgba(${t.vignetteColor},${0.45 * t.vignette})`),
        (a.fillStyle = h),
        a.fillRect(0, 0, Y, _);
    }
    if (t.speed > 0) {
      let h = rt(e.tick >> 1);
      (a.strokeStyle = t.speedColor), (a.lineWidth = 1);
      for (let c = 0; c < 28; c++) {
        let y = h() * Math.PI * 2,
          b = 70 + h() * 60,
          p = 330;
        (a.globalAlpha = Math.min(0.55, t.speed / 20) * (0.4 + h() * 0.6)),
          a.beginPath(),
          a.moveTo(t.speedX + Math.cos(y) * b, t.speedY + Math.sin(y) * b),
          a.lineTo(t.speedX + Math.cos(y) * p, t.speedY + Math.sin(y) * p),
          a.stroke();
      }
      a.globalAlpha = 1;
    }
    if (t.danger > 0.02) {
      let h = 0.5 + 0.5 * Math.sin(e.tick * 0.12),
        c = a.createRadialGradient(
          Y / 2,
          _ / 2,
          _ * 0.4,
          Y / 2,
          _ / 2,
          Y * 0.6,
        );
      c.addColorStop(0, "rgba(214,40,40,0)"),
        c.addColorStop(1, `rgba(214,40,40,${0.32 * t.danger * h})`),
        (a.fillStyle = c),
        a.fillRect(0, 0, Y, _);
    }
    t.screenFlash > 0 &&
      ((a.globalAlpha = 0.22 * t.screenFlash),
      (a.fillStyle = t.screenFlashColor),
      a.fillRect(0, 0, Y, _),
      (a.globalAlpha = 1));
  }
  function ca(a, e, t, s, i, r, o) {
    let l = s - e,
      f = i - t,
      u = Math.hypot(l, f);
    if (u < 2) return;
    let h = -f / u,
      c = l / u,
      y = Math.max(3, Math.round(u / 4)),
      b = (p) => {
        let k = p / y,
          M = Math.sin(k * Math.PI * 2 + o * 0.6) * 1.6 * Math.sin(k * Math.PI);
        return [e + l * k + h * M, t + f * k + c * M];
      };
    a.lineCap = "round";
    for (let [p, k] of [
      [4, "#24501d"],
      [2, "#5fae44"],
    ]) {
      (a.strokeStyle = k), (a.lineWidth = p), a.beginPath();
      for (let M = 0; M <= y; M++) {
        let [P, C] = b(M);
        M ? a.lineTo(P, C) : a.moveTo(P, C);
      }
      a.stroke();
    }
    for (let p = 2; p < y; p += 3) {
      let [k, M] = b(p);
      (a.fillStyle = "#9be36b"),
        a.fillRect(Math.round(k + h * 2), Math.round(M + c * 2), 2, 1);
    }
    if (r > 0.8) {
      let [p, k] = b(y);
      (a.fillStyle = "#b7f27d"),
        a.beginPath(),
        a.arc(p, k, 2.5, 0, Math.PI * 2),
        a.fill();
    }
    a.lineCap = "butt";
  }
  function da(a, e, t, s, i, r, o = !1) {
    let l = Ht(e),
      f = zt(e, l, t),
      u =
        e.spinRow !== void 0 && e.spinRow >= 0
          ? e.spinRow
          : Math.min(nt(e.facing), l.rows - 1),
      h = 0;
    e.hitstop > 0 &&
      e.flash > 0 &&
      (h = (t.tick % 2 ? 1 : -1) * (e.hitstop > 6 ? 2 : 1));
    let c = e.kind === "player" ? e : null;
    c &&
      c.state === "smashCharge" &&
      (h = (t.tick % 2 ? 1 : -1) * (c.smashCharge > 0.5 ? 1 : 0));
    let y = 1;
    c && c.state === "down" && (y = 0.72);
    let b = (e.scale ?? 1) * Bz(e);
    a.save(),
      a.translate(Math.round(s) + h, Math.round(i - r)),
      a.scale(e.sqx * b * (2 - y), e.sqy * b * y);
    let p = f * l.fw,
      k = Math.min(u, l.rows - 1) * l.fh,
      M = -l.fw / 2,
      P = -l.fh / 2 - e.mon.ground,
      C = e.kind === "player" ? e : null,
      x =
        !!C &&
        C.state === "dodge" &&
        C.invincible &&
        C.kit.dodge.kind !== "phantom",
      v = 1;
    if (
      (C &&
        C.vanished &&
        (v = C.isCpu ? (t.tick % 23 < 2 ? 0.12 : 0.03) : 0.28),
      C && C.state === "pfStrike" && (v = Math.min(1, 0.25 + C.t / 7)),
      o && v < 0.5)
    ) {
      a.restore();
      return;
    }
    if (o) {
      (a.globalAlpha = 1),
        a.drawImage(l.white, p, k, l.fw, l.fh, M, P, l.fw, l.fh),
        a.restore();
      return;
    }
    if (
      ((a.globalAlpha = (e.alpha ?? 1) * (x ? 0.6 : 1) * v),
      a.drawImage(
        e.flash > 0 ? l.white : l.img,
        p,
        k,
        l.fw,
        l.fh,
        M,
        P,
        l.fw,
        l.fh,
      ),
      v < 1 &&
        ((a.globalAlpha = 0.5 * v),
        a.drawImage(
          l.tints.get("#a184f5") ?? l.white,
          p,
          k,
          l.fw,
          l.fh,
          M,
          P,
          l.fw,
          l.fh,
        )),
      x
        ? ((a.globalAlpha = 0.35),
          a.drawImage(l.tints.get(L.cool), p, k, l.fw, l.fh, M, P, l.fw, l.fh))
        : C &&
          C.armored &&
          t.tick % 6 < 3 &&
          ((a.globalAlpha = 0.28),
          a.drawImage(l.white, p, k, l.fw, l.fh, M, P, l.fw, l.fh)),
      C &&
        C.state === "smashCharge" &&
        (C.smashCharge >= 1 ? t.tick % 6 < 3 : t.tick % 4 < 2) &&
        ((a.globalAlpha = 0.25 + 0.35 * C.smashCharge),
        a.drawImage(
          C.smashCharge >= 1 ? l.white : (l.tints.get(C.kit.color) ?? l.white),
          p,
          k,
          l.fw,
          l.fh,
          M,
          P,
          l.fw,
          l.fh,
        )),
      C &&
        C.state === "getup" &&
        C.t < 10 &&
        t.tick % 4 < 2 &&
        ((a.globalAlpha = 0.35),
        a.drawImage(
          l.tints.get(L.cool) ?? l.white,
          p,
          k,
          l.fw,
          l.fh,
          M,
          P,
          l.fw,
          l.fh,
        )),
      e.tint > 0 &&
        e.flash === 0 &&
        ((a.globalAlpha = 0.55),
        a.drawImage(
          l.tints.get(e.tintColor) ?? l.white,
          p,
          k,
          l.fw,
          l.fh,
          M,
          P,
          l.fw,
          l.fh,
        )),
      e.kind === "assist" &&
        ((a.globalAlpha = 0.25 * (e.alpha ?? 1)),
        a.drawImage(
          l.tints.get(e.tintColor) ?? l.white,
          p,
          k,
          l.fw,
          l.fh,
          M,
          P,
          l.fw,
          l.fh,
        )),
      (e.seededT ?? 0) > 0 &&
        ((a.globalAlpha = 0.35),
        a.drawImage(
          l.tints.get(L.leaf) ?? l.white,
          p,
          k,
          l.fw,
          l.fh,
          M,
          P,
          l.fw,
          l.fh,
        )),
      a.restore(),
      C && C.kit.id === "dragapult" && v === 1 && C.state !== "faint")
    ) {
      let E = Math.round(i - r - 30);
      C.slot.horns.forEach((Q, ie) => {
        let K = Math.round(s) + (ie === 0 ? -5 : 3);
        (a.fillStyle = "#170c33"),
          a.fillRect(K - 1, E - 1, 4, 4),
          (a.fillStyle =
            Q === "loaded"
              ? t.tick % 40 < 20
                ? "#7fd1a8"
                : "#9fe8c2"
              : "#3a2f55"),
          a.fillRect(K, E, 2, 2);
      });
    }
    if (
      ((e.burnT ?? 0) > 0 &&
        e.kind !== "assist" &&
        t.tick % 10 < 3 &&
        (a.save(),
        a.translate(Math.round(s), Math.round(i - r)),
        a.scale(e.sqx * b, e.sqy * b),
        (a.globalAlpha = 0.35),
        a.drawImage(
          l.tints.get("#ff8a3d") ?? l.white,
          p,
          k,
          l.fw,
          l.fh,
          M,
          P,
          l.fw,
          l.fh,
        ),
        a.restore()),
      (e.seededT ?? 0) > 0)
    ) {
      (a.strokeStyle = "#5fae44"), (a.lineWidth = 1);
      for (let E = 0; E < 5; E++) {
        let Q = t.tick * 0.08 + E * 1.256;
        a.beginPath(),
          a.moveTo(s + Math.cos(Q) * 9, i + Math.sin(Q) * 3),
          a.lineTo(s + Math.cos(Q + 0.5) * 5, i - 8 + Math.sin(Q) * 2),
          a.stroke();
      }
    }
  }
  function ua(a, e, t) {
    for (let s of e.parts) {
      if (!!s.under !== t) continue;
      let i = s.life / s.max,
        r = s.x,
        o = s.y - s.z;
      switch (s.kind) {
        case "dust":
          (a.globalAlpha = i * 0.6),
            (a.fillStyle = s.color),
            a.beginPath(),
            a.arc(Math.round(r), Math.round(o), s.size, 0, Math.PI * 2),
            a.fill();
          break;
        case "smoke":
          (a.globalAlpha = i * 0.45),
            (a.fillStyle = "#4a4a52"),
            a.beginPath(),
            a.arc(Math.round(r), Math.round(o), s.size, 0, Math.PI * 2),
            a.fill();
          break;
        case "spark":
          (a.globalAlpha = Math.min(1, i * 1.5)),
            (a.strokeStyle = s.color),
            (a.lineWidth = 1),
            a.beginPath(),
            a.moveTo(r, o),
            a.lineTo(r - s.vx * 2.2, o - s.vy * 2.2),
            a.stroke();
          break;
        case "ember":
          (a.globalAlpha = Math.min(1, i * 1.4)),
            (a.fillStyle = i > 0.66 ? L.gold : i > 0.33 ? s.color : "#c2402a"),
            a.fillRect(Math.round(r), Math.round(o), s.size, s.size);
          break;
        case "mote":
        case "heal":
          (a.globalAlpha = Math.min(1, i * 1.4)),
            (a.fillStyle = s.color),
            a.fillRect(Math.round(r), Math.round(o), s.size, s.size),
            s.kind === "heal" &&
              (a.fillRect(Math.round(r) - 1, Math.round(o) + 1, 3, 1),
              a.fillRect(Math.round(r), Math.round(o) + 2, 1, 1));
          break;
        case "fire": {
          let l =
            i > 0.8
              ? "#fff4c2"
              : i > 0.6
                ? "#ffd25e"
                : i > 0.35
                  ? "#ff8a3d"
                  : i > 0.18
                    ? "#d9432b"
                    : "#4a3a3a";
          (a.globalAlpha = i > 0.18 ? 0.9 : i * 2.5),
            (a.fillStyle = l),
            a.beginPath(),
            a.arc(Math.round(r), Math.round(o), s.size, 0, Math.PI * 2),
            a.fill();
          break;
        }
        case "drop":
          (a.globalAlpha = Math.min(1, i * 2)),
            (a.fillStyle = s.color),
            a.fillRect(Math.round(r), Math.round(o), s.size, s.size + 1);
          break;
        case "leafbit":
          (a.globalAlpha = Math.min(1, i * 2)),
            (a.fillStyle = s.color),
            a.fillRect(Math.round(r), Math.round(o), 2, 1),
            a.fillRect(
              Math.round(r) + (s.life % 8 < 4 ? 1 : 0),
              Math.round(o) + 1,
              1,
              1,
            );
          break;
        case "ring":
          (a.globalAlpha = i),
            (a.strokeStyle = s.color),
            (a.lineWidth = i > 0.5 ? 2 : 1),
            a.beginPath(),
            a.ellipse(
              r,
              o,
              s.size,
              s.under ? s.size * 0.45 : s.size,
              0,
              0,
              Math.PI * 2,
            ),
            a.stroke();
          break;
        case "flash":
          (a.globalAlpha = 1),
            (a.fillStyle = s.color),
            a.beginPath(),
            a.arc(
              Math.round(r),
              Math.round(o),
              s.size * (0.6 + i * 0.4),
              0,
              Math.PI * 2,
            ),
            a.fill();
          break;
        case "slash": {
          // A filled crescent: the head races ahead in the first frames, the tail
          // chases it, thickest just behind the head with a bright inner edge.
          let l = 1 - i,
            f = Math.min(1, l * 2.6),
            u = Math.max(0, (l - 0.35) / 0.65),
            h = s.ang - s.dir * s.span,
            c = 22,
            y = (k) => {
              let M = [],
                P = [];
              for (let C = 0; C <= c; C++) {
                let x = C / c,
                  v = u + (f - u) * x,
                  E = h + s.dir * 2 * s.span * v,
                  Q =
                    s.w *
                    1.5 *
                    k *
                    Math.pow(x, 0.7) *
                    (x > 0.88 ? 1 - (x - 0.88) * 6 : 1);
                M.push([
                  r + Math.cos(E) * (s.rad + Q / 2),
                  o + Math.sin(E) * (s.rad + Q / 2) * 0.78,
                ]),
                  P.push([
                    r + Math.cos(E) * (s.rad - Q / 2),
                    o + Math.sin(E) * (s.rad - Q / 2) * 0.78,
                  ]);
              }
              a.beginPath(),
                M.forEach(([C, x], v) => (v ? a.lineTo(C, x) : a.moveTo(C, x)));
              for (let C = P.length - 1; C >= 0; C--)
                a.lineTo(P[C][0], P[C][1]);
              a.closePath(), a.fill();
            };
          if (f - u < 0.02) break;
          (o += s.lift),
            (a.globalAlpha = Math.min(1, i * 1.8) * 0.9),
            (a.fillStyle = s.color),
            y(1),
            (a.globalAlpha = Math.min(1, i * 2)),
            (a.fillStyle = "#ffffff"),
            y(0.32);
          break;
        }
        case "claw": {
          let l = s.max - s.life - s.delay;
          if (l < 0) break;
          let f = Math.min(1, l / 3),
            u = Math.cos(s.ang) * s.len * 0.5,
            h = Math.sin(s.ang) * s.len * 0.5;
          (a.globalAlpha = Math.min(1, i * 1.8)),
            (a.lineCap = "round"),
            (a.strokeStyle = s.color),
            (a.lineWidth = 2.4 * i + 0.6),
            a.beginPath(),
            a.moveTo(r - u, o - h),
            a.lineTo(r - u + 2 * u * f, o - h + 2 * h * f),
            a.stroke(),
            (a.strokeStyle = "#ffffff"),
            (a.lineWidth = 0.8),
            a.stroke(),
            (a.lineCap = "butt");
          break;
        }
        case "burst": {
          let l = s.size * (1.1 - i * 0.4);
          (a.globalAlpha = Math.min(1, i * 1.5)),
            (a.fillStyle = s.color),
            a.beginPath();
          for (let f = 0; f < 16; f++) {
            let u = (f / 16) * Math.PI * 2 + 0.2,
              h = f % 2 ? l * 0.38 : l * (f % 4 ? 0.8 : 1);
            a.lineTo(r + Math.cos(u) * h, o + Math.sin(u) * h);
          }
          a.closePath(),
            a.fill(),
            (a.fillStyle = "#ffffff"),
            a.beginPath(),
            a.arc(r, o, l * 0.32, 0, Math.PI * 2),
            a.fill();
          break;
        }
        case "streak":
          (a.globalAlpha = Math.min(1, i * 1.6)),
            (a.strokeStyle = s.color),
            (a.lineWidth = 1.2),
            a.beginPath(),
            a.moveTo(r, o),
            a.lineTo(
              r - Math.cos(s.ang) * s.len * i,
              o - Math.sin(s.ang) * s.len * i,
            ),
            a.stroke();
          break;
        case "glint": {
          let l = Math.sin((1 - i) * Math.PI) * 7,
            f = r + 7,
            u = o - s.z;
          (a.globalAlpha = 1), (a.fillStyle = s.color), a.beginPath();
          for (let h = 0; h < 8; h++) {
            let c = (h / 8) * Math.PI * 2,
              y = h % 2 ? l * 0.22 : l;
            a.lineTo(f + Math.cos(c) * y, u + Math.sin(c) * y);
          }
          a.closePath(),
            a.fill(),
            (a.fillStyle = "#ffffff"),
            a.fillRect(Math.round(f) - 1, Math.round(u) - 1, 2, 2);
          break;
        }
      }
    }
    a.globalAlpha = 1;
  }
  function ja(a, e) {
    a.lineWidth = 1;
    for (let t of e.bodies()) {
      if (t.hidden || t.kind === "assist") continue;
      let s = t.kind === "player" && t.invincible;
      (a.strokeStyle = s ? L.cool : "#7dff8a"),
        a.beginPath(),
        a.arc(t.x, t.y, t.hurtR, 0, Math.PI * 2),
        a.stroke();
    }
    (a.fillStyle = "rgba(255,60,60,0.4)"),
      (a.strokeStyle = "rgba(255,60,60,0.4)");
    for (let t of e.hitboxes) {
      let s = t.shape;
      s.kind === "circle"
        ? (a.beginPath(), a.arc(s.x, s.y, s.r, 0, Math.PI * 2), a.fill())
        : ((a.lineCap = "round"),
          (a.lineWidth = s.r * 2),
          a.beginPath(),
          a.moveTo(s.x1, s.y1),
          a.lineTo(s.x2, s.y2),
          a.stroke(),
          (a.lineCap = "butt"),
          (a.lineWidth = 1));
    }
    for (let t of e.projectiles)
      (a.strokeStyle = "#ff5050"),
        a.beginPath(),
        a.arc(t.x, t.y, t.r, 0, Math.PI * 2),
        a.stroke();
  }
  function et(a, e, t, s, i, r, o, l) {
    (a.imageSmoothingEnabled = !1),
      a.drawImage(
        e.img,
        (t % e.frames) * e.fw,
        Math.min(s, e.rows - 1) * e.fh,
        e.fw,
        e.fh,
        Math.round(i - (e.fw / 2) * o),
        Math.round(r - (e.fh / 2 + l) * o),
        e.fw * o,
        e.fh * o,
      );
  }
  var H = 480,
    oe = 270,
    ma = H / Y,
    He = '"Big Shoulders Display", "Arial Narrow", sans-serif',
    je = '"Barlow Semi Condensed", "Arial Narrow", sans-serif',
    g = {
      night: "#0b0918",
      deep: "#120f24",
      plate: "#191530",
      plate2: "#262043",
      edge: "rgba(255,255,255,0.13)",
      chalk: "#f3f0ff",
      haze: "#9b94bd",
      dim: "#5d5780",
      track: "#0d0a1c",
      track2: "#2a2448",
      p1: "#33d6ff",
      cpu: "#ff4a63",
      gold: "#ffc93c",
      hp: "#4df08a",
      hpHi: "#b9ffd2",
      hpMid: "#ffd23c",
      hpMidHi: "#fff0a8",
      hpLow: "#ff4a63",
      hpLowHi: "#ffb3bd",
    },
    ke = 0.21,
    Ve = [
      { id: "resume", label: "Team" },
      { id: "moves", label: "Moves" },
      { id: "tuning", label: "Options" },
      { id: "controls", label: "Controls" },
      { id: "credits", label: "Credits" },
      { id: "quit", label: "Quit" },
    ],
    VeP = [Ve[0], { id: "swap", label: "Pok\xE9mon" }, ...Ve.slice(1)],
    tabsOf = (a) => (a.match.mode === "practice" ? VeP : Ve),
    At = ["Quit to title", "Change team", "Keep playing"],
    qa = ["Rematch", "Change team", "Quit to title"];
  function va(a) {
    return {
      screen: "title",
      paused: !1,
      tab: 0,
      swapCursor: 0,
      swapPicks: [],
      inContent: !1,
      tuneIndex: 1,
      moveKit: 0,
      quitIndex: 0,
      debug: !1,
      toast: "",
      toastT: 0,
      hintT: 0,
      playTicks: 0,
      frame: 0,
      credits: a,
      comboBump: new Map(),
      lastCombo: new Map(),
      source: "keys",
      trail: {},
      trailWait: {},
      cards: [],
      pauseT: 0,
      flash: 0,
      hudShake: 0,
      portraitFlash: 0,
      chipFlash: {},
      cursor: 0,
      picks: [],
      cpuPicks: [],
      roulette: -1,
      rouletteShow: [],
      selectT: 0,
      pickBump: 0,
      resultIndex: 0,
      resultsT: 0,
    };
  }
  var d,
    Fe = 1,
    m = (a) => a * Fe,
    Ee = (a) => 1 - Math.pow(1 - Math.max(0, Math.min(1, a)), 3);
  function Ma(a, e = je, t = 600, s = !1) {
    d.font = `${s ? "italic " : ""}${t} ${(a * Fe).toFixed(2)}px ${e}`;
  }
  function ye(a, e, t = je, s = 600, i = !1) {
    return Ma(e, t, s, i), d.measureText(a).width / Fe;
  }
  function G(a, e, t, s, i, r = {}) {
    let o = r.face ?? je,
      l = r.weight ?? (o === He ? 900 : 600);
    Ma(s, o, l, !!r.italic),
      (d.textAlign = r.align ?? "left"),
      (d.textBaseline = "alphabetic"),
      d.save(),
      d.translate(m(e), m(t)),
      r.skew && d.transform(1, 0, -ke, 1, 0, 0),
      r.outline &&
        ((d.lineJoin = "round"),
        (d.lineWidth = m(r.outline)),
        (d.strokeStyle = r.outlineColor ?? g.night),
        d.strokeText(a, 0, m(r.outline * 0.35)),
        d.strokeText(a, 0, 0)),
      (d.fillStyle = i),
      d.fillText(a, 0, 0),
      d.restore();
  }
  var V = (a, e, t, s, i, r = {}) => G(a, e, t, s, i, { face: He, ...r });
  function ze(a, e, t, s, i = s * ke) {
    d.beginPath(),
      d.moveTo(m(a + i), m(e)),
      d.lineTo(m(a + t), m(e)),
      d.lineTo(m(a + t - i), m(e + s)),
      d.lineTo(m(a), m(e + s)),
      d.closePath();
  }
  function te(a, e, t, s, i, r = s * ke) {
    ze(a, e, t, s, r), (d.fillStyle = i), d.fill();
  }
  function Ae(a, e, t, s, i, r = {}) {
    let o = r.sk ?? Math.min(s * ke, 12);
    te(a + 1.6, e + 2, t, s, "rgba(0,0,0,0.45)", o);
    let l = d.createLinearGradient(0, m(e), 0, m(e + s));
    l.addColorStop(0, r.bright ? "#332b57" : g.plate2),
      l.addColorStop(1, r.bright ? g.plate2 : g.plate),
      te(a, e, t, s, l, o),
      d.save(),
      ze(a, e, t, s, o),
      d.clip(),
      (d.fillStyle = g.edge),
      d.fillRect(m(a), m(e), m(t), m(0.7)),
      i &&
        ((d.fillStyle = i),
        (r.edge ?? "left") === "left"
          ? (d.beginPath(),
            d.moveTo(m(a + o), m(e)),
            d.lineTo(m(a + o + 3), m(e)),
            d.lineTo(m(a + 3), m(e + s)),
            d.lineTo(m(a), m(e + s)),
            d.closePath(),
            d.fill())
          : r.edge === "right"
            ? (d.beginPath(),
              d.moveTo(m(a + t - 3), m(e)),
              d.lineTo(m(a + t), m(e)),
              d.lineTo(m(a + t - o), m(e + s)),
              d.lineTo(m(a + t - o - 3), m(e + s)),
              d.closePath(),
              d.fill())
            : d.fillRect(m(a), m(e + s - 1.6), m(t), m(1.6))),
      d.restore();
  }
  function Sa(a) {
    return a > 0.5
      ? [g.hp, g.hpHi]
      : a > 0.2
        ? [g.hpMid, g.hpMidHi]
        : [g.hpLow, g.hpLowHi];
  }
  function ot(a, e, t, s, i = s, r = 6, o = !0) {
    (s = Math.max(0, Math.min(1, s))), (i = Math.max(s, Math.min(1, i)));
    let l = r * ke * 1.2;
    te(a - 0.8, e - 0.8, t + 1.6, r + 1.6, g.track, l),
      te(a, e, t, r, g.track2, l),
      d.save(),
      ze(a, e, t, r, l),
      d.clip(),
      i > s &&
        ((d.fillStyle = "#ffffff"),
        d.fillRect(m(a + t * s), m(e), m(t * (i - s)), m(r)));
    let [f, u] = Sa(s);
    if (
      ((d.fillStyle = f),
      d.fillRect(m(a), m(e), m(t * s), m(r)),
      (d.fillStyle = u),
      d.fillRect(m(a), m(e), m(t * s), m(Math.max(0.7, r * 0.32))),
      o)
    ) {
      d.fillStyle = "rgba(11,9,24,0.45)";
      for (let h = 1; h < 10; h++)
        d.fillRect(
          m(a + (t * h) / 10 - r * ke * 0.6),
          m(e + r * 0.45),
          m(0.5),
          m(r * 0.55),
        );
    }
    d.restore();
  }
  function Tt(a, e, t, s, i, r) {
    let o = s * ke * 1.4;
    te(a - 0.6, e - 0.6, t + 1.2, s + 1.2, g.track, o),
      te(a, e, t, s, g.track2, o),
      d.save(),
      ze(a, e, t, s, o),
      d.clip(),
      (d.fillStyle = r),
      d.fillRect(m(a), m(e), m(t * Math.max(0, Math.min(1, i))), m(s)),
      d.restore();
  }
  function ue(a, e, t, s, i = {}) {
    let r = i.size ?? 5.6,
      o = r * 1.15,
      l = ye(a, r, je, 700) + o * ke * 2 + 4,
      f = i.right ? t - l : t;
    return (
      te(f, s, l, o, e),
      G(a, f + l / 2, s + o * 0.82, r, i.text ?? "#ffffff", {
        align: "center",
        weight: 700,
      }),
      l
    );
  }
  var ya = (a, e, t, s = !1) => ue(a, Rt[a] ?? "#888", e, t, { right: s });
  function Oe(a, e, t, s, i, r = {}) {
    let o = i * 0.2,
      l = () => {
        if ((d.beginPath(), r.slash)) {
          let h = i * ke;
          d.moveTo(m(t + h), m(s)),
            d.lineTo(m(t + i), m(s)),
            d.lineTo(m(t + i - h), m(s + i)),
            d.lineTo(m(t), m(s + i));
        } else
          d.moveTo(m(t), m(s)),
            d.lineTo(m(t + i - o), m(s)),
            d.lineTo(m(t + i), m(s + o)),
            d.lineTo(m(t + i), m(s + i)),
            d.lineTo(m(t), m(s + i));
        d.closePath();
      };
    d.save(), l(), d.clip();
    let f = d.createRadialGradient(
      m(t + i / 2),
      m(s + i * 0.7),
      0,
      m(t + i / 2),
      m(s + i * 0.7),
      m(i * 0.9),
    );
    f.addColorStop(0, r.bg ?? "#6a6490"),
      f.addColorStop(1, g.night),
      (d.fillStyle = f),
      d.fillRect(m(t - 2), m(s - 2), m(i + 4), m(i + 4));
    let u = a?.portraits[e] ?? a?.portraits.Normal;
    if (u) {
      d.imageSmoothingEnabled = !1;
      let h = i * Fe,
        c = h >= 40 ? Math.floor(h / 40) : h / 40,
        y = 40 * c,
        b = m(t) + (h - y) / 2,
        p = m(s) + (h - y);
      r.flip
        ? (d.translate(b + y, p), d.scale(-1, 1), d.drawImage(u, 0, 0, y, y))
        : d.drawImage(u, b, p, y, y);
    }
    d.restore(),
      r.grey &&
        (d.save(),
        l(),
        (d.fillStyle = "rgba(11,9,24,0.72)"),
        d.fill(),
        d.restore()),
      r.frame !== !1 &&
        (d.save(),
        l(),
        (d.strokeStyle = "rgba(255,255,255,0.22)"),
        (d.lineWidth = m(0.6)),
        d.stroke(),
        d.restore());
  }
  var Ta = {
    A: { bg: "#3fd36b", fg: "#05230f" },
    B: { bg: "#ff5a5f", fg: "#2e0507" },
    X: { bg: "#3d9bff", fg: "#031730" },
    Y: { bg: "#ffcf3a", fg: "#2e2203" },
  };
  function Pe(a, e, t, s = 4.2, i = !1) {
    d.save(), (d.globalAlpha *= i ? 0.35 : 1);
    let r = Ta[a];
    if (r)
      return (
        (d.fillStyle = "rgba(0,0,0,0.5)"),
        d.beginPath(),
        d.arc(m(e + 0.4), m(t + 0.6), m(s), 0, Math.PI * 2),
        d.fill(),
        (d.fillStyle = r.bg),
        d.beginPath(),
        d.arc(m(e), m(t), m(s), 0, Math.PI * 2),
        d.fill(),
        G(a, e, t + s * 0.45, s * 1.3, r.fg, { align: "center", weight: 700 }),
        d.restore(),
        s * 2
      );
    let o = s * 1.05,
      l = Math.max(s * 2.4, ye(a, o, je, 700) + s * 1.4),
      f = s * 1.8;
    return (
      te(e - l / 2, t - f / 2, l, f, "#e9e6f7", f * ke),
      G(a, e, t + o * 0.36, o, g.night, { align: "center", weight: 700 }),
      d.restore(),
      l
    );
  }
  var ba = (a, e) =>
    Ta[a] ? e * 2 : Math.max(e * 2.4, ye(a, e * 1.05, je, 700) + e * 1.4);
  function tt(a) {
    return (
      {
        FLAMETHROWER: "Flame",
        "HYDRO PUMP": "Pump",
        "WATER PULSE": "Pulse",
        "SOLAR BEAM": "Solar",
        "HYDRO CANNON": "Cannon",
        "RAZOR LEAF": "Leaf",
        "LEECH SEED": "Seed",
        WITHDRAW: "Shell",
        "DRAGON DARTS": "Darts",
        "WILL-O-WISP": "Wisp",
        FLY: "Fly",
      }[a] ?? a
    );
  }
  var _a = (a) => a.charAt(0) + a.slice(1).toLowerCase(),
    Pa = (a) => {
      let e = Math.floor(a / 60);
      return `${Math.floor(e / 60)}:${String(e % 60).padStart(2, "0")}`;
    };
  function Gt(a, e, t) {
    let s = e.slots[t],
      i = a.match;
    return s.hp <= 0
      ? "Pain"
      : i.phase !== "fight" && i.result
        ? (i.result === "win") == !e.isCpu
          ? "Joyous"
          : "Worried"
        : t !== e.active
          ? s.hp < s.maxHp * 0.25
            ? "Worried"
            : "Normal"
          : ["hurt", "faint", "launched", "down", "stunned"].includes(e.state)
            ? "Pain"
            : a.tick - e.lastKoTick < 120
              ? "Joyous"
              : e.state === "attack" ||
                  e.state === "dodge" ||
                  e.state === "guard"
                ? "Determined"
                : ["move", "switchIn"].includes(e.state)
                  ? s.hp < s.maxHp * 0.25
                    ? "Worried"
                    : "Normal"
                  : "Angry";
  }
  function Aa(a, e = 1, t = !0) {
    let s = d.createLinearGradient(0, 0, 0, m(oe));
    s.addColorStop(0, `rgba(18,14,38,${0.94 * e})`),
      s.addColorStop(0.6, `rgba(11,9,24,${0.86 * e})`),
      s.addColorStop(1, `rgba(8,6,18,${0.97 * e})`),
      (d.fillStyle = s),
      d.fillRect(0, 0, m(H), m(oe));
    for (let r of [0, 1]) {
      let o = r ? H - 30 : 30,
        l = d.createLinearGradient(m(o), 0, m(H / 2), m(oe));
      l.addColorStop(0, "rgba(220,226,255,0.10)"),
        l.addColorStop(1, "rgba(220,226,255,0)"),
        (d.fillStyle = l),
        d.beginPath(),
        d.moveTo(m(o - 6), 0),
        d.lineTo(m(o + 6), 0),
        d.lineTo(m(r ? H * 0.28 : H * 0.72), m(oe)),
        d.lineTo(m(r ? H * 0.06 : H * 0.94), m(oe)),
        d.closePath(),
        d.fill();
    }
    if (!t) return;
    d.save(), (d.globalAlpha = 0.07);
    let i = [L.leaf, L.flame, L.water, "#a184f5"];
    for (let r = 0; r < 12; r++) {
      let o = ((r * 61 + a * 0.35) % (H + 160)) - 80;
      te(o, 0, 5 + (r % 3) * 3, oe, i[r % 4], oe * 0.45);
    }
    d.restore();
  }
  // ---- Team select backdrop: a neon arena hall. Perspective floor and wall grid,
  // a honeycomb wall with light running around the hexagons, sweeping stage
  // beams, manga speed lines at the edges and drifting embers.
  var NB = null;
  function nbPath(a, e) {
    let t = [0];
    for (let s = 1; s < a.length; s++)
      t.push(
        t[s - 1] + Math.hypot(a[s][0] - a[s - 1][0], a[s][1] - a[s - 1][1]),
      );
    return { pts: a, cum: t, len: t[t.length - 1], color: e };
  }
  function nbAt(a, e) {
    e = ((e % a.len) + a.len) % a.len;
    let t = 1;
    for (; t < a.cum.length - 1 && a.cum[t] < e; ) t++;
    let s = a.pts[t - 1],
      i = a.pts[t],
      r = a.cum[t] - a.cum[t - 1] || 1,
      o = (e - a.cum[t - 1]) / r;
    return [s[0] + (i[0] - s[0]) * o, s[1] + (i[1] - s[1]) * o];
  }
  function nbBuild() {
    let e = 150,
      t = H / 2,
      r = [];
    for (let o of [-1, 1]) {
      r.push(
        nbPath(
          [
            [t + o * 40, e - 70],
            [t + o * 150, e - 70],
            [t + o * 150, e - 4],
            [t + o * 215, e + 8],
          ],
          o < 0 ? "#33d6ff" : "#ff3fa4",
        ),
      );
      r.push(
        nbPath(
          [
            [t + o * 20, e + 4],
            [t + o * 205, e + 4],
            [t + o * 260, e + 16],
          ],
          "#33d6ff",
        ),
      );
    }
    let l = [];
    for (let o = 0; o < 26; o++)
      l.push([Math.random(), Math.random(), Math.random()]);
    return { rails: r, embers: l, horizon: e };
  }
  function neonBg(a) {
    NB || (NB = nbBuild());
    let e = NB.horizon,
      t = H / 2,
      s = d.createLinearGradient(0, 0, 0, m(oe));
    s.addColorStop(0, "#050816"),
      s.addColorStop(0.55, "#0b1434"),
      s.addColorStop(1, "#070b1d"),
      (d.fillStyle = s),
      d.fillRect(0, 0, m(H), m(oe));
    let i = d.createRadialGradient(m(t), m(e - 20), 0, m(t), m(e - 20), m(260));
    i.addColorStop(0, "rgba(64,120,255,0.28)"),
      i.addColorStop(1, "rgba(64,120,255,0)"),
      (d.fillStyle = i),
      d.fillRect(0, 0, m(H), m(oe)),
      d.save(),
      (d.globalCompositeOperation = "lighter"),
      (d.lineCap = "round");
    let r = (u, h, c, y, b, p) => {
      (d.strokeStyle = b),
        (d.globalAlpha = p),
        (d.lineWidth = m(0.6)),
        d.beginPath(),
        d.moveTo(m(u), m(h)),
        d.lineTo(m(c), m(y)),
        d.stroke();
    };
    for (let u = -6; u <= 6; u++)
      r(t + u * 34, 18, t + u * 34, e, "#33d6ff", 0.13);
    for (let u = 0; u < 4; u++)
      r(0, 30 + u * 32, H, 30 + u * 32, "#33d6ff", 0.08);
    for (let u = -14; u <= 14; u++)
      r(t + u * 6, e, t + u * 46, oe, "#33d6ff", 0.16);
    let o = (a * 0.012) % 1;
    for (let u = 0; u < 9; u++) {
      let h = (u + o) / 9,
        c = e + (oe - e) * h * h;
      r(0, c, H, c, "#33d6ff", 0.05 + 0.2 * h);
    }
    (d.strokeStyle = "#33d6ff"),
      (d.lineWidth = m(1.4)),
      (d.globalAlpha = 0.55),
      d.beginPath(),
      d.ellipse(
        m(t),
        m(oe + 40),
        m(300),
        m(110),
        0,
        Math.PI * 1.06,
        Math.PI * 1.94,
      ),
      d.stroke(),
      (d.globalAlpha = 0.18),
      (d.lineWidth = m(5)),
      d.stroke();
    let l = (u, h, c, y, b) => {
      for (let p = 0; p < 10; p++) {
        // Skip the piece that would jump from the rail's end back to its start.
        if (
          Math.floor((h - (c * p) / 10) / u.len) !==
          Math.floor((h - (c * (p + 1)) / 10) / u.len)
        )
          continue;
        let k = nbAt(u, h - (c * p) / 10),
          M = nbAt(u, h - (c * (p + 1)) / 10);
        (d.strokeStyle = y),
          (d.globalAlpha = b * (1 - p / 10)),
          (d.lineWidth = m(p === 0 ? 1.8 : 1.2)),
          d.beginPath(),
          d.moveTo(m(k[0]), m(k[1])),
          d.lineTo(m(M[0]), m(M[1])),
          d.stroke();
      }
    };
    NB.rails.forEach((u, h) => {
      r(u.pts[0][0], u.pts[0][1], u.pts[1][0], u.pts[1][1], u.color, 0.2);
      for (let c = 1; c < u.pts.length - 1; c++)
        r(
          u.pts[c][0],
          u.pts[c][1],
          u.pts[c + 1][0],
          u.pts[c + 1][1],
          u.color,
          0.2,
        );
      l(u, a * 1.6 + h * 70, 60, u.color, 1),
        l(u, a * 1.6 + h * 70 + u.len / 2, 40, "#ffffff", 0.6);
    });
    for (let [u, h, c, y] of [
      [H * 0.78, 0.3, "255,63,164", 0.16],
      [H * 0.66, -0.25, "90,140,255", 0.14],
      [H * 0.9, 0.12, "160,110,255", 0.12],
    ]) {
      let b = u + Math.sin(a * 0.01 + h * 10) * 18,
        p = d.createLinearGradient(m(b), 0, m(b - 60), m(oe));
      p.addColorStop(0, `rgba(${c},${y})`),
        p.addColorStop(1, `rgba(${c},0)`),
        (d.fillStyle = p),
        (d.globalAlpha = 1),
        d.beginPath(),
        d.moveTo(m(b - 6), 0),
        d.lineTo(m(b + 8), 0),
        d.lineTo(m(b - 40 + h * 120), m(oe)),
        d.lineTo(m(b - 120 + h * 120), m(oe)),
        d.closePath(),
        d.fill();
    }
    for (let u of NB.embers) {
      let h = (u[1] - a * (0.0015 + u[2] * 0.002)) % 1,
        c = h < 0 ? h + 1 : h,
        y = 10 + u[0] * 150 + Math.sin(a * 0.03 + u[2] * 9) * 6,
        b = oe * c;
      (d.globalAlpha = 0.25 + 0.6 * (1 - c) * u[2]),
        (d.fillStyle = u[2] > 0.5 ? "#ffb347" : "#ff6a2a"),
        d.fillRect(m(y), m(b), m(1 + u[2]), m(1 + u[2]));
    }
    d.restore(), d.save(), (d.lineCap = "butt");
    let f = Math.floor(a / 3);
    for (let u = 0; u < 70; u++) {
      let h = (u / 70) * Math.PI * 2 + ((f * 7 + u * 13) % 11) * 0.004,
        c = Math.cos(h),
        y = Math.sin(h),
        b = Math.max(Math.abs(c) / (H / 2), Math.abs(y) / (oe / 2)),
        p = 1 / b,
        k = p * (0.72 + (((u * 37 + f * 5) % 17) / 17) * 0.16);
      (d.strokeStyle = u % 3 ? "rgba(0,0,0,0.85)" : "rgba(200,225,255,0.35)"),
        (d.lineWidth = m(u % 3 ? 1.6 : 0.5)),
        (d.globalAlpha = 0.5),
        d.beginPath(),
        d.moveTo(m(t + c * p), m(oe / 2 + y * p)),
        d.lineTo(m(t + c * k), m(oe / 2 + y * k)),
        d.stroke();
    }
    let k = d.createRadialGradient(
      m(t),
      m(oe / 2),
      m(120),
      m(t),
      m(oe / 2),
      m(300),
    );
    k.addColorStop(0, "rgba(0,0,0,0)"),
      k.addColorStop(1, "rgba(0,0,0,0.55)"),
      (d.fillStyle = k),
      (d.globalAlpha = 1),
      d.fillRect(0, 0, m(H), m(oe)),
      d.restore();
  }
  function Ca(a, e, t, s, i, r, o) {
    if (
      ((d = a),
      (Fe = i),
      s.frame++,
      a.setTransform(1, 0, 0, 1, 0, 0),
      a.clearRect(0, 0, a.canvas.width, a.canvas.height),
      (a.imageSmoothingEnabled = !1),
      s.screen === "title")
    ) {
      is(s, o), Lt(s);
      return;
    }
    if (s.screen === "select") {
      ns(s, o), ga(s), Lt(s);
      return;
    }
    let l = t.view,
      f = (c) => (c * l.z + l.ox) * ma,
      u = (c) => (c * l.z + l.oy) * ma,
      h = (c, y) => c + (y - c) * r;
    if (e.match.phase !== "results") {
      for (let c of e.players) {
        if (!c.isCpu || c.state === "faint" || c.vanished) continue;
        let y = f(h(c.px, c.x)),
          b = u(h(c.py, c.y) - h(c.pz, c.z) - 40);
        ot(
          y - 12,
          b,
          24,
          c.slot.hp / c.slot.maxHp,
          c.slot.hp / c.slot.maxHp,
          2.6,
          !1,
        ),
          (d.fillStyle = g.cpu),
          d.beginPath(),
          d.moveTo(m(y + 0.5), m(b - 1)),
          d.lineTo(m(y - 2), m(b - 4)),
          d.lineTo(m(y + 3), m(b - 4)),
          d.closePath(),
          d.fill(),
          ["hurt", "launched"].includes(c.state) &&
            c.comboTaken >= 2 &&
            pa(y + 15, b + 9, c.comboTaken);
      }
      for (let c of e.dummies) {
        if (c.hidden || c.state === "ko" || c.state === "spawn") continue;
        let y = f(h(c.px, c.x)),
          b = u(h(c.py, c.y) - 36);
        ot(y - 11, b, 22, c.hp / c.maxHp, c.hp / c.maxHp, 2.6, !1);
        let p = s.lastCombo.get(c.index) ?? 0;
        if (c.combo >= 2 && c.state === "hurt") {
          c.combo !== p &&
            (s.comboBump.set(c.index, 1), s.lastCombo.set(c.index, c.combo));
          let k = s.comboBump.get(c.index) ?? 0;
          d.save(),
            d.translate(m(y + 14), m(b + 9)),
            d.scale(1 + k * 0.5, 1 + k * 0.5),
            d.translate(-m(y + 14), -m(b + 9)),
            pa(y + 14, b + 9, c.combo),
            G(`${c.comboDmg} damage`, y + 14, b + 16, 6, g.chalk, {
              weight: 700,
              outline: 2,
            }),
            d.restore(),
            s.comboBump.set(c.index, k * 0.8);
        } else c.state !== "hurt" && s.lastCombo.set(c.index, 0);
      }
      for (let c of t.popups) {
        let y = 1 - c.life / c.max,
          b = y < 0.15 ? 1 + (1 - y / 0.15) * 0.9 : 1,
          p = c.big && y < 0.2 ? (s.frame % 2 ? 0.8 : -0.8) : 0,
          k = /^\d+$/.test(c.text);
        d.save(),
          (d.globalAlpha = c.life < 10 ? c.life / 10 : 1),
          d.translate(m(f(c.x) + p), m(u(c.y))),
          d.scale(b, b),
          d.rotate(c.big ? -0.05 : 0),
          V(c.text, 0, 0, k ? (c.big ? 15 : 10.5) : c.big ? 12 : 8.5, c.color, {
            align: "center",
            outline: c.big ? 3 : 2.4,
            skew: !0,
          }),
          d.restore();
      }
    }
    if (
      (!s.paused && e.match.phase !== "results" && (Ja(e, s, o), es(s, o)),
      e.match.phase !== "results")
    )
      for (let c of t.banners) {
        let y = 1 - c.life / c.max,
          b = Math.min(1, y / 0.12),
          p = b < 1 ? 2.2 - 1.2 * Ee(b) : 1 + Math.max(0, 0.04 - y * 0.04),
          k = oe * 0.46;
        d.save(), (d.globalAlpha = c.life < 12 ? c.life / 12 : 1);
        let M = Ee(Math.min(1, y / 0.2));
        te(
          -20,
          k - 25,
          (H + 40) * M,
          c.sub ? 40 : 32,
          "rgba(11,9,24,0.72)",
          10,
        ),
          (d.fillStyle = c.color),
          d.fillRect(0, m(k - 25), m(H * M), m(1.2)),
          d.translate(m(H / 2), m(k)),
          d.scale(p, p),
          d.translate(-m(H / 2), -m(k)),
          V(c.text, H / 2, k, 30, c.color, {
            align: "center",
            outline: 4,
            skew: !0,
          }),
          c.sub &&
            G(c.sub, H / 2, k + 10, 7.5, g.chalk, {
              align: "center",
              weight: 600,
              italic: !0,
            }),
          d.restore();
      }
    s.debug && as(e),
      s.hintT > 0 && !s.paused && e.match.phase === "fight" && ts(e, s),
      e.match.phase === "results" && os(e, s, o),
      ga(s),
      s.paused && hs(e, s, o),
      Lt(s);
  }
  function pa(a, e, t) {
    V(`${t}`, a, e, 14, g.gold, { outline: 3, skew: !0 }),
      G("hits", a + ye(`${t}`, 14, He, 900) + 1.5, e, 6.5, g.chalk, {
        weight: 700,
        italic: !0,
        outline: 2,
      });
  }
  function Lt(a) {
    a.flash <= 0 ||
      ((d.globalAlpha = Math.min(1, a.flash / 10)),
      (d.fillStyle = "#ffffff"),
      d.fillRect(0, 0, m(H), m(oe)),
      (d.globalAlpha = 1),
      a.flash--);
  }
  function ga(a) {
    if (a.toastT <= 0) return;
    d.save(), (d.globalAlpha = Math.min(1, a.toastT / 20));
    let e = ye(a.toast, 7.5) + 22;
    Ae(H / 2 - e / 2, oe - 34, e, 15, g.p1),
      G(a.toast, H / 2, oe - 24, 7.5, g.chalk, { align: "center" }),
      d.restore();
  }
  function Qa(a, e, t) {
    let s = a.trail[e] ?? t;
    return t >= s
      ? ((a.trail[e] = t), (a.trailWait[e] = 0), t)
      : ((a.trailWait[e] = (a.trailWait[e] ?? 0) + 1),
        a.trailWait[e] > 24 &&
          (a.trail[e] = Math.max(t, s - Math.max(2, (s - t) * 0.08))),
        a.trail[e]);
  }
  var Pt = 204,
    ka = 46;
  function Ja(a, e, t) {
    let s = a.player;
    d.save(),
      e.hudShake > 0 &&
        (d.translate(
          m((Math.random() * 2 - 1) * e.hudShake * 0.35),
          m((Math.random() * 2 - 1) * e.hudShake * 0.35),
        ),
        (e.hudShake *= 0.85),
        e.hudShake < 0.2 && (e.hudShake = 0)),
      wa(a, e, s, 5, 5, !1, t),
      d.restore();
    for (let r of Object.keys(e.chipFlash))
      e.chipFlash[r] > 0 && e.chipFlash[r]--;
    let i = a.cpu;
    if (a.match.mode === "vs" && i) {
      wa(a, e, i, H - 5 - Pt, 5, !0, t);
      let r = a.match,
        o = 50,
        l = H / 2 - o / 2,
        f = 5;
      Ae(l, f, o, 30, g.gold, { edge: "bottom", sk: 6 }),
        V(Pa(r.ticks), H / 2, f + 17, 15, g.chalk, { align: "center" }),
        G(`Round ${r.round}`, H / 2, f + 25.5, 5.6, g.haze, {
          align: "center",
        }),
        V(`${r.wins}`, H / 2 - 5, f + 42, 11, g.p1, {
          align: "right",
          outline: 2.4,
        }),
        V("\u2013", H / 2, f + 41, 9, g.haze, { align: "center", outline: 2 }),
        V(`${r.losses}`, H / 2 + 5, f + 42, 11, g.cpu, {
          align: "left",
          outline: 2.4,
        });
    } else {
      let o = H - 5 - 140;
      Ae(o, 5, 140, 38, g.gold, { edge: "right" }),
        V("Training", o + 14, 20, 13, g.chalk),
        G(
          ["Dummies stand still", "Dummies wander", "Dummies shoot back"][
            A.dummyMode
          ] ?? "",
          o + 14,
          29,
          6,
          g.haze,
        );
      let l = a.dummies.reduce((f, u) => Math.max(f, u.bestCombo), 0);
      G(`Best combo ${l}`, o + 14, 38, 6.4, g.chalk, { weight: 700 }),
        G(`Close calls ${s.closeCalls}`, o + 140 - 14, 38, 6.4, g.chalk, {
          weight: 700,
          align: "right",
        });
    }
    s.lock &&
      (Pe("R1", 14, 60, 3.4),
      G("Locked on", 22, 62.5, 7, s.kit.color, {
        weight: 700,
        italic: !0,
        outline: 2,
      }));
  }
  function wa(a, e, t, s, i, r, o) {
    let l = t.slot,
      f = l.kit,
      u = r ? g.cpu : g.p1;
    Ae(s, i, Pt, ka, u, { edge: r ? "right" : "left" });
    let h = 40,
      c = r ? s + Pt - h - 12 : s + 10;
    Oe(o[f.id], Gt(a, t, t.active), c, i + 3, h, {
      flip: r,
      bg: f.color,
      grey: t.state === "faint",
      slash: !0,
    }),
      !r &&
        e.portraitFlash > 0 &&
        (d.save(),
        (d.globalAlpha = e.portraitFlash / 18),
        te(c, i + 3, h, h, "#ff4a63"),
        d.restore(),
        e.portraitFlash--),
      l.hp < l.maxHp * 0.25 &&
        l.hp > 0 &&
        Math.floor(a.tick / 15) % 2 === 0 &&
        (ze(c, i + 3, h, h),
        (d.strokeStyle = g.hpLow),
        (d.lineWidth = m(1.2)),
        d.stroke()),
      ue(r ? "CPU" : "1P", u, r ? c + h - 18 : c + 1, i + ka - 9, {
        text: g.night,
        size: 5.6,
      });
    let y = r ? s + 46 : s + 56,
      b = 108;
    V(f.name, y, i + 12.5, 12, g.chalk);
    let p = `${Math.ceil(l.hp)}`;
    V(p, y + b + 1, i + 12.5, 12, Sa(l.hp / l.maxHp)[0], { align: "right" });
    let k = y + ye(f.name, 12, He, 900) + 3,
      M = f.type2 ? [f.type, f.type2] : [f.type],
      P = y + b - ye(p, 12, He, 900) - 3 - k,
      C = M.reduce((w, U) => w + ye(U, 5.6, je, 700) + 6.5, 0);
    for (let w of M)
      k += ue(C > P ? w.slice(0, 3) : w, Rt[w] ?? "#888", k, i + 5.2) + 1.2;
    let x = Qa(e, `${t.team}-${f.id}`, l.hp);
    ot(y, i + 15.5, b, l.hp / l.maxHp, x / l.maxHp, 6);
    let v = y,
      E = i + 24.5;
    l.burnT > 0 && (v += ue("BRN", "#e0602e", v, E) + 1.5),
      (t.seededT ?? 0) > 0 && (v += ue("SEED", "#4c9a32", v, E) + 1.5),
      t.state === "stunned" &&
        (v +=
          ue("DIZZY", e.frame % 10 < 5 ? g.cpu : g.gold, v, E, {
            text: g.night,
          }) + 1.5),
      f.id === "charizard"
        ? (l.hp < l.maxHp * 0.3 &&
            (v +=
              ue("BLAZE", e.frame % 20 < 10 ? "#e04020" : "#f08030", v, E) +
              1.5),
          G("Heat", v, E + 5.6, 5.8, "#ff9a5c", { weight: 700 }),
          (v += 14),
          Tt(
            v,
            E + 1.6,
            Math.max(14, y + 74 - v),
            3.2,
            l.heat / 100,
            l.heat > 85 && e.frame % 10 < 5
              ? "#fff4c2"
              : l.heat > 60
                ? "#ff5a2a"
                : "#ff8a3d",
          ))
        : f.id === "venusaur"
          ? (l.solar ?? 0) > 0.05
            ? ue(
                l.solar >= 1
                  ? "SOLAR READY"
                  : `SOLAR ${Math.round(l.solar * 100)}%`,
                e.frame % 30 < 15 || l.solar < 1 ? "#b8901e" : "#e0b22e",
                v,
                E,
              )
            : t.rooted
              ? ue("ROOTED", "#3f8a35", v, E)
              : G("Stand still to root", v, E + 5.6, 5.8, g.dim)
          : f.id === "blastoise"
            ? a.inPuddle(t.x, t.y, t.team, !0)
              ? ue("MEGA LAUNCHER", "#2f6fc0", v, E)
              : G("Fire from puddles", v, E + 5.6, 5.8, g.dim)
            : f.id === "dragapult" &&
              (l.horns.forEach((w, U) =>
                Oe(o.dreepy, "Normal", v + U * 9.5, E - 0.5, 8, {
                  bg: "#7fd1a8",
                  grey: w !== "loaded",
                }),
              ),
              (v += 21),
              l.pfCd === 0
                ? ue("PHANTOM", "#7b62d8", v, E)
                : Tt(v, E + 1.6, 26, 3.2, 1 - l.pfCd / ut, "#7b62d8"));
    {
      let w = y + 80,
        U = Math.max(0, l.guard) / 100,
        re = t.state === "stunned";
      Za(w, E + 3.3, U < 0.3 || re ? g.hpLow : "#5fb4ff"),
        Tt(
          w + 5,
          E + 1.6,
          22,
          3.2,
          U,
          re
            ? e.frame % 10 < 5
              ? g.cpu
              : g.gold
            : U < 0.3
              ? g.cpu
              : t.state === "guard"
                ? "#bff1ff"
                : "#5fb4ff",
        );
    }
    let Q = (w, U) => 1 - w / Math.max(1, U),
      ie = r ? {} : e.chipFlash,
      K = i + 33.5;
    vt(y, K, "B", "Dodge", Q(l.cdDodge, f.dodge.cooldown), 0),
      f.id === "dragapult"
        ? vt(
            y + 34,
            K,
            "X",
            l.horns.includes("out") && l.horns.includes("loaded") === !1
              ? "Recall"
              : "Darts",
            l.horns.includes("loaded") || l.horns.includes("out") ? 1 : 0,
            ie.x ?? 0,
          )
        : vt(y + 34, K, "X", tt(f.xName), Q(l.cdX, f.xCd), ie.x ?? 0),
      vt(y + 68, K, "Y", tt(f.yName), Q(l.cdY, f.yCd), ie.y ?? 0);
    let $ = t.slots.findIndex((w, U) => U !== t.active);
    if ($ >= 0) {
      let w = t.slots[$],
        U = w.hp <= 0,
        re = r ? s + 12 : s + Pt - 34;
      Oe(o[w.kit.id], Gt(a, t, $), re + 3, i + 5, 20, {
        flip: r,
        bg: w.kit.color,
        grey: U,
      }),
        U && ue("FNT", "#5d5780", re + 6, i + 15),
        ot(re + 1, i + 28, 23, w.hp / w.maxHp, w.hp / w.maxHp, 2.6, !1);
      let se = t.switchCd === 0 && !U,
        N = t.assistCd === 0 && !U;
      if (
        (Pe("L1", re + 6, i + 38, 2.9, !se),
        Pe("L2", re + 19, i + 38, 2.9, !N),
        !r && (e.chipFlash.assist ?? 0) > 0)
      ) {
        let J = e.chipFlash.assist / 16;
        d.save(),
          (d.globalAlpha = J),
          ze(
            re - (1 - J) * 3,
            i + 2 - (1 - J) * 3,
            30 + (1 - J) * 6,
            42 + (1 - J) * 6,
          ),
          (d.strokeStyle = "#ffffff"),
          (d.lineWidth = m(1)),
          d.stroke(),
          d.restore();
      }
    }
  }
  function Za(a, e, t) {
    (d.fillStyle = g.night),
      d.beginPath(),
      d.moveTo(m(a - 2.6), m(e - 3)),
      d.lineTo(m(a + 2.6), m(e - 3)),
      d.lineTo(m(a + 2.6), m(e)),
      d.lineTo(m(a), m(e + 2.8)),
      d.lineTo(m(a - 2.6), m(e)),
      d.closePath(),
      d.fill(),
      (d.fillStyle = t),
      d.beginPath(),
      d.moveTo(m(a - 1.9), m(e - 2.3)),
      d.lineTo(m(a + 1.9), m(e - 2.3)),
      d.lineTo(m(a + 1.9), m(e - 0.2)),
      d.lineTo(m(a), m(e + 1.9)),
      d.lineTo(m(a - 1.9), m(e - 0.2)),
      d.closePath(),
      d.fill();
  }
  function vt(a, e, t, s, i, r) {
    if (r > 0) {
      let o = r / 16;
      d.save(),
        (d.globalAlpha = o),
        (d.strokeStyle = g.chalk),
        (d.lineWidth = m(1)),
        d.beginPath(),
        d.arc(m(a + 4), m(e + 4), m(4 + (1 - o) * 6), 0, Math.PI * 2),
        d.stroke(),
        d.restore();
    }
    Pe(t, a + 4, e + 4, 3.6, !1),
      i < 1 &&
        ((d.fillStyle = "rgba(11,9,24,0.72)"),
        d.beginPath(),
        d.moveTo(m(a + 4), m(e + 4)),
        d.arc(
          m(a + 4),
          m(e + 4),
          m(3.8),
          -Math.PI / 2 + Math.PI * 2 * Math.max(0, i),
          Math.PI * 1.5,
        ),
        d.closePath(),
        d.fill()),
      G(s, a + 9.5, e + 6.4, 6.4, i >= 1 ? g.chalk : g.dim, { weight: 600 });
  }
  function es(a, e) {
    for (let t of a.cards) t.t++;
    a.cards = a.cards.filter((t) => t.t < 54).slice(-1);
    for (let t of a.cards) {
      let s = Ee(t.t / 8),
        i = t.t > 42 ? (t.t - 42) / 12 : 0,
        r = 170,
        o = 24,
        l = t.cpu
          ? H - r - 8 + (1 - s) * 60 + i * 60
          : 8 - (1 - s) * 60 - i * 60,
        f = oe - 40;
      d.save(),
        (d.globalAlpha = (1 - i) * s),
        Ae(l, f, r, o, t.cpu ? g.cpu : g.p1, {
          edge: t.cpu ? "right" : "left",
          bright: 1,
        }),
        Oe(
          e[t.kit.id],
          t.kind === "switch" ? "Determined" : "Happy",
          t.cpu ? l + r - 30 : l + 9,
          f + 2,
          20,
          { bg: t.kit.color, flip: t.cpu, slash: !0 },
        );
      let u =
          t.kind === "switch"
            ? t.cpu
              ? "CPU sends in"
              : "Go!"
            : t.cpu
              ? "CPU assist"
              : "Assist!",
        h = t.cpu ? l + 14 : l + 34;
      G(u, h, f + 9, 6, t.cpu ? g.cpu : g.p1, { weight: 700, italic: !0 }),
        V(t.kit.name, h, f + 20, 12, g.chalk, { skew: !0 }),
        d.restore();
    }
  }
  function ts(a, e) {
    let t = a.player.kit,
      s = t.id === "dragapult" ? "Dodge (hold: Phantom)" : "Dodge",
      i =
        e.source === "pad"
          ? [
              ["A", "Attack"],
              ["RS", "Smash"],
              ["B", s],
              ["R2", "Guard"],
              ["X", tt(t.xName)],
              ["Y", tt(t.yName)],
              ["R1", "Lock"],
              ["L1", "Switch"],
              ["L2", "Assist"],
            ]
          : [
              ["J", "Attack"],
              ["Arrows", "Smash"],
              ["K", s],
              ["O", "Guard"],
              ["L", tt(t.xName)],
              ["I", tt(t.yName)],
              ["Shift", "Lock"],
              ["Q", "Switch"],
              ["E", "Assist"],
            ],
      r = 3.5,
      o = 0,
      l = i.map(([c, y]) => {
        let b = ba(c, r) + 2 + ye(y, 6.6) + 7;
        return (o += b), b;
      });
    d.save(), (d.globalAlpha = Math.min(1, e.hintT / 30));
    let f = H / 2 - o / 2,
      u = oe - 9;
    te(f - 8, u - 6, o + 10, 12, "rgba(11,9,24,0.78)");
    let h = f;
    i.forEach(([c, y], b) => {
      let p = ba(c, r);
      Pe(c, h + p / 2, u, r),
        G(y, h + p + 2, u + 2.4, 6.6, "#cfcaea"),
        (h += l[b]);
    }),
      d.restore();
  }
  var xa = {
    idle: "#3a3456",
    move: "#5a5480",
    startup: "#f0c64a",
    active: "#ff4f4f",
    recovery: "#4f8cff",
    iframe: "#6fd3e8",
    dodge: "#2f7f8f",
    hurt: "#b06ad9",
    hitstop: "#ffffff",
    armor: "#c8a87a",
  };
  function as(a) {
    let e = a.player,
      t = a.meter.length,
      s = 3.6,
      i = 0.6,
      r = 90 * (s + i),
      o = (H - r) / 2,
      l = oe - 46;
    te(o - 8, l - 26, r + 16, 40, "rgba(11,9,24,0.88)");
    for (let u = 0; u < t; u++)
      (d.fillStyle = xa[a.meter[u]]),
        d.fillRect(m(o + (90 - t + u) * (s + i)), m(l), m(s), m(5));
    let f = o;
    for (let [u, h] of Object.entries(xa))
      (d.fillStyle = h),
        d.fillRect(m(f), m(l + 8), m(3), m(3)),
        G(u, f + 4.5, l + 11, 5.6, "#cfcaea"),
        (f += ye(u, 5.6) + 9);
    G(
      `${e.kit.name}  ${e.state} t=${e.t}  combo ${e.combo}${e.chainQueued ? "+" : ""}  guard ${Math.round(e.slot.guard)}  kb ${Math.hypot(e.kvx, e.kvy).toFixed(2)}`,
      o,
      l - 16,
      6,
      "#cfcaea",
    ),
      G(
        `buffer A${e.buf.attack ?? 0} B${e.buf.dodge ?? 0} X${e.buf.special1 ?? 0} Y${e.buf.special2 ?? 0} RS${e.buf.smash ?? 0}   hitstop ${e.hitstop}   time ${a.timeScale().toFixed(2)}   dreepy ${a.dreepy.length}`,
        o,
        l - 7,
        6,
        "#cfcaea",
      );
  }
  var Ke = null;
  function ss(a, e, t, s, i) {
    let r = ye(a, s, He, 900) + s * 0.5,
      o = s * 1.2;
    Ke || (Ke = document.createElement("canvas"));
    let l = Math.ceil(m(r + 20)),
      f = Math.ceil(m(o + 10));
    (Ke.width !== l || Ke.height !== f) && ((Ke.width = l), (Ke.height = f));
    let u = Ke.getContext("2d");
    u.setTransform(1, 0, 0, 1, 0, 0),
      (u.globalCompositeOperation = "source-over"),
      (u.globalAlpha = 1),
      u.clearRect(0, 0, l, f);
    let h = m(s * 0.98);
    u.translate(m(10 + s * 0.22), h),
      u.transform(1, 0, -ke, 1, 0, 0),
      (u.font = `900 ${(s * Fe).toFixed(1)}px ${He}`),
      (u.textBaseline = "alphabetic"),
      (u.lineJoin = "round"),
      (u.fillStyle = g.chalk),
      u.fillText(a, 0, 0),
      (u.globalCompositeOperation = "source-atop");
    let c = u.measureText(a).width,
      y = [L.leaf, L.flame, L.water, "#a184f5"];
    for (let M = 0; M < 4; M++)
      (u.fillStyle = y[M]),
        u.fillRect((M / 4) * c, -m(s * 0.44), c / 4 + 1, m(s * 0.24));
    let b = ((i * 4) % (c + m(240))) - m(120);
    (u.globalAlpha = 0.55),
      (u.fillStyle = "#ffffff"),
      u.beginPath(),
      u.moveTo(b, -m(s)),
      u.lineTo(b + m(9), -m(s)),
      u.lineTo(b - m(5), m(s * 0.1)),
      u.lineTo(b - m(14), m(s * 0.1)),
      u.closePath(),
      u.fill();
    let p = m(e - r / 2 - 10),
      k = m(t) - h;
    d.save(),
      (d.font = u.font),
      (d.textAlign = "left"),
      (d.textBaseline = "alphabetic"),
      d.translate(p + m(10 + s * 0.22), k + h),
      d.transform(1, 0, -ke, 1, 0, 0),
      (d.lineJoin = "round"),
      (d.lineWidth = m(s * 0.14)),
      (d.strokeStyle = g.night),
      (d.fillStyle = "rgba(51,214,255,0.35)"),
      d.fillText(a, m(3), m(3)),
      d.strokeText(a, 0, 0),
      d.restore(),
      d.drawImage(Ke, p, k);
  }
  function is(a, e) {
    let t = a.frame;
    Aa(t);
    let s = Math.sin(t * 0.04) * 1.2;
    V("STARTER", H / 2 - 104, 36 + s, 19, g.p1, { skew: !0, outline: 3 }),
      ss("BRAWL", H / 2, 104 + s, 74, t),
      G(
        "A top-down Pok\xE9mon arena brawler",
        H / 2 + 108,
        118 + s,
        7,
        g.haze,
        { align: "right", italic: !0, weight: 600 },
      ),
      [
        [H / 2 - 150, "venusaur"],
        [H / 2 - 50, "charizard"],
        [H / 2 + 50, "blastoise"],
        [H / 2 + 150, "dragapult"],
      ].forEach(([o, l], f) => {
        let u = xe[l],
          h = u.color,
          c = 196 + (f % 2 ? -4 : 0),
          y = d.createRadialGradient(m(o), m(c), 0, m(o), m(c), m(40));
        y.addColorStop(0, h + "99"),
          y.addColorStop(1, h + "00"),
          (d.fillStyle = y),
          d.beginPath(),
          d.ellipse(m(o), m(c), m(40), m(12), 0, 0, Math.PI * 2),
          d.fill(),
          (d.fillStyle = "rgba(8,6,18,0.55)"),
          d.beginPath(),
          d.ellipse(m(o), m(c), m(15), m(4.5), 0, 0, Math.PI * 2),
          d.fill();
        let b = e[l],
          p = b.anims.Idle ?? b.anims.Walk;
        et(
          d,
          p,
          Be(p, t + f * 11, 1),
          0,
          m(o),
          m(c),
          1.95 * Fe * u.size,
          b.ground,
        ),
          V(u.name, o, c + 17, 11, h, {
            align: "center",
            outline: 2.4,
            skew: !0,
          }),
          G(u.role.replace(" \xB7 ", ", "), o, c + 25, 6.2, g.haze, {
            align: "center",
          });
      });
    let r = 0.7 + 0.3 * Math.sin(t * 0.09);
    d.save(),
      (d.globalAlpha = r),
      G("Press any button to start", H / 2, 248, 9, g.chalk, {
        align: "center",
        weight: 700,
        italic: !0,
        outline: 2,
      }),
      d.restore(),
      G(
        "Tapping the screen also turns on sound and fullscreen",
        H / 2,
        260,
        6.2,
        g.dim,
        { align: "center" },
      );
  }
  var Ge = { x: H / 2 - 60, y: 46, tile: 56, gap: 8 };
  function rs(a) {
    let e = a % 2,
      t = Math.floor(a / 2);
    return {
      x: Ge.x + e * (Ge.tile + Ge.gap) - t * Ge.tile * ke * 0.5,
      y: Ge.y + t * (Ge.tile + Ge.gap * 0.6),
      s: Ge.tile,
    };
  }
  function Mt(a, e, t, s, i) {
    G(a, t, s + 4, 5.4, g.haze, { weight: 600 });
    for (let r = 0; r < 5; r++)
      te(t + 20 + r * 5, s, 4.2, 4.2, r < e ? i : "#332c55", 1);
  }
  function St(a, e, t, s, i, r, o, l) {
    let h = r ? g.cpu : g.p1;
    if (l === "empty") {
      d.save(),
        d.setLineDash([m(3), m(2.5)]),
        ze(t, s, 150, 64, 12),
        (d.strokeStyle = "rgba(220,214,255,0.28)"),
        (d.lineWidth = m(0.8)),
        d.stroke(),
        d.restore(),
        V(o, t + 150 / 2, s + 64 / 2 + 1, 13, "rgba(220,214,255,0.32)", {
          align: "center",
          skew: !0,
        }),
        G(
          r ? "Waiting" : "Choose a Pok\xE9mon",
          t + 150 / 2,
          s + 64 / 2 + 11,
          6.4,
          "rgba(220,214,255,0.32)",
          { align: "center" },
        );
      return;
    }
    if (l === "hidden") {
      Ae(t, s, 150, 64, h, { edge: "right" });
      let k = t + 150 - 66;
      te(k, s + 6, 52, 52, g.track2),
        V("?", k + 26, s + 46, 36, "#4a4370", { align: "center", skew: !0 }),
        G(o, t + 16, s + 16, 6.4, g.haze, { weight: 700, italic: !0 }),
        G("CPU is choosing", t + 16, s + 28, 7, g.dim);
      return;
    }
    let c = xe[i];
    d.save(),
      l === "hover" && (d.globalAlpha = 0.72 + 0.2 * Math.sin(a.frame * 0.15)),
      Ae(t, s, 150, 64, h, {
        edge: r ? "right" : "left",
        bright: l === "locked" ? 1 : 0,
      });
    let y = r ? t + 150 - 66 : t + 14,
      b = r ? t + 16 : t + 72;
    Oe(e[i], l === "locked" ? "Determined" : "Angry", y, s + 6, 52, {
      flip: r,
      bg: c.color,
      slash: !0,
    }),
      G(l === "hover" ? `${o}?` : o, b, s + 11, 6, h, {
        weight: 700,
        italic: !0,
      }),
      V(c.name, b, s + 24, 14, g.chalk);
    let p = b;
    (p += ya(c.type, p, s + 27) + 1.2),
      c.type2 && ya(c.type2, p, s + 27),
      Mt("Speed", c.stats.speed, b, s + 36, "#33d6ff"),
      Mt("Power", c.stats.power, b, s + 42.5, "#ff8a3d"),
      Mt("Guard", c.stats.defense, b, s + 49, "#4df08a"),
      Mt("Skill", c.stats.difficulty, b, s + 55.5, "#b48cff"),
      d.restore(),
      l === "roll" &&
        (d.save(),
        (d.globalAlpha = 0.18 + 0.1 * Math.sin(a.frame)),
        te(t, s, 150, 64, g.cpu, 12),
        d.restore());
  }
  function ns(a, e) {
    let t = a.frame;
    a.selectT++, (a.pickBump *= 0.85), neonBg(t);
    let s = A.gameMode !== 1;
    V("Choose your team", 12, 25, 22, g.chalk, { skew: !0, outline: 2 }),
      G("Pick two. Your first pick leads.", 14, 34, 6.6, g.haze, {
        italic: !0,
      });
    let i = ["Easy", "Normal", "Hard"][A.cpuLevel],
      r = ["#4df08a", g.gold, g.cpu][A.cpuLevel],
      o = ue(s ? "VS CPU" : "TRAINING", s ? g.cpu : g.dim, H - 12, 14, {
        right: !0,
        size: 7,
      });
    s &&
      ue(i.toUpperCase(), r, H - 14 - o, 14, {
        right: !0,
        size: 7,
        text: g.night,
      });
    let l = ge[a.cursor],
      f = a.picks.length;
    for (let M = 0; M < 2; M++) {
      let P = a.picks[M] ?? (M === f && !a.picks.includes(l) ? l : null),
        C = a.picks[M] ? "locked" : P ? "hover" : "empty";
      St(a, e, 8 - M * 6, 48 + M * 72, P, !1, M === 0 ? "Lead" : "Partner", C);
    }
    if (s)
      for (let M = 0; M < 2; M++) {
        let P = H - 158 - M * 6,
          C = 48 + M * 72,
          x = M === 0 ? "Lead" : "Partner";
        a.cpuPicks[M]
          ? St(a, e, P, C, a.cpuPicks[M], !0, x, "locked")
          : a.roulette > 0
            ? St(a, e, P, C, a.rouletteShow[M] ?? "charizard", !0, x, "roll")
            : St(a, e, P, C, null, !0, x, "hidden");
      }
    else {
      let M = H - 158;
      Ae(M, 48, 150, 136, g.dim, { edge: "right" }),
        V("Training", M + 18, 66, 15, g.chalk),
        G("Wobbuffet dummies take your hits", M + 18, 78, 6.6, g.haze),
        G("and only fight back when set to", M + 18, 86, 6.6, g.haze),
        G("Shooter in Options.", M + 18, 94, 6.6, g.haze);
      let P = e.wobbuffet,
        C = P.anims.Idle;
      et(d, C, Be(C, t, 1), 6, m(M + 75), m(166), 2 * Fe, P.ground);
    }
    let u = (M, P, C) => {
      M.forEach((x, v) => {
        if (!x) return;
        let E = P + v * 50,
          Q = 236,
          ie = xe[x].color,
          K = d.createRadialGradient(m(E), m(Q), 0, m(E), m(Q), m(22));
        K.addColorStop(0, ie + "77"),
          K.addColorStop(1, ie + "00"),
          (d.fillStyle = K),
          d.beginPath(),
          d.ellipse(m(E), m(Q), m(22), m(7), 0, 0, Math.PI * 2),
          d.fill();
        let $ = e[x],
          w = $.anims.Idle ?? $.anims.Walk;
        et(
          d,
          w,
          Be(w, t + v * 13, 1),
          C,
          m(E),
          m(Q),
          1.5 * Fe * xe[x].size,
          $.ground,
        );
      });
    };
    u([a.picks[0], a.picks[1]], 36, 2),
      s && u([a.cpuPicks[1], a.cpuPicks[0]], H - 86, 6),
      ge.forEach((M, P) => {
        let { x: C, y: x, s: v } = rs(P),
          E = xe[M],
          Q = a.picks.indexOf(M),
          ie = a.cpuPicks.includes(M),
          K = P === a.cursor,
          $ = K ? a.pickBump * 3 : 0;
        if (
          (te(
            C - 1.6 - $,
            x - 1.6 - $,
            v + 3.2 + $ * 2,
            v + 3.2 + $ * 2,
            K ? g.p1 : g.night,
          ),
          Oe(
            e[M],
            K ? "Angry" : Q >= 0 || ie ? "Determined" : "Normal",
            C - $,
            x - $,
            v + $ * 2,
            { bg: E.color, frame: !1, slash: !0 },
          ),
          d.save(),
          ze(C, x, v, v),
          d.clip(),
          (d.fillStyle = "rgba(11,9,24,0.8)"),
          d.fillRect(m(C), m(x + v - 11), m(v), m(11)),
          Q >= 0 &&
            ((d.fillStyle = "rgba(51,214,255,0.16)"),
            d.fillRect(m(C), m(x), m(v), m(v))),
          d.restore(),
          V(E.name, C + v / 2 - 1, x + v - 2.6, 9, K ? g.p1 : g.chalk, {
            align: "center",
          }),
          Q >= 0 &&
            ue(`P${Q + 1}`, g.p1, C + v * ke + 2, x + 3, { text: g.night }),
          ie && ue("CPU", g.cpu, C + v - 4, x + 3, { right: !0 }),
          K)
        ) {
          let w = 0.6 + 0.4 * Math.sin(t * 0.25);
          d.save(),
            (d.globalAlpha = w),
            ze(C - 4, x - 4, v + 8, v + 8),
            (d.strokeStyle = g.p1),
            (d.lineWidth = m(1.2)),
            d.stroke(),
            d.restore();
        }
      });
    let h = xe[l],
      c = Ge.x - 34,
      y = 172,
      b = 188;
    Ae(c, y, b, 56, h.color, { edge: "bottom" }),
      V(h.name, c + 16, y + 12, 11, g.chalk),
      G(h.role.replace(" \xB7 ", ", "), c + b - 8, y + 11.5, 6, g.haze, {
        align: "right",
        italic: !0,
      }),
      Ra[l]
        .filter((M) => M[0] !== "*")
        .slice(0, 5)
        .forEach(([M, P, C], x) => {
          let v = y + 19 + x * 7.4;
          Pe(M, c + 16 - x * 1.4, v, 2.7),
            G(P, c + 23 - x * 1.4, v + 2.2, 6, g.chalk, { weight: 700 });
          let E = C.replace(/^Smash: /, "");
          G(
            E.length > 46 ? E.slice(0, 45) + "\u2026" : E,
            c + 72 - x * 1.4,
            v + 2.2,
            5.6,
            g.haze,
          );
        });
    let p = 242;
    if (
      (Pe("X", H / 2 - 118, p, 3.4),
      G(
        `Mode: ${s ? "VS CPU" : "Training"}`,
        H / 2 - 112,
        p + 2.4,
        7,
        "#cfcaea",
      ),
      s &&
        (Pe("Y", H / 2 - 40, p, 3.4),
        G(`CPU: ${i}`, H / 2 - 34, p + 2.4, 7, r, { weight: 700 })),
      G(
        `Arena: ${A.arena === 1 ? "Ruins" : "Stadium"}`,
        H / 2 + 36 + Pe("SELECT", H / 2 + 32, p, 3.4) / 2,
        p + 2.4,
        7,
        A.arena === 1 ? "#c9bfa6" : "#cfcaea",
        { weight: 700 },
      ),
      a.picks.length === 2 && (!s || a.cpuPicks.length === 2))
    ) {
      let M = 1 + 0.04 * Math.sin(t * 0.2);
      d.save(),
        d.translate(m(H / 2), m(258)),
        d.scale(M, M),
        d.translate(-m(H / 2), -m(258)),
        te(H / 2 - 72, 250, 144, 14, g.gold),
        V("Press Start to battle", H / 2, 261, 11, g.night, {
          align: "center",
        }),
        d.restore();
    } else {
      let M = H / 2 - 58;
      for (let [P, C] of [
        ["A", "Pick"],
        ["B", a.picks.length ? "Undo" : "Title"],
        ["START", "Battle"],
      ]) {
        let x = Pe(P, M + 4, 258, 3.4);
        G(C, M + x + 1.5, 260.4, 7, "#cfcaea"), (M += x + ye(C, 7) + 14);
      }
    }
  }
  function os(a, e, t) {
    e.resultsT++;
    let s = e.resultsT,
      i = e.frame,
      r = a.match,
      o = r.result === "win",
      l = a.player,
      f = a.cpu,
      u = o ? l : (f ?? l),
      h = o ? f : l,
      c = u.kit,
      y = c.color,
      b = o ? g.p1 : g.cpu,
      p = Ee(s / 18);
    d.save(),
      d.beginPath(),
      d.moveTo(0, 0),
      d.lineTo(m(H * 1.3 * p), 0),
      d.lineTo(m(H * 1.3 * p - oe * 0.4), m(oe)),
      d.lineTo(0, m(oe)),
      d.closePath(),
      d.clip();
    let k = d.createLinearGradient(0, 0, m(H), m(oe));
    k.addColorStop(0, "#1b1538"),
      k.addColorStop(0.55, g.deep),
      k.addColorStop(1, "#07050f"),
      (d.fillStyle = k),
      d.fillRect(0, 0, m(H), m(oe));
    for (let q = 0; q < 16; q++) {
      let le = ((((q * 47 - i * 2.2) % (H + 200)) + H + 200) % (H + 200)) - 100;
      (d.globalAlpha = q % 3 === 0 ? 0.05 : 0.13),
        te(le, 0, 3 + (q % 4) * 5, oe, q % 3 === 0 ? g.chalk : y, oe * 0.42);
    }
    d.globalAlpha = 1;
    let M = Ee((s - 8) / 14);
    d.save(),
      (d.globalAlpha = 0.16 * M),
      V(c.name, -10 + (1 - M) * -60, 150, 92, y, { skew: !0 }),
      V(c.name, 30 + (1 - M) * 60, 228, 92, y, { skew: !0 }),
      d.restore();
    let P = Ee((s - 10) / 14),
      C = 128,
      x = 214,
      v = d.createRadialGradient(m(C), m(x), 0, m(C), m(x), m(90));
    v.addColorStop(0, y + "aa"),
      v.addColorStop(1, y + "00"),
      (d.fillStyle = v),
      d.beginPath(),
      d.ellipse(m(C), m(x), m(90), m(22), 0, 0, Math.PI * 2),
      d.fill(),
      (d.fillStyle = "rgba(5,4,12,0.55)"),
      d.beginPath(),
      d.ellipse(m(C), m(x), m(36), m(9), 0, 0, Math.PI * 2),
      d.fill();
    let E = t[c.id],
      Q = E.anims.Idle ?? E.anims.Walk,
      ie = u.slots.find((q, le) => le !== u.active && q.hp > 0);
    if (ie && P > 0) {
      let q = t[ie.kit.id],
        le = q.anims.Idle ?? q.anims.Walk;
      d.save(),
        (d.globalAlpha = 0.85 * P),
        et(
          d,
          le,
          Be(le, i + 20, 1),
          1,
          m(C + 98),
          m(x - 48),
          1.9 * Fe,
          q.ground,
        ),
        d.restore();
    }
    P > 0 &&
      et(d, Q, Be(Q, i, 1), 1, m(C), m(x - (1 - P) * 60), 4 * Fe, E.ground);
    let K = Ee((s - 4) / 12);
    d.save(),
      d.translate(m((1 - K) * -80), 0),
      (d.globalAlpha = K),
      te(-10, 14, 236, 44, "rgba(8,6,18,0.7)", 10),
      (d.fillStyle = b),
      d.fillRect(0, m(56), m(230 * K), m(1.6)),
      V(o ? "You win!" : "CPU wins", 14, 46, 36, o ? g.gold : g.cpu, {
        skew: !0,
        outline: 3,
      }),
      G(`${_a(c.name)} took the final KO`, 17, 54, 6.4, g.chalk, {
        italic: !0,
        weight: 600,
      }),
      d.restore(),
      d.restore();
    let $ = 252,
      w = 18,
      U = 220,
      re = 196,
      se = Ee((s - 18) / 14);
    if (se <= 0) return;
    d.save(),
      (d.globalAlpha = se),
      d.translate(m((1 - se) * 70), 0),
      Ae($, w, U, re, g.gold, { edge: "right", sk: 16 });
    let N = $ + 128,
      J = $ + 182,
      fe = (q, le, Ne, ve, Ce) => {
        q &&
          (q.slots.forEach((de, Xe) =>
            Oe(
              t[de.kit.id],
              Ce ? (de.hp > 0 ? "Joyous" : "Happy") : "Pain",
              le - 21 + Xe * 21,
              w + 9,
              19,
              { bg: de.kit.color, grey: de.hp <= 0, flip: q.isCpu, slash: !0 },
            ),
          ),
          G(ve, le, w + 37, 6.6, Ne, {
            align: "center",
            weight: 700,
            italic: !0,
          }),
          Ce && ue("WIN", g.gold, le - 8, w + 3, { text: g.night, size: 5 }));
      };
    fe(l, N, g.p1, "You", o),
      fe(f, J, g.cpu, "CPU", !o),
      V(Pa(r.ticks), $ + 22, w + 26, 18, g.chalk),
      G("match time", $ + 22, w + 34, 5.6, g.haze);
    let ce = l.stats,
      pe = f?.stats,
      we = (q) => (q.swings ? Math.round((q.landed / q.swings) * 100) : 0);
    [
      [
        "Damage dealt",
        Math.round(ce.dealt),
        Math.round(pe?.dealt ?? 0),
        "",
        !0,
      ],
      [
        "Damage taken",
        Math.round(ce.taken),
        Math.round(pe?.taken ?? 0),
        "",
        !1,
      ],
      ["KOs", ce.kos, pe?.kos ?? 0, "", !0],
      ["Smash hits", ce.smashHits, pe?.smashHits ?? 0, "", !0],
      ["Parries", ce.parries, pe?.parries ?? 0, "", !0],
      ["Punishes", ce.punishes ?? 0, pe?.punishes ?? 0, "", !0],
      ["Guard breaks", ce.breaks, pe?.breaks ?? 0, "", !0],
      ["Best combo", ce.bestCombo, pe?.bestCombo ?? 0, "", !0],
      ["Accuracy", we(ce), pe ? we(pe) : 0, "%", !0],
    ].forEach(([q, le, Ne, ve, Ce], de) => {
      let Xe = Ee((s - 26 - de * 3) / 10);
      if (Xe <= 0) return;
      let De = w + 52 + de * 14,
        st = $ + 14 - de * 14 * ke * 0.2;
      d.save(),
        (d.globalAlpha = se * Xe),
        d.translate(m((1 - Xe) * 20), 0),
        de % 2 === 0 &&
          te(st - 4, De - 9.5, U - 22, 13, "rgba(255,255,255,0.04)", 3),
        G(q, st, De, 7.2, "#d9d4f2", { weight: 600 });
      let it = Math.min(1, Math.max(0, (s - 30 - de * 3) / 24)),
        n = le === Ne ? 0 : le > Ne === Ce ? 1 : 2;
      V(
        `${Math.round(le * it)}${ve}`,
        N,
        De + 1,
        12,
        n === 1 ? g.gold : g.chalk,
        { align: "center" },
      ),
        V(
          `${Math.round(Ne * it)}${ve}`,
          J,
          De + 1,
          12,
          n === 2 ? g.gold : g.chalk,
          { align: "center" },
        ),
        d.restore();
    }),
      G(
        `Series ${r.wins}\u2013${r.losses}`,
        $ + U - 22,
        w + re - 7,
        6.4,
        g.haze,
        { align: "right", italic: !0 },
      ),
      d.restore();
    let Le = Ee((s - 40) / 12);
    Le <= 0 ||
      (d.save(),
      (d.globalAlpha = Le),
      qa.forEach((q, le) => {
        let ve = 228 + le * 86 - (1 - Le) * 20,
          Ce = 228,
          de = le === e.resultIndex;
        te(ve + 1.4, Ce + 2, 82, 22, "rgba(0,0,0,0.5)"),
          te(ve, Ce, 82, 22, de ? g.gold : g.plate2),
          V(q, ve + 82 / 2 - 1, Ce + 16, 12, de ? g.night : g.chalk, {
            align: "center",
          });
      }),
      d.restore());
  }
  function ls(a) {
    if (a.kind === "num") {
      let e = A[a.key];
      return Number.isInteger(a.step)
        ? `${e}`
        : e.toFixed(a.step < 0.1 ? 2 : 1);
    }
    return a.kind === "choice" ? (a.options[A[a.key]] ?? "") : "";
  }
  function hs(a, e, t) {
    e.pauseT++;
    let s = Ee(e.pauseT / 9);
    (d.fillStyle = `rgba(8,6,18,${0.8 * s})`),
      d.fillRect(0, 0, m(H), m(oe)),
      d.save(),
      (d.globalAlpha = s),
      d.translate(m((1 - s) * -16), 0),
      V("Paused", 14, 25, 24, g.chalk, { skew: !0, outline: 2 });
    let i = H - 104,
      r = 38;
    tabsOf(a).forEach((p, k) => {
      let M = r + k * 19,
        P = k === e.tab,
        C = i - (P ? 8 : 0) - k * 2;
      te(C + 1.2, M + 1.6, 96, 15, "rgba(0,0,0,0.5)"),
        te(C, M, 96, 15, P ? (e.inContent ? "#1f8fb0" : g.p1) : g.plate2),
        V(
          p.label,
          C + 12,
          M + 11.5,
          11,
          P ? g.night : p.id === "quit" ? g.cpu : g.chalk,
        );
    });
    let o = 8,
      l = 36,
      f = H - 128,
      u = 210;
    Ae(o, l, f, u, g.p1, { sk: 10 });
    let h = tabsOf(a)[e.tab].id;
    d.save(),
      ze(o, l, f, u, 10),
      d.clip(),
      h === "resume" && cs(a, o, l, f, t),
      h === "moves" && ds(e, o, l, f, t),
      h === "swap" && swapPane(a, e, o, l, f, t),
      h === "tuning" && us(e, o, l, f, u),
      h === "controls" && fs(o, l, f),
      h === "credits" &&
        e.credits.forEach((p, k) =>
          G(p, o + 18, l + 18 + k * 11.5, 7, k === 0 ? g.chalk : g.haze),
        ),
      h === "quit" && ms(e, o, l, f),
      d.restore();
    let c = oe - 12,
      y = 16,
      b = e.inContent
        ? [
            ["A", "Select"],
            ["B", "Back"],
            ["START", "Resume"],
          ]
        : [
            ["A", "Open"],
            ["B", "Resume"],
            ["START", "Resume"],
          ];
    for (let [p, k] of b) {
      let M = Pe(p, y + 4, c, 3.6);
      G(k, y + M + 2, c + 2.4, 7, "#cfcaea"), (y += M + ye(k, 7) + 12);
    }
    d.restore();
  }
  // Training quick swap: 2x2 roster, pick a lead then a partner to restart.
  function swapPane(a, e, t, s, i, r) {
    V("Swap Pok\xE9mon", t + 16, s + 22, 14, g.chalk, { skew: !0 }),
      G(
        e.inContent
          ? e.swapPicks?.length
            ? "Now pick a partner"
            : "Pick your lead"
          : "Press A to choose a new training team",
        t + 18,
        s + 33,
        7,
        g.haze,
      );
    let o = (i - 44) / 2,
      l = 64;
    ge.forEach((f, u) => {
      let h = xe[f],
        c = t + 16 + (u % 2) * (o + 10),
        y = s + 44 + Math.floor(u / 2) * (l + 8),
        b = e.inContent && u === e.swapCursor,
        p = e.swapPicks?.indexOf(f) ?? -1,
        k = a.player.slots.some((C) => C.kit.id === f);
      te(c + 1.2, y + 1.6, o, l, "rgba(0,0,0,0.5)", 4),
        te(c, y, o, l, b ? h.color + "55" : g.plate2, 4),
        b &&
          ((d.strokeStyle = h.color),
          (d.lineWidth = m(1.4)),
          d.strokeRect(m(c), m(y), m(o), m(l))),
        Oe(a.mons[f], "Normal", c + 6, y + 6, l - 12, { bg: h.color }),
        V(h.name, c + l + 2, y + 20, 12, b ? g.chalk : "#d9d4f2", { skew: !0 }),
        ue(h.type, Rt[h.type] ?? "#888", c + l + 2, y + 28, { size: 5.2 }),
        G(h.role.replace(" \xB7 ", ", "), c + l + 2, y + 44, 6.2, g.haze);
      let M = p === 0 ? "LEAD" : p === 1 ? "PARTNER" : k ? "IN TEAM" : "";
      M &&
        ue(M, p >= 0 ? g.gold : g.dim, c + o - 6, y + 8, {
          right: !0,
          size: 5,
          text: g.night,
        });
    });
  }
  function cs(a, e, t, s, i) {
    let r = (s - 36) / 2,
      o = (l, f, u, h) => {
        if ((V(u, f + 4, t + 20, 13, h, { skew: !0 }), !l)) {
          G("Training dummies", f + 4, t + 34, 7, g.haze);
          return;
        }
        l.slots.forEach((c, y) => {
          let b = t + 28 + y * 50,
            p = y === l.active;
          Ae(f - y * 4, b, r, 42, p ? c.kit.color : void 0, {
            bright: p ? 1 : 0,
          });
          let k = f - y * 4;
          Oe(i[c.kit.id], Gt(a, l, y), k + 10, b + 5, 32, {
            bg: c.kit.color,
            grey: c.hp <= 0,
            slash: !0,
          }),
            V(c.kit.name, k + 46, b + 15, 12, g.chalk),
            p &&
              ue("ON FIELD", h, k + r - 8, b + 6, {
                right: !0,
                text: g.night,
                size: 5,
              }),
            ot(k + 46, b + 19, r - 58, c.hp / c.maxHp),
            G(
              `${Math.ceil(c.hp)} / ${c.maxHp}`,
              k + r - 14,
              b + 35,
              6.4,
              g.haze,
              { align: "right" },
            ),
            c.burnT > 0 && ue("BRN", "#e0602e", k + 46, b + 29),
            c.hp <= 0 && ue("FNT", "#5d5780", k + 46, b + 29);
        });
      };
    o(a.player, e + 16, "Your team", g.p1),
      o(a.cpu, e + 24 + r, a.cpu ? "CPU team" : "Opponents", g.cpu);
  }
  // Move list. The fourth field is the move's type, shown as a tag.
  var Ra = {
    charizard: [
      [
        "A",
        "Claw combo",
        "3 fast hits. The third is a spinning finisher.",
        "COMBO",
      ],
      [
        "RS",
        "Flare Blitz",
        "Fiery charging tackle. Charge longer to launch harder.",
        "OPTIONAL CHARGE",
      ],
      ["B", "Air dash", "Long dash with invincibility.", "DODGE"],
      [
        "X",
        "Flamethrower",
        "Hold for a long stream. Hurts most up close.",
        "HOLD",
      ],
      [
        "Y",
        "Fly",
        "Rise, steer the marker, slam down. A or Y lands early.",
        "MULTI-STAGE",
      ],
      [
        "*",
        "Heat",
        "Hits build heat for more damage. At 100 you overheat.",
        "PASSIVE",
      ],
    ],
    venusaur: [
      ["A", "Vine Whip", "Longest reach. Hit 2 yanks the target in.", "COMBO"],
      [
        "RS",
        "Power Whip",
        "Slow vine slam with huge reach.",
        "OPTIONAL CHARGE",
      ],
      [
        "X",
        "Razor Leaf / Leech Seed",
        "Tap: 3 homing leaves. Hold: lob a draining seed.",
        "TAP / HOLD",
      ],
      [
        "Y",
        "Solar Beam",
        "Charge; dodge or guard to keep it. Y fires it later.",
        "STORABLE CHARGE",
      ],
      ["B", "Roll", "Short dodge. Stay out of reach instead.", "DODGE"],
      [
        "*",
        "Rooted",
        "Stand still: no knockback, less damage, faster Solar.",
        "PASSIVE",
      ],
    ],
    blastoise: [
      [
        "A",
        "Shell combo",
        "Bash, Aqua Tail, then an armored Body Slam.",
        "COMBO",
      ],
      [
        "RS",
        "Skull Bash",
        "Armored headbutt rush. Hits hardest.",
        "OPTIONAL CHARGE",
      ],
      [
        "X",
        "Water Pulse",
        "Ring shot that dazes. Hold for a 3-shot volley.",
        "TAP / HOLD",
      ],
      [
        "Y",
        "Hydro Cannon",
        "Hold to build pressure; fires itself when full.",
        "FORCED CHARGE",
      ],
      [
        "*",
        "Withdraw",
        "Guard in a puddle to block and counter. Release to spin.",
        "COUNTER",
      ],
      [
        "*",
        "Mega Launcher",
        "Shots from a puddle hit harder and fly further.",
        "PASSIVE",
      ],
    ],
    dragapult: [
      [
        "A",
        "Phantom Claws",
        "2 swipes, then hold A for a flurry or tap for the tail.",
        "RAPID",
      ],
      [
        "RS",
        "Dragon Rush",
        "Long dive straight through the target.",
        "OPTIONAL CHARGE",
      ],
      [
        "B",
        "Phantom",
        "Tap: vanish-dodge. Hold: Phantom Force strike.",
        "MULTI-STAGE",
      ],
      [
        "X",
        "Dragon Darts",
        "Fire both Dreepy. Press again to recall them.",
        "SUMMON",
      ],
      [
        "Y",
        "Will-O-Wisp",
        "Fast ghost flame. Burn weakens their melee.",
        "PROJECTILE",
      ],
      ["*", "Hex", "Darts deal +30% to burned targets.", "PASSIVE"],
    ],
  };
  function ds(a, e, t, s, i) {
    let r = ge[a.moveKit],
      o = xe[r];
    ge.forEach((l, f) => {
      let u = (s - 40) / 4,
        h = e + 18 + f * u,
        c = f === a.moveKit;
      te(h, t + 8, u - 4, 17, c ? xe[l].color : g.plate2),
        Oe(i[l], "Normal", h + 5, t + 9.5, 14, {
          bg: xe[l].color,
          grey: !c,
          frame: !1,
        }),
        V(xe[l].name, h + 22, t + 20.5, 9, c ? g.night : g.haze);
    }),
      V(o.name, e + 16, t + 42, 15, g.chalk, { skew: !0 }),
      G(
        o.role.replace(" \xB7 ", ", "),
        e + 18 + ye(o.name, 15, He, 900) + 6,
        t + 41,
        7,
        g.haze,
        { italic: !0 },
      ),
      G("Left / right: other Pok\xE9mon", e + s - 16, t + 41, 6, g.dim, {
        align: "right",
      }),
      Ra[r].forEach(([l, f, u, k], h) => {
        let c = t + 56 + h * 21;
        l === "*"
          ? te(e + 18, c - 3, 7, 6, o.color, 1.4)
          : Pe(l, e + 22, c, 3.8),
          G(f, e + 32, c + 2.4, 8, g.chalk, { weight: 700 }),
          k &&
            ue(
              k,
              k === "PASSIVE" ? g.dim : o.color,
              e + 36 + ye(f, 8, je, 700),
              c - 1.6,
              {
                size: 4.6,
                text: g.night,
              },
            ),
          G(u, e + 32, c + 11, 6.6, g.haze);
      });
  }
  function us(a, e, t, s, i) {
    let o = Math.floor((i - 26) / 12),
      l = Math.max(0, Math.min(Re.length - o, a.tuneIndex - Math.floor(o / 2)));
    for (let f = l; f < Math.min(Re.length, l + o); f++) {
      let u = Re[f],
        h = t + 16 + (f - l) * 12,
        c = a.inContent && f === a.tuneIndex;
      if (u.kind === "header") {
        u.label &&
          (V(u.label, e + 16, h + 4, 10, g.p1, { skew: !0 }),
          (d.fillStyle = "rgba(255,255,255,0.08)"),
          d.fillRect(
            m(e + 22 + ye(u.label, 10, He, 900)),
            m(h + 1),
            m(s - 44 - ye(u.label, 10, He, 900)),
            m(0.6),
          ));
        continue;
      }
      c && te(e + 12, h - 6, s - 26, 11, "rgba(51,214,255,0.16)", 2),
        G(u.label, e + 22, h + 2.6, 7.4, c ? g.chalk : "#d9d4f2");
      let y = ls(u);
      if (y) {
        if (u.kind === "num") {
          let b = (A[u.key] - u.min) / (u.max - u.min),
            p = e + s - 104;
          Tt(p, h - 1.2, 52, 3.4, b, c ? g.p1 : "#6b64a0");
        }
        G(
          c ? `\u2039 ${y} \u203A` : y,
          e + s - 18,
          h + 2.6,
          7.4,
          c ? g.p1 : g.chalk,
          { align: "right", weight: 700 },
        );
      }
    }
    a.inContent ||
      G("Press A to edit", e + s / 2, t + i - 8, 7, g.haze, {
        align: "center",
      });
  }
  function fs(a, e, t) {
    let s = [
      ["L-STICK", "Move"],
      ["A", "Attack. The combo continues only if hits land"],
      ["R-STICK", "Smash attack: flick to fire, hold to charge"],
      ["B", "Dodge. Press it as you land from a launch to tech"],
      ["R2", "Guard covers your front. Raise it just before a hit to parry"],
      ["X", "Special 1"],
      ["Y", "Special 2"],
      ["R1", "Hold to lock on (with R-stick: pick a target)"],
      ["L1", "Switch to your partner"],
      ["L2", "Call your partner as an assist"],
      ["START", "Pause"],
    ];
    s.forEach(([i, r], o) => {
      let l = e + 16 + o * 15;
      Pe(i, a + 36, l, 3.8), G(r, a + 58, l + 2.6, 7.4, "#d9d4f2");
    }),
      G(
        "Keyboard: WASD move, J attack, K dodge, L and I specials, arrows Smash, O guard, Shift lock, Q switch, E assist, Tab arena (team select)",
        a + t / 2,
        e + 16 + s.length * 15 + 3,
        5.8,
        g.dim,
        { align: "center" },
      );
  }
  function ms(a, e, t, s) {
    V("Leave this battle?", e + 18, t + 30, 18, g.chalk, { skew: !0 }),
      G(
        "Quitting ends the match and resets your record.",
        e + 20,
        t + 42,
        7,
        g.haze,
      ),
      At.forEach((i, r) => {
        let o = t + 60 + r * 22,
          l = e + 20 - r * 3,
          f = a.inContent && r === a.quitIndex;
        te(l, o, 120, 17, f ? (r === 0 ? g.cpu : g.p1) : g.plate2),
          V(
            i,
            l + 12,
            o + 13,
            11,
            f ? g.night : a.inContent ? g.chalk : g.haze,
          );
      }),
      a.inContent || G("Press A to choose", e + 20, t + 136, 7, g.haze);
  }
  var j = null,
    lt,
    qe,
    Ot,
    Ct,
    Nt = new Map();
  function _e() {
    return j;
  }
  function Ea() {
    return lt;
  }
  function Fa() {
    return !!j && j.state === "running";
  }
  function ht() {
    try {
      if (!j) {
        (j = new AudioContext()), (lt = j.createGain()), (lt.gain.value = 0.9);
        let a = j.createDynamicsCompressor();
        (a.threshold.value = -12),
          (a.ratio.value = 5),
          (a.attack.value = 0.003),
          (a.release.value = 0.12),
          lt.connect(a).connect(j.destination),
          (qe = j.createGain()),
          qe.connect(lt),
          (Ot = j.createBuffer(1, j.sampleRate, j.sampleRate));
        let e = Ot.getChannelData(0);
        for (let i = 0; i < e.length; i++) e[i] = Math.random() * 2 - 1;
        Ct = j.createBuffer(1, j.sampleRate, j.sampleRate);
        let t = Ct.getChannelData(0),
          s = 0;
        for (let i = 0; i < t.length; i++)
          i % 6 === 0 && (s = Math.random() < 0.5 ? -1 : 1), (t[i] = s);
        for (let i of [0.125, 0.25, 0.5]) {
          let o = new Float32Array(48),
            l = new Float32Array(48);
          for (let f = 1; f < 48; f++)
            o[f] = (2 / (Math.PI * f)) * Math.sin(Math.PI * f * i);
          Nt.set(`p${i}`, j.createPeriodicWave(o, l));
        }
      }
      j.state !== "running" && j.resume(), (qe.gain.value = A.volume);
    } catch {}
  }
  function Qe(a, e, t, s, i, r, o, l = {}) {
    if (!j) return;
    let f = j.createOscillator();
    if (
      (t === "tri" || t === "saw" || t === "sine"
        ? (f.type =
            t === "tri" ? "triangle" : t === "saw" ? "sawtooth" : "sine")
        : f.setPeriodicWave(
            Nt.get(t === "p12" ? "p0.125" : t === "p25" ? "p0.25" : "p0.5"),
          ),
      f.frequency.setValueAtTime(s, e),
      i !== s &&
        f.frequency.exponentialRampToValueAtTime(Math.max(20, i), e + r),
      l.vib)
    ) {
      let y = j.createOscillator(),
        b = j.createGain();
      (y.frequency.value = 6),
        b.gain.setValueAtTime(0, e),
        b.gain.linearRampToValueAtTime(l.vib, e + (l.vibDelay ?? 0.12) + 0.05),
        y.connect(b).connect(f.detune),
        y.start(e),
        y.stop(e + r + 0.05);
    }
    let u = j.createGain(),
      h = l.attack ?? 0.004,
      c = l.hold ?? 0;
    u.gain.setValueAtTime(1e-4, e),
      u.gain.linearRampToValueAtTime(o, e + h),
      c > 0 && u.gain.setValueAtTime(o, e + h + c),
      u.gain.exponentialRampToValueAtTime(1e-4, e + Math.max(h + c + 0.01, r)),
      f.connect(u).connect(a),
      f.start(e),
      f.stop(e + r + 0.02);
  }
  function ct(a, e, t, s, i, r, o, l, f = !1) {
    if (!j) return;
    let u = j.createBufferSource();
    (u.buffer = f ? Ct : Ot),
      (u.playbackRate.value = 0.85 + Math.random() * 0.3);
    let h = j.createBiquadFilter();
    (h.type = s),
      h.frequency.setValueAtTime(i, e),
      (h.Q.value = r),
      l && h.frequency.exponentialRampToValueAtTime(l, e + t);
    let c = j.createGain();
    c.gain.setValueAtTime(1e-4, e),
      c.gain.linearRampToValueAtTime(o, e + 0.003),
      c.gain.exponentialRampToValueAtTime(1e-4, e + t),
      u.connect(h).connect(c).connect(a),
      u.start(e, Math.random() * 0.5),
      u.stop(e + t + 0.05);
  }
  var Da = () => (j ? j.currentTime : 0),
    O = () => !!j && j.state === "running" && A.volume > 0,
    Ia = (a) => 1 + (Math.random() * 2 - 1) * a,
    I = (a, e, t, s, i, r = 0, o = {}) => Qe(qe, Da() + r, a, e, t, s, i, o),
    X = (a, e, t, s, i, r, o = 0, l = !1) =>
      ct(qe, Da() + o, a, e, t, s, i, r, l),
    F = (a) => 440 * Math.pow(2, (a - 69) / 12),
    S = {
      setVolume() {
        j && (qe.gain.value = A.volume);
      },
      swing(a = !1) {
        O() &&
          X(
            a ? 0.12 : 0.07,
            "bandpass",
            a ? 600 : 1100,
            1.6,
            a ? 0.4 : 0.26,
            a ? 3e3 : 3600,
          );
      },
      hit(a = !1, e = "none", t = 1) {
        if (!O()) return;
        let s = Ia(0.06) * (1 + Math.min(8, t - 1) * 0.03);
        if (
          (I(
            "p50",
            (a ? 220 : 330) * s,
            a ? 45 : 70,
            a ? 0.16 : 0.08,
            a ? 0.5 : 0.36,
          ),
          I("sine", (a ? 130 : 170) * s, 40, a ? 0.22 : 0.1, a ? 0.9 : 0.6),
          X(
            a ? 0.14 : 0.06,
            "bandpass",
            2200 * s,
            0.8,
            a ? 0.7 : 0.5,
            600,
            0,
            !0,
          ),
          a && X(0.04, "highpass", 6e3, 0.5, 0.3),
          e === "fire" &&
            X(
              a ? 0.26 : 0.14,
              "highpass",
              3200,
              0.8,
              a ? 0.3 : 0.18,
              7e3,
              0.01,
              !0,
            ),
          e === "water" &&
            (X(0.16, "bandpass", 1500, 1, 0.3, 400, 0.01),
            I("sine", 900, 300, 0.08, 0.1, 0.02)),
          e === "grass")
        )
          for (let i = 0; i < 3; i++)
            X(0.04, "bandpass", 3800 - i * 500, 4, 0.14, void 0, i * 0.025);
      },
      combo(a) {
        if (!O() || a < 2) return;
        let e = F(72 + Math.min(14, (a - 2) * 2));
        I("p12", e, e, 0.07, 0.07),
          I("p12", e * 1.5, e * 1.5, 0.07, 0.05, 0.04);
      },
      ko() {
        O() &&
          (I("sine", 140, 25, 0.6, 1),
          X(0.5, "lowpass", 1800, 0.7, 0.9, 80, 0, !0),
          [76, 72, 69, 64].forEach((a, e) =>
            I("p25", F(a), F(a), 0.09, 0.12, 0.12 + e * 0.07),
          ));
      },
      dodge() {
        O() &&
          (X(0.1, "bandpass", 2800, 2.4, 0.24, 900),
          I("p12", 1400, 700, 0.06, 0.04));
      },
      closeCall() {
        O() &&
          ([84, 88, 91, 96].forEach((a, e) =>
            I("p25", F(a), F(a), 0.12, 0.09, e * 0.04),
          ),
          X(0.25, "highpass", 7e3, 0.5, 0.12));
      },
      wall() {
        O() &&
          (I("sine", 110, 35, 0.18, 0.9),
          X(0.1, "lowpass", 900, 0.8, 0.5, void 0, 0, !0));
      },
      step(a = !1) {
        O() &&
          (a
            ? (I("sine", 90, 45, 0.09, 0.45), X(0.05, "lowpass", 500, 1, 0.25))
            : X(0.022, "bandpass", 420 * Ia(0.2), 3, 0.08));
      },
      charge() {
        O() && I("p25", 220, 880, 0.38, 0.08, 0, { attack: 0.3 });
      },
      orb() {
        O() &&
          (I("p25", 900, 300, 0.18, 0.14), I("tri", 1350, 450, 0.18, 0.08));
      },
      hurt() {
        O() &&
          (I("p50", 400, 100, 0.14, 0.18),
          X(0.07, "bandpass", 1300, 1, 0.4, void 0, 0, !0));
      },
      fizzle() {
        O() && X(0.08, "highpass", 4e3, 0.6, 0.12);
      },
      respawn() {
        O() &&
          [72, 76, 79, 84].forEach((a, e) =>
            I("p25", F(a), F(a), 0.08, 0.07, e * 0.05),
          );
      },
      reflect() {
        O() &&
          (I("p12", 1800, 3600, 0.1, 0.1),
          I("p25", 2400, 1200, 0.12, 0.08, 0.03),
          X(0.05, "highpass", 6e3, 0.5, 0.2));
      },
      armor() {
        O() &&
          (I("p50", 180, 160, 0.06, 0.18), X(0.05, "bandpass", 3e3, 6, 0.3));
      },
      splash(a = !1) {
        O() &&
          (X(a ? 0.24 : 0.12, "bandpass", 1600, 0.9, a ? 0.4 : 0.22, 450),
          I("sine", 700, 250, 0.08, 0.08));
      },
      leaf() {
        if (O())
          for (let a = 0; a < 3; a++)
            X(0.05, "bandpass", 3200 + a * 500, 3, 0.14, void 0, a * 0.035),
              I("p12", F(86 + a * 2), F(84 + a * 2), 0.04, 0.04, a * 0.035);
      },
      seedThrow() {
        O() && I("p25", 300, 900, 0.14, 0.1);
      },
      seedLand(a) {
        O() &&
          (I("p50", a ? 300 : 520, a ? 160 : 420, 0.06, 0.12),
          a && I("tri", 200, 110, 0.2, 0.2, 0.05));
      },
      seeded() {
        O() &&
          [67, 71, 74].forEach((a, e) =>
            I("p12", F(a), F(a - 1), 0.08, 0.07, e * 0.05),
          );
      },
      sprout() {
        O() &&
          [76, 79, 84].forEach((a, e) =>
            I("tri", F(a), F(a), 0.1, 0.12, e * 0.05),
          );
      },
      heal() {
        O() && I("p12", 1200, 1600, 0.06, 0.035);
      },
      flyUp() {
        O() &&
          (X(0.32, "bandpass", 400, 1.2, 0.32, 2800),
          I("p25", 200, 600, 0.3, 0.06));
      },
      slam() {
        O() &&
          (I("sine", 120, 28, 0.5, 1),
          X(0.4, "lowpass", 2e3, 0.7, 0.9, 90, 0, !0),
          X(0.2, "highpass", 4e3, 0.7, 0.2),
          I("p50", 200, 50, 0.25, 0.2));
      },
      overheat() {
        O() &&
          (X(0.7, "highpass", 3500, 0.5, 0.32, 900),
          [64, 63, 62].forEach((a, e) =>
            I("p50", F(a), F(a - 1), 0.1, 0.08, e * 0.09),
          ));
      },
      heatWarn() {
        O() && I("p12", F(88), F(88), 0.04, 0.05);
      },
      shell() {
        O() &&
          (I("p50", 260, 160, 0.06, 0.14), X(0.05, "bandpass", 900, 2, 0.25));
      },
      lock(a) {
        O() &&
          (a
            ? (I("p12", F(91), F(91), 0.04, 0.06),
              I("p12", F(96), F(96), 0.05, 0.06, 0.04))
            : I("p12", F(84), F(79), 0.05, 0.04));
      },
      cdReady() {
        O() && I("p12", F(93), F(93), 0.05, 0.04);
      },
      lowHp() {
        O() &&
          (I("p50", F(81), F(81), 0.07, 0.05),
          I("p50", F(77), F(77), 0.07, 0.05, 0.1));
      },
      guardUp() {
        O() && I("p25", F(79), F(84), 0.06, 0.05);
      },
      guardHit(a = !1) {
        O() &&
          (I(
            "p50",
            a ? 300 : 520,
            a ? 120 : 380,
            a ? 0.14 : 0.07,
            a ? 0.3 : 0.18,
          ),
          X(a ? 0.12 : 0.05, "bandpass", 3200, 4, a ? 0.45 : 0.3),
          I("tri", 1600, 1500, 0.08, 0.06, 0.01));
      },
      parry() {
        O() &&
          (I("p12", 2400, 4800, 0.08, 0.12),
          [88, 95, 100].forEach((a, e) =>
            I("p25", F(a), F(a), 0.12, 0.09, 0.03 + e * 0.04),
          ),
          X(0.08, "highpass", 7e3, 0.5, 0.3),
          I("sine", 200, 60, 0.15, 0.6));
      },
      guardBreak() {
        O() &&
          (X(0.4, "bandpass", 3e3, 1.5, 0.6, 400, 0, !0),
          I("p50", 900, 120, 0.4, 0.2),
          [76, 72, 67, 64].forEach((a, e) =>
            I("p25", F(a), F(a - 1), 0.08, 0.1, 0.1 + e * 0.06),
          ));
      },
      launch(a = 6) {
        O() &&
          (X(0.3, "bandpass", 500, 1.2, 0.35, 3e3),
          I("p25", 200, 200 + a * 80, 0.25, 0.07));
      },
      land() {
        O() &&
          (I("sine", 120, 35, 0.22, 0.9),
          X(0.14, "lowpass", 1e3, 0.8, 0.55, 120, 0, !0));
      },
      tech() {
        O() &&
          (I("p12", F(86), F(93), 0.07, 0.08),
          X(0.08, "bandpass", 2600, 2, 0.2, 900));
      },
      smashCharge() {
        O() &&
          (I("p25", 180, 720, 0.75, 0.06, 0, { attack: 0.5 }),
          I("tri", 90, 260, 0.75, 0.12, 0, { attack: 0.5 }));
      },
      smashFull() {
        O() &&
          (I("p12", F(96), F(96), 0.05, 0.08),
          I("p12", F(100), F(100), 0.08, 0.08, 0.05));
      },
      smashRelease(a = 0) {
        O() &&
          (X(0.16 + a * 0.1, "bandpass", 700, 1.4, 0.45, 3800),
          I("p50", 300 + a * 200, 80, 0.12, 0.2));
      },
      dart() {
        O() &&
          (I("p12", 500, 2400, 0.12, 0.08),
          X(0.1, "bandpass", 3e3, 2, 0.16, 6e3),
          I("p25", F(79), F(86), 0.05, 0.05, 0.02));
      },
      dreepyHome() {
        O() &&
          (I("p12", F(88), F(88), 0.04, 0.05),
          I("p12", F(93), F(93), 0.05, 0.05, 0.04));
      },
      swat() {
        O() &&
          (I("p50", 700, 180, 0.1, 0.16),
          X(0.06, "bandpass", 2600, 2, 0.35, void 0, 0, !0),
          I("p12", 1200, 300, 0.2, 0.05, 0.03));
      },
      wisp() {
        O() &&
          (I("tri", 300, 520, 0.4, 0.12, 0, { vib: 60, vibDelay: 0.02 }),
          I("p12", 900, 700, 0.3, 0.03, 0.05, { vib: 80 }));
      },
      burn() {
        O() &&
          (X(0.3, "highpass", 2500, 0.7, 0.24, 6e3, 0, !0),
          I("p50", 330, 160, 0.16, 0.08));
      },
      phantom() {
        O() &&
          (I("tri", 700, 140, 0.28, 0.14),
          X(0.22, "bandpass", 900, 1.4, 0.14, 300));
      },
      reappear() {
        O() &&
          (I("tri", 140, 620, 0.16, 0.12),
          I("p12", F(74), F(86), 0.12, 0.04, 0.04));
      },
      switchOut() {
        O() &&
          ([79, 74, 67].forEach((a, e) =>
            I("p25", F(a), F(a), 0.06, 0.08, e * 0.04),
          ),
          X(0.12, "highpass", 5e3, 0.6, 0.1));
      },
      switchIn() {
        O() &&
          (I("sine", 160, 60, 0.1, 0.5, 0.12),
          X(0.05, "bandpass", 2500, 2, 0.3, void 0, 0.12));
      },
      assist() {
        O() &&
          [79, 83, 86, 91].forEach((a, e) =>
            I("p25", F(a), F(a), 0.07, 0.08, e * 0.045),
          );
      },
      cry(a, e = 0) {
        O() &&
          (a === "charizard"
            ? (I("saw", 520, 260, 0.32, 0.12, e, { vib: 60, vibDelay: 0.02 }),
              I("p25", 780, 300, 0.36, 0.08, e + 0.03),
              X(0.32, "bandpass", 1800, 1, 0.18, 700, e, !0))
            : a === "venusaur"
              ? (I("p50", 180, 150, 0.45, 0.16, e, { vib: 40, vibDelay: 0.05 }),
                I("tri", 360, 240, 0.4, 0.14, e + 0.05),
                X(0.2, "bandpass", 600, 2, 0.12, 300, e + 0.1))
              : a === "blastoise"
                ? (I("p50", 140, 110, 0.4, 0.18, e),
                  I("saw", 280, 200, 0.35, 0.06, e + 0.02, { vib: 30 }),
                  X(0.35, "bandpass", 2400, 0.8, 0.22, 500, e + 0.05))
                : (I("p25", 600, 900, 0.12, 0.1, e),
                  I("p25", 900, 500, 0.18, 0.1, e + 0.12)));
      },
      ready() {
        O() &&
          (I("p25", F(69), F(69), 0.14, 0.09),
          I("p25", F(69), F(69), 0.14, 0.09, 0.3));
      },
      go() {
        O() &&
          ([69, 73, 76, 81].forEach((a) =>
            I("p25", F(a), F(a), 0.4, 0.06, 0, { vib: 15 }),
          ),
          I("tri", F(45), F(45), 0.4, 0.3),
          X(0.25, "highpass", 5e3, 0.5, 0.1));
      },
      callout(a) {
        if (!O()) return;
        let e = 72 + a * 3;
        [0, 4, 7, 12].forEach((t, s) =>
          I("p25", F(e + t), F(e + t), 0.08, 0.08, s * 0.04),
        );
      },
      ui(a = !0) {
        O() && I("p12", F(a ? 88 : 84), F(a ? 88 : 84), 0.035, 0.05);
      },
      select() {
        O() &&
          (I("p25", F(84), F(84), 0.05, 0.07),
          I("p25", F(91), F(91), 0.08, 0.07, 0.05));
      },
      back() {
        O() && I("p25", F(79), F(74), 0.07, 0.06);
      },
      pause(a) {
        O() &&
          (a ? [84, 79] : [79, 84]).forEach((e, t) =>
            I("p25", F(e), F(e), 0.06, 0.07, t * 0.05),
          );
      },
      ember() {
        O() &&
          (I("p50", 520, 180, 0.09, 0.1),
          X(0.14, "highpass", 2800, 0.8, 0.2, 5e3));
      },
    };
  function Ba(a) {
    if (!j || j.state !== "running" || A.volume <= 0) return () => {};
    let e = j,
      t = e.currentTime,
      s = e.createGain();
    s.gain.setValueAtTime(1e-4, t),
      s.gain.linearRampToValueAtTime(a === "spin" ? 0.12 : 0.3, t + 0.05),
      s.connect(qe);
    let i = [];
    if (a === "spin") {
      let o = e.createOscillator();
      o.setPeriodicWave(Nt.get("p0.25")), (o.frequency.value = 160);
      let l = e.createOscillator();
      l.frequency.value = 15;
      let f = e.createGain();
      (f.gain.value = 70), l.connect(f).connect(o.frequency);
      let u = e.createGain();
      (u.gain.value = 0.4), o.connect(u).connect(s), i.push(o, l);
    } else {
      let o = e.createBufferSource();
      (o.buffer = Ct),
        (o.loop = !0),
        (o.playbackRate.value = a === "flame" ? 0.6 : 1.3);
      let l = e.createBiquadFilter();
      (l.type = "bandpass"),
        (l.frequency.value = a === "flame" ? 900 : 2400),
        (l.Q.value = a === "flame" ? 0.5 : 0.8);
      let f = e.createGain();
      f.gain.value = 0.7;
      let u = e.createOscillator();
      u.frequency.value = a === "flame" ? 11 : 24;
      let h = e.createGain();
      if (
        ((h.gain.value = 0.35),
        u.connect(h).connect(f.gain),
        o.connect(l).connect(f).connect(s),
        i.push(o, u),
        a === "pump")
      ) {
        let c = e.createOscillator();
        (c.type = "triangle"), (c.frequency.value = 65);
        let y = e.createGain();
        (y.gain.value = 0.6), c.connect(y).connect(s), i.push(c);
      }
    }
    i.forEach((o) => o.start());
    let r = !1;
    return () => {
      if (r) return;
      r = !0;
      let o = e.currentTime;
      s.gain.cancelScheduledValues(o),
        s.gain.setValueAtTime(Math.max(1e-4, s.gain.value), o),
        s.gain.linearRampToValueAtTime(1e-4, o + 0.08),
        i.forEach((l) => {
          try {
            l.stop(o + 0.1);
          } catch {}
        });
    };
  }
  var ys = {
      main: "k.h.s.h.k.k.s.h.",
      drive: "k.hks.h.k.hks.hh",
      half: "k.......s.......",
      fill: "k.h.s.h.s.s.ssss",
      intro: "k...k...k...kkkk",
      title: "k...h.h.s...h.h.",
      tfill: "k...h.h.s.s.sss.",
      none: "................",
      rush: "k.hks.hkk.hks.hs",
      stab: "k..k..k.s.k.k.s.",
      roll: "k.s.k.s.ssssssss",
    },
    Ha = {
      C: [0, 4, 7],
      Am: [9, 12, 16],
      F: [5, 9, 12],
      G: [7, 11, 14],
      E: [4, 8, 11],
      Dm: [2, 5, 9],
      Em: [4, 7, 11],
      Bb: [10, 14, 17],
      Gm: [7, 10, 14],
      A: [9, 13, 16],
      Bdim: [11, 14, 17],
    },
    dt = (a, e, t, s = []) =>
      a.map((i, r) => ({
        lead: i,
        chord: e[r],
        drums: t[r] ?? t[t.length - 1],
        ...(s[r] ?? {}),
      })),
    bs = dt(
      [
        "E4 F4 F#4 G4 G#4 A4 A#4 B4 C5 C#5 D5 D#5 E5 - - -",
        "E5 . E5 . E5 - D#5 E5 B5 - - - G#5 - B4 -",
      ],
      ["E", "E"],
      ["intro", "fill"],
      [
        { bass: "pedal", arp: "off" },
        { bass: "pedal", arp: "off" },
      ],
    ),
    za = dt(
      [
        "A4 - C5 - E5 - - - A5 - G5 - E5 - C5 -",
        "F5 - - - E5 - C5 - A4 - - - C5 - F5 -",
        "G5 - - - F5 - D5 - B4 - - - D5 - G5 -",
        "G#5 - - - - - - - E5 - F5 - G#5 - B5 -",
        "A5 - - - E5 - A5 - C6 - B5 - A5 - E5 -",
        "F5 - A5 - C6 - - - A5 - F5 - C5 - F5 -",
        "D5 - G5 - B5 - - - A5 - G5 - F5 - D5 -",
        "E5 - - - G#5 - - - B5 - - - E5 . . .",
      ],
      ["Am", "F", "G", "E", "Am", "F", "G", "E"],
      ["main", "main", "main", "main", "main", "main", "main", "fill"],
      [{}, {}, {}, {}, {}, {}, {}, { bass: "walk" }],
    ),
    ps = dt(
      [
        "D5 - - - F5 - - - A5 - - - G5 - F5 -",
        "E5 - - - C5 - - - A4 - - - C5 - E5 -",
        "F5 - - - A5 - - - C6 - - - A5 - F5 -",
        "G#5 - - - E5 - - - B4 - - - E5 - G#5 -",
        "A5 - G5 - F5 - E5 - D5 - - - F5 - A5 -",
        "B5 - A5 - G5 - F5 - D5 - - - G5 - B5 -",
        "C6 - - - B5 - - - G5 - E5 - G5 - C6 -",
        "B5 - - - G#5 - E5 - D5 - C5 - B4 - G#4 -",
      ],
      ["Dm", "Am", "F", "E", "Dm", "G", "C", "E"],
      ["drive", "drive", "drive", "drive", "drive", "drive", "drive", "fill"],
      [{}, {}, {}, {}, {}, {}, {}, { bass: "walk" }],
    ),
    gs = dt(
      [
        "E5 - - - - - - - G5 - - - C6 - - -",
        "D6 - - - - - - - B5 - - - G5 - - -",
        "C6 - - - - - - - A5 - - - E5 - - -",
        "G5 - - - - - - - E5 - - - B4 - - -",
        "A5 - - - C6 - - - F6 - - - E6 - - -",
        "E6 - - - D6 - C6 - G5 - - - C6 - - -",
        "D6 - - - C6 - A5 - F5 - - - A5 - D6 -",
        "B5 - - - - - - - G#5 - A5 - B5 - D6 -",
      ],
      ["C", "G", "Am", "Em", "F", "C", "Dm", "E"],
      ["half", "half", "half", "half", "main", "main", "main", "fill"],
      [
        { arp: "roll", bass: "half" },
        { arp: "roll", bass: "half" },
        { arp: "roll", bass: "half" },
        { arp: "roll", bass: "half" },
        { arp: "roll" },
        { arp: "roll" },
        { arp: "roll" },
        { bass: "walk" },
      ],
    ),
    ks = dt(
      [
        "C5 - - - E5 - G5 - C6 - - - B5 - G5 -",
        "A5 - - - G5 - E5 - C5 - - - E5 - A5 -",
        "F5 - - - A5 - C6 - A5 - G5 - F5 - A5 -",
        "G5 - - - - - - - D5 - E5 - F5 - G5 -",
        "C6 - - - G5 - E5 - G5 - - - C6 - E6 -",
        "D6 - - - C6 - A5 - E5 - - - A5 - C6 -",
        "B5 - - - A5 - G5 - F5 - - - A5 - D6 -",
        "C6 - - - - - - - G5 - - - C6 - - -",
      ],
      ["C", "Am", "F", "G", "C", "Am", "G", "C"],
      ["title", "title", "title", "title", "title", "title", "title", "tfill"],
      Array(8).fill({ bass: "half", arp: "up" }),
    ),
    // Battle theme in the spirit of a Pokémon trainer battle: a chromatic run-down
    // intro, a driving A-minor verse over pumping octave bass and a 16th-note
    // arpeggio, a brighter chorus with a doubled lead, and a rising bridge.
    Bi = dt(
      [
        "A5 G#5 G5 F#5 F5 E5 D#5 D5 C#5 C5 B4 A#4 A4 - - -",
        "A4 . A4 . A4 . C5 . A4 . A4 . D#5 - E5 -",
      ],
      ["A", "E"],
      ["intro", "stab"],
      [
        { bass: "pedal", arp: "off" },
        { bass: "pump", arp: "off" },
      ],
    ),
    Bv = dt(
      [
        "A5 - - - E5 - A5 - B5 - C6 - B5 - A5 -",
        "G#5 - - - E5 - - - B4 - - - E5 - G#5 -",
        "F5 - - - C5 - F5 - G5 - A5 - G5 - F5 -",
        "E5 - - - - - - - D5 - E5 - F5 - G#5 -",
        "A5 - - - E5 - A5 - C6 - D6 - E6 - - -",
        "D6 - - - C6 - B5 - A5 - - - G5 - A5 -",
        "A#5 - - - A5 - G5 - F5 - G5 - A5 - A#5 -",
        "B5 - G#5 - E5 - B4 - E5 - G#5 - B5 - D6 -",
      ],
      ["Am", "E", "F", "E", "Am", "Dm", "Bb", "E"],
      ["rush", "rush", "rush", "rush", "rush", "rush", "rush", "fill"],
      [
        { bass: "pump", arp: "roll" },
        { bass: "pump", arp: "roll" },
        { bass: "pump", arp: "roll" },
        { bass: "pump", arp: "roll" },
        { bass: "pump", arp: "roll" },
        { bass: "pump", arp: "roll" },
        { bass: "pump", arp: "roll" },
        { bass: "walk", arp: "roll" },
      ],
    ),
    Bc = dt(
      [
        "C6 - - - - - - - B5 - C6 - D6 - - -",
        "D6 - - - - - - - C6 - B5 - G5 - - -",
        "B5 - - - - - - - A5 - G5 - E5 - - -",
        "A5 - - - - - - - E5 - A5 - C6 - - -",
        "D6 - C6 - D6 - F6 - E6 - D6 - C6 - A5 -",
        "B5 - - - G#5 - - - E5 - G#5 - B5 - E6 -",
        "C6 - B5 - A5 - G#5 - A5 - B5 - C6 - D6 -",
        "E6 - - - D#6 - D6 - C#6 - C6 - B5 - G#5 -",
      ],
      ["F", "G", "Em", "Am", "Dm", "E", "Am", "E"],
      ["main", "main", "main", "main", "rush", "rush", "rush", "roll"],
      Array(8).fill({ bass: "drive", arp: "roll", dbl: !0 }),
    ),
    Bb2 = dt(
      [
        "A4 - - - - - - - C5 - - - E5 - - -",
        "F5 - - - - - - - E5 - - - C5 - - -",
        "D5 - - - - - - - F5 - - - A5 - - -",
        "G#5 - A5 - B5 - C6 - D6 - E6 - F6 - G#6 -",
      ],
      ["Am", "F", "Dm", "E"],
      ["half", "half", "main", "roll"],
      [
        { bass: "half", arp: "roll" },
        { bass: "half", arp: "roll" },
        { bass: "drive", arp: "roll" },
        { bass: "pump", arp: "roll" },
      ],
    ),
    ws = {
      battle: {
        bpm: 176,
        bars: [...Bi, ...Bv, ...Bc, ...Bv, ...Bb2, ...Bc],
        loopFrom: 2,
        lead: "p25",
        leadVol: 0.1,
        arpVol: 0.045,
      },
      title: { bpm: 126, bars: ks, loopFrom: 0, lead: "p50", leadVol: 0.085 },
    },
    xs = {
      C: 0,
      "C#": 1,
      Db: 1,
      D: 2,
      "D#": 3,
      Eb: 3,
      E: 4,
      F: 5,
      "F#": 6,
      Gb: 6,
      G: 7,
      "G#": 8,
      Ab: 8,
      A: 9,
      "A#": 10,
      Bb: 10,
      B: 11,
    },
    vs = (a) => {
      let e = a.match(/^([A-G][#b]?)(\d)$/);
      return e ? (Number(e[2]) + 1) * 12 + xs[e[1]] : -1;
    },
    at = (a) => 440 * Math.pow(2, (a - 69) / 12),
    Wt = class {
      constructor() {
        this.bus = null;
        this.lp = null;
        this.song = null;
        this.name = "";
        this.bar = 0;
        this.step = 0;
        this.nextTime = 0;
        this.timer = 0;
        this.parsed = [];
      }
      ensure() {
        let e = _e();
        return !e || this.bus
          ? !!e
          : ((this.lp = e.createBiquadFilter()),
            (this.lp.type = "lowpass"),
            (this.lp.frequency.value = 18e3),
            (this.lp.Q.value = 0.7),
            (this.bus = e.createGain()),
            (this.bus.gain.value = A.music),
            this.bus.connect(this.lp).connect(Ea()),
            !0);
      }
      play(e) {
        if (this.name === e && this.song) return;
        if (!this.ensure()) {
          this.name = e;
          return;
        }
        let t = _e();
        this.stop(0.15);
        let s = ws[e];
        (this.song = s),
          (this.name = e),
          (this.bar = 0),
          (this.step = 0),
          (this.parsed = s.bars.map((i) => {
            let r = i.lead.trim().split(/\s+/),
              o = [],
              l = [];
            for (let f = 0; f < 16; f++) {
              let u = r[f] ?? ".";
              if (u === "-" || u === ".") {
                o.push(null), l.push(0);
                continue;
              }
              let h = 1;
              for (; r[f + h] === "-"; ) h++;
              o.push(vs(u)), l.push(h);
            }
            return { notes: o, lens: l };
          })),
          (this.nextTime = t.currentTime + 0.12),
          this.bus.gain.cancelScheduledValues(t.currentTime),
          this.bus.gain.setValueAtTime(A.music, t.currentTime),
          clearInterval(this.timer),
          (this.timer = window.setInterval(() => this.pump(), 25));
      }
      resume() {
        if (this.name && !this.song) {
          let e = this.name;
          (this.name = ""), this.play(e);
        }
      }
      stop(e = 0.3) {
        clearInterval(this.timer), (this.timer = 0);
        let t = _e();
        if (t && this.bus && this.song) {
          let s = this.bus;
          s.gain.cancelScheduledValues(t.currentTime),
            s.gain.setValueAtTime(s.gain.value, t.currentTime),
            s.gain.linearRampToValueAtTime(1e-4, t.currentTime + e),
            setTimeout(() => s.disconnect(), (e + 1.5) * 1e3),
            (this.bus = t.createGain()),
            (this.bus.gain.value = A.music),
            this.bus.connect(this.lp);
        }
        this.song = null;
      }
      setVolume() {
        let e = _e();
        e &&
          this.bus &&
          this.bus.gain.setTargetAtTime(A.music, e.currentTime, 0.05);
      }
      muffle(e) {
        let t = _e();
        !t ||
          !this.lp ||
          (this.lp.frequency.cancelScheduledValues(t.currentTime),
          this.lp.frequency.setTargetAtTime(
            e ? 650 : 18e3,
            t.currentTime,
            e ? 0.06 : 0.12,
          ));
      }
      pump() {
        let e = _e();
        if (!e || !this.song || !this.bus) return;
        let t = 60 / this.song.bpm / 4;
        for (; this.nextTime < e.currentTime + 0.12; )
          this.schedule(this.bar, this.step, this.nextTime, t),
            (this.nextTime += t),
            ++this.step >= 16 &&
              ((this.step = 0),
              ++this.bar >= this.song.bars.length &&
                (this.bar = this.song.loopFrom));
      }
      schedule(e, t, s, i) {
        let r = this.song,
          o = r.bars[e],
          l = this.bus,
          f = this.parsed[e],
          u = Ha[o.chord] ?? Ha.C,
          h = 48 + (u[0] % 12),
          c = f.notes[t];
        if (c !== null && c >= 0) {
          let C = f.lens[t] * i;
          Qe(l, s, r.lead, at(c), at(c), C * 0.95, r.leadVol, {
            hold: C * 0.55,
            vib: f.lens[t] >= 4 ? 16 : 0,
            vibDelay: 0.14,
          }),
            o.dbl &&
              Qe(
                l,
                s,
                "p12",
                at(c - 12),
                at(c - 12),
                C * 0.9,
                r.leadVol * 0.55,
                {
                  hold: C * 0.5,
                },
              );
        }
        let y = o.arp ?? "up";
        if (y !== "off") {
          let C = [u[0], u[1], u[2], u[0] + 12].map((E) => 60 + E),
            x = y === "roll" ? [0, 1, 2, 3, 2, 1, 0, 1] : [0, 1, 2, 3],
            v = C[x[t % x.length]];
          Qe(
            l,
            s,
            "p12",
            at(v),
            at(v),
            i * 0.85,
            r.arpVol ?? (y === "roll" ? 0.04 : 0.032),
          );
        }
        let b = o.bass ?? "drive",
          p = h + (u[2] - u[0]),
          k = null,
          M = 2;
        b === "drive" && t % 2 === 0 && (k = t % 4 === 0 ? h - 12 : h),
          b === "half" &&
            (t === 0 || t === 8) &&
            ((k = t === 0 ? h - 12 : p - 12), (M = 7)),
          b === "half" && (t === 6 || t === 14) && ((k = h), (M = 2)),
          b === "pedal" && t % 2 === 0 && (k = t % 4 === 0 ? 40 : 52),
          b === "pump" && ((k = t % 2 === 0 ? h - 12 : h), (M = 1)),
          b === "walk" &&
            t % 2 === 0 &&
            (k = [h - 12, h - 12, p - 12, p - 12, h, h, p, h + 12][t / 2]),
          k !== null &&
            Qe(l, s, "tri", at(k), at(k), i * M * 0.9, 0.26, {
              hold: i * M * 0.5,
            });
        let P = ys[o.drums][t];
        P === "k" &&
          (Qe(l, s, "sine", 150, 42, 0.11, 0.55),
          ct(l, s, 0.03, "lowpass", 1200, 0.7, 0.18)),
          P === "s" &&
            (ct(l, s, 0.11, "bandpass", 1900, 0.8, 0.26, 900, !0),
            Qe(l, s, "p50", 210, 130, 0.05, 0.06)),
          P === "h" && ct(l, s, 0.028, "highpass", 7500, 0.6, 0.06);
      }
    },
    Me = new Wt();
  var Ut = 1e3 / 60,
    be = "#a184f5";
  async function Ms() {
    Vt(), ra();
    try {
      await Promise.race([
        Promise.all([
          document.fonts.load('900 10px "Big Shoulders Display"'),
          document.fonts.load('700 10px "Big Shoulders Display"'),
          document.fonts.load('600 10px "Barlow Semi Condensed"'),
          document.fonts.load('700 10px "Barlow Semi Condensed"'),
          document.fonts.load('italic 700 10px "Barlow Semi Condensed"'),
          document.fonts.load('500 10px "Barlow Semi Condensed"'),
        ]),
        new Promise((n) => setTimeout(n, 2e3)),
      ]);
    } catch {}
    let a = await ea(),
      e = new pt(a),
      t = new xt(),
      s = va([
        "Sprites & portraits: PMD Sprite Repository (sprites.pmdcollab.org)",
        "Charizard: CHUNSOFT, Emboarger, 0palite",
        "Venusaur: CHUNSOFT, G~ \xB7 Blastoise: CHUNSOFT, Top_Kec, Emmuffin",
        "Dragapult: EZERART, Emmuffin \xB7 Dreepy: Deeshura, Emboarger, Top_Kec, G~, NOLASMOR",
        "Wobbuffet: CHUNSOFT",
        "Fonts: Big Shoulders Display (Patric King), Barlow Semi Condensed (Jeremy Tribby)",
        "Pok\xE9mon is \xA9 Nintendo / Creatures / GAME FREAK.",
        "Fan project for personal use. Not for sale.",
      ]);
    (window.__game = e), (window.__fx = t), (window.__ui = s);
    let i = document.getElementById("stage"),
      r = document.getElementById("game"),
      o = document.getElementById("ui"),
      l = document.getElementById("title"),
      f = r.getContext("2d"),
      u = o.getContext("2d"),
      h = 1;
    function c() {
      let n = document.getElementById("wrap"),
        D = document.fullscreenElement === i,
        R = D ? innerWidth : n.clientWidth,
        W = D ? innerHeight : n.clientHeight,
        T = Math.min(R / Y, W / _),
        Z = Math.floor(T);
      Z >= 1 && Z / T > 0.9 && (T = Z);
      let ne = Math.floor(Y * T),
        ee = Math.floor(_ * T);
      for (let Kt of [i, r, o])
        (Kt.style.width = ne + "px"), (Kt.style.height = ee + "px");
      let Je = Math.min(devicePixelRatio || 1, 3);
      (o.width = Math.round(ne * Je)),
        (o.height = Math.round(ee * Je)),
        (h = o.width / H);
    }
    let y = document.getElementById("fs"),
      b = !!i.requestFullscreen,
      p = !!window.claude?.hot?.data?.started,
      k = !1;
    function M() {
      y.hidden = !b || !p || document.fullscreenElement === i;
    }
    async function P() {
      try {
        await i.requestFullscreen();
      } catch {}
      try {
        await screen.orientation?.lock?.("landscape");
      } catch {}
    }
    y.addEventListener("click", (n) => {
      n.stopPropagation(), ht(), P();
    }),
      addEventListener("resize", c),
      document.addEventListener("fullscreenchange", () => {
        c(), M();
      }),
      c();
    function C() {
      ht(),
        Me.resume(),
        !p &&
          ((p = !0),
          M(),
          x(!1),
          setTimeout(() => {
            Fa() || ie("Tap the screen once to turn on sound");
          }, 600));
    }
    function x(n) {
      (s.screen = "select"),
        (s.paused = !1),
        (s.flash = 6),
        (s.selectT = 0),
        (s.roulette = -1),
        n
          ? ((s.picks = s.picks.slice(0, 1)),
            (s.cursor = Math.max(0, ge.indexOf(s.picks[0] ?? "charizard"))))
          : ((s.picks = []), (s.cursor = 0)),
        (s.cpuPicks = []),
        (k = !0),
        le(),
        Me.play("title"),
        Me.muffle(!1),
        S.select();
    }
    function v() {
      (s.screen = "title"),
        (s.paused = !1),
        (l.hidden = !1),
        (s.flash = 6),
        (s.picks = []),
        (s.cpuPicks = []),
        le(),
        Me.play("title"),
        Me.muffle(!1),
        (k = !0),
        e.startMatch("practice", ["charizard", "dragapult"], []),
        (e.dummies = []),
        S.back();
    }
    function E() {
      let n = A.gameMode !== 1;
      e.startMatch(n ? "vs" : "practice", s.picks, n ? s.cpuPicks : []),
        (s.screen = "play"),
        (l.hidden = !0),
        (s.flash = 10),
        (s.hintT = 60 * 12),
        (s.cards = []),
        (s.trail = {}),
        (k = !0),
        (de.kit = ""),
        S.select(),
        S.cry(e.player.kit.id, 0.1),
        Me.play("battle");
    }
    function Q() {
      for (let n = 0; n < 20; n++) {
        let D = [...ge].sort(() => Math.random() - 0.5).slice(0, 2);
        if (!D.every((W) => s.picks.includes(W))) return D;
      }
      return ge.slice(0, 2);
    }
    p && ((l.hidden = !0), (s.screen = "select")),
      M(),
      l.addEventListener("pointerdown", () => {
        C(), P();
      }),
      l.addEventListener("keydown", (n) => {
        (n.key === "Enter" || n.key === " ") && C();
      }),
      addEventListener("pointerdown", () => {
        ht(), Me.resume();
      }),
      ia(() => {
        p ? (ht(), Me.resume()) : C();
      }),
      window.claude?.hot?.snapshot?.(() => ({ started: p })),
      addEventListener("gamepadconnected", () => ie("Controller connected"));
    function ie(n) {
      (s.toast = n), (s.toastT = 120);
    }
    let K = "",
      $ = 0;
    function w(n, D) {
      let R = "";
      n.held.has("up") || n.my < -0.6
        ? (R = "up")
        : n.held.has("down") || n.my > 0.6
          ? (R = "down")
          : n.held.has("left") || n.mx < -0.6
            ? (R = "left")
            : (n.held.has("right") || n.mx > 0.6) && (R = "right"),
        R !== K
          ? ((K = R), ($ = 0), R && D(R))
          : R && ($++, $ > 16 && $ % 5 === 0 && D(R));
      for (let W of ["up", "down", "left", "right"])
        n.pressed.has(W) && R !== W && D(W);
    }
    function U(n) {
      let D = A.gameMode !== 1;
      w(n, (W) => {
        let T = s.cursor % 2,
          Z = Math.floor(s.cursor / 2),
          ne = W === "left" || W === "right" ? (T + 1) % 2 : T,
          ee = W === "up" || W === "down" ? (Z + 1) % 2 : Z;
        (s.cursor = ee * 2 + ne), S.ui(!0);
      }),
        n.pressed.has("special1") &&
          ((A.gameMode = D ? 1 : 0),
          Ze(),
          (s.cpuPicks = []),
          (s.roulette = -1),
          S.ui(!0),
          s.picks.length === 2 && A.gameMode === 0 && (s.roulette = 48)),
        n.pressed.has("special2") &&
          D &&
          ((A.cpuLevel = (A.cpuLevel + 1) % 3), Ze(), S.ui(!0)),
        n.pressed.has("select") &&
          ((A.arena = (A.arena + 1) % 2), Ze(), S.ui(!0));
      let R =
        s.picks.length === 2 && (A.gameMode === 1 || s.cpuPicks.length === 2);
      if ((n.pressed.has("start") || n.pressed.has("confirm")) && R) {
        E();
        return;
      }
      if (n.pressed.has("confirm")) {
        let W = ge[s.cursor];
        s.picks.length < 2 && !s.picks.includes(W)
          ? (s.picks.push(W),
            (s.pickBump = 1),
            S.select(),
            S.cry(W, 0.05),
            s.picks.length === 2 && A.gameMode !== 1
              ? (s.roulette = 48)
              : s.picks.length === 1 &&
                (s.cursor = ge.findIndex((T) => !s.picks.includes(T))))
          : S.fizzle();
      }
      n.pressed.has("back") &&
        (s.cpuPicks.length || s.roulette > 0
          ? ((s.cpuPicks = []), (s.roulette = -1), s.picks.pop(), S.back())
          : s.picks.length
            ? (s.picks.pop(), S.back())
            : v());
    }
    function re() {
      s.roulette <= 0 ||
        (s.roulette--,
        s.roulette % 4 === 0 &&
          ((s.rouletteShow = [...ge]
            .sort(() => Math.random() - 0.5)
            .slice(0, 2)),
          S.ui(s.roulette % 8 === 0)),
        s.roulette === 0 &&
          ((s.cpuPicks = Q()),
          (s.roulette = -1),
          S.select(),
          S.cry(s.cpuPicks[0], 0.08)));
    }
    let se = (n) => Re[n] && Re[n].kind !== "header";
    function N(n) {
      let D = s.tuneIndex;
      do D = (D + n + Re.length) % Re.length;
      while (!se(D));
      (s.tuneIndex = D), S.ui(n < 0);
    }
    function J(n) {
      let D = Re[s.tuneIndex];
      if (D.kind === "num") {
        let R = Math.round((A[D.key] + D.step * n) * 1e3) / 1e3;
        A[D.key] = Math.max(D.min, Math.min(D.max, R));
      } else if (D.kind === "choice") {
        let R = D.options.length;
        if (
          ((A[D.key] = (((A[D.key] + n) % R) + R) % R),
          D.key === "dummyCount" && e.syncDummies(),
          (D.key === "gameMode" || D.key === "arena") &&
            ie("Applies to your next battle"),
          D.key === "dummyMode")
        )
          for (let W of e.dummies)
            (W.tx = W.ty = 0), (W.shootTimer = 40 + W.index * 25);
      } else return;
      S.ui(n > 0), Ze(), S.setVolume(), Me.setVolume();
    }
    async function fe() {
      let n = Re[s.tuneIndex];
      if (n.kind === "choice") return J(1);
      if (
        n.kind === "action" &&
        (S.ui(!0),
        n.id === "reset" &&
          (jt(), e.syncDummies(), ie("Options reset to defaults")),
        n.id === "copy")
      )
        try {
          await navigator.clipboard.writeText(JSON.stringify(A, null, 2)),
            ie("Options copied");
        } catch {
          console.log(JSON.stringify(A, null, 2)),
            ie("Copy blocked here; printed to console");
        }
    }
    function ce() {
      (s.paused = !0),
        (s.tab = 0),
        (s.inContent = !1),
        (s.pauseT = 0),
        (s.quitIndex = 0),
        (s.moveKit = Math.max(0, ge.indexOf(e.player.kit.id))),
        (K = "held"),
        S.pause(!0),
        le(),
        Me.muffle(!0);
    }
    function pe() {
      (s.paused = !1), S.pause(!1), Me.muffle(!1);
    }
    function we(n) {
      if (n.pressed.has("start")) return pe();
      let Vx = tabsOf(e),
        D = Vx[s.tab].id;
      if (
        (w(n, (R) => {
          if (!s.inContent) {
            R === "up" &&
              ((s.tab = (s.tab + Vx.length - 1) % Vx.length), S.ui(!0)),
              R === "down" && ((s.tab = (s.tab + 1) % Vx.length), S.ui(!1));
            return;
          }
          D === "tuning" &&
            (R === "up" && N(-1),
            R === "down" && N(1),
            R === "left" && J(-1),
            R === "right" && J(1)),
            D === "swap" &&
              ((s.swapCursor =
                R === "left" || R === "right"
                  ? (s.swapCursor ^ 1) & 3
                  : (s.swapCursor ^ 2) & 3),
              S.ui(R === "right" || R === "down")),
            D === "moves" &&
              (R === "left" || R === "right") &&
              ((s.moveKit =
                (s.moveKit + (R === "left" ? ge.length - 1 : 1)) % ge.length),
              S.ui(R === "right")),
            D === "quit" &&
              (R === "up" || R === "down") &&
              ((s.quitIndex =
                (s.quitIndex + (R === "up" ? At.length - 1 : 1)) % At.length),
              S.ui(R === "up"));
        }),
        n.pressed.has("confirm"))
      )
        if (s.inContent)
          D === "swap"
            ? (() => {
                let R = ge[s.swapCursor];
                if (s.swapPicks.includes(R)) return S.fizzle();
                s.swapPicks.push(R), S.select(), S.cry(R, 0.05);
                s.swapPicks.length === 2
                  ? (e.startMatch("practice", s.swapPicks, []),
                    (s.cards = []),
                    (s.trail = {}),
                    (s.hintT = 0),
                    (s.swapPicks = []),
                    (s.inContent = !1),
                    pe(),
                    ie("Training team swapped"))
                  : (s.swapCursor = ge.findIndex(
                      (W) => !s.swapPicks.includes(W),
                    ));
              })()
            : D === "tuning"
              ? fe()
              : D === "quit" &&
                (s.quitIndex === 0
                  ? v()
                  : s.quitIndex === 1
                    ? x(!1)
                    : ((s.inContent = !1), S.back()));
        else {
          if (D === "resume") return pe();
          (D === "tuning" || D === "moves" || D === "quit" || D === "swap") &&
            ((s.inContent = !0),
            (s.quitIndex = 0),
            (s.swapPicks = []),
            (s.swapCursor = Math.max(0, ge.indexOf(e.player.kit.id))),
            S.select());
        }
      n.pressed.has("back") &&
        (s.inContent && D === "swap" && s.swapPicks?.length
          ? (s.swapPicks.pop(), S.back())
          : s.inContent
            ? ((s.inContent = !1), S.back())
            : pe());
    }
    function Yt(n) {
      s.resultsT < 50 ||
        (w(n, (D) => {
          let R = D === "up" || D === "left";
          (s.resultIndex = (s.resultIndex + (R ? 2 : 1)) % 3), S.ui(R);
        }),
        (n.pressed.has("confirm") || n.pressed.has("start")) &&
          (S.select(),
          s.resultIndex === 0
            ? (e.rematch(),
              (s.cards = []),
              (s.trail = {}),
              (s.hintT = 0),
              Me.play("battle"))
            : s.resultIndex === 1
              ? x(!0)
              : v()));
    }
    let Le = new Map();
    function q(n, D, R) {
      let W = Le.get(n);
      R && !W && Le.set(n, Ba(D)), !R && W && (W(), Le.delete(n));
    }
    function le() {
      for (let n of Le.values()) n();
      Le.clear();
    }
    function Ne(n) {
      let D = e.player;
      switch (n.type) {
        case "hit": {
          let R = n.victim === e.player,
            W = !!n.attacker && n.attacker.team === e.player.team,
            T = 8,
            Z =
              n.color === L.flame
                ? "fire"
                : n.color === L.water
                  ? "water"
                  : n.color === L.leaf || n.color === "#9be36b"
                    ? "grass"
                    : "none";
          if (n.multi && !n.heavy)
            t.hitSpark(n.x, n.y - T, n.dx, n.dy, !1, n.color),
              t.shake(n.dx, n.dy, 0.9),
              Z === "water"
                ? (t.splash(n.x, n.y, 6, 5, n.dx, n.dy), S.splash())
                : S.hit(!1, Z, n.combo);
          else {
            if (
              (t.hitSpark(
                n.x,
                n.y - T,
                n.dx,
                n.dy,
                n.heavy,
                R ? L.cool : n.color,
              ),
              t.shake(n.dx, n.dy, n.ko ? 9 : n.heavy ? 5 : R ? 4 : 2.2),
              t.streaks(
                n.victim.x,
                n.victim.y - 10,
                n.dx,
                n.dy,
                n.heavy ? 6 : 3,
                R ? "#ff8b8b" : n.color,
              ),
              n.heavy &&
                t.burst(n.x, n.y - T, R ? "#ff8b8b" : n.color, n.ko ? 22 : 15),
              n.heavy &&
                (t.punch(n.x, n.y, n.ko ? 0.09 : 0.045),
                (t.impact = n.ko ? 4 : 2)),
              Z === "fire")
            )
              for (let ne = 0; ne < (n.heavy ? 10 : 4); ne++)
                t.flame(
                  n.x,
                  n.y - 4,
                  Math.atan2(n.dy, n.dx) + (Math.random() - 0.5) * 2,
                  1,
                );
            n.color === be && t.motes(n.x, n.y, 10, n.heavy ? 14 : 7, be, 1.3),
              S.hit(n.heavy, Z, n.combo),
              n.color === L.water && t.splash(n.x, n.y, 8, 10, n.dx, n.dy),
              n.color === L.leaf && t.leaves(n.x, n.y, 8, 6);
          }
          if (
            (n.src.endsWith("-hex") &&
              t.popup(n.victim.x, n.victim.y - 44, "HEX!", be, !1),
            n.src.endsWith(":smash") &&
              ((t.impact = Math.max(t.impact, 3)),
              t.punch(n.x, n.y, 0.08),
              t.shake(n.dx, n.dy, 8),
              (t.screenFlash = 1),
              (t.screenFlashColor = "#ffffff"),
              S.slam()),
            n.ko &&
              ((t.screenFlash = 3),
              (t.screenFlashColor = "#ffffff"),
              R || t.banner("K.O.!", D.kit.color, 70),
              S.ko(),
              t.speedLines(
                n.victim.x,
                n.victim.y - 10,
                30,
                R ? "#ef5a4f" : D.kit.color,
              )),
            R)
          )
            (s.hudShake = n.armored ? 3 : 8),
              (s.portraitFlash = 12),
              n.armored
                ? (S.armor(),
                  t.popup(n.victim.x, n.victim.y - 40, "ARMOR", "#e8d2a8", !1))
                : ((t.vignette = 1), (t.vignetteColor = "214,64,64"), S.hurt());
          else if (!n.multi && W) {
            S.combo(n.combo);
            let ne =
              n.combo === 5
                ? ["NICE!", 0]
                : n.combo === 8
                  ? ["GREAT!", 1]
                  : n.combo === 12
                    ? ["AMAZING!", 2]
                    : n.combo === 16
                      ? ["UNSTOPPABLE!", 3]
                      : null;
            ne &&
              (t.banner(
                ne[0],
                [L.gold, "#ff8a3d", "#ff4f9a", "#b98be0"][ne[1]],
                40,
                `${n.combo} hit combo`,
              ),
              S.callout(ne[1]),
              (t.vignette = 0.6),
              (t.vignetteColor = "255,210,94"));
          }
          t.popup(
            n.victim.x,
            n.victim.y - 30,
            `${n.dmg}`,
            n.heavy ? L.gold : R ? "#ff8b8b" : "#eef2e6",
            n.heavy,
          ),
            n.eff !== 1 &&
              e.tick - Ce > 45 &&
              ((Ce = e.tick),
              n.eff > 1
                ? (t.popup(
                    n.victim.x,
                    n.victim.y - 44,
                    "SUPER EFFECTIVE!",
                    L.gold,
                    !1,
                  ),
                  S.callout(0))
                : t.popup(
                    n.victim.x,
                    n.victim.y - 44,
                    "not very effective\u2026",
                    "#9aa6b0",
                    !1,
                  )),
            n.multi ||
              t.dust(n.victim.x, n.victim.y, n.heavy ? 6 : 3, -n.dx, -n.dy);
          break;
        }
        case "flank":
          t.popup(
            n.x,
            n.y - 48,
            "FLANKED!",
            n.who === D ? "#ef5a4f" : L.gold,
            !0,
          ),
            t.ring(n.x, n.y - 12, 6, 2.4, 14, "#ef5a4f");
          break;
        case "punish":
          t.popup(
            n.x,
            n.y - 56,
            "PUNISH!",
            n.who === D ? "#ef5a4f" : L.gold,
            !1,
          ),
            n.by === D && S.callout(0);
          break;
        case "rockHit":
          t.debris(n.x, n.y - 10, 3, 0, -0.4), t.dust(n.x, n.y, 2, 0, 0, 0.6);
          break;
        case "rockBreak":
          S.wall(),
            S.guardBreak(),
            t.shake(0, 1, 5),
            t.debris(n.x, n.y - 10, 16, 0, -0.6),
            t.dust(n.x, n.y, 14, 0, 0, 2),
            t.ring(n.x, n.y, 8, 3, 16, "#c9bfa6", !0);
          break;
        case "rockRise":
          S.land(),
            t.dust(n.x, n.y, 10, 0, 0, 1.6),
            t.ring(n.x, n.y, 6, 2.4, 14, "#ffd25e", !0);
          break;
        case "itemWarn":
          t.popup(n.x, n.y - 24, "SITRUS BERRY INCOMING", L.gold, !1);
          break;
        case "itemSpawn":
          S.select(),
            t.ring(n.x, n.y, 4, 2, 14, L.gold, !0),
            t.motes(n.x, n.y, 8, 10, L.gold, 1);
          break;
        case "itemGet":
          S.heal(),
            t.heal(n.x, n.y, 10),
            t.ring(n.x, n.y, 6, 2.6, 16, "#9cf28a", !0),
            t.popup(n.x, n.y - 40, `+${n.amount} HP`, "#9cf28a", !0),
            n.who === D
              ? t.banner("SITRUS BERRY", "#9cf28a", 40, "health restored")
              : t.banner("CPU GRABBED THE BERRY", "#ef5a4f", 40);
          break;
        case "itemGone":
          t.dust(n.x, n.y, 4, 0, 0, 0.6);
          break;
        case "swing":
          n.heavy &&
            n.who.kind === "player" &&
            n.who.state === "attack" &&
            t.glint(n.who, n.who.kit.tall * Bz(n.who) * 0.8, "#ffffff"),
            S.swing(n.heavy),
            t.dust(
              n.who.x - n.dx * 4,
              n.who.y,
              n.heavy ? 4 : 2,
              n.dx,
              n.dy,
              0.6,
            ),
            n.heavy &&
              t.ring(n.who.x, n.who.y, 6, 1.4, 10, xe[n.kit].color, !0),
            n.kit === "venusaur" && t.leaves(n.who.x, n.who.y, 10, 2, 0.6),
            n.kit === "dragapult" &&
              t.motes(n.who.x + n.dx * 12, n.who.y + n.dy * 12, 10, 4, be, 0.8);
          break;
        case "dodge":
          n.kind === "shell"
            ? (S.shell(), t.dust(n.who.x, n.who.y, 5, n.dx, n.dy, 1))
            : n.kind === "phantom"
              ? (S.phantom(), t.motes(n.who.x, n.who.y, 10, 12, be, 1.4))
              : (S.dodge(),
                t.dust(n.who.x, n.who.y, 7, n.dx, n.dy, 1.4),
                t.ring(n.who.x, n.who.y, 4, 1.8, 9, L.cool, !0));
          break;
        case "dodgeTick":
          {
            let R = n.who,
              W = R.kit.dodge;
            n.t % 2 === 0 &&
              n.t < W.ticks - 1 &&
              W.kind !== "shell" &&
              W.kind !== "phantom" &&
              ve(R, n.iframe ? L.cool : R.kit.color, 9),
              W.kind === "shell" &&
                n.t % 3 === 0 &&
                t.dust(
                  R.x,
                  R.y,
                  1,
                  Math.cos(R.dodgeDir),
                  Math.sin(R.dodgeDir),
                  0.5,
                );
          }
          break;
        case "closeCall":
          if (n.who !== e.player) {
            S.dodge(), t.popup(n.x, n.y - 36, "DODGED", L.cool, !1);
            break;
          }
          S.closeCall(),
            t.banner("CLOSE CALL", L.cool, 46, "dodge refreshed"),
            (t.vignette = 1),
            (t.vignetteColor = "111,211,232"),
            t.ring(n.x, n.y, 6, 3, 18, L.cool, !0),
            t.motes(n.x, n.y, 10, 14, L.cool, 1.6);
          break;
        case "wall":
          S.wall(),
            t.shake(-n.nx, -n.ny, Math.min(7, n.speed * 0.9)),
            t.debris(n.x, n.y, 6, n.nx, n.ny),
            t.dust(n.x, n.y, 8, -n.nx, -n.ny, 1.5),
            t.ring(n.x, n.y, 3, 1.6, 10, "#e9dcc0", !1, 8),
            (n.who.sqx = 1 + Math.abs(n.ny) * 0.3 - Math.abs(n.nx) * 0.25),
            (n.who.sqy = 1 + Math.abs(n.nx) * 0.3 - Math.abs(n.ny) * 0.25);
          break;
        case "step":
          if (n.skid)
            t.dust(n.x, n.y, 5, -n.dx, -n.dy, 1.2),
              e.inPuddle(n.x, n.y) && t.splash(n.x, n.y, 0, 4),
              S.step();
          else {
            let R = n.who.kind === "player" ? n.who.kit.id : "";
            if (R === "dragapult") break;
            let W = R === "blastoise";
            S.step(W),
              W &&
                (t.shake(0, 1, n.who === D ? 0.7 : 0.35),
                t.dust(n.x, n.y, 3, 0, 0, 0.8)),
              e.inPuddle(n.x, n.y)
                ? (t.splash(n.x, n.y, 0, 3), S.splash())
                : Math.random() < 0.6 &&
                  t.dust(n.x - n.dx * 4, n.y, 1, n.dx, n.dy, 0.4);
          }
          break;
        case "projDie":
          n.wall &&
            (S.fizzle(), t.ring(n.p.x, n.p.y - n.p.z, 2, 1.3, 8, n.p.color)),
            n.p.kind === "pulse"
              ? t.splash(n.p.x, n.p.y, n.p.z, 6)
              : n.p.kind === "leaf"
                ? t.leaves(n.p.x, n.p.y, n.p.z, 4)
                : (n.p.kind === "orb" || n.p.kind === "wisp") &&
                  t.motes(n.p.x, n.p.y, n.p.z, 10, n.p.color);
          break;
        case "reflect":
          S.reflect(),
            t.hitSpark(n.x, n.y - 10, n.p.vx, n.p.vy, !1, L.gold),
            t.popup(n.x, n.y - 24, "REFLECT!", L.gold, !1),
            t.shake(n.p.vx, n.p.vy, 3);
          break;
        case "parry":
          S.reflect(),
            S.armor(),
            t.hitSpark(
              n.x,
              n.y - 10,
              n.attacker.x - n.who.x,
              n.attacker.y - n.who.y,
              !0,
              "#e8d2a8",
            ),
            t.shake(n.attacker.x - n.who.x, n.attacker.y - n.who.y, 4),
            (t.impact = 2),
            t.popup(n.x, n.y - 30, "SHELL COUNTER!", L.water, !0);
          break;
        case "blocked":
          S.shell(),
            t.hitSpark(
              n.x,
              n.y - 10,
              n.x - n.who.x,
              n.y - n.who.y,
              !1,
              "#e8d2a8",
            ),
            t.popup(n.x, n.y - 22, "BLOCKED", "#e8d2a8", !1);
          break;
        case "charge":
          S.charge();
          break;
        case "orb":
          S.orb(), t.motes(n.x, n.y, 10, 8, L.cool);
          break;
        case "respawn":
          S.respawn(),
            S.cry("wobbuffet", 0.15),
            t.motes(n.who.x, n.who.y, 10, 18, L.gold, 1.4),
            t.ring(n.who.x, n.who.y, 4, 2, 14, L.gold, !0);
          break;
        case "koLand":
          S.wall(), t.dust(n.who.x, n.who.y, 10, 0, 0, 2), t.shake(0, 1, 3);
          break;
        case "switch":
          S.switchOut(),
            S.switchIn(),
            S.cry(n.to.id, 0.14),
            t.ring(n.x, n.y, 4, 2.6, 14, n.to.color, !0),
            t.ring(n.x, n.y - 12, 16, -0.8, 12, n.from.color),
            t.motes(n.x, n.y, 12, 16, n.to.color, 1.5),
            n.who === D &&
              ((t.screenFlash = 1), (t.screenFlashColor = n.to.color)),
            s.cards.push({ kit: n.to, t: 0, kind: "switch", cpu: n.who.isCpu });
          break;
        case "assist":
          S.assist(),
            S.cry(n.kit.id, 0.08),
            t.ring(n.who.x, n.who.y, 3, 2.4, 14, n.kit.color, !0),
            t.motes(n.who.x, n.who.y, 12, 12, n.kit.color, 1.4),
            s.cards.push({
              kit: n.kit,
              t: 0,
              kind: "assist",
              cpu: n.who.summoner.isCpu,
            });
          break;
        case "assistOut":
          t.motes(n.who.x, n.who.y, 12, 10, n.who.kit.color, 1);
          break;
        case "lock":
          n.who === D &&
            (S.lock(!!n.target),
            n.target &&
              t.ring(n.target.x, n.target.y, 20, -1.2, 10, D.kit.color, !0));
          break;
        case "flyUp":
          S.flyUp(),
            t.dust(n.who.x, n.who.y, 10, 0, 0, 2),
            t.ring(n.who.x, n.who.y, 5, 2.2, 12, "#e9dcc0", !0);
          break;
        case "slam":
          S.slam(),
            t.shake(0, 1, 8),
            t.punch(n.x, n.y, 0.06),
            t.ring(n.x, n.y, 6, 3.4, 16, L.flame, !0),
            t.ring(n.x, n.y, 4, 2.2, 12, "#fff4c2", !0),
            t.dust(n.x, n.y, 16, 0, 0, 2.6);
          for (let R = 0; R < 16; R++)
            t.flame(n.x, n.y, (R / 16) * Math.PI * 2, 1);
          break;
        case "overheat":
          S.overheat(),
            n.who === D &&
              t.banner(
                "OVERHEAT",
                "#ff5a2a",
                44,
                "stop attacking to cool down",
              ),
            t.smoke(n.who.x, n.who.y, 14, 10);
          break;
        case "leaf":
          S.leaf(), t.leaves(n.x, n.y, 10, 5);
          break;
        case "seedThrow":
          S.seedThrow();
          break;
        case "seedLand":
          S.seedLand(n.stuck),
            t.dust(n.x, n.y, 3, 0, 0, 0.6),
            t.leaves(n.x, n.y, 2, 3, 0.8);
          break;
        case "seeded":
          S.seeded(),
            t.popup(n.who.x, n.who.y - 40, "SEEDED!", "#9be36b", !1),
            t.leaves(n.who.x, n.who.y, 6, 10),
            t.ring(n.who.x, n.who.y, 4, 1.6, 12, L.leaf, !0);
          break;
        case "sprout":
          S.sprout(),
            t.leaves(n.x, n.y, 4, 10, 1),
            t.ring(n.x, n.y, 4, 1.8, 14, L.leaf, !0);
          break;
        case "heal":
          e.tick % 2 === 0 &&
            (t.heal(n.x, n.y, 2), e.tick % 20 === 0 && n.who === D && S.heal());
          break;
        case "faint":
          n.who === D &&
            (t.banner(
              `${n.kit.name} FAINTED`,
              "#ef5a4f",
              60,
              D.aliveSlot(1) !== null ? "your partner is coming in" : void 0,
            ),
            (s.hudShake = 10)),
            S.cry(n.kit.id, 0.25),
            (t.impact = 4);
          break;
        case "roundEnd":
          le(),
            n.result === "win"
              ? (t.banner(
                  "VICTORY!",
                  L.gold,
                  140,
                  `best combo ${e.match.combo} hits`,
                ),
                S.callout(3),
                setTimeout(() => S.go(), 250))
              : (t.banner("DEFEAT", "#ef5a4f", 140), S.overheat()),
            (s.resultIndex = 0),
            (s.resultsT = 0);
          break;
        case "roundStart":
          break;
        case "rooted":
          n.on &&
            (S.shell(),
            t.leaves(n.who.x, n.who.y, 2, 6, 0.8),
            t.ring(n.who.x, n.who.y, 6, 1.4, 12, L.leaf, !0),
            t.popup(n.who.x, n.who.y - 38, "ROOTED", "#9be36b", !1));
          break;
        case "pumpStart":
          S.charge(),
            t.motes(n.who.x, n.who.y, 12, 8, L.water),
            t.glint(n.who, n.who.kit.tall * Bz(n.who) * 0.8, "#8fd0f5");
          break;
        case "solarStart":
          S.charge(), t.motes(n.who.x, n.who.y, 14, 6, "#ffe27a", 0.8);
          break;
        case "solarStore":
          S.cdReady(),
            t.popup(
              n.who.x,
              n.who.y - 44,
              n.c >= 1 ? "SOLAR READY" : `STORED ${Math.round(n.c * 100)}%`,
              "#ffe27a",
              n.c >= 1,
            );
          break;
        case "solarRelease":
          S.smashRelease(1),
            t.glint(n.who, n.who.kit.tall * Bz(n.who) * 0.8, "#ffe27a"),
            t.ring(n.who.x, n.who.y - 12, 6, 2.4, 12, "#ffe27a");
          break;
        case "cannonFire":
          S.splash(),
            t.shake(Math.cos(n.who.dir2), Math.sin(n.who.dir2), 1.5 + 3 * n.c),
            t.ring(n.who.x, n.who.y - 10, 5, 2 + 2 * n.c, 12, "#8fd0f5");
          break;
        case "flurryStart":
          t.popup(n.who.x, n.who.y - 44, "FLURRY!", "#c9b6ff", !1);
          break;
        case "flurryHit": {
          let R = Math.atan2(n.dy, n.dx) + (Math.random() - 0.5) * 0.9;
          t.slash(
            n.who,
            R,
            18,
            0.55,
            3,
            Math.random() < 0.5 ? 1 : -1,
            Math.random() < 0.5 ? "#c9b6ff" : be,
            7,
          );
          break;
        }
        case "pulse":
          S.splash(),
            t.splash(
              n.who.x + n.dx * 12,
              n.who.y + n.dy * 12,
              10,
              n.mega ? 6 : 3,
              n.dx,
              n.dy,
            ),
            t.ring(
              n.who.x + n.dx * 12,
              n.who.y + n.dy * 12 - 10,
              3,
              1.6,
              8,
              n.mega ? L.gold : "#8fd0f5",
            );
          break;
        case "mega":
          t.ring(n.who.x, n.who.y, 6, 2.2, 14, L.gold, !0),
            t.ring(n.who.x, n.who.y, 4, 1.6, 12, "#8fd0f5", !0);
          break;
        case "dazed":
          t.popup(n.who.x, n.who.y - 46, "DAZED", "#8fd0f5", !1),
            t.splash(n.who.x, n.who.y, 8, 6);
          break;
        case "withdraw":
          S.shell(), t.dust(n.who.x, n.who.y, 4, 0, 0, 1);
          break;
        case "spin":
          S.shell(), t.ring(n.who.x, n.who.y, 6, 2, 10, L.water, !0);
          break;
        case "dreepyLaunch":
          S.dart(),
            t.motes(n.x, n.y, 6, 6, be, 1),
            t.ring(n.x, n.y + 16, 3, 1.4, 8, be, !0);
          break;
        case "dreepyHome":
          S.dreepyHome(), t.motes(n.x, n.y, 4, 5, "#9fe8c2", 0.8);
          break;
        case "dreepySwat":
          S.swat(),
            t.hitSpark(n.x, n.y, 0, -1, !1, "#9fe8c2"),
            t.popup(n.x, n.y - 12, "SWATTED!", "#9fe8c2", !1),
            t.shake(0, 1, 2);
          break;
        case "dreepyPoof":
          t.motes(n.x, n.y, 0, 8, be, 0.9);
          break;
        case "dreepyRecall":
          n.who === D && S.dreepyHome(), S.swing(!1);
          for (let R of e.dreepy)
            R.owner === n.who && t.motes(R.x, R.y, R.z, 5, "#9fe8c2", 0.9);
          t.popup(n.who.x, n.who.y - 40, "RECALL", "#9fe8c2", !1);
          break;
        case "dartsEmpty":
          n.who === D &&
            (S.fizzle(),
            t.popup(n.who.x, n.who.y - 40, "NO DREEPY", "#9aa6b0", !1));
          break;
        case "wisp":
          S.wisp(), t.motes(n.x, n.y, 12, 8, "#7f6bff", 1);
          break;
        case "burnImmune":
          S.shell(),
            t.popup(n.who.x, n.who.y - 42, "NO EFFECT", "#9aa6b0", !1),
            t.embers(n.who.x, n.who.y, 3, 8);
          break;
        case "burned":
          S.burn(),
            t.popup(n.who.x, n.who.y - 42, "BURNED!", "#ff8a3d", !1),
            t.embers(n.who.x, n.who.y, 8, 12);
          break;
        case "burnTick":
          t.embers(n.x, n.y, 10, 5), t.popup(n.x, n.y - 30, "4", "#ff8a3d", !1);
          break;
        case "phantom":
          break;
        case "pfReappear":
          S.reappear(),
            t.motes(n.x, n.y, 10, 14, be, 1.6),
            t.ring(n.x, n.y, 30, -2.4, 10, be, !0);
          break;
        case "pfStrike":
          S.slam(), t.ring(n.x, n.y, 8, 3, 14, be, !0), t.shake(0, 1, 4);
          break;
        case "uturn": {
          S.swing(!0);
          let R = 8;
          for (let W = 0; W <= R; W++)
            t.motes(
              n.x1 + ((n.x2 - n.x1) * W) / R,
              n.y1 + ((n.y2 - n.y1) * W) / R,
              10,
              2,
              be,
              0.6,
            );
          t.popup(n.x2, n.y2 - 30, "U-TURN!", be, !1);
          break;
        }
        case "qa":
          S.dodge(),
            t.dust(
              n.who.x,
              n.who.y,
              6,
              Math.cos(n.who.dir2),
              Math.sin(n.who.dir2),
              1.2,
            ),
            t.popup(n.who.x, n.who.y - 36, "QUICK ATTACK!", "#eef2e6", !1);
          break;
        case "guardUp":
          n.who === D && S.guardUp();
          break;
        case "guardHit":
          S.guardHit(n.smash),
            t.hitSpark(
              n.x,
              n.y - 12,
              n.x - n.who.x,
              n.y - n.who.y,
              n.smash,
              n.who.isCpu ? "#ef5a4f" : L.cool,
            ),
            t.shake(n.x - n.who.x, n.y - n.who.y, n.smash ? 4 : 1.5),
            n.smash &&
              t.popup(n.who.x, n.who.y - 38, "SHIELD CRUSH", "#ffb37a", !1);
          break;
        case "perfectGuard":
          S.parry(),
            (t.impact = 3),
            (t.screenFlash = 2),
            (t.screenFlashColor = "#ffffff"),
            t.ring(n.x, n.y - 12, 8, 3, 16, "#ffffff"),
            t.motes(n.x, n.y, 12, 16, "#ffffff", 1.8),
            t.popup(n.x, n.y - 40, "PARRY!", L.gold, !0),
            t.punch(n.x, n.y, 0.05),
            n.attacker && t.shake(n.attacker.x - n.x, n.attacker.y - n.y, 5);
          break;
        case "guardBreak":
          S.guardBreak(),
            (t.impact = 3),
            t.shake(0, 1, 7),
            t.punch(n.who.x, n.who.y, 0.06),
            t.ring(n.who.x, n.who.y - 12, 6, 3.4, 18, "#ef5a4f"),
            t.motes(
              n.who.x,
              n.who.y,
              14,
              20,
              n.who.isCpu ? "#ef5a4f" : L.cool,
              2.2,
            ),
            t.banner(
              "GUARD BREAK!",
              n.who === D ? "#ef5a4f" : L.gold,
              50,
              n.who === D ? "you're dizzy!" : "free hit!",
            );
          break;
        case "launch":
          S.launch(n.power),
            t.speedLines(
              n.x,
              n.y - 10,
              12,
              n.who === D ? "#ef5a4f" : "#ffffff",
            ),
            n.power > 7 &&
              ((t.impact = Math.max(t.impact, 2)), t.punch(n.x, n.y, 0.06));
          break;
        case "land":
          S.land(),
            t.dust(n.x, n.y, 10, 0, 0, 2),
            t.shake(0, 1, 3),
            t.ring(n.x, n.y, 6, 2, 12, "#e9dcc0", !0),
            (n.who.sqx = 1.4),
            (n.who.sqy = 0.6);
          break;
        case "tech":
          S.tech(),
            t.ring(n.who.x, n.who.y, 4, 2.4, 12, L.cool, !0),
            t.popup(n.who.x, n.who.y - 36, "TECH!", L.cool, !1),
            t.dust(n.who.x, n.who.y, 6, 0, 0, 1.4);
          break;
        case "getup":
          t.dust(n.who.x, n.who.y, 4, 0, 0, 1);
          break;
        case "splat":
          S.wall(),
            S.hit(!0, "none", 1),
            t.shake(-n.nx, -n.ny, 7),
            (t.impact = 2),
            t.punch(n.x, n.y, 0.05),
            t.debris(n.x, n.y, 14, n.nx, n.ny),
            t.ring(n.x, n.y, 4, 2.6, 14, "#ffd25e", !1, 10),
            t.popup(n.who.x, n.who.y - 44, `WALL SPLAT! ${n.dmg}`, L.gold, !0);
          break;
        case "smashStart":
          S.smashCharge(),
            t.dust(n.who.x, n.who.y, 3, 0, 0, 0.6),
            t.glint(n.who, n.who.kit.tall * Bz(n.who) * 0.8, L.gold);
          break;
        case "strike": {
          let R = n.who,
            W = Math.atan2(n.dy, n.dx),
            T = n.reach + n.radius * 0.55,
            Z = n.combo % 2 ? -1 : 1,
            ne = R.x + n.dx * (n.reach + 2),
            ee = R.y + n.dy * (n.reach + 2) - 10;
          if (n.kit === "charizard")
            n.smash
              ? (t.slash(R, W, T + 4, 1.7, 9, 1, "#ff8a3d", 13),
                t.slash(R, W, T - 3, 1.5, 4, 1, "#ffd25e", 11),
                t.flame(ne, ee + 6, W, 6))
              : n.last
                ? t.slash(R, W, T + 2, 2.9, 7, -1, "#ffb347", 12)
                : (t.slash(R, W, T, 0.8, 4, Z, "#ff8a3d", 8),
                  t.claw(ne, ee, W, Z * 0.9, "#ffd25e"));
          else if (n.kit === "venusaur") {
            let J = R.x + n.dx * n.reach,
              Ye2 = R.y + n.dy * n.reach - 8;
            t.slash(
              R,
              W,
              n.reach,
              n.smash ? 0.5 : 0.32,
              n.smash ? 8 : 5,
              Z,
              "#9be36b",
              9,
              -8,
            ),
              t.ring(J, Ye2, 3, n.smash ? 2.6 : 1.8, 9, "#d6ff8a"),
              t.leaves(J, Ye2 + 8, 6, n.smash ? 6 : 3);
          } else
            n.kit === "blastoise"
              ? (t.slash(
                  R,
                  W,
                  T + (n.smash ? 4 : 0),
                  n.smash ? 1.4 : 1.05,
                  n.smash ? 12 : 9,
                  Z,
                  "#8fd0f5",
                  11,
                ),
                t.splash(ne, ee + 10, 6, n.smash ? 10 : 5, n.dx, n.dy),
                n.smash && t.ring(ne, ee + 10, 6, 3, 14, "#8fd0f5", !0))
              : n.kit === "dragapult" &&
                (n.smash
                  ? (t.streaks(R.x, R.y - 10, n.dx, n.dy, 9, be),
                    t.slash(R, W, T, 0.7, 6, 1, "#c9b6ff", 10))
                  : n.last
                    ? (t.slash(R, W, T + 3, 2.6, 6, 1, be, 12),
                      t.slash(R, W, T - 4, 2.2, 2, 1, "#ffffff", 10))
                    : (t.slash(R, W, T, 0.95, 4, Z, "#c9b6ff", 8),
                      t.slash(R, W + Z * 0.25, T - 5, 0.8, 2, Z, be, 8)));
          break;
        }
        case "smashFull":
          S.smashFull(),
            t.ring(n.who.x, n.who.y - 12, 18, -1.2, 12, L.gold),
            t.motes(n.who.x, n.who.y, 12, 8, L.gold, 1.2);
          break;
        case "smashRelease": {
          let R = n.who;
          S.smashRelease(n.charge),
            t.dust(
              R.x - n.dx * 6,
              R.y,
              6 + Math.round(n.charge * 6),
              n.dx,
              n.dy,
              1.4,
            ),
            t.ring(R.x, R.y, 6, 1.8 + n.charge * 1.6, 12, R.kit.color, !0),
            ve(R, R.kit.color, 10),
            n.charge > 0.5 && t.speedLines(R.x, R.y - 10, 8, R.kit.color);
          break;
        }
        case "readyGo":
          t.banner("GO!", L.gold, 40),
            S.go(),
            (t.screenFlash = 2),
            (t.screenFlashColor = "#ffffff");
          break;
      }
    }
    function ve(n, D, R) {
      let W = Ht(n),
        T = n.spinRow >= 0 ? n.spinRow : Math.min(nt(n.facing), W.rows - 1);
      let k = Bz(n);
      t.ghost(W, zt(n, W, e), T, n.x, n.y - n.z - n.mon.ground * k, D, R, k);
    }
    let Ce = -999,
      de = { x: !0, y: !0, assist: !0, kit: "" };
    function Xe() {
      let n = e.player;
      // Charge tells: Solar gathering light, stored Solar glinting, cannon pressure.
      for (let T of e.players) {
        if (T.state === "faint") continue;
        T.state === "solar" &&
          (e.tick % 8 === 0 &&
            t.ring(
              T.x,
              T.y - 14,
              10 + 10 * (1 - T.solarC),
              -1.1,
              10,
              "#ffe27a",
            ),
          e.tick % 3 === 0 && t.motes(T.x, T.y, 18, 1, "#fff6c8", 0.5)),
          (T.slot.solar ?? 0) > 0.05 &&
            T.state !== "solar" &&
            e.tick % 20 === 0 &&
            t.motes(T.x, T.y, 16, 2, "#ffe27a", 0.5),
          T.state === "pump" &&
            !T.pumpAt &&
            e.tick % 3 === 0 &&
            t.splash(
              T.x + Math.cos(T.dir2) * 12,
              T.y + Math.sin(T.dir2) * 12,
              10,
              1 + Math.round(T.cannonC * 3),
              0,
              0,
            );
      }
      for (let T of e.projectiles)
        T.kind === "orb" &&
          e.tick % 2 === 0 &&
          t.motes(T.x, T.y, T.z, 1, T.color, 0.4),
          T.kind === "leaf" &&
            e.tick % 3 === 0 &&
            t.leaves(T.x, T.y, T.z, 1, 0.3),
          T.kind === "wisp" &&
            e.tick % 2 === 0 &&
            t.motes(T.x, T.y, T.z, 1, "#9f8cff", 0.3);
      for (let T of e.dreepy)
        T.state !== "dazed" &&
          T.speed > 3.5 &&
          e.tick % 2 === 0 &&
          t.motes(T.x, T.y, T.z, 1, be, 0.25);
      for (let T of e.bodies()) {
        if (T.hidden || (T.alpha ?? 1) < 0.05) continue;
        let Z = T.kind === "player" ? T : null;
        if (Z?.vanished) {
          Z === n && e.tick % 4 === 0 && t.motes(Z.x, Z.y, 12, 1, be, 0.3);
          continue;
        }
        let ne = Math.hypot(T.kvx, T.kvy);
        if (
          (ne > 2.6 &&
            e.tick % 2 === 0 &&
            T.hitstop === 0 &&
            (ve(T, ne > 4.5 ? L.gold : "#ffffff", 8),
            t.dust(T.x, T.y, 1, T.kvx / ne, T.kvy / ne, 0.5)),
          (T.burnT ?? 0) > 0 && e.tick % 7 === 0 && t.embers(T.x, T.y, 10, 1),
          e.isFlaming(T))
        ) {
          let ee = e.flameDir(T);
          t.flame(
            T.x + Math.cos(ee) * 6,
            T.y + Math.sin(ee) * 6 - 2,
            ee,
            4,
            e.rayLen(T.x, T.y, ee, 1 / 0) + 2,
            !0,
          );
        }
        Z?.state === "qa" && e.tick % 2 === 0 && ve(Z, be, 8);
      }
      for (let T of e.beams)
        e.tick % 2 === 0 &&
          (T.solar !== void 0
            ? T.age < 10 && t.motes(T.x2, T.y2, 9, 3, "#ffe27a", 1.2)
            : t.splash(T.x2, T.y2, 9, 3, T.x2 - T.x1, T.y2 - T.y1));
      let D = n.slot;
      if (
        (e.players.forEach((T, Z) => {
          let ne = T.slot;
          if (T.state === "faint") {
            q(`${Z}-flame`, "flame", !1),
              q(`${Z}-pump`, "pump", !1),
              q(`${Z}-spin`, "spin", !1);
            return;
          }
          T.kit.id === "charizard" &&
            (T.state === "overheat" && e.tick % 3 === 0
              ? t.smoke(T.x, T.y, 16, 1)
              : ne.heat > 70 && e.tick % 6 === 0 && t.smoke(T.x, T.y, 18, 1),
            ne.hp < ne.maxHp * 0.3 &&
              e.tick % 4 === 0 &&
              t.embers(T.x, T.y, 6, 1),
            e.tick % 3 === 0 &&
              T.state !== "flyUp" &&
              t.embers(
                T.x - Math.cos(T.facing) * 9,
                T.y - Math.sin(T.facing) * 4,
                6 + T.z,
                1,
              )),
            T.kit.id === "venusaur" &&
              T.rooted &&
              e.tick % 14 === 0 &&
              t.leaves(T.x, T.y, 1, 1, 0.3),
            T.state === "spin" && e.tick % 2 === 0 && t.splash(T.x, T.y, 2, 2),
            q(`${Z}-flame`, "flame", e.isFlaming(T)),
            q(`${Z}-pump`, "pump", e.isPumping(T)),
            q(`${Z}-spin`, "spin", T.state === "spin");
        }),
        q(
          "a-flame",
          "flame",
          e.assists.some((T) => e.isFlaming(T)),
        ),
        q(
          "a-pump",
          "pump",
          e.assists.some((T) => e.isPumping(T)),
        ),
        e.intro === 69)
      ) {
        let T = e.cpu;
        t.banner(
          "READY?",
          "#eef2e6",
          48,
          e.match.mode === "vs" && T
            ? `Round ${e.match.round} \xB7 vs ${T.kit.name} & ${T.slots[1]?.kit.name ?? ""}`
            : "Training",
        ),
          S.ready(),
          T && S.cry(T.kit.id, 0.35);
      }
      (t.leanX += (n.mvx * 1.1 - t.leanX) * 0.08),
        (t.leanY += (n.mvy * 0.8 - t.leanY) * 0.08);
      let R = D.hp < D.maxHp * 0.25 && e.match.phase === "fight";
      (t.danger += ((R ? 1 : 0) - t.danger) * 0.05),
        R && e.tick % 80 === 0 && S.lowHp(),
        n.kit.id === "charizard" &&
          D.heat > 85 &&
          e.tick % 16 === 0 &&
          S.heatWarn();
      let W = {
        x: n.kit.id === "dragapult" ? D.horns.includes("loaded") : D.cdX === 0,
        y: D.cdY === 0,
        assist: n.assistCd === 0,
        kit: n.kit.id,
      };
      de.kit === W.kit &&
        (W.x && !de.x && ((s.chipFlash.x = 16), S.cdReady()),
        W.y &&
          !de.y &&
          ((s.chipFlash.y = 16),
          S.cdReady(),
          t.motes(n.x, n.y, 14, 4, "#ffffff", 0.6))),
        W.assist && !de.assist && ((s.chipFlash.assist = 16), S.cdReady()),
        Object.assign(de, W),
        s.hintT > 0 && s.playTicks > 600 && s.hintT--;
    }
    let De = 0,
      st = performance.now();
    function it(n) {
      let D = Math.min(100, n - st);
      (st = n), la();
      let R = [1, 0.5, 0.25][A.slowmo] ?? 1,
        W = s.screen === "play" && !s.paused && e.match.phase !== "results";
      De += D * (W ? e.timeScale() * R : 1);
      let T = 0;
      for (; De >= Ut && T < 5; ) {
        (De -= Ut), T++;
        let ee = ha();
        if (
          (k && p && (ee.pressed.clear(), (k = !1)),
          (s.source = ee.source),
          s.toastT > 0 && s.toastT--,
          !!p)
        ) {
          if (s.screen === "title") {
            [
              "confirm",
              "start",
              "attack",
              "dodge",
              "special1",
              "special2",
            ].some((Je) => ee.pressed.has(Je)) && x(!1);
            continue;
          }
          if (s.screen === "select") {
            U(ee), re();
            continue;
          }
          if (
            (ee.pressed.has("select") && ((s.debug = !s.debug), S.ui(s.debug)),
            s.paused)
          ) {
            we(ee);
            continue;
          }
          if (e.match.phase === "results") {
            Yt(ee), t.tick();
            continue;
          }
          if (ee.pressed.has("start")) {
            ce();
            continue;
          }
          s.playTicks++, e.step(ee);
          for (let Je of e.events) Ne(Je);
          Xe(), t.tick();
        }
      }
      T === 5 && (De = 0);
      let Z = W ? De / Ut : 1,
        ne = s.screen === "play";
      !ne || e.match.phase !== "fight"
        ? t.follow([])
        : e.players.some((ee) => ee.vanished) ||
          t.follow(
            e
              .bodies()
              .filter(
                (ee) =>
                  ee.kind !== "assist" &&
                  !ee.hidden &&
                  !(ee.kind === "player" && ee.state === "faint"),
              )
              .map((ee) => ({ x: ee.x, y: ee.y - ee.z * 0.5 })),
          ),
        t.computeView(),
        fa(f, e, t, Z, !ne),
        Ca(u, e, t, s, h, Z, a),
        requestAnimationFrame(it);
    }
    requestAnimationFrame(it);
  }
  Ms().catch((a) => {
    console.error(a);
    let e = document.getElementById("title");
    e &&
      ((e.textContent = `Failed to load: ${String(a?.message ?? a)}`),
      (e.style.color = "#fff"));
  });
})();
