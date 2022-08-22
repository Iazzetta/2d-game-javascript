class GameEngine {
    constructor(){
        this.canvas = document.getElementById('game')
        this.ctx = this.canvas.getContext('2d')
        this.player = new Player()
        this.render()
    }

    render() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.player.update(this)
        requestAnimationFrame(() => this.render())
    }
}