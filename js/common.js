$(document).ready(function(){


     $(window).on('resize', function(){
        var wTop = $(window).scrollTop(); // window scrollTop
        
        var wH = $(this).height();
        var containerH = $('.container').css('padding-top').replace(/[^-\d\.]/g, '');;
        
        /* main_page */
        $('.--full_height').css({ height: (wH - containerH)});

      
     })
     $(window).trigger('resize');

    //  $('.main_menu_list').hover(function(){
    //      $(this).find('.sub_menu').css({ display: 'block'})
    //     }, function(){
    //         $('.sub_menu').css({ display: 'none'})
    //  });

    //  $('.sub_menu_commu_01').hover(function(){
    //     $(this).find('.sub_menu_list').css({ display: 'block'})
    // }, function(){
    //     $(this).find('.sub_menu_list').css({ display: 'none'})
    //  });

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
        return false;
     });


     // mo_menu_list
    $('.mo_menu_list').on('click', function(){
    //     var $subMenu = $('.sub_menu');
    //     var $nextSubMenu = $(this).next();

    //     if($(this).is('.commu') == false){

    //         if($(this).next().is('.on') == false){ 
    //             $('.sub_menu').removeClass('on').slideUp(500);
    //             $('.sub_menu_list').removeClass('on').slideUp();
    //             $(this).next().addClass('on').slideDown(500);
    //         } else {
    //             $(this).next().removeClass('on').slideUp(500);
    //         }

    //     } else { 
            
    //         if($(this).next().is('.on') == false){
    //             $('.sub_menu_list').addClass('on').slideDown();
    //         } else {
    //             $('.sub_menu_list').removeClass('on').slideUp();
    //         }
    //     }
    //     return false;
    
    
    // console.log($(this).closest('ul') + '\n' + $(this).closest('li'))
    


    });
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


    // 추가로 넣기! > 햄버거메뉴시에 product 메뉴에 all 
    // $('.sub_menu_product').prepend('<li><a href="#">ALL</a></li>')
}); // end


// 2depth menu 분석하기
// function small_screen_nav_toggle(){

// 	// menu top level link
// 	$('#menu li.menu-item-has-children a').on('click',function(e){

//         if( is_screen(1023) ) {

//             var $parent = $(this).closest('ul');
//             var $li = $(this).closest('li');

//             if($li.find('> ul').length > 0) { // child가 있으면 실행

//                 e.preventDefault();

//                 if( !$parent.hasClass('sub-menu') ) { // 2depth

//                     $('#menu > li.active > ul > li').removeClass('active').find('> ul').stop().slideUp(); // 3depth close

//                     if($(this).closest('li').hasClass('active')) { // 열려있는 menu 클릭시 닫기

//                         $(this).closest('li').removeClass('active').find('> ul').stop().slideUp();

//                     } else {

//                         $('#menu > li').removeClass('active').find('> ul').stop().slideUp();

//                         $li.addClass('active');
//                         $li.find('> ul').stop().slideDown();

//                     }

//                 } else { // 3depth

//                     if($(this).closest('li').hasClass('active')) { // 열려있는 menu 클릭시 닫기

//                         $(this).closest('li').removeClass('active').find('> ul').stop().slideUp();

//                     } else {

//                         $('#menu > li.active > ul > li').removeClass('active').find('> ul').stop().slideUp();

//                         $li.addClass('active');
//                         $li.find('> ul').stop().slideDown();

//                     }

//                 }

//             } // endif

//         }

// 	});

// }