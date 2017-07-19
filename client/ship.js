class Ship extends Obj
{
    constructor(x, y, angle, hp)
    {
        super(x, y, angle);
        this.hp = hp;
    }

    printHp(context)
    {
        context.fillStyle = "rgb(255, 0, 0)";
        context.fillRect( this.x - Math.sqrt(this.hp)*6/2, this.y + 40, Math.sqrt(this.hp)*6, 4 );
    }
}