var __items;
var __debounce;
__cart = JSON.parse(localStorage.getItem("cart") || "[]");

function imgErr(e) {
  e.target.src = '/assets/img/missing.jpg';
}

function qS(selector) {
  return document.querySelector(`[data-placeholder="${selector}"]`);
}

function getHashMap() {
  let hashString = window.location.hash;
  return hashString ? hashString.slice(1).split(',').reduce((hashMap, _hashString) => {
    let [key, value] = _hashString.split("=");
    hashMap[key] = value;
    return hashMap
  }, {}) : {}
}

function showLoader() {
  document.querySelector('.spinner-wrapper').style.display = 'block';
  document.querySelector('.overlay').style.display = 'block';

}

function hideLoader() {
  document.querySelector('.spinner-wrapper').style.display = 'none';
  document.querySelector('.overlay').style.display = 'none';
}

function stopEvent(event) {
  event.preventDefault();
}

function syncStorage(callback) {
  showLoader();
  if (!__debounce) {
    __debounce = setTimeout(() => {
      localStorage.setItem("cart", JSON.stringify(__cart));
      __debounce = undefined;
      hideLoader();
      if (callback)
        callback();
    }, 300);
  } else {
    clearInterval(__debounce);
    __debounce = setTimeout(() => {
      localStorage.setItem("cart", JSON.stringify(__cart));
      __debounce = undefined;
      hideLoader();
      if (callback)
        callback();
    }, 300);
  }
}