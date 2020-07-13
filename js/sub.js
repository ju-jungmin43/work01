// const
var wH; // window height

$(document).ready(function(){
    console.log('sub.js')
   
    philoWrap();

    $('.form_kit_wrap').addClass('formOn');
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

  
        // [Kit]정규표현식

        // apply 총확인
        var inputVal = $('input').val();
        var formApply = $('#apply_post01');

        formApply.click(function() {
            // name[required]
            var regexName = /^[가-힣]+$/; // ㄱㄴㄷ.. , 띄어쓰기 불가능.
            var userName = $('#name01');
           
            // mobile[required]
            var regexMobile = /^[0-9]{2,3}[0-9]{3,4}[0-9]{4}$/; // 0000000000 만 받는다.
            // var regexMobile = /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}$/; // 000-000-0000 만 받는다.
            // var regexMobile = /^[0-9]+$/; // 숫자만 가능
            var userMobile = $('#mobile');
            
            // email[required]
            var regxpEmail = /^[a-z0-9_+.-]+@([a-z0-9-]+\.)+[a-z0-9]{2,4}$/; // 
            var userEmail01 = $('#email01');
            // messages
            var userMessage01 = $('#message01');
            // address 3개 모두다[required]
            var userAddress = $('.address');
            var regexAddress = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|~!@\#$%<>^&*\()-=+_\s]+$/;
            // ==> 빈공간이면 return false;
            // agree[required]
            var allCheck = $('.all_check_img');
            
            var flag = false;

            function checkForm(user, regex) {
                if(user.val() === '' || !regex.test(user.val())) {
                    user.next('.required_box').css({display: 'block'});
                    user.attr('value', '')
                    user.focus();
                } else {
                    user.next('.required_box').css({display: 'none'});
                    user.attr('value', 'Y')
                }
                flag = false;
            }
            
            function checkAddress(addr,regex) {
                for(var i = 0; i < addr.length; i++) {
                    var allAddr = $(addr[i]);
                    if(allAddr.val() === '' || !regex.test(allAddr.val())) {
                        allAddr.next('.required_box').css({display: 'block'});
                        allAddr.next().next().find('.required_box').css({display: 'block'});
                        allAddr.attr('value', '');
                    } else {
                        allAddr.next('.required_box').css({display: 'none'});
                        allAddr.next().next().find('.required_box').css({display: 'none'});
                        allAddr.attr('value', 'Y');
                   }
                }
                flag = false;
            }

            if(!flag) {
                checkAddress(userAddress, regexAddress);
            }
            if(!flag) {
                checkForm(userEmail01,regxpEmail)
            }
            if(!flag) {
                checkForm(userMobile,regexMobile)
            }
            if(!flag) {
                checkForm(userName,regexName)
            }

            
            if(!$('#allcheck01').prop('checked')) {
                $('.required_check').find('.required_box').css({display: 'block'});
                $('#allcheck01').attr('value', '')
            } else {
                $('.required_check').find('.required_box').css({display: 'none'});
                $('#allcheck01').attr('value', 'Y');
            }
         
            
           $('.formOn .required_box').not('.required_box_apply').each(function() {
               if($(this).css('display') === 'none') {
                   $('.required_box_apply').css({display: 'none'})
                } else {
                    $('.required_box_apply').css({display: 'block'})
               }
           });
           
        });
        

        
        // [Academy]정규표현식
        // name[required]
        // mobile[required]
        // email
        var userEmail02 = $('#email02').val();
        // date[required]
        var userDate = $('#date02');
        // age[required]
        var userAge = $('.age_radio')
        // text[required]
        var userOpinion = $('#opinion').val();
        // agree[required]
        // apply 총확인




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