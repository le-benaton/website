import { IItem } from '../../scripts/build-data';

export const news: IItem = {
  selector: '<ul class="list-news"></ul>',
  template: '<li><label class="form-label">{{ title }}</label><p>{{ body }}</p></li>',
  data: [
    {
      title: 'コロナ感染症予防対策',
      body: 'コロナ感染症予防対策として、間隔に余裕のある席へのご案内、接客スタッフのマスク着用などの対応をしてお客様をお迎えいたします。',
    },
    {
      title: '新年あけましておめでとうございます。',
      body: '1月2日より通常営業しております。<br>皆様に楽しんでいただけます様にたくさんの食材をご用意してお待ちしております。',
    },
    {
      title: '2021年1月のおやすみ',
      body: '1月1日（金）、6日（水）、13日（水）、20日（水）、27日（水）',
    },
    {
      title: '2021年2月のおやすみ',
      body: '2月3日（水）、10日（水）、17日（水）、24日（水）',
    },
  ],
};
