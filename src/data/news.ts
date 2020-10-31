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
      title: 'Go To Eat ひょうごキャンペーン お食事券',
      body: '10月29日よりスタートしました「Go To Eat ひょうごキャンペーン」の対象店舗になりました。<br>詳しい内容は、https://gotoeat-hyogo.com/index.html をご確認ください。',
    },
    {
      title: '11月のおやすみ',
      body: '11月4日（水）、11日（水）、18日（水）、25日（水）、26日（木）',
    },
    {
      title: '12月のおやすみ',
      body: '12月2日（水）、9日（水）、16日（水）、23日（水）、30日（水）31日（木）',
    },
  ],
};
