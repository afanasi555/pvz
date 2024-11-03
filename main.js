// Инициализация сцены
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('gameCanvas') });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Загрузка текстур
const textureLoader = new THREE.TextureLoader();
const blockTexture = textureLoader.load('./minecraft/textures/block.png'); // Путь к текстуре блока

// Создание игрового мира (простой плоскости с блоками)
const world = new THREE.Group();
const createBlock = (x, y, z) => {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ map: blockTexture });
    const block = new THREE.Mesh(geometry, material);
    block.position.set(x, y, z);
    world.add(block);
};

// Заполнение мира блоками
for (let x = -5; x <= 5; x++) {
    for (let z = -5; z <= 5; z++) {
        createBlock(x, 0, z);
    }
}
scene.add(world);

// Установка позиции камеры
camera.position.set(0, 5, 10);
camera.lookAt(0, 0, 0);

// Управление игроком
const controls = {
    forward: false,
    backward: false,
    left: false,
    right: false,
};

window.addEventListener('keydown', (event) => {
    switch (event.code) {
        case 'KeyW':
            controls.forward = true;
            break;
        case 'KeyS':
            controls.backward = true;
            break;
        case 'KeyA':
            controls.left = true;
            break;
        case 'KeyD':
            controls.right = true;
            break;
        case 'Space':
            addBlock();
            break;
        case 'KeyQ':
            removeBlock();
            break;
    }
});

window.addEventListener('keyup', (event) => {
    switch (event.code) {
        case 'KeyW':
            controls.forward = false;
            break;
        case 'KeyS':
            controls.backward = false;
            break;
        case 'KeyA':
            controls.left = false;
            break;
        case 'KeyD':
            controls.right = false;
            break;
    }
});

// Добавление блока
function addBlock() {
    const block = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshBasicMaterial({ map: blockTexture })
    );
    block.position.copy(camera.position);
    block.position.y -= 1; // Установка блока на уровень земли
    world.add(block);
}

// Удаление блока
function removeBlock() {
    const position = camera.position.clone();
    position.y -= 1; // Позиция для удаления блока
    const block = world.children.find(child => {
        return child.position.distanceTo(position) < 1; // Проверка на близость к камню
    });
    if (block) {
        world.remove(block);
    }
}

// Основной игровой цикл
function animate() {
    requestAnimationFrame(animate);
    
    // Обработка передвижения
    if (controls.forward) camera.position.z -= 0.1;
    if (controls.backward) camera.position.z += 0.1;
    if (controls.left) camera.position.x -= 0.1;
    if (controls.right) camera.position.x += 0.1;

    // Обновление мира
    renderer.render(scene, camera);
}

animate();

// Обработка изменения размера окна
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
