var STAR_LIST = {};

class Star extends Obj
{
    constructor(x, y, scale)
    {
		super(x, y, 0);
		this.scale = scale;
    }

    static print(scr, context)
    {
        context.fillStyle = "rgb(255,255,255)";
        for (var i in STAR_LIST)
        {   
            var s = STAR_LIST[i];
            var x = s.x - scr.x/((1-s.scale)*5+4);
            var y = s.y - scr.y/((1-s.scale)*5+4);
            x = ((x%1000)+1000)%1000;
            y = ((y%1000)+1000)%1000;
            context.beginPath();
            context.arc( x, y, s.scale, 0, Math.PI*2, false);
            context.closePath();
            context.fill();
        }
    }

    static addStar()
    {
        STAR_LIST[Math.random()] = new Star(Math.random()*1200-600, Math.random()*1200-600, Math.random()*1);
    }
}