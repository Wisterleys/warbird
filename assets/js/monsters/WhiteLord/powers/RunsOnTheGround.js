class RunsOnTheGround{
    constructor(insideTheElement,power,dx,target){
        this._power=power;
        this._sound=new Audio("assets/js/monsters/WhiteLord/sounds/Torpedo+Explosion.mp3")
        this._insideTheElement=insideTheElement
        this._target=target
        this._dx=dx
        this._positions=["-292px -138px","-292px -165px","-292px -192px"]
        this._mainLoopID;
        this.config(this.power,this.dx)
        this.mainLoop()
    }
    config(el,dx){
        el.style.position="absolute"
        el.style.top=this.insideTheElement.offsetTop+(this.insideTheElement.offsetHeight/2)+"px"
        el.style.margin="0"
        el.style.width="83px"
        el.style.height="27px"
        el.style.left=dx>-1?this.insideTheElement.offsetLeft+this.insideTheElement.offsetWidth+"px":this.insideTheElement.offsetLeft-el.offsetWidth+"px"
        el.style.zIndex=2;
    }
    mainLoop(){
        let counter=0
        let px=this.power.offsetLeft;
        this.mainLoopID=setInterval(() => {
            px+=(this.dx>-1?1:-1)*10
            this.power.style.background=`url(assets/js/monsters/WhiteLord/img/Ornah2.png)${this.positions[counter]}`
            this.power.style.left=px+"px"
            this.power.style.transform=this.dx>-1?"rotateY(180deg)":"rotateY(0deg)"
            if(this.power.offsetWidth+this.power.offsetLeft<0||this.power.offsetLeft>this.power.parentNode.offsetWidth){
                this.power.remove()
                clearInterval(this.mainLoopID)
            }
            
            if(this.power.offsetLeft+this.power.offsetWidth>this.target.offsetLeft&&this.power.offsetLeft<this.target.offsetLeft+this.target.offsetWidth&&this.power.offsetTop+this.power.offsetHeight>=this.target.offsetTop&&this.power.offsetTop<=this.target.offsetTop+this.target.offsetHeight){
                clearInterval(this.mainLoopID)
                this.power.style.width="50px"
                this.power.style.height="55px"
                this.power.style.background=`urlassets/js/monsters/WhiteLord/img/efeitos/gif-explosion-77.gif)-2px -110px`
                this.power.style.backgroundSize="100% 100%"
                this.sound.currentTime=0;
                this.sound?this.sound.play():0
                this.target.style.left=this.target.offsetLeft+((this.dx>-1?20:-20)*5)+"px"
                this.target.setAttribute("life",this.target.attributes.life.value-100)
                
                    setTimeout(() => {
                        this.power.remove()
                    }, 1000);
            }
            counter<this.positions.length?counter++:counter=0;
        }, 50);
    }
    get sound(){return this._sound;}
    get target(){return this._target;}
    get dx(){return this._dx;}
    get insideTheElement(){return this._insideTheElement;}
    get positions(){return this._positions;}
    get power(){return this._power;}
    set power(value){this._power=value;}
    get mainLoopID(){return this._mainLoopID;}
    set mainLoopID(value){this._mainLoopID=value;}
}