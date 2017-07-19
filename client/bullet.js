class Bullet extends Obj
{
    constructor(x, y, angle)
    {
		super(x, y, angle);
    }

    print(img, scr, context)
    {
        var w = 16, h = 16;
        this.x -= scr.x;
        this.y -= scr.y;

        context.save();

        //this.rotateContext(context);
        context.drawImage(img.bullet, this.x - w/2, this.y - h/2);

        context.restore();
        
        this.x += scr.x;
        this.y += scr.y;
    }
}