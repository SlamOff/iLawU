function checkHeightMain(c){
    var cont = document.querySelector('.chat_container');
    var chat = document.querySelector(c);
    var contHeight = parseInt(getComputedStyle(cont).height);
    //console.log(contHeight - 70);
    if($(window).width() > 768){
        if(chat.classList.contains('chat_main_reg') || chat.classList.contains('chat_main_rating')){
            chat.style.height = contHeight - 70 + 'px';
        }
        else if(chat.classList.contains('chat_main_message')){
            chat.style.height = contHeight - 170 + 'px';
        }
    }
    else {
        if(chat.classList.contains('chat_main_reg') || chat.classList.contains('chat_main_rating')){
            chat.style.height = contHeight - 52 + 'px';
        }
        else if(chat.classList.contains('chat_main_message')){
            chat.style.height = contHeight - 142 + 'px';
        }
    }
}
function setCoords(){
    //console.log(1);
    var el = document.querySelector('.chat_container');
    var containerHeight = parseInt(getComputedStyle(el).height);
    var containerWidth = parseInt(getComputedStyle(el).width);
    var coordY = document.documentElement.clientHeight - containerHeight;
    var coordX = document.documentElement.clientWidth - containerWidth;
    if($(window).width() > 768){
        el.style.left = coordX - 20 + 'px';
        el.style.top = coordY - 20 + 'px';
    }
};
function checkPadding(el){
    if($('.upload_btns').hasClass('visible') || $('.smile_container').hasClass('visible')){
        $('.chat_dialog').css('padding-bottom', '100px');
    }
    else {
        $('.chat_dialog').css('padding-bottom', '0');
    }
}

$(document).ready(function() {

    jQuery(function($){
       /* $("#phone input").mask("+38(099) 999-9999");*/
    });

   setTimeout(function(){
        $('.start_widget').fadeIn();
        $('.start_widget_add').hide();
    }, settings.timeDelay*1000/2);
   setTimeout(function(){
        $('.start_widget_add').fadeIn();
   }, settings.timeDelay*1000);

    var container = $('.chat_container');
    container.show();
    $('body').find('.chat_container').removeClass('resizable');
    $('body').find('.chat_container').toggleClass('rolled');
    //placeholder
    $("input, textarea").focus(function() {
        $(this).data("placeholder", $(this).attr("placeholder")),
        $(this).attr("placeholder", '');
    }),
    $("input, textarea").blur(function() {
        $(this).attr("placeholder", $(this).data("placeholder"));
    });
    var chatAll = $('.chat_main');
    $('textarea').keydown(function(){
        $(this).mCustomScrollbar();
    });
    if($(window).width() < 768){
        $('textarea').focusin(function(){
            setTimeout(function(){
                checkHeightMain('.chat_main_message');
                console.log(111);
            }, 10);
            
        });
    }
    
    chatAll.mCustomScrollbar();
    // Содержимое чата (По отдельности)
    var chatReg = $('.chat_main_reg');
    var chatMessage = $('.chat_main_message');
    var chatRating = $('.chat_main_rating');
    var chatDialog = $('.chat_dialog');
    $(container).on('click', '.mute', function(){
        $(this).toggleClass('muted');
    });
    $(container).on('click', '.close', function(){
        container.removeClass('rolled');
        $('.upload_btns').removeClass('visible');
        $('.smile_container').removeClass('visible');
        checkPadding('smile_container');
        $('.chat_quit').show();
    });
    $(container).on('click', '.no_quit', function(){
        $('.chat_quit').hide();
    });
    $(container).on('click', '#mail', function(){
        $('.chat_mail_black').show();
    });
    $(container).on('click', '.no_mail', function(){
        $('.chat_mail_black').hide();
    });
    if ($(window).width() > 767){
        autosize($('.textarea_size'));
        autosize($('.main_textarea'));
    }
    
    chatDialog.mCustomScrollbar();
    $('.show_settings').click(function(){
        $('.smile_container').removeClass('visible');
        $(this).toggleClass('rotated');
        $('.upload_btns').toggleClass('visible');
        checkPadding('.upload_btns');
    });
    $('.main_textarea').focus(function(){
        $('.show_settings').hide();
        $('.mute').hide();
        $('.empty').show();
        $('.chat_btns').css('min-width', '1px');
    });
    $('.main_textarea').blur(function(e){
        var self = this;
        setTimeout(function(){
            if(e.relatedTarget == document.querySelector('.empty')){
            self.value = '';
            $(self).attr('value', '');
            self.setAttribute('value', '');
            self.style.height = '35px';
        };
        $('.empty').hide();
        $('.mute').show();
        $('.show_settings').show();
        $('.chat_btns').css('min-width', '62px');
        },10);
        
    });
    $(document).on('click', '.empty', function(){
        $('.main_textarea').val(' ');
        $('.main_textarea').attr('value', ' ');
    });
    $('.mute').click(function(){
        $(this).toggleClass('unmute');
    });
    
    $('body').on('click', '.show_smiles', function(e){
        $('.smile_container').toggleClass('visible');
        $('.show_settings').removeClass('rotated');
        $('.upload_btns').removeClass('visible');
        checkPadding('.show_smiles');
    });




    $('.roll').click(function(){
        //container.removeClass('resizable');
        container.addClass('rolled');

        $('.start_widget_main').fadeIn();
        $('.start_widget_add').hide();
        //$('.start_widget_main').siblings().fadeIn();
        //$('.chat_ready').hide();
        //$('.chat_dismiss').hide();
        //$('.message_quantity').hide();
    });
    $('.chat_dismiss').click(function(){
        this.style.display = 'none';
        this.nextElementSibling.style.display = 'none';
    });

    $('body').on('click', '.start_widget_main, .chat_ready', function(){


        $(this).hide();
        $(this).siblings().hide();
        $('.chat_container').removeClass('rolled');
        $('.chat_container').fadeIn();


        checkHeightMain('.chat_main_reg');
        checkHeightMain('.chat_main_message');
        checkHeightMain('.chat_main_rating');
        setCoords();

        chatDialog.mCustomScrollbar();
        chatDialog.mCustomScrollbar("scrollTo", "bottom", {
            scrollInertia: 1
        });
    });
    var rating = $('.first_rating');
    var ratingNext = $('.next_rating');
    var rating2 = $('.rating2');
    var rating3 = $('.rating3');
    var rating4 = $('.rating4');
    var rating5 = $('.rating5');
    var ratingFinal = $('.final_rating');
    var rateWrapper = $('.dialog');
    function newContent(contentHide, contentShow){
        checkHeight();
        chatAll.mCustomScrollbar('destroy');
        contentHide.hide();
        contentShow.show();
        chatAll.mCustomScrollbar();
    };
    $('#rate').click(function(){
        newContent(chatMessage, chatRating);
        chatRating.css('padding-bottom', '30px');
        checkHeightMain('.chat_main_rating');
    });
    var stars = document.querySelectorAll('.star');
    var stars2 = Array.prototype.slice.call(stars);
    var cancel = false;
    function changeColor(pict, index){
        for(var l = 0; l < stars.length; l++){
            stars[l].style.backgroundImage = 'url(' + 'https://www.vodafone.ua:8080/img/unranked.png' + ')';
        }
        for(var m = 0; m <= index; m++){
            stars[m].style.backgroundImage = 'url(' +  pict + ')';
        }
    }
    stars2.map(function(el, ind){
        el.onmouseover = function(){
            if(!cancel){
                changeColor('https://www.vodafone.ua:8080/img/ranked.png', ind);
            }
        }
        el.onclick = function(e){
            cancel = true;
            changeColor('https://www.vodafone.ua:8080/img/ranked.png', ind);
            //console.log(e.target);
            var stars = document.querySelectorAll('.star');
            for (var i = 0; i < stars.length; i++){
                stars[i].children[0].style.color = '#afafaf';
                stars[i].children[0].style.fontWeight = 'normal';
            }
            if(e.target.classList.contains('star')){
                this.children[0].style.color = '#1d1d1d';
                this.children[0].style.fontWeight = 'bold';
            }
            else {
                this.style.color = '#1d1d1d';
                this.style.fontWeight = 'bold';
            }
        }
        el.onmouseout = function(){
            if(!cancel){
                changeColor('https://www.vodafone.ua:8080/img/unranked.png', ind);
            }
        }
    });
    $('.smile').click(function(e){
        e.preventDefault();
    });
    $('body').on('click', function(e){
        $('.smile_container').removeClass('shown');
        if(e.target.classList.contains('chat_smiles') || e.target.classList.contains('smile_container')){
            $('.smile_container').addClass('shown');
        }
    });
    $('body').on('click', '.smile_container', function(e){
        if(e.target.classList.contains('smile')){
            this.classList.remove('shown');
        }
        else if (e.target == this){
            this.classList.add('shown');
        }
        else if (!e.target){
            this.classList.remove('shown');
        }
        else {
            this.classList.remove('shown');
        }
    });
    var chatContainer = document.querySelector('.chat_container');
    var chatMain = document.querySelector('.chat_main');
    var chatMainMessage = document.querySelector('.chat_main_message');
    var header = document.querySelector('.chat_header');
    var footer = document.querySelector('.chat_footer');
    var chatHeigth = container.height();
    var dialog = document.querySelector('.chat_main_wrapper');
    $('.chat_main').hover(function () {
    });

    $('.chat_header').hover(function () {
        if($('.chat_container').hasClass('rolled')){
        }
        else {
        }
    });
    var startX, startY, startWidth, startHeight;
    var containerHeight = parseInt(getComputedStyle(document.querySelector('.chat_container')).height);
    var fixedHeight2 = parseInt(getComputedStyle(header).height);
    var fixedHeight = parseInt(getComputedStyle(header).height) + parseInt(getComputedStyle(footer).height);
    function checkHeight(){
        if(window.innerHeight <= containerHeight){
            chatAll.mCustomScrollbar();
        }
        else {
            //document.querySelector('.chat_container').style.height='auto';
            //wrap.css('align-items', 'center');
        }
    };
    if($(window).width() > 767){
        $('.chat_container').resizable({
            handles: 'all',
            minWidth: 384,
            minHeight: 400,
            resize: function( event, ui ){
                checkHeightMain('.chat_main_reg');
                checkHeightMain('.chat_main_message');
                checkHeightMain('.chat_main_rating');
            }
        });
};
    var dragContainer = document.querySelector('.chat_container');
    var dragHeader = document.querySelector('.chat_header');
    var dragHeaderInner = document.querySelector('.chat_header_inner');
    var dragTitle = document.querySelector('.chat_title');
    var dragNotify = document.querySelector('.notify');
    var dragIndicator = document.querySelector('.indicator');
    var startPict = document.querySelector('.start_pict');

    dragContainer.onmousedown = function(e){
        if(e.which != 1){
            return false;
        }

        if(e.target == dragHeader || e.target == dragHeaderInner || e.target == dragNotify || e.target == startPict || e.target == dragTitle || e.target == dragIndicator){
            //console.log(1);
            console.log(1);
            var coords = getCoords(dragContainer);
            console.log(coords);
            var shiftX = e.pageX - coords.left;
            var shiftY = e.pageY - coords.top;
            moveAt(e);
            function moveAt(e) {
                dragContainer.style.left = e.pageX - shiftX + 'px';
                dragContainer.style.top = e.pageY - shiftY + 'px';
            }
            document.onmousemove = function(e) {
                moveAt(e);
            }
            this.onmouseup = function() {
                document.onmousemove = null;
                dragContainer.onmouseup = null;
            }
            this.ondragstart = function() {
                return false;
            };
        }

        function getCoords(elem) {
            var box = elem.getBoundingClientRect();
            console.log(pageYOffset);
            return {
                top: box.top,
                left: box.left
            };
        }
    };
    $('#chat_operator').change(function(e){
        var elem = $(this).find('option:selected');
        var input = $(this).siblings('input');
        if(elem.text() == 'не абонент'){
            $(this).hide();
            input.attr('type', 'text');
            input.focus();
        }else{
            $(this).show();
            if(input.val()=='' && input.attr('type')=='text'){
                $('#chat_operator option').prop("selected", false);
                $('#chat_operator option:first-child').prop("selected", true);
            }
        }
        input.focusout(function () {
            console.log($(this).val());
            if($(this).val()==''){
                $('#chat_operator option').prop("selected", false);
                $('#chat_operator option:first-child').prop("selected", true);
                $('#chat_operator').show();
                $(this).attr('type', 'hidden');
            }
        });
        });
     $('#chat_operator').focus(function(e){
         var elem = $(this).find('option:selected');
         var input = $(this).siblings('input');
         if(elem.text() == 'не абонент'){
             input.attr('type', 'text');
             input.focus();
         }
     });

    if ($(window).width() < 767){
        $(window).resize(function(){
            checkHeightMain('.chat_main_reg');
            checkHeightMain('.chat_main_message');
            checkHeightMain('.chat_main_rating');
        });
        $(window).on('orientationchange', function(){
            checkHeightMain('.chat_main_reg');
            checkHeightMain('.chat_main_message');
            checkHeightMain('.chat_main_rating');
        });
        $('input, textarea').blur(function(){
            checkHeightMain('.chat_main_reg');
            checkHeightMain('.chat_main_message');
            checkHeightMain('.chat_main_rating');
        });
        checkHeightMain('.chat_main_reg');
        checkHeightMain('.chat_main_message');
        checkHeightMain('.chat_main_rating');
    }


    var locationURL = window.location.pathname;
    var validationName = lang.k;
    var validationNameMax = lang.af;
    var validationPhone = lang.l;
    var validationEmail = lang.ae;
    var chatAll = $('.chat_main');
    var chatReg = $('.chat_main_reg');
    var chatMessage = $('.chat_main_message');
    var chatRating = $('.chat_main_rating');
    var chatDialog = $('.chat_dialog');
    var hatiko = 0;
    var message_count=0;
    var cur = new Date();
    var status = $('[name="status"]');
    var user_mail=$('[name="user_mail"]');
    var indicator = $('.indicator');
    var marks;
    var rating = $('.first_rating');
    var ratingNext = $('.next_rating');
    var rating2 = $('.rating2');
    var rating3 = $('.rating3');
    var rating4 = $('.rating4');
    var rating5 = $('.rating5');
    var ratingFinal = $('.final_rating');
    var rateWrapper = $('.dialog');
    var containerHeight = parseInt(getComputedStyle(document.querySelector('.chat_container')).height);


    function showLoader() {
        //$('.chat_main').css({'background-image': 'url("https://www.vodafone.ua:8080/Rolling.gif")'});
    }

    function hideLoader() {
        $('.chat_main').css({
            'background-image': 'none',
        });
        $('.chat_main').children().show();
        $('.rating_chat').hide();
        $('.thanks').hide();
    }

    function indicate(status) {
        var classes = indicator.attr('class').split(' ');
        indicator.removeClass(classes[2]);
        indicator.addClass(status);
    }

    function refresh() {
        setInterval(function () {
            if (status.val() == 'connected') {
                if (hatiko == 0) {
                    $.ajax({
                        url: 'https://www.vodafone.ua:8080/refresh',
                        type: 'POST',
                        xhrFields: {
                            withCredentials: true
                        },
                        crossDomain: true,
                        beforeSend: function () {
                            hatiko = 1;
                        },
                        success: function (response) {
                            console.log(response.chatended);
                            if (response.chatended) {
                                status.val('not-connected');
                                chatDialog.mCustomScrollbar('destroy');
                                chatReg.show();
                                chatMessage.hide();
                                chatAll.mCustomScrollbar();
                                return;
                            }
                            if (response.answering.status) {
                                $('.typing').show();
                            } else {
                                $('.typing').hide();
                            }
                            if (response.agent.status) {
                                $('.chat_connecting').hide();
                                $('.send').show();
                                $('.blocked').hide();
                            } else {
                                $('.chat_connecting').hide();
                                $('.blocked').hide();
                                $('.send').show();
                            }
                            if (response.new_message) {
                                message_count++;
                                if($('.start_widget_main').is(":visible")){
                                $('.chat_ready').show();
                                $('.chat_dismiss').show();
                                $('.chat_ready').html(response.new_message_text);}
                                $('.message_quantity').html(message_count);
                                $('.message_quantity').show();
                                var audio = new Audio('https://www.vodafone.ua:8080/tap.mp3');
                                if ($('.chat_container').find('button.mute').hasClass('muted')) {
                                    audio.play();
                                }
                            }
                            if (status.val() == 'connected') {
                                $('.message_wrapper').remove();
                                chatDialog.find('.mCSB_container').append(response.chatlog);
                                chatDialog.mCustomScrollbar("update");
                            }
                            $('#chatlog').html('');
                            $('#chatlog').append(response.chatlog);
                        },
                        complete: function () {
                            hatiko = 0;
                        }
                    });
                }
            }
        }, 3000);
    }

    function checkHeight() {
        if (window.innerHeight <= containerHeight) {
            chatAll.mCustomScrollbar();
        }
        else {
        }
    }

    function newContent(contentHide, contentShow) {
        checkHeight();
        chatAll.mCustomScrollbar('destroy');
        contentHide.hide();
        contentShow.show();
        checkHeightMain('.chat_main_rating');
        chatAll.mCustomScrollbar();
    };

    function linkify(text) {
        var urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
        return text.replace(urlRegex, function (url) {
            return '<a href="' + url + '" target="_blank">' + url + '</a>';
        });
    }




    /*<=========== FORM ==========>*/
    function isValid(obj) {
        var valid=true;
        switch (obj.attr('name')){
            case 'name':
                if(obj.val().length<2){
                    obj.addClass('error');
                    valid=false;
                }else{
                    obj.removeClass('error');
                }
                break;
            case 'chat_phone':
                var phone=obj.val();
                phone=phone.replace(/\D/g,'');
                if(phone.length!=12){
                    obj.addClass('error');
                    valid=false;
                }else{
                    obj.removeClass('error');
                }
                break;
            case 'chat_email':
                var email=obj.val();
                var re = new RegExp('^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$');
                if(!re.test(email)){
                    obj.addClass('error');
                    valid=false;
                }else{
                    obj.removeClass('error');
                }
                break;
        }
        return valid;
    }
    $('body').find('#checkbox').click(function () {
        if ($('body').find('#checkbox input').is(':checked')) {
            $(this).find('.mask').css('background-image', 'url(https://www.vodafone.ua:8080/img/tick.png)');
            $('body').find('#checkbox input').removeClass('error');
        }
        else {
            $(this).find('.mask').css('background-image', 'none');
            $('body').find('#checkbox input').addClass('error');
        }
    });
    $('#enter_chat input,#enter_chat textarea').on('focus , focusout keyup , change' , function (e) {
        isValid($(this));
    })
    $('#enter_chat').submit(function (e) {
        e.preventDefault();
        var check=true;
        $('#enter_chat input,#enter_chat textarea,#enter_chat checkbox').each(function (n,t) {
            if(!isValid($(this))){
                check=false;
            };
        });
        if(!$('input[name="checkbox"]').is(':checked')){
            $('input[name="checkbox"]').addClass('error');
            check=false;
        }else{
            $('input[name="checkbox"]').removeClass('error');
        }
        if(check) {
            var message_con = $('[name="message_connect"]').val();
            console.log(JSON.stringify($(this).serializeArray()));
            $.ajax({
                url: 'https://www.vodafone.ua:8080/connect',
                type: 'POST',
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
                data: {
                    firstname: $('[name="name"]').val(),
                    phone:  $('[name="chat_phone"]').val(),
                    email: $('[name="chat_email"]').val(),
                    message: message_con
                },
                beforeSend: function () {
                    $('.chat_main').children().hide();
                    showLoader();
                },
                success: function (response) {
                    checkHeightMain('.chat_main_message');
                    status.val('connected');
                    user_mail=$('[name="chat_email"]').val();
                    $('.chat_container').find('[name="rate_email"]').val(user_mail);
                    chatAll.mCustomScrollbar('destroy');
                    chatReg.hide();
                    chatMessage.show();
                    chatDialog.mCustomScrollbar();
                    $('.chat_connecting').show();
                    $('.user_name').html($('[name="name"]').val());
                },
                complete: function () {
                    hideLoader();
                }
            });
        }
    });
    /*<===========================>*/



    $('#rate').click(function(event) {
        $('.rating1 , .thanks').toggle();
    });
    $('.chat_rate_answer').click(function(event) {
        var step=parseInt($(this).attr('data-quest'));
        var quest_text = $('#quest'+step).html();
        var answer=(typeof $(this).attr('data-answer') == 'undefined' )?marks:$(this).attr('data-answer');
        var isLast='no';
        if(!$(this).hasClass('chat_rate_last')) {
            $('.rating' + step).toggle();
            $('.rating' + parseInt(step+1)).toggle();
        }else{
            newContent($('.rating' + step), $('.final_rating'));
            isLast='yes';
        }
        $.ajax({
            url: 'https://www.vodafone.ua:8080/questionary',
            type: 'POST',
            xhrFields: {withCredentials: true},
            crossDomain: true,
            data:{num: step, quest: quest_text, answer: answer,isLast:isLast},
            success: function (response) {
            }
        });
        console.log({num: step, quest: quest_text, answer: answer,isLast:isLast});
    });
    $('.step.done').click(function(event) {
        var step=parseInt($(this).siblings('.step.active').html());
        if (step>parseInt($(this).html())) {
            $('.rating'+step+' , .rating'+$(this).html()).toggle();
        }
    });
    $('.one_more').click(function(){
        $.ajax({
            url: 'https://www.vodafone.ua:8080/reconnect',
            type: 'POST',
            xhrFields: {
                withCredentials: true
            },
            success:function (data){
                if(data){$('[name="status"]').val('connected');}
            },
            crossDomain: true
        });
        $('.chat_main_rating').hide();
        $('.final_rating').hide();
        checkHeightMain('.chat_main_message');
        $('.chat_main').mCustomScrollbar('destroy');
        $('.chat_main_message').show()
        $('.chat_main_reg').hide();
        $('.chat_user_message input').removeAttr('disabled');
        $('.chat_user_message .send').css('border-left-color', '#e50000');
        $('.chat_user_message input').attr('placeholder', lang.n);
        $('.chat_end').html(lang.o);
        $('.chat_footer').toggle();
        $('.chat_user_message input').focus();
        //$('.thanks').hide();
        $('.nav_btns').css('display', 'block');
        //$('.chat_dialog').mCustomScrollbar();
        $('.chat_dialog').mCustomScrollbar("scrollTo", "bottom", {
            scrollInertia: 1
        });
        //$('.chat_dialog').mCustomScrollbar();
        setCoords();
    });


    /*DOWNLOAD CHAT*/
    $('.chat_container').on('click', '.chat_download', function (e) {
        e.preventDefault();
        var chatlog = $('#chatlog');
        var chat = '';
        chatlog.find('.message_wrapper').each(function (index, el) {
            console.log($(this));
            if ($(this).hasClass('user')) {
                var who = 'You';
            }
            else {
                var who = 'Operator';
            }
            var mess = $(this).find('.message');
            var text_link = $(this).find('.message a').attr('href');
            $(mess).find('a').remove();
            $(mess).find('img').remove();
            var mes = $(this).find('.message').html();

            var tme = $(this).find('.time').prop('outerHTML');
            //console.log(tme);
            tme = tme.replace(new RegExp("<span class=\"time\">", 'g'), '');
            tme = tme.replace(new RegExp("</span>", 'g'), '');
            var mes_text = mes.replace(mess.find('.time'), '');
            mes_text = mes_text.replace(new RegExp("<span class=\"time\">", 'g'), '');
            mes_text = mes_text.replace(new RegExp("</span>", 'g'), '');
            mes_text = mes_text.replace(new RegExp(tme, 'g'), '');
            // mes_text=mes_text.replace(new RegExp('<img[^>"\']*((("[^"]*")|(\'[^\']*\'))[^"\'>]*)*>','g'),'');
            mes_text = (mes_text == '' || mes_text.length == 0) ? text_link : mes_text;
            chat = chat + who + '  :  ' + mes_text + '  -  ' + tme + ' \r\n';
        });
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(chat));
        element.setAttribute('download', 'chat.txt');
        element.setAttribute('target','_blank');
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    });
    /*SEND GEO */
    $('.chat_container').on('click', '.loc-input', function (e) {
        e.preventDefault();
        navigator.geolocation.getCurrentPosition(
            function(position) {
                $('[name="chat_message"]').val(position.coords.latitude+' ltd. , '+position.coords.longitude+' lng.');
            },
            function () {
            },
            {enableHighAccuracy: true}
        );
    });
    /*PRINT CHAT*/
    $('.chat_container').on('click', '.chat_print', function (event) {
        event.preventDefault();
        var chatlog = $('#chatlog');
        var chat = '';
        chatlog.find('.message_wrapper').each(function (index, el) {
            if ($(this).hasClass('user')) {
                var who = 'You';
            }
            else {
                var who = 'Operator';
            }
            var mes = $(this).find('.message').html();
            var mess = $(this).find('.message');
            var tme = $(this).find('.time').prop('outerHTML');
            tme = tme.replace(new RegExp("<span class=\"time\">", 'g'), '');
            tme = tme.replace(new RegExp("</span>", 'g'), '');
            var mes_text = mes.replace(mess.find('.time'), '');
            mes_text = mes_text.replace(new RegExp("<span class=\"time\">", 'g'), '');
            mes_text = mes_text.replace(new RegExp("</span>", 'g'), '');
            mes_text = mes_text.replace(new RegExp(tme, 'g'), '');
            chat = chat + '<p>' + who + '  :  ' + mes_text + '  -  ' + tme + '</p>' + ' \r\n ';

        });
        $('#print-chat').html(chat);
        window.print();
    });
    /*SMILES*/
    $('.chat_container').on('click', '.smile', function (e) {
        e.preventDefault();
        var message = $('[name="chat_message"]');
        $(message).val($(message).val() + $(this).find('span').html());
        message.focus();
    });
    /*ENTER*/
    $('.chat_container').on('keydown', '[name="chat_message"]', function (e) {
        if (e.keyCode == 13) {
            var message = $('[name="chat_message"]').val();
            if (message.length == 0) {
                return;
            }
            e.preventDefault();
            $.ajax({
                url: 'https://www.vodafone.ua:8080/send',
                type: 'POST',
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
                data: {message: message},
                beforeSend: function () {
                },
                success: function (response) {
                    var cur = new Date();
                    chatDialog.mCustomScrollbar('destroy');
                    chatDialog.append(
                        '<div class="message_wrapper user">' + '<div class="message">' + linkify(message) +
                        '<span class="time">' + cur.toLocaleTimeString('en-US', {hour12: false})
                        + '</span>' + '</div>' + '</div>');
                    chatDialog.mCustomScrollbar();
                    chatDialog.mCustomScrollbar("scrollTo", "bottom", {
                        scrollInertia: 1
                    });
                },
                complete: function () {
                }
            });
            $('[name="chat_message"]').val('');
        }

    });
    /*START TYPING*/
    $('.chat_container').on('focusin', '[name="chat_message"]', function () {
        var message = $('[name="chat_message"]');
        if (message.html() == $(this).attr('data-placeholder')) {
            message.html('')
        }
        $.ajax({
            url: 'https://www.vodafone.ua:8080/typing',
            type: 'POST',
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            beforeSend: function () {
            },
            success: function (response) {
                //console.log(response);
            },
            complete: function () {
            }
        });
    });
    /*STOP TYPING*/
    $('.chat_container').on('focusout', '[name="chat_message"]', function () {
        var message = $('[name="chat_message"]');
        if (message.html() == '') {
            message.html($(this).attr('data-placeholder'));
        }
        $.ajax({
            url: 'https://www.vodafone.ua:8080/typingstop',
            type: 'POST',
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            beforeSend: function () {
            },
            success: function (response) {
                // console.log(response);
            },
            complete: function () {
            }
        });
    });
    /*SEND (same as ENTER but on click .send)*/
    $('.chat_container').on('click', '.send', function (e) {
        e.preventDefault();

        var message = $('[name="chat_message"]').val();
        if (message.length == 0) {
            return;
        }
        $.ajax({
            url: 'https://www.vodafone.ua:8080/send',
            type: 'POST',
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            data: {message: message},
            beforeSend: function () {
            },
            success: function (response) {
                var cur = new Date();
                chatDialog.mCustomScrollbar('destroy');
                chatDialog.append(
                    '<div class="message_wrapper user">' + '<div class="message">' + linkify(message) +
                    '<span class="time">' + cur.toLocaleTimeString('en-US', {hour12: false})
                    + '</span>' + '</div>' + '</div>');
                chatDialog.mCustomScrollbar();
                chatDialog.mCustomScrollbar("scrollTo", "bottom", {
                    scrollInertia: 1
                });
            },
            complete: function () {
            }
        });

        $('[name="chat_message"]').val('');
        $('.main_textarea').focus();
    });
    /*SEND FILE*/
    $('.chat_container').on('change', '#pict_input', function () {

        var formdata = new FormData();
        formdata.append('file', $('#pict_input')[0].files[0]);

            $.ajax({
                url: 'https://www.vodafone.ua:8080/sendfile',
                type: 'post',
                data: formdata,
                xhrFields: {
                    withCredentials: true
                },
                contentType: false,
                crossDomain: true,
                processData: false,
                beforeSend: function () {
                },
                success: function (response) {
                    var cur = new Date();
                    chatDialog.mCustomScrollbar('destroy');
                    chatDialog.append('<div class="message_wrapper user">' + '<div class="message"><img src="https://www.vodafone.ua:8080/Rollingb.gif" alt="' + $('input[type=file]')[0].files[0].name +
                        '" style="-webkit-filter: blur(1px);filter: blur(5px);">' +
                        '<span class="time">' + cur.toLocaleTimeString('en-US', {hour12: false}) + '</span>' + '</div>' + '</div>');
                    chatDialog.mCustomScrollbar();
                    chatDialog.mCustomScrollbar("scrollTo", "bottom", {
                        scrollInertia: 1
                    });
                },
                complete: function () {
                    $('#pict_input').val('');
                }
            });
    });
    /*RATES*/
    $('.chat_container').on('click','.chat_end',function(){
        chatMessage.hide();
        $('.chat_footer').hide();
        checkHeightMain('.chat_main_rating');
        $('.smile_container').removeClass('visible');
        $('.upload_btns').removeClass('visible');
        $('.typing').hide();
        checkPadding('.show_smiles');
        var thanks = $('.thanks');
        thanks.show();
        var messageInput = $('.chat_user_message input');
        if (thanks.is(':hidden')) {
            chatRating.mCustomScrollbar('destroy');
            status.val('rating');
            indicate('white');
            messageInput.attr('placeholder', lang.ac);
            messageInput.attr('disabled', 'disabled');
            this.textContent = lang.t;
            thanks.show();
            chatRating.mCustomScrollbar();
        } else {
            chatRating.mCustomScrollbar('destroy');
            messageInput.removeAttr('disabled');
            $('.chat_user_message .send').css('border-left-color', '#e50000');
            messageInput.attr('placeholder', lang.n);
            this.textContent = lang.o;
            messageInput.focus();
            status.val('connected');
            thanks.hide();
            $('.nav_btns').css('display','block');
            chatRating.mCustomScrollbar();
        }
        chatRating.show();
        chatRating.css('padding-bottom', '30px');
        checkHeightMain('.chat_main_rating');
    });
    $('.chat_container').on('click', '.star', function () {
        marks = $(this).find('span').html();
    });
    /*SEND CHAT LOG TO MAIL*/
    $('.chat_container').on('click', '.send_mail', function () {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var email = $('.chat_container').find('[name="rate_email"]').val();
        if (!re.test(email)) {
            $('#email_error').html(lang.ae);
            setTimeout(function () {
                $('#email_error').html('');
            }, 1000)
            return;
        }
        $.ajax({
            url: 'https://www.vodafone.ua:8080/mail_log',
            type: 'POST',
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            data: {mail: email},
            beforeSend: function () {
            },
            success: function (response) {
                $('#email_error').html(lang.ad);
                setTimeout(function () {
                    $('.chat_mail_black').hide();
                }, 2000);
                return;
            },
            complete: function () {
            }
        });
    });
    /*HARD DISCONNECT*/
    $('.chat_container').on('click', '.quit , .chat_connecting_footer', function () {
        $.ajax({
            url: 'https://www.vodafone.ua:8080/disconnect',
            type: 'POST',
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            beforeSend: function () {
            },
            success: function (response) {
            },
            complete: function () {
                $('.start_widget_main').show();
                $('.chat_container').hide();
                setTimeout(function(){
                    $('.start_widget').fadeIn();
                    $('.start_widget_add').hide();
                }, settings.timeDelay*10);
                /*                setTimeout(function(){
                                    $('.start_widget_add').fadeIn();
                                }, settings.timeDelay*10);*/
                var thanks = $('.thanks');
                var messageInput = $('.chat_user_message input');
                chatDialog.mCustomScrollbar('destroy');
                //messageInput.removeAttr('disabled');
                //$('.chat_user_message .send').css('border-left-color', '#e50000');
                //messageInput.attr('placeholder', lang.n);
                //$('.chat_end').textContent = lang.o;
                thanks.hide();
                chatDialog.mCustomScrollbar();
                chatDialog.mCustomScrollbar("scrollTo", "bottom", {
                    scrollInertia: 1
                });
                //$('.chat_quit_black').hide();
                status.val('not-connected');
                chatDialog.mCustomScrollbar('destroy');
                chatReg.show();
                chatMessage.hide();
                chatAll.mCustomScrollbar();
                $('.start_pict').show();
                checkHeightMain('.chat_main_reg');
                $('.chat_quit').hide();
                //$('body').find('.chat_container').removeClass('resizable');
                //$('body').find('.chat_container').toggleClass('rolled');
                //$('.chat_container').css('height', '70px');
            }
        });
    });

    $('body').on('mouseover','.operator', function (e) {
        message_count=0;
        $('.chat_ready').hide();
        $('.chat_dismiss').hide();
        $('.message_quantity').html(message_count);
        $('.message_quantity').hide();
    });

    /********************CHAT CONTAINER LOADED*********************/
    $('.chat_main').children().hide();
    $('.chat_main').mCustomScrollbar();
    $.ajax({
        url: 'https://www.vodafone.ua:8080/status',
        type: 'POST',
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        beforeSend: showLoader(),
        success: function (response) {
            if (response.chatended) {
                status.val('not-connected');
                chatDialog.mCustomScrollbar('destroy');
                chatReg.show();
                chatMessage.hide();
                chatAll.mCustomScrollbar();
                checkHeightMain('.chat_main_reg');
                $('.chat_container').show();
                $('.chat_ready').hide();
                $('.chat_dismiss').hide();
                $('.message_quantity').hide();
            } else {
                checkHeightMain('.chat_main_message');
                chatAll.mCustomScrollbar('destroy');
                chatReg.hide();
                $('.mCSB_container').html(' ');
                $('.chat_container').find('.mCSB_container').append(response.chatlog);
                $('.chat_main').mCustomScrollbar("update");
                status.val('connected');
                chatMessage.show();
                $('.indicator').show();
                setCoords();
                $('.chat_container').show();
                $('.chat_ready').hide();
                $('.chat_dismiss').hide();
                $('.message_quantity').hide();
                checkHeightMain('.chat_main_reg');
                checkHeightMain('.chat_main_message');
                checkHeightMain('.chat_main_rating');
                chatDialog.mCustomScrollbar();
                chatDialog.mCustomScrollbar("scrollTo", "bottom", {
                    scrollInertia: 1
                });
            }
            hideLoader();
        },
        complete: function () {
            refresh();
        }
    });
});