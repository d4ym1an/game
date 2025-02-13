document.addEventListener('DOMContentLoaded', () => {
    const player = document.getElementById('player');
    const platform = document.getElementById('platform');
    const box = document.getElementById('box');

    function checkCollision(player, platform) {
        const playerRect = player.getBoundingClientRect();
        const platformRect = platform.getBoundingClientRect();

        return !(
            playerRect.top > platformRect.bottom ||
            playerRect.bottom < platformRect.top ||
            playerRect.right < platformRect.left ||
            playerRect.left > platformRect.right
        );
    }

    function update() {
        if (checkCollision(player, platform)) {
            // Handle collision
            player.style.top = `${platform.offsetTop - player.offsetHeight}px`;
        }
        requestAnimationFrame(update);
    }

    update();
});
