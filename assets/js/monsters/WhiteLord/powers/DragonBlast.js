class DragonBlast{
    constructor(insideTheElement,dx,target){
        this._insideTheElement=insideTheElement
        this._dx=dx
        this.px
        this.py
        this.dy=0
        this._target=target
        this._loop;
        this._element=this.createElement(this.insideTheElement.parentNode,"div")
        this._toP=["-12px -386px"]
        this._toPAll=["-36px -382px","-61px -386px","-101px -386px","-155px -386px"]
        this.toExchange=this._toPAll
        this.rotate=false
        this.go=false
        this.targ=false
        this.config(this.element)
        this.mainLoop()
        this.start()

    }
    start(){
        setTimeout(()=>{
            this.toExchange=this._toP
            this.rotate=true
            this.px=this.element.offsetLeft
            this.py=this.element.offsetTop
            setTimeout(()=>{
                console.log("foi")
                this.go=true
                this.dx>-1?this.dx=1:this.dx=-1
                setTimeout(()=>{
                    this.targ=true
                },2000)
            },2000)
        },5000)
    }
    config(el){
        el.style.position="absolute"
        el.style.top=this.insideTheElement.offsetTop+"px"
        el.style.width="25px"
        el.style.height="25px"
        el.style.borderRadius="360px"
        el.style.transform=this.dx>-1?"rotateY(180deg)":"rotateY(0deg)"
        el.style.left=(this.dx>-1?this.insideTheElement.offsetLeft+this.insideTheElement.offsetWidth:this.insideTheElement.offsetLeft-this.insideTheElement.offsetWidth+(el.offsetWidth/2))+"px"
        el.style.background=`url(WhiteLord/_img/Ornah2.png)-101px -386px`
        el.style.zIndex=2;
        el.style.border="1px solid red"
    }
    createElement(local,el,att=false,nameAtt=false){
        let e=document.createElement(el);
        if(att&&nameAtt){
            let at = document.createAttribute(att)
            at.value=nameAtt
            e.setAttributeNode(at)
        }
        local.appendChild(e)
        return e;
    }
    mainLoop(){
        let counter=0;
        let counterR=0;
        let counterG=0;
        this.loop=setInterval(()=>{
            if(this.toExchange){
                if(this.toExchange.length>1){
                    this.element.style.background=`url(WhiteLord/_img/Ornah2.png)${this.toExchange[counter]}`
                }else{this.element.style.background=`url(WhiteLord/_img/Ornah2.png)${this.toExchange[0]}`}
                if(this.rotate){
                    this.element.style.transform=`rotate(${counterR}deg)`
                    counterR+=60;
                    if(this.go){
                        this.px+=this.dx*counterG
                        this.py+=this.dy*counterG
                        this.element.style.left=this.px+"px";
                        this.element.style.top=this.py+"px"
                        if(this.targ)
                        {
                            this.element.offsetLeft<this.target.offsetLeft?this.dx=1:this.dx=-1
                            this.element.offsetTop<this.target.offsetTop?this.dy=1:this.dy=-1
                        }
                        counterG+=5
                    }
                }
                counter<this.toExchange.length?counter++:counter=0;
            }
        },100)
    }
    get loop(){return this._loop}
    set loop(value){this._loop=value}
    get element(){return this._element}
    get target(){return this._target}
    get dx(){return this._dx}
    set dx(value){this._dx=value}
    get insideTheElement(){return this._insideTheElement}
}