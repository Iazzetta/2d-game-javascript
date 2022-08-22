class Player {
    constructor() {
        this.x = 0
        this.y = 0
        this.step = 2
        this.size = 50
        this.keyboard = {left: false, right: false, up: false, down: false}
        this.attacking = false

        this.spriteController = new SpriteController({
            url: 'assets/player/player.png',
            framesX: { idle: 0, run: 5, attack: 3 },
            framesY: { idle: 0, run: 1, attack: 2 },
        })
        this.events()
    }

    draw(engine) {
        engine.ctx.beginPath()
        this.spriteController.draw(engine, this)
    }

    update(engine) {

        // basic wall collision
        if (this.x <= 0) this.x = 0
        if ((this.x + this.size) >= engine.canvas.width) 
            this.x = engine.canvas.width - this.size
        
        if (this.y <= 0) this.y = 0
        if ((this.y + this.size) >= engine.canvas.height) 
            this.y = engine.canvas.height - this.size

        // player keyboard events
        if (this.keyboard.left) this.x -= this.step
        if (this.keyboard.right) this.x += this.step
        if (this.keyboard.up) this.y -= this.step
        if (this.keyboard.down) this.y += this.step

        // player animation
        if (!this.attacking) {
            if (this.keyboard.left || this.keyboard.right ||
                this.keyboard.up || this.keyboard.down) {
                this.spriteController.animation = 'run'
            }
            else {
                this.spriteController.animation = 'idle'
                this.spriteController.col = 0
            }
        } else {
            this.spriteController.animation = 'attack'
        }

        this.draw(engine)
    }

    events() {
        document.body.addEventListener('keypress', this.press.bind(this))
        document.body.addEventListener('keyup', this.release.bind(this))

        document.body.addEventListener('mousedown', this.pressAttack.bind(this))
        document.body.addEventListener('mouseup', this.releaseAttack.bind(this))

    }

    pressAttack(e) {
        this.attacking = true
    }
    releaseAttack(e) {
        this.attacking = false
    }

    press(e) {
        if (e.key == 'a') this.keyboard.left = true
        if (e.key == 'd') this.keyboard.right = true
        if (e.key == 'w') this.keyboard.up = true
        if (e.key == 's') this.keyboard.down = true
    }

    release(e) {
        if (e.key == 'a') this.keyboard.left = false
        if (e.key == 'd') this.keyboard.right = false
        if (e.key == 'w') this.keyboard.up = false
        if (e.key == 's') this.keyboard.down = false
    }
}