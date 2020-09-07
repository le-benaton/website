// JavaScript Document
$(function(){
$('#africa img').on({
    'click': function(){$(function(){
    $("#filter-africa").click(function(){
       	$('.galleryHeader').css({'display':'block'});
		$('.animism').css({'display':'none'});
		$('.gibier').css({'display':'none'});
		$('.trophy').css({'display':'none'});
		$('.shanghai').css({'display':'none'});
		$('.seoul').css({'display':'none'});
		$('.africa').css({'display':'block'});
		   
    
	});
});},
    'blur': function(){ /*処理*/ }
});
});
$(function(){
    $("#filter-all").click(function(){
       	$('.animism').css({'display':'none'});
		$('.gibier').css({'display':'none'});
		$('.trophy').css({'display':'none'});
		$('.shanghai').css({'display':'none'});
		$('.seoul').css({'display':'none'});
		$('.africa').css({'display':'none'});
   
    
	});
});

$(function(){
    $("#filter-animism").click(function(){
       	$('.galleryHeader').css({'display':'block'});
		$('.animism').css({'display':'block'});
		$('.gibier').css({'display':'none'});
		$('.trophy').css({'display':'none'});
		$('.shanghai').css({'display':'none'});
		$('.seoul').css({'display':'none'});
		$('.africa').css({'display':'none'});
   
    
	});
});

$(function(){
    $("#filter-gibier").click(function(){
       	$('.galleryHeader').css({'display':'block'});
		$('.animism').css({'display':'none'});
		$('.gibier').css({'display':'block'});
		$('.trophy').css({'display':'none'});
		$('.shanghai').css({'display':'none'});
		$('.seoul').css({'display':'none'});
		$('.africa').css({'display':'none'});
   
    
	});
});

$(function(){
    $("#filter-trophy").click(function(){
      // 	$('#galleryColor').css({'background-color':'#000','color':'#FFF'});
	   	$('.galleryHeader').css({'display':'block'});
		$('.animism').css({'display':'none'});
		$('.gibier').css({'display':'none'});
		$('.trophy').css({'display':'block'});
		$('.shanghai').css({'display':'none'});
		$('.seoul').css({'display':'none'});
		$('.africa').css({'display':'none'});
   
    
	});
});

$(function(){
    $("#filter-shanghai").click(function(){
       //	$('#galleryColor').css({'background-color':'#CCC','color':'#000'});
		$('.galleryHeader').css({'display':'block'});
		$('.animism').css({'display':'none'});
		$('.gibier').css({'display':'none'});
		$('.trophy').css({'display':'none'});
		$('.shanghai').css({'display':'block'});
		$('.seoul').css({'display':'none'});
		$('.africa').css({'display':'none'});
   
    
	});
});

$(function(){
    $("#filter-seoul").click(function(){
       	$('.galleryHeader').css({'display':'block'});
		$('.animism').css({'display':'none'});
		$('.gibier').css({'display':'none'});
		$('.trophy').css({'display':'none'});
		$('.shanghai').css({'display':'none'});
		$('.seoul').css({'display':'block'});
		$('.africa').css({'display':'none'});
   
    
	});
});

$(function(){
    $("#filter-africa").click(function(){
       	$('.galleryHeader').css({'display':'block'});
		$('.animism').css({'display':'none'});
		$('.gibier').css({'display':'none'});
		$('.trophy').css({'display':'none'});
		$('.shanghai').css({'display':'none'});
		$('.seoul').css({'display':'none'});
		$('.africa').css({'display':'block'});
   
    
	});
});