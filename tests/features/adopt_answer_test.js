Feature('채택하기 - '
+ '해결법을 알려준 답변을 한 사람에게 감사하고 있는 사람은 채택을 함으로써 답변해준 사람에게 포인트를 전달하고, 감사인사를 남길 수 있다.');

Before(({ I }) => {
  I.setupDatabase();

  I.amOnPage('/');
});

Scenario('추가 포인트를 입력하지 않은 경우', ({ I }) => {
  I.login('tester@example.com');

  I.askQuestion();

  I.click('로그아웃');

  I.login('tester2@example.com');

  I.click('CORS에러는 어떻게 해결하면 좋을까요?');
  I.fillField('input-answer', '응답 헤더에 해당 값을 넣어보세요.');
  I.click('등록');

  I.click('로그아웃');

  I.login('tester@example.com');

  I.click('CORS에러는 어떻게 해결하면 좋을까요?');

  I.click('채택');

  I.click('보내기');

  I.see('응답 헤더에 해당 값을 넣어보세요.');
});

Scenario('추가 포인트를 보유 포인트보다 적게 입력한 경우', ({ I }) => {
  I.login('tester@example.com');

  I.askQuestion();

  I.click('로그아웃');

  I.login('tester2@example.com');

  I.click('CORS에러는 어떻게 해결하면 좋을까요?');
  I.fillField('input-answer', '응답 헤더에 해당 값을 넣어보세요.');
  I.click('등록');

  I.click('로그아웃');

  I.login('tester@example.com');

  I.click('CORS에러는 어떻게 해결하면 좋을까요?');

  I.click('채택');

  I.fillField('bonus-point', 10);
  I.click('보내기');

  I.see('응답 헤더에 해당 값을 넣어보세요.');
});

Scenario('추가 포인트를 보유 포인트보다 많이 입력한 경우', ({ I }) => {
  I.login('tester@example.com');

  I.askQuestion();

  I.click('로그아웃');

  I.login('tester2@example.com');

  I.click('CORS에러는 어떻게 해결하면 좋을까요?');
  I.fillField('input-answer', '응답 헤더에 해당 값을 넣어보세요.');
  I.click('등록');

  I.click('로그아웃');

  I.login('tester@example.com');

  I.click('CORS에러는 어떻게 해결하면 좋을까요?');

  I.click('채택');

  I.fillField('bonus-point', 1000);
  I.click('보내기');

  I.see('보유 포인트보다 많은 포인트를 입력하셨습니다');
});

Scenario('감사 메시지를 입력한 경우', ({ I }) => {
  I.login('tester@example.com');

  I.askQuestion();

  I.click('로그아웃');

  I.login('tester2@example.com');

  I.click('CORS에러는 어떻게 해결하면 좋을까요?');
  I.fillField('input-answer', '응답 헤더에 해당 값을 넣어보세요.');
  I.click('등록');

  I.click('로그아웃');

  I.login('tester@example.com');

  I.click('CORS에러는 어떻게 해결하면 좋을까요?');

  I.click('채택');

  I.fillField('message', '감사합니다');
  I.click('보내기');

  I.see('응답 헤더에 해당 값을 넣어보세요.');
});
