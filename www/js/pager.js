// JavaScript Document
$(function() {
fr = new FilmRoll({
container: '#film_roll_slider',
animation: 1500,
interval: 1000000,
//no_css: false,


//pager: false,//ここをコメントアウト。下記載のバックグラウンドをコメントアウト。○がサムネイルになる
prev: '#film_roll_prev',
next: '#film_roll_next'
});
});
//スライダー追加設定
//$(function() {
//$("#film_roll_slider,#film_roll_arrow").hover( 
//function(){
//$("#film_roll_arrow").stop(true).fadeTo('normal', 2.0);
//},
//function(){
//$("#film_roll_arrow").fadeTo('fast', 0);
//});
////ページャーのURL設定
//$(".film_roll_pager a:eq(0)").attr("href", "#")
//$(".film_roll_pager a:eq(1)").attr("href", "#")
//$(".film_roll_pager a:eq(2)").attr("href", "#")
//$(".film_roll_pager a:eq(3)").attr("href", "#")
//$(".film_roll_pager a:eq(4)").attr("href", "#")
//});
///////////////////////////////////////////////2/////////////////////////////////////////////////////////////////////////////
$(function() {
fr = new FilmRoll({
container: '#film_roll_slider1',
animation: 1500,
interval: 1000000,
//no_css: false,


//pager: false,//ここをコメントアウト。下記載のバックグラウンドをコメントアウト。○がサムネイルになる
prev: '#film_roll_prev1',
next: '#film_roll_next1'
});
});
//スライダー追加設定
//$(function() {
//$("#film_roll_slider,#film_roll_arrow").hover( 
//function(){
//$("#film_roll_arrow").stop(true).fadeTo('normal', 2.0);
//},
//function(){
//$("#film_roll_arrow").fadeTo('fast', 0);
//});
////ページャーのURL設定
//$(".film_roll_pager a:eq(0)").attr("href", "#")
//$(".film_roll_pager a:eq(1)").attr("href", "#")
//$(".film_roll_pager a:eq(2)").attr("href", "#")
//$(".film_roll_pager a:eq(3)").attr("href", "#")
//$(".film_roll_pager a:eq(4)").attr("href", "#")
//});