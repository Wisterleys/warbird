class Player{
    constructor(place,dis,name){
        this._place = place;
        this._direction=0;
        this._vel=20;
        this.current_score=0
        this._mainLoop;
        this.name=null;
        this.move(this.template(this.place,dis,name))
        this.onControl()
    }
    toScore(I){
        if(!$(".cannonball")[0]){
            const IHave = this.getPosition(I)
            for (let i = 0; i < $(".b").length; i++) {
                const barr_a = this.getPosition($(".a")[i]);
                const barr_b = this.getPosition($(".b")[i]);
                if(IHave.x>barr_a.x+barr_a.width-5&&IHave.x<barr_a.x+barr_a.width+5){
                    this.current_score++
                }
            }
        }
    }
    die(I){
        let life = parseInt(I.attributes["life"].value)
        const IHave = this.getPosition(I)
        for (let i = 0; i < $(".b").length; i++) {
            const barr_a = this.getPosition($(".a")[i]);
            const barr_b = this.getPosition($(".b")[i]);
            if(IHave.x+IHave.width>=barr_b.x&&IHave.x+IHave.width<=barr_b.x+barr_b.width&&IHave.y+IHave.height>=barr_b.y
                ||
                IHave.x+IHave.width>=barr_a.x&&IHave.x+IHave.width<=barr_a.x+barr_a.width&&IHave.y<=barr_a.y+barr_a.height||life<1){
                clearInterval(this.mainLoop)
                I.$("img")[0].src="assets/images/explosion.gif"
                setTimeout(()=>{I.remove();$(".youlose")[0].classList.remove("hide");$("#resu").value=this.current_score},800)
            }
        }

    }
    choice(value){
        switch(value){
            case"up":
            case"ArrowUp":
            case"w":
            this.direction=-1
            break;
            case"down":
            case"s":
            case"ArrowDown":
            this.direction=1
            break;
        }
    }
    onControl(){
        $(".btn-control").forEach(btn => {
            btn.on("touchstart",e=>{
                this.choice(e.target.id)
            })
            btn.on("touchend",e=>{
                this.direction=0
            })
            document.addEventListener("keydown",e=>{
                this.choice(e.key)
            })
            document.addEventListener("keyup",e=>{
                this.direction=0
            })
        });
    }
    move(el){
        this.mainLoop=setInterval(()=>{
            this.name=el.getAttribute("name")
            this.toScore(el)
            this.name?el.$("#flap").innerText=this.name:0
            $("#score").innerText= this.current_score;
            $(".barreira")[0]?this.die(el):0
            if($("#control-all").value=="true"){
                el.style.top=el.offsetTop+(this.direction*this.vel)+"px";
            }
        },100)
    }
    template(el,dis,name=""){
        /*
            <div id="playerPC">
            <img src="assets/images/passaro.png" alt="passaro">
            </div>
        */
       let e = el.addEl({tag:"div",class:"players",life:100,id:"I",name:"Fulano"})
       e.addEl({tag:"div",insertTag:name,style:"margin:0px;padding:0px",id:"flap"})
       e.addEl({tag:"img",src:"assets/images/passaro.png",alt:"passaro"})
       const place = this.getPosition(this.place)
       e.style.top=place.height/2+"px"
       e.style.left=place.width/dis+"px"
       return e;
    }
    getPosition(el){
        return el?el.getBoundingClientRect():false
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