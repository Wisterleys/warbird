class Cannon{
    constructor(place){
        this._life=100
        this._place = place;
        this._direction=0;
        this._vel=70;
        this._mainLoop;
        this.move(this.template(this.place))
    }
    intelligence(I){
        let direction=0;
        const IHave = this.getPosition(I)
        for (let i = 0; i < $(".b").length; i++) {
            const barr_a = this.getPosition($(".a")[i]);
            const barr_b = this.getPosition($(".b")[i]);
            if(IHave.x>barr_b.x-250&&IHave.x<=barr_b.x){
                if(IHave.y<barr_a.y+barr_a.height+5){
                    direction=1;
                    break;
                }
                else if(IHave.y+IHave.height>barr_b.y-5){direction=-1;break;}
            }
        }
        return direction;
    }
    die(I){
        
            if(this.life<1){
                clearInterval(this.mainLoop)
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
       let e = el.addEl({tag:"div",class:"cannon",life:this.life})
       e.addEl({tag:"div",class:"life",style:`width:${this.life}%;height:5px;background:red;`})
       e.addEl({tag:"img",src:"assets/images/Metallic_Cannon.png",alt:"Cannon"})
       return e;
    }
    move(el){
        this.mainLoop=setInterval(()=>{
            $(".barreira")[0]?this.direction=this.intelligence(el):0
            $(".barreira")[0]?this.die(el):0
            if($("#control-all").value=="true"){
                this.life=$(".cannon")[0].attributes["life"].value
                el.$(".life")[0].style.width=this.life+"%";
                el.style.top=el.offsetTop+(this.direction*this.vel)+"px";
            }
        },100)
    }
    getPosition(el){
        return el.getBoundingClientRect()
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