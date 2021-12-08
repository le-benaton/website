import {Component, Host, h, Prop, State} from '@stencil/core';

@Component({
  tag: 'app-contact',
  styleUrl: 'app-contact.scss',
  shadow: false,
})
export class AppContact {
  @Prop() recordConversion : Function;
  @State() name: string = '';
  @State() email: string = '';
  @State() tel: string = '';
  @State() message: string = '';

  handleChangeName(event) {
    this.name = event.target.value;
  }

  handleChangeEmail(event) {
    this.email = event.target.value;
  }

  handleChangeTel(event) {
    this.tel = event.target.value;
  }

  handleChangeMessage(event) {
    this.message = event.target.value;
  }

  handleSubmit(e) {
    if (!this.name || !this.email || !this.message) {
      return alert('名前、メールアドレス、メッセージは必須入力となっています。すべてご入力してから送信ください。')
    }

    const preMessage = this.tel ? `電話番号： ${this.tel}\r\n\r\n` : '';

    e.preventDefault()
    this.recordConversion();
    this.postData('https://api.v5.tipsys.me/thirdparty/rdlabo/mail', {
      name: this.name,
      from: this.email,
      message: preMessage + this.message
    })
  }

  postData = async (url = '', data = {}) => {
    console.log(data);
    // 既定のオプションには * が付いています
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data) // 本文のデータ型は "Content-Type" ヘッダーと一致する必要があります
    })
    return response.json();
  }

  render() {
    return (
      <Host>
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
            <form onSubmit={(e) => this.handleSubmit(e)}>
              <div class="form-line">
                <label htmlFor="name"><span class="form-label required">必須</span>お名前</label>
                <input type="text" name="お名前" required placeholder="例）山田太郎"
                       value={this.name} onInput={(event) => this.handleChangeName(event)} />
              </div>
              <div class="form-line">
                <label htmlFor="mail"><span class="form-label required">必須</span>メールアドレス（半角）</label>
                <input
                  type="text"
                  name="mail"
                  inputMode="email"
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
                  required
                  placeholder="例）info@example.com"
                  value={this.email} onInput={(event) => this.handleChangeEmail(event)}
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
                  value={this.tel} onInput={(event) => this.handleChangeTel(event)}
                />
              </div>

              <div class="form-line">
                <label htmlFor="message"><span class="form-label required">必須</span>メッセージ</label>
                <textarea
                  cols={50}
                  rows={5}
                  required
                  placeholder="※ご予約は、電話または予約サイトより承ります。"
                  value={this.message} onInput={(event) => this.handleChangeMessage(event)}
                ></textarea>
              </div>
              <p class="text-center">
                <button type="submit" class="submitButton">問い合わせ送信</button>
              </p>
            </form>
          </div>
        </div>
      </Host>
    );
  }

}
