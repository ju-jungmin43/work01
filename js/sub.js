$(document).ready(function(){
    console.log('sub')

    /* sub1.html */
    var $philoSection = $('.philo_section')
    var philoTotal = $philoSection.length;
    var $scrollDown = $('.philo_container .scroll_down > a');
    var $philoBtn = $('.philo_nav_btn'); // li
    var philoIdx = 0; // 버튼 순서
    var wH;
    var containerH;
    var philoT; // 높이지정
    var speed = 500;
    var flag = false;

    $(window).on('resize', function() {
        philoResetInit();
    }); // resize;

    philoResetInit();
    philoBtnClick();
    piloScrollMove();


    function philoResetInit() {
        wH = $(window).height();
        containerH = $('.container').css('padding-top').replace(/[^-\d\.]/g, '');
        philoT = (-1) * philoIdx * wH;
        $('.--full_height').css({ height: (wH - containerH) , top: philoT });
        $philoBtn.removeClass('philobtn').eq(philoIdx).addClass('philobtn');
        // $philoSection.css({width: $(window).width(), height: $(window).height()})
    }
    
    function philoBtnClick() {
        $philoBtn.on('click', 'a', function() {
            philoIdx = $(this).parent('li').index();
            $philoBtn.removeClass('philobtn').eq(philoIdx).addClass('philobtn');
            philoT = (-1) * philoIdx * wH;
            $philoSection.animate({ top: philoT }, speed);
            return false;
        });
    
        $scrollDown.on('click', function() {
            philoIdx++;
            philoT = (-1) * philoIdx * wH;
            $philoSection.animate({ top: philoT}, speed);
            $philoBtn.removeClass('philobtn').eq(philoIdx).addClass('philobtn');
        });    
    }

    function piloScrollMove() {
        $('html .sub1').on('mousewheel DOMMouseScroll', function(e) {
            if(flag === false) {
                flag = true;
                var offsetTop = $philoSection.offset().top;
                if(e.originalEvent.WheelDelta > 0 || e.originalEvent.detail < 0) {
                    console.log('up')
                    if(philoIdx > 0) {
                        philoIdx--;
                        offsetTop = offsetTop + wH;
                    }
                } else if(e.originalEvent.WheelDelta < 0 || e.originalEvent.detail > 0) {
                    console.log('down')
                    if(philoIdx < (philoTotal-1)) { // 4
                        philoIdx++;
                        offsetTop = offsetTop - wH;
                    }
                }
            }
            $philoSection.animate({ top: offsetTop}, speed, function() {
                flag = false;
            })
            $philoBtn.removeClass('philobtn').eq(philoIdx).addClass('philobtn');
        })
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
}); // END


