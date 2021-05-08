import { IItem } from '../../scripts/build-data';

export const news: IItem = {
  selector: '<ul class="list-news"></ul>',
  template: '<li><label class="form-label">{{ title }}</label><p>{{ body }}</p></li>',
  data: [
    {
      title: '緊急事態宣言発令中につき',
      body: '「緊急事態宣言」のため、令和３年４月２５日（日）から５月３１日（月）まで営業時間が変わります。ディナー17:30～19:00(L.O)、20:00閉店とさせて頂きます。<br>尚、緊急事態宣言中は酒類のご提供を控えさせて頂きます。<br>（ワイン等酒類の持ち込みもお断りさせていただきます。）<br>ご迷惑をお掛け致しますが、ご理解のほどよろしくお願いいたします。',
    },
        {
      title: 'コロナ感染症予防対策',
      body: 'コロナ感染症予防対策として、間隔に余裕のある席へのご案内、接客スタッフのマスク着用などの対応をしてお客様をお迎えいたします。',
    },
    {
      title: '2021年5月のおやすみ',
      body: '5月5日（水）、12日（水）、19日（水）、26日（水）',
    },
    {
      title: '2021年6月のおやすみ',
      body: '6月2日（水）、9日（水）、16日（水）、23日（水）、30日（水）',
    },
  ],
};
