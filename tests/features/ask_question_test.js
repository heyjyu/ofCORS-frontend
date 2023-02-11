Feature('질문하기 - '
+ '해결하고 싶은 문제가 있는 사람은 질문을 올림으로써 문제를 해결하는 방법을 얻을 수 있다.');

Before(({ I }) => {
  I.setupDatabase();

  I.amOnPage('/');
});

Scenario('로그인 한 경우', ({ I }) => {
  I.login('tester@example.com');

  I.click('질문하기');

  I.fillField('title', 'CORS에러는 어떻게 해결하면 좋을까요?');
  I.fillField('body', '서버를 배포 후 POST요청에서 No ‘Access-Control-Allow-Origin’ header 에러 메시지가 발생합니다.');
  I.fillField('tag', 'Web');
  I.click('추가');
  I.fillField('points', 20);
  I.click('등록');
  I.click('예');

  I.see('모든 질문');
  I.see('CORS에러는 어떻게 해결하면 좋을까요?');
  I.see('Web');
});

Scenario('로그인하지 않은 경우', ({ I }) => {
  I.click('질문하기');

  I.see('이메일');
  I.see('비밀번호');
});

Scenario('보유 포인트보다 많은 포인트를 입력한 경우', ({ I }) => {
  I.login('tester@example.com');

  I.click('질문하기');

  I.fillField('title', 'CORS에러는 어떻게 해결하면 좋을까요?');
  I.fillField('body', '서버를 배포 후 POST요청에서 No ‘Access-Control-Allow-Origin’ header 에러 메시지가 발생합니다.');
  I.fillField('tag', 'Web');
  I.click('추가');
  I.fillField('points', 1000);

  I.see('보유 포인트보다 많은 포인트를 입력하셨습니다');
});
