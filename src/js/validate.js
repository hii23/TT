const couponArray = [
    'PROMO1', 'PROMO2', 'PROMO3', 'PROMO4', 'PROMO5', 'PROMO6', 'PROMO7', 'PROMO8', 'PROMO9', 'PROMO10'
];
function isDateValid(dateString) {
    const inputDate = parseDate(dateString, dateFormat);
    const currentDate = new Date();
    if (!inputDate) {
        return false;
    }
    if (currentDate > inputDate) {
        return false;
    }
    return true;
}


function sendFormData(formData) {
    console.log(JSON.stringify(formData));
    return;
    const xhr = new XMLHttpRequest();
    const url = 'your url';
    xhr.open('POST', url);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                console.log('Form data has been successfully submitted');
            } else {
                console.error('Error submitting form data');
            }
        }
    };

    xhr.send(JSON.stringify(formData));
}
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("myForm");
    const submitButton = form.querySelector(".btn.btn__submit");
    const inputPromo = document.getElementById('promo');
    const inputValue = inputPromo.value.toUpperCase();

    const constraints = {
        email: {
            presence: { allowEmpty: false, message: "is required" },
            email: { message: "must be a valid email" },
        },
        card: {
            presence: { allowEmpty: false, message: "is required" },
            format: {
                pattern: /^\d{4}\s\d{4}\s\d{4}\s\d{4}$/,
                message: "must be a valid card number",
            },
        },
        date: {
            presence: { allowEmpty: false, message: "is required" },
            format: {
                pattern: /^(0[1-9]|1[0-2])\/(\d{4})$/,
                message: "must be a valid date (MM/YYYY)",
            },
        },
        cvv: {
            presence: { allowEmpty: false, message: "is required" },
            format: {
                pattern: /^\d{3,4}$/,
                message: "must be a valid CVV",
            },
        },
        name: {
            presence: { allowEmpty: false, message: "is required" },
        },
    };

    function showErrors(errors) {
        const inputContainers = form.querySelectorAll(".input-container");

        inputContainers.forEach((container) => {
            const inputs = container.querySelectorAll("input");

            inputs.forEach((input) => {
                const errorLabel = container.querySelector(".form-pay__label-error");
                const errorGroup = input.getAttribute("data-error-group");

                let errorPresent = errors && errors[input.id];

                if (errorGroup) {
                    errorPresent = errors && (errors[input.id] || errors[errorGroup]);
                }

                if (errorLabel) {
                    if (errorPresent) {
                        errorLabel.textContent = errors[input.id][0];
                        errorLabel.classList.remove("hide");
                    } else {
                        errorLabel.classList.add("hide");
                    }
                }

                if (errorPresent) {
                    input.classList.add("input-group__input-error");
                    submitButton.classList.add("has-error");
                } else {
                    input.classList.remove("input-group__input-error");
                    submitButton.classList.remove("has-error");
                }
            });
        });
    }



    form.addEventListener("submit", function (event) {
        event.preventDefault();
        const coupon = couponArray.includes(inputPromo.value.toUpperCase())
        const formData = {
            email: form.email.value,
            card: form.card.value,
            date: form.date.value,
            cvv: form.cvv.value,
            name: form.name.value,
            coupon: coupon
        };

        const errors = validate(formData, constraints);
        showErrors(errors);

        if (!errors) {
            console.log("Form is valid");
            sendFormData(formData);

        } else {
            console.log("Form is not valid");
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {


    const inputPromo = document.getElementById('promo');
    const applyButton = document.querySelector('.has-error');
    const successIcon = document.querySelector('img[src="./icons/form/true.svg"]');
    const errorIcon = document.querySelector('img[src="./icons/form/trash.svg"]');
    const errorMessage = document.querySelector('.form-pay__coupon-error');
    const successMessage = document.querySelector('.form-pay__coupon-valid:not(.form-pay__coupon-error)');

    const resetForm = () => {
        applyButton.classList.add('has-error');
        applyButton.classList.remove('hide');
        successIcon.classList.add('hide');
        errorIcon.classList.add('hide');
        errorMessage.classList.add('hide');
        successMessage.classList.add('hide');
        inputPromo.classList.remove('input-group__input-error')
    };

    inputPromo.addEventListener('input', () => {
        applyButton.classList.remove('has-error');
    });

    applyButton.addEventListener('click', () => {
        const inputValue = inputPromo.value.toUpperCase();
        if (couponArray.includes(inputValue)) {
            applyButton.classList.add('hide');
            successIcon.classList.remove('hide');
            errorIcon.classList.add('hide');
            errorMessage.classList.add('hide');
            successMessage.classList.remove('hide');
            inputPromo.classList.remove('input-group__input-error')
        } else {
            inputPromo.classList.add('input-group__input-error')
            applyButton.classList.add('hide');
            successIcon.classList.add('hide');
            errorIcon.classList.remove('hide');
            errorMessage.classList.remove('hide');
            successMessage.classList.add('hide');
        }
    });

    errorIcon.addEventListener('click', () => {
        inputPromo.value = '';
        resetForm();
    });
});
