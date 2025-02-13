import { isOnGround } from './gravity.js';

document.addEventListener('DOMContentLoaded', (event) => {
    const player = document.getElementById('player');
    const box = document.getElementById('box');
    const boxHeight = box.clientHeight;
    const playerHeight = player.clientHeight;
    let position = { top: boxHeight - playerHeight, left: 5 };
    let speed = 10;
    let jumpPower = 20;
    if (!isOnGround()) return;

    const boxWidth = box.clientWidth;
    const boxHeight = box.clientHeight;
    const playerWidth = player.clientWidth;
    const playerHeight = player.clientHeight;

    switch (e.key) {
        case 'w':
            position.top = Math.max(0, position.top - 30);
            break;
        case 'a':
            position.left = Math.max(0, position.left - 10);
            break;
        case 's':
            position.top = Math.min(boxHeight - playerHeight, position.top + 10);
            break;
        case 'd':
            position.left = Math.min(boxWidth - playerWidth, position.left +  10);
            break;
    }
    player.style.top = position.top + 'px';
    player.style.left = position.left + 'px';

});

        if (e.key === 'd') keys.d = true;
    });

    document.addEventListener('keyup', (e) => {
        if (e.key === 'w') keys.w = false;
        if (e.key === 'a') keys.a = false;
        if (e.key === 's') keys.s = false;
        if (e.key === 'd') keys.d = false;
    });

    function update() {
        if (keys.w && player.grounded) {
            player.dy = player.jumpPower;
            player.grounded = false;
        }
        if (keys.a) player.x -= player.speed;
        if (keys.d) player.x += player.speed;

        player.dy += player.gravity;
        player.y += player.dy;

        if (checkCollision(player, platform)) {
            // Handle collision
            console.log('Collision detected');
            player.y = platform.y - player.height;
            player.dy = 0;
            player.grounded = true;
        } else {
            player.grounded = false;
        }

        if (player.y + player.height > canvas.height) {
            player.y = canvas.height - player.height;
            player.dy = 0;
            player.grounded = true;
        }

        if (player.y < 0) {
            player.y = 0;
            player.dy = 0;
        }

        if (player.x < 0) player.x = 0;
        if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'darkgreen';
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 5;
        ctx.strokeRect(player.x, player.y, player.width, player.height);
        ctx.fillRect(player.x, player.y, player.width, player.height);

        ctx.fillStyle = 'brown';
        ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
    }

    function loop() {
        update();
        draw();
        requestAnimationFrame(loop);
    }

    loop();
});