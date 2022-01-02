import { IItem } from '../../scripts/build-data';

export const news: IItem = {
  selector: '<ul class="list-news"></ul>',
  template: '<li><label class="form-label">{{ title }}</label><p>{{ body }}</p></li>',
  data: [
    {
      title: 'コロナ感染症予防対策',
      body: 'コロナ感染症予防対策として、空気の入れ替え、間隔に余裕のある席へのご案内、アクリル板等、接客スタッフのマスク着用などの対応をしてお客様をお迎えいたします。<br>当店は、新型コロナウイルス対策認証店です。<br>2時間程度でのお食事をお願いいたします。',
    },
  {
    title: '2022年1月のおやすみ',
    body: '1月1日（土）、5日（水）、12日（水）、19日（水）、26日（水）、27日（木）',
  },
  {
    title: '2022年2月のおやすみ',
    body: '2月2日（水）、9日（水）、16日（水）、17日（木）、23日（水）',
  },
  ],
};
