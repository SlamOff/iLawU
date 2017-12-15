"use strict";

$(document).ready(function () {
	//placeholder
	$("input, textarea").focus(function () {
		$(this).data("placeholder", $(this).attr("placeholder")), $(this).attr("placeholder", "");
	}), $("input, textarea").blur(function () {
		$(this).attr("placeholder", $(this).data("placeholder"));
	});

	// Юридичн послуги
	$('.divided .service_hover_item').click(function (e) {
		$('.divided .service_hover_item').find('.close_service').hide();
		if (!e.target.classList.contains('close_service') && !e.target.parentNode.classList.contains('close_service')) {
			$('.service__addition').slideDown();
			$(this).find('.close_service').show();
			if ($('.service__addition').is(':visible')) {
				$('.divided .service_hover').css('opacity', 1);
				$('.divided .service_hover_item').css({
					'backgroundColor': '#d7d7d7',
					'color': '#20233a'
				});
				this.style.backgroundColor = '#20233a';
				this.style.color = '#fff';
			} else {
				// ??
			}
		} else {
			$('.service__addition').slideUp();
			//$('.divided .service_hover').hide();
		}
		// для кнопки
		var button = $(this).attr('data-content');
		$('.service__addition__footer .main_btn').attr('data-content', button);
	});

	// Переваги слайдер
	$('.advantage__slider').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		prevArrow: '.prev_adv',
		nextArrow: '.next_adv',
		swipe: false,
		responsive: [{
			breakpoint: 992,
			settings: {}
		}]
	});

	// menu btn
	$('.main__menu_btn').click(function () {
		$('.sandwich').toggleClass('active');
		$('.nav_rolled').toggleClass('rolled');
		$('.main__search').toggleClass('translated');
	});

	// lang
	$('.change_lang').click(function () {
		$(this).find('span:first').siblings().toggleClass('shown');
		this.classList.toggle('rotated');
	});
	// popup
	// function togglePopup(){

	// }
	var popupWrapperConsult = $('.popup_wrapper_consult'),
	    popupWrapperBuy = $('.popup_wrapper_buy'),
	    popupWrapperFeedback = $('.popup_wrapper_feedback'),
	    popupWrapper = $('.popup_wrapper');
	var popupForm = document.getElementsByClassName('popup_form')[0];

	$('.popup_service').click(function (e) {
		e.preventDefault();
		popupWrapperConsult.addClass('opened');
		popupForm.dataset.form = whatForm;
		var whatForm = this.dataset.form;
	});
	$('.popup_feedback').click(function (e) {
		e.preventDefault();
		popupWrapperFeedback.addClass('opened');
		popupForm.dataset.form = whatForm;
		var whatForm = this.dataset.form;
	});

	$('.popup_buy').click(function (e) {
		e.preventDefault();
		popupWrapperBuy.addClass('opened');
		popupForm.dataset.form = whatForm;
		var whatForm = this.dataset.form;
	});

	$('.btn_close').click(function () {
		popupWrapper.removeClass('opened');
	});
	popupWrapperConsult.click(function (e) {
		if (e.target == this) {
			this.classList.remove('opened');
		}
	});

	// copyright year
	var mdate = new Date();
	$('.footer__logo span').text(mdate.getFullYear());

	// mobile
	if ($(window).width() < 576) {
		$('.arrow').click(function () {
			var btn = $(this).parent().siblings('.service_hover').find('a');
			var wrap = $(this).parent().siblings('.wrap_accordion').find('p');
			var divided = $(this).parent().siblings('.service_hover').find('.service_hover_item');
			wrap.after(btn);
			var wrapDev = $(this).parent().siblings('.wrap_accordion').find('p');
			var item = $(this).parent().siblings('.service_hover');
			this.classList.toggle('rotated');
			$('.wrap_accordion').not(this).slideUp();
			if ($(this).parent().siblings('.wrap_accordion').is(':hidden')) {
				$(this).parent().siblings('.wrap_accordion').slideToggle();
			}
			if ($(this).parent().siblings('.service_hover').find('.service_hover_item').hasClass('service_hover_person')) {
				wrapDev.after(item);
				$(this).parent().siblings('.wrap_accordion').find('.service_hover').toggleClass('service_shown');
			}
		});
	}
	// contact form popup
	$('.contact__popup').click(function (e) {
		e.preventDefault();
		$('.contact__item--form').find('button').removeClass('blue_btn');
		$('.contact__item--form').fadeIn();
	});
	$('.contact__item--form').find('.btn_close').click(function () {
		$(this).parent().fadeOut();
	});
});