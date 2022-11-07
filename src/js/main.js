AOS.init();

const email = document.querySelector('#email');
const sendBtn = document.querySelector('.contact__form-btn');
const popup = document.querySelector('.popup');
const allInputs = document.querySelectorAll('input');
const footerYear = document.querySelector('.footer_year');
const burgerBtn = document.querySelector('.burger-btn');
const navbar = document.querySelector('.navbar');
const menuItems = document.querySelectorAll('.navbar__item');
const scrollSpySections = document.querySelectorAll('.scrollspy');
const sections = document.querySelectorAll('.section');

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

// burger btn

const openMenu = () => {
	const navList = document.querySelector('.navbar__list');
	navList.classList.toggle('navbar__list--active');
};

burgerBtn.addEventListener('click', openMenu);

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

closeMenu();

// scroll spy

const handleScrollSpy = () => {
	if (document.body.classList.contains('main-page')) {
		const sections = [];

		scrollSpySections.forEach(section => {
			// console.log(window.offsetTop);

			if (
				window.scrollY <=
				section.offsetTop + section.offsetHeight - navbar.offsetHeight - 1
			) {
				sections.push(section);

				const activeSection = document.querySelector(
					`[href*="${sections[0].id}"]`
				);

				menuItems.forEach(item => item.classList.remove('active'));

				activeSection.classList.add('active');
			}

			if (window.innerHeight + window.scrollY > document.body.offsetHeight) {
				const lastSection = document.querySelector('.navbar-item:last-of-type');

				menuItems.forEach(item => item.classList.remove('active'));

				lastSection.classList.add('.active');
			}

			// 	if (window.innerHeight + window.scrollY < document.body.offsetHeight) {
			// 		const firstSection = document.querySelector(
			// 			'.navbar-item:first-of-type'
			// 		);

			// 		menuItems.forEach(item => item.classList.remove('active'));

			// 		firstSection.classList.add('.active');
			// 	}
		});
	}
};

window.addEventListener('scroll', handleScrollSpy);

// const options = {
// 	threshold: [0.5, 0.9],
// };

// const handleScrollspy = entries => {
// 	entries.forEach(entry => {
// 		const activeNav = document.querySelector(`[href='#${entry.target.id}']`);

// 		if (entry.isIntersecting) {
// 			menuItems.forEach(item => item.classList.remove('active'));
// 			activeNav.classList.add('active');
// 		}
// 	});
// };

// const observer = new IntersectionObserver(handleScrollspy, options);

// sections.forEach(section => {
// 	observer.observe(section);
// });
