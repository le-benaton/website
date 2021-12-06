import { Component, h, Host } from '@stencil/core';
import {announcement} from '../../data/announcement';
import {news} from '../../data/news';

@Component({
  tag: 'app-guideline',
  styleUrl: 'app-guideline.scss',
  shadow: false,
})
export class AppGuideline {

  render() {
    return (
      <Host>
        <section id="menu-reserved">
          <div class="wrap">
            <h2>ご予約</h2>
            <ul class="reserved-system">
              <li>
                <a
                  class="button"
                  href="https://reserve.resebook.jp/resty/webrsv/rsv_vacants/vacant/s014049701/5580?show=3"
                  rel="noopener"
                  target="_blank"
                >
                  オンライン予約
                </a>
              </li>
              <li>
                <a class="button" href="tel:0798-37-2655">電話予約</a>
              </li>
            </ul>
            <div class="leading-container">
              <div class="container-extend">
                <h3>水曜日定休日</h3>
                {announcement.map(d =>
                  <section class="announcement">
                    <div class="announcement-image"><img src={d.image} alt=""/></div>
                    <div class="announcement-explain"><h5 innerHTML={d.title}></h5><p innerHTML={d.body}></p></div>
                  </section>
                )}
                <h4>
                  <img class="svg" src="assets/svg/list.svg" decoding="async" />
                  お知らせ
                </h4>
                <ul class="list-news">
                  {news.map(d => <li><label class="form-label" innerHTML={d.title}></label><p
                    innerHTML={d.body}></p>
                  </li>)}
                </ul>

                <h4>
                  <img class="svg" src="assets/svg/time.svg" decoding="async" />
                  営業時間
                </h4>
                <div class="wrap-table">
                  <table>
                    <tbody>
                    <tr>
                      <th>ランチ</th>
                      <td>11：45 ～ 14：00（ラストオーダー）</td>
                    </tr>
                    <tr>
                      <th>ディナー</th>
                      <td>17：30 ～ 21：00（ラストオーダー）
                      </td>
                    </tr>
                    <tr>
                      <th>その他</th>
                      <td>
                        テイクアウト・ケータリングも、行っています。直接お問い合わせください。<br/>10：30 〜 18：00
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </div>

                <h4>
                  <img class="svg" src="assets/svg/house.svg" decoding="async" />
                  アクセス
                </h4>
                <div class="wrap-table">
                  <table>
                    <tbody>
                    <tr>
                      <th>電話</th>
                      <td><a href="tel:0798-37-2655">0798-37-2655</a></td>
                    </tr>
                    <tr>
                      <th>ＦＡＸ</th>
                      <td>0798-37-2656</td>
                    </tr>
                    <tr>
                      <th>住所</th>
                      <td>
                        <address>
                          〒662-0047<br/>
                          兵庫県西宮市寿町4-12
                        </address>
                        <a
                          href="https://www.google.com/maps?ll=34.741734,135.330433&z=16&t=m&hl=ja&gl=JP&mapclient=embed&cid=5727555182521874623"
                          rel="noreferrer"
                          class="button button-google-map"
                          target="_blank"
                        >
                          Google Map
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <th>その他</th>
                      <td>
                        <p>
                          ドレスコードはございません。楽しくお食事できる服装でお越しください。
                          子供可（乳児可、未就学児可、小学生可）、ベビーカー入店可。
                        </p>
                        <p>
                          駐車場はございませんが、近くにコインパーキングがございます（<a
                          href="https://times-info.net/P28-hyogo/C204/park-detail-BUK0025568/"
                          target="_blank"
                          rel="noreferrer"
                        >タイムズ西宮千歳町</a
                        >）。
                        </p>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Host>
    );
  }

}
