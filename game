// Получаем элементы канваса и контекста
const gameCanvas = document.getElementById('gameCanvas');
const ctx = gameCanvas.getContext('2d');

// Инициализация переменных игры
let player = {
    x: 50,
    y: 50,
    width: 30,
    height: 30,
    speed: 2,
    jumpPower: 5,
    isJumping: false,
    velocityY: 0,
    controls: {
        left: false,
        right: false,
        jump: false,
        run: false,
        attack: false,
        build: false,
        break: false,
        use: false,
    }
};

// Обработчики событий для управления
document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowLeft':
            player.controls.left = true;
            break;
        case 'ArrowRight':
            player.controls.right = true;
            break;
        case ' ':
            player.controls.jump = true;
            break;
        case 'Shift':
            player.controls.run = true;
            break;
        case 'a':
            player.controls.attack = true;
            break;
        case 'b':
            player.controls.build = true;
            break;
        case 'x':
            player.controls.break = true;
            break;
        case 'e':
            player.controls.use = true;
            break;
    }
});

document.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'ArrowLeft':
            player.controls.left = false;
            break;
        case 'ArrowRight':
            player.controls.right = false;
            break;
        case ' ':
            player.controls.jump = false;
            break;
        case 'Shift':
            player.controls.run = false;
            break;
        case 'a':
            player.controls.attack = false;
            break;
        case 'b':
            player.controls.build = false;
            break;
        case 'x':
            player.controls.break = false;
            break;
        case 'e':
            player.controls.use = false;
            break;
    }
});

// Функция для обработки касаний на мобильных устройствах
function setupMobileControls() {
    const moveLeftButton = document.getElementById('move-button');
    const moveRightButton = document.getElementById('run-button');
    const jumpButton = document.getElementById('jump-button');
    const attackButton = document.getElementById('attack-button');
    const buildButton = document.getElementById('build-button');
    const breakButton = document.getElementById('break-button');
    const useButton = document.getElementById('use-button');

    moveLeftButton.addEventListener('touchstart', () => player.controls.left = true);
    moveLeftButton.addEventListener('touchend', () => player.controls.left = false);
    
    moveRightButton.addEventListener('touchstart', () => player.controls.right = true);
    moveRightButton.addEventListener('touchend', () => player.controls.right = false);
    
    jumpButton.addEventListener('touchstart', () => player.controls.jump = true);
    jumpButton.addEventListener('touchend', () => player.controls.jump = false);
    
    attackButton.addEventListener('touchstart', () => player.controls.attack = true);
    attackButton.addEventListener('touchend', () => player.controls.attack = false);
    
    buildButton.addEventListener('touchstart', () => player.controls.build = true);
    buildButton.addEventListener('touchend', () => player.controls.build = false);
    
    breakButton.addEventListener('touchstart', () => player.controls.break = true);
    breakButton.addEventListener('touchend', () => player.controls.break = false);
    
    useButton.addEventListener('touchstart', () => player.controls.use = true);
    useButton.addEventListener('touchend', () => player.controls.use = false);
}

// Функция для обновления игры
function update() {
    // Движение игрока
    if (player.controls.left) {
        player.x -= player.speed;
    }
    if (player.controls.right) {
        player.x += player.speed;
    }
    
    // Прыжок
    if (player.controls.jump && !player.isJumping) {
        player.velocityY = -player.jumpPower;
        player.isJumping = true;
    }

    // Гравитация
    player.velocityY += 0.2; // Эффект гравитации
    player.y += player.velocityY;

    // Проверка на "землю"
    if (player.y >= gameCanvas.height - player.height) {
        player.y = gameCanvas.height - player.height; // Не даем игроку провалиться
        player.isJumping = false;
        player.velocityY = 0;
    }

    // Ограничения по экрану
    if (player.x < 0) player.x = 0;
    if (player.x + player.width > gameCanvas.width) player.x = gameCanvas.width - player.width;

    // Обработка действий игрока
    if (player.controls.attack) {
        console.log("Игрок атакует!");
        // Логика атаки здесь
    }
    if (player.controls.build) {
        console.log("Игрок строит!");
        // Логика строительства здесь
    }
    if (player.controls.break) {
        console.log("Игрок ломает!");
        // Логика разрушения здесь
    }
    if (player.controls.use) {
        console.log("Игрок использует предмет!");
        // Логика использования предметов здесь
    }
}

// Функция для отрисовки игрока
function draw() {
    ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height); // Очистка канваса
    ctx.fillStyle = 'green'; // Цвет игрока
    ctx.fillRect(player.x, player.y, player.width, player.height); // Отрисовка игрока
}

// Основной игровой цикл
function gameLoop() {
    update(); // Обновление состояния игры
    draw(); // Отрисовка элементов
    requestAnimationFrame(gameLoop); // Запрос следующего кадра
}

// Запуск игры
function startGame() {
    gameCanvas.width = window.innerWidth;
    gameCanvas.height = window.innerHeight;
    setupMobileControls(); // Устанавливаем управление для мобильных устройств
    gameLoop(); // Запуск игрового цикла
}

// Настройка генерации мира с помощью нейросети
function generateWorld() {
    // Здесь будет логика генерации мира с использованием нейросети
    console.log("Генерация мира с помощью нейросети...");
}

// Вызываем генерацию мира при старте игры
generateWorld();
