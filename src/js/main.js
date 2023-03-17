const email = document.querySelector('#email');
const sendBtn = document.querySelector('.contact__form-btn');
const popup = document.querySelector('.popup');
const allInputs = document.querySelectorAll('input');
const footerYear = document.querySelector('.footer_year');
const burgerBtn = document.querySelector('.burger-btn');
const navbar = document.querySelector('.navbar');
const menuItems = document.querySelectorAll('.navbar__item');
const scrollSpySections = document.querySelectorAll(
	"[data-scroll='scrollspy']"
);
const allImages = document.querySelectorAll('.zoom-img');
const closeButton = document.querySelector('.close-btn');
const popupBox = document.querySelector('.popup-img');
const cookieBox = document.querySelector('.cookie-box');
const cookieBtn = document.querySelector('.cookie-btn');

const main = () => {
	prepareDOMEvents();
	handleCurrentYear();
	showCookie();
	closeMenu();
};

const prepareDOMEvents = () => {
	sendBtn.addEventListener('click', e => {
		e.preventDefault();
		checkForm(allInputs);
		checkMail(email);
		checkErrors();
	});
	window.addEventListener('scroll', handleScrollSpy);
	cookieBtn.addEventListener('click', handleCookieBBox);
	document.addEventListener('keyup', escapeKeyCheck);
	closeButton.addEventListener('click', closingPopup);
	popupBox.addEventListener('click', closingPopup);
	burgerBtn.addEventListener('click', openMenu);
};

const handleCurrentYear = () => {
	const year = new Date().getFullYear();
	footerYear.innerText = year;
};

const showError = (input, msg) => {
	const formBox = input.parentElement;
	const errorMsg = formBox.querySelector('.error-text');

	formBox.classList.add('error');
	errorMsg.textContent = msg;
};

const clearError = input => {
	const formBox = input.parentElement;
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
};

// git newCheckForm

// burger btn

const openMenu = () => {
	const navList = document.querySelector('.navbar__list');
	navList.classList.toggle('navbar__list--active');
};

// close menu

const itemcloseMenu = () => {
	const navList = document.querySelector('.navbar__list');
	navList.classList.remove('navbar__list--active');
};

const closeMenu = () => {
	const navIcon = document.querySelector('.navbar__icon');
	const navItems = document.querySelectorAll('.navbar__item');
	navItems.forEach(el => {
		el.addEventListener('click', itemcloseMenu);
	});

	navIcon.addEventListener('click', itemcloseMenu);
};

// scroll spy

const handleScrollSpy = () => {
	if (document.body.classList.contains('main-page')) {
		const sections = [];

		scrollSpySections.forEach(section => {
			if (
				window.scrollY <=
				section.offsetTop + section.offsetHeight - navbar.offsetHeight - 1
			) {
				sections.push(section);

				const activeSection = document.querySelector(
					`[href*="${sections[0].id}"]`
				);

				if (activeSection) {
					menuItems.forEach(link => link.classList.remove('active'));
					activeSection.classList.add('active');
				} else {
					menuItems.forEach(link => link.classList.remove('active'));
				}
			}

			if (window.innerHeight + window.scrollY > document.body.offsetHeight) {
				const lastSection = document.querySelector('.navbar-item:last-of-type');

				menuItems.forEach(item => item.classList.remove('active'));

				lastSection.classList.add('.active');
			}
		});
	}
};

// zoom img

allImages.forEach(el => {
	el.addEventListener('click', () => {
		const popupImg = document.querySelector('.popup-img img');
		popupBox.style.display = 'block';
		popupImg.src = el.getAttribute('src');
		popupImg.alt = el.getAttribute('alt');
	});
});

// close img

const closingPopup = () => {
	popupBox.style.display = 'none';
};

const escapeKeyCheck = e => {
	if (e.key === 'Escape') {
		closingPopup();
	}
};

// cookies

const showCookie = () => {
	const cookieEaten = localStorage.getItem('cookie');

	if (cookieEaten) {
		cookieBox.classList.add('hide');
	}
};

const handleCookieBBox = () => {
	localStorage.setItem('cookie', 'true');
	cookieBox.classList.add('hide');
};

document.addEventListener('DOMContentLoaded', main);
