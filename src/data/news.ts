import { IItem } from '../../scripts/build-data';

export const news: IItem = {
  selector: '<ul class="list-news"></ul>',
  template: '<li><label class="form-label">{{ title }}</label><p>{{ body }}</p></li>',
  data: [
    {
      title: 'コロナ感染症予防対策',
      body: 'コロナ感染症予防対策として、空気の入れ替え、間隔に余裕のある席へのご案内、アクリル板等、接客スタッフのマスク着用などの対応をしてお客様をお迎えいたします。<br>当店は、新型コロナウイルス対策認証店です。<br>同一テーブル4人いない、2時間程度でのお食事をお願いいたします。',
    },
    {
      title: '2021年10月のおやすみ',
      body: '10月6日（水）、13日（水）、20日（水）、27日（水）',
    },
    {
      title: '2021年11月のおやすみ',
      body: '11月3日（水）、10日（水）、17日（水）、24日（水）',
    },
  ],
};
