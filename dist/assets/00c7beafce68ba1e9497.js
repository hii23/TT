const couponArray=["PROMO1","PROMO2","PROMO3","PROMO4","PROMO5","PROMO6","PROMO7","PROMO8","PROMO9","PROMO10"];function isDateValid(e){const s=parseDate(e,dateFormat),t=new Date;return!(!s||t>s)}function sendFormData(e){console.log(JSON.stringify(e))}document.addEventListener("DOMContentLoaded",(function(){const e=document.getElementById("myForm"),s=e.querySelector(".btn.btn__submit"),t=document.getElementById("promo"),r=(t.value.toUpperCase(),{email:{presence:{allowEmpty:!1,message:"is required"},email:{message:"must be a valid email"}},card:{presence:{allowEmpty:!1,message:"is required"},format:{pattern:/^\d{4}\s\d{4}\s\d{4}\s\d{4}$/,message:"must be a valid card number"}},date:{presence:{allowEmpty:!1,message:"is required"},format:{pattern:/^(0[1-9]|1[0-2])\/(\d{4})$/,message:"must be a valid date (MM/YYYY)"}},cvv:{presence:{allowEmpty:!1,message:"is required"},format:{pattern:/^\d{3,4}$/,message:"must be a valid CVV"}},name:{presence:{allowEmpty:!1,message:"is required"}}});e.addEventListener("submit",(function(a){a.preventDefault();const o=couponArray.includes(t.value.toUpperCase()),d={email:e.email.value,card:e.card.value,date:e.date.value,cvv:e.cvv.value,name:e.name.value,coupon:o},i=validate(d,r);!function(t){e.querySelectorAll(".input-container").forEach((e=>{e.querySelectorAll("input").forEach((r=>{const a=e.querySelector(".form-pay__label-error"),o=r.getAttribute("data-error-group");let d=t&&t[r.id];o&&(d=t&&(t[r.id]||t[o])),a&&(d?(a.textContent=t[r.id][0],a.classList.remove("hide")):a.classList.add("hide")),d?(r.classList.add("input-group__input-error"),s.classList.add("has-error")):(r.classList.remove("input-group__input-error"),s.classList.remove("has-error"))}))}))}(i),i?console.log("Form is not valid"):(console.log("Form is valid"),sendFormData(d))}))})),document.addEventListener("DOMContentLoaded",(()=>{const e=document.getElementById("promo"),s=document.querySelector(".has-error"),t=document.querySelector('img[src="./icons/form/true.svg"]'),r=document.querySelector('img[src="./icons/form/trash.svg"]'),a=document.querySelector(".form-pay__coupon-error"),o=document.querySelector(".form-pay__coupon-valid:not(.form-pay__coupon-error)");e.addEventListener("input",(()=>{s.classList.remove("has-error")})),s.addEventListener("click",(()=>{const d=e.value.toUpperCase();couponArray.includes(d)?(s.classList.add("hide"),t.classList.remove("hide"),r.classList.add("hide"),a.classList.add("hide"),o.classList.remove("hide"),e.classList.remove("input-group__input-error")):(e.classList.add("input-group__input-error"),s.classList.add("hide"),t.classList.add("hide"),r.classList.remove("hide"),a.classList.remove("hide"),o.classList.add("hide"))})),r.addEventListener("click",(()=>{e.value="",s.classList.add("has-error"),s.classList.remove("hide"),t.classList.add("hide"),r.classList.add("hide"),a.classList.add("hide"),o.classList.add("hide"),e.classList.remove("input-group__input-error")}))}));