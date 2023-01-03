/* global actor */

const backdoorBaseUrl = 'http://localhost:8000/backdoor';

module.exports = () => actor({
  setupDatabase() {
    this.amOnPage(`${backdoorBaseUrl}/setup-database`);
  },

  writeQuestions() {
    this.amOnPage(`${backdoorBaseUrl}/write-questions`);
  },

  submit() {
    this.click('[type=submit]');
    this.wait(2);
  },

  login(email) {
    this.amOnPage('/login');

    this.fillField('email', email);
    this.fillField('password', 'Abcdef1!');
    this.submit();

    this.waitForText('로그아웃');
  },

  askQuestion() {
    this.amOnPage('/');
    this.click('질문하기');

    this.fillField('title', 'CORS에러는 어떻게 해결하면 좋을까요?');
    this.fillField('body', '서버를 배포 후 POST요청에서 No ‘Access-Control-Allow-Origin’ header 에러 메시지가 발생합니다.');
    this.fillField('tag', 'Web');
    this.click('추가');
    this.fillField('points', 20);
    this.click('올리기');
    this.click('예');
  },
});
