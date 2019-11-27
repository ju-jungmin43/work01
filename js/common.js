$(document).ready(function(){
    
    $(window).on({
        resize : function(){
            var wW = $(window).width();
            var wH = $(window).height();
            var containerH = $('.container').css('padding-top').replace(/[^-\d\.]/g, '');;
            
            /* main_page */
            $('.--full_height').css({ height: (wH - containerH)});
            
            resizeMenu(wW);
            // console.log(wW)
        },
        scroll : function(){
            var wTop = $(window).scrollTop(); 
        }
    });
     $(window).trigger('resize');

    function resizeMenu(wW){
        if( wW > 1023 ){ pcMenu(); } else { moMenu(); }
    }


    function pcMenu(){
        $('.main_menu_list').off().on({
             mouseenter : function(){
                $(this, 'a').find('.sub_menu').css({ display: 'block'});
            }, 
            mouseleave : function(){
                $('.sub_menu').css({ display: 'none'})
            }
        });
        
        
        $('.sub_menu_commu_01').on({
            mouseenter : function(){
                $(this, 'a').find('.sub_menu_list').css({ display: 'block'})
            }, 
            mouseleave : function(){
                $(this, 'a').find('.sub_menu_list').css({ display: 'none'})
            }
        });
        $('.sub_menu_commu_01').off();
        
        return false;

     } // pcMenu()

     $('.lang_select').on('click', function(){
        if($('.lang_list').hasClass('on')){
            $('.fa-chevron-down').css({ transform: 'rotate(0deg)'});
            $('.lang_list').removeClass('on');
        }else{
            $('.fa-chevron-down').css({ transform: 'rotate(-180deg)'});
            $('.lang_list').addClass('on');
        };
         return false;
     });

     function moMenu(){
         var closeTimer = 0;
         var $navMoMenu = $('.nav_mo_menu');
         var $navMoClose = $('.nav_mo_close');
         var $navMoDim = $('.nav_mo_dim');
         
         $('.nav_mo_btn').on('click', function(){
             $navMoMenu.css({ visibility: 'visible', right : '0px'});
             closeTimer = setTimeout(function(){
                $navMoClose.css({ visibility: 'visible', right: '240px'});
            }, 200);
            $navMoDim.css({ opacity: 1, visibility : 'visible'})

            return false;
         });
    
         $('.nav_mo_close, .nav_mo_dim').on('click', function(){
             clearTimeout(closeTimer);
             $navMoClose.css({ visibility: 'hidden' , right: '-50px' });
             $navMoMenu.css({ 
                 right : '-240px',
                 WebkitTransition : 'all 0.4s',
                 MsTranstion : 'all 0.4s',
                 MozTranstion : 'all 0.4s',
                 transtion : 'all 0.4s'
                });
            $navMoDim.css({ opacity: 0, visibility : 'hidden' });

            $('.main_menu_list ul').hide();
            return false;
         });


        $('.main_menu_list').off().on('click', 'a', function(){
            if($(this).is('.commu') === false){
                if($(this).next().is('.on') === false){ 
                    $('.sub_menu').removeClass('on').slideUp(500);
                    $(this).next().addClass('on').slideDown(500);
                } else {
                    $(this).next().removeClass('on').slideUp(500);
                }
            } else { 
                if($(this).next().is('.on') === false){
                    $('.sub_menu_list').addClass('on').slideDown();
                } else {
                    $('.sub_menu_list').removeClass('on').slideUp();
                }
            }
            
            return false;
        });
   
        
        $('.main_menu_list ul').hide();
       
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
