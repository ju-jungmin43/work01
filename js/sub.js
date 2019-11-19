$(document).ready(function(){
    console.log('sub')

    /* sub1.html */
    var sectionIdx; // 버튼 순서
    var page; // section01 ~ section04
    var $philoBtn = $('.philo_nav_btn a');
    var $scrollDown = $('.sub1 .scroll_down a');
    var target;
    var targetIdx = 0;
    var $philoSection = $('.philo_section')

    $philoBtn.eq(0).addClass('active');
    $('.philo_container').scrollTop(0);
    
    $philoSection.each(function(index){
        $(this).on('mousewheel DOMMouseScroll', function(e){
            e.preventDefault();
            var delta = 0;
            // For IE
            if(!e) e = window.event;
            if(e.wheelDelta) delta = e.wheelDelta / 120; // IE/FireFox/Opera
            else if(e.detail) delta = -e.detail / 3 // Mozilla case

            var sectionTop = $(window).scrollTop();
            var sectionIdx = $($philoSection).eq(index);
            if(delta < 0){
                console.log(sectionTop)
                if($(sectionIdx).next().offset().top == undefined) return false;
                sectionTop = $(sectionIdx).next().offset().top;
            }else {
                console.log('up')
                sectionTop = $(sectionIdx).prev().offset().top;
            }
            $('body, html').stop().animate({scrollTop: sectionTop + '%'}, 1300)
        });
    });

    $philoBtn.on('click', function(){
        sectionIdx = $(this).parent().index();
        $philoBtn.removeClass('active').eq(sectionIdx).addClass('active');
        page = $('#section0' + (sectionIdx + 1));
        $('body,html').animate({scrollTop: $(page).offset().top}, 1300);
        return false;
    });
    $scrollDown.on('click', function(){
        if($('.sub1').length > 0){
            target = $(this).closest('.philo_section').next();
            targetIdx = target.index();
            $philoBtn.removeClass('active').eq(targetIdx).addClass('active');
            $('body,html').animate({scrollTop: $(target).offset().top}, 1300);
            return false;
        }
        
    })
    
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


    //     load : function(){
    //         if(skroll != null){
    //              skroll.refresh();
    //         }
    //     }
    // });


});


