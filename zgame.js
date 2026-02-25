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
  pistol: {
    name: "Pistol",
    type: "ranged",
    damage: 12,
    critChance: 0.15,
    maxAmmo: 6
  },
  bat: {
    name: "Baseball Bat",
    type: "melee",
    damage: 8,
    critChance: 0.05
  },
  shotgun: {
    name: "Shotgun",
    type: "ranged",
    damage: 25,
    critChance: 0.10,
    maxAmmo: 2
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
    zombieChance: 0.4,
    rareEnemyChance: 0.05,
    bgImage: "./assets/hospitalbg.png",
  },
  policeStation: {
    name: "Police Station",
    lootTable: ["pistolAmmo", "shotgunAmmo", "medkit"],
    zombieChance: 0.6,
    rareEnemyChance: 0.1,
    bgImage: "./assets/stationbg.png",
  },
  supermarket: {
    name: "Supermarket",
    lootTable: ["food", "bandage", "medkit"],
    zombieChance: 0.3,
    rareEnemyChance: 0.03,
    bgImage: "./assets/marketbg.png",
  },
  apartment: {
    name: "Apartment Complex",
    lootTable: ["food", "medkit", "bandage", "pistolAmmo", "shotgunAmmo"],
    zombieChance: 0.35,
    rareEnemyChance: 0.04,
    bgImage: "./assets/apartmentbg.png",
  }
};

const player = {
  hp: 100,
  maxHP: 100,
  equippedWeapon: null,
  dodgeChance: 0.10,
  heavyCooldown: 0,
};

const inventory = {
  primary: "pistol",
  secondary: "bat",
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

  const isCrit = Math.random() < weapon.critChance;
  if (isCrit) {
    damage *= 2;
  }

  return { dodged: false, damage, isCrit };
}

function equipWeapon(weaponKey) {
  const template = weapons[weaponKey];
  player.equippedWeapon = {
    ...template,
    key: weaponKey,
    currentAmmo: template.type === "ranged" ? template.maxAmmo : null
  };
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
    player.hp = Math.min(player.hp + def.value, player.maxHP);
    logBattle("Used " + def.name + " — healed " + def.value + " HP");
  }

  if (def.type === "ammo") {
    if (player.equippedWeapon && player.equippedWeapon.type === "ranged") {
      player.equippedWeapon.currentAmmo = Math.min(
        player.equippedWeapon.currentAmmo + def.value,
        player.equippedWeapon.maxAmmo
      );
      logBattle("Used " + def.name + " — reloaded weapon");
    } else {
      logBattle("Can't use ammo — no ranged weapon equipped");
      return;
    }
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
  const explorationScreen = document.getElementById("exploration-screen");

  if (phase === "battle") {
    battleScreen.classList.add("active");
    explorationScreen.classList.remove("active");
  } else {
    battleScreen.classList.remove("active");
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

function playerAttack() {
  if (game.phase !== "battle") return;

  const enemy = getCurrentEnemy();
  if (!enemy) return;

  const weapon = player.equippedWeapon;

  if (weapon.type === "ranged") {
    if (weapon.currentAmmo <= 0) {
      logBattle("Click! No ammo — reload first!");
      return;
    }
    weapon.currentAmmo--;
  }

  const result = calculateAttack(player, enemy, weapon);

  if (result.dodged) {
    logBattle("You attack — " + enemy.name + " dodges!");
  } else {
    enemy.hp -= result.damage;
    if (enemy.hp < 0) enemy.hp = 0;

    if (result.isCrit) {
      logBattle("CRITICAL HIT! " + result.damage + " damage to " + enemy.name + "!");
    } else {
      logBattle("You deal " + result.damage + " damage to " + enemy.name);
    }
  }

  if (player.heavyCooldown > 0) player.heavyCooldown--;

  renderAll();

  if (enemy.hp <= 0) {
    handleEnemyDefeated();
  } else {
    enemyTurn();
  }
}

function playerHeavyAttack() {
  if (game.phase !== "battle") return;
  if (player.heavyCooldown > 0) return;

  const enemy = getCurrentEnemy();
  if (!enemy) return;

  const weapon = player.equippedWeapon;

  if (weapon.type === "ranged") {
    if (weapon.currentAmmo <= 0) {
      logBattle("Click! No ammo — reload first!");
      return;
    }
    weapon.currentAmmo--;
  }

  const result = calculateAttack(player, enemy, weapon);

  if (result.dodged) {
    logBattle("Heavy attack — " + enemy.name + " dodges!");
  } else {
    const heavyDamage = Math.floor(result.damage * 1.5);
    enemy.hp -= heavyDamage;
    if (enemy.hp < 0) enemy.hp = 0;

    if (result.isCrit) {
      logBattle("💥 HEAVY CRIT! " + heavyDamage + " damage to " + enemy.name + "!");
    } else {
      logBattle("💪 Heavy attack! " + heavyDamage + " damage to " + enemy.name);
    }
  }

  player.heavyCooldown = 3;

  renderAll();

  if (enemy.hp <= 0) {
    handleEnemyDefeated();
  } else {
    enemyTurn();
  }
}

function playerReload() {
  if (game.phase !== "battle") return;

  const weapon = player.equippedWeapon;

  if (weapon.type !== "ranged") {
    logBattle("Melee weapon — no need to reload");
    return;
  }

  if (weapon.currentAmmo >= weapon.maxAmmo) {
    logBattle("Already fully loaded!");
    return;
  }

  weapon.currentAmmo = weapon.maxAmmo;
  logBattle("Reloaded " + weapon.name + " (" + weapon.maxAmmo + "/" + weapon.maxAmmo + ")");

  if (player.heavyCooldown > 0) player.heavyCooldown--;

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

  renderAll();

  if (player.hp <= 0) {
    handleGameOver();
  }
}

function handleEnemyDefeated() {
  const enemy = getCurrentEnemy();
  logBattle(enemy.name + " defeated!");
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
    setPhase("exploration");
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
  const primaryEl = document.getElementById("primary-slot");
  const secondaryEl = document.getElementById("secondary-slot");

  primaryEl.textContent = inventory.primary ? weapons[inventory.primary].name : "Empty";
  secondaryEl.textContent = inventory.secondary ? weapons[inventory.secondary].name : "Empty";

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
  const attackBtn = document.getElementById("attack-btn");
  const heavyBtn = document.getElementById("heavy-btn");
  const reloadBtn = document.getElementById("reload-btn");
  const useItemBtn = document.getElementById("use-item-btn");
  const fleeBtn = document.getElementById("flee-btn");

  const weapon = player.equippedWeapon;
  const inBattle = game.phase === "battle";

  attackBtn.disabled = !inBattle ||
    (weapon && weapon.type === "ranged" && weapon.currentAmmo <= 0);

  heavyBtn.disabled = !inBattle || player.heavyCooldown > 0;

  reloadBtn.disabled = !inBattle ||
    !weapon ||
    weapon.type === "melee" ||
    (weapon.type === "ranged" && weapon.currentAmmo >= weapon.maxAmmo);

  const hasItems = inventory.slots.some(function (slot) { return slot !== null; });
  useItemBtn.disabled = !inBattle || !hasItems;

  fleeBtn.disabled = !inBattle || game.isBossWave;
}

function setupEventListeners() {
  document.getElementById("attack-btn").addEventListener("click", playerAttack);
  document.getElementById("heavy-btn").addEventListener("click", playerHeavyAttack);
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
}

function initGame() {
  player.hp = 100;
  player.maxHP = 100;
  player.heavyCooldown = 0;

  inventory.primary = "pistol";
  inventory.secondary = "bat";
  equipWeapon("pistol");

  inventory.slots = [null, null, null, null, null, null];

  addItem("medkit");
  addItem("pistolAmmo");

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