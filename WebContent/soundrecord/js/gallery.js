// JavaScript Document
gallery = function() {
var current = 1;
var total = $('.entry').length;
$('.entry').hide();
$('#gallery1').fadeIn('slow');
$('#imageNumber').html('1 / ' + total );
setHeight(1)

$('.previous').click(function(){
var prev  = current - 1;
if (prev < 1) prev = 1;
if (current != 1) {
$('#gallery' + current).hide();
$('#gallery' + prev).fadeIn('slow');
current = prev;
setHeight(current)
$('#imageNumber').html(current + ' / ' + total)
}
return false;
});

$('.next').click(function(){
var next = current + 1;
if (next > total) next = total;
if (current != total) {
$('#gallery' + current).hide();
$('#gallery' + next).fadeIn('slow');
current = next;
setHeight(current)
$('#imageNumber').html(current + ' / ' + total)
}
return false;
});

//function setHeight(current) {
//var entryHeight = $('#gallery' + current).outerHeight() + 20;
//$('#slideshow').animate({ height: entryHeight + 'px'}, 500 );
//}
function setHeight(current) {
var entryHeight = $('#gallery' + current).css('display','block');
$('#slideshow').animate({ height: entryHeight + 'px'}, 500 );
}

}