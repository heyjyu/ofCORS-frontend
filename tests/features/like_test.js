Feature('질문 추천하기 - '
+ '같은 어려움을 겪고있는 질문을 본 사람은 질문을 추천함으로써 더 많은 사람에게 질문이 노출해서 답을 얻을 수 있다.');

Before(({ I }) => {
  I.setupDatabase();

  I.amOnPage('/');
});

Scenario('질문 추천하기', ({ I }) => {
  I.login('tester@example.com');

  I.askQuestion();

  I.click('로그아웃');

  I.login('tester2@example.com');

  I.click('CORS에러는 어떻게 해결하면 좋을까요?');

  I.click('like');

  I.see('1');
});
