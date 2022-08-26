NPC_LIST = []

const resolveCollision = (A, B) => {
    // get the vectors to check against
    var vX = (A.x + (A.width / 2))  - (B.x + (B.width / 2)),
        vY = (A.y + (A.height / 2)) - (B.y + (B.height / 2)),
        // Half widths and half heights of the objects
        ww2 = (A.width / 2) + (B.width / 2),
        hh2 = (A.height / 2) + (B.height / 2),
        colDir = "";

    // if the x and y vector are less than the half width or half height,
    // they we must be inside the object, causing a collision
    if (Math.abs(vX) < ww2 && Math.abs(vY) < hh2) {
        // figures out on which side we are colliding (top, bottom, left, or right)
        var oX = ww2 - Math.abs(vX),
            oY = hh2 - Math.abs(vY);
        if (oX >= oY) {
            if (vY > 0) {
                colDir = "TOP";
                A.y += oY;
            } else {
                colDir = "BOTTOM";
                A.y -= oY;
            }
        } else {
            if (vX > 0) {
                colDir = "LEFT";
                A.x += oX;
            } else {
                colDir = "RIGHT";
                A.x -= oX;
            }
        }
    }
    return colDir; // If you need info of the side that collided
}