class WhiteLord{
    constructor(local,dx,dy){
        this._screenW=local.offsetWidth
        this._screenH=local.offsetHeight
        this.local=local
        this.loop
        this._life=1000
        this._maxLife=1000
        this._positions={
            fly:["-12px -30px"],
            comingDown:["-18px -135px"],
            standing:["-105px -139px"],
            powerPositionOne:["-155px -139px","-215px -139px"],
            powerPositionTwo:["-45px -30px","-108px -30px","-175px -30px","-241px -30px","-315px -30px"],
            powerPositionThree:["-108px -30px","-175px -30px","-241px -30px","-315px -30px"],
            deathMode:["-214px -270px","-270px -270px","-315px -267px","-358px -267px","-315px -350px"]
        }
        this._allModes=["attackMode",/* "attackModeTwo", */"standby"]//Modos 
        this._toExchange;
        this._whiteLord=this.createElement(this.local,"div","powerThree","false")
        this.dix=1
        this.diy=0
        this.xy=[dx,dy]
        this.dx=0;
        this.dy=0;
        this.px=1;
        this.py=1;
        this._fixedSpeed=15
        this._speed=this.fixedSpeed
        this.config(this.whiteLord)
        this.mainLoop();
        this.intelligence()
    }
    //INTELIGENCIA VAI VERIFICAR SE EXISTE O PLAYER E SORTEAR QUAL MODO USAR
    intelligence(){
       if(document.querySelector("#player")){
           let target=document.querySelector("#player")
        switch(this.allModes[Math.floor(Math.random()*((this.allModes.length-1)-0+1)+0) ]){
            case"attackMode":
                this.attackMode()
            break;
            case"attackModeTwo":
            this.attackModeTwo(target)
            break;
            default:
                this.standby(30,2)
        }
      }else this.standby(this.fixedSpeed,5)
    }
    landing(){
        if(this.speed>8&&this.whiteLord.offsetTop+this.whiteLord.offsetHeight>=this.screenH-this.speed)return this.speed=5
    }
    setAtt(el,nameAtt,value){el.setAttribute(nameAtt,value)}
    attackModeTwo(target){
        console.log("attackModeTwo")
        if(this.life>0){
            this.dx=this.whiteLord.offsetLeft<target.offsetLeft?-1:1;
            this.dy=-1
            let parent = this.whiteLord.parentNode
            let cX=false
            let cY=false
            let loop=setInterval(() => {
                this.speed=40
                if(this.whiteLord.offsetLeft<=this.whiteLord.offsetWidth||this.whiteLord.offsetLeft+this.whiteLord.offsetWidth>=parent.offsetWidth-this.whiteLord.offsetWidth){
                    this.dx=0
                    cX=true
                }
                if(this.whiteLord.offsetTop<50){
                    cY=true
                    this.dy=0
                }
                if(cX&&cY){
                    this.dx=this.whiteLord.offsetLeft<target.offsetLeft?1:-1;
                    this.toExchange=this.positions.powerPositionThree
                    this.whiteLord.style.width="53px"
                    clearInterval(loop);
                    let out=setTimeout(()=>{
                        let dx=this.dx
                        this.dx=0;
                        /* .setAttribute("powerThree","true") */
                        if(this.life>0){
                            let l=setInterval(()=>{
                                if(this.whiteLord.attributes.powerThree.value=="true"){
                                    this.setAtt(this.whiteLord,"powerThree","false")
                                    this.intelligence()
                                    clearTimeout(out)
                                    clearInterval(l)
    
                                }
                            },1000)
                            new DragonBlast(this.whiteLord,dx,target)
                        }
                        clearTimeout(out)
                        
                    },100)
                }
                
            }, 10);
        }
    }
    attackMode(){
        if(this.life>0){
            let target=document.querySelector("#player")
            let cl1=true
            let cl2=true
            let attackIsTrue=false;
            let positionX=false
            let positionY=false
            this.dx=0
            this.dy=0
            let loop=setInterval(()=>{
                
            if(target&&this.life>0){
                
                this.speed=15
                this.whiteLord.offsetLeft<target.offsetLeft-100
                ?
                this.dx=1:this.whiteLord.offsetLeft>target.offsetLeft+100?this.dx=-1:positionX=true
                //************************************************************ */
                this.whiteLord.offsetTop+this.whiteLord.offsetHeight<target.offsetTop
                ?
                this.dy=1:this.whiteLord.offsetTop+this.whiteLord.offsetHeight>target.offsetTop+target.offsetHeight?this.dy=-1:positionY=true
                
                if(positionX&&positionY)attackIsTrue=true
                
                if(attackIsTrue&&this.life>0){
                    if(cl1&&this.life>0){
                        cl1=false;
                        this.dx=this.whiteLord.offsetLeft<target.offsetLeft?1:-1
                        let timeout=setTimeout(()=>{
                            this.dx=0
                            this.dy=0
                            this.toExchange=this.positions.powerPositionTwo
                            this.whiteLord.style.width="53px"
                            let isDX=(v,el)=>{return v===0?el=="rotateY(180deg)"?1:-1:v}
                            //call power
                            let power = setInterval(()=>{
                                new RunsOnTheGround(this.whiteLord,this.createElement(this.local,"div"),isDX(this.dx,this.whiteLord.style.transform),target)
                                if(this.life<1){
                                    clearInterval(power)
                                }
                            },1000)
                            if(cl2&&this.life>0){
                                cl2=false;
                                let timeout2=setTimeout(()=>{
                                    if(this.life>0){
                                        this.dy=-1
                                        this.whiteLord.style.width="35px"
                                        this.toExchange=this.positions.fly
                                        this.power=""
                                        this.intelligence();
                                    }
                                    clearTimeout(timeout)
                                    clearTimeout(timeout2)
                                    clearInterval(power)
                                    clearInterval(loop)
                                },5000)
                            }
                        },100)
                    }
                }
            }else {
                clearInterval(loop)
            }
            
            },100)
        }
        
    }
    standby(speed,time,){
        speed?this.speed=speed:0
        if(this.life>0){
            let loop=setInterval(()=>{
            
                this.landing()
                if(this.screenW<this.whiteLord.offsetLeft+this.whiteLord.offsetWidth+this.speed){
                    this.toExchange=this.positions.fly
                    this.dx=-1;
                }
                if(this.whiteLord.offsetLeft<this.local.offsetLeft){
                    this.toExchange=this.positions.fly
                    this.dx=1;
                }
                if(this.whiteLord.offsetTop+this.whiteLord.offsetHeight>=this.screenH-2){
                    this.breakTime(time,loop,this.positions.standing)
                    this.dix>-1?this.dix=-1:this.dix=1;
                    this.diy=-1
                }
                if(this.whiteLord.offsetTop<this.local.offsetTop){
                    this.dy=1;
                }
            },100)
        }
    }
    breakTime(timeout,loop,position){
            this.dx=0;
            this.dy=0;
            this.toExchange=position
            clearInterval(loop)
            if(this.life>0){
                setTimeout(() => {
                    this.dx=this.dix;
                    this.dy=this.diy;
                    setTimeout(()=>{this.intelligence()},100)
                }, timeout*1000);
            }
    }
    move(){
        this.px=this.whiteLord.offsetLeft
        this.py=this.whiteLord.offsetTop
        if(this.dy==-1)this.toExchange=this.positions.fly
        if(this.dy===1)this.toExchange=this.positions.comingDown
        if(this.dx===1){this.whiteLord.style.transform="rotateY(180deg)";this.whiteLord.querySelector("progress").style.transform="rotateY(0deg)";}
        if(this.dx===-1){this.whiteLord.style.transform="rotateY(0deg)";this.whiteLord.querySelector("progress").style.transform="rotateY(180deg)"}
        this.px+=this.dx*this.speed
        this.py+=this.dy*this.speed
        this.whiteLord.style.left=this.px+"px";
        this.whiteLord.style.top=this.py+"px";
    }
    config(el){
        let life = document.createAttribute("life")
        let maxLife = document.createAttribute("maxLife")
        let monsters = document.createAttribute("class")
        life.value=this.life
        maxLife.value=this.maxLife
        monsters.value="monsters"
        el.setAttributeNode(life)
        el.setAttributeNode(maxLife)
        el.setAttributeNode(monsters)
        el.style.position="absolute"
        el.style.top=this.xy[1]+"px"
        el.style.left=this.xy[0]+"px"
        el.style.margin="0"
        el.style.width="35px"
        el.style.height="67px"
        //el.style.border="1px solid red"
        el.style.background="url(WhiteLord/_img/Ornah2.png)-105px -139px"
        el.style.zIndex=2;
        el.innerHTML=`<progress value="70" max="100" style="position:relative;top:-15px;display:block;float:right;width:30px;">70 %</progress>`
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
    deathMode(){
        this.dy=1;
        this.speed=5
        console.log("deathMode")
        let counter=0
        let counterS=3
        let loop = setInterval(() => {
            this.py+=this.dy*this.speed
            this.whiteLord.style.top=this.py+"px";
            this.whiteLord.style.width="35px"
            this.toExchange=this.positions.deathMode
            //-----------------------
            this.whiteLord.style.background=`url(WhiteLord/_img/Ornah2.png)${this.toExchange[0]}`
            
            //---------------------
            if(this.whiteLord.offsetTop+this.whiteLord.offsetHeight>this.whiteLord.parentNode.offsetHeight){
                this.dy=0;
                this.whiteLord.style.background=`url(WhiteLord/_img/Ornah2.png)${this.toExchange[1]}`
                setTimeout(() => {
                    this.whiteLord.style.background=`url(WhiteLord/_img/Ornah2.png)${this.toExchange[2]}`
                   setTimeout(()=>{
                    let l =setInterval(() => {
                        this.whiteLord.style.width="40px"
                        this.whiteLord.style.background=`url(WhiteLord/_img/Ornah2.png)${this.toExchange[counterS]}`
                        counterS>4?counterS=3:counterS++;
                       if(counter>100){
                        this.whiteLord.remove()
                        clearInterval(l)
                       }
                       counter++;
                    }, 100);
                   },1000)
                }, 2000);
                clearInterval(loop)
            }
        }, 100);
    }
    mainLoop(){
        let counter=0;
        this.loop=setInterval(() => {
            this.setAtt(this.whiteLord,this.whiteLord.attributes.life.name,this.whiteLord.attributes.life.value)
            if(this.whiteLord.attributes.life.value<this.life){new Bleeding(this.whiteLord,this.life-this.whiteLord.attributes.life.value,"blue")}
            this.life=this.whiteLord.attributes.life.value
            this.setAtt(this.whiteLord.querySelector("progress"),this.whiteLord.querySelector("progress").attributes.value.name,`${this.life*100/this.maxLife}`)
            this.move()
            if(this.toExchange){
                if(this.toExchange.length>1){
                    this.whiteLord.style.background=`url(WhiteLord/_img/Ornah2.png)${this.toExchange[counter]}`
                }else{this.whiteLord.style.background=`url(WhiteLord/_img/Ornah2.png)${this.toExchange[0]}`}
                counter<this.toExchange.length?counter++:counter=0;
            }
            if(this.life<1){
                this.dx=this.dy=0
                this.deathMode()
                clearInterval(this.loop)
            }
        }, 100);
    }
    //--------------
    get speed(){return this._speed}
    set speed(value){this._speed=value}
    //--------------
    get toExchange(){return this._toExchange}
    set toExchange(value){this._toExchange=value}
    //--------------
    get maxLife(){return this._maxLife}
    set maxLife(value){this._maxLife=value}
    //--------------
    get life(){return this._life}
    set life(value){this._life=value}
    //--------------
    get whiteLord(){return this._whiteLord}
    set whiteLord(value){this._whiteLord=value}
    //--------------
    get screenW(){return this._screenW}
    set screenW(value){this._screenW=value}
    //--------------
    get screenH(){return this._screenH}
    set screenH(value){this._screenH=value}
    //--------------
    get positions(){return this._positions}
    //--------------
    get allModes(){return this._allModes}
    //--------------
    get fixedSpeed(){return this._fixedSpeed}
    //--------------
}