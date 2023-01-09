Feature('답변 수정하기 - '
+ '자신의 답변에 있는 오타를 발견한 사람은 해당 질문에 답변들이 채택되지 않았을 때 답변을 수정함으로써 더 양질의 컨텐츠를 남길 수 있다.');

Before(({ I }) => {
  I.setupDatabase();

  I.amOnPage('/');
});

Scenario('답변 채택이 진행되지 않았고 내 답변인 경우', ({ I }) => {
  I.login('tester@example.com');

  I.askQuestion();

  I.click('로그아웃');

  I.login('tester2@example.com');

  I.click('CORS에러는 어떻게 해결하면 좋을까요?');

  I.fillField('input-answer', '응답 헤더에 해당 값을 넣어보세요.');
  I.click('등록');
  I.wait(2);

  I.click('수정');

  I.fillField('input-answer-edit', '응답 헤더에 ‘Access-Control-Allow-Origin: *’을 추가해보세요');
  I.click('완료');

  I.see('응답 헤더에 ‘Access-Control-Allow-Origin: *’을 추가해보세요');
});

Scenario('답변 채택이 진행되지 않았고 내 답변이 아닌 경우', ({ I }) => {
  I.login('tester@example.com');

  I.askQuestion();

  I.click('로그아웃');

  I.login('tester2@example.com');

  I.click('CORS에러는 어떻게 해결하면 좋을까요?');

  I.fillField('input-answer', '응답 헤더에 해당 값을 넣어보세요.');
  I.click('등록');
  I.wait(2);

  I.click('로그아웃');

  I.login('tester3@example.com');

  I.click('CORS에러는 어떻게 해결하면 좋을까요?');

  I.dontSee('수정');
});

Scenario('답변 채택이 진행된 경우', ({ I }) => {
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
  I.click('채택');

  I.click('로그아웃');

  I.login('tester2@example.com');

  I.dontSee('수정');
});
