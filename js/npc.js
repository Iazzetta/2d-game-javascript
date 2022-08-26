class NPC extends Entity {
    constructor(x, y) {
        super()

        this.x = x
        this.y = y
        this.hp = 2
        this.width = 32
        this.height = 32
        this.step = 1

        this.spriteController = new SpriteController({
            url: 'assets/npc/slime.png',
            width: this.width,
            height: this.height,
            framesX: { idle: 0, run: 5, attack: 6 },
            framesY: { idle: 0, run: 1, attack: 2 },
        })

        this.spriteController.animation = 'run'
    }

    draw(engine) {
        engine.ctx.beginPath()
        this.spriteController.draw(engine, this)
    }

    update(engine) {
        if (this.attacking) {
            this.spriteController.animation = 'attack'
        } else {
            this.spriteController.animation = 'run'
        }
        this.follow(engine.player)
        this.draw(engine)
    }

    follow(player) {
        if (
            player.x - this.x > this.width || 
            player.y - this.y > this.height ||
            player.x - this.x < -player.width  || 
            player.y - this.y < -player.height
            ) {
                this.attacking = false
                if ( player.x > this.x) this.x += this.step
                if ( player.x < this.x) this.x -= this.step
                if ( player.y > this.y) this.y += this.step
                if ( player.y < this.y) this.y -= this.step
        } else {
            this.attacking = true
        }
        
    }
}