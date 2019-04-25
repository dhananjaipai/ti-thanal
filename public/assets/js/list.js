document.addEventListener('DOMContentLoaded', function () {
  M.Sidenav.init(document.querySelectorAll('.sidenav'));
});

function populateSideNav(data) {
  let html = `
  <li>
    <div class="background">
      <img src="assets/img/sidenav-header.jpg">
    </div>
  </li>`;
  html += Array.from(new Set(data.map(item => item.category))).reduce((_html, category) => {
    _html += `<li><a class="waves-effect" href="#category=${category}" onclick="filterItems('${category}')">${category}</a></li>`
    return _html;
  }, "")
  qS('sidenav').innerHTML = html;
}

function populateItems(data) {
  let html = '';
  html += data.reduce((_html, item) => {
    let included = __cart.findIndex(({id}) => id===item.id) !== -1;
    _html += `
    <div class="col s12 m6 l3">
          <div class="card">
            <div class="card-image">
              <img onerror="imgErr(event)" src="${item.src || '/assets/img/missing.jpg'}">
              <a class="btn-floating halfway-fab waves-effect waves-light ${included ? "green" : "red"}" onclick="addToCart(event,'${item.id}')"><i
                  class="material-icons">${included ? "check" : "add_shopping_cart"}</i></a>
            </div>
            <div class="card-content">
            <div class="clearfix"><span class="card-title left">${item.name}</span>
              <span class="card-title right bold">₹${item.price}</span>
              </div>
            </div>
          </div>
        </div>
        `;
    return _html;
  }, "")
  qS('items').innerHTML = html;
}

function filterItems(_category) {
  M.Sidenav.getInstance(document.querySelector('.sidenav')).close()
  populateItems(__items.filter(({
    category
  }) => category === _category))
}

function addToCart(event, _id) {
  if (event.currentTarget.querySelector('i').innerText !== "check") {
    event.currentTarget.querySelector('i').innerText = "check";
    event.currentTarget.classList.remove('red');
    event.currentTarget.classList.add('green');
    let item = __items.find(({id}) => id === _id);
    __cart.push({...item,quantity: 1});
  } else {
    event.currentTarget.querySelector('i').innerText = "add_shopping_cart";
    event.currentTarget.classList.add('red');
    event.currentTarget.classList.remove('green');
    __cart = __cart.filter(({id}) => id !== _id);
  }
  qS('cart-count').innerText = __cart.length;
  syncStorage();
}

qS('cart-count').innerText = __cart.length;

fetch("/assets/mock-data.json").then(res => res.json()).then(val => {
  __items = val.data;
  populateSideNav(__items);
  let __hashMap = getHashMap();
  if(__hashMap.category) {
    filterItems(__hashMap.category);
  } else {
    populateItems(__items);
  }
});