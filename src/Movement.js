class Movement extends Phaser.Scene {
    constructor() {
        super('movementScene')
    }

    init(){
        this.PLAYER_VELOCITY = 50
    }

    preload() {
        this.load.spritesheet('character', './assets/spritesheets/Character_002.png', { frameWidth: 48 })
    }

    create() {
        //console.log('now in movement scene 👍')
        this.cameras.main.setBackgroundColor(0xDDDDDD)


        //create anims
        this.anims.create({
            key: 'idle-down',
            frameRate: 0,
            repeat: -1, 
            frames: this.anims.generateFrameNumbers('character', {
                start:1,
                end:1
            })
        })
        this.anims.create({
            key: 'walk-down',
            frameRate: 5,
            repeat: -1, 
            frames: this.anims.generateFrameNumbers('character', {
                start:0,
                end:2
            })
        })

        this.player = this.physics.add.sprite(width/2, height/2, 'character', 1).setScale(2)

        cursors = this.input.keyboard.createCursorKeys()

        this.player.body.setCollideWorldBounds(true)
        this.player.body.setSize(32,32)
        this.player.body.setOffset(3,3)
    }

    update() {
        //non normalized
        // //handle l/r
        // if(cursors.left.isDown){
        //     this.player.x -= this.PLAYER_VELOCITY
        // } else if (cursors.right.isDown) {
        //     this.player.x += this.PLAYER_VELOCITY
        // }

        // //up/down
        // if(cursors.up.isDown){
        //     this.player.y -= this.PLAYER_VELOCITY
        // } else if (cursors.down.isDown) {
        //     this.player.y += this.PLAYER_VELOCITY
        // }

        let playerVector = new Phaser.Math.Vector2(0,0)

        let playerDirection = 'down'


        // normalized
        //handle l/r
        if(cursors.left.isDown){
            playerVector.x -= this.PLAYER_VELOCITY
            playerDirection = 'left'
        } else if (cursors.right.isDown) {
            playerVector.x += this.PLAYER_VELOCITY
            playerDirection = 'right'

        }

        //up/down
        if(cursors.up.isDown){
            playerVector.y -= this.PLAYER_VELOCITY
            playerDirection = 'up'
        } else if (cursors.down.isDown) {
            playerVector.y += this.PLAYER_VELOCITY
            playerDirection = 'down'
        }
        playerVector.normalize()

        // this.player.x += playerVector.x * this.PLAYER_VELOCITY
        // this.player.y += playerVector.y * this.PLAYER_VELOCITY

        this.player.setVelocity(playerVector.x * this.PLAYER_VELOCITY,  playerVector.y * this.PLAYER_VELOCITY)

        let playerMovement
        playerVector.length() ? playerMovement = 'walk': playerMovement = 'idle'
        this.player.play(playerMovement + '-' + playerDirection, true)
    }
}