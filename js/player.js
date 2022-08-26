class Player extends Entity {
    constructor() {
        super()

        this.x = 150
        this.y = 100
        this.width = 47
        this.height = 47
        this.damage = 5
        this.hp = 10000
        this.points = 0

        this.keyboard = {left: false, right: false, up: false, down: false}
        this.attacking = false

        this.spriteController = new SpriteController({
            url: 'assets/player/player.png',
            width: this.width,
            height: this.height,
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
        if ((this.x + this.width) >= engine.canvas.width) 
            this.x = engine.canvas.width - this.width
        
        if (this.y <= 0) this.y = 0
        if ((this.y + this.height) >= engine.canvas.height) 
            this.y = engine.canvas.height - this.height

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

        document.getElementById('hp').innerText = `HP: ${(this.hp * 100 / 10000).toFixed(0)}%`;
        document.getElementById('points').innerText = `Points: ${this.points}`;
        document.getElementById('monsters').innerText = `HP: ${NPC_LIST.length}`;

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
        this.spriteController.col = 0
    }
    releaseAttack(e) {
        this.attacking = false
        this.spriteController.col = 0
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