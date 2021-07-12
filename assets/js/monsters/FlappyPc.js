class FlappyPc{
    constructor(place,dis,name){
        this._place = place;
        this._direction=0;
        this._vel=70;
        this._mainLoop;
        this.move(this.template(this.place,dis,name))
    }
    die(I){
        const IHave = this.getPosition(I)
        for (let i = 0; i < $(".b").length; i++) {
            const barr_a = this.getPosition($(".a")[i]);
            const barr_b = this.getPosition($(".b")[i]);
            if(IHave.x+IHave.width>=barr_b.x&&IHave.x+IHave.width<=barr_b.x+barr_b.width&&IHave.y+IHave.height>=barr_b.y
                ||
                IHave.x+IHave.width>=barr_a.x&&IHave.x+IHave.width<=barr_a.x+barr_a.width&&IHave.y<=barr_a.y+barr_a.height||$(".cannonball")[0]){
                clearInterval(this.mainLoop)
                I.$("img")[0].src="assets/images/explosion.gif"
                setTimeout(()=>{I.remove();},800)
            }
        }
    }
    intelligence(I){
        let direction=0;
        //this.vel=window.innerHeight<365?20:70;
        const IHave = this.getPosition(I)
        for (let i = 0; i < $(".b").length; i++) {
            const barr_a = this.getPosition($(".a")[i]);
            const barr_b = this.getPosition($(".b")[i]);
            if(IHave.x>barr_b.x-250&&IHave.x<=barr_b.x){
                //brakes
                IHave.x>barr_a.x-150&&IHave.x<=barr_a.x&&IHave.y+IHave.height>=barr_a.y+barr_a.height&&IHave.y+IHave.height<=barr_b.y
                ?this.vel=20:this.vel=70
                //----------------------------------------------------------------------------------------------
                if(IHave.y<barr_a.y+barr_a.height){
                    direction=1;
                    break;
                }
                else if(IHave.y+IHave.height>barr_b.y){direction=-1;break;}
            }
        }
        return direction;
    }
    template(el,dis,name=""){
        /*
            <div id="players">
            <img src="assets/images/passaro.png" alt="passaro">
            </div>
        */
       let e = el.addEl({tag:"div",class:"players",id:"pc"})
       e.addEl({tag:"div",insertTag:name,style:"margin:0px;padding:0px"})
       e.addEl({tag:"img",src:"assets/images/passaro.png",alt:"passaro"})
       const place = this.getPosition(this.place)
       e.style.top=place.height/2+"px"
       e.style.left=place.width/dis+"px"
       return e;
    }
    move(el){
        this.mainLoop=setInterval(()=>{
            $(".barreira")[0]?this.direction=this.intelligence(el):0
            $(".barreira")[0]?this.die(el):0
            if($("#control-all").value=="true"){
                el.style.top=el.offsetTop+(this.direction*this.vel)+"px";
            }
        },100)
    }
    getPosition(el){
        return el.getBoundingClientRect()
    }
    //GETs and SETs
    
    get mainLoop(){return this._mainLoop;}
    set mainLoop(value){this._mainLoop=value}
    get direction(){return this._direction;}
    set direction(value){this._direction=value}
    get vel(){return this._vel;}
    set vel(value){this._vel=value}
    get place(){return this._place}
    set place(value){this._place=value}
}
