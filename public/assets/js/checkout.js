if (__cart.length !== 0) {
  document.querySelector('.not-empty').style.display = 'block';
} else {
  document.querySelector('.empty').style.display = 'block';
}

__nameValid = false;
__numValid = false;
__agreed = false;

function listCart() {
  let parser = __cart.reduce((acc, item, idx) => {
    acc.html += `<li class="collection-item avatar">
    <img class="circle" onerror="imgErr(event)" src="${item.src || '/assets/img/missing.jpg'}">
    <span class="title">${item.name}</span>
    <p class="bold">₹${item.price}</p>
    <p>Quantity : ${item.quantity}</p>
    <div class="secondary-content">
    <a href="#!" onclick="increaseQty('${idx}')"><i class="material-icons">add</i></a>
    <a href="#!" onclick="reduceQty('${idx}')"><i class="material-icons">remove</i></a>
    </div>
    </li>`;
    acc.totalPrice += item.price * item.quantity;
    return acc;
  }, {
    html: '',
    totalPrice: 0
  })
  qS('cart-items').innerHTML = parser.html;
  qS('amount').innerHTML = '₹' + parser.totalPrice;
}

function reduceQty(_id) {
  let item = __cart[_id];
  if (item.quantity === 1) {
    __cart.splice(_id, 1);
  } else {
    __cart[_id]['quantity'] = __cart[_id]['quantity'] - 1;
  }
  if (__cart.length === 0) {
    document.querySelector('.empty').style.display = 'block';
    document.querySelector('.not-empty').style.display = 'none';
  } else {
    listCart();
  }
  syncStorage();
}

function increaseQty(_id) {
  __cart[_id]['quantity'] = __cart[_id]['quantity'] + 1;
  listCart();
  syncStorage();
}

function validate(e, input) {
  switch (input) {
    case "name":
      __nameValid = /^[a-zA-Z ]*$/g.test(e.target.value);
      break;
    case "mobile":
      __numValid = /^[0-9]{10}$/g.test(e.target.value);
      break;
    case "check":
      __agreed = e.target.checked;
      break;
  }
  if (__nameValid && __numValid && __agreed) {
    document.querySelector('.order').classList.remove('disabled')
  } else {
    document.querySelector('.order').classList.add('disabled')
  }
}

function orderItems() {
  let data = {
    name: document.querySelector('#name').value,
    mobile: document.querySelector("#mobile").value,
    items: __cart.map(({
      id,
      quantity,
      name
    }) => id + "_" + name + " x " + quantity).join(','),
    amount: __cart.reduce((acc, {
      quantity,
      price
    }) => acc += quantity*price, 0),
  }
  showLoader();
  firebase.database().ref(`orders/${data.mobile}_${Date.now()}`).set(data, function (error) {
    if (error) {
      hideLoader();
      M.toast({
        html: 'Something went wrong. Please try again',
        classes: 'btn'
      });
    } else {
      M.toast({
        html: 'Order Successful. Redirecting ...',
        classes: 'btn',
        completeCallback: function () {
          __cart = [];
          hideLoader();
          syncStorage(function () {
            window.location.href = "/";
          });
        }
      });
    }
  });
}
listCart();