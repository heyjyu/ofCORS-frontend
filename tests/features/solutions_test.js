Feature('해결완료 목록 확인하기 - '
+ '지식을 얻고 싶은 사용자는 해결완료 목록을 확인함으로써 자신도 궁금했던 글을 확인하여 몰랐던 지식을 얻을 수 있다.');

Before(({ I }) => {
  I.setupDatabase();

  I.amOnPage('/');
});

Scenario('채택 완료된 질문이 있는 경우', ({ I }) => {
  I.writeQuestions();

  I.amOnPage('/solutions');

  I.see('No \'Access-Control-Allow-Origin\' 에러가 뜹니다');
});

Scenario('채택 완료된 질문이 없는 경우', ({ I }) => {
  I.amOnPage('/solutions');

  I.see('해결된 질문이 아직 없습니다!');
});
