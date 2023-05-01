// import '../index.html';
// import '../style/main.css';
const coupon = document.querySelector('#form-pay__coupon'),
    inputCoupon = document.querySelector('#form-pay__input-coupon'),
    arrowMini = document.querySelector('.form-pay__cript_arrow'),
    payImg = document.querySelector('.form-pay__pay-img'),
    btnsCript = document.querySelector('.form-pay__cript_open');

let openCoupon = false;
let openCript = false;

coupon.addEventListener('click', () => {
    openCoupon = !openCoupon;
    inputCoupon.classList.toggle('hide', !openCoupon);
});

arrowMini.addEventListener('click', () => {
    openCript = !openCript;
    btnsCript.classList.toggle('hide', !openCript);
    arrowMini.classList.toggle('rotate', openCript);
    payImg.classList.toggle('grayscale', openCript);
});



