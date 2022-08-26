setInterval(() => {
    NPC_LIST.push( new NPC(Math.random() * 500, Math.random() * 500) )
}, 50)

new GameEngine()