function EnemyMonkey1()
{
    _ProjectileThrower.call(this);

    this.name = "EnemyMonkey1";
    this.stompable = true;
    this.positionIsLocked = true; //default is that Monkeys don't move.

    this.animXOffset = 0;
    this.animYOffset = 1600;
    this.animMaxFrame = 2;
    this.lastThrowTime = null;
    this.timeBetweenThrows = 3000;

    this.xSpeed = 0;
    this.rectOffset = {top:16,bottom:63,left:8,right:55};

    this.throwEventName = "Monkey 1 throws EnemyMonkeyRock1";
    this.throwEventObject = "EnemyMonkeyRock1";
    this.throwEventDirection = DOWN;
}

EnemyMonkey1.prototype = Object.create(_ProjectileThrower.prototype);
