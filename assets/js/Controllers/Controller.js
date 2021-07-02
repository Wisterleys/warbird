class Controller{
    constructor(data){
        this._game_area = data.gameArea;
        this._main_loop;
        //Methods
       this.onStart()
    }
    onStart(){
        $("#control-all").value=true
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
        this.main_loop=setInterval(e=>{
            new Barriers([this.game_area,this.getPosition(this.game_area)],{color:["#639301","#a5e82e"],vel:10});
        },4000)
    }
    getPosition(el){
        return el.getBoundingClientRect()
    }
    get main_loop(){return this._main_loop}
    set main_loop(value){this._main_loop=value}
    get game_area(){return this._game_area}
    set game_area(value){this._game_area=value}
}