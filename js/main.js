// 공통으로 쓰일 변수 const
var currentIdx; // 현재 인덱스
var total; // slide 총 수
var timer = ''; // setInterval 
var speed = 0;
var wW; // window.width()

$('.slick-current, .slick-active').css({display: 'block', position: 'absolute', left: '0px'})

$(document).ready(function(){

    /* BEST SELLERS */
    sellersSlide();
    /* RECOMMEND PRODUCTS */
    productsSlide();
    
    // scroll_down
    $('.scroll_down').on('click', function() {
        var mainPhilosophyTop = $('.main_philosophy').offset().top;
        $('html, body').animate({'scrollTop': mainPhilosophyTop}, 800);
    });


    /* PHILOSOPHT */

  
    $('.visual_gallery').slick({
        fade: true,
        speed: 1000,
        arrows: true,
        prevArrow: $('#visualPrev'),
        nextArrow: $('#visualNext'),
        autoplay: false,
        autoplaySpeed: 3000,
        dots: false,
        infinite: true
    }).on('beforeChange', function(event, slick, currentSlide, nextSlide) {
        console.log();
    });

}); // END



/* RECOMMEND PRODUTS */
function productsSlide() {
    var $proSlide = $('.products_slide');
    var $proSlideList = $proSlide.find('.products_slide_list');
    var proSlideListW;
    var $proBtn = $('.products_nav');

    speed = 800;
    
    $(window).on('resize', function(){
        proSlideListW = Math.floor($('.products_slide_list').width()); // resize 필요
    }); // resize
    
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
        
} // produtsSlide() END   


/* BEST SELLERS */
function sellersSlide() {
    var $bestSellers = $('.main_sellers');
    var $sellersImg = $('.sellers_img_item');
    var $sellersCont = $('.sellers_cell_txt');
    var $sellersBtn = $bestSellers.find('.comm_nav_arrow');

    currentIdx = 0;
    total = $sellersImg.length;

    // 초기 CSS 설정
    $sellersImg.eq(currentIdx).addClass('sellers');
    $sellersCont.eq(currentIdx).children().addClass('sellers');

    function gotoSlide(index) {
        $sellersImg.removeClass('sellers').eq(index).addClass('sellers');

    $sellersCont.children().removeClass('sellers');
    $sellersCont.eq(index).children().each(function(i){
        $(this).delay(i * 200).queue(function(){
            $(this).addClass('sellers')
        }).stop();
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
        }, 5000);
    };

    function sellersStopSlide() {
        clearInterval(timer)
    }
    $bestSellers.on({
        mouseenter : sellersStopSlide,
        mouseleave : sellersAutoSlide
    });

} // sellersSlide() END