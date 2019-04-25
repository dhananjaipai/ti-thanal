firebase.database().ref('orders/').on('value', function (snapshot) {
  hideLoader();
  updateOrders(snapshot)
});
showLoader();

function updateList(data) {
  let html = data.reduce((_html, item) => {
    _html += `<li class="collection-item avatar">
    <span class="title">${item.name} / ${item.mobile}</span>
    <p class="bold">₹${item.amount}</p>
    ${item.items.split(",").map(_item => `
      <p>${_item}</p>
    `).join("")}
    <a href="tel:${item.mobile}" class="secondary-content"><i class="material-icons">call</i></a>
  </li>`;
    return _html;
  }, "")
  qS('ordered-items').innerHTML = html;
}

function updateOrders(snapshot) {
  updateList(Object.values(snapshot.val()))
};