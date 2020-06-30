// const
var wW, wH;


$(document).ready(function() {
    console.log('common.js');

    var $header = $('#header');
    var $document = $(document);
    var $window = $(window);
    var $footer = $('#footer');
    var $scrollTop = $('.scroll_top');

    // 본문바로가기
    $('#skipNav').focusin(function() {
        $(this).animate({top: '0px'}).css({display: 'block'})
    }).focusout(function() {
        $('#skipNav').css({top: '-50px', display: 'none'});
    });


    $window.on('resize', function(){
        wW = $window.width();
        wH = $window.height();

        navMenu();
    }).trigger('resize');



    $scrollTop.on('click', function(){
        $('html, body').stop().animate({scrollTop : 0}, 'slow');
    });

    $window.on('scroll', function() {
        var wTop = $window.scrollTop();
        if(wTop > $header.height()) {
            $header.addClass('headerFixed');
        } else {
            $header.removeClass('headerFixed');
        }

        // scroll_top
        if( wTop < $document.height() - $window.height() - $footer.height() - ($scrollTop.height()*2) ){
            $scrollTop.addClass('scrollTopFixed');
        } else {
            $scrollTop.removeClass('scrollTopFixed');
        }
        if(wTop < $window.height()) {
            $scrollTop.addClass('scrollTopHide');
        } else {
            $scrollTop.removeClass('scrollTopHide');
        }

    }).trigger('scroll');;
    
        

    
    function navMenu() {
        var $mainMenu = $('.main_menu');
        var $mainMenuList = $mainMenu.find('.main_menu_list');
        var $navMoBtn = $('.nav_mo_btn');
        var $navMoMenu = $('.nav_mo_menu');
        var $navMoClose = $('.nav_mo_close');
        var $navMoDim = $('.nav_mo_dim');
        var $langSelect = $('.lang_select');
        var $langList = $langSelect.next('.lang_list');

        
        function navInit(moMenu) {
            $navMoMenu.css({ right: '-240px', visibility: moMenu});
            $navMoClose.css({left: '0', visibility: 'hidden'})
            $navMoDim.css({display: 'none'});
            $mainMenuList.find('ul').css({display: 'none'});
        }
        
        
        if(wW > 1023) {
            // PcMenu
            // console.log('pc')
            
            // PcMenu event init
            $mainMenu.find('a').off('click');
            $mainMenuList.off('mouseenter focusin mouseleave');
            navInit('visible');
            

            $mainMenuList.on({
                'mouseenter focusin': function() {
                    $(this).find('> ul').css({display: 'block'});
                    $(this).find('> a').addClass('navFocus');
                },
                'mouseleave': function() {
                    $(this).find('> ul').css({display: 'none'});
                    $mainMenuList.find('> a').removeClass('navFocus');
                }
            });

            
            $mainMenuList.find('ul').find('li:last-child').focusout(function() {
                $('.mo_menu_list').removeClass('navFocus');
                $(this).parent().css({display: 'none'});
            });

        } else {
            // MobileMenu
            // console.log('mobile');

            // MobileMenu event init
            $navMoBtn.off('click');
            $mainMenu.find('a').off('click');
            $mainMenuList.off('mouseenter focusin mouseleave');
            $('.nav_mo_close, .nav_mo_dim').off('click'); 

            $('.nav_mo_close, .nav_mo_dim').on('click', function() {
                navInit('hidden');
            });


            $navMoBtn.on('click', 'a', function() {
                $navMoMenu.css({ right: 0, visibility: 'visible'});
                $navMoClose.css({ left: '-50px', visibility: 'visible'});
                $navMoDim.css({display: 'block'}).animate({opacity: 1}, 600)
            });
            

            $mainMenu.find('a').on('click', function() {
                var _mainMenuNext = $(this).next();
                if(_mainMenuNext.is('ul') && (_mainMenuNext.is(':visible'))) {
                    // console.log('up')
                    _mainMenuNext.slideUp();
                }
                if(_mainMenuNext.is('ul') && !(_mainMenuNext.is(':visible'))) {
                    // console.log('down');
                    $mainMenu.find('ul').not(_mainMenuNext.parentsUntil('.main_menu')).slideUp();
                    _mainMenuNext.slideDown();
                }

                _mainMenuNext.find('li:last-child').focusout(function() {
                    $(this).closest('ul').slideUp();
                });

                return false;
            });
        } // else end

        
        $langSelect.on('mousedown', function() {
            var _langNext = $(this).next('ul');
            if(_langNext.hasClass('langOn')){
                $(this).find('i').removeClass('langOn');
                $('.lang_list.langOn').removeClass('langOn');
            } else {
                $(this).find('i').addClass('langOn');
                _langNext.addClass('langOn');
            }
        
            return false;
        })
        .focusin(function() {
            $langList.addClass('langOn');
        });
        $('.lang_list.langOn').removeClass('langOn');

        $langList.find('li:last-child').focusout(function() {
            $(this).parent().removeClass('langOn');
        });

        // mousedown 해준 이유.
        // click, focusin event bubbling으로 인해 addClass & removeClass가 같이 적용된다.
        /*
        https://stackoverflow.com/questions/8735764/prevent-firing-focus-event-when-clicking-on-div
                focusin() click() bubbling
        */


    } // navVarEND()


    /* search_pop form */
    var $searchForm = $('.search_form');
    var $searchInput = $('#searchInput');
    var $searchLabel = $('.search_form label');
    var $searchIcon = $('button[name="search_icon"]');
    var $searchPopup = $('.search_popup');
    var $search = $('.search');
    var $searchClose = $('.search_popup_close');

    $search.on('click', function(){
        alert('click')
        $searchPopup.animate({opacity : 1}, 400).css({display: 'block'});
    });
    $searchClose.on('click', function(){
        $searchPopup.animate({opacity: 0}, 400).css({display: 'none'});;
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

    $(document).on('click', 'a[href=""]', function() {
        return false;
    })

}); // END