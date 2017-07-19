class Obj
{
    constructor(x, y, angle)
    {
        this.x = x;
        this.y = y;
        this.angle = angle;
    }

    rotateContext(context)
    {
        context.translate(this.x, this.y);
        context.rotate(this.angle*Math.PI/180);
        context.translate(-1*this.x, -1*this.y);
    };
}


var myMath = new Object();

myMath.dist = function( x1, y1, x2, y2 )
{
  return Math.sqrt( ( x1 - x2 ) * ( x1 - x2 ) + ( y1 - y2 ) * ( y1 - y2 ) );
};