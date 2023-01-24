class Winner extends Phaser.Scene {
    constructor() {
        super({ key: 'gameOver' });
    }

    preload() {
        this.load.image('winner', 'assets/img/winner.jpg');
    }

    create() {
        this.add.image(530, 420, 'winner');
        this.input.keyboard.on('keydown', (event) => {
            if (event.keyCode === 8 || event.keyCode === 13) {
                window.history.back();
            }
        });
    }
}