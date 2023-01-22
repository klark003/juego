var teclas;
var playing = false;
var dir = "-";
var onAir = false;
var distanceJump = -80;
var isLoadJump = false;
var isTouchingFloor = true;
var player;
var platforms;
var walls;
var flag;
var soundShockFloor;
var soundShockPlataform;
var soundJump;
var soundWinner;
var music;
var level = 8;
var posBlocksLevels = [
    {//lvl 0
        blocks: [
            { x: 600, y: 20 }, { x: 700, y: 20 }, { x: 800, y: 20 }, { x: 900, y: 20 },
            { x: 100, y: 150 },
            { x: 600, y: 300 }, { x: 700, y: 300 },
            { x: 100, y: 400 }, { x: 200, y: 400 },
            { x: 500, y: 580 }, { x: 600, y: 580 }, { x: 700, y: 580 },
        ]
    },//end lvl 0
    {//lvl 1
        blocks: [
            { x: 100, y: 200 }, { x: 200, y: 200 }, { x: 660, y: 200 }, { x: 760, y: 200 },
            { x: 300, y: 400 },
            { x: 500, y: 500 },
            { x: 900, y: 600 },
            { x: 600, y: 820 }, { x: 700, y: 820 }, { x: 800, y: 820 }, { x: 900, y: 820 },
        ]
    },//end lvl 1
    {//lvl 2
        blocks: [
            { x: 100, y: 200 }, { x: 200, y: 200 }, { x: 660, y: 200 }, { x: 760, y: 200 },
            { x: 300, y: 400 },
            { x: 300, y: 500 }, { x: 600, y: 500 },
            { x: 100, y: 700 }, { x: 200, y: 700 }, { x: 300, y: 700 }, { x: 400, y: 700 },
        ]
    },//end lvl 2
    {//lvl 3
        blocks: [
            { x: 660, y: 200 }, { x: 760, y: 200 }, { x: 860, y: 200 },
            { x: 860, y: 300 },
            { x: 300, y: 400 }, { x: 860, y: 400 },
            { x: 600, y: 500 }, { x: 860, y: 500 },
            { x: 860, y: 600 },
            { x: 360, y: 700 }, { x: 460, y: 700 }, { x: 560, y: 700 }, { x: 660, y: 700 }, { x: 760, y: 700 }, { x: 860, y: 700 },
            { x: 100, y: 760 },
        ]
    },//end lvl 3
    {//lvl 4
        blocks: [
            { x: 200, y: 100 }, { x: 500, y: 100 },
            { x: 760, y: 200 },
            { x: 660, y: 300 },
            { x: 200, y: 400 },
            { x: 200, y: 500 }, { x: 400, y: 500 }, { x: 600, y: 500 },
            { x: 860, y: 700 }, { x: 960, y: 700 },
        ]
    },//end lvl 4
    {//lvl 5
        blocks: [
            { x: 200, y: 0 },
            { x: 200, y: 100 },
            { x: 200, y: 200 }, { x: 760, y: 200 },
            { x: 400, y: 250 },
            { x: 200, y: 300 },
            { x: 200, y: 400 },
            { x: 200, y: 500 }, { x: 600, y: 500 },
            { x: 200, y: 600 },
            { x: 200, y: 700 }, { x: 300, y: 700 }, { x: 760, y: 700 }, { x: 860, y: 700 }, { x: 960, y: 700 },
        ]
    },//end lvl 5
    {//lvl 6
        blocks: [
            { x: 200, y: 100 }, { x: 300, y: 100 },
            { x: 300, y: 200 }, { x: 760, y: 200 },
            { x: 400, y: 250 },
            { x: 300, y: 300 },
            { x: 300, y: 400 },
            { x: 300, y: 500 }, { x: 600, y: 500 },
            { x: 200, y: 600 }, { x: 300, y: 600 },
            { x: 200, y: 700 }, { x: 560, y: 700 }, { x: 660, y: 700 }, { x: 760, y: 700 }, { x: 860, y: 700 }, { x: 960, y: 700 },
            { x: 200, y: 800 },
            { x: 200, y: 900 },
        ]
    },//end lvl 6
    {//lvl 7
        blocks: [
            { x: 200, y: 150 }, { x: 260, y: 150 },
            { x: 360, y: 200 },
            { x: 460, y: 250 },
            { x: 200, y: 300 }, { x: 560, y: 300 },
            { x: 660, y: 350 },
            { x: 200, y: 400 }, { x: 760, y: 400 },
            { x: 200, y: 500 }, { x: 960, y: 500 },
            { x: 200, y: 700 }, { x: 260, y: 700 }, { x: 360, y: 700 }, { x: 460, y: 700 }, { x: 560, y: 700 }, { x: 660, y: 700 }, { x: 760, y: 700 }, { x: 860, y: 700 }, { x: 960, y: 700 },
        ]
    },//end lvl 7
    {//lvl 8
        blocks: [
            { x: 100, y: 200 },
            { x: 460, y: 400 }, { x: 560, y: 400 },
            { x: 760, y: 500 },
            { x: 360, y: 700 }, { x: 460, y: 700 }, { x: 560, y: 700 },
        ],
        flag: { x: 100, y: 100 }
    },//end lvl 8

]

class Level1 extends Phaser.Scene {
    init() {

    }

    preload() {
        //cargar de imagenes
        this.load.image('wall', 'assets/img/wall.jpg');
        this.load.image('floor', 'assets/img/floor.jpg');
        this.load.image('block', 'assets/img/block.jpg');
        this.load.image('player', 'assets/img/caballero.jpeg');
        this.load.image('fondo', 'assets/img/fondo3.png');
        this.load.image('flag', 'assets/img/flag.png');

        //Cargar sonido
        this.load.audio('music', 'assets/music/backgroundmusic1.mp3');
        this.load.audio('shockFloor', 'assets/music/shockFloor.mp3');
        this.load.audio('shockPlataform', 'assets/music/shockPlataform.mp3');
        this.load.audio('jump', 'assets/music/jump.mp3');
        this.load.audio('winner', 'assets/music/winner.mp3');
    }

    create() {

        //music
        music = this.sound.add('music');
        soundShockFloor = this.sound.add('shockFloor');
        soundShockPlataform = this.sound.add('shockPlataform');
        soundJump = this.sound.add('jump');
        soundWinner = this.sound.add('winner');

        if (!playing && !this.load.isLoading()) {
            playing = true;
            music.play();
            music.loop = true;
        }

        this.add.image(530, 420, 'fondo');

        //player
        player = this.physics.add.sprite(300, 613, 'player');

        player.x = 600;
        player.y = 600;

        //plataforms
        flag = this.physics.add.staticGroup();
        platforms = this.physics.add.staticGroup();
        walls = this.physics.add.staticGroup();

        walls.create(0, 420, "wall");
        walls.create(1060, 420, "wall");

        this.createGameObjects(this);

        //colisiones

        this.physics.add.collider(player, walls, this.shockPlatformPlayer);

        //teclas
        teclas = this.input.keyboard.createCursorKeys();

    }

    createGameObjects() {
        posBlocksLevels[level].blocks.forEach(pos => {
            platforms.create(pos.x, pos.y, "block");
        })
        if (level == 0) {
            platforms.create(530, 734, 'floor').setScale(2).refreshBody();
        }
        if (level == 8) {
            platforms.create(530, -50, 'floor').setScale(2).refreshBody();
            flag.create(posBlocksLevels[level].flag.x, posBlocksLevels[level].flag.y, "flag");
            this.physics.add.collider(player, flag, this.winnerPlayer,null,this);
        }

        this.physics.add.collider(player, platforms, this.shockPlatformPlayer);
    }

    winnerPlayer(player, flag) {
        soundWinner.play();
        this.scene.start('gameOver');
    }

    changeLevel(isUp) {
        let childrens = platforms.getChildren();
        while (childrens.length > 0) {
            for (let i = 0; i < childrens.length; i++) {
                childrens[i].destroy();
            }
        }
        flag.getChildren().forEach(flag => flag.destroy())
        if (isUp) {
            level++;
        } else {
            level--;
        }
        this.createGameObjects();
    }

    shockPlatformPlayer(player, plataform) {
        if (!player.body.touching.down && !player.body.touching.up) {
            if (dir == "-") {
                dir = "+";
            } else {
                dir = "-";
            }
            soundShockPlataform.play();
        } else if (player.body.touching.up) {
            soundShockPlataform.play();
        } else if (player.body.touching.down && isTouchingFloor) {
            isTouchingFloor = false;
            soundShockFloor.play();
        }
    }

    update () {

        if (player.y <= -16) {
            player.y = 840;
            this.changeLevel(true);
        }
        if (player.y >= 850) {
            player.y = -15;
            this.changeLevel(false);
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
            isTouchingFloor = true;
            soundJump.play();
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
}