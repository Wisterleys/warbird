class Barriers{
    constructor(place,color) {
        this.template(place,color)
    }
    template(el,color){
        /*
        <div class="barreiras">
            <div class="barreira up a">
                <div class="borda"></div>
                <div class="corpo"></div>
            </div>
            <div class="barreira b">
                <div class="borda"></div>
                <div class="corpo"></div>
            </div>
        </div>
        */
       let res = el.addEl({tag:"div",class:"barreiras"})
       let up = res.addEl({tag:"div",class:"barreira up a",style:`background: linear-gradient(90deg,${color.color[0]},${color.color[1]});`})
       up.addEl({tag:"div",class:"borda"})
       up.addEl({tag:"div",class:"corpo"})
       let down = res.addEl({tag:"div",class:"barreira b"})
       down.addEl({tag:"div",class:"borda"})
       down.addEl({tag:"div",class:"corpo"})
    }
}