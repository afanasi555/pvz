const rows = 5;
const cols = 9;
let sunCount = 0;
const plants = [];
const unlockedPlants = [];
let selectedPlant = null;
let gameInterval;
let currentLevel = 1;

// Все доступные растения
const allPlants = {
    sunflower: { cost: 50 },
    peashooter: { cost: 100 },
    wallnut: { cost: 50 },
    potatomine: { cost: 25 },
    snowpea: { cost: 150 },
    chili: { cost: 100 },
    repeater: { cost: 200 },
    corn: { cost: 125 },
    garlic: { cost: 75 },
    twinflower: { cost: 150 },
    magnetshroom: { cost: 200 },
    cattail: { cost: 175 },
    catapult: { cost: 250 },
    sunflower_hybrid: { cost: 100 },
    // Добавьте другие гибридные растения здесь
};

// Все доступные зомби
const allZombies = {
    normal: { speed: 1 },
    conehead: { speed: 1.2 },
    buckethead: { speed: 1.5 },
    runner: { speed: 1.8 }
};

// Создание игрового поля
function createBoard() {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = ''; // Очистить поле перед началом новой игры
    for (let i = 0; i < rows * cols; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        gameBoard.appendChild(cell);
    }
}

// Добавление кнопок для выбора растений
function updatePlantSelection() {
    const plantSelection = document.getElementById('plant-selection');
    plantSelection.innerHTML = ''; // Очистить предыдущие кнопки

    Object.keys(allPlants).forEach(plantType => {
        if (currentLevel >= getPlantUnlockLevel(plantType)) {
            const button = document.createElement('button');
            button.textContent = plantType.charAt(0).toUpperCase() + plantType.slice(1);
            button.onclick = () => selectPlant(plantType);
            plantSelection.appendChild(button);
        }
    });
}

// Получение уровня разблокировки для растения
function getPlantUnlockLevel(plantType) {
    const unlockLevels = {
        sunflower: 1,
        peashooter: 1,
        wallnut: 1,
        potatomine: 1,
        snowpea: 2,
        chili: 2,
        repeater: 3,
        corn: 3,
        garlic: 4,
        twinflower: 4,
        magnetshroom: 5,
        cattail: 5,
        catapult: 5,
        sunflower_hybrid: 6,
        // Добавьте уровни для гибридных растений здесь
    };
    return unlockLevels[plantType] || Infinity;
}

// Выбор растения
function selectPlant(plantType) {
    selectedPlant = plantType;
}

// Добавление растения на поле
function addPlant(cellIndex) {
    if (selectedPlant) {
        const cell = document.querySelector(`.cell[data-index="${cellIndex}"]`);
        if (!cell.querySelector('.plant')) {
            const plant = document.createElement('div');
            plant.classList.add('plant', selectedPlant);
            cell.appendChild(plant);
            deductSunForPlant(selectedPlant);
        }
    }
}

// Уменьшение количества солнца при покупке растения
function deductSunForPlant(plantType) {
    const cost = allPlants[plantType].cost;
    sunCount -= cost;
    updateSunCount();
}

// Генерация солнца
function generateSun() {
    sunCount += 25;
    updateSunCount();
}

// Обновление отображения количества солнца
function updateSunCount() {
    document.getElementById('sun-count').textContent = sunCount;
}

// Спавн зомби
function spawnZombie() {
    const gameBoard = document.getElementById('game-board');
    const zombieTypes = Object.keys(allZombies);
    const zombieType = zombieTypes[Math.floor(Math.random() * zombieTypes.length)];
    const cellIndex = Math.floor(Math.random() * (rows * cols));
    const cell = document.querySelector(`.cell[data-index="${cellIndex}"]`);
    const zombie = document.createElement('div');
    zombie.classList.add('zombie', zombieType);
    cell.appendChild(zombie);

    // Перемещение зомби
    moveZombie(zombie, cellIndex);
}

// Перемещение зомби
function moveZombie(zombie, startCellIndex) {
    const interval = setInterval(() => {
        const cell = document.querySelector(`.cell[data-index="${startCellIndex}"]`);
        const nextCellIndex = startCellIndex + 1; // Пример движения вправо
        const nextCell = document.querySelector(`.cell[data-index="${nextCellIndex}"]`);
        if (nextCell) {
            cell.removeChild(zombie);
            nextCell.appendChild(zombie);
            startCellIndex = nextCellIndex;
        } else {
            clearInterval(interval);
            cell.removeChild(zombie);
            gameOver();
        }
    }, 1000);
}

// Генерация новых уровней
function generateNewLevels() {
    alert('Генерация новых уровней не реализована.');
}

// Сброс игры
function resetGame() {
    clearInterval(gameInterval);
    createBoard();
    sunCount = 0;
    updateSunCount();
    updatePlantSelection();
}

// Начало игры
function startGame() {
    createBoard();
    updatePlantSelection();
    setInterval(generateSun, 10000); // Генерация солнца каждые 10 секунд
    gameInterval = setInterval(spawnZombie, 5000); // Спавн зомби каждые 5 секунд
}

// Конец игры
function gameOver() {
    alert('Игра окончена!');
    resetGame();
}

// Начало игры при загрузке
document.addEventListener('DOMContentLoaded', () => {
    createBoard();
    document.querySelectorAll('.cell').forEach(cell => {
        cell.addEventListener('click', () => addPlant(cell.dataset.index));
    });
});
