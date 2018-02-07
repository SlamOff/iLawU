'use strict';

$(window).on('load', function () {
    var hash = window.location.hash.split('#')[1];
    if (hash != undefined) {
        var elem = '#' + hash;
        $(elem).find('.hidden_text').slideDown();
        $(elem).find('.arrow').addClass('rotated');
        $('html, body').animate({ scrollTop: $(elem).offset().top }, 700);
    }
});

$(document).ready(function () {
    new WOW().init();
    //placeholder
    $("input, textarea").focus(function () {
        $(this).data("placeholder", $(this).attr("placeholder")), $(this).attr("placeholder", "");
    }), $("input, textarea").blur(function () {
        $(this).attr("placeholder", $(this).data("placeholder"));
    });

    // search opacity
    $('input[type="search"]').focus(function () {
        this.style.borderBottom = '1px solid rgba(255,255,255,1)';
        $(this).siblings('i').css('opacity', '1');
    });
    $('input[type="search"]').blur(function () {
        this.style.borderBottom = '1px solid rgba(255,255,255,.5)';
        $(this).siblings('i').css('opacity', '.5');
    });

    //phone mask
    jQuery(function ($) {
        $('.phone').mask('+38(0ss) sss-ssss');
    });

    // scroll to
    $('.scroll_down').click(function (e) {
        e.preventDefault();
        var scrollEl = $(this).attr('href');
        if ($(scrollEl).length != 0) {
            $('html, body').animate({ scrollTop: $(scrollEl).offset().top }, 700);
        }
        return false;
    });
    $('.scroll_down_main').click(function (e) {
        e.preventDefault();
        var scrollEl = $(this).attr('href');
        if ($(scrollEl).length != 0) {
            $('html, body').animate({ scrollTop: $(scrollEl).offset().top }, 700);
        }
        return false;
    });
    $('.subcat__content__item').click(function () {
        $('.subcat__content__item').removeClass('active');
        $(this).addClass('active');
    });
    // Юридичнi послуги
    $('.divided .service_hover_item').click(function (e) {
        $('.divided .service_hover_item').find('.close_service').hide();
        if (!e.target.classList.contains('close_service') && !e.target.parentNode.classList.contains('close_service')) {
            $('.service__addition').slideDown();
            if ($(this).attr('data-content') == 'person_service') {
                $('.service__addition_legal').hide();
                $('.service__addition_person').show();
            } else {
                $('.service__addition_person').hide();
                $('.service__addition_legal').show();
            }

            $(this).find('.close_service').show();
            if ($('.service__addition').is(':visible')) {
                $('.divided .service_hover').css('opacity', 1);
                $('.divided .service_hover_item').css({
                    'backgroundColor': '#d7d7d7',
                    'color': '#20233a'
                });
                this.style.backgroundColor = '#20233a';
                this.style.color = '#fff';
            }
        } else {
            $('.service__addition').slideUp();
        }
        // для кнопки
        var button = $(this).attr('data-content');
        $('.service__addition__footer .main_btn').attr('data-content', button);
    });
    if ($(window).width() > 576) {
        $('.close_service').click(function () {
            $('.divided .service_hover').css('opacity', 0);
            $('.divided .service_hover, .service__addition').hover(function () {
                //this.style.opacity = '1';
                $('.divided .service_hover').css('opacity', '1');
            }, function () {
                $('.divided .service_hover').css('opacity', '0');
            });
        });
    }
    // Переваги слайдер
    $('.advantage__slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: '.prev_adv',
        nextArrow: '.next_adv',
        speed: 1000,
        lazyLoad: 'ondemand',
        autoplay: true,
        autoplaySpeed: 2000,
        dots: true,
        swipe: false,
        responsive: [{
            breakpoint: 992,
            settings: {
                dots: false
            }
        }]
    });
    $('.viewed__slider').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        prevArrow: '.viewed_prev',
        nextArrow: '.viewed_next',
        //lazyLoad: 'ondemand',
        //autoplay: true,
        //autoplaySpeed: 2000,
        swipe: false,
        responsive: [{
            breakpoint: 992,
            settings: {
                slidesToShow: 3
            }
        }, {
            breakpoint: 768,
            settings: {
                slidesToShow: 2
            }
        }, {
            breakpoint: 576,
            settings: {
                slidesToShow: 1
            }
        }]
    });
    var views = document.querySelectorAll('.viewed .viewed__item');
    views.length != 0 ? $('.viewed').show() : $('.viewed').hide();
    $('.cat__item').click(function () {
        $('.subcat').slideDown();
        $('.result').slideDown();
    });
    // menu btn
    $('.main__menu_btn').click(function () {
        $('.sandwich').toggleClass('active');
        $('.nav_rolled').toggleClass('rolled');
        $('.main__search').toggleClass('translated');
    });

    // search 
    $('.search_page .main').on('click', function (e) {
        var value = $('.search_request').text() + ' ';
        var inputWrap = $('.main__edit_search');
        var input = inputWrap.find('input[type="search"]');
        input.focus();
        if ($(e.target).hasClass('main__text') || $(e.target).hasClass('search_request') || e.target.hasAttribute('type')) {
            inputWrap.addClass('shown');
        } else {
            inputWrap.removeClass('shown');
        }
    });
    // search filter
    $('.search_filter__content__item').click(function () {
        $('.search_filter__content__item').removeClass('active');
        $(this).addClass('active');
    });

    // lang
    $('.change_lang').click(function () {
        $(this).find('span:first').siblings().toggleClass('shown');
        this.classList.toggle('rotated');
        $('.change_lang span').click(function () {
            var select = $('.select_lang');
            var selected = $('.selected_lang');
            var langText = this.textContent;
            if (langText == 'Рус') {
                select.text('Укр');
                selected.text('Рус');
            } else {
                selected.text('Укр');
                select.text('Рус');
            }
        });
    });
    $('.change_lang a').click(function (e) {
        if (!$('.change_lang').hasClass('rotated')) {
            e.preventDefault();
        }
    });
    var popupWrapperConsult = $('.popup_wrapper_consult'),
        popupWrapperBuy = $('.popup_wrapper_buy'),
        popupWrapperShow = $('.popup_wrapper_show'),
        popupWrapperFeedback = $('.popup_wrapper_feedback'),
        popupWrapper = $('.popup_wrapper'),
        popupPay = $('.popup_wrapper_pay');
    var popupForm = document.getElementsByClassName('popup_form')[0];

    $('.popup_service').click(function (e) {
        e.preventDefault();
        var text = $(this).parent().siblings('h4').text();
        var textData = $('.service__content .row_agency .divided h4').text();
        var textDataFor;
        popupWrapperConsult.addClass('opened');
        popupForm.dataset.form = whatForm;
        var whatForm = this.dataset.form;
        $('body').addClass('no_scroll');
        if (this.hasAttribute('data-content')) {
            if (this.dataset.content == 'person_service') {
                textDataFor = $('.service__content .row_agency .divided .service_hover_person .sub span').text();
            } else if (this.dataset.content == 'legal_service') {
                textDataFor = $('.service__content .row_agency .divided .service_hover_legal .sub span').text();
            }
            popupWrapperConsult.find('h4').text(textData + ' ' + textDataFor.toLowerCase());
        } else {
            popupWrapperConsult.find('h4').text(text);
        }
    });
    $('.show_map').click(function (e) {
        e.preventDefault();
        popupWrapperFeedback.addClass('opened');
        $('body').addClass('no_scroll');
    });

    $('.popup_buy').click(function (e) {
        e.preventDefault();
        //$(e.target).parent('.result__item__action').css('color', 'red');

        var target = e.target;
        var targetParent = $(target).closest('.result__item__action')[0];
        var finalTarget = $(targetParent).siblings('h4');
        var text = finalTarget.text();
        //console.log(text);
        //$(e.target)[0].parent('.result__item__action').css('color', 'red');
        popupWrapperBuy.addClass('opened');
        //var text = $(this).parent().siblings('h4').text();
        console.log(text);
        popupWrapperBuy.find('h4').text(text);

        //offScroll();
        //$('body').css('overflow', 'hidden');
        $('body').addClass('no_scroll');
    });
    $('.popup_show').click(function (e) {
        e.preventDefault();
        //$(e.target).parent('.result__item__action').css('color', 'red');

        // var target = e.target;
        // var targetParent = $(target).closest('.result__item__action')[0];
        // var finalTarget = $(targetParent).siblings('h4');
        // var text = finalTarget.text();
        //console.log(text);
        //$(e.target)[0].parent('.result__item__action').css('color', 'red');
        popupWrapperShow.addClass('opened');
        //var text = $(this).parent().siblings('h4').text();
        console.log(text);
        //popupWrapperBuy.find('h4').text(text);

        //offScroll();
        //$('body').css('overflow', 'hidden');
        $('body').addClass('no_scroll');
    });

    $('.btn_close').click(function () {
        popupWrapper.removeClass('opened');
        //$(window).unbind('scroll');
        $('body').removeClass('no_scroll');
        //$('body').css('overflow', 'visible');
    });
    popupWrapper.click(function (e) {
        if (e.target == this) {
            this.classList.remove('opened');
            //$(window).unbind('scroll');
            $('body').removeClass('no_scroll');
            //$('body').css('overflow', 'visible');
        }
    });
    // checkbox
    var checkBox = $('.reg').find('#checkbox input');
    $('body').find('#checkbox').click(function () {
        if (checkBox.is(':checked')) {
            $(this).find('.mask').css('background-image', 'url(img/tick.png)');
        } else {
            $(this).find('.mask').css('background-image', 'none');
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
        $('.divided').appendTo($('.service__content .row:last'));
    }
    if ($(window).width() < 767) {
        $('.main__menu_btn').click(function () {
            if ($('.nav_rolled').hasClass('rolled')) {
                $('.main__search').show();
                $('.main__lang').show();
            } else {
                $('.main__search').hide();
                $('.main__lang').hide();
            }
        });
    }

    //accordion service_page
    $('.service_add__content__item h4').click(function () {

        var heightEl = parseInt(getComputedStyle(this.parentElement).height);
        var arrow = $(this).find('.arrow');
        $('.service_add__content__item h4 .arrow').addClass('rotated');
        arrow.addClass('rotated');
        $('.service_add__content__item .hidden_text').slideUp();
        if ($(this).siblings('.hidden_text').is(':hidden')) {
            $(this).siblings('.hidden_text').slideDown();
        } else {
            arrow.removeClass('rotated');
        }
        var prevHeight = null;
        if (this.parentElement.previousElementSibling) {
            prevHeight = parseInt(getComputedStyle(this.parentElement.previousElementSibling).height);
        }
        var scrollEl = $(this).parent();
        if (prevHeight < 128 || prevHeight == null) {
            console.log('if');
            $('html, body').animate({
                scrollTop: scrollEl.offset().top
            }, 400);
        } else {
            $('html, body').animate({
                scrollTop: scrollEl.offset().top - prevHeight + 127
            }, 400);
        }
        // window.onscroll = function(){
        //     if (scrolled > 1 && $(window).width() > 768 && moveTop == false){
        //         $(header).addClass('main__nav--scrolled');
        //         $('.nav_rolled').removeClass('rolled');
        //         $('.sandwich').removeClass('active');
        //     }
        //     else if(scrolled <= 1 && $(window).width() > 768 || moveTop == true) {
        //         $(header).removeClass('main__nav--scrolled');
        //     }
        //     $('.service_add__content__item h4').click(function(){
        //         $(header).addClass('main__nav--scrolled');
        //         $('.nav_rolled').removeClass('rolled');
        //         $('.sandwich').removeClass('active');
        //     });
        // };
    });

    // header scroll
    var prevY = 0;
    var moveTop = false;
    window.onscroll = function () {
        var scrolled = window.pageYOffset || document.documentElement.scrollTop,
            header = document.querySelector('.main__nav');
        if (prevY > scrolled) {
            moveTop = true;
        } else {
            moveTop = false;
        }
        if (scrolled > 1 && $(window).width() > 768 && moveTop == false) {
            $(header).addClass('main__nav--scrolled');
            $('.nav_rolled').removeClass('rolled');
            $('.sandwich').removeClass('active');
        } else if (scrolled <= 1 && $(window).width() > 768 || moveTop == true) {
            $(header).removeClass('main__nav--scrolled');
        }
        prevY = scrolled;
        $('.service_add__content__item h4').click(function () {
            $(header).addClass('main__nav--scrolled');
            $('.nav_rolled').removeClass('rolled');
            $('.sandwich').removeClass('active');
        });
    };
    //accordion search_page
    $('.search_page .search_list__item h4').click(function () {
        var arrow = $(this).find('.arrow');
        $('.search_page .search_list__item h4 .arrow').removeClass('rotated');
        arrow.addClass('rotated');
        $('.search_page .search_list__item .search_list__item__content').slideUp();
        if ($(this).siblings('.search_list__item__content').is(':hidden')) {
            $(this).siblings('.search_list__item__content').slideDown();
        } else {
            arrow.removeClass('rotated');
        }
    });

    // contact form popup
    $('.contact__popup').click(function (e) {
        e.preventDefault();
        //current = getCurrentScroll();
        // $('.contact__item--form').find('.btn_close').click(function(e){
        //     e.preventDefault();
        // });
        e.preventDefault();
        $('.contact__item--form').find('button').removeClass('blue_btn');
        $('.contact__item--form').fadeIn();
        $('body').addClass('no_scroll');
    });
    $('.contact__item--form').find('.btn_close').click(function () {
        $(this).parent().fadeOut();
        $('body').removeClass('no_scroll');
    });
    var locationURL = document.documentElement.getAttribute('lang');
    if (locationURL == "ua") {
        var validationName = "Обов'язково для заповнення";
        var validationPass = 'Мінімум 6 символів';
        var validationRepass = 'Паролі не співпадають';
        var validationNameMax = "Від 2 до 16 літер";
        var validationPhone = "Невірний формат номеру";
        var validationEmail = "Введите вірний E-mail";
    } else {
        var validationName = "Обязательно для заполнения";
        var validationNameMax = "От 2 до 16 букв";
        var validationPass = 'Минимум 6 символов';
        var validationRepass = 'Пароли не совпадают';
        var validationPhone = "Неправильный формат номера";
        var validationEmail = "Введите корректный E-mail";
    }
    $('.service .main_btn').click(function () {
        var action = $(this).attr('href');
        $('form#formPopup1').attr('action', action);
    });
    $('.service_add .main_btn').click(function () {
        var action = $(this).attr('href');
        $('form#formPopup3').attr('action', action);
    });
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
                required: true
                //digits: true
            },
            email: {
                required: true,
                email: true
            },
            message: {
                // required: true
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
                required: validationName
                // digits: validationPhone
            },
            message: {
                required: validationName
            }
        },
        invalidHandler: function invalidHandler(e, v) {
            for (var i = 0; i < v.errorList.length; i++) {
                v.errorList[i].element.onclick = function () {
                    this.nextSibling.classList.add('clicked');
                };
            };
            this.onsubmit = function () {
                for (var j = 0; j < v.errorList.length; j++) {
                    $(this).find('span.error').removeClass('clicked');
                }
            };
        },
        submitHandler: function submitHandler(form) {
            $.ajax({
                url: form.action,
                type: 'POST',
                data: $(form).serialize(),
                dataType: 'json',
                success: function success(data) {
                    $('.popup_wrapper').removeClass('opened');
                    $('body').removeClass('no_scroll');
                    $('#contactForm')[0].reset();
                    alert(data['answer']);
                },
                error: function error(result) {
                    alert('error');
                }
            });
            console.log(form);
            return false;
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
                required: true
                // digits: true
            },
            email: {
                //required: true,
                email: true
            },
            message: {
                // required: true
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
                required: validationName
                // digits: validationPhone
            },
            message: {
                required: validationName
            }
        },
        invalidHandler: function invalidHandler(e, v) {
            for (var i = 0; i < v.errorList.length; i++) {
                v.errorList[i].element.onclick = function () {
                    this.nextSibling.classList.add('clicked');
                };
            };
            this.onsubmit = function () {
                for (var j = 0; j < v.errorList.length; j++) {
                    $(this).find('span.error').removeClass('clicked');
                }
            };
        },
        submitHandler: function submitHandler(form) {
            $.ajax({
                url: form.action,
                type: 'POST',
                data: $(form).serialize(),
                dataType: 'json',
                success: function success(data) {
                    $('.popup_wrapper').removeClass('opened');
                    $('body').removeClass('no_scroll');
                    $('#formPopup1')[0].reset();
                    alert(data['answer']);
                },
                error: function error(result) {
                    alert('error');
                }
            });
            console.log(form);
            return false;
        }
    });
    $('#formBuy').validate({
        errorElement: 'span',
        focusInvalid: false,
        rules: {
            email: {
                required: true,
                email: true
            }
        },
        messages: {
            email: {
                required: validationName,
                email: validationEmail
            }
        },
        invalidHandler: function invalidHandler(e, v) {
            for (var i = 0; i < v.errorList.length; i++) {
                v.errorList[i].element.onclick = function () {
                    this.nextSibling.classList.add('clicked');
                };
            };
            this.onsubmit = function () {
                for (var j = 0; j < v.errorList.length; j++) {
                    $(this).find('span.error').removeClass('clicked');
                }
            };
        },
        submitHandler: function submitHandler(form) {
            $.ajax({
                url: form.action,
                type: 'POST',
                data: $(form).serialize(),
                dataType: 'json',
                success: function success(data) {
                    $('.popup_wrapper').removeClass('opened');
                    $('body').removeClass('no_scroll');
                    $('#formPopup1')[0].reset();
                    alert(data['answer']);
                },
                error: function error(result) {
                    alert('error');
                }
            });
            console.log(form);
            return false;
        }
    });
    $('#regForm').validate({
        errorElement: 'span',
        focusInvalid: false,
        rules: {
            name: {
                required: true,
                minlength: 2,
                maxlength: 16
            },
            password: {
                required: true,
                minlength: 6
            },
            repassword: {
                required: true,
                equalTo: "#password"
            },
            email: {
                required: true,
                email: true
            },
            checkbox: {
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
            password: {
                required: validationName,
                minlength: validationPass
            },
            repassword: {
                required: validationName,
                equalTo: validationRepass
            }
        },
        invalidHandler: function invalidHandler(e, v) {
            for (var i = 0; i < v.errorList.length; i++) {
                v.errorList[i].element.onclick = function () {
                    this.nextSibling.classList.add('clicked');
                };
            };
            this.onsubmit = function () {
                for (var j = 0; j < v.errorList.length; j++) {
                    $(this).find('span.error').removeClass('clicked');
                }
            };
        },
        submitHandler: function submitHandler(form) {
            $.ajax({
                url: form.action,
                type: 'POST',
                data: $(form).serialize(),
                dataType: 'json',
                success: function success(data) {
                    $('.popup_wrapper').removeClass('opened');
                    $('body').removeClass('no_scroll');
                    $('#formPopup1')[0].reset();
                    alert(data['answer']);
                },
                error: function error(result) {
                    alert('error');
                }
            });
            console.log(form);
            return false;
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
                required: true
                //digits: true
            },
            email: {
                //required: true,
                email: true
            },
            message: {
                //required: true
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
                required: validationName
                //digits: validationPhone
            },
            message: {
                required: validationName
            }
        },
        invalidHandler: function invalidHandler(e, v) {
            for (var i = 0; i < v.errorList.length; i++) {
                v.errorList[i].element.onclick = function () {
                    this.nextSibling.classList.add('clicked');
                };
            };
            this.onsubmit = function () {
                for (var j = 0; j < v.errorList.length; j++) {
                    $(this).find('span.error').removeClass('clicked');
                }
            };
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
                required: true
                //digits: true
            },
            email: {
                //required: true,
                email: true
            },
            message: {
                //required: true
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
                required: validationName
                // digits: validationPhone
            },
            message: {
                required: validationName
            }
        },
        invalidHandler: function invalidHandler(e, v) {
            for (var i = 0; i < v.errorList.length; i++) {
                v.errorList[i].element.onclick = function () {
                    this.nextSibling.classList.add('clicked');
                };
            };
            this.onsubmit = function () {
                for (var j = 0; j < v.errorList.length; j++) {
                    $(this).find('span.error').removeClass('clicked');
                }
            };
        },
        submitHandler: function submitHandler(form) {
            $.ajax({
                url: form.action,
                type: 'POST',
                data: $(form).serialize(),
                dataType: 'json',
                success: function success(data) {
                    $('.popup_wrapper').removeClass('opened');
                    $('body').removeClass('no_scroll');
                    $('#formPopup3')[0].reset();
                    alert(data['answer']);
                },
                error: function error(result) {
                    alert('error');
                }
            });
            console.log(form);
            return false;
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
                required: true
                //digits: true
            },
            email: {
                required: true,
                email: true
            },
            message: {
                //required: true
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
                required: validationName
                //digits: validationPhone
            },
            message: {
                required: validationName
            }
        },
        invalidHandler: function invalidHandler(e, v) {
            for (var i = 0; i < v.errorList.length; i++) {
                v.errorList[i].element.onclick = function () {
                    this.nextSibling.classList.add('clicked');
                };
            };
            this.onsubmit = function () {
                for (var j = 0; j < v.errorList.length; j++) {
                    $(this).find('span.error').removeClass('clicked');
                }
            };
        },
        submitHandler: function submitHandler(form) {
            $.ajax({
                url: form.action,
                type: 'POST',
                data: $(form).serialize(),
                dataType: 'json',
                success: function success(data) {
                    $('.popup_wrapper').removeClass('opened');
                    $('body').removeClass('no_scroll');
                    $('#contactFormPage')[0].reset();
                    alert(data['answer']);
                },
                error: function error(result) {
                    alert('error');
                }
            });
            console.log(form);
            return false;
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
                required: true
                //digits: true
            },
            email: {
                // required: true,
                email: true
            },
            message: {
                //required: true
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
                required: validationName
                // digits: validationPhone
            },
            message: {
                required: validationName
            }
        },
        invalidHandler: function invalidHandler(e, v) {
            for (var i = 0; i < v.errorList.length; i++) {
                v.errorList[i].element.onclick = function () {
                    this.nextSibling.classList.add('clicked');
                };
            };
            this.onsubmit = function () {
                for (var j = 0; j < v.errorList.length; j++) {
                    $(this).find('span.error').removeClass('clicked');
                }
            };
        },
        submitHandler: function submitHandler(form) {
            $.ajax({
                url: form.action,
                type: 'POST',
                data: $(form).serialize(),
                dataType: 'json',
                success: function success(data) {
                    $('.popup_wrapper').removeClass('opened');
                    $('body').removeClass('no_scroll');
                    $('#callForm')[0].reset();
                    alert(data['answer']);
                },
                error: function error(result) {
                    alert('error');
                }
            });
            console.log(form);
            return false;
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
                required: true
                // digits: true
            },
            email: {
                //required: true,
                email: true
            },
            message: {
                //required: true
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
                required: validationName
                // digits: validationPhone
            },
            message: {
                required: validationName
            },
            address: {
                required: validationName
            }
        },
        invalidHandler: function invalidHandler(e, v) {
            for (var i = 0; i < v.errorList.length; i++) {
                v.errorList[i].element.onclick = function () {
                    this.nextSibling.classList.add('clicked');
                };
            };
            this.onsubmit = function () {
                for (var j = 0; j < v.errorList.length; j++) {
                    $(this).find('span.error').removeClass('clicked');
                }
            };
        },
        submitHandler: function submitHandler(form) {
            $.ajax({
                url: form.action,
                type: 'POST',
                data: $(form).serialize(),
                dataType: 'json',
                success: function success(data) {
                    $('.popup_wrapper').removeClass('opened');
                    $('body').removeClass('no_scroll');
                    $('#orderForm')[0].reset();
                    alert(data['answer']);
                },
                error: function error(result) {
                    alert('error');
                }
            });
            console.log(form);
            return false;
        }
    });
    $('.popup_window .btn_close').click(function () {
        popupWrapper.removeClass('opened');
        $(this).siblings().find('.popup_form').validate().resetForm();
    });
    popupWrapper.click(function (e) {
        if (e.target == this) {
            this.classList.remove('opened');
            $(this).siblings().find('.popup_form').validate().resetForm();
        }
    });
    $('#load').click(function (event) {
        var action = $(event.target).attr('name');
        event.preventDefault();
        $.ajax({
            url: action,
            type: 'GET',
            dataType: 'json',
            success: function success(data) {
                $('.social__content').append(data['html']);
                $('#load').attr('name', data['href']);
                if (!data['flag']) {
                    $('#load').hide();
                }
            },
            error: function error(result) {
                alert('error');
            }
        });
    });
    var contact = {
        data: {
            name: $('.profile_page .profile__name'),
            tel: $('.profile_page .profile__contact.phone a'),
            email: $('.profile_page .profile__contact.email a')
        },
        input: {
            name: $('.editing_form').find('.input_wrapper').find('[name = name]'),
            tel: $('.editing_form').find('.input_wrapper').find('[name = phone]'),
            email: $('.editing_form').find('.input_wrapper').find('[name = email]')
        },
        setData: function setData() {
            for (var prop in this.data) {
                this.input[prop].val(this.data[prop].text());
            };
        },
        focus: function focus() {
            for (var prop in this.input) {
                this.input[prop].focusout(function () {
                    $('.edit_icon').fadeOut();
                });
                this.input[prop].focusin(function () {
                    $(this).siblings('.edit_icon').fadeIn();
                });
            }
        },
        changeProfile: function changeProfile() {
            for (var prop in this.data) {
                this.data[prop].text(this.input[prop].val() + '');
            }
        }
    };
    // editing profile
    $('.profile__edit').click(function () {
        $(this).hide();
        $('.profile__quit').hide();
        $('.profile__info__inner').hide();
        $('.profile__editing').show();
        contact.setData();
        contact.focus();
    });
    !function ($) {
        $(document).ready(function () {
            $('.profile_page .phone').focusin(function () {
                $(this).mask('+38(0ss) sss ss ss');
            }).focusout(function () {
                $(this).unmask();
            });
        });
    }(jQuery);
    $('.start_edit_password').click(function (c) {
        $(this).fadeOut('fast');
        $(c.target).siblings('input').removeAttr('disabled');
        $('.editing_form').find('.input_wrapper').find('[name = password_new]').parent().css('display', 'block');
    });
    $('.end_edit_password').click(function (c) {
        c.target.parentElement.style.display = 'none';
        $('.editing_form').find('.input_wrapper').find('[name = password_old]').attr('disabled', 'disabled');
        $('.start_edit_password').fadeIn('fast');
    });
    $('.quit_editing').click(function () {
        closeEditing();
    });
    function closeEditing() {
        $('.profile__editing').hide();
        $('.profile__quit').show();
        $('.profile__info__inner').show();
        $('.profile__edit').show();
    };
    // Object.defineProperty(contact, "setData", {
    //     enumerable: false
    // });
    // Object.defineProperty(contact, "focus", {
    //     enumerable: false
    // });

    $('#profileForm').validate({
        errorElement: 'span',
        focusInvalid: false,
        rules: {
            name: {
                required: true,
                minlength: 2
            },
            phone: {
                required: true
                // digits: true
            },
            email: {
                required: true,
                email: true
            },
            password_new: {
                required: true,
                minlength: 6
            },
            password_old: {
                required: true,
                minlength: 6
            },
            message: {
                //required: true
            },
            address: {
                required: true
            }
        },
        messages: {
            name: {
                required: validationName,
                minlength: validationNameMax
            },
            email: {
                required: validationName,
                email: validationEmail
            },
            phone: {
                required: validationName
                // digits: validationPhone
            },
            password_new: {
                required: validationName,
                minlength: validationPass
            },
            password_old: {
                required: validationName,
                minlength: validationPass
            },
            message: {
                required: validationName
            },
            address: {
                required: validationName
            }
        },
        invalidHandler: function invalidHandler(e, v) {
            for (var i = 0; i < v.errorList.length; i++) {
                v.errorList[i].element.onclick = function () {
                    this.nextSibling.classList.add('clicked');
                };
            };
            this.onsubmit = function () {
                for (var j = 0; j < v.errorList.length; j++) {
                    $(this).find('span.error').removeClass('clicked');
                }
            };
        },
        submitHandler: function submitHandler(form) {
            changeProfile(event);
            closeEditing();
            contact.changeProfile();
            return false;
        }
    });
    $('.profile__doc__list').mCustomScrollbar();
    function checkHeight() {
        var wrapper = document.querySelector('.profile__doc__list');
        var item = document.querySelector('.profile__doc__list__item');
        var itemHeight = parseInt(getComputedStyle(item).height);
        $('.profile__doc__list').mCustomScrollbar("destroy");
        if ($(window).width() > 1024) {
            wrapper.style.height = itemHeight * 3 + 'px';
            $('.profile__doc__list').mCustomScrollbar();
        } else if ($(window).width() <= 1024 && $(window).width() > 800) {
            wrapper.style.height = itemHeight * 2 + 'px';
            $('.profile__doc__list').mCustomScrollbar();
        } else if ($(window).width() <= 800) {
            $('.profile__doc__list').mCustomScrollbar();
            wrapper.style.height = itemHeight * 1 + 'px';
        }
    }
    checkHeight();
    $(window).on('resize', function () {
        checkHeight();
    });
    $(window).on('orientationchange', function () {
        checkHeight();
    });

    function changeProfile(event) {
        event.preventDefault();
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            url: '/home/edit', // путь к php-обработчику
            type: 'POST', // метод передачи данных
            dataType: 'json', // тип ожидаемых данных в ответе
            beforeSend: function beforeSend() {
                // Функция вызывается перед отправкой запроса
                console.debug('Запрос отправлен. Ждите ответа.');
                // тут можно, к примеру, начинать показ прелоадера, в общем, на ваше усмотрение
            },
            error: function error(req, text, _error) {
                // отслеживание ошибок во время выполнения ajax-запроса
                console.error('Упс! Ошибочка: ' + text + ' | ' + _error);
            },
            complete: function complete() {
                // функция вызывается по окончании запроса
                console.debug('Запрос полностью завершен!');
                // тут завершаем показ прелоадера, если вы его показывали
            }
        });

        var $that = $('.editing_form'),
            formData = new FormData($that.get(0)); // создаем новый экземпляр объекта и передаем ему нашу форму (*)
        $.ajax({
            contentType: false, // важно - убираем форматирование данных по умолчанию
            processData: false, // важно - убираем преобразование строк по умолчанию
            data: formData,
            success: function success(json) {
                if (json) {
                    // тут что-то делаем с полученным результатом
                }
            }
        });
    }
});