export const news = {
  selector: '<ul class="list-news"></ul>',
  template: '<li><label class="form-label">{{ title }}</label><p>{{ body }}</p></li>',
  data: [
    {
      title: 'コロナ感染症予防対策',
      body: 'コロナ感染症予防対策として、間隔に余裕のある席へのご案内、接客スタッフのマスク着用などの対応をしてお客様をお迎えいたします。',
    },
    {
      title: '9月のおやすみ',
      body: '9月2日（水）、9日（水）、10日（木）、16日（水）、23日（水）、30日（水）',
    },
    {
      title: '10月のおやすみ',
      body: '10月7日（水）、8日（木）、14日（水）、21日（水）、28日（水）',
    },
  ],
};
