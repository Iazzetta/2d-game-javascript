class Player {
    constructor() {
        this.x = 0
        this.y = 0
        this.step = 5
        this.size = 20
        this.keyboard = {left: false, right: false, up: false, down: false}

        this.events()
    }

    draw(engine) {
        engine.ctx.beginPath()
        engine.ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI, false)
        engine.ctx.fillStyle = 'red'
        engine.ctx.fill()
    }

    update(engine) {

        if (this.x <= 0) this.x = this.size
        if ((this.x + this.size) >= engine.canvas.width) 
            this.x = engine.canvas.width - this.size
        
        if (this.y <= 0) this.y = this.size
        if ((this.y + this.size) >= engine.canvas.height) 
            this.y = engine.canvas.height - this.size

        if (this.keyboard.left) this.x -= this.step
        if (this.keyboard.right) this.x += this.step
        if (this.keyboard.up) this.y -= this.step
        if (this.keyboard.down) this.y += this.step

        this.draw(engine)
    }

    events() {
        document.body.addEventListener('keypress', this.press.bind(this))
        document.body.addEventListener('keyup', this.release.bind(this))
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