/*---------------------------------------------------------------

 jQuery.validation.js - ver 1.2.2
 
 jQuery required (tested on version 1.3.2)
 encoding UTF-8

 Copyright (c) 2008 nori (norimania@gmail.com)
 5509 - http://moto-mono.net
 Licensed under the MIT
 
 Document Archive:
 http://moto-mono.net/2008/08/22/realtimeformvalidation.html

 $Update: 2009-04-20 01:00
 $Date: 2008-08-20 20:00
 
 ----------------------------------------------------------------*/

// エラーチップ関連
$.tip = {
	create: function(id,val,tipPos,tipTop,tipLeft){
		var tip = document.createElement("div");
		$(tip).addClass("validationTip").attr("id",id+"_tip")
		var pos = $("#"+id).offset();
		var rPos = {};
		
		// オプションでチップの位置を決める
		var requestPos = function(top,left){
			rPos.top = top+tipTop+pos.top;
			rPos.left = left+tipLeft+pos.left;
		}
		switch(tipPos){
			case "top":
				requestPos(0,0);
				break;
			case "bottom":
				requestPos($("#"+id).height(),0);
				break;
			case "even":
				requestPos(0,tipLeft);
				break;
			default:
				requestPos(0,$("#"+id).width());
				break;
		}
		
		/* 以下のようなHTMLを掃き出す -- 空要素はデザイン用
		<div class="validationTip">
			<div class="tipInner">--Message--</div>
			<div class="tipRt" />
			<div class="tipRb" />
		</div>
		*/
	$(tip).append("<div class='tipInner'>"+val+"</div><div class='tipRt'></div><div class='tipRb'></div>")

			.hide().css({
				"position": "absolute",
				"top": rPos.top,
				"left": rPos.left
			});
		$("body").append(tip);
	},
	msg: function(id,msg){
		$("#"+id+"_tip .tipInner").html(msg); // 文字列かHTMLを渡す
	},
	fadeIn: function(id){$("#"+id+"_tip").fadeIn("normal");},
	fadeOut: function(id){$("#"+id+"_tip").fadeOut("normal");}
}

// エラーダイアログ関連
$.dialog = {
	ids: {
		mat: "dlgmat",
		me: "dlg",
		top: "dlgtop",
		cont: "dlgcont",
		btm: "dlgbtm",
		close: "close"
	},
	create: function(msgs){
		var dialogMat = document.createElement("div");
		var dialog = document.createElement("div");
		var closeBtn = document.createElement("span");
		var id = $.dialog.ids;
		var clearDialog = function(){
			$(dialog).fadeTo(1,0).hide();
			$(dialogMat).fadeTo(1,0).hide();
			
			// IE6でselectとobjectが全面に来る対策 - 表示
			$("select:hidden,object:hidden").css("visibility","visible");
		}
		$("body").keyup(function(e){if(e.keyCode==27) clearDialog();});
		$(dialogMat).attr("id",id.mat).hide().fadeTo(1,0).click(function(){clearDialog();});
		$(closeBtn).attr("id",id.close).click(function(){clearDialog();})
			.hover(function(){$(this).addClass("hover");},function(){$(this).removeClass("hover");});
			
		/* 以下のようなHTMLを掃き出す -- span以外の空要素はデザイン用
		<div id="digmat" />
		<div id="dlg">
			<div id="dlgtop" />
			<div id="dlgcont">
				<div>
					<span>--Message--</span>
				</div>
			</div>
			<div id="dlgbtm" />
			<span id="close" title="--Message--" />
		</div>
		*/
		$(dialog).append("<div id='"+id.top+"'></div><div id='"+id.cont+"'><div><span></span></div></div><div id='"+id.btm+"'></div>");
		$("body").append(dialogMat).append(dialog);
		var d = {
			width: $(dialog).width(),
			height: $(dialog).height()
		}
		$(dialog).attr("id",id.me).append(closeBtn);
		$("div span","#"+id.cont).html(msgs);
		
		// div要素を一度inlineにして、文字列の幅と高さを得る
		$(dialog).css("display","inline");
		$("div",dialog).css("display","inline");
		$("div","#"+id.cont).css("display","block");
		
		// IE6は幅を指定する
		if(typeof document.body.style.maxHeight == "undefined") $(dialog).width($(dialog).width());
		$(dialog).hide().fadeTo(1,0);
	},
	fadeIn: function(msgs,options){
		var setting = $.extend({
			duration: "fast",
			matOpacity: .6,
			dialogOpacity: .9,
			closeTitle: "このメッセージを閉じる"
		},options);
		var id = $.dialog.ids;
		$("#"+id.cont+" div span").html(msgs);
		$("#"+id.me).show();
		var d = {
			width: $("#"+id.me).width(),
			height: $("#"+id.me).height()
		}
		$("#"+id.me).css("display","block");
		$("div","#"+id.me).css("display","block");
		$("#"+id.close).attr("title",setting.closeTitle);
		$("#"+id.mat).show().fadeTo(setting.duration,setting.matOpacity);
		$("#"+id.me).fadeTo(setting.duration,setting.dialogOpacity).css({
		  "margin-left": "-"+d.width/2+"px"
		});
		
		// IE6以外は以下でダイアログの位置を決める(IE6はCSS内expressionで指定
		if(typeof document.body.style.maxHeight != "undefined"){
			$("#"+id.me).css({
				"margin-top": "-"+(parseInt(d.height/2))+"px"
			});
			
			// IE7は空要素(div#dlgtop, div#dlgbtm)に最低幅を指定
			if(document.all) $("#"+id.top+",#"+id.btm).css("min-width",d.width);
		}else{
			
			// IE6でselectとobjectが全面に来る対策 - 非表示にする
			$("select,object").css("visibility","hidden");
		}
	}
}

// バリデーション関連
$.validate = {
	
	// classに条件を割り当てる
	chk: {
		required: function(txt,t){
			if($(t).hasClass("group")){
				var flag = 0;
				$("input,select",t).each(function(){
					if($(this).val().length>0) flag++;
				});
				return txt && flag==$("input,select",t).length;
			}else{
				return txt && txt.length > 0;
			}
		},
		hankaku: /^[a-zA-Z0-9@\;\:\[\]\^\=\/\!\*\"\#\$\%\&\'\(\)\,\.\-\_\?\\\s]*$/,	//"
		email: /^[a-zA-Z0-9_\.\-]+?@[A-Za-z0-9_\.\-]+\.+[A-Za-z\.\-\_]+$/,
		tel: /^[\d-]*$/,
		numonly: /^\d*$/,
		zip: /\d\d\d\-?\d\d\d\d/,
		check: function(txt,t){
			return $("input:checked",t).length>0;
		},
		radio: function(txt,t){
			return $("input:checked",t).length>0;
		},
		retype: function(txt,t){
			var elm = $("#"+$(t).attr("class").split("retype\-")[1].split(/\b/)[0]);
			if(elm.hasClass("group")){
				var chktxt = $("input",elm), txt = $("input",t);
				for(var i=0,flag=false;i<chktxt.length;i++){
					if(chktxt[i].value==txt[i].value) flag = true;
					else flag = false;
				}
				if(flag) return true;
			}else{
				return elm.val() == txt;
			}
		},
		min: function(txt,t){
			var length = $(t).attr("class").match(/min(\d+)/) ? RegExp.$1 : null;
			if(txt.length>0) return txt.length >= length;
		},
		max: function(txt,t){
			var length = $(t).attr("class").match(/max(\d+)/) ? RegExp.$1 : null;
			if(txt.length>0) return txt.length <= length;
		}
	},
	fn: function(t,options){
		msgs = $.extend({
			retype: "直前の項目と同じ内容を入力してください",
			email: "正しいEメールアドレスを入力してください",
			hankaku: "全角文字は使えません",
			tel: "正しい電話番号を入力してください",
			numonly: "数字のみで入力してください",
			zip: "正しい郵便番号を入力してください",
			min: "文字以上で入力してください",
			max: "文字以内で入力してください",
			check: "ひとつ以上を選択してください",
			radio: "いずれかを選択してください",
			required: "必須項目です",
			submit: "必須項目を正しく入力してください"
		},options);
		var txt = $(t).attr("value");
		var CL = $(t).attr("class");
		
		// 分割項目は中のvalueを足したものをtxtにする
		if(CL.match(/group/)){
			txt = "";
			var inputs = $("input,select",t);
			inputs.each(function(i){
				txt += $(this).val();
				
				// .email には@を追加
				if(CL.match(/email/) && i==0 && $(this).val().length>0)
					txt += "@";
			});
		}
		
		// エラー時の動作
		var check = {
			isError: false,
			failed: function(t,c){
				var msg = msgs[c];
				if(c.match(/min/) && CL.match(/min(\d+)/)) msg = RegExp.$1+msgs[c];
				else if(c.match(/max/) && CL.match(/max(\d+)/)) msg = RegExp.$1+msgs[c];
				$.tip.msg(t.id,msg);
				$.tip.fadeIn(t.id);
				this.isError = true;
			}
		}
		var chk = $.validate.chk;
		for(c in chk){
			
			// .required, .check, .radio には チップに .requiredTip を追加
			if(CL.match(/required|check|radio/)) $("#"+t.id+"_tip").addClass("requiredTip");
			if(CL.match(c)){
				if(typeof(chk[c]) != "function"){
					if(txt && !txt.match(chk[c])){
						check.failed(t,c);
						break;
					}
				}else{
					if(!chk[c](txt,t)){
						check.failed(t,c);
						break;
					}
				}
			}
		}
		
		// エラーがなければチップを非表示にする
		if(!check.isError){
			$.tip.fadeOut(t.id);
		}
	}
}

/* 初期化と適用 */
$.fn.validation = function(options){
	if($(this).length<1) return false;
	var form = this, tipDiv = 500;
	if(!options) var options = {};
	var setting = $.extend({
		dialog: true,
		submit: "#submit",
		position: "left",
		top: 0,
		left: 15,
		AjaxZip2: false,
		zip: "zip",
		zip2: null,
		pref: "pref",
		addr1: "addr",
		addr2: null,
		addr3: null
	},options.extension);
	
	// チェックするclassを含んでいるinput要素
	var inputs = $("input[type='text'],input[type='password'],textarea,select",form)
		.filter(function(){
			return this.className.match(/required|retype|email|hankaku|numonly|tel|zip/);
		});
	var validate = function(target){
		$.validate.fn(target,options.msgs);
		if(!setting.dialog){
			setTimeout(function(){
				if($("div.requiredTip:visible").length>0) $(setting.submit).attr("disabled","disabled").addClass("disabled");
				else $(setting.submit).removeAttr("disabled").removeClass("disabled");
			},500);
		}
	}
	
	// 上記のinput,select,textareaをチェックする
	inputs.each(function(){
		$.tip.create(this.id,"",setting.position,setting.top,setting.left,tipDiv--);
		validate(this);
		$(this).keyup(function(){validate(this)})
			.blur(function(){validate(this)});
		$(this).filter("select").change(function(){validate(this)});
	});
	
	// 上記以外の分割、チェックボックス、ラジオボタンをチェックする
	$(".group,.check,.radio").each(function(){
		var group = this;
		$.tip.create(this.id,"",setting.position,setting.top,setting.left);
		validate(this);
		if($(this).hasClass("group")){
			$("input",this).keyup(function(){validate(group)})
				.blur(function(){validate(group)});
			$("select",this).change(function(){validate(group)});
		}else{
			$("input",this).click(function(){validate(group)});
		}
	});
	
	if(setting.dialog) $.dialog.create(msgs.submit);
	
	// Submitボタンを押したときエラーがなければデータを送る
	$("*[type='submit'],input[type='image']",form).click(function(){
																					  
		// エラーチップが表示されている場合はエラーダイアログを表示する
		if($("div.requiredTip:visible").length>0){
			var errorId = $("div.requiredTip:visible").eq(0).attr("id").replace("_tip","");

			$("#"+errorId).focus().css("background","#ffc4c4","border:1px solid #CCCCCC;");
			$.dialog.fadeIn(msgs.submit,options.dialog);
			return false;
		}
	});
	
	// AjaxZip2が有効の場合は以下で適用する
	if(setting.AjaxZip2){
		var timer = function(){
			AjaxZip2.zip2addr(setting.zip,setting.pref,setting.addr1,setting.zip2,setting.addr2,setting.addr3);
			setTimeout(function(){
				inputs.each(function(){validate(this);});
			},10);
		}
		
		// setting.zip2に値がある場合はinput[name='setting.zip2']でチェックする
		$("input[name='"+(setting.zip2!=null ? setting.zip2 : setting.zip)+"']")
			.keyup(function(){timer();})
			.blur(function(){timer();});
	}
		
}