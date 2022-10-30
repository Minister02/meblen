const email = document.querySelector('#email');
const sendBtn = document.querySelector('.contact__form-btn');
const popup = document.querySelector('.popup');
const allInputs = document.querySelectorAll('input');
const footerYear = document.querySelector('.footer_year');

const handleCurrentYear = () => {
	const year = new Date().getFullYear();
	footerYear.innerText = year;
};

handleCurrentYear();

const showError = (input, msg) => {
	const formBox = input.parentElement;
	const errorMsg = formBox.querySelector('.error-text');

	formBox.classList.add('error');
	errorMsg.textContent = msg;
};

const clearError = input => {
	const formBox = input.parentElement;
	console.log(formBox);
	formBox.classList.remove('error');
};

const checkForm = input => {
	input.forEach(el => {
		if (el.value === '') {
			showError(el, 'Uzupełnij pole *');
		} else {
			clearError(el);
		}
	});
};

const checkMail = email => {
	const re =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	if (re.test(email.value)) {
		clearError(email);
	} else {
		showError(email, 'E-mail jest niepoprawny');
	}
};

const closePopup = () => {
	popup.classList.remove('show-popup');
};

const checkErrors = () => {
	const allFormBoxes = document.querySelectorAll('.contact__form-box');
	let errorCount = 0;

	allFormBoxes.forEach(el => {
		if (el.classList.contains('error')) {
			errorCount++;
		}
	});

	if (errorCount === 0) {
		popup.classList.add('show-popup');
		setTimeout(closePopup, 2000);
	}

	errorCount;
};

sendBtn.addEventListener('click', e => {
	e.preventDefault();
	checkForm(allInputs);
	checkMail(email);
	checkErrors();
});

mediumZoom('.zoom', {
	margin: 20,
});
