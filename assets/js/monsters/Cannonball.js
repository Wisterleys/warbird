class Cannonball{
    constructor(place,data){
        this.audio = new Audio("assets/sounds/Explosion.mp3")
        this._place = place;
        this._direction=-1;
        this._vel=60;
        this._mainLoop;
        this._data=data;
        this.move(this.template(this.place))
    }
    die(I){
        if(I.offsetLeft<I.offsetHeight*2){
            clearInterval(this.mainLoop)
            this.audio.currentTime=0
            this.audio.play()
            I.$("img")[0].src="assets/images/explosion.gif"
            setTimeout(()=>{I.remove();},800)
        }
    }
    template(el){
        /*
            <div class="cannonball"></div>
        */
       let e = el.addEl({tag:"div",class:"cannonball"})
       e.addEl({tag:"img",src:"assets/images/Cannonball.png",alt:"ball"})
       e.style.left=this.data.x+"px";
       e.style.top=this.data.y+((this.data.height/2)-(e.offsetHeight/3))+"px";
       return e;
    }
    getAtt(I,name){return parseInt(I.attributes[name].value)}
    
    collisionScript(element,targ){
        const el = this.getPosition(element)
        const target = this.getPosition(targ);
        return el.x+el.width>target.x&&el.x<target.x+target.width&&el.y+el.height>=target.y&&el.y<=target.y+target.height
    }
    colision(ball){
        if($("#I")){
            if(this.collisionScript(ball,$("#I"))){
                $("#I").setAttribute("life", "0");
            }
        }
    }
    move(el){
        this.mainLoop=setInterval(()=>{
            this.die(el)
            this.colision(el);
           if($("#control-all").value=="true"){
                el.style.left=el.offsetLeft+(this.direction*this.vel)+"px";
           }
        },100)
    }
    getPosition(el){
        return el.getBoundingClientRect()
    }
    //GETs and SETs
    get data(){return this._data;}
    set data(value){this._data=value}
    get mainLoop(){return this._mainLoop;}
    set mainLoop(value){this._mainLoop=value}
    get direction(){return this._direction;}
    set direction(value){this._direction=value}
    get vel(){return this._vel;}
    set vel(value){this._vel=value}
    get place(){return this._place}
    set place(value){this._place=value}
}