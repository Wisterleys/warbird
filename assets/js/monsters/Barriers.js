class Barriers{
    constructor(place,color) {
        this._color=color;
        this._place=place;
        this._vel=this.color.vel
        this._random=color.height
        this._mainLoop;
        this.move(this.place,this.template(this.place[0],this.color))
    }
    calculateBarriers(number){
        const res = 100-number
        return {up:(number-20)>0?number-20:1,down:res>0?res>80?80:res:1};
    }
    move(area,el){
        el.style.left=area[1].width+"px"
        let counter=1;
        this.mainLoop=setInterval(()=>{
            if($("#control-all").value=="true"){
                   el.style.left=el.offsetLeft-(counter*this.vel)+"px";
                    if(el.offsetLeft<-100){el.remove();clearInterval(this.mainLoop);}
                    $(".cannonball").forEach(ball => {
                        if(el.offsetLeft+el.offsetWidth<ball.offsetLeft
                            &&
                            ball.offsetTop>el.offsetTop&&ball.offsetTop+ball.offsetHeight<el.offsetTop+el.offsetHeight){
                               el.remove();clearInterval(this.mainLoop);
                            }
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
        */
       let random = this.calculateBarriers(this.rand(100,1))
       let up = el.addEl({tag:"div",class:"barreira up a",style:`background: linear-gradient(90deg,${color.color[0]},${color.color[1]});height: ${this.random.up}vh;`})
       up.addEl({tag:"div",class:"borda"})
       up.addEl({tag:"div",class:"corpo"})
       return up;
    }
    //GETs and SETs
    get random(){return this._random;}
    set random(value){this._random=value}
    get vel(){return this._vel;}
    set vel(value){this._vel=value}
    get mainLoop(){return this._mainLoop;}
    set mainLoop(value){this._mainLoop=value}
    get color(){return this._color;}
    set color(value){this._color=value}
    get place(){return this._place;}
    set place(value){this._place=value}
}