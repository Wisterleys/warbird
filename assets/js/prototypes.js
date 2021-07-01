//Window
window.on = function(events,func){
    events.split(' ').forEach(event => {
        this.addEventListener(event,func)
    });
}
window.$=function(e){return e.search("#")>-1?document.querySelector(e):document.querySelectorAll(e)}

//Elements
Element.prototype.on=function(events,func){
    events.split(' ').forEach(event => {
        this.addEventListener(event,func)
    });
}
Element.prototype.$=function(e){return e.search("#")>-1?this.querySelector(e):this.querySelectorAll(e)}
Element.prototype.toggle=function(){this.classList.toggle("close")}
Element.prototype.addEl=function(obj){
    /*
    exemplo
    obj={
        tag:nome da tag que deseja criar,
        insertTag: É para inserir uma tag dentro dessa nova tag criada ou só uma mensagem dentro da tag
        tudo que adicionar depois disso é considerado atributo
        a chave é considerada o nome do atributo e o valor é o valor mesmo rsrs
    }
    */
    let tag;
    if(obj.tag){
        tag = document.createElement(obj.tag);
        for(let key in obj){
            if(key != "place" && key != "tag" && key != "insertTag"){
                let att = document.createAttribute(key)
                att.value=obj[key];
                tag.setAttributeNode(att)
            }
        }
        obj.insertTag?tag.innerHTML=obj.insertTag:0
        this.appendChild(tag);
    }
    return tag
}

