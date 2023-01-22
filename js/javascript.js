let gameScene = new Phaser.Scene('Game');

var teclas;
var playing = false;
var dir = "-";
var onAir = false;
var distanceJump = -80;
var isLoadJump = false;
var platforms;
var player;
var floor;
var walls;
var level = 5;
var posBlocksLevels = [
    {//lvl 0
        floor: true,
        blocks: [
            { x: 600, y: 20 }, { x: 700, y: 20 },{ x: 800, y: 20 }, { x: 900, y: 20 },
            { x: 100, y: 150 },
            { x: 600, y: 300 }, { x: 700, y: 300 },
            { x: 100, y: 400 }, { x: 200, y: 400 }, 
            { x: 500, y: 580 }, { x: 600, y: 580 }, { x: 700, y: 580 },
        ]
    },//end lvl 0
    {//lvl 1
        blocks: [
            { x: 100, y: 200 },{ x: 200, y: 200 },{ x: 660, y: 200 },{ x: 760, y: 200 },
            { x: 300, y: 400 },
            { x: 500, y: 500 },
            { x: 900, y: 600 },
            { x: 600, y: 820 },{ x: 700, y: 820 },{ x: 800, y: 820 },{ x: 900, y: 820 },
        ]
    },//end lvl 1
    {//lvl 2
        blocks: [
            { x: 100, y: 200 },{ x: 200, y: 200 },{ x: 660, y: 200 },{ x: 760, y: 200 },
            { x: 300, y: 400 },
            { x: 300, y: 500 },{ x: 600, y: 500 },
            { x: 100, y: 700 },{ x: 200, y: 700 },{ x: 300, y: 700 },{ x: 400, y: 700 },
        ]
    },//end lvl 2
    {//lvl 3
        blocks: [
            { x: 660, y: 200 },{ x: 760, y: 200 },{ x: 860, y: 200 },
            { x: 860, y: 300 },
            { x: 300, y: 400 },{ x: 860, y: 400 },
            { x: 600, y: 500 },{ x: 860, y: 500 },
            { x: 860, y: 600 },
            { x: 360, y: 700 },{ x: 460, y: 700 },{ x: 560, y: 700 },{ x: 660, y: 700 },{ x: 760, y: 700 },{ x: 860, y: 700 },
            { x: 100, y: 760 },
        ]
    },//end lvl 3
    {//lvl 4
        blocks: [
            { x: 200, y: 100 },{ x: 500, y: 100 },
            { x: 760, y: 200 },
            { x: 660, y: 300 },
            { x: 200, y: 400 },
            { x: 200, y: 500 },{ x: 400, y: 500 },{ x: 600, y: 500 },
            { x: 860, y: 700 },{ x: 960, y: 700 },
        ]
    },//end lvl 4
    {//lvl 5
        blocks: [
            { x: 200, y: 100 },
            { x: 760, y: 200 },
            { x: 400, y: 250 },
            { x: 200, y: 400 },
            { x: 200, y: 500 },{ x: 600, y: 500 },
            { x: 200, y: 600 },
            { x: 200, y: 700 },{ x: 300, y: 700 },{ x: 760, y: 700 },{ x: 860, y: 700 },{ x: 960, y: 700 },
        ]
    },//end lvl 5

]

gameScene.init = function () {

}

gameScene.preload = function () {
    //cargar de imagenes
    this.load.image('wall', 'assets/img/wall.jpg');
    this.load.image('floor', 'assets/img/floor.jpg');
    this.load.image('block', 'assets/img/block.jpg');
    this.load.image('player', 'assets/img/caballero.jpeg');
    this.load.image('fondo', 'assets/img/fondo3.png');

    this.load.image('spikeUp', 'assets/img/spikeUp.png');
    this.load.image('spikeDown', 'assets/img/spikeDown.png');
    this.load.image('spikeLeft', 'assets/img/spikeLeft.png');
    this.load.image('spikeRight', 'assets/img/spikeRight.png');

    //Cargar sonido
    this.load.audio('music', 'assets/music/backgroundmusic.mp3');

}

gameScene.create = function () {

    if (!playing && !this.load.isLoading()) {
        playing = true;
        var music = this.sound.add('music');
        //music.play();
        music.loop = true;
    }

    this.add.image(530, 420, 'fondo');

    //player
    player = this.physics.add.sprite(300, 613, 'player');

    player.x = 300;
    player.y = 580;

    //plataforms
    platforms = this.physics.add.staticGroup();
    walls = this.physics.add.staticGroup();

    walls.create(0, 420, "wall");
    walls.create(1060, 420, "wall");

    createGameObjects(this);

    //colisiones

    this.physics.add.collider(player, walls, shockPlatformPlayer);

    //teclas
    teclas = this.input.keyboard.createCursorKeys();
    
}

function createGameObjects(game) {
    posBlocksLevels[level].blocks.forEach(pos => {
        platforms.create(pos.x, pos.y, "block");
    })
    if (posBlocksLevels[level].floor){
        platforms.create(530, 734, 'floor').setScale(2).refreshBody();
    }

    game.physics.add.collider(player, platforms, shockPlatformPlayer);
}

function changeLevel(game,isUp){
    let childrens = platforms.getChildren();
    while(childrens.length > 0){
        for (let i = 0; i < childrens.length; i++) {
            childrens[i].destroy();
        }
    }
    if(isUp){
        level++;
    }else{
        level--;
    }
    createGameObjects(game);
}

function shockPlatformPlayer(player, plataform) {
    if (!player.body.touching.down && !player.body.touching.up) {
        if (dir == "-") {
            dir = "+";
        } else {
            dir = "-";
        }
    }
}
function shockSpikePlayer(player, spike) {

}

gameScene.update = function () {

    if (player.y <= -16) {
        player.y = 840;
        changeLevel(this,true);
    }
    if (player.y >= 850) {
        player.y = -15;
        changeLevel(this,false);
    }

    player.body.velocity.x = 0;
    if (teclas.up.isDown) {
        if (player.body.touching.down) {
            isLoadJump = true;
            if (distanceJump >= -950) {
                distanceJump -= 10;
            }
        }
    } else if (isLoadJump) {
        isLoadJump = false;
        player.body.velocity.y = distanceJump;
    }
    if (player.body.touching.down) {
        if (teclas.left.isDown) {
            dir = "-";
        } else if (teclas.right.isDown) {
            dir = "+";
        }
        if (!teclas.up.isDown) {
            distanceJump = -80;
        }
    } else {
        if (dir == "-") {
            player.body.velocity.x = -200;
        } else {
            player.body.velocity.x = 200;
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
            gravity: {
                y: 300,
            },
        },
    }
};

const game = new Phaser.Game(config);