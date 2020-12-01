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
      title: '年末オードブル盛り合わせ販売',
      body: '12月31日、12：00～16：00お引き渡しでオードブル盛り合わせのご予約を承っております。<br>1万円（税込み）ご予約頂いた方のみの販売となります。<br>詳しくはお店までお問い合わせください。',
    },
    {
      title: 'Go To Eat ひょうごキャンペーン お食事券',
      body: '10月29日よりスタートしました「Go To Eat ひょうごキャンペーン」の対象店舗になりました。<br>詳しい内容は、https://gotoeat-hyogo.com/index.html をご確認ください。',
    },
    {
      title: '12月のおやすみ',
      body: '12月2日（水）、9日（水）、16日（水）、23日（水）、30日（水）31日（木）',
    },
    {
      title: '2021年1月のおやすみ',
      body: '1月1日（金）、6日（水）、13日（水）、20日（水）、27日（水）',
    },
  ],
};
