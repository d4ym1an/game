// Get the canvas element and its context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set canvas dimensions
canvas.width = 800;
canvas.height = 600;
canvas.style.backgroundColor = 'lightgreen';

// Set canvas border
canvas.style.border = '2px solid black';

// Get the player element
const playerElement = document.getElementById('player');

// Get the platform element
const platformElement = document.getElementById('platform');

// Player object
const player = {
    x: playerElement.offsetLeft,
    y: playerElement.offsetTop,
    width: playerElement.offsetWidth,
    height: playerElement.offsetHeight,
    speed: 5,
    dx: 0,
    dy: 0,
    isSprinting: false
};

// Gravity constant
const gravity = 0.5;

// Delay constant
const delay = 100; // 100 milliseconds

let lastKeyPressTime = 0;

// Clear the canvas
function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Check for collision with platform
function checkCollision() {
    const playerRect = playerElement.getBoundingClientRect();
    const platformRect = platformElement.getBoundingClientRect();

    if (
        playerRect.x < platformRect.x + platformRect.width &&
        playerRect.x + playerRect.width > platformRect.x &&
        playerRect.y < platformRect.y + platformRect.height &&
        playerRect.y + playerRect.height > platformRect.y
    ) {
        displayWinMessage();
    }
}

// Display win message
function displayWinMessage() {
    const winMessage = document.createElement('div');
    winMessage.innerText = 'You win! 🏆';
    winMessage.style.position = 'absolute';
    winMessage.style.top = '50%';
    winMessage.style.left = '50%';
    winMessage.style.fontSize = '24px';
    winMessage.style.color = 'black';
    document.body.appendChild(winMessage);
}

// Update player position
function update() {
    player.dy += gravity; // Apply gravity

    player.x += player.dx;
    player.y += player.dy;

    // Prevent player from leaving the canvas horizontally
    if (player.x < 0) {
        player.x = 0;
    } else if (player.x + player.width > canvas.width) {
        player.x = canvas.width - player.width;
    }

    // Prevent player from falling through the bottom of the canvas
    if (player.y + player.height > canvas.height) {
        player.y = canvas.height - player.height;
        player.dy = 0; // Stop vertical movement
    }

    // Prevent player from leaving the canvas vertically
    if (player.y < 0) {
        player.y = 0;
        player.dy = 0; // Stop vertical movement
    }

    playerElement.style.left = player.x + 'px';
    playerElement.style.top = player.y + 'px';

    checkCollision(); // Check for collision with platform

    requestAnimationFrame(update);
}

// Move player
function moveUp() {
    if (player.dy === 0) { // Allow jump only if player is on the ground
        player.dy = -player.speed * 2;
    }
}

function moveDown() {
    player.dy = player.speed;
}

function moveLeft() {
    player.dx = -player.speed;
}

function moveRight() {
    player.dx = player.speed;
}

// Stop player horizontal movement
function stopHorizontalMove() {
    player.dx = 0;
}

// Event listeners for key presses
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp' || e.key === 'w' || e.key === ' ') {
        moveUp();
    } else if (e.key === 'ArrowDown' || e.key === 's') {
        moveDown();
    } else if (e.key === 'ArrowLeft' || e.key === 'a') {
        moveLeft();
    } else if (e.key === 'ArrowRight' || e.key === 'd') {
        moveRight();
    }
});

document.addEventListener('keyup', (e) => {
    if (
        e.key === 'ArrowLeft' ||
        e.key === 'a' ||
        e.key === 'ArrowRight' ||
        e.key === 'd'
    ) {
        stopHorizontalMove();
    }
});

// Start the game
update();