class BirdShot{
    constructor(place,data){
        this.audio = new Audio("assets/sounds/Explosion.mp3")
        this._place = place;
        this._direction=1;
        this._vel=60;
        this._mainLoop;
        this._data=data;
        this.move(this.template(this.place))
    }
    die(I){
        $(".barreira").forEach(bar=>{
            if(I.collision(bar)){
                clearInterval(this.mainLoop)
                this.audio.currentTime=0
                this.audio.play()
                I.$("img")[0].src="assets/images/explosion.gif"
                setTimeout(()=>{I.remove();},800)
            }
        })
        
    }
    template(el){
        /*
            <div class="cannonball"></div>
        */
       let e = el.addEl({tag:"div",class:"birdshot"})
       e.addEl({tag:"img",src:"assets/images/Cannonball.png",alt:"birdshot"})
       e.style.left=this.data.x+"px";
       e.style.top=this.data.y+((this.data.height/2)+(e.offsetHeight/3))+"px";
       return e;
    }
    getAtt(I,name){return parseInt(I.attributes[name].value)}
    explosion(I){
        if(I){
            $(".cannon").forEach(cann=>{
                if(I.collision(cann)){
                    cann.setAttribute("life",cann.attributes.life.value-100);
                    new Bleeding( cann,cann.attributes.life.value,"red")
                    //cann.style.left=cann.offsetLeft+((this.dx>-1?20:-20)*5)+"px"
                }
            })
        }
    }
    move(el){
        this.mainLoop=setInterval(()=>{
            this.die(el)
            this.explosion(el);
           if($("#control-all").value=="true"){
                el.style.left=el.offsetLeft+(this.direction*this.vel)+"px";
           }
        },100)
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