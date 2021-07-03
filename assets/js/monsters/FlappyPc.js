class FlappyPc{
    constructor(){

    }
    template(el,color){
    }
    move(area,el){
        el[0].style.left=area[1].width+"px"
        el[1].style.left=area[1].width+"px"
        let counter=1;
        this.mainLoop=setInterval(()=>{
            if($("#control-all").value=="true"){
            }
        },100)
    }
}