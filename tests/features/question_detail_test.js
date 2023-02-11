Feature('질문 상세정보 확인 - '
+ '질문의 답변을 확인하고 싶은 사람은 질문 상세정보를 확인함으로써 문제 해결법을 확인할 수 있다.');

Before(({ I }) => {
  I.setupDatabase();

  I.amOnPage('/');
});

// TODO: 답변, 채택 기능 추가 시 시나리오 수정하기
Scenario('채택하지 않은 내 질문인 경우', ({ I }) => {
  I.login('tester@example.com');

  I.askQuestion();

  I.click('CORS에러는 어떻게 해결하면 좋을까요?');

  I.see('CORS에러는 어떻게 해결하면 좋을까요?');
  I.see('서버를 배포 후 POST요청에서 No ‘Access-Control-Allow-Origin’ header 에러 메시지가 발생합니다.');
  I.see('채택');
});
