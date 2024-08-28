// Инициализация PIXI.js
const app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 0x87CEEB
});
document.body.appendChild(app.view);

// Загрузка ресурсов
PIXI.Loader.shared
    .add('sunflower', 'assets/res/normal/sunflower1.png')
    .add('sunflower2', 'assets/res/normal/sunflower2.png')
    .add('sunflower3', 'assets/res/normal/sunflower3.png')
    .add('peashooter1', 'assets/res/normal/peashooter1.png')
    .add('peashooter2', 'assets/res/normal/peashooter2.png')
    .add('peashooter3', 'assets/res/normal/peashooter3.png')
    .add('pea1', 'assets/res/normal/pea1.png')
    .add('pea2', 'assets/res/normal/pea2.png')
    .add('pea3', 'assets/res/normal/pea3.png')
    .add('potatomine1', 'assets/res/normal/potatomine1.png')
    .add('potatomine2', 'assets/res/normal/potatomine2.png')
    .add('potatomine3', 'assets/res/normal/potatomine3.png')
    .add('potatomine_explode1', 'assets/res/normal/potatomine_explode1.png')
    .add('potatomine_explode2', 'assets/res/normal/potatomine_explode2.png')
    .add('potatomine_explode3', 'assets/res/normal/potatomine_explode3.png')
    .add('snowpea1', 'assets/res/normal/snowpea1.png')
    .add('snowpea2', 'assets/res/normal/snowpea2.png')
    .add('snowpea3', 'assets/res/normal/snowpea3.png')
    .add('snowpea_shoot1', 'assets/res/normal/snowpea_shoot1.png')
    .add('snowpea_shoot2', 'assets/res/normal/snowpea_shoot2.png')
    .add('snowpea_shoot3', 'assets/res/normal/snowpea_shoot3.png')
    .add('chili1', 'assets/res/normal/chili1.png')
    .add('chili2', 'assets/res/normal/chili2.png')
    .add('chili3', 'assets/res/normal/chili3.png')
    .add('repeater1', 'assets/res/normal/repeater1.png')
    .add('repeater2', 'assets/res/normal/repeater2.png')
    .add('repeater3', 'assets/res/normal/repeater3.png')
    .add('repeater_pea1', 'assets/res/normal/repeater_pea1.png')
    .add('repeater_pea2', 'assets/res/normal/repeater_pea2.png')
    .add('repeater_pea3', 'assets/res/normal/repeater_pea3.png')
    .add('corn1', 'assets/res/normal/corn1.png')
    .add('corn2', 'assets/res/normal/corn2.png')
    .add('corn3', 'assets/res/normal/corn3.png')
    .add('corn_shot1', 'assets/res/normal/corn_shot1.png')
    .add('corn_shot2', 'assets/res/normal/corn_shot2.png')
    .add('corn_shot3', 'assets/res/normal/corn_shot3.png')
    .add('garlic1', 'assets/res/normal/garlic1.png')
    .add('garlic2', 'assets/res/normal/garlic2.png')
    .add('garlic3', 'assets/res/normal/garlic3.png')
    .add('zombie_normal1', 'assets/res/normal/zombie_normal1.png')
    .add('zombie_normal2', 'assets/res/normal/zombie_normal2.png')
    .add('zombie_normal3', 'assets/res/normal/zombie_normal3.png')
    .add('zombie_buckethead1', 'assets/res/normal/zombie_buckethead1.png')
    .add('zombie_buckethead2', 'assets/res/normal/zombie_buckethead2.png')
    .add('zombie_buckethead3', 'assets/res/normal/zombie_buckethead3.png')
    .add('zombie_conehead1', 'assets/res/normal/zombie_conehead1.png')
    .add('zombie_conehead2', 'assets/res/normal/zombie_conehead2.png')
    .add('zombie_conehead3', 'assets/res/normal/zombie_conehead3.png')
    .add('zombie_runner1', 'assets/res/normal/zombie_runner1.png')
    .add('zombie_runner2', 'assets/res/normal/zombie_runner2.png')
    .add('zombie_runner3', 'assets/res/normal/zombie_runner3.png')
    .add('sunflowerHybrid', 'assets/res/hybrid/sunflower.png')
    .add('peashooterHybrid', 'assets/res/hybrid/peashooter.png')
    .add('wallnutHybrid', 'assets/res/hybrid/wallnut.png')
    .add('potatoMineHybrid', 'assets/res/hybrid/potato_mine.png')
    .add('chiliBeanHybrid', 'assets/res/hybrid/chili_bean.png')
    .add('zombieHybrid1', 'assets/res/hybrid/zombie1.png')
    .add('zombieHybrid2', 'assets/res/hybrid/zombie2.png')
    .add('zombieHybrid3', 'assets/res/hybrid/zombie3.png')
    .load(setup);

let sunCount = 0;
const plants = [];
const zombies = [];

// Настройка начального состояния
function setup(loader, resources) {
    createUI();
    createPlantSelection();
    // Добавляем начальные растения и зомби
    createPlant('sunflower', 100, 100, resources);
    createZombie('zombie_normal1', 800, 100, resources);
}

// Создание пользовательского интерфейса
function createUI() {
    const controls = document.getElementById('controls');
    document.getElementById('sun-count').textContent = sunCount;

    controls.querySelector('button[onclick="resetGame()"]').addEventListener('click', resetGame);
    controls.querySelector('button[onclick="startGame()"]').addEventListener('click', startGame);
    controls.querySelector('button[onclick="generateNewLevels()"]').addEventListener('click', generateNewLevels);
}

// Создание кнопок выбора растений
function createPlantSelection() {
    const selectionDiv = document.getElementById('plant-selection');

    const plantsData = [
        { type: 'sunflower', cost: 50 },
        { type: 'peashooter', cost: 100 },
        { type: 'wallnut', cost: 50 },
        { type: 'potatoMine', cost: 25 },
        { type: 'chiliBean', cost: 100 },
        { type: 'snowpea', cost: 75 },
        { type: 'repeater', cost: 150 },
        { type: 'corn', cost: 125 },
        { type: 'garlic', cost: 50 }
    ];

    plantsData.forEach(plant => {
        const button = document.createElement('button');
        button.textContent = `${plant.type} (${plant.cost} солнца)`;
        button.addEventListener('click', () => {
            if (sunCount >= plant.cost) {
                sunCount -= plant.cost;
                document.getElementById('sun-count').textContent = sunCount;
                createPlant(plant.type, 100, 100, PIXI.Loader.shared.resources);
            }
        });
        selectionDiv.appendChild(button);
    });
}

// Создание растения
function createPlant(type, x, y, resources) {
    const textures = [
        resources[`${type}1`].texture,
        resources[`${type}2`].texture,
        resources[`${type}3`].texture
    ];

    const plant = new PIXI.AnimatedSprite(textures);
    plant.x = x;
    plant.y = y;
    plant.animationSpeed = 0.1;
    plant.play();

    if (type === 'peashooter' || type === 'snowpea' || type === 'repeater' || type === 'corn') {
        plant.shoot = function() {
            createProjectile(this.x + this.width / 2, this.y, type, PIXI.Loader.shared.resources);
        };
    }

    plants.push(plant);
    app.stage.addChild(plant);
}

// Создание зомби
function createZombie(type, x, y, resources) {
    const textures = [
        resources[`${type}1`].texture,
        resources[`${type}2`].texture,
        resources[`${type}3`].texture
    ];

    const zombie = new PIXI.AnimatedSprite(textures);
    zombie.x = x;
    zombie.y = y;
    zombie.animationSpeed = 0.1;
    zombie.play();

    zombies.push(zombie);
    app.stage.addChild(zombie);

    app.ticker.add(() => {
        zombie.x -= 1;

        // Проверка на столкновение с растением
        plants.forEach(plant => {
            if (detectCollision(zombie, plant)) {
                // Логика взаимодействия с растением
            }
        });
    });
}

// Создание снаряда
function createProjectile(x, y, plantType, resources) {
    let texture;
    switch (plantType) {
        case 'peashooter':
            texture = PIXI.Loader.shared.resources['pea1'].texture;
            break;
        case 'snowpea':
            texture = PIXI.Loader.shared.resources['snowpea_shoot1'].texture;
            break;
        case 'repeater':
            texture = PIXI.Loader.shared.resources['repeater_pea1'].texture;
            break;
        case 'corn':
            texture = PIXI.Loader.shared.resources['corn_shot1'].texture;
            break;
    }

    const projectile = new PIXI.Sprite(texture);
    projectile.x = x;
    projectile.y = y;
    app.stage.addChild(projectile);

    app.ticker.add(() => {
        projectile.x += 5;

        // Проверка на столкновение с зомби
        zombies.forEach(zombie => {
            if (detectCollision(projectile, zombie)) {
                app.stage.removeChild(zombie); // Удаление зомби
                app.stage.removeChild(projectile); // Удаление снаряда
            }
        });

        // Удаление снаряда после выхода за пределы экрана
        if (projectile.x > app.screen.width) {
            app.stage.removeChild(projectile);
        }
    });
}

// Проверка на столкновение
function detectCollision(sprite1, sprite2) {
    return !(sprite1.x > sprite2.x + sprite2.width ||
             sprite1.x + sprite1.width < sprite2.x ||
             sprite1.y > sprite2.y + sprite2.height ||
             sprite1.y + sprite1.height < sprite2.y);
}

// Начать игру
function startGame() {
    console.log('Игра началась!');
    // Инициализировать игровой процесс
}

// Сброс игры
function resetGame() {
    console.log('Игра сброшена!');
    app.stage.removeChildren();
    sunCount = 0;
    document.getElementById('sun-count').textContent = sunCount;
    createPlantSelection();
}

// Генерация новых уровней
function generateNewLevels() {
    console.log('Генерация новых уровней...');
    app.stage.removeChildren();
    // Генерация нового уровня
    createPlant('sunflower', 100, 100, PIXI.Loader.shared.resources);
    createZombie('zombie_normal1', 800, 100, PIXI.Loader.shared.resources);
}
