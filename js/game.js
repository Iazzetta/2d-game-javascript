class GameEngine {
    constructor(){
        this.canvas = document.getElementById('game')
        this.ctx = this.canvas.getContext('2d')
        this.collisionController = new CollisionController()
        this.player = new Player()
        this.render()
    }

    render() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.player.update(this)

        for(let i in NPC_LIST) {
            NPC_LIST[i].update(this)
            this.collisionController.resolveCollision(this.player, NPC_LIST[i])
            if (NPC_LIST[i].die) NPC_LIST.splice(i, 1);
        }


        // detect and resolve collision


        requestAnimationFrame(() => this.render())
    }
}