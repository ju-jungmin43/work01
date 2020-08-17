// const
var wW;
var wH;

/*-------------------------------------------------------------------
    header
    footer
-------------------------------------------------------------------*/

$(document).ready(function() {
    // 현재 주소 상태확인
    function navOn() {
        var url = location.href;
        var urlPara = url.split('/');
        var splitPara;
        for(var i = 0; i < urlPara.length; i++) {
            splitPara = urlPara[urlPara.length-1];
        }
        var returnNow = false;
        $.each($('.mo_menu_list'), function() {
            if(splitPara === $(this).attr('href')) {
                $(this).addClass('navOn');
                returnNow = true;
                return false;
            }
        });
        $.each($('.sub_menu > li > a'), function() {
            if(splitPara === $(this).attr('href')) {
                $(this).addClass('navOn');
                returnNow = true;
                return false;
            }
        });
        if(returnNow) { return false; }
    }
    navOn();

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
        // scroll_top 고정
        if( wTop < $document.height() - $window.height() - $footer.height() - ($scrollTop.height()*2) ){
            $scrollTop.addClass('scrollTopFixed');
        } else {
            $scrollTop.removeClass('scrollTopFixed');
        }
        // scroll_top hide
        if(wTop < $window.height()) {
            $scrollTop.addClass('scrollTopHide');
        } else {
            $scrollTop.removeClass('scrollTopHide');
        }

    }).trigger('scroll');


    function navMenu() {
        var $mainMenu = $('.main_menu');
        var $mainMenuList = $mainMenu.find('.main_menu_list');
        var $navMoBtn = $('.nav_mo_btn');
        var $navMoMenu = $('.nav_mo_menu');
        var $navMoClose = $('.nav_mo_close');
        var $navMoDim = $('.nav_mo_dim');
        var $langSelect = $('.lang_select');
        var $langList = $langSelect.next('.lang_list');
        var flag = false;
        
        function navInit(moMenu) {
            $navMoMenu.css({ right: '-240px', visibility: moMenu});
            $navMoClose.css({left: '0', visibility: 'hidden'})
            $navMoDim.css({display: 'none'});
            $mainMenuList.find('ul').css({display: 'none'});
            $langList.removeClass('langOn')
        }
        
        if(wW > 1023) {
            // PcMenu
            // PcMenu event init
            $mainMenu.find('a').off('click');
            navInit('visible');

            $mainMenuList.off().on({
                'mouseenter': function(e) {
                    flag = true;
                    $(this).find('> ul').css({display: 'block'});
                    // a:focus 대신 .navOn { color: /* focus color */ } 해준 이유.
                    // focusin에 click event 같이 걸림.
                    // $(this).find('> a').addClass('navOn');
                },
                'mouseleave': function() {
                    flag = false;
                    $(this).find('> ul').css({display: 'none'});
                    // $mainMenuList.find('> a').removeClass('navOn');
                },
                'focusin': function(e) {
                    if(flag) {
                        e.target.blur();
                    }
                    $(this).find('> ul').css({display: 'block'});
                }
                //[Focus Styles Only on Tab Not Click]https://www.darrenlester.com/blog/focus-only-on-tab
            });
            
            $mainMenuList.find('ul').find('li:last-child').focusout(function() {
                // $('.mo_menu_list').removeClass('navOn');
                $(this).parent().css({display: 'none'});
            });

        } else {
            // MobileMenu
            // MobileMenu event init
            // $navMoBtn.off('click');
            $mainMenuList.off('mouseenter mouseleave focusin');
            
            $('.nav_mo_close, .nav_mo_dim').off().on('click', function() {
                navInit('hidden');
            });

            $navMoBtn.off().on('click', 'a', function() {
                $navMoMenu.css({ right: 0, visibility: 'visible'});
                $navMoClose.css({ left: '-50px', visibility: 'visible'});
                $navMoDim.css({display: 'block'}).animate({opacity: 1}, 600)
            });

            $mainMenu.find('a').off().on('click', function() {
                var _mainMenuNext = $(this).next();
                if(_mainMenuNext.is('ul') && (_mainMenuNext.is(':visible'))) {
                    // console.log('up')
                    _mainMenuNext.slideUp();
                    return false;
                }
                if(_mainMenuNext.is('ul') && !(_mainMenuNext.is(':visible'))) {
                    // console.log('down');
                    $mainMenu.find('ul').not(_mainMenuNext.parentsUntil('.main_menu')).slideUp();
                    _mainMenuNext.slideDown();
                    return false;
                }

                _mainMenuNext.find('li:last-child').focusout(function() {
                    $(this).closest('ul').slideUp();
                });
           
            });
            $('.lang_list.langOn').removeClass('langOn');
        } // else end

        $langSelect.off().on('mousedown', 'a', function(e) {
            flag = false;
            if(!flag) {
                if(!$langList.hasClass('langOn')){
                    $(this).find('i').addClass('langOn');
                    $(this).parent().next('ul').addClass('langOn');
                    return false;
                } else {
                    $('.lang_select').find('i').removeClass('langOn');
                    $('.lang_list.langOn').removeClass('langOn');
                }
            }
        }).on('focusin', function() {
            $('.lang_list').addClass('langOn');
        });
       
        $('.lang_list.langOn').removeClass('langOn');


        // focusin 발생 후 click이벤트가 발생되어  focusin이벤트가 발생되어 클릭 시에 열고닫히는현상이 실행된다.
        $langList.find('li:last-child').focusout(function() {
            $(this).parent().removeClass('langOn');
        });

        // mousedown 해준 이유.
        // click, focusin event bubbling으로 인해 addClass & removeClass가 같이 적용된다.
        /*
        https://stackoverflow.com/questions/8735764/prevent-firing-focus-event-when-clicking-on-div
                focusin() click() bubbling
        */


    } // navMenuEND()


    /* search_pop form */
    var $searchForm = $('.search_form, .search_form label');
    var $searchInput = $('#searchInput');
    var $searchIcon = $('button[name="search_icon"]');
    var $searchPopup = $('.search_popup');
    var $search = $('.search');
    var $searchClose = $('.search_popup_close');

    $search.on('click', 'a', function() {
        $searchPopup.stop(true).animate({opacity: 1}, 400).css({display: 'block'});
    });
    $searchClose.on('click', function() {
        $searchPopup.stop(true).animate({opacity: 0}, 400, function() {
            $(this).css({display: 'none'});
        })
    })

    $searchInput.on('keyup',function(){
        if( $(this).val() === '' ){ // 공백
            $searchForm.removeClass('formOn');
            $searchIcon.css({ color: '#999'})
        } else {
            $searchForm.addClass('formOn');
            $searchIcon.css({ color: '#222'})
        }
    });

    $searchInput.on('keydown', function(){
        $searchForm.addClass('formOn');
    });
    
    $searchInput.val('');

    $(document).on('click', 'a[href=""]', function() {
        return false;
    })

}); // END