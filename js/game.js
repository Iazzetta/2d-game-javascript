class GameEngine {
    constructor(){
        this.canvas = document.getElementById('game')
        this.ctx = this.canvas.getContext('2d')
        this.collisionController = new CollisionController()
        this.spawnPlayers()
        this.spawNpcs()
        this.render()
    }

    render() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        PLAYER_LIST[0].update(this)

        for(let i in NPC_LIST) {
            NPC_LIST[i].update(this)

            // check colissions player x enemy
            this.collisionController.resolveCollision(PLAYER_LIST[0], NPC_LIST[i])
        }
        
        requestAnimationFrame(() => this.render())
    }

    spawnPlayers() {
        PLAYER_LIST.push( new Player(this) )
    }

    spawNpcs() {
        setInterval(() => {
            if (NPC_LIST.length < 5)
                NPC_LIST.push( new NPC(this, Math.random() * 500, Math.random() * 500) )
        }, 1000)
    }
}