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

const weapons = {
  // === GUNS ===
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

  // === MELEE ===
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
  armorPlate: { name: "Armor Plate", type: "armor", value: 1 }
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
    weaponTable: ["combatKnife", "machete"]
  },
  policeStation: {
    name: "Police Station",
    lootTable: ["pistolAmmo", "shotgunAmmo", "medkit"],
    materialTable: ["scrapMetal", "ductTape"],
    zombieChance: 0.6,
    rareEnemyChance: 0.1,
    bgImage: "./assets/stationbg.png",
    weaponFindChance: 0.08,
    weaponTable: ["shotgun", "ar"]
  },
  supermarket: {
    name: "Supermarket",
    lootTable: ["food", "bandage", "medkit"],
    materialTable: ["ductTape", "cloth"],
    zombieChance: 0.3,
    rareEnemyChance: 0.03,
    bgImage: "./assets/marketbg.png",
    weaponFindChance: 0.04,
    weaponTable: ["bat", "combatKnife"]
  },
  apartment: {
    name: "Apartment Complex",
    lootTable: ["food", "medkit", "bandage", "pistolAmmo", "shotgunAmmo"],
    materialTable: ["cloth", "scrapMetal"],
    zombieChance: 0.35,
    rareEnemyChance: 0.04,
    bgImage: "./assets/apartmentbg.png",
    weaponFindChance: 0.05,
    weaponTable: ["machete", "katana"]
  }
};

const materialDefs = {
  scrapMetal: { name: "Scrap Metal" },
  cloth: { name: "Cloth" },
  chemicals: { name: "Chemicals" },
  ductTape: { name: "Duct Tape" }
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
        unlockCondition: function () { return true; },  // always unlocked
        apply: function (w) { w.maxAmmo += 2; w.currentAmmo = Math.min(w.currentAmmo + 2, w.maxAmmo); }
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
        apply: function (w) { w.maxAmmo += 10; w.currentAmmo = Math.min(w.currentAmmo + 10, w.maxAmmo); }
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
  toughness: { name: "Toughness", max: 10, desc: "+10 max HP per point" },
  critTraining: { name: "Critical Training", max: 5, desc: "+1.5% crit chance per point" },
  fieldMedic: { name: "Field Medic", max: 5, desc: "+15% healing effectiveness per point" },
  scavenger: { name: "Scavenger", max: 5, desc: "+10% chance for bonus loot per point" },
  adrenaline: { name: "Adrenaline", max: 3, desc: "Below 30% HP: +5% dodge & +10% dmg per point" },
  armorCapacity: { name: "Armor Capacity", max: 1, desc: "Spend 2 SP: max armor plates 3 → 5 (costs 2 points)" }
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
    toughness: 0,       // max 10 → +10 maxHP per point
    critTraining: 0,    // max 5  → +1.5% crit per point (applied to weapon)
    fieldMedic: 0,      // max 5  → +15% heal effectiveness per point
    scavenger: 0,       // max 5  → +10% chance for bonus loot per point
    adrenaline: 0,       // max 3  → below 30% HP: +5% dodge & +10% damage per point
    armorCapacity: 0
  }
};

// --- Armor State ---
const armor = {
  plates: [],          // array of { currentArmor: N } objects
  maxPlates: 3,        // increases to 5 with armorCapacity skill
  tier: 1,             // 1, 2, or 3
  modsOwned: {},       // { spikedPads: true, biteGuard: true, ... }
  activeMod: null,     // key string or null
  // Per-battle flags (reset each battle)
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

// --- Kill Tracker (for weapon unlock conditions) ---
const killTracker = {
  runnerKills: 0,
  bruteKills: 0,
  bossKills: 0
};

// --- Weapon Upgrade State ---
// Tracks which tier each weapon is upgraded to (0 = no upgrades purchased)
const weaponUpgradeState = {
  pistol: { currentTier: 0 },
  shotgun: { currentTier: 0 },
  ar: { currentTier: 0 }
};

let upgradeUsedThisVisit = false;  // reset when entering base

const inventory = {
  gun: null,      // will hold a live weapon instance (with currentAmmo)
  melee: null,    // will hold a live weapon instance (with currentDurability)
  slots: [null, null, null, null, null, null]
};

const game = {
  phase: "exploration",
  waveNumber: 1,
  lastLocationKey: null,
  currentEnemies: [],
  currentEnemyIndex: 0,
  isBossWave: false,
  explorationDone: false
};

let battleLog = [];
let explorationLog = [];

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

function xpToNextLevel() {
  return player.level * 50;  // Level 1→2 = 50xp, 2→3 = 100xp, etc.
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
  if (diff > 0) player.hp += diff;  // gain the new HP immediately

  // Armor Capacity skill: if purchased, max plates = 5
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
    // No armor — full damage to HP
    player.hp -= rawDamage;
    if (player.hp < 0) player.hp = 0;
    return rawDamage;
  }

  const armorDmg = Math.floor(rawDamage * 0.70);
  const hpDmg = rawDamage - armorDmg;  // 30%

  // Apply to plate
  plate.currentArmor -= armorDmg;

  // Apply 30% to HP always
  player.hp -= hpDmg;
  if (player.hp < 0) player.hp = 0;

  if (plate.currentArmor <= 0) {
    // Plate destroyed
    armor.plates.shift();
    logBattle("💥 Armor plate destroyed!");

    // T3 bonus: +10% dodge for 1 turn
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
  if (player_materials.scrapMetal < 8) {
    logExploration("Not enough Scrap Metal (need 8).");
    return false;
  }
  player_materials.scrapMetal -= 8;
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

// Add a found plate (from exploration drop)
function addFoundPlate(used) {
  if (armor.plates.length >= armor.maxPlates) {
    logExploration("Can't carry more armor plates!");
    return false;
  }
  const max = getArmorTierMax();
  const hp = used ? Math.floor(max * (0.3 + Math.random() * 0.4)) : max;
  armor.plates.push({ currentArmor: hp });
  logExploration("🛡️ Found an armor plate! (" + (used ? "used" : "full") + ")");
  return true;
}

function generateWave(waveNumber) {
  if (isBossWave(waveNumber)) {
    return [createBoss(waveNumber)];
  }

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

  if (existing) {
    existing.quantity++;
    logExploration("Found " + itemDefs[itemId].name + " (stacked)");
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
      logExploration("Found " + itemDefs[itemId].name);
      return true;
    }
  }

  logExploration("Inventory full! Couldn't pick up " + itemDefs[itemId].name);
  return false;
}

function useItem(slotIndex) {
  // UPDATED: Allow item use during battle OR exploration
  if (game.phase !== "battle" && game.phase !== "exploration") return;

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

  if (def.type === "ammo") {
    if (inventory.gun) {
      inventory.gun.currentAmmo = Math.min(
        inventory.gun.currentAmmo + def.value,
        inventory.gun.maxAmmo
      );
      logFn("Used " + def.name + " — reloaded " + def.value + " rounds");
    } else {
      logFn("No gun equipped to reload!");
      return;  // Don't consume the item
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
  const location = locations[locationKey];
  if (!location) return;

  game.lastLocationKey = locationKey;

  explorationLog = [];
  logExploration("Scavenging " + location.name + "...");

  const lootTable = location.lootTable;
  const randomItem = lootTable[Math.floor(Math.random() * lootTable.length)];
  addItem(randomItem);

  // After the first addItem(randomItem):
  const scavengerChance = player.skills.scavenger * 0.10;
  if (Math.random() < scavengerChance) {
    const bonusItem = lootTable[Math.floor(Math.random() * lootTable.length)];
    addItem(bonusItem);
    logExploration("🔍 Scavenger instinct! Found an extra item!");
  }

  // Material drop (always get 1 material)
  const matTable = location.materialTable;
  const randomMat = matTable[Math.floor(Math.random() * matTable.length)];
  player_materials[randomMat]++;
  logExploration("Salvaged " + materialDefs[randomMat].name);

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

  if (player.hp < player.maxHP) {
    logExploration("Area clear. No zombies encountered. Rest Bonus, + 10HP!");
    player.hp = Math.min(player.hp + 10, player.maxHP);
  } else {
    logExploration("Area clear. No zombies encountered. No Bonus - Max Health!");
  }

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
    // Temporarily boost dodge (already in player.dodgeChance via applySkills? No — adrenaline is conditional)
    // Apply damage bonus after result
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

function playerReload() {
  if (game.phase !== "battle") return;
  const gun = inventory.gun;
  if (!gun) { logBattle("No gun to reload!"); return; }
  if (gun.currentAmmo >= gun.maxAmmo) { logBattle("Already fully loaded!"); return; }
  gun.currentAmmo = gun.maxAmmo;
  logBattle("Reloaded " + gun.name + " (" + gun.maxAmmo + "/" + gun.maxAmmo + ")");
  renderAll();
  enemyTurn();
}

function attemptFlee() {
  if (game.phase !== "battle") return;

  if (game.isBossWave) {
    logBattle("Can't flee from a boss!");
    return;
  }

  if (Math.random() < 0.5) {
    logBattle("You escaped!");
    endWave(false);
  } else {
    logBattle("Couldn't escape!");
    enemyTurn();
  }
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

  const zombieWeapon = { damage: enemy.attack, critChance: 0 };
  const result = calculateAttack(enemy, player, zombieWeapon);

  if (result.dodged) {
    logBattle(enemy.name + " attacks — you dodge!");
  } else {
    applyDamageWithArmor(result.damage);
    if (player.hp < 0) player.hp = 0;
    logBattle(enemy.name + " hits you for " + result.damage + " damage!");

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
      }
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

function handleGameOver() {
  logBattle("💀 YOU DIED — Game Over on Wave " + game.waveNumber);
  document.querySelectorAll(".action-bar button").forEach(function (btn) {
    btn.disabled = true;
  });
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
      '<span class="skill-rank">' + current + ' / ' + def.max + '</span>' +
      '<span class="skill-desc">' + def.desc + '</span>';

    const btn = document.createElement("button");
    btn.textContent = "+";
    btn.disabled = player.skillPoints <= 0 || current >= def.max;
    btn.addEventListener("click", function () {
      if (player.skillPoints > 0 && current < def.max) {
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
    if (availableKeys.has(key) && !game.explorationDone) {
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
  let currentLoc = locations[game.lastLocationKey];
  if (currentLoc) {
    chngBg.style.backgroundImage = "url('" + currentLoc.bgImage + "')";
  };

  // Show hint that items can be used during exploration
  const slotElements = document.querySelectorAll(".inventory-grid .slot");
  slotElements.forEach(function (el, index) {
    const slot = inventory.slots[index];
    if (slot && game.phase === "exploration") {
      const def = itemDefs[slot.id];
      if (def && (def.type === "heal" || def.type === "ammo")) {
        el.style.cursor = "pointer";
      }
    }
  });
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
  const useItemBtn = document.getElementById("use-item-btn");
  const fleeBtn = document.getElementById("flee-btn");

  const inBattle = game.phase === "battle";

  shootBtn.disabled = !inBattle || !inventory.gun || inventory.gun.currentAmmo <= 0;
  meleeBtn.disabled = !inBattle || !inventory.melee || inventory.melee.currentDurability <= 0;
  reloadBtn.disabled = !inBattle || !inventory.gun || inventory.gun.currentAmmo >= inventory.gun.maxAmmo;

  const hasItems = inventory.slots.some(function (slot) { return slot !== null; });
  useItemBtn.disabled = !inBattle || !hasItems;
  fleeBtn.disabled = !inBattle || game.isBossWave;
}

function setupEventListeners() {
  document.getElementById("shoot-btn").addEventListener("click", playerShoot);
  document.getElementById("melee-btn").addEventListener("click", playerMelee);
  document.getElementById("reload-btn").addEventListener("click", playerReload);
  document.getElementById("flee-btn").addEventListener("click", attemptFlee);

  document.getElementById("use-item-btn").addEventListener("click", function () {
    logBattle("Click an inventory slot to use an item");
  });

  document.querySelectorAll(".inventory-grid .slot").forEach(function (el, index) {
    el.addEventListener("click", function () {
      useItem(index);
    });
  });

  document.querySelectorAll(".location-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      if (game.explorationDone) return;
      const locationKey = btn.dataset.location;
      resolveExploration(locationKey);
    });
  });

  document.getElementById("start-wave-btn").addEventListener("click", startWave);

  document.getElementById("base-skills-btn").addEventListener("click", function () {
    document.getElementById("skill-panel").classList.remove("hidden");
    document.getElementById("craft-panel").classList.add("hidden");
    document.getElementById("upgrade-panel").classList.add("hidden");
    renderSkillPanel();
  });

  document.getElementById("base-craft-btn").addEventListener("click", function () {
    document.getElementById("craft-panel").classList.remove("hidden");
    document.getElementById("skill-panel").classList.add("hidden");
    document.getElementById("upgrade-panel").classList.add("hidden");
    renderCraftPanel();
  });

  document.getElementById("base-upgrade-btn").addEventListener("click", function () {
    document.getElementById("upgrade-panel").classList.remove("hidden");
    document.getElementById("skill-panel").classList.add("hidden");
    document.getElementById("craft-panel").classList.add("hidden");
    renderUpgradePanel();
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

  // Reset materials
  Object.keys(player_materials).forEach(function (k) { player_materials[k] = 0; });

  game.phase = "exploration";
  game.waveNumber = 1;
  game.lastLocationKey = null;
  game.currentEnemies = [];
  game.currentEnemyIndex = 0;
  game.isBossWave = false;
  game.explorationDone = false;

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
    " | Duct Tape: " + player_materials.ductTape;

  // Craft button state
  const craftBtn = document.getElementById("craft-plate-btn");
  craftBtn.disabled = armor.plates.length >= armor.maxPlates || player_materials.scrapMetal < 8;

  // Repair button state
  const repairBtn = document.getElementById("repair-plate-btn");
  const max = getArmorTierMax();
  const anyDamaged = armor.plates.some(function (p) { return p.currentArmor < max; });
  repairBtn.disabled = armor.plates.length === 0 || player_materials.ductTape < 2 || !anyDamaged;

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
      // Craft button
      const canAfford = (player_materials.scrapMetal >= def.cost.scrapMetal) &&
        (player_materials.cloth >= def.cost.cloth);
      btn.textContent = "Craft";
      btn.disabled = !canAfford;
      btn.addEventListener("click", function () {
        player_materials.scrapMetal -= def.cost.scrapMetal;
        player_materials.cloth -= def.cost.cloth;
        armor.modsOwned[key] = true;
        armor.activeMod = key;
        // Handle Scav Sling: add extra slot
        if (key === "scavSling" && inventory.slots.length < getMaxSlots()) {
          inventory.slots.push(null);
        }
        renderCraftPanel();
        renderHeader();
        renderInventory();
      });
    } else {
      // Select / Deselect
      btn.textContent = isActive ? "Unequip" : "Equip";
      btn.addEventListener("click", function () {
        if (isActive) {
          armor.activeMod = null;
          // Remove Scav Sling extra slot if unequipping
          if (key === "scavSling") {
            const maxSlots = getMaxSlots();
            while (inventory.slots.length > maxSlots) {
              const removed = inventory.slots.pop();
              if (removed) {
                // Try to find an empty slot to move it to
                // If can't, item is lost (edge case)
              }
            }
          }
        } else {
          // If switching from scavSling to something else, shrink slots
          if (armor.activeMod === "scavSling") {
            const newMax = 6;
            while (inventory.slots.length > newMax) {
              inventory.slots.pop();
            }
          }
          armor.activeMod = key;
          // If equipping scavSling, expand
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

  // Only show weapons the player currently owns
  const ownedWeaponKeys = [];
  if (inventory.gun) ownedWeaponKeys.push(inventory.gun.key);
  // Melee weapons don't have upgrade paths, but check anyway
  // Only pistol, shotgun, ar have upgrades

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
        // Already purchased
        row.classList.add("purchased");
        row.innerHTML = '<span>' + tier.name + ' — ' + tier.desc + '</span><span>✓ Owned</span>';
      } else if (index === state.currentTier) {
        // Next available tier
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
          btn.disabled = upgradeUsedThisVisit || !hasWeapon;
          btn.addEventListener("click", function () {
            if (upgradeUsedThisVisit || !hasWeapon) return;
            // Apply upgrade
            tier.apply(inventory.gun);
            state.currentTier++;
            upgradeUsedThisVisit = true;
            renderUpgradePanel();
            renderHeader();
            renderInventory();
          });
          row.appendChild(btn);
        }
      } else {
        // Future tier
        row.classList.add("locked");
        row.innerHTML = '<span>' + tier.name + ' — ' + tier.desc + '</span><span>🔒</span>';
      }

      trackDiv.appendChild(row);
    });

    container.appendChild(trackDiv);
  });
}

document.addEventListener("DOMContentLoaded", initGame);
