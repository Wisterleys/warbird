class Cannon{
    constructor(place){
        this.audio = new Audio("assets/sounds/mixkit-arcade-game-explosion-2759.wav")
        this._life=2000
        this.max_life=2000
        this._place = place;
        this._direction=1;
        this._vel=70;
        this._mainLoop;
        this.shoot=true
        this.move(this.template(this.place))
       
    }
    intelligence(I){
        const IHave = this.getPosition(I)
        const place = this.getPosition(this.place)
        const bird = this.getPosition($("#I"))
        if($("#I")){
            IHave.y+IHave.height/2<bird.y?this.direction=1:0
            IHave.y+IHave.height/2>bird.y&&IHave.y+IHave.height/2<bird.y+bird.height?this.direction=0:0
            IHave.y+IHave.height/2>bird.y+bird.height?this.direction=-1:0
            I.classList.remove("hide")
        }
        else{
            this.shoot=false
            I.classList.add("hide")
            /* if(IHave.y<1)this.direction=1
            if(IHave.y+IHave.height>place.height)this.direction=-1 */
        }
    }
    die(I){
        
            if(this.life<1){
                clearInterval(this.mainLoop)
                clearInterval(this.shootLoop)
                I.$("img")[0].src="assets/images/explosion.gif"
                setTimeout(()=>{I.remove();},800)
            }
    }
    template(el){
        /*
             <div id="cannon">
            <img src="assets/images/Metallic_Cannon.png" alt="Cannon">
            </div>
        */
       let e = el.addEl({tag:"div",class:"cannon",life:this.life,id:"cann"})
       e.addEl({tag:"div",class:"life",style:`width:${this.life*100/this.max_life}%;height:5px;background:red;`})
       e.addEl({tag:"img",src:"assets/images/Metallic_Cannon.png",alt:"Cannon"})
       return e;
    }
    move(el){
        this.shootLoop=setInterval(()=>{
            if($("#control-all").value=="true"&&this.shoot){
                //shoot
                this.audio.currentTime=0
                this.audio.play();
                new Cannonball(this.place,this.getPosition(el))
            }
        },1000)
        this.mainLoop=setInterval(()=>{
            this.intelligence(el)
            this.die(el)
            if($("#control-all").value=="true"){
                this.life=$(".cannon")[0].attributes["life"].value
                el.$(".life")[0].style.width=this.life*100/this.max_life+"%";
                el.style.top=el.offsetTop+(this.direction*this.vel)+"px";
          
            }
        },100)
    }
    getPosition(el){
        return el?el.getBoundingClientRect():false
    }
    //GETs and SETs
    get life(){return this._life;}
    set life(value){this._life=value}
    get mainLoop(){return this._mainLoop;}
    set mainLoop(value){this._mainLoop=value}
    get direction(){return this._direction;}
    set direction(value){this._direction=value}
    get vel(){return this._vel;}
    set vel(value){this._vel=value}
    get place(){return this._place}
    set place(value){this._place=value}

}