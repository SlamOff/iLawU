$(window).on('load', function() {
	var hash = window.location.hash.split('#')[1];
	if(hash != undefined){
		var el = '#' + hash;
		$(el).find('.hidden_text').slideDown();
		$(el).find('.arrow').addClass('rotated');
	}
});

$(document).ready(function() {
    new WOW().init();

    //placeholder
    $("input, textarea").focus(function() {
        $(this).data("placeholder", $(this).attr("placeholder")),
        $(this).attr("placeholder", "")
    }),
    $("input, textarea").blur(function() {
        $(this).attr("placeholder", $(this).data("placeholder"))
    });

    // search opacity
    $('input[type="search"]').focus(function(){
        this.style.borderBottom = '1px solid rgba(255,255,255,1)';
        $(this).siblings('i').css('opacity', '1');
    });
    $('input[type="search"]').blur(function(){
        this.style.borderBottom = '1px solid rgba(255,255,255,.5)';
        $(this).siblings('i').css('opacity', '.5');
    });

    // phone mask
    jQuery(function($){
        $('.phone').mask('+38(099) 999-9999');
    });
    // scroll to
    $('.scroll_down').click( function(e){
        e.preventDefault();
        var scrollEl = $(this).attr('href');
        if ($(scrollEl).length != 0) {
            $('html, body').animate({ scrollTop: $(scrollEl).offset().top }, 700);
        }
        return false;
    });
    $('.scroll_down_main').click( function(e){
        e.preventDefault();
        var scrollEl = $(this).attr('href');
        if ($(scrollEl).length != 0) {
            $('html, body').animate({ scrollTop: $(scrollEl).offset().top }, 700);
        }
        return false;
    });
    // nav
    var prevY = 0;
    var moveTop = false;
    window.onscroll = function(){
        var scrolled = window.pageYOffset || document.documentElement.scrollTop,
            header = document.querySelector('.main__nav');
        if(prevY > scrolled){
            moveTop = true;
        }
        else{
            moveTop = false;
        }
        if (scrolled > 1 && $(window).width() > 768 && moveTop == false){
            $(header).addClass('main__nav--scrolled');
            $('.nav_rolled').removeClass('rolled');
            $('.sandwich').removeClass('active');
        }
        else if(scrolled <= 1 && $(window).width() > 768 || moveTop == true) {
            $(header).removeClass('main__nav--scrolled');
        }
        prevY = scrolled;
    };
    // Юридичнi послуги
    $('.divided .service_hover_item').click(function(e){
        $('.divided .service_hover_item').find('.close_service').hide();
        if(!e.target.classList.contains('close_service') && !e.target.parentNode.classList.contains('close_service')){
            $('.service__addition').slideDown();
            if($(this).attr('data-content') == 'person_service'){
                $('.service__addition_legal').hide();
                $('.service__addition_person').show();
            }
            else {
                $('.service__addition_person').hide();
                $('.service__addition_legal').show();
            }

            $(this).find('.close_service').show();
            if($('.service__addition').is(':visible')){
                $('.divided .service_hover').css('opacity', 1);
                $('.divided .service_hover_item').css({
                    'backgroundColor':'#d7d7d7',
                    'color':'#20233a'
                });
                this.style.backgroundColor = '#20233a';
                this.style.color = '#fff';
            }
        }
        else{
            $('.service__addition').slideUp();
        }
        // для кнопки
        var button = $(this).attr('data-content');
        $('.service__addition__footer .main_btn').attr('data-content', button);
    });
    $('.close_service').click(function(){
        $('.divided .service_hover').css('opacity', 0);
            $('.divided .service_hover, .service__addition').hover(function(){
            //this.style.opacity = '1';
            $('.divided .service_hover').css('opacity', '1');
        },
        function(){
            //this.style.opacity = '0';
            $('.divided .service_hover').css('opacity', '0');
        });
    });

    // Переваги слайдер
    $('.advantage__slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: '.prev_adv',
        nextArrow: '.next_adv',
        speed: 1000,
        lazyLoad: 'ondemand',
        swipe: false,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    
                }
            }
        ]
    });

    // menu btn
    $('.main__menu_btn').click(function(){
        $('.sandwich').toggleClass('active');
        $('.nav_rolled').toggleClass('rolled');
        $('.main__search').toggleClass('translated');
    });

    // lang
    $('.change_lang').click(function(){
        $(this).find('span:first').siblings().toggleClass('shown');
            this.classList.toggle('rotated');
            $('.change_lang span').click(function(){
            var select = $('.select_lang');
            var selected = $('.selected_lang');
            var langText = this.textContent;
            console.log(langText);
            if(langText == 'Рус'){
                select.text('Укр');
                selected.text('Рус');
            }
            else{
                selected.text('Укр');
                select.text('Рус');
            }
        });
    });

    function offScroll(){
        var winScrollTop = $(window).scrollTop();
            $(window).bind('scroll',function () {
            $(window).scrollTop(winScrollTop);
        });
    }
    // popup
    var popupWrapperConsult = $('.popup_wrapper_consult'),
        popupWrapperBuy = $('.popup_wrapper_buy'),
        popupWrapperFeedback = $('.popup_wrapper_feedback'),
        popupWrapper = $('.popup_wrapper');
    var popupForm = document.getElementsByClassName('popup_form')[0];
    

    $('.popup_service').click(function(e) {
        e.preventDefault();
        popupWrapperConsult.addClass('opened');
        popupForm.dataset.form = whatForm;
        var whatForm =  this.dataset.form;
        offScroll();
    });
    $('.popup_feedback').click(function(e) {
        e.preventDefault();
        popupWrapperFeedback.addClass('opened');
        popupForm.dataset.form = whatForm;
        var whatForm =  this.dataset.form;
        offScroll();
    });

    $('.popup_buy').click(function(e) {
        e.preventDefault();
        popupWrapperBuy.addClass('opened');
        popupForm.dataset.form = whatForm;
        var whatForm =  this.dataset.form;
        offScroll();
    });

    $('.btn_close').click(function() {
        popupWrapper.removeClass('opened');
        $(window).unbind('scroll');
    });
    popupWrapper.click(function(e) {
        if(e.target == this){
            this.classList.remove('opened');
            $(window).unbind('scroll');
        }
    });

    // copyright year
    var mdate = new Date();
    $('.footer__logo span').text(mdate.getFullYear());

    // mobile
    if($(window).width() < 576){
        $('.arrow').click(function(){
            var btn = $(this).parent().siblings('.service_hover').find('a');
            var wrap = $(this).parent().siblings('.wrap_accordion').find('p');
            var divided = $(this).parent().siblings('.service_hover').find('.service_hover_item');
            wrap.after(btn);
            var wrapDev = $(this).parent().siblings('.wrap_accordion').find('p');
            var item = $(this).parent().siblings('.service_hover');
            this.classList.toggle('rotated');
            $('.wrap_accordion').not(this).slideUp();
            if($(this).parent().siblings('.wrap_accordion').is(':hidden')){
                $(this).parent().siblings('.wrap_accordion').slideToggle();
            }
            if($(this).parent().siblings('.service_hover').find('.service_hover_item').hasClass('service_hover_person')){
                wrapDev.after(item);
                $(this).parent().siblings('.wrap_accordion').find('.service_hover').toggleClass('service_shown');
            }
        });
        $('.divided').appendTo($('.service__content .row:last'));
    }
    if($(window).width() < 767){
        $('.main__menu_btn').click(function(){
            if($('.nav_rolled').hasClass('rolled')){
                $('.main__search').show();
                $('.main__lang').show();
            }
            else {
                $('.main__search').hide();
                $('.main__lang').hide();
            }
        });
        
    }
    
    //accordion service_page
    $('.service_add__content__item h4').click(function(){
        var arrow = $(this).find('.arrow');
        $('.service_add__content__item h4 .arrow').removeClass('rotated');
        arrow.addClass('rotated');
        $('.service_add__content__item .hidden_text').slideUp();
        if($(this).siblings('.hidden_text').is(':hidden')){
            $(this).siblings('.hidden_text').slideDown();
        }
        else {
            arrow.removeClass('rotated');
        }
    });

    // contact form popup
    $('.contact__popup').click(function(e){
        e.preventDefault();
        $('.contact__item--form').find('button').removeClass('blue_btn');
        $('.contact__item--form').fadeIn();
        offScroll();
    });
    $('.contact__item--form').find('.btn_close').click(function(){
        $(this).parent().fadeOut();
        $(window).unbind('scroll');
    });
    var locationURL = window.location.pathname;
    if ( locationURL == "/ua" ) {
        var validationName = "Обов'язкого для заповнення";
        var validationNameMax = "Від 2 до 16 літер";
        var validationPhone = "Невірний формат номеру";
        var validationEmail = "Введите вірний E-mail";
    }
    else {
        var validationName = "Обязательно для заполнения";
        var validationNameMax = "От 2 до 16 букв";
        var validationPhone = "Неправильный формат номера";
        var validationEmail = "Введите корректный E-mail";
    }
    $('#contactForm').validate({
        errorElement: 'span',
        focusInvalid: false,
        rules: {
            name: {
                required: true,
                minlength: 2,
                maxlength: 16
            },
            phone: {
                required: true,
                digits: true
            },
            email: {
                required: true,
                email: true
            },
            message: {
                required: true
            }
        },
        messages: {
            name: {
                required: validationName,
                minlength: validationNameMax,
                maxlength: validationNameMax
            },
            email: {
                required: validationName,
                email: validationEmail
            },
            phone: {
                required: validationName,
                digits: validationPhone
            },
            message: {
                required: validationName
            }
        },
        invalidHandler: function(e, v){
            for (var i = 0; i < v.errorList.length; i++){
                v.errorList[i].element.onclick = function(){
                    this.nextSibling.classList.add('clicked');
                }
            };
            this.onsubmit = function(){
                for(var j = 0; j < v.errorList.length; j++){
                    $(this).find('span.error').removeClass('clicked');
                }
            }
        }
    });
    $('#formPopup1').validate({
        errorElement: 'span',
        focusInvalid: false,
        rules: {
            name: {
                required: true,
                minlength: 2,
                maxlength: 16
            },
            phone: {
                required: true,
                digits: true
            },
            email: {
                required: true,
                email: true
            },
            message: {
                required: true
            }
        },
        messages: {
            name: {
                required: validationName,
                minlength: validationNameMax,
                maxlength: validationNameMax
            },
            email: {
                required: validationName,
                email: validationEmail
            },
            phone: {
                required: validationName,
                digits: validationPhone
            },
            message: {
                required: validationName
            }
        },
        invalidHandler: function(e, v){
            for (var i = 0; i < v.errorList.length; i++){
                v.errorList[i].element.onclick = function(){
                    this.nextSibling.classList.add('clicked');
                }
            };
            this.onsubmit = function(){
                for(var j = 0; j < v.errorList.length; j++){
                    $(this).find('span.error').removeClass('clicked');
                }
            }
        }
    });
    $('#formPopup2').validate({
        errorElement: 'span',
        focusInvalid: false,
        rules: {
            name: {
                required: true,
                minlength: 2,
                maxlength: 16
            },
            phone: {
                required: true,
                digits: true
            },
            email: {
                required: true,
                email: true
            },
            message: {
                required: true
            }
        },
        messages: {
            name: {
                required: validationName,
                minlength: validationNameMax,
                maxlength: validationNameMax
            },
            email: {
                required: validationName,
                email: validationEmail
            },
            phone: {
                required: validationName,
                digits: validationPhone
            },
            message: {
                required: validationName
            }
        },
        invalidHandler: function(e, v){
            for (var i = 0; i < v.errorList.length; i++){
                v.errorList[i].element.onclick = function(){
                    this.nextSibling.classList.add('clicked');
                }
            };
            this.onsubmit = function(){
                for(var j = 0; j < v.errorList.length; j++){
                    $(this).find('span.error').removeClass('clicked');
                }
            }
        }
    });
    $('#formPopup3').validate({
        errorElement: 'span',
        focusInvalid: false,
        rules: {
            name: {
                required: true,
                minlength: 2,
                maxlength: 16
            },
            phone: {
                required: true,
                digits: true
            },
            email: {
                required: true,
                email: true
            },
            message: {
                required: true
            }
        },
        messages: {
            name: {
                required: validationName,
                minlength: validationNameMax,
                maxlength: validationNameMax
            },
            email: {
                required: validationName,
                email: validationEmail
            },
            phone: {
                required: validationName,
                digits: validationPhone
            },
            message: {
                required: validationName
            }
        },
        invalidHandler: function(e, v){
            for (var i = 0; i < v.errorList.length; i++){
                v.errorList[i].element.onclick = function(){
                    this.nextSibling.classList.add('clicked');
                }
            };
            this.onsubmit = function(){
                for(var j = 0; j < v.errorList.length; j++){
                    $(this).find('span.error').removeClass('clicked');
                }
            }
        }
    });
    
    $('#contactFormPage').validate({
        errorElement: 'span',
        focusInvalid: false,
        rules: {
            name: {
                required: true,
                minlength: 2,
                maxlength: 16
            },
            phone: {
                required: true,
                digits: true
            },
            email: {
                required: true,
                email: true
            },
            message: {
                required: true
            }
        },
        messages: {
            name: {
                required: validationName,
                minlength: validationNameMax,
                maxlength: validationNameMax
            },
            email: {
                required: validationName,
                email: validationEmail
            },
            phone: {
                required: validationName,
                digits: validationPhone
            },
            message: {
                required: validationName
            }
        },
        invalidHandler: function(e, v){
            for (var i = 0; i < v.errorList.length; i++){
                v.errorList[i].element.onclick = function(){
                    this.nextSibling.classList.add('clicked');
                }
            };
            this.onsubmit = function(){
                for(var j = 0; j < v.errorList.length; j++){
                    $(this).find('span.error').removeClass('clicked');
                }
            }
        }
    });
    $('#callForm').validate({
        errorElement: 'span',
        focusInvalid: false,
        rules: {
            name: {
                required: true,
                minlength: 2,
                maxlength: 16
            },
            phone: {
                required: true,
                digits: true
            },
            email: {
                required: true,
                email: true
            },
            message: {
                required: true
            }
        },
        messages: {
            name: {
                required: validationName,
                minlength: validationNameMax,
                maxlength: validationNameMax
            },
            email: {
                required: validationName,
                email: validationEmail
            },
            phone: {
                required: validationName,
                digits: validationPhone
            },
            message: {
                required: validationName
            }
        },
        invalidHandler: function(e, v){
            for (var i = 0; i < v.errorList.length; i++){
                v.errorList[i].element.onclick = function(){
                    this.nextSibling.classList.add('clicked');
                }
            };
            this.onsubmit = function(){
                for(var j = 0; j < v.errorList.length; j++){
                    $(this).find('span.error').removeClass('clicked');
                }
            }
        }
    });
    $('#orderForm').validate({
        errorElement: 'span',
        focusInvalid: false,
        rules: {
            name: {
                required: true,
                minlength: 2,
                maxlength: 16
            },
            phone: {
                required: true,
                digits: true
            },
            email: {
                required: true,
                email: true
            },
            message: {
                required: true
            },
            address: {
                required: true
            }
        },
        messages: {
            name: {
                required: validationName,
                minlength: validationNameMax,
                maxlength: validationNameMax
            },
            email: {
                required: validationName,
                email: validationEmail
            },
            phone: {
                required: validationName,
                digits: validationPhone
            },
            message: {
                required: validationName
            },
            address: {
                required: validationName
            }
        },
        invalidHandler: function(e, v){
            for (var i = 0; i < v.errorList.length; i++){
                v.errorList[i].element.onclick = function(){
                    this.nextSibling.classList.add('clicked');
                }
            };
            this.onsubmit = function(){
                for(var j = 0; j < v.errorList.length; j++){
                    $(this).find('span.error').removeClass('clicked');
                }
            }
        }
    });
    $('.btn_close').click(function() {
        popupWrapper.removeClass('opened');
        $(window).unbind('scroll');
        $('#formPopup3').validate().resetForm();
    });
    popupWrapper.click(function(e) {
        if(e.target == this){
            this.classList.remove('opened');
            $(window).unbind('scroll');
            $('#formPopup3').validate().resetForm();
        }
    });
    // $('form').submit(function(event) {
    //  event.preventDefault();
    //  var data = $(event.target).serialize();
    //  var action = $(event.target).attr('action');
    //  $.ajax({
    //      url: action,
    //      type: 'POST',
    //      data: data,
    //      dataType: 'json',
    //      success: function (data) {
    //          alert(data['answer']);
    //      },
    //      error: function (result) {
    //          alert('error');
    //      }
    //  });
    // });
});