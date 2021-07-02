class Barriers{
    constructor(place,color) {
        this._color=color;
        this._place=place;
        this._vel=this.color.vel
        this._mainLoop;
        this.move(this.place,this.template(this.place[0],this.color))
    }
    calculateBarriers(number){
        const res = 100-number
        return {up:(number-20)>0?number-20:1,down:res>0?res>80?80:res:1};
    }
    move(area,el){
        el[0].style.left=area[1].width+"px"
        el[1].style.left=area[1].width+"px"
        let counter=1;
        this.mainLoop=setInterval(()=>{
            if($("#control-all").value=="true"){
                el.forEach(e => {
                    e.style.left=e.offsetLeft-(counter*this.vel)+"px";
                    if(e.offsetLeft<-100){e.remove();clearInterval(this.mainLoop);}
                });
            }
        },100)
    }
    rand(max,min){
        return Math.random() * (max - min) + min;
    }
    template(el,color){
        /*
            <div class="barreira up a">
                <div class="borda"></div>
                <div class="corpo"></div>
            </div>
            <div class="barreira b">
                <div class="borda"></div>
                <div class="corpo"></div>
            </div>
        */
       let random = this.calculateBarriers(this.rand(100,1))
       let up = el.addEl({tag:"div",class:"barreira up a",style:`background: linear-gradient(90deg,${color.color[0]},${color.color[1]});height: ${random.up}vh;`})
       up.addEl({tag:"div",class:"borda"})
       up.addEl({tag:"div",class:"corpo"})
       let down = el.addEl({tag:"div",class:"barreira b",style:`height: ${random.down}vh;`})
       down.addEl({tag:"div",class:"borda"})
       down.addEl({tag:"div",class:"corpo"})
       return [up,down];
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