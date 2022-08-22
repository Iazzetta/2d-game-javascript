class SpriteController {
    constructor(config) {
        this.url = config.url
        this.framesX = config.framesX
        this.framesY = config.framesY

        this.animation = 'idle'
        this.frameWidth = 47
        this.frameHeight = 50
        this.col = this.framesX[this.animation]
        this.row = this.framesY[this.animation]

        this.image = new Image()

        this.load()
    }

    async load() {
        await new Promise(r => this.image.onload = r, this.image.src = this.url)
        this.loop()
    }

    loop() {
        setInterval(() => {
            if (this.col == this.framesX[this.animation]) this.col = 0
            else this.col++
            this.row = this.framesY[this.animation]
        }, 100)
    }

    draw(engine, entity) {
        engine.ctx.drawImage(
            this.image,
            this.col * this.frameWidth,
            this.row * this.frameHeight,
            this.frameWidth,
            this.frameHeight,
            entity.x,
            entity.y,
            this.frameWidth,
            this.frameHeight
        )
    }
}