const config = {
    type: Phaser.AUTO,
    width: 1060,
    height: 840,
    scene: [Level1,Winner],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 300,
            },
        },
    }
};

const game = new Phaser.Game(config);