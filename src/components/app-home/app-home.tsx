import {Component, h, Host, State} from '@stencil/core';

import * as firebase from "firebase/app";
import { Firestore, getFirestore, setDoc, collection, doc, query, where, getDocs } from 'firebase/firestore';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.scss',
  shadow: false,
})
export class AppHome {
  db : Firestore;
  @State() dayAccess: number;
  @State() dayConversion: number;
  @State() presentToastAccess = false;
  @State() presentToastConversion = false;

  constructor() {
    const firebaseConfig = {
      apiKey: "AIzaSyDZX9RvCWbBOiRl0_heOshMEFUiI9QqD0g",
      authDomain: "benaton-japan.firebaseapp.com",
      databaseURL: "https://benaton-japan.firebaseio.com",
      projectId: "benaton-japan",
      storageBucket: "benaton-japan.appspot.com",
      messagingSenderId: "1025137347365",
      appId: "1:1025137347365:web:db7c40932f74dcf0c928cc"
    };
    const firebaseApp = firebase.initializeApp(firebaseConfig);
    this.db = getFirestore(firebaseApp);
  }

  componentDidLoad() {
    setDoc(doc(collection(this.db, 'access'), this.getUserId()), {
      timestamp: new Date().getTime(),
    }).catch((e) => console.log(e));

    setTimeout(() => {
      this.$refinementRecord().then((data) => this.reflectRecord(data));
    }, 5000);
  }

  $recordConversion = () => {
    setDoc(doc(collection(this.db, 'conversion'), this.getUserId()), {
      timestamp: new Date().getTime(),
    }).catch((e) => console.log(e));
  };

  $refinementRecord = async (): Promise<IRecord> => {
    const accessQuery = query(
      collection(this.db, "access"),
      // @ts-ignore
      where('timestamp', '>', new Date(new Date() - 1000 * 60 * 15).getTime()),
    )
    const accessSnapshot = await getDocs(accessQuery);

    const conversionQuery = query(
      collection(this.db, "conversion"),
      // @ts-ignore
      where('timestamp', '>', new Date(new Date() - 1000 * 60 * 60 * 24).getTime()),
    )
    const conversionSnapshot = await getDocs(conversionQuery);

    return {
      dayAccess: accessSnapshot.docs.length,
      dayConversion: conversionSnapshot.docs.length,
    };
  };

  reflectRecord = (record: IRecord) => {
    this.dayAccess = record.dayAccess;
    this.dayConversion = record.dayConversion;

    setTimeout(() => (this.presentToastAccess = true, 2000));
    setTimeout(() => (this.presentToastAccess = false), 2000 + 10000);

    setTimeout(() => (this.presentToastConversion = true, 2000 * 2));
    setTimeout(() => (this.presentToastConversion = false), 2000 * 2 + 10000);
  };

  clickToast(event) {
    event.srcElement.parentNode.removeChild(event.srcElement)
  }

  private getUserId = (): string => {
    let analyticsId = localStorage.getItem('analyticsId');
    if (!analyticsId) {
      analyticsId = 'id' + String(new Date().getTime());
      localStorage.setItem('analyticsId', analyticsId);
    }
    return analyticsId;
  };

  render() {
    return (
    <Host>
      <main>
        <section class="main-visual">
          <h1 class="title">西宮・夙川のフレンチレストラン「ル ベナトン」</h1>
          <div class="hero-image">
            <div>
              <img
                src="assets/images/slides/104380ga10000008.jpg"
                decoding="async"
                width="800"
                height="400"
                alt="ジビエ コルベールのロースト"
              />
            </div>
            <div>
              <img
                src="assets/images/slides/104380ga10000003.jpg"
                decoding="async"
                width="800"
                height="400"
                alt="西宮・夙川のフレンチレストラン「ル ベナトン」店内の様子"
              />
            </div>
            <div>
              <img
                src="assets/images/slides/104380ga10000007.jpg"
                decoding="async"
                width="800"
                height="400"
                alt="鮮魚のカルパッチョ"
              />
            </div>
            <a
              class="button"
              href="https://tabelog.com/hyogo/A2803/A280301/28009616/dtlphotolst/1/smp2/"
              rel="noopener"
              target="_blank"
            >
              食べログから写真をみる
            </a>
          </div>
        </section>

        <app-guideline></app-guideline>

        <section id="menu-lunch">
          <div class="wrap">
            <h2 class="subtitle">
              ランチ
              <span>
              <img src="assets/svg/time.svg" class="svg" decoding="async" />
              11：45～14：00（ラストオーダー）
            </span>
            </h2>
            <div class="leading-container">
              <h3>日々の疲れを癒やし、ゆっくりと過ごす贅沢時間</h3>
              <div class="parenthesis">
                <p>
                  魚介は瀬戸内、野菜は兵庫県産をメインに、肉は各々の時期にもっともおいしいものを日本全国から仕入れ、ヨーロッパ各地からも、オマール海老、秋から冬にかけて旬をむかえるハト、カモなどのジビエも仕入れ、本格的なフランス料理を、満足のいくボリュームでご提供しています。
                </p>
                <p>
                  お客様に贅沢な時間を過ごしていただきたいという思いから、ランチでも、<strong>ディナーでご提供しているコース・ワインもご注文いただくことができます。</strong>ダークブラウンの落ち着いた空間で、思い出に残るひとときをお過ごしください。
                </p>
              </div>
            </div>

            <div class="equidistant-container">
              <section class="equidistant-container-inner">
                <img
                  src="assets/images/lunch1.jpg"
                  decoding="async"
                  width="800"
                  height="534"
                  alt="西宮・夙川のフレンチレストラン「ル ベナトン」 Aコース"
                />
                <h4>Aコース(ランチのみ)</h4>
                <ul>
                  <li>アミューズ</li>
                  <li>前菜（数種類の中らお選びいただけます）</li>
                  <li>メイン料理（本日のお魚又はお肉料理）</li>
                  <li>デザート</li>
                  <li>パン、コーヒー</li>
                </ul>
                <p>3,850円(税込)</p>
              </section>

              <div class="equidistant-container-inner">
                <img
                  src="assets/images/lunch2.jpg"
                  decoding="async"
                  width="800"
                  height="534"
                  alt="西宮・夙川のフレンチレストラン「ル ベナトン」 Bコース"
                />
                <h4>Ｂコース(ランチのみ)</h4>
                <ul>
                  <li>アミューズ</li>
                  <li>前菜（数種類の中らお選びいただけます）</li>
                  <li>お魚料理（数種類の中らお選びいただけます）</li>
                  <li>お肉料理（数種類の中らお選びいただけます）</li>
                  <li>デザート</li>
                  <li>パン、コーヒー</li>
                </ul>
                <p>5,280円(税込)</p>
              </div>

              <div class="equidistant-container-inner">
                <img
                  src="assets/images/lunch3.jpg"
                  decoding="async"
                  width="800"
                  height="533"
                  alt="西宮・夙川のフレンチレストラン「ル ベナトン」 Cコース"
                />
                <h4>Ｃ・シェフお任せコース(ランチのみ)</h4>
                <ul>
                  <li>アミューズ、前菜、メイン（お肉、魚介）を、その日の食材でお料理を組み立てさせていただきます</li>
                  <li>デザート</li>
                  <li>パン、コーヒー</li>
                </ul>
                <p>6,600円(税込)</p>
              </div>
            </div>
          </div>
        </section>

        <section id="menu-dinner">
          <div class="wrap">
            <h2 class="subtitle">
              ディナー
              <span>
              <img src="assets/svg/time.svg" class="svg" decoding="async" />
              17：30～21：00（ラストオーダー）
            </span>
            </h2>
            <div class="leading-container">
              <h3>フランス食の都「ボーヌ」仕込みのディナーをご堪能ください</h3>
              <div class="parenthesis">
                <p>
                  フランス・ブルゴーニュ地方は食とワインの宝庫として知られています。<strong>「食の都」ボーヌの星付きレストラン</strong>で修業した当店シェフは、カモ、シカ、イノシシなどのお肉への最高の火入れの技術を有し、本場のフランス料理だけではなく<strong>ワインにも精通</strong>しています。野菜は毎週、旬の物を産地まで買い付けに行きます。ヨーロッパ各地から仕入れるハト、カモなどのジビエ料理、フランス・ブルターニュ産のオマール海老、日本近海で獲れた新鮮な魚介もお楽しみいただけます。
                </p>
                <p>
                  ブルゴーニュワインに特化したワインセラーも店内に完備。現地の風土を知り尽くした<strong>選び抜かれたブルゴーニュワイン</strong>と<strong>本格的なフランス料理</strong>は、あたかも<strong>ブルゴーニュを旅したような食体験</strong>です。旬の食材からコース料理をご提案いたしますので、ゆったりとした時間をお楽しみください。
                </p>
              </div>
            </div>

            <div class="equidistant-container">
              <section class="equidistant-container-inner">
                <img
                  src="assets/images/dinner1.jpg"
                  decoding="async"
                  width="800"
                  height="534"
                  alt="西宮・夙川のフレンチレストラン「ル ベナトン」 ブルギニオンコース"
                />
                <h4>ブルギニオンコース</h4>
                <ul>
                  <li>アミューズ</li>
                  <li>前菜（数種類の中らお選びいただけます）</li>
                  <li>お魚料理</li>
                  <li>お肉料理（数種類の中らお選びいただけます）</li>
                  <li>チーズ又は、小さなサラダ</li>
                  <li>デザート(数種類の中からお選びいただけます)</li>
                  <li>パン、コーヒー</li>
                </ul>
                <p>6,600円(税込、サービス料５%別途)</p>
              </section>

              <section class="equidistant-container-inner">
                <img
                  src="assets/images/dinner2.jpg"
                  decoding="async"
                  width="800"
                  height="534"
                  alt="西宮・夙川のフレンチレストラン「ル ベナトン」 グルマンコース"
                />
                <h4>グルマンコース</h4>
                <ul>
                  <li>アミューズ</li>
                  <li>前菜２種（数種類の中らお選びいただけます）</li>
                  <li>ボキャルドオマール（オマール海老のスープ仕立)</li>
                  <li>メイン料理（数種類のお肉の中からお選びいただけます)</li>
                  <li>チーズ又は、小さなサラダ</li>
                  <li>デザート(数種類の中からお選びいただけます)</li>
                  <li>パン、コーヒー</li>
                </ul>

                <p>9,350円(税込、サービス料５%別途)</p>
              </section>

              <section class="equidistant-container-inner">
                <img
                  src="assets/images/dinner3.jpg"
                  decoding="async"
                  width="800"
                  height="534"
                  alt="西宮・夙川のフレンチレストラン「ル ベナトン」 デギュステコース"
                />
                <h4>デギュステ・シェフお任せコース</h4>
                <ul>
                  <li>アミューズ</li>
                  <li>その日の食材でお客様とお話させていただいてお料理を組み立てさせていただきます</li>
                  <li>デザート(数種類の中からお選びいただけます)</li>
                  <li>パン、コーヒー</li>
                </ul>
                <p>
                  13,200円(税込、サービス料５%別途)<br/>その他、お客様のご希望がございましたら、スタッフにお申し付け下さい。
                </p>
              </section>
            </div>
          </div>
        </section>

        <section id="menu-wine">
          <div class="wrap">
            <h2>ワイン</h2>
            <div class="leading-container">
              <h3>ワインの名産地「黄金の丘」より選び抜いたワインをご提案いたします</h3>
              <div class="parenthesis">
                <p>
                  食の都「ボーヌ」は、ワインの名産地である黄金の丘でも知られているブルゴーニュ地方の中心部に位置しています。そこの星付きレストランで修業した当店シェフは、<strong>毎週のようにドメーヌをめぐり、作り手と、香りやマリアージュ、飲み頃について意見を交わしましてきました。</strong>そこで身につけた知識と感性で、ワインをおすすめいたします。
                </p>
                <p>
                  当店ではブルゴーニュワインに特化したワインセラーを店内に完備し、当店シェフが選びぬいたブルゴーニュワインからお料理にあわせてワインを提案させていただきます。当店でどのようなワインがあるか、ぜひ、以下のリストをご覧ください。
                </p>
              </div>
            </div>

            <div class="equidistant-container">
              <section id="red-wine" class="equidistant-container-inner">
                <p>
                  <img src="assets/images/red.jpg" class="radius" decoding="async" width="500" height="500" alt="赤ワイン"/>
                </p>
                <h3 class="wine-title">赤ワインリスト<br/>VIN ROUGE de Bourgogne<br/>ブルゴーニュ ( 赤 )</h3>
              </section>

              <section id="white-wine" class="equidistant-container-inner">
                <p>
                  <img src="assets/images/white.jpg" class="radius" decoding="async" width="500" height="500" alt="白ワイン"/>
                </p>
                <h3 class="wine-title">白ワインリスト<br/>VIN BLANC de Bourgogne<br/>ブルゴーニュ( 白 )</h3>
              </section>

              <section id="champagne-wine" class="equidistant-container-inner">
                <p>
                  <img
                    src="assets/images/sparkring.jpg"
                    class="radius"
                    decoding="async"
                    width="500"
                    height="500"
                    alt="シャンパン"
                  />
                </p>
                <h3 class="wine-title">
                  シャンパーニュ/スパークリングワインリスト<br/>
                  CHAMPAGNE(シャンパーニュ)<br/>
                  VIN MOUSSEUX(ブルゴーニュ産スパークリングワイン)
                </h3>
              </section>
            </div>
            <hr/>
            <div class="leading-container">
              <p>
                ワイン・シャンパンの価格は、輸入価格の相場により予告なく変更することがございます。
                また、ワイン・シャンパンの在庫の本数もなくなる場合がありますので、ご了承下さい。
                リスト以外のワインも多数ご用意しておりますので、お気軽にお尋ね下さい。
              </p>
              <p>
                また、当店ではワインのお持ち込みも歓迎しております。お客様のお気に入りのワインをお持ち下さい。
                持ち込み料金ですが、ボトル一本に付き「3,000円」、又はお店にグラス一杯分を分けて頂くことで持ち込み料金とさせて頂いております。
                お持込頂きます際には、本数、銘柄を事前にお店までお伝えください。
                当日突然のお持込には対応させていただけない場合もございます、ご了承ください。
                （グラス等の準備のためご協力お願いいたします）
              </p>
            </div>
          </div>
        </section>

        <section id="menu-profile">
          <div class="wrap">
            <h2>プロフィール</h2>
            <div class="leading-container-flex">
              <img
                src="assets/images/takaya.jpg"
                decoding="async"
                width="600"
                height="600"
                alt="西宮・夙川のフレンチレストラン「ル ベナトン」オーナー・シェフ　高谷慶"
              />
              <div>
                <h3>本格「ボーヌ」仕込みの味<br/>ヨーロッパと日本の食材で地元・夙川で提供いたします</h3>
                <div class="parenthesis">
                  <p>
                    フランスのブルゴーニュの食の都「ボーヌ」の星付きレストラン「ル
                    ベナトン」での4年間の修業を経て、2008年に生まれ育った夙川に、その名前を引き継いだ自らの店をオープンいたしました。ブルゴーニュはワインの名産地である黄金の丘でも知られ、ボーヌはその中心地に位置しています。2015年には「ブルゴーニュ地方のクリマ（ブドウ畑や気候）」は世界遺産に登録されました。ボーヌでは11月の第３週末には「栄光の3日間
                    LES TROIS
                    GLORIEUSES」と呼ばれるワインと食の祭典が催され、普段はブドウ畑に囲まれた小さな街が「フランス食の都」となります。
                  </p>
                  <p>
                    本場ブルゴーニュの味を引き継ぎ、ヨーロッパから仕入れた食材、地元の兵庫県の食材を取り入れたりしながら、故郷である夙川の地で発展させていきたいと思っています。
                  </p>
                  <p>オーナー・シェフ 高谷慶(Kei TAKAYA)</p>
                </div>
              </div>
            </div>

            <div class="equidistant-container">
              <div class="equidistant-container-inner">
                <p>
                  <img
                    src="assets/images/outside.jpg"
                    decoding="async"
                    width="800"
                    height="534"
                    alt="西宮・夙川のフレンチレストラン「ル ベナトン」外観"
                  />
                </p>
                <p class="text-center">ミシュランガイド兵庫版にも掲載されました。</p>
              </div>

              <div class="equidistant-container-inner">
                <p>
                  <img
                    src="assets/images/inside.jpg"
                    decoding="async"
                    width="800"
                    height="534"
                    alt="西宮・夙川のフレンチレストラン「ル ベナトン」内観"
                  />
                </p>
                <p class="text-center">客席からワインセラーを一覧いただけます</p>
              </div>

              <div class="equidistant-container-inner">
                <p>
                  <img
                    src="assets/images/inside2.jpg"
                    decoding="async"
                    width="800"
                    height="534"
                    alt="西宮・夙川のフレンチレストラン「ル ベナトン」テーブル"
                  />
                </p>
                <p class="text-center">１０テーブル、２０名様までご利用いただけます</p>
              </div>
            </div>
          </div>
        </section>

        <section id="copy-reserved">
          <app-guideline></app-guideline>
        </section>

        <section id="menu-contact">
          <div class="wrap">
            <h2>お問い合わせ</h2>

            <div class="leading-container">
              <h3 class="text-left">お問い合わせについて</h3>
              <ul class="contact-wrapper">
                <li>
                  ご予約は、<a href="tel:0798-37-2655">電話</a>または
                  <a
                    href="https://reserve.resebook.jp/resty/webrsv/rsv_vacants/vacant/s014049701/5580?show=3"
                    rel="noopener"
                  >予約サイト</a
                  >より承ります。お急ぎの場合は、お電話ください。
                </li>
                <li>
                  お申し出に対しては順次対応させていただいておりますが、受付時間外に送信いただいたものや、内容によりましてはお返事にお時間を頂戴する場合がございます。
                </li>
                <li>
                  ご入力いただいたEメールアドレスや電話番号が誤っている場合やシステム障害が発生した場合等には回答ができない場合がございます。一週間以上経っても回答未着の場合、お手数ですがお電話ください。
                </li>
              </ul>
              <h4>問い合わせフォーム</h4>
              <form name="contact" method="post" action="complete.html">
                <div class="form-line">
                  <label htmlFor="name"><span class="form-label required">必須</span>お名前</label>
                  <input id="name" type="text" name="お名前" required placeholder="例）山田太郎"/>
                </div>
                <div class="form-line">
                  <label htmlFor="mail"><span class="form-label required">必須</span>メールアドレス（半角）</label>
                  <input
                    type="text"
                    name="mail"
                    id="mail"
                    inputMode="email"
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
                    required
                    placeholder="例）info@example.com"
                  />
                </div>

                <div class="form-line">
                  <label htmlFor="tel">お電話番号（半角）</label>
                  <input
                    type="text"
                    name="電話番号"
                    placeholder="例）09012345678"
                    inputMode="tel"
                    pattern="\d{2,4}-?\d{3,4}-?\d{3,4}"
                    id="tel"
                  />
                </div>

                <div class="form-line">
                  <label htmlFor="message"><span class="form-label required">必須</span>メッセージ</label>
                  <textarea
                    id="message"
                    name="ご質問内容"
                    cols={50}
                    rows={5}
                    required
                    placeholder="※ご予約は、電話または予約サイトより承ります。"
                  ></textarea>
                </div>
                <p class="text-center">
                  <button type="submit" class="submitButton" onClick={this.$recordConversion}>問い合わせ送信</button>
                </p>
              </form>
            </div>
          </div>
        </section>

        <section id="menu-stuff">
          <div class="wrap">
            <div class="leading-container">
              <h4>スタッフ募集</h4>
              <p>
                ベナトンで一緒に働きませんか？やる気のあるあなたを募集しています。詳しくはお店までお問い合わせください
              </p>
            </div>
            <ul class="no-list-style equidistant-container">
              <li class="equidistant-container-inner container-half">
                <div class="parenthesis">
                  <h5>サービス、ソムリエ（社員・アルバイト）</h5>
                  <p>
                    経験に応じて給与は考慮いたします。<br/>
                    社会保険、雇用保険有り<br/>
                    昇給年1回、(業績、勤続年数によって変わります)<br/>
                    資格取得の応援もしています。ソムリエ、調理師等
                  </p>
                </div>
              </li>
              <li class="equidistant-container-inner container-extend">
                <div class="parenthesis">
                  <h5>調理スタッフ（社員）</h5>
                  <p>
                    フランス料理に興味のある方一緒にお仕事しませんか？<br/>
                    未経験、年齢は問いません、経験してみたい方お待ちしています。<br/>
                    資格取得の応援もしています。ソムリエ、調理師等
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </section>

        <section id="menu-voyage">
          <div class="wrap">
            <h2>VOYAGE</h2>
            <div class="equidistant-container">
              <div class="equidistant-container-inner container-half">
                <div class="padding">
                  <img src="assets/images/voyage1.jpg" decoding="async" alt=""/>
                  <p class="parenthesis">
                    関西国際空港を飛び立ったエールフランス291便は12時間35分後、パリのシャルル・ド・ゴール空港に滑り込んだ。11月のしっとりした曇り空に溶けているエッフェル塔に短く「ボンジュール」とあいさつをし、オーステルリッツ駅から、かつて「ル
                    ベナトン」のシェフ高谷慶が修業したブルゴーニュの食の都「ボーヌ」に向かう列車に乗り込んだ。数日後プジョーを運転し広大なブルゴーニュの牧草地を貫くD903号線を抜け、山裾に広がるエパニー村に到着。1850年代から続く村のハンティング協会の狩猟の見学許可がやっと出たのだった。
                  </p>
                </div>
              </div>

              <div class="equidistant-container-inner container-half">
                <div class="padding">
                  <img src="assets/images/voyage2.jpg" decoding="async" width="800" height="534" alt=""/>
                  <p class="parenthesis">
                    早朝の集会場では約50人のハンターにもうもうと湯気の立つスープが振る舞われ、活気に満ちた作戦会議が行われる。散弾銃に、バゲットのサンドイッチ、赤ワインのボトルを手に山に向かう。「プププ、プッププー」。突然ラッパが鳴りひびく。傍らにいた会長に目くばせすると「オスのイノシシが向かった方角を、音色とリズムで伝えているんだよ」と解説してくれる。猟犬が茂みから飛び出し林道をかけて、また草むらに飛び込んでいく。「パーン」と甲高い発砲音がこだまする。200キロの大きなイノシシが横たわっていた。クレーンのついたISUZUの四輪自動車は猟場と集会場を往復し、その日の獲物をどんどん運んだ。
                  </p>
                </div>
              </div>

              <div class="equidistant-container-inner container-half">
                <div class="padding">
                  <img src="assets/images/voyage3.jpg" decoding="async" width="800" height="534" alt=""/>
                  <p class="parenthesis">
                    この週末の成果はイノシシ、シカ合わせて20頭ほど。解体場でかいだ肉からは、ほんのりアプリコットのような香りがした。この季節、山には野生の果実が十分に実り、トリュフなどを求めキノコ採りの人が入る。そんな豊かな食べ物で動物たちは冬に備えている。フランスにはプロのハンターがいないのだという。週末にハンティングを趣味とする人たちが集まる。「俺の作ったワインだ。飲んでいけ！」とワイナリーを営むおじさんがほほ笑む。猟果を披露しながら宴会が始まる。立派なキバのついたイノシシはリビングに飾るため、腕のいい隣村の剥製職人のアランさんに依頼するのだろう。
                  </p>
                </div>
              </div>

              <div class="equidistant-container-inner container-half">
                <div class="padding">
                  <img src="assets/images/voyage4.jpg" decoding="async" width="800" height="534" alt=""/>
                  <p class="parenthesis">
                    お肉は仲買人がハンターからレストランに卸しているのだそう。翌日アランさんが住むメッシニー・エ・ヴァントー村を訪ねた。目当ては「きのうのイノシシ」。ハンターにお土産にお肉を持たせてもらうことがあっても、地元の食文化でジビエ（野生のお肉）がどう料理されるか見てみたかった。村の教会の鐘楼が見下ろすレストランのドアを「ボンジュール！」と勢いよく開ける。
                    「さあ、きょうはどんな一品が出てくるのだろうか」
                    <a href="http://www.tomofuminakano.com/index.html" rel="noopener" target="_blank"
                    >(写真家・中野智文)</a
                    >
                  </p>
                </div>
              </div>
            </div>
          </div>
          <footer class="text-center padding">COPYRIGHT le benaton.</footer>
        </section>
      </main>

      <section class="toast-area">
        {this.dayAccess > 0 ?
          <a class={this.presentToastAccess ? 'toast open' : 'toast hide'} onClick={this.clickToast}>
            <span class="close"><span>×</span></span>
            現在{this.dayAccess}名のお客様が閲覧しています
          </a>
          : ''}
        {this.dayConversion > 0 ?
          <a class={this.presentToastConversion ? 'toast open' : 'toast hide'} onClick={this.clickToast}>
            <span class="close"><span>×</span></span>
            過去24時間でご予約が{this.dayConversion}件ありました
          </a>
          : ''}
      </section>
    </Host>
    );
  }
}

type IRecord = {
  dayAccess: number;
  dayConversion: number;
}
