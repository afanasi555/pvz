// Инициализация приложения PIXI.js
const app = new PIXI.Application({
    width: 800,  // Ширина канваса
    height: 600,  // Высота канваса
    backgroundColor: 0x1099bb,  // Цвет фона
});
document.body.appendChild(app.view);  // Добавление канваса в DOM

// Переменные для хранения игровых объектов
let plants = [];
let zombies = [];
let sunCount = 0;

// Загрузка ресурсов
PIXI.Loader.shared
    .add([
        "assets/res/normal/sunflower1.png", "assets/res/normal/sunflower2.png", "assets/res/normal/sunflower3.png",
        "assets/res/normal/peashooter1.png", "assets/res/normal/peashooter2.png", "assets/res/normal/peashooter3.png",
        "assets/res/normal/pea1.png", "assets/res/normal/pea2.png", "assets/res/normal/pea3.png",
        "assets/res/normal/potatomine1.png", "assets/res/normal/potatomine2.png", "assets/res/normal/potatomine3.png",
        "assets/res/normal/potatomine_explode1.png", "assets/res/normal/potatomine_explode2.png", "assets/res/normal/potatomine_explode3.png",
        "assets/res/normal/snowpea1.png", "assets/res/normal/snowpea2.png", "assets/res/normal/snowpea3.png",
        "assets/res/normal/snowpea_shoot1.png", "assets/res/normal/snowpea_shoot2.png", "assets/res/normal/snowpea_shoot3.png",
        "assets/res/normal/chili1.png", "assets/res/normal/chili2.png", "assets/res/normal/chili3.png",
        "assets/res/normal/repeater1.png", "assets/res/normal/repeater2.png", "assets/res/normal/repeater3.png",
        "assets/res/normal/repeater_pea1.png", "assets/res/normal/repeater_pea2.png", "assets/res/normal/repeater_pea3.png",
        "assets/res/normal/corn1.png", "assets/res/normal/corn2.png", "assets/res/normal/corn3.png",
        "assets/res/normal/corn_shot1.png", "assets/res/normal/corn_shot2.png", "assets/res/normal/corn_shot3.png",
        "assets/res/normal/garlic1.png", "assets/res/normal/garlic2.png", "assets/res/normal/garlic3.png",
        "assets/res/normal/zombie_normal1.png", "assets/res/normal/zombie_normal2.png", "assets/res/normal/zombie_normal3.png",
        "assets/res/normal/zombie_buckethead1.png", "assets/res/normal/zombie_buckethead2.png", "assets/res/normal/zombie_buckethead3.png",
        "assets/res/normal/zombie_conehead1.png", "assets/res/normal/zombie_conehead2.png", "assets/res/normal/zombie_conehead3.png",
        "assets/res/normal/zombie_runner1.png", "assets/res/normal/zombie_runner2.png", "assets/res/normal/zombie_runner3.png",
        // Добавьте сюда все ресурсы, которые необходимо загрузить
    ])
    .load(onAssetsLoaded);

// Функция, вызываемая после загрузки ресурсов
function onAssetsLoaded() {
    // Начальная настройка игры
    resetGame();

    // Инициализация выбора растений
    createPlantSelection();
}

// Функция для сброса игры
function resetGame() {
    sunCount = 0;
    plants = [];
    zombies = [];
    document.getElementById('sun-count').textContent = sunCount;

    // Удаляем все объекты с канваса
    app.stage.removeChildren();

    // Повторная установка сцен после сброса
    setupLevel();
}

// Настройка уровня
function setupLevel() {
    // Пример создания растения и зомби на начальном уровне
    createPlant('sunflower', 100, 100, PIXI.Loader.shared.resources);
    createZombie('zombie_normal1', 800, 100, PIXI.Loader.shared.resources);
}

// Функция создания растения
function createPlant(type, x, y, resources) {
    // Пример создания растения, с использованием текстур
    let textures;
    switch (type) {
        case 'sunflower':
            textures = [
                resources['assets/res/normal/sunflower1.png'].texture,
                resources['assets/res/normal/sunflower2.png'].texture,
                resources['assets/res/normal/sunflower3.png'].texture
            ];
            break;
        // Добавьте остальные растения
    }

    const plant = new PIXI.AnimatedSprite(textures);
    plant.x = x;
    plant.y = y;
    plant.animationSpeed = 0.1;
    plant.play();

    plants.push(plant);
    app.stage.addChild(plant);
}

// Функция создания зомби
function createZombie(type, x, y, resources) {
    let textures;
    switch (type) {
        case 'zombie_normal1':
            textures = [
                resources['assets/res/normal/zombie_normal1.png'].texture,
                resources['assets/res/normal/zombie_normal2.png'].texture,
                resources['assets/res/normal/zombie_normal3.png'].texture
            ];
            break;
        // Добавьте остальные зомби
    }

    const zombie = new PIXI.AnimatedSprite(textures);
    zombie.x = x;
    zombie.y = y;
    zombie.animationSpeed = 0.1;
    zombie.play();

    zombies.push(zombie);
    app.stage.addChild(zombie);

    app.ticker.add(() => {
        zombie.x -= 1;
        plants.forEach(plant => {
            if (detectCollision(zombie, plant)) {
                // Обработка столкновения зомби с растением
            }
        });
    });
}

// Функция для создания снаряда
function createProjectile(x, y, plantType, resources) {
    let texture;
    switch (plantType) {
        case 'peashooter':
            texture = resources['assets/res/normal/pea1.png'].texture;
            break;
        // Добавьте остальные снаряды для других растений
    }

    const projectile = new PIXI.Sprite(texture);
    projectile.x = x;
    projectile.y = y;
    app.stage.addChild(projectile);

    app.ticker.add(() => {
        projectile.x += 5;
        zombies.forEach(zombie => {
            if (detectCollision(projectile, zombie)) {
                app.stage.removeChild(zombie);
                app.stage.removeChild(projectile);
            }
        });
        if (projectile.x > app.screen.width) {
            app.stage.removeChild(projectile);
        }
    });
}

// Функция для обработки столкновений
function detectCollision(sprite1, sprite2) {
    return !(sprite1.x > sprite2.x + sprite2.width ||
        sprite1.x + sprite1.width < sprite2.x ||
        sprite1.y > sprite2.y + sprite2.height ||
        sprite1.y + sprite1.height < sprite2.y);
}
