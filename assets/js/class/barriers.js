class Barriers{
    constructor(place,color) {
        this._color=color;
        this._place=place;
        this._vel=this.color.vel
        this._mainLoop;
        this.move(this.place,this.template(this.place[0],this.color))
    }
    move(area,el){
        el.style.left=area[1].width+"px"
        let counter=1;
        this.mainLoop=setInterval(()=>{
            el.style.left=el.offsetLeft-(counter*this.vel)+"px";
            //counter--;
            if(el.offsetLeft<0){el.remove();clearInterval(this.mainLoop);}
        },100)
    }
    template(el,color){
        /*
        <div class="barreiras">
            <div class="barreira up a">
                <div class="borda"></div>
                <div class="corpo"></div>
            </div>
            <div class="barreira b">
                <div class="borda"></div>
                <div class="corpo"></div>
            </div>
        </div>
        */
       let res = el.addEl({tag:"div",class:"barreiras"})
       let up = res.addEl({tag:"div",class:"barreira up a",style:`background: linear-gradient(90deg,${color.color[0]},${color.color[1]});`})
       up.addEl({tag:"div",class:"borda"})
       up.addEl({tag:"div",class:"corpo"})
       let down = res.addEl({tag:"div",class:"barreira b"})
       down.addEl({tag:"div",class:"borda"})
       down.addEl({tag:"div",class:"corpo"})
       return res;
    }
    //GETs and SETs
    get vel(){return this._vel;}
    set vel(value){this._vel=value}
    get mainLoop(){return this._mainLoop;}
    set mainLoop(value){this._mainLoop=value}
    get color(){return this._color;}
    set color(value){this._color=value}
    get place(){return this._place;}
    set place(value){this._place=value}
}