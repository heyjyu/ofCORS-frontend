Feature('질문 수정하기 - '
+ '자신의 질문에 오타를 발견한 사람은 질문을 수정함으로써 질문의 의도를 잘 전달해서 더 많은 답변을 받을 수 있다.');

Before(({ I }) => {
  I.setupDatabase();

  I.amOnPage('/');
});

Scenario('답변이 달리기 전 질문 수정하는 경우', ({ I }) => {
  I.login('tester@example.com');

  I.askQuestion();

  I.click('수정');

  I.fillField('title', 'CORS에러는 어떻게 해결하면 좋을까요!');

  I.submit();

  I.see('CORS에러는 어떻게 해결하면 좋을까요!');
});

Scenario('답변이 달린 후 질문 수정하기', ({ I }) => {
  I.login('tester@example.com');

  I.askQuestion();

  I.click('로그아웃');

  I.login('tester2@example.com');

  I.click('CORS에러는 어떻게 해결하면 좋을까요?');

  I.fillField('input-answer', '응답 헤더에 해당 값을 넣어보세요.');

  I.click('등록');

  I.wait(2);

  I.click('로그아웃');

  I.login('tester@example.com');

  I.click('CORS에러는 어떻게 해결하면 좋을까요?');

  I.dontSee('수정');
});
