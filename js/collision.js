class CollisionController {
    constructor() {}

    resolveCollision(A, B) {
        // get the vectors to check against
        var vX = (A.x + (A.width / 2))  - (B.x + (B.width / 2)),
        vY = (A.y + (A.height / 2)) - (B.y + (B.height / 2)),
        // Half widths and half heights of the objects
        ww2 = (A.width / 2) + (B.width / 2),
        hh2 = (A.height / 2) + (B.height / 2);

        let verify = false

        // if the x and y vector are less than the half width or half height,
        // they we must be inside the object, causing a collision
        if (Math.abs(vX) < ww2 && Math.abs(vY) < hh2) {
            // figures out on which side we are colliding (top, bottom, left, or right)
            var oX = ww2 - Math.abs(vX),
            oY = hh2 - Math.abs(vY);
            if (oX >= oY) {
                if (vY > 0) {
                    A.y += oY;
                    verify = true
                } else {
                    A.y -= oY;
                    verify = true
                }
            } else {
                if (vX > 0) {
                    A.x += oX;
                    verify = true
                } else {
                    A.x -= oX;
                    verify = true
                }
            }
        }

        if (verify) {
            if (A.attacking) B.hp -= A.damage
            if (B.attacking) A.hp -= B.damage

            if (A.hp <= 0) {
                alert("GAME OVER!")
                window.location.reload()
            }
            if (B.hp <= 0) { 
                B.die = true
                A.points += 1
            }
        }

    }
}