import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'app-complete',
  styleUrls: ['../app-home/app-home.scss', 'app-complete.scss'],
  shadow: true,
})
export class AppComplete {

  render() {
    return (
      <Host>
        <main>
          <section>
            <div class="wrap">
              <div class="leading-container">
                <h2>送信完了</h2>
                <p>問い合わせの送信が完了しました。</p>
                <p>
                  お申し出に対しては順次対応させていただいておりますが、受付時間外に送信いただいたものや、内容によりましてはお返事にお時間を頂戴する場合がございます。
                </p>
                <p>
                  また、ご入力いただいたEメールアドレスや電話番号が誤っている場合やシステム障害が発生した場合等には回答ができない場合がございます。一週間以上経っても回答未着の場合、お手数ですが再度お問い合わせいただけると幸いです。
                </p>
                <div class="text-center">
                  <a href="/">
                    <button>トップページに戻る</button>
                  </a>
                </div>
              </div>
            </div>
          </section>
        </main>
      </Host>
    );
  }

}
