class BallOfCannon{
    constructor(place,data){
        this._place = place;
        this._direction=-1;
        this._vel=90;
        this._mainLoop;
        this._data=data;
        this.move(this.template(this.place))
    }
    die(I){
        if(I.offsetLeft<0){
            clearInterval(this.mainLoop)
            I.$("img")[0].src="assets/images/explosion.gif"
            I.$("img")[0].hidden=false
            setTimeout(()=>{I.remove();},800)
        }
    }
    template(el){
        /*
            <div class="ball-cannon"></div>
        */
       let e = el.addEl({tag:"div",class:"ball-cannon"})
       e.addEl({tag:"img",src:"",alt:"explo"}).hidden=true
       e.style.left=this.data.x+"px";
       e.style.top=this.data.y+((this.data.height/2)-(e.offsetHeight/3))+"px";
       return e;
    }
    move(el){
        this.mainLoop=setInterval(()=>{
            this.die(el)
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