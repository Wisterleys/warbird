class Controller{
    constructor(data){
        this._game_area = data.gameArea;
        this._main_loop;
        this._positions=[2,2.5,3.5,5,9]//0,1,2,3,4
        //Methods
       this.onStart()
    }
    onStart(){
        const teste =[{nome:"Guia",posi:this.positions[0]}]
        new Cannon(this.game_area)
        teste.forEach(play=>{
            new FlappyPc(this.game_area,play.posi,play.nome);
        })
        new Player(this.game_area,this.positions[4],"Wister")
        $("#control-all").value=null
        $("#start").on("click",e=>{
            this.start()
            $("#start").disabled=true
            $("#stop").disabled=false
            $("#control-all").value=true
        })
        $("#stop").on("click",e=>{
            clearInterval(this.main_loop)
            $("#start").disabled=false
            $("#stop").disabled=true
            $("#control-all").value=false
        })
    }
    start(){
        !$(".barreira")[0]?new Barriers([this.game_area,this.getPosition(this.game_area)],{color:["#639301","#a5e82e"],vel:10}):0
        this.main_loop=setInterval(e=>{
            new Barriers([this.game_area,this.getPosition(this.game_area)],{color:["#639301","#a5e82e"],vel:10});
        },4000)
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