// const
var wH; // window height

/*-------------------------------------------------------------------
    sub1.html
    sub2.html
    sub4.html
    sub5.html
-------------------------------------------------------------------*/


$(document).ready(function() {
    console.log('sub.js')
    /* sub1.html */
    philoWrap();

    /* sub4.html */
    commuWrap();

    /* sub5.html */
    shopGallery();
}); // END


/*-------------------------------------------------------------------
    ## sub1.html
-------------------------------------------------------------------*/

function philoWrap() {
     var $philoContainer = $('.philo_container');
    var $philoSection = $('.philo_section');
    var $scrollDown = $('.philo_container .scroll_down > a');
    var $philoBtn = $('.philo_nav_btn'); // li
    var speed = 1000;
    
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
    var philoTotal = $philoSection.length; // 4
    var philoIdx = 0; // 버튼 순서
    $('html .sub1').on('mousewheel DOMMouseScroll', function(event) {
        if(!animating) {
            animating = true;
            var offsetTop = $philoSection.offset().top;
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
        $philoBtn.removeClass('philoBtn').eq(philoIdx).addClass('philoBtn');
        $philoContainer.animate({top: offsetTop}, speed, function() {
            animating = false;
        });
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
} //philoWrap() END


/*-------------------------------------------------------------------
    ## sub2.html
-------------------------------------------------------------------*/

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


/*-------------------------------------------------------------------
    ## sub4.html
-------------------------------------------------------------------*/

function commuWrap() {
    $('.form_kit_wrap').addClass('formOn');
    $('.form_kit_btn').find('a').addClass('formTitle');

    $('.form_btn').on('click', 'a', function() {
        var commuFormTop = $('.community_form_title').offset().top - $('#header').height();
        $('html, body').animate({scrollTop : commuFormTop}, 'slow'); 
        if($(this).parent().hasClass('form_kit_btn')) {
            $('.form_kit_wrap').addClass('formOn');
            $('.form_academy_wrap').removeClass('formOn');
        } else {
            $('.form_academy_wrap').addClass('formOn');
            $('.form_kit_wrap').removeClass('formOn')
        }
        $('.form_btn').find('a').removeClass('formTitle');
        $(this).addClass('formTitle');
        
        
        // reset
        $('input').val('');
        $('input[type="radio"]').prop('checked', false);
        $('input[type="checkbox"]').prop('checked', false);
        $('.requiredOk').removeClass('requiredOk')
        // .required_box_apply 초기화
        if($('.formOn .required_box_apply').css('display') === 'block') {
            $('.required_box_apply').css({display: 'none'})
        }
        return false;
    });


    // form_kit_wrap, form_academy_wrap 공통 변수
    var $requiredBox = $('.required_box');
    var flag = false;
    var mobileNum = '';
        // name, mobile, e-mail, date 확인
    function checkForm(user, regex) {
        if(user.val() === '' || !regex.test(user.val())) {
            user.next($requiredBox).addClass('requiredOk')
            user.focus();
            return false;
        } else {
            mobileNum = $('.formOn .user_mobile').val().replace(regex,'$1-$2-$3');
            $('.formOn .user_mobile').val(mobileNum);
            user.next($requiredBox).removeClass('requiredOk');
            return false;
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
            $(userCheck).parent().find($requiredBox).addClass('requiredOk');
            return false;
        } else {
            $(userCheck).parent().find($requiredBox).removeClass('requiredOk');
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
        // var regexMobile = /^[0-9]{2,3}[0-9]{3,4}[0-9]{4}$/; // 0000000000 만 받는다.
        // var regexMobile = /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}$/; // 000-000-0000 만 받는다.
        // var regexMobile = /(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/; // 하이픈안됨
        // var regexMobile = /^[0-9]+$/; // 숫자만 가능
        var regexMobile = /(^02.{0}|^01.{1}|[0-9]{3}?)-?([0-9]+)-?([0-9]{4})/; // 하이픈해도되고 안해됨
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
        
    });
            
            
    $('#apply_post02').on('click', function() {
        console.log('#02')
        // [Academy]정규표현식
        // name[required]
        var $userName02 = $('#name02');
        var regexName = /^[가-힣]+$/; 
        // mobile[required]
        var $userMobile02 = $('#mobile02')
        var regexMobile = /(^02.{0}|^01.{1}|[0-9]{3}?)-?([0-9]+)-?([0-9]{4})/;
        // email
        var $userEmail02 = $('#email02');
        // date[required]
        var $userDate = $('#datepicker');
        var regexDate = /^[0-9 \-]+$/;
        // var regex = // 숫자만
        // age[required]
        var $userAge = $('input[name="age"]');
        // text[required]
        var $userOpinion = $('#opinion');
        var regexOpinion = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|[~!@#$%^&*()_+|<>?:{}]+$/;
        // 한글 숫자 띄어쓰기
        // agree[required]
        // apply 총확인
        if(!flag) {
            checkForm($userOpinion, regexOpinion);
        }
        if(!flag) {
            checkForm($userDate, regexDate);
        }
        if(!flag) {
            checkForm($userMobile02,regexMobile);
        }
        if(!flag) {
            checkForm($userName02,regexName);
        }
        if(!flag) {
            checkedBox('#allcheck02');
            // flag = false;
        }
        if(!flag) {
            // radio
            if(!$userAge.is(':checked')) {
                $userAge.closest('fieldset').next($requiredBox).addClass('requiredOk');
            } else {
                console.log('check')
                $userAge.closest('fieldset').next($requiredBox).removeClass('requiredOk');
            }
        }
        if(!flag) {
            submitCheck('#required02');
        }
        flag = false;
    });

} // commuWrap() END


/*-------------------------------------------------------------------
    ## sub5.html
-------------------------------------------------------------------*/

function shopGallery() {
    var $shopSlide = $('.shop_slide'); // 높이고정
    var $shopSlideLi = $('.shop_slide_item');
    var shopSlideTotal = $shopSlideLi.length; // 6
    var curIndx = 0; // 현재슬라이드
    var shopSlideW; // 이미지 넓이
    var shopSlideH; // 이미지 높이
    var shopInterval;
    var speed = 600;
    var $shopNavArrow = $('.shop_nav_arrow');
    $shopNavArrow.on({
        mouseenter: function() {
            clearInterval(shopInterval);
        },
        mouseleave: function() {
            shopAuto();
        }
    },'a');
    
    $shopNavArrow.find('.shop_nav_next').click(shopNextSlide)
    $shopNavArrow.find('.shop_nav_prev').click(shopPrevSlide)

    function shopSetImg() {
        shopSlideH = Math.floor($shopSlideLi.height());
        shopSlideW = Math.floor($shopSlideLi.width());
        $shopSlide.css({height: shopSlideH});
        for(var i = 0; i < shopSlideTotal; i++) {
            if(i === curIndx) {
                $shopSlideLi.eq(i).css({left: 0});
            } else {
                $shopSlideLi.eq(i).css({left: shopSlideW});
            }
        }
    }
    function shopAuto() {
        shopInterval = setInterval(shopNextSlide, 7500);
    }
    shopAuto();

    function shopNextSlide() {
        $shopSlideLi.eq(curIndx).stop(true).animate({left: -shopSlideW}, speed, function() {
            // 안해주면 한바퀴 돈 후, 왼쪽에서 오른쪽으로 이미지가 이동한다.(-에서 0로)
            $(this).css({left: shopSlideW});
        });
        if(curIndx < (shopSlideTotal-1)) {
            // 5
            curIndx++;
        } else {
            curIndx = 0;
        }
        $shopSlideLi.eq(curIndx).stop().animate({left: 0}, speed);
    }
    function shopPrevSlide() {
        $shopSlideLi.eq(curIndx).stop().animate({left: shopSlideW}, speed);
        if(curIndx === 0) {
            curIndx = (shopSlideTotal-1);
        } else {
            curIndx--;
        }
        $shopSlideLi.eq(curIndx).css({left: -shopSlideW}).stop(true).animate({left: 0}, speed)
    }

    $(window).resize(function() {
        shopSetImg();
    }).trigger('resize'); // resizeEnd
} // shopGallery() END