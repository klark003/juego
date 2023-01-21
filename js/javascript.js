let gameScene = new Phaser.Scene('Game');

var teclas;
var playing = false;
var dir = "-";
var onAir = false;
var distanceJump = -80;
var isLoadJump = false;

gameScene.init = function () {

}

gameScene.preload = function () {
    //cargar de imagenes
    this.load.image('floor', 'assets/img/floor.jpg');
    this.load.image('block', 'assets/img/block.jpg');
    this.load.image('player', 'assets/img/caballero.jpeg');
    this.load.image('fondo', 'assets/img/fondo3.png');

    //Cargar sonido
    this.load.audio('music', 'assets/music/backgroundmusic.mp3');

}

gameScene.create = function () {

    if (!playing && !this.load.isLoading()) {
        playing = true;
        var music = this.sound.add('music');
        music.play();
        music.loop = true;
    }
    console.log(this.load.isLoading())
    this.add.image(500, 380, 'fondo');
    //piso 
    var piso = this.add.tileSprite(480, 700, 3 * 420, 1 * 100, 'floor');
    this.physics.add.existing(piso, true);

    //escalon
    var platform = this.add.tileSprite(230, 500, 5 * 69, 1 * 49, 'block');
    this.physics.add.existing(platform, true);

    var platform2 = this.add.tileSprite(650, 370, 4 * 69, 2 * 49, 'block');
    this.physics.add.existing(platform2, true);

    var platform3 = this.add.tileSprite(200, 200, 2 * 69, 1 * 49, 'block');
    this.physics.add.existing(platform3, true);

    //player
    this.player = this.add.sprite(180, 462, 'player');
    this.physics.add.existing(this.player);

    //colisiones
    this.physics.add.collider(this.player, piso);
    this.physics.add.collider(this.player, platform);
    this.physics.add.collider(this.player, platform2);
    this.physics.add.collider(this.player, platform3);

    //teclas
    teclas = this.input.keyboard.createCursorKeys();

}

gameScene.update = function () {
    this.player.body.velocity.x = 0;
    if(teclas.up.isDown){
        if(this.player.body.touching.down){
            isLoadJump = true;
            if(distanceJump >= -400){
                distanceJump -= 2;
            }
        }
    }else if(isLoadJump){
        isLoadJump = false;
        this.player.body.velocity.y = distanceJump;
    }
    if (this.player.body.touching.down) {
        if (teclas.left.isDown) {
            dir = "-";
        } else if (teclas.right.isDown) {
            dir = "+";
        }
        if(!teclas.up.isDown){
            distanceJump = -80;
        }
    }else{
        if (dir == "-") {
            this.player.body.velocity.x = -200;
        } else {
            this.player.body.velocity.x = 200;
        }
    }

}


const config = {
    type: Phaser.AUTO,
    width: 1060,
    height: 840,
    scene: gameScene,
    physics: {
        default: 'arcade',
        arcade: {
            //debug: true,
            gravity: {
                y: 300,
            },
        },
    }
};

const game = new Phaser.Game(config);