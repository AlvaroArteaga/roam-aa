let ccc = {};

ccc.util = ((c3u) => {
    ///////////////Front-End///////////////
    c3u.getUidOfContainingBlock = (el) => {
        return el.closest('.rm-block__input').id.slice(-9)
    }

    c3u.insertAfter = (newEl, anchor) => {
        anchor.parentElement.insertBefore(newEl, anchor.nextSibling)
    }

    c3u.getNthChildUid = (parentUid, order) => {
        const allChildren = c3u.allChildrenInfo(parentUid)[0][0].children;
        const childrenOrder = allChildren.map(function (child) { return child.order; });
        const index = childrenOrder.findIndex(el => el === order);
        return index !== -1 ? allChildren[index].uid : null;
    }

    c3u.sleep = m => new Promise(r => setTimeout(r, m))

    c3u.createPage = (pageTitle) => {
        let pageUid = c3u.createUid()
        const status = window.roamAlphaAPI.createPage(
            {
                "page":
                    { "title": pageTitle, "uid": pageUid }
            })
        return status ? pageUid : null
    }

    c3u.updateBlockString = (blockUid, newString) => {
        return window.roamAlphaAPI.updateBlock({
            block: { uid: blockUid, string: newString }
        });
    }

    c3u.hashCode = (str) => {
        let hash = 0, i, chr;
        for (i = 0; i < str.length; i++) {
            chr = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + chr;
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    }

    c3u.createChildBlock = (parentUid, order, childString, childUid) => {
        return window.roamAlphaAPI.createBlock(
            {
                location: { "parent-uid": parentUid, order: order },
                block: { string: childString.toString(), uid: childUid }
            })
    }

    c3u.openBlockInSidebar = (windowType, blockUid) => {
        return window.roamAlphaAPI.ui.rightSidebar.addWindow({ window: { type: windowType, 'block-uid': blockUid } })
    }

    c3u.deletePage = (pageUid) => {
        return window.roamAlphaAPI.deletePage({ page: { uid: pageUid } });
    }


    c3u.createUid = () => {
        return roamAlphaAPI.util.generateUID();
    }



    ///////////////Back-End///////////////
    c3u.existBlockUid = (blockUid) => {
        const res = window.roamAlphaAPI.q(
            `[:find (pull ?block [:block/uid])
        :where
               [?block :block/uid \"${blockUid}\"]]`)
        return res.length ? blockUid : null
    }

    c3u.deleteBlock = (blockUid) => {
        return window.roamAlphaAPI.deleteBlock({ "block": { "uid": blockUid } });
    }

    c3u.parentBlockUid = (blockUid) => {
        const res = window.roamAlphaAPI.q(
            `[:find (pull ?parent [:block/uid])
        :where
            [?parent :block/children ?block]
               [?block :block/uid \"${blockUid}\"]]`)
        return res.length ? res[0][0].uid : null
    }

    c3u.blockString = (blockUid) => {
        return window.roamAlphaAPI.q(
            `[:find (pull ?block [:block/string])
        :where [?block :block/uid \"${blockUid}\"]]`)[0][0].string
    }

    c3u.allChildrenInfo = (blockUid) => {
        let results = window.roamAlphaAPI.q(
            `[:find (pull ?parent 
                [* {:block/children [:block/string :block/uid :block/order]}])
      :where
          [?parent :block/uid \"${blockUid}\"]]`)
        return (results.length == 0) ? undefined : results

    }

    c3u.queryAllTxtInChildren = (blockUid) => {
        return window.roamAlphaAPI.q(`[
            :find (pull ?block [
                :block/string
                {:block/children ...}
            ])
            :where [?block :block/uid \"${blockUid}\"]]`)
    }

    c3u.getPageUid = (pageTitle) => {
        const res = window.roamAlphaAPI.q(
            `[:find (pull ?page [:block/uid])
        :where [?page :node/title \"${pageTitle}\"]]`)
        return res.length ? res[0][0].uid : null
    }

    c3u.getOrCreatePageUid = (pageTitle, initString = null) => {
        let pageUid = c3u.getPageUid(pageTitle)
        if (!pageUid) {
            pageUid = c3u.createPage(pageTitle);
            if (initString)
                c3u.createChildBlock(pageUid, 0, initString, c3u.createUid());
        }
        return pageUid;
    }

    c3u.isAncestor = (a, b) => {
        const results = window.roamAlphaAPI.q(
            `[:find (pull ?root [* {:block/children [:block/uid {:block/children ...}]}])
            :where
                [?root :block/uid \"${a}\"]]`);
        if (!results.length) return false;
        let descendantUids = [];
        c3u.getUidFromNestedNodes(results[0][0], descendantUids)
        return descendantUids.includes(b);
    }

    c3u.getUidFromNestedNodes = (node, descendantUids) => {
        if (node.uid) descendantUids.push(node.uid)
        if (node.children)
            node.children.forEach(child => c3u.getUidFromNestedNodes(child, descendantUids))
    }

    return c3u;
})(ccc.util || {});

//activateButtons();
activateButtons2();

function activateButtons() {
        var c3u = ccc.util;
        Array.from(document.getElementsByTagName('button'))
            .filter(btn => btn.textContent === "progreso")
            .forEach(btn => {
              butt(btn,c3u);
            })
}
function activateButtons2() {
        var c3u = ccc.util;
        Array.from(document.getElementsByTagName('button'))
            .filter(btn => btn.textContent === "progreso")
            .forEach(btn => {
              btn.addEventListener("click",function(e){
//var c3u = ccc.util;
 // console.log(btn);
           // if (btn.getAttribute('listener') !== 'true') {       
  //evento(btn,c3u);
              //btn.addEventListener("click",evento(btn,c3u));
 // }

         // const elementClicked = e.target;
              //  btn.setAttribute('listener', 'true');
         //elementClicked.setAttribute('listener', 'true');         
            const BBlockUid =  c3u.getUidOfContainingBlock(btn);
                uid= BBlockUid;
var page_title = document.title;
var buscar = "{{[[TODO]]}}";
var buscar2 ="[w:";
var wtotal=0.0;
var wparcial=0.0;
//var wPorcentaje=0.0;
//busca el id del uid del bloque
var id = window.roamAlphaAPI.q("[:find ?e :in $ ?a :where [?e :block/uid ?a]]", uid);
//var arr =["0.0","0.0"];
//busca el bloque
var node = window.roamAlphaAPI.pull("[*]", id[0][0]);
var posicion = -1
for (var i in node[':block/children']) {
  //se obtiene el contenido del string
  var contenido = window.roamAlphaAPI.pull('[:block/string]', node[':block/children'][i][':db/id']);
  var contenido2 = contenido[':block/string'] 

  //busca si hay un TODO y obtiene la posición, y un -1 si no lo encuentra
  posicion = typeof contenido2 === 'string' ? contenido2.indexOf(buscar): -1;
  
 
  if (posicion !== -1){ //si tiene un TODO entra acá
    posicion = typeof contenido2 === 'string' ? contenido2.indexOf(buscar2): -1; //busca el peso, y da un -1 si no lo encuentra
    if (posicion !== -1){
      posicion2 = typeof contenido2 === 'string' ? contenido2.indexOf("]",posicion+3): -1; //busca el ] que indica el termino del numero del peso, un -1 si no lo encuentra
      if (posicion2 !== -1){
        peso = typeof contenido2 === 'string' ? contenido2.substring(posicion+3, posicion2): "error en peso"; //encuentra el peso
        //console.log("El peso de esta tarea es " + peso);
      //await c3u.sleep(100);
        arr = peso.split('/');
      //console.log(arr[0]); // "Soy"
      //console.log(arr[1]); // "un"
        //await c3u.sleep(100);
        wparcial=wparcial+parseFloat(arr[0]);
        wtotal=wtotal+parseFloat(arr[1]);
        //wPorcentaje=wPorcentaje+(wparcial/wtotal)
        //console.log(wparcial);
        //console.log(wtotal);
      } else { //si no se encontró el cierre del peso, entra acá
        //console.log("No se pudo determinar el peso de la tarea");
        }
    } else { //si no tiene un peso, entra acá
      //console.log("No encontró un peso de la tarea");
      }
  } else { //si no tiene un TODO entra acá
    //console.log("No encontró un TODO");
  }
}
 // console.log(wtotal);
//console.log("El peso Total es " + wtotal);

  var contenido3 = c3u.blockString(uid);
  arrr = contenido3.split('{{[[TODO]]}}');
  contenido3=arrr[0]+arrr[1];
  //await c3u.sleep(100);
  posicionA = typeof contenido3 === 'string' ? contenido3.indexOf("[w:"): -1;
  posicionB = typeof contenido3 === 'string' ? contenido3.indexOf("]"): -1;
  posicionC = typeof contenido3 === 'string' ? contenido3.indexOf("/"): -1
  //await c3u.sleep(100);
  sA = typeof contenido3 === 'string' ? contenido3.substring(0, posicionA): "ERROR";
  sB = typeof contenido3 === 'string' ? contenido3.substring(posicionB+1): "ERROR";
  sC = typeof contenido3 === 'string' ? contenido3.substring(posicionC+1,posicionB): "ERROR";

  var tot = Number(((wparcial/wtotal)*parseFloat(sC)).toFixed(1));
  var newString = "{{[[TODO]]}}"+sA+sB+"[w:"+tot+"/"+sC+"]";
//            console.log(btn)
    c3u.updateBlockString(uid, newString);
//console.log(btn)
    const newDiv = document.createElement("div");
    const newSpan = document.createElement("span");

  
                
  newDiv.classList.add("meter");

                 //.style['background-color'] = '#ccc';
            //    <div class="meter">
    //<span style="width: 25%"></span>
  //</div>
           // var myObj=document.getElementsByClassName('meter');

//document.getElementsByClassName("meter").style.width = " 25%";
                
              //myObj.style['style'] = "width: 25%";
   // const newContent = document.createTextNode("Aqui va la barra de progreso");
    newDiv.appendChild(newSpan);
    const element1 = document.querySelector(`[id*="`+uid+`"]`);

  //element1.parentNode.insertBefore(newDiv, element1);
element1.appendChild(newDiv);
var getmeter=element1.getElementsByClassName('meter')[0];
var getspan=getmeter.getElementsByTagName('span')[0];

                    getspan.style.width = " "+100*parseFloat(tot)/parseFloat(sC)+"%";

//butt(btn,c3u);
                
//const nuevoboton=
//var btn33 = document.querySelector(`[id*="`+uid+`"]`); 
//var btn3=btn33.getElementsByTagName('button')[0][0];     
 //             console.log("aqui1: "+btn3)
 //             butt(btn3,c3u);
            

      //          console.log("aqui "+ nuevoboton[0]);
                //butt(nuevoboton,c3u);
    //setTimeout(function(){
  //  butt(nuevoboton,c3u);
//      }, 2000);
//*************** copia

                


//***** copia


                

                
  //newSpan.setAttribute("style","width: 25%;");   
    //setTimeout(function(){
    //activateButtons();
    //  }, 2000);








                
                                  
              
              }  );
            })
}

 //document.addEventListener('DOMContentLoaded', () => {
      
     //var c3u = ccc.util;
   //     Array.from(document.getElementsByTagName('button'))
       //     .filter(btn => btn.textContent === "progreso")
         //   .forEach(btn => {
           //   btn.addEventListener("click",activateButtons());
           // })
 
// });



function butt(btn,c3u){
//var c3u = ccc.util;
 // console.log(btn);
           // if (btn.getAttribute('listener') !== 'true') {       
  evento(btn,c3u);
              //btn.addEventListener("click",evento(btn,c3u));
  }

function evento(btn,c3u){
         // const elementClicked = e.target;
              //  btn.setAttribute('listener', 'true');
         //elementClicked.setAttribute('listener', 'true');         
            const BBlockUid =  c3u.getUidOfContainingBlock(btn);
                uid= BBlockUid;
var page_title = document.title;
var buscar = "{{[[TODO]]}}";
var buscar2 ="[w:";
var wtotal=0.0;
var wparcial=0.0;
//var wPorcentaje=0.0;
//busca el id del uid del bloque
var id = window.roamAlphaAPI.q("[:find ?e :in $ ?a :where [?e :block/uid ?a]]", uid);
//var arr =["0.0","0.0"];
//busca el bloque
var node = window.roamAlphaAPI.pull("[*]", id[0][0]);
var posicion = -1
for (var i in node[':block/children']) {
  //se obtiene el contenido del string
  var contenido = window.roamAlphaAPI.pull('[:block/string]', node[':block/children'][i][':db/id']);
  var contenido2 = contenido[':block/string'] 

  //busca si hay un TODO y obtiene la posición, y un -1 si no lo encuentra
  posicion = typeof contenido2 === 'string' ? contenido2.indexOf(buscar): -1;
  
 
  if (posicion !== -1){ //si tiene un TODO entra acá
    posicion = typeof contenido2 === 'string' ? contenido2.indexOf(buscar2): -1; //busca el peso, y da un -1 si no lo encuentra
    if (posicion !== -1){
      posicion2 = typeof contenido2 === 'string' ? contenido2.indexOf("]",posicion+3): -1; //busca el ] que indica el termino del numero del peso, un -1 si no lo encuentra
      if (posicion2 !== -1){
        peso = typeof contenido2 === 'string' ? contenido2.substring(posicion+3, posicion2): "error en peso"; //encuentra el peso
        //console.log("El peso de esta tarea es " + peso);
      //await c3u.sleep(100);
        arr = peso.split('/');
      //console.log(arr[0]); // "Soy"
      //console.log(arr[1]); // "un"
        //await c3u.sleep(100);
        wparcial=wparcial+parseFloat(arr[0]);
        wtotal=wtotal+parseFloat(arr[1]);
        //wPorcentaje=wPorcentaje+(wparcial/wtotal)
        //console.log(wparcial);
        //console.log(wtotal);
      } else { //si no se encontró el cierre del peso, entra acá
        //console.log("No se pudo determinar el peso de la tarea");
        }
    } else { //si no tiene un peso, entra acá
      //console.log("No encontró un peso de la tarea");
      }
  } else { //si no tiene un TODO entra acá
    //console.log("No encontró un TODO");
  }
}
 // console.log(wtotal);
//console.log("El peso Total es " + wtotal);

  var contenido3 = c3u.blockString(uid);
  arrr = contenido3.split('{{[[TODO]]}}');
  contenido3=arrr[0]+arrr[1];
  //await c3u.sleep(100);
  posicionA = typeof contenido3 === 'string' ? contenido3.indexOf("[w:"): -1;
  posicionB = typeof contenido3 === 'string' ? contenido3.indexOf("]"): -1;
  posicionC = typeof contenido3 === 'string' ? contenido3.indexOf("/"): -1
  //await c3u.sleep(100);
  sA = typeof contenido3 === 'string' ? contenido3.substring(0, posicionA): "ERROR";
  sB = typeof contenido3 === 'string' ? contenido3.substring(posicionB+1): "ERROR";
  sC = typeof contenido3 === 'string' ? contenido3.substring(posicionC+1,posicionB): "ERROR";

  var tot = Number(((wparcial/wtotal)*parseFloat(sC)).toFixed(1));
  var newString = "{{[[TODO]]}}"+sA+sB+"[w:"+tot+"/"+sC+"]";
//            console.log(btn)
    c3u.updateBlockString(uid, newString);
//console.log(btn)
    const newDiv = document.createElement("div");
    const newSpan = document.createElement("span");

  
                
  newDiv.classList.add("meter");

                 //.style['background-color'] = '#ccc';
            //    <div class="meter">
    //<span style="width: 25%"></span>
  //</div>
           // var myObj=document.getElementsByClassName('meter');

//document.getElementsByClassName("meter").style.width = " 25%";
                
              //myObj.style['style'] = "width: 25%";
   // const newContent = document.createTextNode("Aqui va la barra de progreso");
    newDiv.appendChild(newSpan);
    const element1 = document.querySelector(`[id*="`+uid+`"]`);

  //element1.parentNode.insertBefore(newDiv, element1);
element1.appendChild(newDiv);
var getmeter=element1.getElementsByClassName('meter')[0];
var getspan=getmeter.getElementsByTagName('span')[0];

                    getspan.style.width = " "+100*parseFloat(tot)/parseFloat(sC)+"%";

//butt(btn,c3u);
                
//const nuevoboton=
//var btn33 = document.querySelector(`[id*="`+uid+`"]`); 
//var btn3=btn33.getElementsByTagName('button')[0][0];     
 //             console.log("aqui1: "+btn3)
 //             butt(btn3,c3u);
            

      //          console.log("aqui "+ nuevoboton[0]);
                //butt(nuevoboton,c3u);
    //setTimeout(function(){
  //  butt(nuevoboton,c3u);
//      }, 2000);
//*************** copia

                


//***** copia


                

                
  //newSpan.setAttribute("style","width: 25%;");   
    //setTimeout(function(){
    //activateButtons();
    //  }, 2000);

              }
                                  

  
//}