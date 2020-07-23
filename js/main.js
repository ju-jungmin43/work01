// // 공통으로 쓰일 변수 const
// var currentIdx; // 현재 인덱스
// var total; // slide 총 수
var timer = ''; // setInterval 
var speed = 0;
// var wW; // window.width()

$(document).ready(function(){
    console.log('main.js');
    
    /* main_visual */
    keyvisualGallery();
    /* main_philosophy */
    philoGallery();
    /* main_sellers */
    sellersGallery();
    /* main_products */
    productsGallery();
    /* main_board */
    boardGallery();
    $(window).on('resize', function() {
        fullHeight();
    }).trigger('resize');

    /* index.html 전체적인 페이지 효과 */
    function fullHeight(){
        var wH = $(window).height();
        var containerH = $('.container').css('padding-top').replace(/[^-\d\.]/g, '');
        $('.--full_height').css({ height: (wH - containerH)});
    }

    // scroll_down
    $('.scroll_down').on('click', function() {
        var mainPhilosophyTop = $('.main_philosophy').offset().top;
        $('html, body').animate({scrollTop: mainPhilosophyTop}, 'slow');
    });
    
    var addScroll = 0;
    var wTop = $(window).scrollTop(); // 0
    $(window).on('scroll', function() {
        var windowTop = parseInt($(window).scrollTop());
        var windowH = parseInt($(window).innerHeight());
        $('.section').each(function() {
            var sectionTop = parseInt($(this).offset().top);
            var sectionH = parseInt($(this).innerHeight());
            // sectionTop >= 0 초기화할때 바로 mainOn해주기위해서!
            if((sectionTop >= 0) && (sectionTop + (sectionH)/4) < (windowTop + windowH)) {
                // $(this).addClass('mainOn');
            }
            $(this).addClass('mainOn');
        });
        // philosophy .philo_logo 스크롤 시에 transform: translate(20% -> 60%) 1024이하면 stop
        var $philoLogo = $('.philo_logo');
        var philoTop = $('.main_philosophy').offset().top;
        var philoH = $('.main_philosophy').innerHeight();
        if(wW > 1023) {
            if(((windowTop + windowH) > philoTop) && (windowTop < (philoTop + philoH))) {
                if(wTop < windowTop) {
                    // console.log('down')
                    addScroll -= 1.3;
                    $philoLogo.css({transform: 'translateX('+ addScroll +'%)'})
                } else {
                    // console.log('up')
                    addScroll += 1.3;
                    $philoLogo.css({transform: 'translateX('+ addScroll +'%)'})
                }
                wTop = windowTop;
            } else {
                $philoLogo.css({transform: 'translateX(-40%)'})
            }
        }

    }).trigger('scroll');
}); // END


/* sub5.html */
function boardGallery() {
    function boardNewsGallery() {
        var $boardNews = $('.board_content_news');
        var $boardNewsLi = $boardNews.find('li');
        var boardNewsLiTotal = $boardNewsLi.length;
        var timer = 0;
        var curIndex = 0;
        
        function newsAuto() {
            timer = setInterval(newsSlide, 6000);
        }
        newsAuto();
        function newsSlide() {
            // curIndex = startIndex;
            if(curIndex < (boardNewsLiTotal-1)) { // 0 ~ 9
                curIndex++;
            } else {
                curIndex = 0;
            }
            $boardNewsLi.removeClass('boardOn').eq(curIndex).addClass('boardOn');
        };
        newsSlide();
        $boardNewsLi.hover(function() {
            console.log('mouseenter');
            clearInterval(timer);
        }, function() {
            console.log('mouseleave');
            newsAuto();
        })
    }
    boardNewsGallery();
    function boardPrGallery() {
        var $boardPr = $('.board_content_pr');
        var $boardPrLi = $boardPr.find('li');
        var boardPrLiTotal = $boardPrLi.length;
        var timer = 0;
        var curIndex = 0;
        function prAuto() {
            timer = setInterval(prSlide, 6000);
        }
        prAuto();
        
        function prSlide() {
            if(curIndex < boardPrLiTotal-1) {
                curIndex++;
            } else {
                curIndex = 0;
            }
            $boardPrLi.removeClass('boardOn').eq(curIndex).addClass('boardOn');
        }
        prSlide();
        $boardPrLi.hover(function() {
            console.log('prMouseenter');
            clearInterval(timer);
        }, function() {
            console.log('prMouseleave');
            prAuto();
        });
    }
    boardPrGallery();
} // boardGallery END();

/* main_visual */
function keyvisualGallery() {
    var $visualSlide = $('.visual_slide');
    var $visualSlideItem = $visualSlide.find('.visual_slide_item');
    var $visualContentCell = $('.visual_content_cell');
    var $visualContentCellTxt = $visualContentCell.find('.inner').children();
    
    $('.visual_gallery').slick({
        fade: true,
        speed: 2500,
        arrows: true,
        prevArrow: $('#visualPrev'),
        nextArrow: $('#visualNext'),
        autoplay: false,
        autoplaySpeed: 7500,
        infinite: true
    })
    .on('init reInit beforeChange', function(event, slick, currentSlide, nextSlide) {
        $visualSlideItem.removeClass('visualOn');
        $visualSlide.eq(nextSlide).find($visualSlideItem).addClass('visualOn');
        
        $('.visual_content_cell > .inner > *.visualTxt').removeClass('visualTxt');
        $visualSlide.eq(nextSlide).find($visualContentCellTxt).each(function(i) {
            $(this).stop(true,false).delay(i * 160).queue(function() {
                $(this).addClass('visualTxt').dequeue();
            });
        });
        //currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
        // var currentIdx = (currentSlide ? currentSlide : 0) + 1;
        var $visualNavPage = $('.visual_nav_page').find('span');
        var visualSlideTotal = $visualSlide.length;
        if (nextSlide === 0) {
            $visualNavPage.text(1 + ' / ' + visualSlideTotal)
        } else {
            $visualNavPage.text((nextSlide + 1) + ' / ' + visualSlideTotal)
        }
    }); // slick End
    
    $visualSlide.eq(0).find($visualSlideItem).addClass('visualOn');
    $visualSlide.eq(0).find($visualContentCellTxt).addClass('visualTxt');
    
} // keyvisualGallery() END


/* main_philosophy */
function philoGallery() {
    $('.philo_slide_long').slick({
        prevArrow: $('#philoPrev'),
        nextArrow: $('#philoNext'),
        draggable: false,
        speed: 800,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 6500,
        asNavFor: '.philo_slide_content, .philo_slide_square',
        responsive: [{
            breakpoint: 540,
            settings: {
                draggable: true
            }
        }]
    });
    var $philoContent = $('.philo_slide_content');
    var $philoContentCell = $philoContent.find('.philo_content_cell');
    var $philoContentCellTxt = $philoContentCell.children();

    $('.philo_slide_content').slick({
        draggable: false,
        fade: true,
        arrows: false,
        speed: 800,
        infinite: true,
        asNavFor: '.philo_slide_long, .philo_slide_square'
    }).on('beforeChange', function(event, slick, currentSlide, nextSlide) {
        $('.philo_content_cell > *.philoTxt').removeClass('philoTxt');
        $philoContent.find($philoContentCellTxt).each(function(i) {
           $(this).stop(true, false).delay(i * 160).queue(function() {
                $(this).addClass('philoTxt');
            })
       })
    })

    $('.philo_slide_square').slick({
        draggable: false,
        arrows: false,
        speed: 800,
        infinite: true,
        asNavFor: '.philo_slide_long, .philo_slide_content'
    });
    $philoContentCellTxt.addClass('philoTxt');
} // philoGallery () END


/* main_sellers */
function sellersGallery() {
    var $bestSellers = $('.main_sellers');
    var $sellersImg = $('.sellers_img_item');
    var $sellersCont = $('.sellers_cell_txt');
    var $sellersBtn = $bestSellers.find('.comm_nav_arrow');
    var timer = 0;
    var currentIdx = 0;
    var total = $sellersImg.length;
    
    // 초기 CSS 설정
    $sellersImg.eq(currentIdx).addClass('sellers');
    $sellersCont.eq(currentIdx).children().addClass('sellers');
    
    function gotoSlide(index) {
        $('.sellers_img_item.sellers').removeClass('sellers');
        $sellersImg.eq(index).addClass('sellers');
        
        $sellersCont.children().removeClass('sellers');
        $sellersCont.eq(index).children().each(function(i){
            $(this).stop(true, false).delay(i * 200).queue(function(){
                $(this).addClass('sellers').dequeue();
            })
        });
        
        currentIdx = index;
        //[참고::delay after addClass in each loop] https://stackoverflow.com/questions/40450246/jquery-delay-after-addclass-in-each-loop
    }
    
    var nextIdx;
    var prevIdx;
    $sellersBtn.on('click', 'a', function(){
        nextIdx = (currentIdx + 1) % total;
        prevIdx = (currentIdx + (total - 1)) % total;
        if($(this).hasClass('comm_prev')) {
            gotoSlide(prevIdx);
        } else {
            gotoSlide(nextIdx);
        }
        return false;
    });
    
    function sellersAutoSlide() {
        timer = setInterval(function(){
            nextIdx = (currentIdx + 1) % total;
            gotoSlide(nextIdx);
        }, 6500);
    };
    sellersAutoSlide();
    function sellersStopSlide() {
        clearInterval(timer)
    }
    $bestSellers.on({
        mouseenter : sellersStopSlide,
        mouseleave : sellersAutoSlide
    });
    
} // sellersGallery() END


/* main_products */
function productsGallery() {
    var $proSlide = $('.products_slide');
    var $proSlideList = $proSlide.find('.products_slide_list');
    var proSlideListW;
    var $proBtn = $('.products_nav');
    var timer = 0;
    var speed = 800;
    
    $(window).on('resize', function(){
        proSlideListW = Math.floor($('.products_slide_list').width()); // resize 필요
    }).trigger('resize');

    $proBtn.on('click', 'a', function() {
        if($(this).hasClass('comm_next')) {
            proNextSlide();
        } else {
            proPrevSlide();
        }
    });
    
    function proNextSlide() {
        $proSlide.animate({left: -proSlideListW + 'px'}, speed, function() {
            $(this).append($(this).find('.products_slide_list').first());
            $(this).css({left :0})
        });
    }
    
    function proPrevSlide() {
        $proSlide.css({left: -proSlideListW + 'px'});
        $proSlide.prepend($('.products_slide_list').last());
        $proSlide.stop().animate({left: 0 }, speed);
        
        // jQuery를 사용해서 disabled 속성 변경 및 상태가져오기 (disabled, readonly 찾아보기!)
        // HTML form 작성방법, jQuery로 제어하는 방법
        // $('.prodcuts_nav .comm_prev').attr('disabled', true); // 설정
        // $proSlide.css({left: -proSlideListW});
        // $proSlide.prepend($('.products_slide_list').last());
        // $proSlide.stop().animate({left: 0}, speed, function(){
            //     $('.prodcuts_nav .comm_prev').attr('disabled', false); // 해체
            // })
        }
        function proAutoSlide() {
            timer = setInterval(function(){
                proNextSlide();
            }, 5000);
        }

        function proStopSlide() {
            clearInterval(timer);
        }
        
        $('.products_slide_list, .products_nav a').on({
            'mouseenter' : proStopSlide,
            'mouseleave' : proAutoSlide
        })
        
} // productsGallery() END   
