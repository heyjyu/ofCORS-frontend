Feature('답변 등록하기 - '
+ '자신의 지식을 공유하고 싶은 사람은 알고 있는 질문에 답변을 함으로써 환전할 수 있는 포인트를 획득할 수 있다.');

Before(({ I }) => {
  I.setupDatabase();

  I.amOnPage('/');
});

Scenario('답변 등록하기', ({ I }) => {
  I.login('tester@example.com');

  I.askQuestion();

  I.click('로그아웃');

  I.login('tester2@example.com');

  I.click('CORS에러는 어떻게 해결하면 좋을까요?');

  I.fillField('input-answer', '응답 헤더에 해당 값을 넣어보세요.');

  I.click('등록');

  I.wait(2);

  I.see('답변 1개');
  I.see('응답 헤더에 해당 값을 넣어보세요.');
});

Scenario('내 질문에 답변 등록하기', ({ I }) => {
  I.login('tester@example.com');

  I.askQuestion();

  I.click('CORS에러는 어떻게 해결하면 좋을까요?');

  I.dontSee('input-answer');
});
