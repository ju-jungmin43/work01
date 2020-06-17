$(document).ready(function(){

    // 본문바로가기
    $('#skipNav').focusin(function() {
        $(this).animate({top: '0px'}).css({display: 'block'})
    }).focusout(function() {
        $(this).css({top: '-50px', display: 'none'});
    });

    // focusin focusout
    // $('.main_menu_list').focusin(function() {
    //     $(this).find('> ul').css({display: 'block'});
    //     $(this).find('.mo_menu_list').css({color: '#c0c79c'})
    // });
    // $('.main_menu_list ul li:last-child').focusout(function() {
    //     $('.mo_menu_list').css({color: '#222'});
    //     $(this).parent().css({display: 'none'})
    // })


    console.log('common.js');

    scrollHeader();
    scrollTop();
    
    $(window).on('resize', function(){
        var wW = $(window).width();
        var wH = $(window).height();
        fullHeight();

        if(wW > 1023) {
            pcMenu();
        } else {
            moMenu();
        }
    }).trigger('resize');
    
    function scrollHeader(){
        var $header = $('#header');
        var $window = $(window);
        $window.on('scroll', function(){
            var wTop = $window.scrollTop();
            if( wTop > $header.height() ){
                $header.addClass('fixed');
            } else {
                $header.removeClass('fixed');
            }
        });
    }
    function scrollTop() {
        var $window = $(window);
        var $document = $(document);
        var $footer = $('#footer');
        var $scrollTop = $('.scroll_top');
        
        $scrollTop.on('click', function(){
            $('html, body').stop().animate({scrollTop : 0}, 'slow');
        });
        
        $window.on('scroll', function() {
            var wTop = $window.scrollTop(); 
            if( wTop < $document.height() - $window.height() - $footer.height() - ($scrollTop.height()*2) ){
                $scrollTop.addClass('fixed');
            } else {
                $scrollTop.removeClass('fixed');
            }
            if( wTop < $window.height() ) {
                $scrollTop.addClass('hide');
            } else {
                $scrollTop.removeClass('hide')
            }
        }).trigger('scroll');
    }
    
    function fullHeight(){
        wW = $(window).width();
        wH = $(window).height();
        var containerH = $('.container').css('padding-top').replace(/[^-\d\.]/g, '');
        
        /* main_page */
        $('.--full_height').css({ height: (wH - containerH)});
        
        // resizeMenu(wW);
        
    }
    
    
    function pcMenu(){
        
        
        $('.main_menu_list').off('mouseenter mouseleave');

        $('.main_menu_list').on({
            'mouseenter focusin': function() {
                $(this).find('> ul').css({display: 'block'});
                $(this).find('> a').addClass('navFocus');
            },
            mouseleave: function() {
                $(this).find('> ul').css({display: 'none'});
                $(this).find('> a').removeClass('navFocus');
            }
        });
        
     
        
        $('.main_menu a').off('click');


        // moMenu() init
        $('.nav_mo_menu').css({ right: '-240px', visibility: 'visible'});
        $('.nav_mo_close').css({left: '0', visibility: 'hidden'})
        $('.main_menu_list ul').css({ display: 'none'});
        $('.nav_mo_dim').css({display: 'none'});
       


        $('.main_menu_list ul > li:last-child').focusout(function() {
            $('.mo_menu_list').removeClass('navFocus');
            $(this).parent().css({display: 'none'});
        })

     } // pcMenu()
 
     $('.lang_select').on('click', function() {
         if($(this).next('ul').hasClass('langOn')){
            $(this).find('i').removeClass('langOn')
            $('.lang_list.langOn').removeClass('langOn')
            // $('.lang_list').removeClass('langOn');
        } else {
            $(this).find('i').addClass('langOn')
            $(this).next('ul').addClass('langOn');
        }
         return false;
     }).focus(function(e) {
         console.log(e.type)
         $('.lang_list').addClass('langOn');
     });;
    
    function moMenu(){
        $('.main_menu a').off('click');

        $('.nav_mo_btn').on('click', 'a', function() {
            console.log('click')
            $('.nav_mo_menu').css({ right: 0, visibility: 'visible'});
            $('.nav_mo_close').css({ left: '-50px', visibility: 'visible'});
            $('.nav_mo_dim').css({display: 'block'}).animate({opacity: 1}, 600)
        });
        
        $('.nav_mo_close, .nav_mo_dim').on('click', function() {
            $('.nav_mo_menu').css({ right: '-240px', visibility: 'hidden'});
            $('.nav_mo_close').css({left: '0', visibility: 'hidden' })
            $('.nav_mo_dim').css({display: 'none'});
  
        });
        
        
        $('.main_menu a').on('click', function() {
            var $thisNext = $(this).next();
            if($thisNext.is('ul') && ($thisNext.is(':visible'))) {
                console.log('up')
                $(this).next().slideUp();
                return false;
            }
            if($thisNext.is('ul') && !($thisNext.is(':visible'))) {
                console.log('down');
                $('.main_menu ul').not($(this).next().parentsUntil('.main_menu')).slideUp();
                $(this).next().slideDown();
            }
            return false;
        })
        $('.main_menu_list').off('mouseenter mouseleave');


    } // moMenu()

    /* search_pop form */
    var $searchForm = $('.search_form');
    var $searchInput = $('#searchInput');
    var $searchLabel = $('.search_form label');
    var $searchIcon = $('button[name="search_icon"]');
    var $searchPopup = $('.search_popup');
    var $search = $('.search');
    var $searchClose = $('.search_popup_close');

    $search.on('click', function(){
        $searchPopup.animate({ opacity : 1 }, 400).css({ display: 'block'});
    });
    $searchClose.on('click', function(){
        $searchPopup.animate({ opacity: 0 }, 400).css({ display: 'none'});;
    })

    $searchInput.on('keyup',function(){
        if( $(this).val() === '' ){ // 공백
            $searchForm.removeClass('active');
            $searchLabel.removeClass('active');
            $searchIcon.css({ color: '#999'})
            
        } else {
            $searchForm.addClass('active');
            $searchLabel.addClass('active');
            $searchIcon.css({ color: '#222'})
        }
    });

    $searchInput.on('keydown', function(){
        $searchForm.addClass('active');
        $searchLabel.addClass('active');
    });
    
    $searchInput.val('');

}); // END
