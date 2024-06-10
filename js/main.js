$(document).ready(function() {

    $('.accordion__item').click(function(){
        $(this).toggleClass('accordion__opened');
    });

    if(!device.mobile() && !device.tablet()){
        ParallaxScroll.init();
    }

    if(device.mobile() || device.tablet()){
        // Перемещаем элементы для мобил
        $('.yellow-widget').each(function(){
            var yellowWidgetIcons = $(this).find('.speakers-icons-mobile');
            $(this).find('.speakers-icons-desktop img').appendTo(yellowWidgetIcons);
        });

        $('.reg-button-mobile-move').appendTo('.hobbies-form');

        // Высота блока меню равная высоте экрана

/*        $(window).resize(function() {
            var windowHeight = $(window).height();
            $('.mobile .container-header .content').css('height', windowHeight);
            $('.tablet .container-header .content').css('height', windowHeight);
        });*/

        $(window).resize();

        // Меню на мобилах

        $('.menu-button').click(function() {
            $('.mobile .container-header .content').css('display', 'block');
            $('.mobile .menu-close').css('display', 'block');
        });

        $('.menu-close').click(function() {
            $('.mobile .container-header .content').css('display', 'none');
            $('.mobile .menu-close').css('display', 'none');
        });

        // Планшеты

        $('.menu-button').click(function() {
            $('.tablet .container-header .content').css('display', 'block');
            $('.tablet .menu-close').css('display', 'block');
        });

        $('.menu-close').click(function() {
            $('.tablet .container-header .content').css('display', 'none');
            $('.tablet .menu-close').css('display', 'none');
        });

        //Слайдер для мобил
        $('.yellow-widget-wrapper').bxSlider({
            mode: 'fade',
            slideMargin: 0,
            auto: false,
            minSlides: 1,
            maxSlides: 1,
            slideSelector: 'div.yellow-widget',
            touchEnabled: false,
            adaptiveHeight: true
        });
    }

    // Contest form

    jQuery(function($){
        $(".input-digits-contest").mask("99,9999");
    });

    $('.input-digits-contest').on('change', function() {
        if ($(this).val().length > 1){
           $(this).css({
               'background': '#FEF104',
               'color': '#000'
           });
        }
    });

    function contestClear() {
        $('.input-contest-group input').each(function() {
            $(this).val('');
        });
        $('#contest-full-name').val('');
        $('#contest-company').val('');
        $('.content-black-contest .checkbox').prop('checked', false);
    }
    
    $('#contestSend').click(function() {
        var answers = '';
        
        $('.input-contest-group input').each(function() {
            answers += $(this).val();
        });

        console.log(answers);

        var gift = $('.checkbox[name=contest-gift]:checked').val();

        function contestCheck(){
            if (answers == ',' || answers.length == 0){
                $('.error').html('Ошибка: Введите прогноз');
                $('.error-wrapper').css('display', 'block');
                $('.error-wrapper').animate({opacity: "hide"}, 4000);
            } else if ($('#contest-full-name').val() == ''){
                $('#contest-full-name').addClass('formError');
                $('.error').html('Ошибка: Введите имя');
                $('.error-wrapper').css('display', 'block');
                $('.error-wrapper').animate({opacity: "hide"}, 4000);
            } else if ($('#contest-company').val() == ''){
                $('#contest-company').addClass('formError');
                $('.error').html('Ошибка: Введите название компании');
                $('.error-wrapper').css('display', 'block');
                $('.error-wrapper').animate({opacity: "hide"}, 4000);
            } else if ($("#contestForm :checked").length < 1){
                $('.error').html('Ошибка: Выберите подарок');
                $('.error-wrapper').css('display', 'block');
                $('.error-wrapper').animate({opacity: "hide"}, 4000);
            } else {
                $.ajax({
                    type: 'POST',
                    url: 'http://rclub-event.ru/contest.php',
                    data: {
                        name: $('#contest-full-name').val(),
                        company: $('#contest-company').val(),
                        answer: answers,
                        gift: gift
                    },
                    success: function (data) {
                        contestPopup.open();
                        contestClear();
                    },
                    error: function (data) {
                        console.log(data);
                    }
                });
            }
        }

        contestCheck();
    });

    // SMOOTH SCROLL
    $('a[href^="#"]').click(function(){
        if(document.getElementById($(this).attr('href').substr(1)) != null) {
            $('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top }, 500);
        }
        return false;
    });

    $("#registrationForm :checkbox").click(function() {
        if($(":checked").length > 5) this.checked = false;
        $('.check-stat').html($(":checked").length);
    });
    
    // Registration
    $('#registrationButton').click(function() {
        var interests = [];

        $('.checkbox[name=interests]:checked').each(function(){
            interests.push($(this).val());
        });

        interests.push($('#other_hobby').val());

        //$('#registrationForm input').on('change', function() {
        //    $(this).removeClass('formError');
        //});

        function registrationClear(){
            $('#full_name').val('');
            $('#company').val('');
            $('#email').val('');
            $('#phone').val('');
            $('#other_hobby').val('');
            $('.hobbies-form .checkbox').prop('checked', false);
            $('.check-stat').html('0');
        }

        function formCheck(){
            if ($('#full_name').val() == ''){
                $('#full_name').addClass('formError');
                $('.error').html('Ошибка: Введите имя');
                $('.error-wrapper').css('display', 'block');
                $('.error-wrapper').animate({opacity: "hide"}, 4000);
            } else if ($('#company').val() == ''){
                $('#company').addClass('formError');
                $('.error').html('Ошибка: Введите название компании');
                $('.error-wrapper').css('display', 'block');
                $('.error-wrapper').animate({opacity: "hide"}, 4000);
            } else if (validateEmail($('#email').val()) == false){
                $('#email').addClass('formError');
                $('.error').html('Ошибка: Введите корректный email');
                $('.error-wrapper').css('display', 'block');
                $('.error-wrapper').animate({opacity: "hide"}, 4000);
            } else if ($('#phone').val() == ''){
                $('#phone').addClass('formError');
                $('.error').html('Ошибка: Введите корректный номер телефона');
                $('.error-wrapper').css('display', 'block');
                $('.error-wrapper').animate({opacity: "hide"}, 4000);
            } else if ($("#registrationForm :checked").length < 1){
                $('.error').html('Пожалуйста, выберите хотя бы одно увлечение из списка');
                $('.error-wrapper').css('display', 'block');
                $('.error-wrapper').animate({opacity: "hide"}, 4000);
            } else {
                $.ajax({
                    type: 'POST',
                    url: 'http://rclub-event.ru/register.php',
                    data: {
                        name: $('#full_name').val(),
                        company: $('#company').val(),
                        email: $('#email').val(),
                        mobile: $('#phone').val(),
                        interests: interests.join()
                    },
                    success: function (data) {
                        console.log(data);
                        var objectData = JSON.parse(data);

                        if (objectData.status == 1){
                            $('#registrationMessageTitle').text('Благодарим Вас за регистрацию.');
                            $('#registrationMessage').text('До встречи 15 сентября!');
                            registrationSuccessPopup.open();
                            registrationClear();
                        }

                        if(objectData.status == 0){
                            $('#registrationMessageTitle').text('Благодарим Вас!');
                            $('#registrationMessage').text('В ближайшее время мы свяжемся с Вами, чтобы подтвердить регистрацию.');
                            registrationSuccessPopup.open();
                            registrationClear();
                        }
                    },
                    error: function (data) {
                        console.log(data);
                    }
                });
            }
        }

        formCheck();
    });

    // Send Message

    $('.modal-form').on('submit', function(){
        var form = $(this);
        var speakerName = form.parent().find('.popup-name').text();
        var userName = form.find('.user_name').val();
        var userEmail = form.find('.user_email').val();
        var userQuestion = form.find('.user_question').val();
        console.log(speakerName);
        console.log(userName);
        console.log(userEmail);
        console.log(userQuestion);

        function sendMessage(){
            $.ajax({
                type: 'POST',
                url: 'http://rclub-event.ru/question.php',
                data: {
                    speaker: speakerName,
                    name: userName,
                    email: userEmail,
                    question: userQuestion
                },
                success: function (data) {
                    messagePopup.open();
                },
                error: function (data) {
                    console.log(data);
                }
            });
        }

        if(validateEmail(userEmail)) {
            sendMessage();
        } else {
            alert('Введите корректный email');
        }

        return false;
    });

});


function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

var registrationSuccessPopup = $('[data-remodal-id=registration-success]').remodal();
var messagePopup = $('[data-remodal-id=message-send]').remodal();
var contestPopup = $('[data-remodal-id=contestSend]').remodal();