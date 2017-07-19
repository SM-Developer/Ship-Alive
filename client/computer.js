class Computer extends Ship
{
    constructor(type, x, y, angle, hp)
    {
		super(x, y, angle, hp);
		this.type = type;
    }

    print(img, scr, context)
    {
        var w, h;
        switch(this.type)
        {
            case 1:{w = 52; h = 58; break;}
            case 2:{w = 36; h = 36; break;}
        }
        this.x -= scr.x;
        this.y -= scr.y;

        context.save();

        this.rotateContext(context);
        context.drawImage(img.computer[this.type], this.x - w/2, this.y - h/2);

        context.restore();

        this.printHp(context);
        
        this.x += scr.x;
        this.y += scr.y;
    }
}