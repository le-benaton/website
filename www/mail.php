<?php header("Content-Type:text/html;charset=utf-8"); ?>
<?php //error_reporting(E_ALL | E_STRICT);
##-----------------------------------------------------------------------------------------------------------------##
#
#  PHPメールプログラム　フリー版 最終更新日2014/12/12
#　改造や改変は自己責任で行ってください。
#	
#  今のところ特に問題点はありませんが、不具合等がありましたら下記までご連絡ください。
#  MailAddress: info@php-factory.net
#  name: K.Numata
#  HP: http://www.php-factory.net/
#
#  重要！！サイトでチェックボックスを使用する場合のみですが。。。
#  チェックボックスを使用する場合はinputタグに記述するname属性の値を必ず配列の形にしてください。
#  例　name="当サイトをしったきっかけ[]"  として下さい。
#  nameの値の最後に[と]を付ける。じゃないと複数の値を取得できません！
#
##-----------------------------------------------------------------------------------------------------------------##
if (version_compare(PHP_VERSION, '5.1.0', '>=')) {//PHP5.1.0以上の場合のみタイムゾーンを定義
	date_default_timezone_set('Asia/Tokyo');//タイムゾーンの設定（日本以外の場合には適宜設定ください）
}
/*-------------------------------------------------------------------------------------------------------------------
* ★以下設定時の注意点　
* ・値（=の後）は数字以外の文字列（一部を除く）はダブルクオーテーション「"」、または「'」で囲んでいます。
* ・これをを外したり削除したりしないでください。後ろのセミコロン「;」も削除しないください。
* ・また先頭に「$」が付いた文字列は変更しないでください。数字の1または0で設定しているものは必ず半角数字で設定下さい。
* ・メールアドレスのname属性の値が「Email」ではない場合、以下必須設定箇所の「$Email」の値も変更下さい。
* ・name属性の値に半角スペースは使用できません。
*以上のことを間違えてしまうとプログラムが動作しなくなりますので注意下さい。
-------------------------------------------------------------------------------------------------------------------*/


//---------------------------　必須設定　必ず設定してください　-----------------------

//サイトのトップページのURL　※デフォルトでは送信完了後に「トップページへ戻る」ボタンが表示されますので
$site_top = "http://benaton.net/";

// 管理者メールアドレス ※メールを受け取るメールアドレス(複数指定する場合は「,」で区切ってください 例 $to = "aa@aa.aa,bb@bb.bb";)
$to = "info@benaton.net";

//フォームのメールアドレス入力箇所のname属性の値（name="○○"　の○○部分）
$Email = "Email";

/*------------------------------------------------------------------------------------------------
以下スパム防止のための設定　
※有効にするにはこのファイルとフォームページが同一ドメイン内にある必要があります
------------------------------------------------------------------------------------------------*/

//スパム防止のためのリファラチェック（フォームページが同一ドメインであるかどうかのチェック）(する=1, しない=0)
$Referer_check = 1;

//リファラチェックを「する」場合のドメイン ※以下例を参考に設置するサイトのドメインを指定して下さい。
$Referer_check_domain = "benaton.net";

//---------------------------　必須設定　ここまで　------------------------------------

/*------------------------------------------------------------------------------------------------
【スパム対策用コード】(START)
※指定のキーワードが含まれていたら強制終了する処理(送信させない)
------------------------------------------------------------------------------------------------*/

//禁止するキーワードを設定下さい（値は'で囲み、カンマで区切って下さい）
//無効化する場合には $ngwordArr = array();　として下さい。
$ngwordArr = array('@163.com','@yeah.net','MONCLER','UGG','@mail.ru','@inbox.ru');

//文字コードの指定（フォームの文字コードに合わせて下さい）
$targetEncode = 'utf-8';

//キーワードマッチング処理（基本的に変更禁止）
if(!empty($ngwordArr)){
foreach($_POST as $val){
	foreach($ngwordArr as $vv){
		if(!is_array($val) && mb_strpos($val,$vv,0,$targetEncode) !== false) exit('Error');
	}
}
}
/*------------------------------------------------------------------------------------------------
【スパム対策用コード】(END)
------------------------------------------------------------------------------------------------*/



//---------------------- 任意設定　以下は必要に応じて設定してください ------------------------


// 管理者宛のメールで差出人を送信者のメールアドレスにする(する=1, しない=0)
// する場合は、メール入力欄のname属性の値を「$Email」で指定した値にしてください。
//メーラーなどで返信する場合に便利なので「する」がおすすめです。
$userMail = 1;

// Bccで送るメールアドレス(複数指定する場合は「,」で区切ってください 例 $BccMail = "aa@aa.aa,bb@bb.bb";)
$BccMail = "";

// 管理者宛に送信されるメールのタイトル（件名）
$subject = "ホームページからのお問い合わせ";

// 送信確認画面の表示(する=1, しない=0)
$confirmDsp = 1;

// 送信完了後に自動的に指定のページ(サンクスページなど)に移動する(する=1, しない=0)
// CV率を解析したい場合などはサンクスページを別途用意し、URLをこの下の項目で指定してください。
// 0にすると、デフォルトの送信完了画面が表示されます。
$jumpPage = 0;

// 送信完了後に表示するページURL（上記で1を設定した場合のみ）※httpから始まるURLで指定ください。
$thanksPage = "http://xxx.xxxxxxxxx/thanks.html";

// 必須入力項目を設定する(する=1, しない=0)
$requireCheck = 1;

/* 必須入力項目(入力フォームで指定したname属性の値を指定してください。（上記で1を設定した場合のみ）
値はシングルクォーテーションで囲み、複数の場合はカンマで区切ってください。フォーム側と順番を合わせると良いです。 
配列の形「name="○○[]"」の場合には必ず後ろの[]を取ったものを指定して下さい。*/
$require = array('お名前','Email');


//----------------------------------------------------------------------
//  自動返信メール設定(START)
//----------------------------------------------------------------------

// 差出人に送信内容確認メール（自動返信メール）を送る(送る=1, 送らない=0)
// 送る場合は、フォーム側のメール入力欄のname属性の値が上記「$Email」で指定した値と同じである必要があります
$remail = 1;

//自動返信メールの送信者欄に表示される名前　※あなたの名前や会社名など（もし自動返信メールの送信者名が文字化けする場合ここは空にしてください）
$refrom_name = "ル&nbsp;ベナトン";

// 差出人に送信確認メールを送る場合のメールのタイトル（上記で1を設定した場合のみ）
$re_subject = "送信ありがとうございました";

//フォーム側の「名前」箇所のname属性の値　※自動返信メールの「○○様」の表示で使用します。
//指定しない、または存在しない場合は、○○様と表示されないだけです。あえて無効にしてもOK
$dsp_name = 'お名前';

//自動返信メールの冒頭の文言 ※日本語部分のみ変更可
$remail_text = <<< TEXT

お問い合わせありがとうございました。
早急に担当者より返信させていただきますので、今しばらくお待ちください。


送信内容は以下になります。



TEXT;


//自動返信メールに署名（フッター）を表示(する=1, しない=0)※管理者宛にも表示されます。
$mailFooterDsp = 1;

//上記で「1」を選択時に表示する署名（フッター）（FOOTER～FOOTER;の間に記述してください）
$mailSignature = <<< FOOTER

──────────────────────
フレンチレストラン
ル&nbsp;ベナトン

ランチ 11：45-14：00 (L.O)
ディナー18：00-21：00 (L.O)
毎週水曜日定休日 他2日

〒662-0047 兵庫県西宮市寿町4-12
tel:0798-37-2655
fax:0798-37-2656

E-mail:info@benaton.net
URL: http://benaton.net/
──────────────────────

FOOTER;


//----------------------------------------------------------------------
//  自動返信メール設定(END)
//----------------------------------------------------------------------

//メールアドレスの形式チェックを行うかどうか。(する=1, しない=0)
//※デフォルトは「する」。特に理由がなければ変更しないで下さい。メール入力欄のname属性の値が上記「$Email」で指定した値である必要があります。
$mail_check = 1;

//全角英数字→半角変換を行うかどうか。(する=1, しない=0)
$hankaku = 0;

//全角英数字→半角変換を行う項目のname属性の値（name="○○"の「○○」部分）
//※複数の場合にはカンマで区切って下さい。（上記で「1」を指定した場合のみ有効）
//配列の形「name="○○[]"」の場合には必ず後ろの[]を取ったものを指定して下さい。
$hankaku_array = array('電話番号','金額');


//------------------------------- 任意設定ここまで ---------------------------------------------


// 以下の変更は知識のある方のみ自己責任でお願いします。


//----------------------------------------------------------------------
//  関数実行、変数初期化
//----------------------------------------------------------------------
$encode = "UTF-8";//このファイルの文字コード定義（変更不可）

if(isset($_GET)) $_GET = sanitize($_GET);//NULLバイト除去//
if(isset($_POST)) $_POST = sanitize($_POST);//NULLバイト除去//
if(isset($_COOKIE)) $_COOKIE = sanitize($_COOKIE);//NULLバイト除去//
if($encode == 'SJIS') $_POST = sjisReplace($_POST,$encode);//Shift-JISの場合に誤変換文字の置換実行
$funcRefererCheck = refererCheck($Referer_check,$Referer_check_domain);//リファラチェック実行

//変数初期化
$sendmail = 0;
$empty_flag = 0;
$post_mail = '';
$errm ='';
$header ='';

if($requireCheck == 1) {
	$requireResArray = requireCheck($require);//必須チェック実行し返り値を受け取る
	$errm = $requireResArray['errm'];
	$empty_flag = $requireResArray['empty_flag'];
}
//メールアドレスチェック
if(empty($errm)){
	foreach($_POST as $key=>$val) {
		if($val == "confirm_submit") $sendmail = 1;
		if($key == $Email) $post_mail = h($val);
		if($key == $Email && $mail_check == 1 && !empty($val)){
			if(!checkMail($val)){
				$errm .= "<p class=\"error_messe\">【".$key."】はメールアドレスの形式が正しくありません。</p>\n";
				$empty_flag = 1;
			}
		}
	}
}
  
if(($confirmDsp == 0 || $sendmail == 1) && $empty_flag != 1){
	
	//差出人に届くメールをセット
	if($remail == 1) {
		$userBody = mailToUser($_POST,$dsp_name,$remail_text,$mailFooterDsp,$mailSignature,$encode);
		$reheader = userHeader($refrom_name,$to,$encode);
		$re_subject = "=?iso-2022-jp?B?".base64_encode(mb_convert_encoding($re_subject,"JIS",$encode))."?=";
	}
	//管理者宛に届くメールをセット
	$adminBody = mailToAdmin($_POST,$subject,$mailFooterDsp,$mailSignature,$encode,$confirmDsp);
	$header = adminHeader($userMail,$post_mail,$BccMail,$to);
	$subject = "=?iso-2022-jp?B?".base64_encode(mb_convert_encoding($subject,"JIS",$encode))."?=";
	
	mail($to,$subject,$adminBody,$header);
	if($remail == 1) mail($post_mail,$re_subject,$userBody,$reheader);
}
else if($confirmDsp == 1){ 

/*　▼▼▼送信確認画面のレイアウト※編集可　オリジナルのデザインも適用可能▼▼▼　*/
?>
<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<title>夙川フレンチ｜ル&nbsp;ベナトン</title>
<meta name="Description" content="西宮・夙川のフレンチレストラン「ル&nbsp;ベナトン」。ミシュランガイド兵庫版掲載店。ジビエ料理、ブルゴーニュワイン。フランス「食の都」ボーヌ仕込みの味をご堪能ください"。>
<meta name="Keywords" content="夙川フレンチ,西宮フレンチ,兵庫フレンチ,神戸フレンチ,阪神間フランチ,ブルゴーニュワイン,ブルゴーニュ料理,ブルゴーニュ,ボーヌ,黄金の丘,神戸ジビエ,西宮ジビエ,関西フレンチ,関西ジビエ,ジビエ料理,夙川ランチ,夙川ディナー,西宮ランチ,西宮ディナー,神戸ランチ,神戸ディナー">
<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">
<meta name="format-detection" content="telephone=no"> 
<meta name="google-site-verification" content="sf9tNhZ_bJR_c-OXC3qO63Jy3NWsoq_70XZmgZAcYQg" />
<link rel="stylesheet" href="./css/normalize.css">
<link rel="stylesheet" type="text/css" href="css/styles.css">


<!--<link rel="stylesheet" type="text/css" href="css/main.css">-->

<link rel="stylesheet" href="./css/slider.css">
<link href='http://fonts.googleapis.com/css?family=Hammersmith+One|Roboto+Slab|Droid+Serif' rel='stylesheet' type='text/css'>
<!--[if lt IE9]>
	 <script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script>
	<![endif]-->
<script src="js/jquery-1.10.2.min.js"></script>
<script type="text/javascript" src="js/jquery.easing.1.3.js"></script>
<script type="text/javascript" src="js/scroll.js"></script>
<script src="js/jquery.sliphover.min.js"></script>
<script src="js/tab.ini.js"></script>
<script type="text/javascript">
          $(function(){
       $("#container").sliphover({
    duration: 100
   
    
});
      
		});
        </script>


<script>
 (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
 (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
 m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
 })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

 ga('create', 'UA-99005030-1', 'auto');
 ga('send', 'pageview');

</script>

<!--三本線メニュー-->

<!--<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>-->
<script>
(function($) {
    $(function() {
        var $header = $('#top-head');
        // Nav Fixed
        $(window).scroll(function() {
            if ($(window).scrollTop() > 350) {
                $header.addClass('fixed');
            } else {
                $header.removeClass('fixed');
            }
        });
        // Nav Toggle Button
        $('#nav-toggle').click(function(){
            $header.toggleClass('open');
        });
    });
})(jQuery);

</script>

<!--三本線新規メニュー始まり-->
<script>




</script>
<!--三本線新規メニュー終わり-->


<!--三本線メニュー-->
<!--ページ途中スクロール-->
<script>


$(function() {
    var n = window.location.href.slice(window.location.href.indexOf('?') + 4);
    if(n.length < $(".scroll-inner h2").size()) {
        var p = $(".scroll-inner h2").eq(n).offset().top;
        $('html,body').animate({ scrollTop: p }, 'slow');
        return false;
    }
});

</script>
<!--ページ途中スクロール-->



</head>

<!-- ▼************ 送信内容表示部　※編集は自己責任で ************ ▼-->
<div id="formWrap" class="confirm">
<?php if($empty_flag == 1){ ?>
<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<title>夙川フレンチ｜ル&nbsp;ベナトン</title>
<meta name="Description" content="西宮・夙川のフレンチレストラン「ル&nbsp;ベナトン」。ミシュランガイド兵庫版掲載店。ジビエ料理、ブルゴーニュワイン。フランス「食の都」ボーヌ仕込みの味をご堪能ください"。>
<meta name="Keywords" content="夙川フレンチ,西宮フレンチ,兵庫フレンチ,神戸フレンチ,阪神間フランチ,ブルゴーニュワイン,ブルゴーニュ料理,ブルゴーニュ,ボーヌ,黄金の丘,神戸ジビエ,西宮ジビエ,関西フレンチ,関西ジビエ,ジビエ料理,夙川ランチ,夙川ディナー,西宮ランチ,西宮ディナー,神戸ランチ,神戸ディナー">
<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">
<meta name="format-detection" content="telephone=no"> 
<meta name="google-site-verification" content="sf9tNhZ_bJR_c-OXC3qO63Jy3NWsoq_70XZmgZAcYQg" />
<link rel="stylesheet" href="./css/normalize.css">
<link rel="stylesheet" type="text/css" href="css/styles.css">


<!--<link rel="stylesheet" type="text/css" href="css/main.css">-->

<link rel="stylesheet" href="./css/slider.css">
<link href='http://fonts.googleapis.com/css?family=Hammersmith+One|Roboto+Slab|Droid+Serif' rel='stylesheet' type='text/css'>
<!--[if lt IE9]>
	 <script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script>
	<![endif]-->
<script src="js/jquery-1.10.2.min.js"></script>
<script type="text/javascript" src="js/jquery.easing.1.3.js"></script>
<script type="text/javascript" src="js/scroll.js"></script>
<script src="js/jquery.sliphover.min.js"></script>
<script src="js/tab.ini.js"></script>
<script type="text/javascript">
          $(function(){
       $("#container").sliphover({
    duration: 100
   
    
});
      
		});
        </script>


<script>
 (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
 (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
 m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
 })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

 ga('create', 'UA-99005030-1', 'auto');
 ga('send', 'pageview');

</script>

<!--三本線メニュー-->

<!--<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>-->
<script>
(function($) {
    $(function() {
        var $header = $('#top-head');
        // Nav Fixed
        $(window).scroll(function() {
            if ($(window).scrollTop() > 350) {
                $header.addClass('fixed');
            } else {
                $header.removeClass('fixed');
            }
        });
        // Nav Toggle Button
        $('#nav-toggle').click(function(){
            $header.toggleClass('open');
        });
    });
})(jQuery);

</script>

<!--三本線新規メニュー始まり-->
<script>




</script>
<!--三本線新規メニュー終わり-->


<!--三本線メニュー-->
<!--ページ途中スクロール-->
<script>


$(function() {
    var n = window.location.href.slice(window.location.href.indexOf('?') + 4);
    if(n.length < $(".scroll-inner h2").size()) {
        var p = $(".scroll-inner h2").eq(n).offset().top;
        $('html,body').animate({ scrollTop: p }, 'slow');
        return false;
    }
});

</script>
<!--ページ途中スクロール-->



</head>
<body>
<div id="wrapper">


 <div id="topPage"></div>

<header id="top-head">
    <div class="innerNav">
        <div id="mobile-head">
            <h1 class="logo"><a href="index.html"><img src="./images/logoBenaton.png" alt="夙川フレンチ｜ル&nbsp;ベナトン"></a></h1>
            
          
            <div id="nav-toggle">
                <div>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div>
       <nav id="global-nav">
            <div>
                <p class="navi-center"><a href="index.html?no=0">LUNCH</a></p>
                <p class="navi-center"><a href="index.html?no=1">DINNER</a></p>
                <p class="navi-center"><a href="index.html?no=2">WINE</a></p>
                <p class="navi-center"><a href="index.html?no=3">PROFILE</a></p>
                <p class="navi-center"><a href="index.html?no=4">ACCESS</a></p>
                <p class="navi-center"><a href="index.html?no=5">ご予約</a></p>
                <p class="navi-center"><a href="index.html?no=6">VOYAGE</a></p>
                <p id="inatagram"><a href="https://www.instagram.com/le_benaton/" target="_blank"><img src="images/instagram.png" alt="ル&nbsp;ベナトン｜公式インスタグラム" title="ル&nbsp;ベナトン｜公式インスタグラム"></a></p>
            </div>
        </nav>
    </div>
</header>

 

<div class="confirm">
<p><strong>入力にエラーがあります。<br class="br-sp">下記をご確認の上<br class="br-sp">「戻る」ボタンにて修正をお願い致します。</strong>
</p>
<?php echo $errm; ?><input type="button" value="戻る" onclick="history.back()" class="submitButton">
</div>
</body>
<?php }else{ ?>
<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<title>夙川フレンチ｜ル&nbsp;ベナトン</title>
<meta name="Description" content="西宮・夙川のフレンチレストラン「ル&nbsp;ベナトン」。ミシュランガイド兵庫版掲載店。ジビエ料理、ブルゴーニュワイン。フランス「食の都」ボーヌ仕込みの味をご堪能ください"。>
<meta name="Keywords" content="夙川フレンチ,西宮フレンチ,兵庫フレンチ,神戸フレンチ,阪神間フランチ,ブルゴーニュワイン,ブルゴーニュ料理,ブルゴーニュ,ボーヌ,黄金の丘,神戸ジビエ,西宮ジビエ,関西フレンチ,関西ジビエ,ジビエ料理,夙川ランチ,夙川ディナー,西宮ランチ,西宮ディナー,神戸ランチ,神戸ディナー">
<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">
<meta name="format-detection" content="telephone=no"> 
<meta name="google-site-verification" content="sf9tNhZ_bJR_c-OXC3qO63Jy3NWsoq_70XZmgZAcYQg" />
<link rel="stylesheet" href="./css/normalize.css">
<link rel="stylesheet" type="text/css" href="css/styles.css">


<!--<link rel="stylesheet" type="text/css" href="css/main.css">-->

<link rel="stylesheet" href="./css/slider.css">
<link href='http://fonts.googleapis.com/css?family=Hammersmith+One|Roboto+Slab|Droid+Serif' rel='stylesheet' type='text/css'>
<!--[if lt IE9]>
	 <script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script>
	<![endif]-->
<script src="js/jquery-1.10.2.min.js"></script>
<script type="text/javascript" src="js/jquery.easing.1.3.js"></script>
<script type="text/javascript" src="js/scroll.js"></script>
<script src="js/jquery.sliphover.min.js"></script>
<script src="js/tab.ini.js"></script>
<script type="text/javascript">
          $(function(){
       $("#container").sliphover({
    duration: 100
   
    
});
      
		});
        </script>


<script>
 (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
 (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
 m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
 })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

 ga('create', 'UA-99005030-1', 'auto');
 ga('send', 'pageview');

</script>

<!--三本線メニュー-->

<!--<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>-->
<script>
(function($) {
    $(function() {
        var $header = $('#top-head');
        // Nav Fixed
        $(window).scroll(function() {
            if ($(window).scrollTop() > 350) {
                $header.addClass('fixed');
            } else {
                $header.removeClass('fixed');
            }
        });
        // Nav Toggle Button
        $('#nav-toggle').click(function(){
            $header.toggleClass('open');
        });
    });
})(jQuery);

</script>

<!--三本線新規メニュー始まり-->
<script>




</script>
<!--三本線新規メニュー終わり-->


<!--三本線メニュー-->
<!--ページ途中スクロール-->
<script>


$(function() {
    var n = window.location.href.slice(window.location.href.indexOf('?') + 4);
    if(n.length < $(".scroll-inner h2").size()) {
        var p = $(".scroll-inner h2").eq(n).offset().top;
        $('html,body').animate({ scrollTop: p }, 'slow');
        return false;
    }
});

</script>
<!--ページ途中スクロール-->



</head>
<body>
<div id="wrapper">


 <div id="topPage"></div>

<header id="top-head">
    <div class="innerNav">
        <div id="mobile-head">
            <h1 class="logo"><a href="index.html"><img src="./images/logoBenaton.png" alt="夙川フレンチ｜ル&nbsp;ベナトン"></a></h1>
            
          
            <div id="nav-toggle">
                <div>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div>
       <nav id="global-nav">
            <div>
                <p class="navi-center"><a href="index.html?no=0">LUNCH</a></p>
                <p class="navi-center"><a href="index.html?no=1">DINNER</a></p>
                <p class="navi-center"><a href="index.html?no=2">WINE</a></p>
                <p class="navi-center"><a href="index.html?no=3">PROFILE</a></p>
                <p class="navi-center"><a href="index.html?no=4">ACCESS</a></p>
                <p class="navi-center"><a href="index.html?no=5">ご予約</a></p>
                <p class="navi-center"><a href="index.html?no=6">VOYAGE</a></p>
                <p id="inatagram"><a href="https://www.instagram.com/le_benaton/" target="_blank"><img src="images/instagram.png" alt="ル&nbsp;ベナトン｜公式インスタグラム" title="ル&nbsp;ベナトン｜公式インスタグラム"></a></p>
            </div>
        </nav>
    </div>
</header>




<p class="confirm">以下の内容で間違いがなければ、「送信する」ボタンを押してください。</p>
<div class="formTable">
<form action="<?php echo h($_SERVER['SCRIPT_NAME']); ?>" method="POST">
<table class="formTable">
<?php echo confirmOutput($_POST);//入力内容を表示?>
</table></div>
<p class="confirm"><input type="hidden" name="mail_set" value="confirm_submit">
<input type="hidden" name="httpReferer" value="<?php echo h($_SERVER['HTTP_REFERER']);?>">
<input type="submit" value="送信" class="submitButton" class="submitButton">
<input type="button" value="戻る" onclick="history.back()" class="submitButton"></p>
</form>
<?php } ?>
</div><!-- /formWrap -->
<!-- ▲ *********** 送信内容確認部　※編集は自己責任で ************ ▲-->

<!-- ▼ Footerその他コンテンツなど　※編集可 ▼-->
</body>
</html>
<?php
/* ▲▲▲送信確認画面のレイアウト　※オリジナルのデザインも適用可能▲▲▲　*/
}

if(($jumpPage == 0 && $sendmail == 1) || ($jumpPage == 0 && ($confirmDsp == 0 && $sendmail == 0))) { 

/* ▼▼▼送信完了画面のレイアウト　編集可 ※送信完了後に指定のページに移動しない場合のみ表示▼▼▼　*/
?>
<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<title>夙川フレンチ｜ル&nbsp;ベナトン</title>
<meta name="Description" content="西宮・夙川のフレンチレストラン「ル&nbsp;ベナトン」。ミシュランガイド兵庫版掲載店。ジビエ料理、ブルゴーニュワイン。フランス「食の都」ボーヌ仕込みの味をご堪能ください"。>
<meta name="Keywords" content="夙川フレンチ,西宮フレンチ,兵庫フレンチ,神戸フレンチ,阪神間フランチ,ブルゴーニュワイン,ブルゴーニュ料理,ブルゴーニュ,ボーヌ,黄金の丘,神戸ジビエ,西宮ジビエ,関西フレンチ,関西ジビエ,ジビエ料理,夙川ランチ,夙川ディナー,西宮ランチ,西宮ディナー,神戸ランチ,神戸ディナー">
<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">
<meta name="format-detection" content="telephone=no"> 
<meta name="google-site-verification" content="sf9tNhZ_bJR_c-OXC3qO63Jy3NWsoq_70XZmgZAcYQg" />
<link rel="stylesheet" href="./css/normalize.css">
<link rel="stylesheet" type="text/css" href="css/styles.css">


<!--<link rel="stylesheet" type="text/css" href="css/main.css">-->

<link rel="stylesheet" href="./css/slider.css">
<link href='http://fonts.googleapis.com/css?family=Hammersmith+One|Roboto+Slab|Droid+Serif' rel='stylesheet' type='text/css'>
<!--[if lt IE9]>
	 <script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script>
	<![endif]-->
<script src="js/jquery-1.10.2.min.js"></script>
<script type="text/javascript" src="js/jquery.easing.1.3.js"></script>
<script type="text/javascript" src="js/scroll.js"></script>
<script src="js/jquery.sliphover.min.js"></script>
<script src="js/tab.ini.js"></script>
<script type="text/javascript">
          $(function(){
       $("#container").sliphover({
    duration: 100
   
    
});
      
		});
        </script>


<script>
 (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
 (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
 m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
 })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

 ga('create', 'UA-99005030-1', 'auto');
 ga('send', 'pageview');

</script>

<!--三本線メニュー-->

<!--<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>-->
<script>
(function($) {
    $(function() {
        var $header = $('#top-head');
        // Nav Fixed
        $(window).scroll(function() {
            if ($(window).scrollTop() > 350) {
                $header.addClass('fixed');
            } else {
                $header.removeClass('fixed');
            }
        });
        // Nav Toggle Button
        $('#nav-toggle').click(function(){
            $header.toggleClass('open');
        });
    });
})(jQuery);

</script>

<!--三本線新規メニュー始まり-->
<script>




</script>
<!--三本線新規メニュー終わり-->


<!--三本線メニュー-->
<!--ページ途中スクロール-->
<script>


$(function() {
    var n = window.location.href.slice(window.location.href.indexOf('?') + 4);
    if(n.length < $(".scroll-inner h2").size()) {
        var p = $(".scroll-inner h2").eq(n).offset().top;
        $('html,body').animate({ scrollTop: p }, 'slow');
        return false;
    }
});

</script>
<!--ページ途中スクロール-->



</head>
<body>
<div id="wrapper">


 <div id="topPage"></div>

<header id="top-head">
    <div class="innerNav">
        <div id="mobile-head">
            <h1 class="logo"><a href="index.html"><img src="./images/logoBenaton.png" alt="夙川フレンチ｜ル&nbsp;ベナトン"></a></h1>
            
          
            <div id="nav-toggle">
                <div>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div>
       <nav id="global-nav">
            <div>
                <p class="navi-center"><a href="index.html?no=0">LUNCH</a></p>
                <p class="navi-center"><a href="index.html?no=1">DINNER</a></p>
                <p class="navi-center"><a href="index.html?no=2">WINE</a></p>
                <p class="navi-center"><a href="index.html?no=3">PROFILE</a></p>
                <p class="navi-center"><a href="index.html?no=4">ACCESS</a></p>
                <p class="navi-center"><a href="index.html?no=5">ご予約</a></p>
                <p class="navi-center"><a href="index.html?no=6">VOYAGE</a></p>
                <p id="inatagram"><a href="https://www.instagram.com/le_benaton/" target="_blank"><img src="images/instagram.png" alt="ル&nbsp;ベナトン｜公式インスタグラム" title="ル&nbsp;ベナトン｜公式インスタグラム"></a></p>
            </div>
        </nav>
    </div>
</header>



 
<div class="confirm">
<?php if($empty_flag == 1){ ?>
<h4>入力にエラーがあります。下記をご確認の上「戻る」ボタンにて修正をお願い致します。</h4>
<div style="color:red"><?php echo $errm; ?></div>
<input type="button" value="戻る" onClick="history.back()" class="submitButton">
</div>
</body>
</html>
<?php }else{ ?>
<div class="confirm">送信は正常に完了しました。<br />ご記入いただきましたメールアドレスに自動返信メールを送らせていただきます。<br />未達の場合は、迷惑メールフォルダをご確認ください。<br /><br />
<a href="<?php echo $site_top ;?>" class="submitButton">トップページ</a></div>

<!--  CV率を計測する場合ここにAnalyticsコードを貼り付け -->
</body>
</html>
<?php 
/* ▲▲▲送信完了画面のレイアウト 編集可 ※送信完了後に指定のページに移動しない場合のみ表示▲▲▲　*/
  }
}
//確認画面無しの場合の表示、指定のページに移動する設定の場合、エラーチェックで問題が無ければ指定ページヘリダイレクト
else if(($jumpPage == 1 && $sendmail == 1) || $confirmDsp == 0) { 
	if($empty_flag == 1){ ?>
     <nav id="mainNav">
      <p id="logo"><a href="index.html"><img src="./images/logo.png" alt="Tomofumi Nakano photography"></a></p>
      <p class="col2"><a href="gallery.html">gallery</a></p>
      <p class="col2"><a href="bio.html">bio</a></p>
      <p class="col2"><a href="contact.html">contact</a></p>
      <p class="col2"><a href="news.html">news</a></p>
   </nav>
 
  </header>

 <h2><span>confirm</span></h2>
<div class="confirm"><h4>入力にエラーがあります。下記をご確認の上「戻る」ボタンにて修正をお願い致します。<br>Error.Please check the contents that you fill in and press the back button.</h4><div style="color:red"><?php echo $errm; ?></div><input type="button" value="Back / 戻る" onClick="history.back()" class="submitButton"></div>
<?php 
	}else{ header("Location: ".$thanksPage); }
}

// 以下の変更は知識のある方のみ自己責任でお願いします。

//----------------------------------------------------------------------
//  関数定義(START)
//----------------------------------------------------------------------
function checkMail($str){
	$mailaddress_array = explode('@',$str);
	if(preg_match("/^[\.!#%&\-_0-9a-zA-Z\?\/\+]+\@[!#%&\-_0-9a-z]+(\.[!#%&\-_0-9a-z]+)+$/", "$str") && count($mailaddress_array) ==2){
		return true;
	}else{
		return false;
	}
}
function h($string) {
	global $encode;
	return htmlspecialchars($string, ENT_QUOTES,$encode);
}
function sanitize($arr){
	if(is_array($arr)){
		return array_map('sanitize',$arr);
	}
	return str_replace("\0","",$arr);
}
//Shift-JISの場合に誤変換文字の置換関数
function sjisReplace($arr,$encode){
	foreach($arr as $key => $val){
		$key = str_replace('＼','ー',$key);
		$resArray[$key] = $val;
	}
	return $resArray;
}
//送信メールにPOSTデータをセットする関数
function postToMail($arr){
	global $hankaku,$hankaku_array;
	$resArray = '';
	foreach($arr as $key => $val) {
		$out = '';
		if(is_array($val)){
			foreach($val as $key02 => $item){ 
				//連結項目の処理
				if(is_array($item)){
					$out .= connect2val($item);
				}else{
					$out .= $item . ', ';
				}
			}
			$out = rtrim($out,', ');
			
		}else{ $out = $val; }//チェックボックス（配列）追記ここまで
		if(get_magic_quotes_gpc()) { $out = stripslashes($out); }
		
		//全角→半角変換
		if($hankaku == 1){
			$out = zenkaku2hankaku($key,$out,$hankaku_array);
		}
		if($out != "confirm_submit" && $key != "httpReferer") {
			$resArray .= "【 ".h($key)." 】 ".h($out)."\n";
		}
	}
	return $resArray;
}
//確認画面の入力内容出力用関数
function confirmOutput($arr){
	global $hankaku,$hankaku_array;
	$html = '';
	foreach($arr as $key => $val) {
		$out = '';
		if(is_array($val)){
			foreach($val as $key02 => $item){ 
				//連結項目の処理
				if(is_array($item)){
					$out .= connect2val($item);
				}else{
					$out .= $item . ', ';
				}
			}
			$out = rtrim($out,', ');
			
		}else{ $out = $val; }//チェックボックス（配列）追記ここまで
		if(get_magic_quotes_gpc()) { $out = stripslashes($out); }
		$out = nl2br(h($out));//※追記 改行コードを<br>タグに変換
		$key = h($key);
		
		//全角→半角変換
		if($hankaku == 1){
			$out = zenkaku2hankaku($key,$out,$hankaku_array);
		}
		
		$html .= "<tr><th>".$key."</th><td>".$out;
		$html .= '<input type="hidden" name="'.$key.'" value="'.str_replace(array("<br />","<br>"),"",$out).'" />';
		$html .= "</td></tr>\n";
	}
	return $html;
}

//全角→半角変換
function zenkaku2hankaku($key,$out,$hankaku_array){
	global $encode;
	if(is_array($hankaku_array) && function_exists('mb_convert_kana')){
		foreach($hankaku_array as $hankaku_array_val){
			if($key == $hankaku_array_val){
				$out = mb_convert_kana($out,'a',$encode);
			}
		}
	}
	return $out;
}
//配列連結の処理
function connect2val($arr){
	$out = '';
	foreach($arr as $key => $val){
		if($key === 0 || $val == ''){//配列が未記入（0）、または内容が空のの場合には連結文字を付加しない（型まで調べる必要あり）
			$key = '';
		}elseif(strpos($key,"円") !== false && $val != '' && preg_match("/^[0-9]+$/",$val)){
			$val = number_format($val);//金額の場合には3桁ごとにカンマを追加
		}
		$out .= $val . $key;
	}
	return $out;
}

//管理者宛送信メールヘッダ
function adminHeader($userMail,$post_mail,$BccMail,$to){
	$header = '';
	if($userMail == 1 && !empty($post_mail)) {
		$header="From: $post_mail\n";
		if($BccMail != '') {
		  $header.="Bcc: $BccMail\n";
		}
		$header.="Reply-To: ".$post_mail."\n";
	}else {
		if($BccMail != '') {
		  $header="Bcc: $BccMail\n";
		}
		$header.="Reply-To: ".$to."\n";
	}
		$header.="Content-Type:text/plain;charset=iso-2022-jp\nX-Mailer: PHP/".phpversion();
		return $header;
}
//管理者宛送信メールボディ
function mailToAdmin($arr,$subject,$mailFooterDsp,$mailSignature,$encode,$confirmDsp){
	$adminBody="「".$subject."」からメールが届きました\n\n";
	$adminBody .="＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝\n\n";
	$adminBody.= postToMail($arr);//POSTデータを関数からセット
	$adminBody.="\n＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝\n";
	$adminBody.="送信された日時：".date( "Y/m/d (D) H:i:s", time() )."\n";
	$adminBody.="送信者のIPアドレス：".@$_SERVER["REMOTE_ADDR"]."\n";
	$adminBody.="送信者のホスト名：".getHostByAddr(getenv('REMOTE_ADDR'))."\n";
	if($confirmDsp != 1){
		$adminBody.="問い合わせのページURL：".@$_SERVER['HTTP_REFERER']."\n";
	}else{
		$adminBody.="問い合わせのページURL：".@$arr['httpReferer']."\n";
	}
	if($mailFooterDsp == 1) $adminBody.= $mailSignature;
	return mb_convert_encoding($adminBody,"JIS",$encode);
}

//ユーザ宛送信メールヘッダ
function userHeader($refrom_name,$to,$encode){
	$reheader = "From: ";
	if(!empty($refrom_name)){
		$default_internal_encode = mb_internal_encoding();
		if($default_internal_encode != $encode){
			mb_internal_encoding($encode);
		}
		$reheader .= mb_encode_mimeheader($refrom_name)." <".$to.">\nReply-To: ".$to;
	}else{
		$reheader .= "$to\nReply-To: ".$to;
	}
	$reheader .= "\nContent-Type: text/plain;charset=iso-2022-jp\nX-Mailer: PHP/".phpversion();
	return $reheader;
}
//ユーザ宛送信メールボディ
function mailToUser($arr,$dsp_name,$remail_text,$mailFooterDsp,$mailSignature,$encode){
	$userBody = '';
	if(isset($arr[$dsp_name])) $userBody = h($arr[$dsp_name]). " 様\n";
	$userBody.= $remail_text;
	$userBody.="\n＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝\n\n";
	$userBody.= postToMail($arr);//POSTデータを関数からセット
	$userBody.="\n＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝\n\n";
	$userBody.="送信日時：".date( "Y/m/d (D) H:i:s", time() )."\n";
	if($mailFooterDsp == 1) $userBody.= $mailSignature;
	return mb_convert_encoding($userBody,"JIS",$encode);
}
//必須チェック関数
function requireCheck($require){
	$res['errm'] = '';
	$res['empty_flag'] = 0;
	foreach($require as $requireVal){
		$existsFalg = '';
		foreach($_POST as $key => $val) {
			if($key == $requireVal) {
				
				//連結指定の項目（配列）のための必須チェック
				if(is_array($val)){
					$connectEmpty = 0;
					foreach($val as $kk => $vv){
						if(is_array($vv)){
							foreach($vv as $kk02 => $vv02){
								if($vv02 == ''){
									$connectEmpty++;
								}
							}
						}
						
					}
					if($connectEmpty > 0){
						$res['errm'] .= "<p class=\"error_messe\">【".h($key)."】は必須項目です。</p>\n";
						$res['empty_flag'] = 1;
					}
				}
				//デフォルト必須チェック
				elseif($val == ''){
					$res['errm'] .= "<p class=\"error_messe\">【".h($key)."】は必須項目です。</p>\n";
					$res['empty_flag'] = 1;
				}
				
				$existsFalg = 1;
				break;
			}
			
		}
		if($existsFalg != 1){
				$res['errm'] .= "<p class=\"error_messe\">【".$requireVal."】が未選択です。</p>\n";
				$res['empty_flag'] = 1;
		}
	}
	
	return $res;
}
//リファラチェック
function refererCheck($Referer_check,$Referer_check_domain){
	if($Referer_check == 1 && !empty($Referer_check_domain)){
		if(strpos($_SERVER['HTTP_REFERER'],$Referer_check_domain) === false){
			return exit('<p class="confirm">リファラチェックエラー。フォームページのドメインとこのファイルのドメインが一致しません</p>');
		}
	}
}
//function copyright(){
//	echo '<a style="display:block;text-align:center;margin:15px 0;font-size:11px;color:#aaa;text-decoration:none" href="http://www.php-factory.net/" target="_blank">- PHP工房 -</a>';
//}
//----------------------------------------------------------------------
//  関数定義(END)
//----------------------------------------------------------------------
?>