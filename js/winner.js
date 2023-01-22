class Winner extends Phaser.Scene{
    constructor(){
        super({key: 'gameOver'});
    }

    preload(){
        this.load.image('winner', 'assets/img/winner.jpg');
    }

     create() {
        this.add.image(300,300,'winner');
    }
}