class Controller{
    constructor(data){
        this._game_area = data.gameArea;
        this._barriers = new Barriers(this.game_area,{color:["#639301","#a5e82e"]});
        //Methods
    }
    getPosition(el){
        return el.getBoundingClientRect()
    }
    
    get game_area(){return this._game_area}
    set game_area(value){this._game_area=value}
}