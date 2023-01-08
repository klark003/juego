let gameScene = new Phaser.Scene('Game');

var teclas;
var playing = false;

gameScene.init = function(){

}

gameScene.preload = function(){
    //cargar de imagenes
    this.load.image('floor','assets/img/floor.jpg');
    this.load.image('block','assets/img/block.jpg');
    this.load.image('player','assets/img/caballero.jpeg');
    this.load.image('fondo', 'assets/img/fondo3.png');

    //Cargar sonido
    this.load.audio('music', 'assets/music/backgroundmusic.mp3');

}

gameScene.create = function(){

    if (!playing && !this.load.isLoading()) {
        playing = true
        var music = this.sound.add('music') 
        music.loop = true;
    }

    this.add.image(500, 380, 'fondo');
    //piso 
    var piso = this.add.tileSprite(480,700, 3* 420, 1* 100, 'floor');
    this.physics.add.existing(piso, true);

    //escalon
    var platform = this.add.tileSprite(230,500, 5* 69, 1* 49, 'block');
    this.physics.add.existing(platform, true);

    var platform2 = this.add.tileSprite(650,370, 4* 69, 2* 49, 'block');
    this.physics.add.existing(platform2, true);

    var platform3 = this.add.tileSprite(200,200, 2* 69, 1* 49, 'block');
    this.physics.add.existing(platform3, true);

    //player
    this.player = this.add.sprite(180,400,'player');
    this.physics.add.existing(this.player);

    //colisiones
    this.physics.add.collider(this.player, piso);
    this.physics.add.collider(this.player, platform);
    this.physics.add.collider(this.player, platform2);
    this.physics.add.collider(this.player, platform3);

    //teclas
    teclas = this.input.keyboard.createCursorKeys();

}

gameScene.update = function(){
    this.player.body.velocity.x = 0;
    if(teclas.left.isDown){
        this.player.body.velocity.x = -90;
    }else if(teclas.right.isDown){
        this.player.body.velocity.x = 90;

    }if (teclas.up.isDown && this.player.body.touching.down){
        this.player.body.velocity.y = -370;
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