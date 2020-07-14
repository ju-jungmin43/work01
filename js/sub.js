// const
var wH; // window height

$(document).ready(function() {
    console.log('sub.js')
   
    philoWrap();

    // $('.form_kit_wrap').addClass('formOn');
    $('.form_academy_wrap').addClass('formOn');
    $('.form_kit_btn').addClass('formTitle').find('a').addClass('formTitle');

    $('.form_btn').on('click', 'a', function() {
        var commuFormTop = $('.community_form_title').offset().top - $('#header').height();
        // $('html, body').animate({scrollTop : commuFormTop}, 'slow'); 
        if($(this).parent().hasClass('form_kit_btn')) {
            $('.form_kit_wrap').addClass('formOn');
            $('.form_academy_wrap').removeClass('formOn');
        } else {
            $('.form_kit_wrap').removeClass('formOn');
            $('.form_academy_wrap').addClass('formOn');
        }
        $('.form_btn a.formTitle').removeClass('formTitle');
        $('.form_btn.formTitle').removeClass('formTitle')
        $(this).addClass('formTitle');
        $(this).parent().addClass('formTitle');

        $('input').val('');
        return false;
    })

// form_kit_wrap, form_academy_wrap 공통 변수
var $requiredBox = $('.formOn .required_box');
var flag = false;

    // form_kit_wrap name, mobile, e-mail 확인
   function checkForm(user, regex) {
        if(user.val() === '' || !regex.test(user.val())) {
            user.next($requiredBox).addClass('requiredOk')
            user.focus();
            console.log(user.next())
            return false;
        } else {
            user.next($requiredBox).removeClass('requiredOk');
        }
    }
    // form_kit_wrap 주소 확인
    function checkAddress(addr,regex) {
        for(var i = 0; i < addr.length; i++) {
            var allAddr = $(addr[i]);
            if(allAddr.val() === '' || !regex.test(allAddr.val())) {
                allAddr.next($requiredBox).addClass('requiredOk');
                allAddr.next().next().find($requiredBox).addClass('requiredOk');
                return false;
            } else {
                allAddr.next($requiredBox).removeClass('requiredOk');
                allAddr.next().next().find($requiredBox).removeClass('requiredOk');
            }
        }
    }
    // checkbox 체크 확인
    function checkedBox(userCheck) {
        if(!$(userCheck).prop('checked')) {
            $('.required_check').find($requiredBox).addClass('requiredOk');
            return false;
        } else {
            $('.required_check').find($requiredBox).removeClass('requiredOk');
        }
    }
    // submit button.required_box_apply 체크 확인
    function submitCheck(requiredBoxApply) {
        if($('.formOn .required_box').not('.required_box_apply').hasClass('requiredOk')) {
            $(requiredBoxApply).css({display: 'block'});
            return false;
        } else {
            $(requiredBoxApply).css({display: 'none'});
        }
    }


        $('#apply_post01').click(function() {
            console.log('#01')
            // name[required]
            var regexName = /^[가-힣]+$/; // ㄱㄴㄷ.. , 띄어쓰기 불가능.
            var $userName01 = $('#name01');
           
            // mobile[required]
            var regexMobile = /^[0-9]{2,3}[0-9]{3,4}[0-9]{4}$/; // 0000000000 만 받는다.
            // var replaceMobile = /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}$/; // 000-000-0000 만 받는다.
            // var regexMobile = /^[0-9]+$/; // 숫자만 가능
            var $userMobile01 = $('#mobile');

            // email[required]
            var regexEmail = /^[a-z0-9_+.-]+@([a-z0-9-]+\.)+[a-z0-9]{2,4}$/; // 
            var $userEmail01 = $('#email01');
            // messages
            var userMessage01 = $('#message01');
            // address 3개 모두다[required]
            var $userAddress = $('.address');
            var regexAddress = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|~!@\#$%<>^&*\()-=+_\s]+$/;

            if(!flag) {
                checkAddress($userAddress, regexAddress);
                flag = false;
            }
            if(!flag) {
                checkForm($userEmail01,regexEmail)
                flag = false;
            }
           if(!flag) {
               checkForm($userMobile01,regexMobile)
               flag = false;
            }
            if(!flag) {
                checkForm($userName01,regexName)
                flag = false;
            }
            if(!flag) {
                checkedBox('#allcheck01');
                flag = false;
            }
            submitCheck('#required01');
            
            return false;
        });
        
        
        $('#apply_post02').on('click', function() {


            console.log('#02')
            // [Academy]정규표현식
            // name[required]
            var $userName02 = $('#name02');
            var regexName = /^[가-힣]+$/; 
            // mobile[required]
            var $userMobile02 = $('#mobile02')
            var regexMobile = /^[0-9]{2,3}[0-9]{3,4}[0-9]{4}$/;
            // email
            var $userEmail02 = $('#email02');
            // date[required]
            var $userDate = $('#date02');
            // var regex = // 숫자만
            // age[required]
            var $userAge = $('input[name="age"]');
            // text[required]
            var $userOpinion = $('#opinion');
            // var regexOpinion = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|~!@\#$%<>^&*\()-=+_\s]+$/;
            // 한글 숫자 띄어쓰기
            var regexOpinion = /^[0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣a-zA-Z\s]+$/;
            // agree[required]
            // apply 총확인


            // textarea 엔터가 적용안됨.regexOpinion 특수문자 포함시키기
           

            if(!flag) {
                checkForm($userOpinion, regexOpinion);
                // var str = $('input[type="textarea"]').val();
                // str = str.replace(/(?:\r\n|\r|\n)/g, '<br />');
                // $('input[type="textarea"]').html(str);
                // flag = false;
            }
            if(!flag) {
                checkForm($userMobile02,regexMobile)
            }
            if(!flag) {
                checkForm($userName02,regexName)
            }
            if(!flag) {
                checkedBox('#allcheck02');
                flag = false;
            }
            // radio
            // if(!$userAge.is(':checked')) {
            //     $userAge.parents().find($requiredBox).addClass('requiredOk');
            //     return false;
            // } else {
            //     $userAge.parents().find($requiredBox).removeClass('requiredOk');
            // }
            submitCheck('#required02');
            return false;
        });




}); // END   

function philoWrap() {
     var $philoContainer = $('.philo_container');
    var $philoSection = $('.philo_section');
    var $scrollDown = $('.philo_container .scroll_down > a');
    var $philoBtn = $('.philo_nav_btn'); // li
    var speed = 600;
    
    /* 초기화 */
    $philoSection.css({top: 0});
    $philoBtn.eq(0).addClass('philoBtn');
    
    $(window).on('resize', function() {
        wH = $(window).height();
        philoResize();
    }).trigger('resize')
    
    function philoResize() {
        var philoT = (-1) * philoIdx * wH;
        $('.--full_height').css({height: wH});
        $('.--full_height_scroll').css({height: wH , top: philoT});
    }

    // var wH = $(window).height(); // resize가 실시간을 안되므로 상수로 선언해준다. 그럼 resize해도 실시간으로 움직일수 있음
    var animating = false;
    var philoIdx = 0; // 버튼 순서
    var philoTotal = $philoSection.length; // 4
    $('html .sub1').on('mousewheel DOMMouseScroll', function(event) {
        if(!animating) {
            animating = true;
            var offsetTop = $philoSection.offset().top;
            console.log('scroll :: ', wH, offsetTop)
            if(event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {
                // console.log(philoIdx, 'up')
                if(0 < philoIdx) { // 더이상 up 스크롤 방지
                    if($('#footer').hasClass('footerFixed')) {
                        $('#footer').removeClass('footerFixed');
                    } else {
                        philoIdx--;
                        offsetTop += wH;
                    }
                }
            } else {
                // console.log(philoIdx, 'down')
                if(philoIdx < (philoTotal - 1)) { // 0 1 2 더이상스크롤방지
                    philoIdx++;
                    offsetTop -= wH;
                } else {
                    $('#footer').addClass('footerFixed');
                }
            }
        }
        $philoContainer.animate({top: offsetTop}, speed, function() {
            animating = false;
        });
        
        if(philoIdx < philoTotal) {
            $philoBtn.removeClass('philoBtn').eq(philoIdx).addClass('philoBtn');
        }
    })
    
    // [참고] https://stackoverflow.com/questions/8189840/get-mouse-wheel-events-in-jquery
    
    $philoBtn.on('click', 'a', function() {
        // var philoIdx 를 해주면 클릭 후 스크롤을 하면 philoIdx를 못찾는다. 그러므로 btn 클릭하면 li인덱스를 philoIdx에 할당해준다.
        philoIdx = $(this).parent('li').index();
        $philoBtn.removeClass('philoBtn').eq(philoIdx).addClass('philoBtn');
        philoT = (-1) * philoIdx * wH;
        $philoContainer.animate({ top: philoT }, speed);
        $('#footer.footerFixed').removeClass('footerFixed');
        return false;
    });


    $scrollDown.on('click focus', function() {
        philoIdx++;
        philoT = (-1) * philoIdx * wH;
        $philoContainer.animate({ top: philoT}, speed);
        $philoBtn.removeClass('philoBtn').eq(philoIdx).addClass('philoBtn');
        return false;
    });
}
   





/* sub2.html */
$('.sub2').on('resize', Sub2skroll);

function Sub2skroll(){
    if ( $(window).width() <= 1023 ) {
        skrollr.init().destroy();
    } else {
        skrollr.init({
        smoothScrolling: false,
        forceHeight: false
        });
    }
}      


/* sub4.html */