Feature('스크랩 취소하기 - '
+ '실수로 글을 스크랩한 사람은 스크랩을 취소함으로써 필요한 글만 스크랩할 수 있다.');

Before(({ I }) => {
  I.setupDatabase();

  I.amOnPage('/');
});

Scenario('스크랩 취소하기', ({ I }) => {
  I.login('tester@example.com');

  I.askQuestion();

  I.wait(2);

  I.click('CORS에러는 어떻게 해결하면 좋을까요?');

  I.click('스크랩');
  I.click('스크랩 취소');

  I.wait(2);

  I.dontSee('스크랩 취소');
});
