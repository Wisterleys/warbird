class Bleeding{
    constructor(insideTheElement,value,color){
        this._insideTheElement=insideTheElement
        this._color=color
        this._loop;
        this._inner=value;
        this._element=this.createElement(this.insideTheElement,"div")
        this.config(this.element)
        this.mainLoop()
    }
    config(el){
        el.style.position="relative"
        el.style.top="-10px"
        el.style.margin="0"
        el.style.width="30px"
        el.style.textAlign="center"
        el.style.left="0"
        el.style.zIndex=2;
        el.style.color=this.color
        el.style.textShadow=`0px 0px 5px ${this.color}`
        el.innerText=this.inner
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
        let py=-10;
        let px=this.element.offsetLeft
        let dy=-1;
        this.loop=setInterval(()=>{
            py+=dy*10
            if(this.insideTheElement.style.transform){
                this.insideTheElement.style.transform=="rotateY(180deg)"?this.element.style.transform="rotateY(180deg)":this.element.style.transform="rotateY(0deg)"
            }
            this.element.style.top=py+"px";
            this.element.style.left=px+"px"
            if(this.element.offsetTop<-100){
                this.element.remove();
                clearInterval(this.loop)
            }

        },100)
    }
    get color(){return this._color;}
    get element(){return this._element;}
    get inner(){return this._inner;}
    get loop(){return this._loop;}
    set loop(value){this._loop=value;}
    get insideTheElement(){return this._insideTheElement;}
    set insideTheElement(value){this._insideTheElement=value;}
}