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
  shotgunAmmo: { name: "Shotgun Ammo", type: "ammo", value: 2 }
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
    adrenaline: 0       // max 3  → below 30% HP: +5% dodge & +10% damage per point
  }
};

const skillDefs = {
  evasion: { name: "Evasion", max: 10, desc: "+2% dodge chance per point (cap 25%)" },
  quickStep: { name: "Quick Step", max: 5, desc: "+2% double-turn chance per point" },
  toughness: { name: "Toughness", max: 10, desc: "+10 max HP per point" },
  critTraining: { name: "Critical Training", max: 5, desc: "+1.5% crit chance per point" },
  fieldMedic: { name: "Field Medic", max: 5, desc: "+15% healing effectiveness per point" },
  scavenger: { name: "Scavenger", max: 5, desc: "+10% chance for bonus loot per point" },
  adrenaline: { name: "Adrenaline", max: 3, desc: "Below 30% HP: +5% dodge & +10% dmg per point" }
};

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
  if (Math.random() < defender.dodgeChance) {
    return { dodged: true };
  }

  let damage = weapon.damage;
  let critChance = weapon.critChance;

  // If player is attacking, apply critTraining
  if (attacker === player) {
    critChance += player.skills.critTraining * 0.015;
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

  if (template.slot === "gun") {
    inventory.gun = instance;
  } else if (template.slot === "melee") {
    inventory.melee = instance;
  }
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

  const emptyIndex = inventory.slots.findIndex(slot => slot === null);

  if (emptyIndex !== -1) {
    inventory.slots[emptyIndex] = { id: itemId, quantity: 1 };
    logExploration("Found " + itemDefs[itemId].name);
    return true;
  }

  logExploration("Inventory full! Couldn't pick up " + itemDefs[itemId].name);
  return false;
}

function useItem(slotIndex) {
  if (game.phase !== "battle") return;

  const slot = inventory.slots[slotIndex];
  if (!slot) return;

  const def = itemDefs[slot.id];
  if (!def) return;

  if (def.type === "heal") {
    const healBonus = 1 + (player.skills.fieldMedic * 0.15);
    const healAmount = Math.floor(def.value * healBonus);
    player.hp = Math.min(player.hp + healAmount, player.maxHP);
    logBattle("Used " + def.name + " — healed " + healAmount + " HP");
  }

  if (def.type === "ammo") {
    if (inventory.gun) {
      inventory.gun.currentAmmo = Math.min(
        inventory.gun.currentAmmo + def.value,
        inventory.gun.maxAmmo
    )};
  }

  slot.quantity--;
  if (slot.quantity <= 0) {
    inventory.slots[slotIndex] = null;
  }

  renderAll();
  enemyTurn();
}

function getAvailableLocations() {
  return Object.entries(locations).filter(
    ([key, loc]) => key !== game.lastLocationKey
  );
}

let battleLog = [];
let explorationLog = [];

function logBattle(message) {
  battleLog.push(message);
  renderBattleLog();
}

function logExploration(message) {
  explorationLog.push(message);
  renderExplorationLog();
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
  } else if (phase === "exploration") {
    explorationScreen.classList.add("active");
  }

  renderAll();
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

  if (player.hp < 100) {
    logExploration("Area clear. No zombies encountered. Rest Bonus, + 10HP!");
    player.hp += 10;
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
    enemy.hp -= result.damage;
    if (enemy.hp < 0) enemy.hp = 0;
    logBattle(result.isCrit
      ? "🎯 CRITICAL SHOT! " + result.damage + " damage!"
      : "You shoot " + enemy.name + " for " + result.damage + " damage");
  }

  let damage = result.damage;
  if (adrenalineActive && !result.dodged) {
    const bonus = player.skills.adrenaline * 0.10;
    damage = Math.floor(damage * (1 + bonus));
    logBattle("🔥 Adrenaline surge! +" + Math.round(bonus * 100) + "% damage!");
  }
  if (!result.dodged) {
    enemy.hp -= damage;
    if (enemy.hp < 0) enemy.hp = 0;
  }

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

  // Durability loss per swing (5-10 points)
  melee.currentDurability -= 7;
  if (melee.currentDurability < 0) melee.currentDurability = 0;

  // radiusRisk check — zombie gets a free hit on you
  if (Math.random() < melee.radiusRisk) {
    const riskDamage = Math.floor(enemy.attack * 0.5);
    player.hp -= riskDamage;
    if (player.hp < 0) player.hp = 0;
    logBattle("⚠ Too close! " + enemy.name + " claws you for " + riskDamage + " while you swing!");
  }

  let adrenalineActive = false;
  if (player.hp / player.maxHP < 0.3 && player.skills.adrenaline > 0) {
    adrenalineActive = true;
    // Temporarily boost dodge (already in player.dodgeChance via applySkills? No — adrenaline is conditional)
    // Apply damage bonus after result
  }

  const result = calculateAttack(player, enemy, melee);

  if (result.dodged) {
    logBattle("You swing — " + enemy.name + " dodges!");
  } else {
    enemy.hp -= result.damage;
    if (enemy.hp < 0) enemy.hp = 0;
    logBattle(result.isCrit
      ? "⚔️ CRITICAL SLASH! " + result.damage + " damage!"
      : "You slash " + enemy.name + " for " + result.damage + " damage");
  }

  let damage = result.damage;
  if (adrenalineActive && !result.dodged) {
    const bonus = player.skills.adrenaline * 0.10;
    damage = Math.floor(damage * (1 + bonus));
    logBattle("🔥 Adrenaline surge! +" + Math.round(bonus * 100) + "% damage!");
  }
  if (!result.dodged) {
    enemy.hp -= damage;
    if (enemy.hp < 0) enemy.hp = 0;
  }

  if (Math.random() < melee.radiusRisk) {
    const riskDamage = Math.floor(enemy.attack * 0.5);
    player.hp -= riskDamage;
    if (player.hp < 0) player.hp = 0;
    logBattle("⚠ Too close! ...");
    if (player.hp <= 0) { handleGameOver(); return; }
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
    player.hp -= result.damage;
    if (player.hp < 0) player.hp = 0;
    logBattle(enemy.name + " hits you for " + result.damage + " damage!");
  }

  if (enemy.ability === "doubleTurnChance" && Math.random() < 0.3) {
    logBattle(enemy.name + " is fast — attacks again!");
    const result2 = calculateAttack(enemy, player, zombieWeapon);
    if (result2.dodged) {
      logBattle(enemy.name + "'s second attack — you dodge!");
    } else {
      player.hp -= result2.damage;
      if (player.hp < 0) player.hp = 0;
      logBattle(enemy.name + " hits you for " + result2.damage + " more damage!");
    }
  }

  player.dodgeChance -= tempDodgeBoost;

  renderAll();

  if (player.hp <= 0) {
    handleGameOver();
  }
}

function handleEnemyDefeated() {
  const enemy = getCurrentEnemy();
  logBattle(enemy.name + " defeated!");

  // XP award
  let xpGain = 10;
  if (enemy.isRare) xpGain = 25;
  if (enemy.isBoss) xpGain = 50;
  xpGain = Math.floor(xpGain * (1 + (game.waveNumber - 1) * 0.1));

  player.xp += xpGain;
  logBattle("+" + xpGain + " XP");

  // Level up check
  checkLevelUp();

  game.currentEnemyIndex++;

  if (game.currentEnemyIndex < game.currentEnemies.length) {
    const next = getCurrentEnemy();
    logBattle(next.name + " approaches!");
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

function renderAll() {
  renderHeader();
  renderBattle();
  renderExploration();
  renderInventory();
  updateActionButtons();
}

function renderHeader() {
  document.getElementById("wave-number").textContent = game.waveNumber;
  document.getElementById("player-hp").textContent = player.hp;
  document.getElementById("player-level").textContent = player.level;
  document.getElementById("player-xp").textContent = player.xp;
  document.getElementById("xp-needed").textContent = xpToNextLevel();
  document.getElementById("skill-points").textContent = player.skillPoints;

  const bossIndicator = document.getElementById("boss-indicator");
  if (game.isBossWave) {
    bossIndicator.classList.remove("hidden");
  } else {
    bossIndicator.classList.add("hidden");
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
      el.textContent = "";
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
  });

  document.getElementById("base-upgrade-btn").addEventListener("click", function () {
    document.getElementById("upgrade-panel").classList.remove("hidden");
    document.getElementById("skill-panel").classList.add("hidden");
    document.getElementById("craft-panel").classList.add("hidden");
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

  document.getElementById("leave-base-btn").addEventListener("click", function () {
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

document.addEventListener("DOMContentLoaded", initGame);
