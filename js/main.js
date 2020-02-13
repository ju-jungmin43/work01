    var currentIdx; // 현재 인덱스
    var total; // slide 총 수
    var timer = ''; // setInterval 
    var speed = 0;
    var wW = $(window).width();

$(document).ready(function(){
    console.log('main');
    philoSlide();
    sellersSlide();

    /* PHILOSOPHY */
    function philoSlide() {
        var $philosophy = $('.main_philosophy');
        var $philoSlide = $('.philo_slide');
        var $philoSlideImgW = $philoSlide.find('img').width();
        var $philoSlideImgH = $philoSlide.find('img').height();
    
        // resize 필요
        var $philoLong = $('.philo_slide_long')
        var $philoLongSlide = $philoLong.find('li');

        var $philoCont = $('.philo_slide_content');
        var $philoContSlide = $philoCont.find('li');
        
        // 1023 사라짐
        var $philoSquare = $('.philo_slide_square');
        var $philoSquareSlide = $philoSquare.find('li');
        
        var $philoBtn = $philosophy.find('.comm_nav_arrow');
        
        // console.log($philoSlideLiW);
        
        currentIdx = 0;
        var total = $philoLongSlide.length; // total 3
        
        var $this;
        var $thisW;
        var $thisH;
        $(window).on('resize', function() {
            $philoSlide.each(function(){
                $this = $(this).find('li');
                $thisW = Math.floor($this.width());
                $thisH = Math.floor($this.height());

                $(this).css({ width: $thisW , height: $thisH})
            });
        });
        $(window).trigger('resize')
        
    }
    
    
    
    
}); // END


function sellersSlide() {
    /* BEST SELLERS */
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

    function srartSellersSlide() {
        timer = setInterval(function(){
            nextIdx = (currentIdx + 1) % total;
            gotoSlide(nextIdx);
        }, 6300);
    };
    srartSellersSlide();

    function stopSellersSlide() {
        clearInterval(timer)
    }
    $bestSellers.on({
        mouseenter : stopSellersSlide,
        mouseleave : srartSellersSlide
    });

} // sellersSlide() END