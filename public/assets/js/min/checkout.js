function listCart(){var e=__cart.reduce(function(e,t,a){return e.html+='<li class="collection-item avatar">\n    <img class="circle" onerror="imgErr(event)" src="'+(t.src||"/assets/img/missing.jpg")+'">\n    <span class="title">'+t.name+'</span>\n    <p class="bold">₹'+t.price+"</p>\n    <p>Quantity : "+t.quantity+'</p>\n    <div class="secondary-content">\n    <a href="#!" onclick="increaseQty(\''+a+'\')"><i class="material-icons">add</i></a>\n    <a href="#!" onclick="reduceQty(\''+a+'\')"><i class="material-icons">remove</i></a>\n    </div>\n    </li>',e.totalPrice+=t.price*t.quantity,e},{html:"",totalPrice:0});qS("cart-items").innerHTML=e.html,qS("amount").innerHTML="₹"+e.totalPrice}function reduceQty(e){1===__cart[e].quantity?__cart.splice(e,1):__cart[e].quantity=__cart[e].quantity-1,0===__cart.length?(document.querySelector(".empty").style.display="block",document.querySelector(".not-empty").style.display="none"):listCart(),syncStorage()}function increaseQty(e){__cart[e].quantity=__cart[e].quantity+1,listCart(),syncStorage()}function validate(e,t){switch(t){case"name":__nameValid=/^[a-zA-Z ]*$/g.test(e.target.value);break;case"mobile":__numValid=/^[0-9]{10}$/g.test(e.target.value);break;case"check":__agreed=e.target.checked}__nameValid&&__numValid&&__agreed?document.querySelector(".order").classList.remove("disabled"):document.querySelector(".order").classList.add("disabled")}function orderItems(){var e={name:document.querySelector("#name").value,mobile:document.querySelector("#mobile").value,items:__cart.map(function(e){var t=e.id,a=e.quantity;return t+"_"+e.name+" x "+a}).join(","),amount:__cart.reduce(function(e,t){return e+(t.quantity*t.price)},0)};showLoader(),firebase.database().ref("orders/"+e.mobile+"_"+Date.now()).set(e,function(e){e?(hideLoader(),M.toast({html:"Something went wrong. Please try again",classes:"btn"})):M.toast({html:"Order Successful. Redirecting ...",classes:"btn",completeCallback:function(){__cart=[],hideLoader(),syncStorage(function(){window.location.href="/"})}})})}0!==__cart.length?document.querySelector(".not-empty").style.display="block":document.querySelector(".empty").style.display="block",__nameValid=!1,__numValid=!1,__agreed=!1,listCart();