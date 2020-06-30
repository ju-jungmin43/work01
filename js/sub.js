// const
var wH; // window height

$(document).ready(function(){
    console.log('sub.js')
   
    philoWrap();






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
                // $('#footer.footerFixed').removeClass('footerFixed');
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




  