class Player extends Ship
{
    constructor(x, y, angle, hp)
    {
		super(x, y, angle, hp);
    }

    setScreen(scr)
    {
        scr.x = this.x - 400;
        scr.y = this.y - 300;
    }

    print(img, scr, context)
    {
        var w = 36, h = 48;
        this.x -= scr.x;
        this.y -= scr.y;

        context.save();

        this.rotateContext(context);
        context.drawImage(img.player, this.x - w/2, this.y - h/2);

        context.restore();

        this.printHp(context);
        
        this.x += scr.x;
        this.y += scr.y;
    }
}