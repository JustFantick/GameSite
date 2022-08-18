// if(Поддреживаем WEBp) в "body" + сlassList('webp');
function testWebP(callback) {
	var webP = new Image();
	webP.onload = webP.onerror = function () {
		callback(webP.height == 2);
	};
	webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}
testWebP(function (support) {

	if (support == true) {
		document.querySelector('body').classList.add('webp');
	} else {
		document.querySelector('body').classList.add('no-webp');
	}
});

// для ".ibg" внутрений img добавляет как backGround-image
function ibg() {
	let ibg = document.querySelectorAll(".ibg");
	for (var i = 0; i < ibg.length; i++) {
		if (ibg[i].querySelector('img')) {
			ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
		}
	}
}
ibg();

document.addEventListener('DOMContentLoaded', function () {
	//Animate for navigate
	const nav = document.querySelector('.header__tabs');
	const underline = document.querySelector('.underline');
	let initial = document.getElementsByClassName('initial')[0];

	function mouseOver(aim) {
		let width = aim.offsetWidth;
		let shift = aim.offsetLeft;
		underline.style.left = shift + 'px';
		underline.style.width = width + 'px';
	}
	function mouseOut(aim) {
		let initWidth = aim.offsetWidth;
		let initShift = aim.offsetLeft;
		underline.style.left = initShift + 'px';
		underline.style.width = initWidth + 'px';
	}
	mouseOut(initial);

	nav.addEventListener('mouseover', function (event) {
		let target = event.target.closest('li');
		if (!target) return;
		mouseOver(target);
	})
	nav.addEventListener('mouseout', function (event) {
		let target = event.target.closest('li');
		initial = document.getElementsByClassName('initial')[0];
		mouseOut(initial);
	})
	nav.addEventListener('click', function (event) {
		let target = event.target.closest('li');
		if (!target || target.innerHTML == "Форум") return;
		let initial = document.getElementsByClassName('initial')[0];

		let current = document.querySelector('.current');
		current.classList.remove('current');
		initial.classList.remove('initial');
		target.classList.add('initial');
		if (target.innerHTML == "Главная") {
			let mainContent = document.querySelectorAll('.main  > section');
			mainContent[0].classList.add('current');
		} else if (target.innerHTML == "Новости") {
			let mainContent = document.querySelectorAll('.main  > section');
			mainContent[1].classList.add('current');
			if (mainContent[0].classList.contains('author')) {
				mainContent[1].style.cssText = 'max-height: 85vh;';
			}
		}
	})
	//Tabs at "author" block
	document.querySelectorAll('.tabs__links a').forEach((item) => {
		item.addEventListener('click', function (e) {
			e.preventDefault();
			const id = e.target.getAttribute('href').replace('#', '');

			document.querySelectorAll('.tabs__links a').forEach(
				(elem) => elem.classList.remove('active')
			);
			document.querySelectorAll('.tabs__item').forEach(
				(elem) => elem.classList.remove('active')
			);
			item.classList.add('active');
			document.getElementById(id).classList.add('active');
		});
	});
	if (document.querySelector('.tabs__item')) document.querySelector('.tabs__item').click();


	//Form validation
	let formBtn = document.querySelector('form button');
	let form = document.querySelector('form');
	formBtn.addEventListener('click', formSend);

	function formSend(event) {
		event.preventDefault();

		let error = formValidate(form);

		if (error === 0) {
			//при успешной проверке полей нужно шото делать 
			document.location.href = "author.html";
		}
	}

	function formValidate(form) {
		let error = 0;
		//класс "_req" должен показывать поля обязательные для ввода
		let formReq = document.querySelectorAll('._req');
		for (const elem of formReq) {
			const input = elem;
			formRemoveError(input);

			//валидация Имэйла, должен иметь '_email';
			if (input.classList.contains('_email')) {
				if (emailTest(input)) {
					formAddError(input);
					error++;
				}
			} else if (input.getAttribute("type") === "checkbox" && input.checked === false) {
				formAddError(input);
				error++;
			}
			else {
				if (input.value === '') {
					formAddError(input);
					error++;
				}
			}
		}
		return error;
	}

	function formAddError(input) {
		input.parentElement.classList.add('_error');
		input.classList.add('_error');
	}
	function formRemoveError(input) {
		input.parentElement.classList.remove('_error');
		input.classList.remove('_error');
	}
	function emailTest(input) {
		return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
	}

	@@include('_popups.js');
});