Feature('스크랩하기 - '
+ '나중에 또 만날 것 같은 문제를 다룬 글을 발견한 사람은 스크랩을 하여 같은 문제를 만났을 때 해결하는 시간을 단축할 수 있다.');

Before(({ I }) => {
  I.setupDatabase();

  I.amOnPage('/');
});

Scenario('로그인 한 경우', ({ I }) => {
  I.login('tester@example.com');

  I.askQuestion();

  I.wait(2);

  I.click('CORS에러는 어떻게 해결하면 좋을까요?');

  I.click('스크랩');

  I.wait(2);

  I.see('스크랩 취소');
});

Scenario('로그인하지 않은 경우', ({ I }) => {
  I.login('tester@example.com');

  I.askQuestion();

  I.click('로그아웃');

  I.click('CORS에러는 어떻게 해결하면 좋을까요?');

  I.click('스크랩');

  I.see('로그인');
});
