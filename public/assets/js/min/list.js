var __assign=this&&this.__assign||function(){return(__assign=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var a in t=arguments[n])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e}).apply(this,arguments)};function populateSideNav(e){var t='\n  <li>\n    <div class="background">\n      <img src="assets/img/sidenav-header.jpg">\n    </div>\n  </li>';t+=Array.from(new Set(e.map(function(e){return e.category}))).reduce(function(e,t){return e+='<li><a class="waves-effect" href="#category='+t+'" onclick="filterItems(\''+t+"')\">"+t+"</a></li>"},""),qS("sidenav").innerHTML=t}function populateItems(e){var t="";t+=e.reduce(function(e,t){var n=-1!==__cart.findIndex(function(e){return e.id===t.id});return e+='\n    <div class="col s12 m6 l3">\n          <div class="card">\n            <div class="card-image">\n              <img onerror="imgErr(event)" src="'+(t.src||"/assets/img/missing.jpg")+'">\n              <a class="btn-floating halfway-fab waves-effect waves-light '+(n?"green":"red")+'" onclick="addToCart(event,\''+t.id+'\')"><i\n                  class="material-icons">'+(n?"check":"add_shopping_cart")+'</i></a>\n            </div>\n            <div class="card-content">\n            <div class="clearfix"><span class="card-title left">'+t.name+'</span>\n              <span class="card-title right bold">₹'+t.price+"</span>\n              </div>\n            </div>\n          </div>\n        </div>\n        "},""),qS("items").innerHTML=t}function filterItems(e){M.Sidenav.getInstance(document.querySelector(".sidenav")).close(),populateItems(__items.filter(function(t){return t.category===e}))}function addToCart(e,t){if("check"!==e.currentTarget.querySelector("i").innerText){e.currentTarget.querySelector("i").innerText="check",e.currentTarget.classList.remove("red"),e.currentTarget.classList.add("green");var n=__items.find(function(e){return e.id===t});__cart.push(__assign({},n,{quantity:1}))}else e.currentTarget.querySelector("i").innerText="add_shopping_cart",e.currentTarget.classList.add("red"),e.currentTarget.classList.remove("green"),__cart=__cart.filter(function(e){return e.id!==t});qS("cart-count").innerText=__cart.length,syncStorage()}document.addEventListener("DOMContentLoaded",function(){M.Sidenav.init(document.querySelectorAll(".sidenav"))}),qS("cart-count").innerText=__cart.length,fetch("/assets/mock-data.json").then(function(e){return e.json()}).then(function(e){__items=e.data,populateSideNav(__items);var t=getHashMap();t.category?filterItems(t.category):populateItems(__items)});