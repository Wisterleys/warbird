class Controller{
    constructor(data){
        this._game_area = data.gameArea;
        //Methods
        this.start()
    }
    start(){
        setInterval(e=>{
            new Barriers([this.game_area,this.getPosition(this.game_area)],{color:["#639301","#a5e82e"],vel:10});
        },4000)
    }
    getPosition(el){
        return el.getBoundingClientRect()
    }
    
    get game_area(){return this._game_area}
    set game_area(value){this._game_area=value}
}