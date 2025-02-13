function component(width, height, color, x, y, type) {
    this.type = type;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speedX = 0;
    this.speedY = 0;
    this.gravity = 0.05;
    this.gravitySpeed = 0;
    this.update = function() {
      ctx = myGameArea.context;
      ctx.fillStyle = color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.newPos = function() {
      this.gravitySpeed += this.gravity;
      this.x += this.speedX;
      this.y += this.speedY + this.gravitySpeed;
    }
}

const player = document.getElementById('player');
const box = document.getElementById('box');
let velocity = 0;
const gravity = 0.8;
const bounce = 0.7;
let lastTime = 0;

function applyGravity(timestamp) {
    if (!lastTime) lastTime = timestamp;
    const deltaTime = (timestamp - lastTime) / 1000;
    lastTime = timestamp;

    const boxHeight = box.clientHeight;
    const playerHeight = player.clientHeight;
    const playerTop = player.offsetTop;

    if (playerTop + playerHeight >= boxHeight) {
        velocity = -velocity * bounce;
        player.style.top = `${boxHeight - playerHeight}px`;
    } else {
        velocity += gravity * deltaTime;
        player.style.top = `${playerTop + velocity}px`;
    }

    requestAnimationFrame(applyGravity);
}

function isOnGround() {
    const boxHeight = box.clientHeight;
    const playerHeight = player.clientHeight;
    const playerTop = player.offsetTop;
    return playerTop + playerHeight >= boxHeight;
}

player.style.position = 'absolute';
player.style.top = `${box.clientHeight - player.clientHeight}px`;
player.style.left = '5px';
requestAnimationFrame(applyGravity);

export { isOnGround };
