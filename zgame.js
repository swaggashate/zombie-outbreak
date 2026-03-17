// Search ====================
resolveExploration
//============================

const zombieTypes = {
  walker: {
    name: "Walker",
    maxHP: 40,
    attack: 4,
    speed: 2,
    ability: null,
    dodgeChance: 0.05,
    image: "./assets/classic-zombie.png",
  },
  runner: {
    name: "Runner",
    maxHP: 30,
    attack: 8,
    speed: 5,
    ability: "doubleTurnChance",
    dodgeChance: 0.15,
    image: "./assets/runner-zombie.png",
  },
  brute: {
    name: "Brute",
    maxHP: 80,
    attack: 12,
    speed: 1,
    ability: "armor",
    dodgeChance: 0.02,
    image: "./assets/brute-zombie.png",
  }
};

const bossTypes = {
  theButcher: {
    name: "The Butcher",
    maxHP: 150,
    attack: 15,
    speed: 2,
    dodgeChance: 0.05,
    ability: "enrage",
    enrageAt: 0.3,
    image: "./assets/butcher-zombie.png",
  }
};

const humanEnemyTypes = {
  scavenger: {
    name: "Scavenger",
    maxHP: 25,
    attack: 5,
    speed: 4,
    dodgeChance: 0.25,
    ability: null,
    isHuman: true,
    image: "./assets/scavenger.png",
    dropTable: () => {
      const pool = ["scrapMetal", "cloth", "ductTape", "chemicals", "pistolAmmo", "shotgunAmmo", "arAmmo"];
      return pool[Math.floor(Math.random() * pool.length)];
    }
  },
  raider: {
    name: "Raider",
    maxHP: 60,
    attack: 10,
    speed: 3,
    dodgeChance: 0.08,
    ability: null,
    isHuman: true,
    image: "./assets/raider.png",
    dropTable: () => {
      return Math.random() < 0.3 ? "usedArmorPlate" : "scrapMetal";
    }
  },
  tank: {
    name: "Tank",
    maxHP: 120,
    attack: 18,
    speed: 1,
    dodgeChance: 0,
    ability: null,
    isHuman: true,
    image: "./assets/tank.png",
    dropTable: () => {
      return Math.random() < 0.5 ? "guaranteedWeapon" : "fullArmorPlate";
    }
  },
};

const humanBossTypes = {
  ringleader: {
    name: "The Ringleader",
    maxHP: 140,
    attack: 14,
    speed: 3,
    dodgeChance: 0.15,
    ability: "stagger", // chance to stagger you - next attack is guaranteed crit
    doubleTurnChance: 0.2,
    isHuman: true,
    isBoss: true,
    image: "./assets/ringleader.png",
  }
};

const specialLocations = {
  scienceLab: {
    name: "Science Lab",
    lootTable: ["medkit", "bandage"],
    materialTable: ["chemicals", "scrapMetal"],
    zombieChance: 0.6,
    rareEnemyChance: 0.08,
    bgImage: "./assets/sciencebg.png",
    weaponFindChance: 0.06,
    weaponTable: ["combatKnife", "machete"],
    armorDropChance: 0.10,
    waveType: "zombie"
  },
  militaryBase: {
    name: "Military Base",
    lootTable: ["arAmmo", "shotgunAmmo", "pistolAmmo", "medkit"],
    materialTable: ["scrapMetal", "ductTape", "chemicals"],
    zombieChance: 0.7,
    rareEnemyChance: 0.12,
    bgImage: "./assets/militarybg.png",
    weaponFindChance: 0.10,
    weaponTable: ["ar", "shotgun", "katana"],
    armorDropChance: 0.12,
    waveType: "zombie",
  },
  outpost: {
    name: "Outpost",
    lootTable: ["medkit", "bandage", "food", "pistolAmmo", "shotgunAmmo", "arAmmo"],
    materialTable: ["scrapMetal", "ductTape", "cloth"],
    zombieChance: 0,
    rareEnemyChance: 0,
    bgImage: "./assets/outpostbg.png",
    weaponFindChance: 0.7,
    weaponTable: ["machete", "shotgun", "combatKnife", "pistol"],
    armorDropChance: 0.09,
    waveType: "human",
  },
  scrapyard: {
    name: "Scrapyard Settlement",
    lootTable: ["food", "bandage", "shotgunAmmo", "arAmmo"],
    materialTable: ["scrapMetal", "scrapMetal", "ductTape", "cloth"],
    zombieChance: 0,
    rareEnemyChance: 0,
    bgImage: "./assets/scrapyardbg.png",
    weaponFindChance: 0.08,
    weaponTable: ["bat", "machete", "katana"],
    armorDropChance: 0.10,
    waveType: "human",
  },
};

const weapons = {
  // GUNS
  pistol: {
    name: "Pistol",
    type: "ranged",
    slot: "gun",
    damage: 12,
    critChance: 0.15,
    maxAmmo: 6
  },
  shotgun: {
    name: "Shotgun",
    type: "ranged",
    slot: "gun",
    damage: 25,
    critChance: 0.10,
    maxAmmo: 2
  },
  ar: {
    name: "AR-15",
    type: "ranged",
    slot: "gun",
    damage: 15,
    critChance: 0.12,
    maxAmmo: 30
  },
  flamethrower: {
    name: "Flamethrower",
    type: "ranged",
    slot: "gun",
    damage: 18,
    critChance: 0.05,
    maxAmmo: 10
  },

  // MELEE
  bat: {
    name: "Baseball Bat",
    type: "melee",
    slot: "melee",
    damage: 8,
    critChance: 0.05,
    maxDurability: 100,
    radiusRisk: 0.15
  },
  katana: {
    name: "Katana",
    type: "melee",
    slot: "melee",
    damage: 18,
    critChance: 0.20,
    maxDurability: 80,
    radiusRisk: 0.08
  },
  machete: {
    name: "Machete",
    type: "melee",
    slot: "melee",
    damage: 14,
    critChance: 0.10,
    maxDurability: 90,
    radiusRisk: 0.10
  },
  combatKnife: {
    name: "Combat Knife",
    type: "melee",
    slot: "melee",
    damage: 10,
    critChance: 0.15,
    maxDurability: 120,
    radiusRisk: 0.25
  }
};

const itemDefs = {
  medkit: { name: "Medkit", type: "heal", value: 30 },
  bandage: { name: "Bandage", type: "heal", value: 12 },
  food: { name: "Canned Food", type: "heal", value: 15 },
  pistolAmmo: { name: "Pistol Ammo", type: "ammo", value: 6 },
  shotgunAmmo: { name: "Shotgun Ammo", type: "ammo", value: 2 },
  arAmmo: { name: "AR Ammo", type: "ammo", value: 30},
  armorPlate: { name: "Armor Plate", type: "armor", value: 1 },
  map: { name: "Map", type: "special", value: 0 }
};

const locations = {
  hospital: {
    name: "Hospital",
    lootTable: ["medkit", "bandage", "food"],
    materialTable: ["cloth", "chemicals"],
    zombieChance: 0.4,
    rareEnemyChance: 0.05,
    bgImage: "./assets/hospitalbg.png",
    weaponFindChance: 0.05,
    weaponTable: ["combatKnife", "machete"],
    armorDropChance: 0.08
  },
  policeStation: {
    name: "Police Station",
    lootTable: ["pistolAmmo", "shotgunAmmo", "arAmmo", "medkit"],
    materialTable: ["scrapMetal", "ductTape"],
    zombieChance: 0.6,
    rareEnemyChance: 0.1,
    bgImage: "./assets/stationbg.png",
    weaponFindChance: 0.08,
    weaponTable: ["shotgun", "ar"],
    armorDropChance: 0.10
  },
  supermarket: {
    name: "Supermarket",
    lootTable: ["food", "bandage", "medkit"],
    materialTable: ["ductTape", "cloth", "chemicals"],
    zombieChance: 0.3,
    rareEnemyChance: 0.03,
    bgImage: "./assets/marketbg.png",
    weaponFindChance: 0.04,
    weaponTable: ["bat", "combatKnife"],
    armorDropChance: 0.06
  },
  apartment: {
    name: "Apartment Complex",
    lootTable: ["food", "medkit", "bandage", "pistolAmmo", "shotgunAmmo", "arAmmo"],
    materialTable: ["cloth", "scrapMetal", "ductTape", "chemicals"],
    zombieChance: 0.35,
    rareEnemyChance: 0.04,
    bgImage: "./assets/apartmentbg.png",
    weaponFindChance: 0.05,
    weaponTable: ["machete", "katana", "bat", "combatKnife"],
    armorDropChance: 0.09
  }
};

const materialDefs = {
  scrapMetal: { name: "Scrap Metal" },
  cloth: { name: "Cloth" },
  chemicals: { name: "Chemicals" },
  ductTape: { name: "Duct Tape" }
};

const dismantleRecipes = {
  medkit: { cloth: 1, chemicals: 1 },
  bandage: { cloth: 1, ductTape: 1 },
  pistolAmmo: { scrapMetal: 1 },
  shotgunAmmo: { scrapMetal: 1 },
  arAmmo: { scrapMetal: 1 },
  food: { scrapMetal: 1 },
};

const armorModDefs = {
  spikedPads: { name: "Spiked Pads", desc: "Attackers take 2-4 damage when they hit you", cost: { scrapMetal: 5, cloth: 5 } },
  biteGuard: { name: "Bite Guard", desc: "First hit each battle does -50% damage", cost: { scrapMetal: 5, cloth: 5 } },
  shockPadding: { name: "Shock Padding", desc: "Prevents runner double attack once per battle", cost: { scrapMetal: 5, cloth: 5 } },
  medicPouch: { name: "Medic Pouch", desc: "Healing items heal +10% more (stacks with Field Medic)", cost: { scrapMetal: 5, cloth: 5 } },
  scavSling: { name: "Scav Sling", desc: "+1 inventory slot", cost: { scrapMetal: 5, cloth: 5 } }
};

const weaponUpgrades = {
  pistol: {
    label: "Pistol",
    tiers: [
      {
        name: "T1: Extended Mag",
        desc: "maxAmmo +2",
        unlockCondition: function () { return true; },
        apply: function (w) { w.maxAmmo += 2; w.currentAmmo = w.maxAmmo; }
      },
      {
        name: "T2: Deadeye Kit",
        desc: "critChance +8%",
        unlockCondition: function () { return true; },
        apply: function (w) { w.critChance += 0.08; }
      },
      {
        name: "T3: Last Word",
        desc: "Killing blow refunds 2 ammo",
        unlockCondition: function () { return true; },
        apply: function (w) { w.lastWord = true; }
      }
    ]
  },
  shotgun: {
    label: "Shotgun",
    tiers: [
      {
        name: "T1: Reinforced Action",
        desc: "First shot on an enemy does 75% more damage",
        unlockCondition: function () {
          return game.waveNumber >= 5 || killTracker.runnerKills >= 1;
        },
        lockReason: "Clear Wave 5 or defeat a Runner",
        apply: function (w) { w.reinforcedAction = true; }
      },
      {
        name: "T2: Breacher Rounds",
        desc: "25% chance to Stun (skip enemy turn)",
        unlockCondition: function () {
          return game.waveNumber >= 8 || killTracker.runnerKills >= 3;
        },
        lockReason: "Clear Wave 8 or defeat 3 Runners",
        apply: function (w) { w.breacherRounds = true; }
      },
      {
        name: "T3: Thunderclap",
        desc: "Knockback (cancels runner extra hit) + guaranteed stagger (crit if next attack is melee)",
        unlockCondition: function () {
          return game.waveNumber >= 12 || killTracker.bossKills >= 1;
        },
        lockReason: "Clear Wave 12 or defeat a Boss",
        apply: function (w) { w.thunderclap = true; }
      }
    ]
  },
  ar: {
    label: "AR-15",
    tiers: [
      {
        name: "T1: Larger Mag",
        desc: "maxAmmo +10",
        unlockCondition: function () {
          return game.waveNumber >= 10 || killTracker.bruteKills >= 1;
        },
        lockReason: "Clear Wave 10 or defeat a Brute",
        apply: function (w) { w.maxAmmo += 10; w.currentAmmo = w.maxAmmo; }
      },
      {
        name: "T2: Controlled Burst",
        desc: "Shoot 2 turns in a row",
        unlockCondition: function () {
          return game.waveNumber >= 13 || killTracker.bruteKills >= 3;
        },
        lockReason: "Clear Wave 13 or defeat 3 Brutes",
        apply: function (w) { w.controlledBurst = true; }
      },
      {
        name: "T3: Sawtooth Feed",
        desc: "Shots have 20% chance to ignore enemy dodge",
        unlockCondition: function () {
          return game.waveNumber >= 17 || killTracker.bossKills >= 3;
        },
        lockReason: "Clear Wave 17 or defeat 3 Bosses",
        apply: function (w) { w.sawtoothFeed = true; }
      }
    ]
  }
};

const skillDefs = {
  evasion: { name: "Evasion", max: 10, desc: "+2% dodge chance per point (cap 25%)" },
  quickStep: { name: "Quick Step", max: 5, desc: "+2% double-turn chance per point" },
  toughness: { name: "Toughness", max: Infinity, desc: "+10 max HP per point (no cap)" },
  critTraining: { name: "Critical Training", max: 5, desc: "+1.5% crit chance per point" },
  fieldMedic: { name: "Field Medic", max: 5, desc: "+15% healing effectiveness per point" },
  scavenger: { name: "Scavenger", max: 5, desc: "+10% chance for bonus loot per point" },
  adrenaline: { name: "Adrenaline", max: 3, desc: "Below 30% HP: +5% dodge & +10% dmg per point" },
  armorCapacity: { name: "Armor Capacity", max: 1, desc: "Spend 2 SP: max armor plates 3 → 5 (costs 2 points)" },
  aggression: { name: "Aggression", max: Infinity, desc: "+2% overall damage increase per point (no cap)"}
};

const player_materials = {
  scrapMetal: 0,
  cloth: 0,
  chemicals: 0,
  ductTape: 0
};

const player = {
  hp: 100,
  maxHP: 100,
  dodgeChance: 0.05,
  doubleTurnChance: 0,
  xp: 0,
  level: 1,
  skillPoints: 0,
  skills: {
    evasion: 0,        // max 10 → +2% dodge per point, cap 25%
    quickStep: 0,       // max 5  → +2% double-turn per point
    toughness: 0,       // no cap → +10 maxHP per point
    critTraining: 0,    // max 5  → +1.5% crit per point (applied to weapon)
    fieldMedic: 0,      // max 5  → +15% heal effectiveness per point
    scavenger: 0,       // max 5  → +10% chance for bonus loot per point
    adrenaline: 0,       // max 3  → below 30% HP: +5% dodge & +10% damage per point
    armorCapacity: 0,    // increases armor holding capacity - one upgrade
    aggression: 0,
  }
};

// Armor State
const armor = {
  plates: [],
  biteGuardUsed: false,
  shockPaddingUsed: false,
  t3DodgeBoostActive: false
};

// Returns maxArmor for current tier
function getArmorTierMax() {
  if (armor.tier === 1) return 15;
  if (armor.tier === 2) return 30;
  return 45;
}

// Kill Tracker (for weapon unlock conditions)
const killTracker = {
  runnerKills: 0,
  bruteKills: 0,
  bossKills: 0
};

// Weapon Upgrade State
// Tracks which tier each weapon is upgraded to (0 = no upgrades purchased)
const weaponUpgradeState = {
  pistol: { currentTier: 0 },
  shotgun: { currentTier: 0 },
  ar: { currentTier: 0 }
};

let upgradeUsedThisVisit = false;

const inventory = {
  gun: null,
  slots: [null, null, null, null, null, null]
};

const game = {
  phase: "exploration",
  waveNumber: 1,
  lastLocationKey: null,
  currentEnemies: [],
  currentEnemyIndex: 0,
  isBossWave: false,
  explorationDone: false,
  hasMap: false,
  specialLocationAvailable: false,
  currentWaveType: "zombie",
};

let battleLog = [];
let explorationLog = [];
let dismantleMode = false;
let dismantlePendingSlot = null;
let dismantleQty = 1;

let shotFiredAtCurrentEnemy = false;  // for Reinforced Action (first shot bonus)
let controlledBurstActive = false;    // for AR T2 (shoot twice)
let guaranteedCrit = false;           // for Thunderclap stagger

function createZombie(typeId, waveNumber) {
  const template = zombieTypes[typeId];
  return {
    ...template,
    typeId: typeId,
    hp: Math.floor(template.maxHP * (1 + (waveNumber - 1) * 0.1)),
    maxHP: Math.floor(template.maxHP * (1 + (waveNumber - 1) * 0.1)),
    attack: Math.floor(template.attack * (1 + (waveNumber - 1) * 0.05)),
    isRare: false,
    isBoss: false
  };
}

function createRareZombie(typeId, waveNumber) {
  const zombie = createZombie(typeId, waveNumber);
  zombie.name = "Rare " + zombie.name;
  zombie.hp = Math.floor(zombie.hp * 1.5);
  zombie.maxHP = Math.floor(zombie.maxHP * 1.5);
  zombie.attack = Math.floor(zombie.attack * 1.3);
  zombie.isRare = true;
  return zombie;
}

function createBoss(waveNumber) {
  const template = bossTypes.theButcher;
  return {
    ...template,
    hp: Math.floor(template.maxHP * (1 + (waveNumber - 1) * 0.1)),
    maxHP: Math.floor(template.maxHP * (1 + (waveNumber - 1) * 0.1)),
    attack: Math.floor(template.attack * (1 + (waveNumber - 1) * 0.05)),
    isBoss: true,
    isRare: false,
    enraged: false,
  };
}

// HUMAN ENEMY CREATION
function createHumanEnemy(typeId, waveNumber) {
  const template = humanEnemyTypes[typeId];
  return {
    ...template,
    typeId: typeId,
    hp: Math.floor(template.maxHP * (1 + (waveNumber - 1) * 0.08)),
    maxHP: Math.floor(template.maxHP * (1 + (waveNumber - 1) * 0.08)),
    attack: Math.floor(template.attack * (1 + (waveNumber - 1) * 0.05)),
    isRare: false,
    isBoss: false,
    isHuman: true
  };
}

function createHumanBoss(waveNumber) {
  const template = humanBossTypes.ringleader;
  return {
    ...template,
    hp: Math.floor(template.maxHP * (1 + (waveNumber - 1) * 0.1)),
    maxHP: Math.floor(template.maxHP * (1 + (waveNumber - 1) * 0.1)),
    attack: Math.floor(template.attack * (1 + (waveNumber - 1) * 0.05)),
    isBoss: true,
    isRare: false,
    isHuman: true,
    enraged: false,
    staggerActive: false // when true, next ringleader attack is guaranteed crit
  };
}

// Generate a human wave (for special locations)
function generateHumanWave(waveNumber) {
  if (waveNumber % 5 === 0 && Math.random() < 0.5) {
    return [createHumanBoss(waveNumber)];
  }

  const count = 2 + Math.floor(waveNumber / 3);
  const typePool = ["scavenger", "raider"];
  if (waveNumber >= 5) typePool.push("tank");

  const enemies = [];
  for (let i = 0; i < count; i++) {
    const typeId = typePool[Math.floor(Math.random() * typePool.length)];
    enemies.push(createHumanEnemy(typeId, waveNumber));
  }
  return enemies;
}

// Handle human enemy drops after defeat
function handleHumanDrop(enemy) {
  if (!game.hasMap && Math.random() < 0.10) {
    game.hasMap = true;
    game.specialLocationAvailable = true;
    logBattle("🗺️ Found a Map! Special locations will appear on your next exploration.");
  }

  if (enemy.isBoss) {
    return;
  }

  const template = humanEnemyTypes[enemy.typeId];
  if (!template || !template.dropTable) return;

  const drop = template.dropTable();

  if (drop === "usedArmorPlate") {
    addFoundPlate(true);
    logBattle("🛡️ The " + enemy.name + " dropped a used armor plate!");
  } else if (drop === "fullArmorPlate") {
    addFoundPlate(false);
    logBattle("🛡️ The " + enemy.name + " dropped a full armor plate!");
  } else if (drop === "guaranteedWeapon") {
    const weaponPool = ["shotgun", "ar", "katana", "machete", "combatKnife"];
    const foundKey = weaponPool[Math.floor(Math.random() * weaponPool.length)];
    logBattle("🔥 The " + enemy.name + " dropped a " + weapons[foundKey].name + "!");
    showWeaponSwapPopup(foundKey);
  } else if (["scrapMetal", "cloth", "ductTape", "chemicals"].includes(drop)) {
    const amount = 1 + Math.floor(Math.random() * 2);
    player_materials[drop] += amount;
    logBattle("🔩 The " + enemy.name + " dropped " + amount + " " + materialDefs[drop].name);
  } else if (["pistolAmmo", "shotgunAmmo", "arAmmo"].includes(drop)) {
    addItem(drop);
    logBattle("📦 The " + enemy.name + " dropped " + itemDefs[drop].name);
  }
}

function xpToNextLevel() {
  return player.level * 50;
}

function checkLevelUp() {
  while (player.xp >= xpToNextLevel()) {
    player.xp -= xpToNextLevel();
    player.level++;
    player.skillPoints++;
    logBattle("🎉 LEVEL UP! Level " + player.level + " — Skill point earned!");
  }
}

function applySkills() {
  // Evasion: base 5% + 2% per point, cap 25%
  player.dodgeChance = Math.min(0.05 + (player.skills.evasion * 0.02), 0.25);

  // Quick Step
  player.doubleTurnChance = player.skills.quickStep * 0.02;

  // Toughness: increase max HP (and heal the difference)
  const newMax = 100 + (player.skills.toughness * 10);
  const diff = newMax - player.maxHP;
  player.maxHP = newMax;
  if (diff > 0) player.hp += diff;

  if (player.skills.armorCapacity >= 1) {
    armor.maxPlates = 5;
  }
}

// Get the front (active) plate
function getActivePlate() {
  return armor.plates.length > 0 ? armor.plates[0] : null;
}

// Apply damage through armor: 70% to armor, 30% to HP
// If no armor, 100% to HP
function applyDamageWithArmor(rawDamage) {
  // Bite Guard check: first hit each battle does -50%
  if (armor.activeMod === "biteGuard" && !armor.biteGuardUsed) {
    rawDamage = Math.floor(rawDamage * 0.5);
    armor.biteGuardUsed = true;
    logBattle("🛡️ Bite Guard absorbs half the blow!");
  }

  const plate = getActivePlate();
  if (!plate) {
    player.hp -= rawDamage;
    if (player.hp < 0) player.hp = 0;
    return rawDamage;
  }

  const armorDmg = Math.floor(rawDamage * 0.70);
  const hpDmg = rawDamage - armorDmg;

  plate.currentArmor -= armorDmg;

  player.hp -= hpDmg;
  if (player.hp < 0) player.hp = 0;

  if (plate.currentArmor <= 0) {
    armor.plates.shift();
    logBattle("💥 Armor plate destroyed!");

    if (armor.tier >= 3) {
      armor.t3DodgeBoostActive = true;
      player.dodgeChance += 0.10;
      logBattle("⚡ Broken plate triggers evasion boost! +10% dodge this turn");
    }
  }

  // Spiked Pads: reflect 2-4 damage to attacker
  // (handled in enemyTurn after damage is applied)

  return rawDamage;
}

// Craft a new plate at full durability
function craftArmorPlate() {
  if (armor.plates.length >= armor.maxPlates) {
    logExploration("Already at max plates!");
    return false;
  }
  if (player_materials.scrapMetal < 3) {
    logExploration("Not enough Scrap Metal (need 3).");
    return false;
  }
  player_materials.scrapMetal -= 3;
  armor.plates.push({ currentArmor: getArmorTierMax() });
  return true;
}

// Repair all plates to full
function repairAllPlates() {
  if (armor.plates.length === 0) return false;
  if (player_materials.ductTape < 2) return false;

  let anyDamaged = false;
  const max = getArmorTierMax();
  armor.plates.forEach(function (p) {
    if (p.currentArmor < max) anyDamaged = true;
  });
  if (!anyDamaged) return false;

  player_materials.ductTape -= 2;
  armor.plates.forEach(function (p) {
    p.currentArmor = max;
  });
  return true;
}

// If at max plates, convert found plate to scrap metal based on durability %
function addFoundPlate(used) {
  const max = getArmorTierMax();
  const hp = used ? Math.floor(max * (0.3 + Math.random() * 0.4)) : max;

  if (armor.plates.length >= armor.maxPlates) {
    // Convert to scrap metal: 8 scrap for a full plate, scaled by durability %
    const durabilityPercent = hp / max;
    const scrapGained = Math.max(1, Math.floor(8 * durabilityPercent));
    player_materials.scrapMetal += scrapGained;
    logExploration("🛡️ Found a " + (used ? "used" : "full") + " armor plate but at max capacity!");
    logExploration("🔩 Scrapped it for " + scrapGained + " Scrap Metal (" + Math.round(durabilityPercent * 100) + "% durability)");
    return false;
  }

  armor.plates.push({ currentArmor: hp });
  logExploration("🛡️ Found an armor plate! (" + (used ? "used" : "full") + ")");
  return true;
}

function generateWave(waveNumber) {
  if (isBossWave(waveNumber) && game.currentWaveType === "zombie") {
    return [createBoss(waveNumber)];
  }

  // Human wave (special locations)
  if (game.currentWaveType === "human") {
    return generateHumanWave(waveNumber);
  }

  // Zombie wave with chance for 1-2 human enemies
  const count = 1 + Math.floor(waveNumber / 2);
  const typePool = ["walker"];

  if (waveNumber >= 3) typePool.push("runner");
  if (waveNumber >= 6) typePool.push("brute");

  const enemies = [];
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * typePool.length);
    const typeId = typePool[randomIndex];
    enemies.push(createZombie(typeId, waveNumber));
  }

  // Chance to add 1-2 human enemies to zombie waves (not boss waves)
  if (!isBossWave(waveNumber) && Math.random() < 0.3) {
    const humanCount = 1 + Math.floor(Math.random() * 2);
    const humanPool = ["scavenger", "raider"];
    if (waveNumber >= 8) humanPool.push("tank");
    for (let i = 0; i < humanCount; i++) {
      const hTypeId = humanPool[Math.floor(Math.random() * humanPool.length)];
      enemies.push(createHumanEnemy(hTypeId, waveNumber));
    }
    logBattle("⚠ Human enemies spotted among the horde!");
  }

  return enemies;
}

function isBossWave(waveNumber) {
  return waveNumber % 5 === 0;
}

function calculateAttack(attacker, defender, weapon) {
  // Sawtooth Feed: AR T3 — 20% chance to ignore dodge
  let dodgeChance = defender.dodgeChance;
  if (attacker === player && weapon.sawtoothFeed && Math.random() < 0.20) {
    dodgeChance = 0;
    logBattle("🔪 Sawtooth Feed ignores dodge!");
  }

  if (Math.random() < dodgeChance) {
    return { dodged: true };
  }

  let damage = weapon.damage;
  let critChance = weapon.critChance;

  // If player is attacking, apply critTraining
  if (attacker === player) {
    critChance += player.skills.critTraining * 0.015;

    // Guaranteed crit from Thunderclap stagger
    if (guaranteedCrit) {
      critChance = 1.0;
      guaranteedCrit = false;
      logBattle("💥 Stagger! Melee next for a guaranteed critical hit!");
    }
  }

  const isCrit = Math.random() < critChance;
  if (isCrit) {
    damage *= 2;
  }

  return { dodged: false, damage, isCrit };
}

function equipWeapon(weaponKey) {
  const template = weapons[weaponKey];
  const instance = {
    ...template,
    key: weaponKey,
    currentAmmo: template.type === "ranged" ? template.maxAmmo : null,
    currentDurability: template.type === "melee" ? template.maxDurability : null
  };

  // Re-apply any purchased upgrades to this weapon
  reapplyWeaponUpgrades(instance);

  if (template.slot === "gun") {
    inventory.gun = instance;
  } else if (template.slot === "melee") {
    inventory.melee = instance;
  }
}

// When equipping a weapon, re-apply all purchased upgrade tiers
function reapplyWeaponUpgrades(weaponInstance) {
  const key = weaponInstance.key;
  const track = weaponUpgrades[key];
  if (!track) return;

  const state = weaponUpgradeState[key];
  if (!state) return;

  for (let i = 0; i < state.currentTier; i++) {
    track.tiers[i].apply(weaponInstance);
  }
}

function getMaxSlots() {
  // Base 6, +1 if Scav Sling mod is active
  return 6 + (armor.activeMod === "scavSling" ? 1 : 0);
}

function addItem(itemId) {
  const existing = inventory.slots.find(
    slot => slot && slot.id === itemId
  );

  // Maps cannot stack
  if (itemId === "map") {
    const emptySlot = inventory.slots.findIndex(s => s === null);

    if (emptySlot === -1) {
      logExploration("🗺️ Found a Map, but inventory is full!");
      return false;
    }

    inventory.slots[emptySlot] = {
      id: "map",
      quantity: 1
    };

    logExploration("🗺️ Found a Map!");
    renderInventory();
    return true;
  }

  if (existing) {
    existing.quantity++;
    return true;
  }

  const maxSlots = getMaxSlots();
  // Find first empty slot within allowed range
  for (let i = 0; i < maxSlots; i++) {
    if (i >= inventory.slots.length) {
      // Expand slots array if Scav Sling added a slot
      inventory.slots.push(null);
    }
    if (inventory.slots[i] === null) {
      inventory.slots[i] = { id: itemId, quantity: 1 };
      return true;
    }
  }

  logExploration("Inventory full! Couldn't pick up " + itemDefs[itemId].name);
  return false;
}

function useItem(slotIndex) {
  // Only allow item use during battle (HP/ammo refill at base now)
  if (game.phase !== "battle") return;

  const slot = inventory.slots[slotIndex];
  if (!slot) return;

  const def = itemDefs[slot.id];
  if (!def) return;

  // Only allow heal and ammo items
  if (def.type !== "heal" && def.type !== "ammo") return;

  const logFn = game.phase === "battle" ? logBattle : logExploration;

  if (def.type === "heal") {
    let healBonus = 1 + (player.skills.fieldMedic * 0.15);
    // Medic Pouch mod: +10% more healing
    if (armor.activeMod === "medicPouch") {
      healBonus += 0.10;
    }
    const healAmount = Math.floor(def.value * healBonus);
    player.hp = Math.min(player.hp + healAmount, player.maxHP);
    logFn("Used " + def.name + " — healed " + healAmount + " HP");
  }

  // Ammo items fill mag to max. Also check ammo matches gun type.
  if (def.type === "ammo") {
    if (inventory.gun) {
      // Check ammo matches gun
      const gunKey = inventory.gun.key;
      const validAmmo =
        (gunKey === "pistol" && slot.id === "pistolAmmo") ||
        (gunKey === "shotgun" && slot.id === "shotgunAmmo") ||
        (gunKey === "ar" && slot.id === "arAmmo");

      if (!validAmmo) {
        logFn("Wrong ammo type for your " + inventory.gun.name + "!");
        return;
      }

      inventory.gun.currentAmmo = inventory.gun.maxAmmo;
      logFn("Used " + def.name + " — fully reloaded " + inventory.gun.name + " (" + inventory.gun.maxAmmo + "/" + inventory.gun.maxAmmo + ")");
    } else {
      logFn("No gun equipped to reload!");
      return;
    }
  }

  slot.quantity--;
  if (slot.quantity <= 0) {
    inventory.slots[slotIndex] = null;
  }

  renderAll();

  // Only trigger enemy turn if in battle
  if (game.phase === "battle") {
    enemyTurn();
  }
}

function getAvailableLocations() {
  return Object.entries(locations).filter(function ([key]) {
    return key !== game.lastLocationKey;
  });
}


function logBattle(message) {
  battleLog.push(message);
  renderBattleLog();
}

function logExploration(message) {
  explorationLog.push(message);
  renderExplorationLog();
}


function resolveExploration(locationKey) {
  const location = locations[locationKey] || specialLocations[locationKey];
  if (!location) return;

  // If this is a normal location, set wave type to zombie
  if (locations[locationKey]) {
    game.currentWaveType = "zombie";
  }

  game.lastLocationKey = locationKey;

  explorationLog = [];
  logExploration("Scavenging " + location.name + "...");

  const lootTable = location.lootTable;

  const dropChances = [
    { drops: 1, chance: 0.4 },
    { drops: 2, chance: 0.3 },
    { drops: 3, chance: 0.2 },
    { drops: 4, chance: 0.1 }
  ];

  // Roll the number of drops
  let rand = Math.random();
  let numDrops = 1; // default
  let cumulative = 0;
  for (const chance of dropChances) {
    cumulative += chance.chance;
    if (rand < cumulative) {
      numDrops = chance.drops;
      break;
    }
  }

  // Roll drops and show item names in log

  let foundItems = [];

  for (let i = 0; i < numDrops; i++) {

    const randomItem = lootTable[Math.floor(Math.random() * lootTable.length)];

    if (addItem(randomItem)) {
      const def = itemDefs[randomItem];
      foundItems.push(def ? def.name : randomItem);
    }

  }

  // Log all items found
  if (foundItems.length > 0) {
    logExploration("Found: " + foundItems.join(", "));
  } else {
    logExploration("Found items, but inventory is full!");
  }

  // Scavenger bonus
  const scavengerChance = player.skills.scavenger * 0.10;
  if (Math.random() < scavengerChance) {
    const bonusItem = lootTable[Math.floor(Math.random() * lootTable.length)];
    addItem(bonusItem);
    logExploration("🔍 Scavenger instinct! Found an extra item!");
  }

  // Material drop — roll system (less rare than loot table)
  const matTable = location.materialTable;

  const materialDropChances = [
    { drops: 1, chance: 0.20 },
    { drops: 2, chance: 0.35 },
    { drops: 3, chance: 0.30 },
    { drops: 4, chance: 0.15 }
  ];

  let matRand = Math.random();
  let numMatDrops = 1;
  let matCumulative = 0;
  for (const mc of materialDropChances) {
    matCumulative += mc.chance;
    if (matRand < matCumulative) {
      numMatDrops = mc.drops;
      break;
    }
  }

  let foundMaterials = [];

  for (let i = 0; i < numMatDrops; i++) {
    const randomMat = matTable[Math.floor(Math.random() * matTable.length)];
    player_materials[randomMat]++;
    foundMaterials.push(materialDefs[randomMat].name);
  }

  if (foundMaterials.length > 0) {
    logExploration("Salvaged: " + foundMaterials.join(", "));
  }

  // Chance to find a map at any location (if you don't already have one)
  // Map drop
  if (Math.random() < 0.05) {
    if (addItem("map")) {
      game.specialLocationAvailable = true;
    }
  }

  // Rare armor plate drop
  if (Math.random() < (location.armorDropChance || 0)) {
    const isUsed = Math.random() < 0.6;
    addFoundPlate(isUsed);
  }

  if (Math.random() < location.weaponFindChance) {
    const wTable = location.weaponTable;
    const foundKey = wTable[Math.floor(Math.random() * wTable.length)];
    const foundWeapon = weapons[foundKey];
    logExploration("🔥 Found a " + foundWeapon.name + "!");
    showWeaponSwapPopup(foundKey);
    return;  // pause exploration flow until player decides
  }

  if (Math.random() < location.zombieChance) {
    const typePool = ["walker"];
    if (game.waveNumber >= 3) typePool.push("runner");
    if (game.waveNumber >= 6) typePool.push("brute");
    const typeId = typePool[Math.floor(Math.random() * typePool.length)];

    if (Math.random() < location.rareEnemyChance) {
      const rare = createRareZombie(typeId, game.waveNumber);
      logExploration("⚠ A " + rare.name + " appeared!");
      game.currentEnemies = [rare];
      game.currentEnemyIndex = 0;
      battleLog = [];
      logBattle(rare.name + " ambushes you!");
      setPhase("battle");
      return;
    } else {
      const zombie = createZombie(typeId, game.waveNumber);
      logExploration("⚠ A " + zombie.name + " appeared!");
      game.currentEnemies = [zombie];
      game.currentEnemyIndex = 0;
      battleLog = [];
      logBattle(zombie.name + " ambushes you!");
      setPhase("battle");
      return;
    }
  }

  logExploration("Area clear. No zombies encountered.");
  game.explorationDone = true;
  renderAll();
}

let pendingWeaponFind = null;

function showWeaponSwapPopup(weaponKey) {
  const found = weapons[weaponKey];
  pendingWeaponFind = weaponKey;

  const currentSlotWeapon = found.slot === "gun" ? inventory.gun : inventory.melee;
  const currentName = currentSlotWeapon ? currentSlotWeapon.name : "nothing";

  document.getElementById("swap-message").textContent =
    "Found: " + found.name + " (" + found.slot + ")\n" +
    "Replace your current " + found.slot + ": " + currentName + "?";

  document.getElementById("weapon-swap-popup").classList.remove("hidden");
}

// Reset per-battle flags
function resetBattleFlags() {
  armor.biteGuardUsed = false;
  armor.shockPaddingUsed = false;
  armor.t3DodgeBoostActive = false;
  shotFiredAtCurrentEnemy = false;
  controlledBurstActive = false;
  guaranteedCrit = false;
}

function startWave() {
  if (!game.explorationDone) return;

  game.isBossWave = isBossWave(game.waveNumber);
  // currentWaveType is set during exploration when choosing a special location
  // Default to zombie if not set
  if (!game.currentWaveType) game.currentWaveType = "zombie";
  game.currentEnemies = generateWave(game.waveNumber);
  game.currentEnemyIndex = 0;

  battleLog = [];
  logBattle("— Wave " + game.waveNumber + " begins! —");
  if (game.isBossWave) {
    logBattle("⚠ BOSS WAVE! " + game.currentEnemies[0].name + " appears!");
  } else {
    logBattle(game.currentEnemies.length + " zombie(s) incoming!");
  }

  resetBattleFlags();
  setPhase("battle");
}

function getCurrentEnemy() {
  return game.currentEnemies[game.currentEnemyIndex] || null;
}

function playerShoot() {
  if (game.phase !== "battle") return;
  const enemy = getCurrentEnemy();
  if (!enemy) return;

  const gun = inventory.gun;
  if (!gun) {
    logBattle("No gun equipped!");
    return;
  }
  if (gun.currentAmmo <= 0) {
    logBattle("Click! No ammo — reload first!");
    return;
  }

  gun.currentAmmo--;

  // Reinforced Action: first shot on this enemy does 75% more damage
  let reinforcedBonus = false;
  if (gun.reinforcedAction && !shotFiredAtCurrentEnemy) {
    reinforcedBonus = true;
  }

  shotFiredAtCurrentEnemy = true;

  let adrenalineActive = false;
  if (player.hp / player.maxHP < 0.3 && player.skills.adrenaline > 0) {
    adrenalineActive = true;
  }

  const result = calculateAttack(player, enemy, gun);

  if (result.dodged) {
    logBattle("You shoot — " + enemy.name + " dodges!");
  } else {
    let damage = result.damage;

    if (reinforcedBonus) {
      damage = Math.floor(damage * 1.75);
      logBattle("🔫 Reinforced Action! First shot bonus!");
    }

    if (adrenalineActive) {
      const bonus = player.skills.adrenaline * 0.10;
      damage = Math.floor(damage * (1 + bonus));
      logBattle("🔥 Adrenaline surge! +" + Math.round(bonus * 100) + "% damage!");
    }

    // Aggression skill: +2% damage per point
    if (player.skills.aggression > 0) {
      const aggroBonus = player.skills.aggression * 0.02;
      damage = Math.floor(damage * (1 + aggroBonus));
    }

    enemy.hp -= damage;
    if (enemy.hp < 0) enemy.hp = 0;
    
    logBattle(result.isCrit
      ? "🎯 CRITICAL SHOT! " + damage + " damage!"
      : "You shoot " + enemy.name + " for " + damage + " damage");

    // Breacher Rounds: 25% chance to stun
    if (gun.breacherRounds && Math.random() < 0.25 && enemy.hp > 0) {
      logBattle("💫 Breacher Rounds stun " + enemy.name + "! Skipping their turn.");
      renderAll();
      // Skip enemy turn — just return
      if (enemy.hp <= 0) handleEnemyDefeated();
      return;
    }

    // Thunderclap: knockback + guaranteed stagger
    if (gun.thunderclap && enemy.hp > 0) {
      // Knockback flag — checked in enemyTurn to cancel runner double attack
      enemy.knockedBack = true;
      // Guaranteed crit on next melee attack
      guaranteedCrit = true;
      logBattle("⚡ Thunderclap! Knockback applied + stagger!");
    }

    // Last Word: killing blow refunds 2 ammo
    if (gun.lastWord && enemy.hp <= 0) {
      gun.currentAmmo = Math.min(gun.currentAmmo + 2, gun.maxAmmo);
      logBattle("🔫 Last Word! Refunded 2 ammo.");
    }
  }

  // Controlled Burst: AR T2 — shoot 2 turns in a row
  if (gun.controlledBurst && !controlledBurstActive && enemy.hp > 0) {
    controlledBurstActive = true;
    logBattle("⚡ Controlled Burst! Fire again!");
    renderAll();
    return;  // Player gets another shot, no enemy turn
  }
  controlledBurstActive = false;

  if (enemy.hp > 0 && Math.random() < player.doubleTurnChance) {
    logBattle("⚡ Quick Step! You act again!");
    renderAll();
    return;  // Don't call enemyTurn — player gets another action
  }

  renderAll();
  if (enemy.hp <= 0) handleEnemyDefeated();
  else enemyTurn();
}

function playerMelee() {
  if (game.phase !== "battle") return;
  const enemy = getCurrentEnemy();
  if (!enemy) return;

  const melee = inventory.melee;
  if (!melee) {
    logBattle("No melee weapon equipped!");
    return;
  }
  if (melee.currentDurability <= 0) {
    logBattle(melee.name + " is broken!");
    return;
  }

  // Durability loss per swing
  melee.currentDurability -= 7;
  if (melee.currentDurability < 0) melee.currentDurability = 0;

  // radiusRisk check — zombie gets a free hit on you
  if (Math.random() < melee.radiusRisk) {
    const riskDamage = Math.floor(enemy.attack * 0.5);
    applyDamageWithArmor(riskDamage);
    if (player.hp < 0) player.hp = 0;
    logBattle("⚠ Too close! " + enemy.name + " claws you for " + riskDamage + " while you swing!");
    if (player.hp <= 0) { handleGameOver(); return; }
  }

  let adrenalineActive = false;
  if (player.hp / player.maxHP < 0.3 && player.skills.adrenaline > 0) {
    adrenalineActive = true;
  }

  const result = calculateAttack(player, enemy, melee);

  if (result.dodged) {
    logBattle("You swing — " + enemy.name + " dodges!");
  } else {
    let damage = result.damage;

    if (adrenalineActive) {
      const bonus = player.skills.adrenaline * 0.10;
      damage = Math.floor(damage * (1 + bonus));
      logBattle("🔥 Adrenaline surge! +" + Math.round(bonus * 100) + "% damage!");
    }

    // Aggression skill: +2% damage per point
    if (player.skills.aggression > 0) {
      const aggroBonus = player.skills.aggression * 0.02;
      damage = Math.floor(damage * (1 + aggroBonus));
    }

    enemy.hp -= damage;
    if (enemy.hp < 0) enemy.hp = 0;

    logBattle(result.isCrit
      ? "⚔️ CRITICAL SLASH! " + damage + " damage!"
      : "You slash " + enemy.name + " for " + damage + " damage");
  }

  renderAll();
  if (enemy.hp <= 0) handleEnemyDefeated();
  else enemyTurn();
}

// Reloading consumes matching ammo from inventory. No ammo = can't reload.
function playerReload() {
  if (game.phase !== "battle") return;
  const gun = inventory.gun;
  if (!gun) { logBattle("No gun to reload!"); return; }
  if (gun.currentAmmo >= gun.maxAmmo) { logBattle("Already fully loaded!"); return; }

  // Determine which ammo item matches this gun
  let ammoItemId = null;
  if (gun.key === "pistol") ammoItemId = "pistolAmmo";
  else if (gun.key === "shotgun") ammoItemId = "shotgunAmmo";
  else if (gun.key === "ar") ammoItemId = "arAmmo";

  if (!ammoItemId) {
    logBattle("No compatible ammo type for " + gun.name + "!");
    return;
  }

  // Find ammo in inventory
  const slotIndex = inventory.slots.findIndex(function (s) {
    return s && s.id === ammoItemId;
  });

  if (slotIndex === -1) {
    logBattle("No " + itemDefs[ammoItemId].name + " in inventory! Can't reload.");
    return;
  }

  // Consume one ammo item, fill mag to max
  inventory.slots[slotIndex].quantity--;
  if (inventory.slots[slotIndex].quantity <= 0) {
    inventory.slots[slotIndex] = null;
  }

  gun.currentAmmo = gun.maxAmmo;
  logBattle("Reloaded " + gun.name + " (" + gun.maxAmmo + "/" + gun.maxAmmo + ")");
  renderAll();
  enemyTurn();
}

// Flee works on boss waves with scaling chance. Fleeing boss = lose 1 random item.
function attemptFlee() {
  if (game.phase !== "battle") return;

  let fleeChance = 0.5;  // default for normal waves

  if (game.isBossWave) {
    // Boss flee chance decreases with wave number
    const wave = game.waveNumber;
    if (wave <= 5) {
      fleeChance = 0.80 + Math.random() * 0.10;       // 80-90%
    } else if (wave <= 10) {
      fleeChance = 0.55 + Math.random() * 0.10;       // 55-65%
    } else if (wave <= 15) {
      fleeChance = 0.35 + Math.random() * 0.10;       // 35-45%
    } else {
      fleeChance = 0.20 + Math.random() * 0.10;       // 20-30% (wave 20+)
    }
  }

  if (Math.random() < fleeChance) {
    logBattle("You escaped!");

    // NEW: Fleeing a boss costs 1 random inventory item
    if (game.isBossWave) {
      const occupiedSlots = [];
      inventory.slots.forEach(function (slot, idx) {
        if (slot) occupiedSlots.push(idx);
      });
      if (occupiedSlots.length > 0) {
        const randomIdx = occupiedSlots[Math.floor(Math.random() * occupiedSlots.length)];
        const lostItem = inventory.slots[randomIdx];
        const lostName = itemDefs[lostItem.id] ? itemDefs[lostItem.id].name : lostItem.id;
        lostItem.quantity--;
        if (lostItem.quantity <= 0) inventory.slots[randomIdx] = null;
        logBattle("💀 You dropped a " + lostName + " while fleeing the boss!");
      } else {
        logBattle("💀 You fled with nothing to lose!");
      }
    }

    endWave(false);
  } else {
    logBattle("Couldn't escape!");
    enemyTurn();
  }
}

// NEW: Red damage flash overlay on battle screen
function triggerDamageFlash() {
  let overlay = document.getElementById("damage-flash-overlay");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.id = "damage-flash-overlay";
    document.getElementById("battle-screen").appendChild(overlay);
  }
  // Reset animation
  overlay.classList.remove("flash-active");
  void overlay.offsetWidth;  // force reflow
  overlay.classList.add("flash-active");
}

function enemyTurn() {
  // At start of enemyTurn():
  let tempDodgeBoost = 0;
  if (player.hp / player.maxHP < 0.3 && player.skills.adrenaline > 0) {
    tempDodgeBoost = player.skills.adrenaline * 0.05;
    player.dodgeChance += tempDodgeBoost;
  }

  const enemy = getCurrentEnemy();
  if (!enemy || enemy.hp <= 0) return;

  if (enemy.isBoss && enemy.ability === "enrage" && !enemy.enraged) {
    const hpPercent = enemy.hp / enemy.maxHP;
    if (hpPercent <= enemy.enrageAt) {
      enemy.enraged = true;
      enemy.attack *= 2;
      logBattle("🔥 " + enemy.name + " ENRAGES! Attack doubled!");
    }
  }

  // Ringleader stagger: if stagger is active, this attack is a guaranteed crit
  let ringleaderGuaranteedCrit = false;
  if (enemy.staggerActive) {
    ringleaderGuaranteedCrit = true;
    enemy.staggerActive = false;
    logBattle("💫 The Ringleader's stagger pays off — guaranteed critical hit!");
  }

  const zombieWeapon = { damage: enemy.attack, critChance: 0 };
  const result = calculateAttack(enemy, player, zombieWeapon);

  if (result.dodged) {
    logBattle(enemy.name + " attacks — you dodge!");
  } else {
    applyDamageWithArmor(result.damage);
    if (player.hp < 0) player.hp = 0;
    logBattle(enemy.name + " hits you for " + result.damage + " damage!");
    triggerDamageFlash();

    // Ringleader guaranteed crit from stagger
    if (ringleaderGuaranteedCrit) {
      const extraDmg = result.damage; // double damage as "crit"
      applyDamageWithArmor(extraDmg);
      logBattle("💥 CRITICAL from stagger! " + extraDmg + " bonus damage!");
      triggerDamageFlash();
    }

    // Ringleader stagger chance: 25% chance to stagger you for next attack
    if (enemy.ability === "stagger" && Math.random() < 0.25) {
      enemy.staggerActive = true;
      logBattle("😵 " + enemy.name + " staggers you! Next attack will be a guaranteed crit!");
    }

    // Spiked Pads: reflect 2-4 damage
    if (armor.activeMod === "spikedPads") {
      const reflect = 2 + Math.floor(Math.random() * 3);
      enemy.hp -= reflect;
      if (enemy.hp < 0) enemy.hp = 0;
      logBattle("🔩 Spiked Pads reflect " + reflect + " damage!");
    }
  }

  // Runner double attack
  if (enemy.ability === "doubleTurnChance" && Math.random() < 0.3) {
    // Thunderclap knockback cancels runner extra hit
    if (enemy.knockedBack) {
      logBattle("💨 " + enemy.name + " tries to attack again but is knocked back!");
      enemy.knockedBack = false;
    } else if (armor.activeMod === "shockPadding" && !armor.shockPaddingUsed) {
      armor.shockPaddingUsed = true;
      logBattle("⚡ Shock Padding absorbs " + enemy.name + "'s double attack!");
    } else {
      logBattle(enemy.name + " is fast — attacks again!");
      const result2 = calculateAttack(enemy, player, zombieWeapon);
      if (result2.dodged) {
        logBattle(enemy.name + "'s second attack — you dodge!");
      } else {
        applyDamageWithArmor(result2.damage);
        logBattle(enemy.name + " hits you for " + result2.damage + " more damage!");
        triggerDamageFlash();
      }
    }
  }

  // Ringleader double turn chance
  if (enemy.doubleTurnChance && enemy.isHuman && Math.random() < enemy.doubleTurnChance) {
    logBattle(enemy.name + " acts again!");
    const result3 = calculateAttack(enemy, player, zombieWeapon);
    if (result3.dodged) {
      logBattle(enemy.name + "'s second attack — you dodge!");
    } else {
      applyDamageWithArmor(result3.damage);
      logBattle(enemy.name + " hits you for " + result3.damage + " more damage!");
      triggerDamageFlash();
    }
  }

  // Remove T3 dodge boost after enemy turn ends
  if (armor.t3DodgeBoostActive) {
    player.dodgeChance -= 0.10;
    armor.t3DodgeBoostActive = false;
  }

  player.dodgeChance -= tempDodgeBoost;

  renderAll();

  if (enemy.hp <= 0) {
    handleEnemyDefeated();
  } else if (player.hp <= 0) {
    handleGameOver();
  }
}

function handleEnemyDefeated() {
  const enemy = getCurrentEnemy();
  logBattle(enemy.name + " defeated!");
  
  if (enemy.typeId === "runner") killTracker.runnerKills++;
  if (enemy.typeId === "brute") killTracker.bruteKills++;
  if (enemy.isBoss) killTracker.bossKills++;

  // Human enemy drops
  if (enemy.isHuman) {
    handleHumanDrop(enemy);
  }

  // XP award
  let xpGain = 10;
  if (enemy.isRare) xpGain = 25;
  if (enemy.isBoss) xpGain = 50;
  xpGain = Math.floor(xpGain * (1 + (game.waveNumber - 1) * 0.1));
  player.xp += xpGain;
  logBattle("+" + xpGain + " XP");
  
  checkLevelUp();

  game.currentEnemyIndex++;
  
  if (game.currentEnemyIndex < game.currentEnemies.length) {
    const next = getCurrentEnemy();
    logBattle(next.name + " approaches!");
    shotFiredAtCurrentEnemy = false;
    enemy.Knockback = false;
    renderAll();
  } else {
    endWave(true);
  }
}

function endWave(victory) {
  if (victory) {
    logBattle("🏆 Wave " + game.waveNumber + " complete! + 10HP!");
    player.hp += 10
  } else {
    logBattle("You fled from wave " + game.waveNumber);
  }

  game.waveNumber++;
  game.explorationDone = false;
  game.isBossWave = false;

  setTimeout(function () {
    setPhase("base");
  }, 1500);
}

// CHANGED: Show game over overlay image on battle screen
function handleGameOver() {
  logBattle("💀 YOU DIED — Game Over on Wave " + game.waveNumber);
  document.querySelectorAll(".action-bar button").forEach(function (btn) {
    btn.disabled = true;
  });

  // NEW: Show game over overlay
  let gameOverOverlay = document.getElementById("game-over-overlay");
  if (!gameOverOverlay) {
    gameOverOverlay = document.createElement("div");
    gameOverOverlay.id = "game-over-overlay";
    gameOverOverlay.innerHTML = '<img src="./assets/game-over.png" alt="Game Over" />';
    document.getElementById("battle-screen").appendChild(gameOverOverlay);
  }
  gameOverOverlay.classList.add("show");
}

function setPhase(phase) {
  game.phase = phase;

  const battleScreen = document.getElementById("battle-screen");
  const baseScreen = document.getElementById("base-screen");
  const explorationScreen = document.getElementById("exploration-screen");

  battleScreen.classList.remove("active");
  baseScreen.classList.remove("active");
  explorationScreen.classList.remove("active");

  if (phase === "battle") {
    battleScreen.classList.add("active");
  } else if (phase === "base") {
    baseScreen.classList.add("active");
    upgradeUsedThisVisit = false;

    // NEW: Fully refill HP and gun mag at base
    player.hp = player.maxHP;
    if (inventory.gun) {
      inventory.gun.currentAmmo = inventory.gun.maxAmmo;
    }
  } else if (phase === "exploration") {
    explorationScreen.classList.add("active");
  }

  renderAll();
}

function renderAll() {
  renderHeader();
  renderBattle();
  renderExploration();
  renderInventory();
  updateActionButtons();
}

// REPLACE the entire renderHeader function
function renderHeader() {
  document.getElementById("wave-number").textContent = game.waveNumber;
  document.getElementById("player-level").textContent = player.level;
  document.getElementById("skill-points").textContent = player.skillPoints;

  // --- HP Bar ---
  const hpPercent = (player.hp / player.maxHP) * 100;
  document.getElementById("hp-bar-fill").style.width = hpPercent + "%";
  document.getElementById("hp-bar-text").textContent = player.hp + " / " + player.maxHP;

  // --- XP Bar ---
  const xpNeeded = xpToNextLevel();
  const xpPercent = (player.xp / xpNeeded) * 100;
  document.getElementById("xp-bar-fill").style.width = xpPercent + "%";
  document.getElementById("xp-bar-text").textContent = player.xp + " / " + xpNeeded;

  // --- Boss indicator ---
  const bossIndicator = document.getElementById("boss-indicator");
  if (game.isBossWave) {
    bossIndicator.classList.remove("hidden");
  } else {
    bossIndicator.classList.add("hidden");
  }

  // --- Material counts ---
  document.getElementById("mat-scrapMetal").textContent = player_materials.scrapMetal;
  document.getElementById("mat-cloth").textContent = player_materials.cloth;
  document.getElementById("mat-chemicals").textContent = player_materials.chemicals;
  document.getElementById("mat-ductTape").textContent = player_materials.ductTape;

  // --- Armor display ---
  const plateCount = armor.plates.length;
  const maxP = armor.maxPlates;
  const atMax = plateCount >= maxP;
  document.getElementById("armor-plate-count").textContent =
    "Plates: " + plateCount + " / " + maxP + (atMax ? " (MAX)" : "");

  const plate = getActivePlate();
  const armorBarFill = document.getElementById("armor-bar-fill");
  const armorBarText = document.getElementById("armor-bar-text");
  if (plate) {
    const tierMax = getArmorTierMax();
    const armorPercent = (plate.currentArmor / tierMax) * 100;
    armorBarFill.style.width = armorPercent + "%";
    armorBarText.textContent = Math.round(armorPercent) + "% (T" + armor.tier + ")";
  } else {
    armorBarFill.style.width = "0%";
    armorBarText.textContent = "No Armor";
  }

  // --- Armor mod display ---
  const modDisplay = document.getElementById("armor-mod-display");
  if (armor.activeMod && armorModDefs[armor.activeMod]) {
    modDisplay.textContent = "Mod: " + armorModDefs[armor.activeMod].name;
  } else {
    modDisplay.textContent = "Mod: None";
  }
}

function renderBattle() {
  const enemy = getCurrentEnemy();
  const nameEl = document.getElementById("zombie-name");
  const hpEl = document.getElementById("zombie-hp");
  let imgElement = document.getElementById("zombie-image");

  
  if (enemy) {
    nameEl.textContent = enemy.name + (enemy.isRare ? " ★" : "") + (enemy.isBoss ? " 👑" : "");
    hpEl.textContent = enemy.hp + " / " + enemy.maxHP;
    imgElement.src = enemy.image
  } else {
    nameEl.textContent = "—";
    hpEl.textContent = "—";
    imgElement.src = ""
  }
}

function renderBattleLog() {
  const container = document.getElementById("log-messages");
  container.innerHTML = "";

  battleLog.forEach(function (msg) {
    const p = document.createElement("p");
    p.textContent = msg;
    container.appendChild(p);
  });

  container.scrollTop = container.scrollHeight;
}

function renderSkillPanel() {
  const container = document.getElementById("skill-list");
  container.innerHTML = "";

  document.getElementById("sp-display").textContent =
    "(Points: " + player.skillPoints + ")";

  Object.entries(skillDefs).forEach(function ([key, def]) {
    const current = player.skills[key];
    const div = document.createElement("div");
    div.className = "skill-row";

    div.innerHTML =
      '<span class="skill-name">' + def.name + '</span>' +
      '<span class="skill-rank">' + current + (def.max === Infinity ? '' : (' / ' + def.max)) + '</span>' +
      '<span class="skill-desc">' + def.desc + '</span>';

    const btn = document.createElement("button");
    btn.textContent = "+";
    btn.disabled = player.skillPoints <= 0 || (def.max !== Infinity && current >= def.max);
    btn.addEventListener("click", function () {
      if (player.skillPoints > 0 && (def.max === Infinity || current < def.max)) {
        player.skills[key]++;
        player.skillPoints--;
        applySkills();
        renderSkillPanel();
        renderHeader();
      }
    });

    div.appendChild(btn);
    container.appendChild(div);
  });
}

function renderExplorationLog() {
  const container = document.getElementById("exploration-messages");
  container.innerHTML = "";

  explorationLog.forEach(function (msg) {
    const p = document.createElement("p");
    p.textContent = msg;
    container.appendChild(p);
  });

  container.scrollTop = container.scrollHeight;
}

function renderExploration() {
  const available = getAvailableLocations();
  const availableKeys = new Set(available.map(([key]) => key));

  document.querySelectorAll(".location-btn").forEach(function (btn) {
    const key = btn.dataset.location;
    // Handle both normal and special locations
    if (key && specialLocations[key]) {
      // Special location button
      if (!game.explorationDone && game.specialLocationAvailable) {
        btn.disabled = false;
        btn.classList.remove("disabled-btn");
      } else {
        btn.disabled = true;
        btn.classList.add("disabled-btn");
      }
    } else if (availableKeys.has(key) && !game.explorationDone) {
      btn.disabled = false;
      btn.classList.remove("disabled-btn");
    } else {
      btn.disabled = true;
      btn.classList.add("disabled-btn");
    }
  });

  const startBtn = document.getElementById("start-wave-btn");
  if (game.explorationDone) {
    startBtn.disabled = false;
    startBtn.classList.remove("disabled-btn");
  } else {
    startBtn.disabled = true;
    startBtn.classList.add("disabled-btn");
  }

  const chngBg = document.querySelector(".battle-background");
  let currentLoc = locations[game.lastLocationKey] || specialLocations[game.lastLocationKey];
  if (currentLoc) {
    chngBg.style.backgroundImage = "url('" + currentLoc.bgImage + "')";
  }

  // ==== DYNAMICALLY ADD/REMOVE SPECIAL LOCATION BUTTONS ====
  const locationGrid = document.querySelector(".location-grid");

  // Remove old special location buttons
  locationGrid.querySelectorAll(".location-btn[data-special='true']").forEach(function (btn) {
    btn.remove();
  });

  // Add special location buttons if map is available
  if (game.specialLocationAvailable) {
    Object.entries(specialLocations).forEach(function ([key, loc]) {
      const btn = document.createElement("button");
      btn.className = "location-btn";
      btn.dataset.location = key;
      btn.dataset.special = "true";
      btn.textContent = "🗺️ " + loc.name + (loc.waveType === "human" ? " (Human Wave)" : " (Zombie Wave)");
      btn.disabled = game.explorationDone;
      if (game.explorationDone) btn.classList.add("disabled-btn");

      btn.addEventListener("click", function () {
        if (game.explorationDone) return;
        // Consume the map
        game.hasMap = false;
        game.specialLocationAvailable = false;
        // Set wave type based on location
        game.currentWaveType = loc.waveType;
        resolveExploration(key);
      });

      locationGrid.appendChild(btn);
    });
  }
}

function renderInventory() {
  const gunEl = document.getElementById("gun-slot");
  const meleeEl = document.getElementById("melee-slot");

  // Gun slot: "Pistol - 4/6"
  if (inventory.gun) {
    gunEl.textContent = inventory.gun.name + " - " +
      inventory.gun.currentAmmo + "/" + inventory.gun.maxAmmo;
  } else {
    gunEl.textContent = "Empty";
  }

  // Melee slot: "Baseball Bat - Durability: 67%"
  if (inventory.melee) {
    const durPercent = Math.round(
      (inventory.melee.currentDurability / inventory.melee.maxDurability) * 100
    );
    meleeEl.textContent = inventory.melee.name + " - Durability: " + durPercent + "%";
  } else {
    meleeEl.textContent = "Empty";
  }

  const slotElements = document.querySelectorAll(".inventory-grid .slot");
  slotElements.forEach(function (el, index) {
    const slot = inventory.slots[index];
    if (slot) {

      const def = itemDefs[slot.id];
      el.textContent = (def ? def.name : slot.id) + " x" + slot.quantity;

      el.style.cursor = "pointer";
    } else {
      el.textContent = "\u00A0";
      el.style.cursor = "default";
    }
  });
}

function updateActionButtons() {
  const shootBtn = document.getElementById("shoot-btn");
  const meleeBtn = document.getElementById("melee-btn");
  const reloadBtn = document.getElementById("reload-btn");
  const dismantleBtn = document.getElementById("dismantle-btn");
  const fleeBtn = document.getElementById("flee-btn");

  const inBattle = game.phase === "battle";

  shootBtn.disabled = !inBattle || !inventory.gun || inventory.gun.currentAmmo <= 0;
  meleeBtn.disabled = !inBattle || !inventory.melee || inventory.melee.currentDurability <= 0;
  reloadBtn.disabled = !inBattle || !inventory.gun || inventory.gun.currentAmmo >= inventory.gun.maxAmmo;

  dismantleBtn.disabled = false; // dismantle is always available
  fleeBtn.disabled = !inBattle;
}

// ==== DISMANTLE SYSTEM ====
function toggleDismantleMode() {
  dismantleMode = !dismantleMode;
  const btn = document.getElementById("dismantle-btn");
  if (dismantleMode) {
    btn.classList.add("dismantle-active");
    logBattle("🔧 Dismantle mode ON — select an inventory item to dismantle.");
  } else {
    btn.classList.remove("dismantle-active");
    logBattle("🔧 Dismantle mode OFF.");
  }
  updateDismantleSlotHighlights();
}

function updateDismantleSlotHighlights() {
  document.querySelectorAll(".inventory-grid .slot").forEach(function (el, index) {
    if (dismantleMode && inventory.slots[index]) {
      el.classList.add("dismantle-highlight");
    } else {
      el.classList.remove("dismantle-highlight");
    }
  });
}

function getDismantleMaterials(itemId, qty) {
  const recipe = dismantleRecipes[itemId];
  if (!recipe) return null;
  const result = {};
  Object.entries(recipe).forEach(function ([mat, amount]) {
    result[mat] = amount * qty;
  });
  return result;
}

function formatMaterials(mats) {
  return Object.entries(mats).map(function ([key, amount]) {
    return amount + "x " + materialDefs[key].name;
  }).join(", ");
}

function openDismantlePopup(slotIndex) {
  const slot = inventory.slots[slotIndex];
  if (!slot) return;

  const recipe = dismantleRecipes[slot.id];
  if (!recipe) {
    logBattle("❌ This item cannot be dismantled.");
    return;
  }

  dismantlePendingSlot = slotIndex;
  dismantleQty = 1;

  const def = itemDefs[slot.id];
  const itemName = def ? def.name : slot.id;

  document.getElementById("dismantle-message").textContent =
    "Dismantle " + itemName + "?";

  // Show quantity selector only for stacks
  const qtySection = document.getElementById("dismantle-quantity");
  if (slot.quantity > 1) {
    qtySection.classList.remove("hidden");
  } else {
    qtySection.classList.add("hidden");
  }

  updateDismantlePopupDisplay();
  document.getElementById("dismantle-popup").classList.remove("hidden");
}

function updateDismantlePopupDisplay() {
  const slot = inventory.slots[dismantlePendingSlot];
  if (!slot) return;

  document.getElementById("dismantle-qty-display").textContent = dismantleQty;

  const mats = getDismantleMaterials(slot.id, dismantleQty);
  document.getElementById("dismantle-materials").textContent =
    "You will receive: " + formatMaterials(mats);
}

function confirmDismantle() {
  const slotIndex = dismantlePendingSlot;
  const slot = inventory.slots[slotIndex];
  if (!slot) return;

  const mats = getDismantleMaterials(slot.id, dismantleQty);
  if (!mats) return;

  // Give materials
  Object.entries(mats).forEach(function ([key, amount]) {
    player_materials[key] += amount;
  });

  const def = itemDefs[slot.id];
  const itemName = def ? def.name : slot.id;

  logBattle("🔧 Dismantled " + dismantleQty + "x " + itemName + " → " + formatMaterials(mats));

  // Remove items from slot
  slot.quantity -= dismantleQty;
  if (slot.quantity <= 0) {
    inventory.slots[slotIndex] = null;
  }

  dismantlePendingSlot = null;
  dismantleQty = 1;
  document.getElementById("dismantle-popup").classList.add("hidden");

  renderAll();
  updateDismantleSlotHighlights();
}

function cancelDismantle() {
  dismantlePendingSlot = null;
  dismantleQty = 1;
  document.getElementById("dismantle-popup").classList.add("hidden");
}

function setupEventListeners() {
  document.getElementById("shoot-btn").addEventListener("click", playerShoot);
  document.getElementById("melee-btn").addEventListener("click", playerMelee);
  document.getElementById("reload-btn").addEventListener("click", playerReload);
  document.getElementById("flee-btn").addEventListener("click", attemptFlee);

  document.getElementById("dismantle-btn").addEventListener("click", function () {
    toggleDismantleMode();
  });

  document.querySelectorAll(".inventory-grid .slot").forEach(function (el, index) {
    el.addEventListener("click", function () {
      if (dismantleMode) {
        openDismantlePopup(index);
      } else {
        useItem(index);
      }
    });
  });

  // Dismantle popup buttons
  document.getElementById("dismantle-confirm").addEventListener("click", confirmDismantle);
  document.getElementById("dismantle-cancel").addEventListener("click", cancelDismantle);

  document.getElementById("dismantle-plus").addEventListener("click", function () {
    const slot = inventory.slots[dismantlePendingSlot];
    if (slot && dismantleQty < slot.quantity) {
      dismantleQty++;
      updateDismantlePopupDisplay();
    }
  });

  document.getElementById("dismantle-minus").addEventListener("click", function () {
    if (dismantleQty > 1) {
      dismantleQty--;
      updateDismantlePopupDisplay();
    }
  });

  document.querySelectorAll(".location-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      if (game.explorationDone) return;
      const locationKey = btn.dataset.location;
      resolveExploration(locationKey);
    });
  });

  document.getElementById("start-wave-btn").addEventListener("click", startWave);

  // ==== TOGGLE BASE PANELS (click again to close) ====
  document.getElementById("base-skills-btn").addEventListener("click", function () {
    const panel = document.getElementById("skill-panel");
    const isOpen = !panel.classList.contains("hidden");
    document.getElementById("skill-panel").classList.add("hidden");
    document.getElementById("craft-panel").classList.add("hidden");
    document.getElementById("upgrade-panel").classList.add("hidden");
    if (!isOpen) {
      panel.classList.remove("hidden");
      renderSkillPanel();
    }
  });

  document.getElementById("base-craft-btn").addEventListener("click", function () {
    const panel = document.getElementById("craft-panel");
    const isOpen = !panel.classList.contains("hidden");
    document.getElementById("skill-panel").classList.add("hidden");
    document.getElementById("craft-panel").classList.add("hidden");
    document.getElementById("upgrade-panel").classList.add("hidden");
    if (!isOpen) {
      panel.classList.remove("hidden");
      renderCraftPanel();
    }
  });

  document.getElementById("base-upgrade-btn").addEventListener("click", function () {
    const panel = document.getElementById("upgrade-panel");
    const isOpen = !panel.classList.contains("hidden");
    document.getElementById("skill-panel").classList.add("hidden");
    document.getElementById("craft-panel").classList.add("hidden");
    document.getElementById("upgrade-panel").classList.add("hidden");
    if (!isOpen) {
      panel.classList.remove("hidden");
      renderUpgradePanel();
    }
  });

  document.getElementById("close-skill-panel").addEventListener("click", function () {
    document.getElementById("skill-panel").classList.add("hidden");
  });

  document.getElementById("close-craft-panel").addEventListener("click", function () {
    document.getElementById("craft-panel").classList.add("hidden");
  });

  document.getElementById("close-upgrade-panel").addEventListener("click", function () {
    document.getElementById("upgrade-panel").classList.add("hidden");
  });

  // Craft Armor Plate button
  document.getElementById("craft-plate-btn").addEventListener("click", function () {
    if (craftArmorPlate()) {
      renderCraftPanel();
      renderHeader();
    }
  });

  // Repair All Plates button
  document.getElementById("repair-plate-btn").addEventListener("click", function () {
    if (repairAllPlates()) {
      renderCraftPanel();
      renderHeader();
    }
  });

  document.getElementById("leave-base-btn").addEventListener("click", function () {
    document.getElementById("skill-panel").classList.add('hidden');
    document.getElementById("craft-panel").classList.add('hidden');
    document.getElementById("upgrade-panel").classList.add('hidden');
    setPhase("exploration");
  });

  document.getElementById("swap-yes").addEventListener("click", function () {
    if (pendingWeaponFind) {
      equipWeapon(pendingWeaponFind);
      logExploration("Equipped " + weapons[pendingWeaponFind].name + "!");
      pendingWeaponFind = null;
    }
    document.getElementById("weapon-swap-popup").classList.add("hidden");
    game.explorationDone = true;
    renderAll();
  });

  document.getElementById("swap-no").addEventListener("click", function () {
    logExploration("Left the " + weapons[pendingWeaponFind].name + " behind.");
    pendingWeaponFind = null;
    document.getElementById("weapon-swap-popup").classList.add("hidden");
    game.explorationDone = true;
    renderAll();
  });
}

function initGame() {
  player.hp = 100;
  player.maxHP = 100;
  player.dodgeChance = 0.05;
  player.doubleTurnChance = 0;
  player.xp = 0;
  player.level = 1;
  player.skillPoints = 0;
  Object.keys(player.skills).forEach(function (k) { player.skills[k] = 0; });

  // Equip starting weapons to both slots
  equipWeapon("pistol");   // goes to gun slot
  equipWeapon("bat");      // goes to melee slot

  inventory.slots = [null, null, null, null, null, null];
  addItem("medkit");
  addItem("pistolAmmo");

  // NEW: Player starts with 1 armor plate
  armor.plates = [];
  armor.maxPlates = 3;
  armor.tier = 1;
  armor.modsOwned = {};
  armor.activeMod = null;
  armor.plates.push({ currentArmor: getArmorTierMax() });

  // Reset materials
  Object.keys(player_materials).forEach(function (k) { player_materials[k] = 0; });

  game.phase = "exploration";
  game.waveNumber = 1;
  game.lastLocationKey = null;
  game.currentEnemies = [];
  game.currentEnemyIndex = 0;
  game.isBossWave = false;
  game.explorationDone = false;
  game.hasMap = false;
  game.specialLocationAvailable = false;
  game.currentWaveType = "zombie";

  battleLog = [];
  explorationLog = [];

  setupEventListeners();
  setPhase("exploration");
}

// ===== CRAFT ARMOR PANEL RENDERING =====
function renderCraftPanel() {
  const statusEl = document.getElementById("craft-plate-status");
  statusEl.textContent =
    "Plates: " + armor.plates.length + "/" + armor.maxPlates +
    " | Tier: T" + armor.tier +
    " | Scrap Metal: " + player_materials.scrapMetal +
    " | Cloth: " + player_materials.cloth +
    " | Duct Tape: " + player_materials.ductTape;

  // Craft button state
  const craftBtn = document.getElementById("craft-plate-btn");
  craftBtn.disabled = armor.plates.length >= armor.maxPlates || player_materials.scrapMetal < 3;

  // Repair button state
  const repairBtn = document.getElementById("repair-plate-btn");
  const max = getArmorTierMax();
  const anyDamaged = armor.plates.some(function (p) { return p.currentArmor < max; });
  repairBtn.disabled = armor.plates.length === 0 || player_materials.ductTape < 2 || !anyDamaged;

  // ==== ARMOR TIER UPGRADE SECTION ====
  let tierSection = document.getElementById("armor-tier-section");
  if (!tierSection) {
    tierSection = document.createElement("div");
    tierSection.id = "armor-tier-section";
    tierSection.style.margin = "10px 0";
    // Insert after repair button
    repairBtn.parentNode.insertBefore(tierSection, repairBtn.nextSibling);
  }
  tierSection.innerHTML = "";

  if (armor.tier < 3) {
    const nextTier = armor.tier + 1;
    let costText = "";
    let canAfford = false;

    if (nextTier === 2) {
      costText = "Upgrade to T2 (1 Scrap Metal + 1 Cloth + 1 Duct Tape)";
      canAfford = player_materials.scrapMetal >= 1 && player_materials.cloth >= 1 && player_materials.ductTape >= 1;
    } else if (nextTier === 3) {
      costText = "Upgrade to T3 (3 Scrap Metal + 2 Cloth + 2 Duct Tape)";
      canAfford = player_materials.scrapMetal >= 3 && player_materials.cloth >= 2 && player_materials.ductTape >= 2;
    }

    const tierBtn = document.createElement("button");
    tierBtn.textContent = costText;
    tierBtn.style.display = "block";
    tierBtn.style.width = "100%";
    tierBtn.style.margin = "8px 0";
    tierBtn.disabled = !canAfford;
    tierBtn.addEventListener("click", function () {
      if (nextTier === 2) {
        player_materials.scrapMetal -= 1;
        player_materials.cloth -= 1;
        player_materials.ductTape -= 1;
      } else if (nextTier === 3) {
        player_materials.scrapMetal -= 3;
        player_materials.cloth -= 2;
        player_materials.ductTape -= 2;
      }
      armor.tier = nextTier;
      // Upgrade existing plates to new tier max
      const newMax = getArmorTierMax();
      armor.plates.forEach(function (p) {
        p.currentArmor = newMax;
      });
      renderCraftPanel();
      renderHeader();
    });
    tierSection.appendChild(tierBtn);
  } else {
    const maxMsg = document.createElement("p");
    maxMsg.textContent = "Armor Tier: MAX (T3)";
    maxMsg.style.color = "#5a5";
    tierSection.appendChild(maxMsg);
  }

  // Armor Mods
  const modList = document.getElementById("armor-mod-list");
  modList.innerHTML = "";

  Object.entries(armorModDefs).forEach(function ([key, def]) {
    const row = document.createElement("div");
    row.className = "mod-row";

    const owned = armor.modsOwned[key];
    const isActive = armor.activeMod === key;

    const info = document.createElement("div");
    info.className = "mod-info";
    info.innerHTML =
      '<span class="mod-name' + (isActive ? " mod-active" : "") + '">' +
      def.name + (owned ? " ✓" : "") + (isActive ? " [ACTIVE]" : "") +
      '</span><br><span class="mod-desc">' + def.desc + '</span>';

    row.appendChild(info);

    const btn = document.createElement("button");
    if (!owned) {
      const canAfford = (player_materials.scrapMetal >= def.cost.scrapMetal) &&
        (player_materials.cloth >= def.cost.cloth);
      btn.textContent = "Craft";
      btn.disabled = !canAfford;
      btn.addEventListener("click", function () {
        player_materials.scrapMetal -= def.cost.scrapMetal;
        player_materials.cloth -= def.cost.cloth;
        armor.modsOwned[key] = true;
        armor.activeMod = key;
        if (key === "scavSling" && inventory.slots.length < getMaxSlots()) {
          inventory.slots.push(null);
        }
        renderCraftPanel();
        renderHeader();
        renderInventory();
      });
    } else {
      btn.textContent = isActive ? "Unequip" : "Equip";
      btn.addEventListener("click", function () {
        if (isActive) {
          armor.activeMod = null;
          if (key === "scavSling") {
            const maxSlots = getMaxSlots();
            while (inventory.slots.length > maxSlots) {
              inventory.slots.pop();
            }
          }
        } else {
          if (armor.activeMod === "scavSling") {
            const newMax = 6;
            while (inventory.slots.length > newMax) {
              inventory.slots.pop();
            }
          }
          armor.activeMod = key;
          if (key === "scavSling" && inventory.slots.length < getMaxSlots()) {
            inventory.slots.push(null);
          }
        }
        renderCraftPanel();
        renderHeader();
        renderInventory();
      });
    }

    row.appendChild(btn);
    modList.appendChild(row);
  });
}

// ===== WEAPON UPGRADE PANEL RENDERING =====
function renderUpgradePanel() {
  const container = document.getElementById("weapon-upgrade-list");
  container.innerHTML = "";

  const usedMsg = document.getElementById("upgrade-used-msg");
  if (upgradeUsedThisVisit) {
    usedMsg.classList.remove("hidden");
  } else {
    usedMsg.classList.add("hidden");
  }

  // ==== MELEE REPAIR SECTION ====
  if (inventory.melee) {
    const meleeDiv = document.createElement("div");
    meleeDiv.className = "weapon-track";

    const meleeTitle = document.createElement("h4");
    meleeTitle.textContent = inventory.melee.name + " (Melee)";
    meleeDiv.appendChild(meleeTitle);

    const durPercent = Math.round((inventory.melee.currentDurability / inventory.melee.maxDurability) * 100);
    const durInfo = document.createElement("p");
    durInfo.style.fontSize = "13px";
    durInfo.style.color = "#aaa";
    durInfo.textContent = "Durability: " + durPercent + "% (" + inventory.melee.currentDurability + "/" + inventory.melee.maxDurability + ")";
    meleeDiv.appendChild(durInfo);

    const repairRow = document.createElement("div");
    repairRow.className = "tier-row available";

    const repairInfo = document.createElement("span");
    repairInfo.textContent = "Full Repair — Cost: 1 Scrap Metal";
    repairRow.appendChild(repairInfo);

    const repairBtn = document.createElement("button");
    repairBtn.textContent = "Repair";
    const needsRepair = inventory.melee.currentDurability < inventory.melee.maxDurability;
    repairBtn.disabled = !needsRepair || player_materials.scrapMetal < 1;
    repairBtn.addEventListener("click", function () {
      if (player_materials.scrapMetal < 1) return;
      player_materials.scrapMetal -= 1;
      inventory.melee.currentDurability = inventory.melee.maxDurability;
      renderUpgradePanel();
      renderHeader();
      renderInventory();
    });
    repairRow.appendChild(repairBtn);
    meleeDiv.appendChild(repairRow);
    container.appendChild(meleeDiv);
  }

  // ==== GUN UPGRADE TRACKS ====
  ["pistol", "shotgun", "ar"].forEach(function (weaponKey) {
    const track = weaponUpgrades[weaponKey];
    if (!track) return;

    const state = weaponUpgradeState[weaponKey];
    const hasWeapon = inventory.gun && inventory.gun.key === weaponKey;

    const trackDiv = document.createElement("div");
    trackDiv.className = "weapon-track";

    const title = document.createElement("h4");
    title.textContent = track.label + (!hasWeapon ? " (not equipped)" : "");
    trackDiv.appendChild(title);

    track.tiers.forEach(function (tier, index) {
      const row = document.createElement("div");
      row.className = "tier-row";

      if (index < state.currentTier) {
        row.classList.add("purchased");
        row.innerHTML = '<span>' + tier.name + ' — ' + tier.desc + '</span><span>✓ Owned</span>';
      } else if (index === state.currentTier) {
        const unlocked = tier.unlockCondition();
        if (!unlocked) {
          row.classList.add("locked");
          row.innerHTML = '<span>' + tier.name + ' — ' + tier.desc + '</span>' +
            '<span class="tier-lock-reason">🔒 ' + (tier.lockReason || "Locked") + '</span>';
        } else {
          row.classList.add("available");
          const info = document.createElement("span");
          info.textContent = tier.name + " — " + tier.desc;
          row.appendChild(info);

          const btn = document.createElement("button");
          btn.textContent = "Upgrade";
          // FIX: Only disable if already upgraded this visit, NOT based on weapon ownership
          btn.disabled = upgradeUsedThisVisit;
          btn.addEventListener("click", function () {
            if (upgradeUsedThisVisit) return;
            // Apply upgrade to the weapon if currently equipped
            if (hasWeapon) {
              tier.apply(inventory.gun);
            }
            state.currentTier++;
            upgradeUsedThisVisit = true;
            renderUpgradePanel();
            renderHeader();
            renderInventory();
          });
          row.appendChild(btn);
        }
      } else {
        row.classList.add("locked");
        row.innerHTML = '<span>' + tier.name + ' — ' + tier.desc + '</span><span>🔒</span>';
      }

      trackDiv.appendChild(row);
    });

    container.appendChild(trackDiv);
  });
}

document.addEventListener("DOMContentLoaded", initGame);
