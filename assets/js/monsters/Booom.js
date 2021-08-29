class Booom extends Bomb{
    constructor(obj) {
        super(obj.place)
        this.width=70;
        this.height=43;
        this.interval=10;
        this.x=this.getRandom(0,100);
        this.y=obj.y;
        this.duration=800;
        this.color="url('img/bomb.png')";
        this.receives();
        this.loop(this.interval,this.duration)
    }
    fallen(duration){
        this.element.style.background="url('img/gif-explosion-77.gif')0% 0% / 100% 100%";
    }
}