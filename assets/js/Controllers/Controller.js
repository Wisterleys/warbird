class Controller{
    constructor(data){
        this.audio = new Audio("assets/sounds/musicwarbird.mp3")
        this._game_area = data.gameArea;
        this._shoots = 15
        this._main_loop;
        this.counter=true
        this._positions=[2,2.5,3.5,5,9]//0,1,2,3,4
        this.config ={
            place:this.game_area,// aqui configura a área do game, ou seja, voce define dentro de qual tag acontecerá as animações
            x:50,
            y:0,
            duration:100// essa é o tempo que levará para o objeto sumir da tela
        }
        //Methods
       this.onStart()
    }
    createCannon(){
        if(this.counter){
            if(parseInt($("#score").innerText)>=20){
                new Cannon(this.game_area)
               // $("#shoot").disabled=false
                this.counter=false
            }
        }
    }
    onStart(){
        const teste =[{nome:"Guia",posi:this.positions[0]}]
        teste.forEach(play=>{
            new FlappyPc(this.game_area,play.posi,play.nome);
        })
        new Player(this.game_area,this.positions[4],"")
        $("#control-all").value=null
        $("#restart").on("click",e=>{document.location.reload()})
       
        $("#start").on("click",e=>{
            this.start()
            this.audio.currentTime=0
            this.audio.play()
            $(".modal")[0].classList.add("hide")
            $("#start").disabled=true
            $("#stop").disabled=false
            $("#control-all").value=true
            $("#I").setAttribute("name",$("#name").value?$("#name").value:"Fulano")
            
        })
        $("#stop").on("click",e=>{
            this.audio.pause()
            $(".modal")[0].classList.remove("hide")
            clearInterval(this.main_loop)
            $("#start").disabled=false
            $("#stop").disabled=true
            $("#control-all").value=false
        })
        $("#shoot").on("click",e=>{
            if($("#I")){
                if(e.target.value>0){const bird = this.getPosition($("#I"))
                    new BirdShot(this.game_area,bird)
                }
                let val = e.target.value>0?e.target.value-1:e.target.value
                e.target.value = val>9?val:val>0?"0"+val:"00"
            }
        })
    }
    rand(max,min){
        return Math.random() * (max - min) + min;
    }
    calculateBarriers(number){
        const res = 100-number
        return {up:(number-20)>0?number-20:1,down:res>0?res>80?80:res:1};
    }
    start(){
        let random =this.calculateBarriers(this.rand(100,1))
        if(!$(".barreira")[0]){
                new Barriers([this.game_area,this.getPosition(this.game_area)],{color:["#639301","#a5e82e"],vel:10,height:random})
                new BarriersB([this.game_area,this.getPosition(this.game_area)],{color:["#639301","#a5e82e"],vel:10,height:random})
        }
       
        this.main_loop=setInterval(e=>{
            this.audio.currentTime>=this.audio.duration-10?this.audio.currentTime=0:0
            new Booom(this.config)
            random =this.calculateBarriers(this.rand(100,1))
            if(document.hasFocus()){
                new Barriers([this.game_area,this.getPosition(this.game_area)],{color:["#639301","#a5e82e"],vel:10,height:random});
                new BarriersB([this.game_area,this.getPosition(this.game_area)],{color:["#639301","#a5e82e"],vel:10,height:random});
            }
            this.createCannon()
        },3500)
    }
    getPosition(el){
        return el.getBoundingClientRect()
    }
    get positions(){return this._positions}
    get main_loop(){return this._main_loop}
    set main_loop(value){this._main_loop=value}
    get game_area(){return this._game_area}
    set game_area(value){this._game_area=value}
}
