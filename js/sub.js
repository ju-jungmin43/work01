$(document).ready(function(){
    console.log('sub')

    
    $(window).on('resize', function() {
        philoResize();
    }); // resize;
    
    
    
    /* sub1.html */
    var $philoContainer = $('.philo_container');
    var $philoSection = $('.philo_section');
    var $scrollDown = $('.philo_container .scroll_down > a');
    var $philoBtn = $('.philo_nav_btn'); // li
    var speed = 500;
    
    $('#container').addClass('--full_height');
    $('.philo_section').removeClass('--full_height');
    $philoBtn.eq(0).addClass('philoBtn');


    function philoResize() {
        var wH = $(window).height();
        var containerH = $('.container').css('padding-top').replace(/[^-\d\.]/g, '');
        var philoT = (-1) * philoIdx * wH;
        $('.--full_height').css({ height: (wH - containerH) , top: philoT });
        $philoBtn.removeClass('philobtn').eq(philoIdx).addClass('philobtn');
        // $philoSection.css({width: $(window).width(), height: $(window).height()})
    }
    
    $philoBtn.on('click', 'a', function() {
        philoIdx = $(this).parent('li').index();
        $philoBtn.removeClass('philobtn').eq(philoIdx).addClass('philobtn');
        philoT = (-1) * philoIdx * wH;
        $philoContainer.animate({ top: philoT }, speed);
        return false;
    });
    
    $scrollDown.on('click', function() {
        philoIdx++;
        philoT = (-1) * philoIdx * wH;
        $philoContainer.animate({ top: philoT}, speed);
        $philoBtn.removeClass('philobtn').eq(philoIdx).addClass('philobtn');
        return false;
    });    
    
    var animating = false;
    var philoIdx = 0; // 버튼 순서
    var philoTotal = $philoSection.length;
    $('html, body').on('mousewheel DOMMouseScroll', function(event) {
            if(!animating) {
                animating = true;
                var offsetTop = $philoSection.offset().top;
                if(event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {
                    console.log(philoIdx, 'up')
                    if(0 < philoIdx) { // 더이상 up 스크롤 방지
                        if(philoIdx === philoTotal) {
                            philoIdx = (philoTotal - 1);
                            $('#footer').removeClass('footerFixed')
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
                        philoIdx = 4;
                    }
                }
            }
            $philoContainer.animate({ top: offsetTop}, speed, function() {
                animating = false;
            });

            if(philoIdx < philoTotal) {
                $philoBtn.removeClass('philoBtn').eq(philoIdx).addClass('philoBtn');
            }
        })

        // [참고] https://stackoverflow.com/questions/8189840/get-mouse-wheel-events-in-jquery

}); // END


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



