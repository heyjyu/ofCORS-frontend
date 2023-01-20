Feature('질문 삭제하기 - '
+ '질문을 실수로 올린 사람은 답변이 올라오기 전에 질문을 삭제하여 필요한 질문만 남길 수 있다.');

Before(({ I }) => {
  I.setupDatabase();

  I.amOnPage('/');
});

Scenario('답변이 달리기 전 질문 삭제하는 경우', ({ I }) => {
  I.login('tester@example.com');

  I.askQuestion();

  I.wait(2);

  I.click('CORS에러는 어떻게 해결하면 좋을까요?');

  I.click('삭제');

  I.click('예');

  I.wait(2);

  I.see('질문을 등록해주세요');
});

Scenario('답변이 달린 후 질문 삭제하기', ({ I }) => {
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

  I.dontSee('삭제');
});
