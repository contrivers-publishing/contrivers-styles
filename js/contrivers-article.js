

var nav = responsiveNav('.nav-collapse', {
        label: "<i class='fa fa-bars fa-3x  menu-toggle'></i>"
});


// Hide / Show the article ui submenus
// requires hoverIntent.js
// requires eq.js

(function() {

    if (window.jQuery) {

        var is_inline = function() {
            // Query the state using eqjs, which matches our sass styles.
            if ($('.article-aside').attr('data-eq-state') == 'inline') {
                console.log('Article nav should be inline.');
                return true;

            } else if ($('.article-aside').attr('data-eq-state') == 'stack') {
                console.log('Article nav should be stacked.');
                return false;

            } else {
                console.log('Something went wrong with eqjs.')
            }
        };

        var responsiveMenuToggle = function() {

            $('.article-aside .submenu').hide();
            
            $('.article-aside .has-submenu').hoverIntent(function() {
                $('.submenu', this).toggle();
            });

            if (is_inline()) {
                $('.menu-toggle').hide();
                $('.article-aside-navbar').show();

            } else {
                $('.menu-toggle').show();
                $('.article-aside-navbar').hide();
            };

            $('.menu-toggle').click(function() {
                $('.article-aside-navbar').toggle();
            });
        };
       
        $(window).load(function() {
            responsiveMenuToggle();
        });

        $(window).resize(function() {
            if (is_inline()) {
                $('.menu-toggle').hide();
                $('.article-aside-navbar').show();

            } else {
                $('.menu-toggle').show();
                $('.article-aside-navbar').hide();
            };
        });

   } // end jQuery check;

})(); //end IFFY
