$(document).ready(function(){
    $('.pointclick').hide();

    $('.point').click(function(){	
      if ($(".drop").is(':hidden')) {
        $(".drop").slideDown().animate({height:'auto'},{queue:false, duration:600, easing: 'easeOutBounce'}),
        $('#link').removeClass('point').addClass('pointclick');
      }
      else {
        $('.drop').slideUp(),
        $('#link').removeClass('pointclick').addClass('point');
      }
      return false;
    });
    $('.drop').click(function(e) {
      e.stopPropagation();
    });
    $(document).click(function() {
      $('.drop').fadeOut('fast'),
      $('#link').removeClass('pointclick').addClass('point');
    });

});



