const rows = 5;
const cols = 9;
let sunCount = 0;
const plants = [];
let selectedPlant = null;
let gameInterval;

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

// Выбор растения
function selectPlant(plantType) {
    selectedPlant = plantType;
}

// Добавление растения на поле
function addPlant(cellIndex) {
    if (selectedPlant && canAffordPlant(selectedPlant)) {
        const cell = document.querySelector(`.cell[data-index="${cellIndex}"]`);
        if (!cell.querySelector('.plant')) {
            const plant = document.createElement('div');
            plant.classList.add('plant', selectedPlant);
            cell.appendChild(plant);
            plants.push({ type: selectedPlant, position: cellIndex });
            deductSunForPlant(selectedPlant);
        }
    }
}

// Проверка на наличие ресурсов для покупки растения
function canAffordPlant(plantType) {
    const cost = getPlantCost(plantType);
    return sunCount >= cost;
}

// Получение стоимости растения
function getPlantCost(plantType) {
    switch (plantType) {
        case 'sunflower': return 50;
        case 'peashooter': return 100;
        case 'wallnut': return 50;
        case 'potatomine': return 25;
        case 'snowpea': return 150;
        default: return 0;
    }
}

// Вычитание ресурсов после покупки
function deductSunForPlant(plantType) {
    sunCount -= getPlantCost(plantType);
    updateSunCount();
}

// Обновление количества солнц на экране
function updateSunCount() {
    document.getElementById('sun-count').innerText = sunCount;
}

// Генерация солнц Подсолнухами
function generateSun() {
    sunCount += 25;
    updateSunCount();
}

// Спавн зомби
function spawnZombie() {
    const row = Math.floor(Math.random() * rows);
    const zombie = document.createElement('div');
    zombie.classList.add('zombie', getRandomZombieType());
    const startCell = document.querySelector(`.cell[data-index="${row * cols + (cols - 1)}"]`);
    startCell.appendChild(zombie);
    moveZombie(zombie, row * cols + (cols - 1));
}

// Рандомный выбор зомби
function getRandomZombieType() {
    const zombies = ['normal', 'conehead', 'buckethead', 'runner'];
    return zombies[Math.floor(Math.random() * zombies.length)];
}

// Движение зомби
function moveZombie(zombie, startPos) {
    let zombiePos = startPos;
    const moveInterval = setInterval(() => {
        const nextCell = document.querySelector(`.cell[data-index="${--zombiePos}"]`);
        if (!nextCell) {
            clearInterval(moveInterval);
            gameOver();
            return;
        }
        const plant = nextCell.querySelector('.plant');
        if (plant) {
            // Зомби атакует растение
            nextCell.removeChild(plant);
            clearInterval(moveInterval);
        } else {
            const currentCell = document.querySelector(`.cell[data-index="${zombiePos + 1}"]`);
            currentCell.removeChild(zombie);
            nextCell.appendChild(zombie);
        }
        if (zombiePos % cols === 0) {
            clearInterval(moveInterval);
            gameOver();
        }
    }, 1000);
}

// Запуск игры
function startGame() {
    createBoard();
    setInterval(generateSun, 10000); // Генерация солнца каждые 10 секунд
    gameInterval = setInterval(spawnZombie, 5000); // Спавн зомби каждые 5 секунд
}

// Сброс игры
function resetGame() {
    clearInterval(gameInterval);
    createBoard();
    sunCount = 0;
    updateSunCount();
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
