document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('box');
    const ctx = canvas.getContext('2d');

    const player = {
        x: 100,
        y: 100,
        width: 25,
        height: 25,
        speed: 10,
        dy: 0,
        gravity: 0.5,
        jumpPower: -10,
        grounded: false
    };

    export const platform = {
        x: 200, // Example value, adjust as needed
        y: 500, // Example value, adjust as needed
        width: 200,
        height: 100
    };

    export function checkCollision(player, platform) {
        return !(
            player.y > platform.y + platform.height ||
            player.y + player.height < platform.y ||
            player.x + player.width < platform.x ||
            player.x > platform.x + platform.width
        );
    }

    function update() {
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

        requestAnimationFrame(update);
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
