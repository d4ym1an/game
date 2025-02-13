import { isOnGround } from './gravity.js';

document.addEventListener('DOMContentLoaded', (event) => {
    const player = document.getElementById('player');
    const box = document.getElementById('box');
    const boxHeight = box.clientHeight;
    const playerHeight = player.clientHeight;
    let position = { top: boxHeight - playerHeight, left: 5 };

    document.addEventListener('keydown', (e) => {
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
});
