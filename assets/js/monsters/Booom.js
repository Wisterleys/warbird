class Booom extends Bomb{
    constructor(obj) {
        super(obj.place)
        this.width=70;
        this.height=43;
        this.interval=10;
        this.x=this.getRandom(5,100);
        this.y=obj.y;
        this.duration=100;
        this.color="url('assets/images/parachute-ball.png')";
        this.receives();
        this.loop(this.interval,this.duration)
    }
    getBall(){
        if($("#I")){
            if($("#I").collision(this.element)){
                clearInterval(this.general_loop);
                this.element.remove()
                $("#shoot").value++
                let val = $("#shoot").value
                $("#shoot").value = val.length>=2?val:"0"+val
            }
        }
        
    }
    fallen(duration){
        //this.element.style.background="url('img/gif-explosion-77.gif')0% 0% / 100% 100%";
    }
}