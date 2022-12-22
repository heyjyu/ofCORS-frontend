Feature('채택되지 않은 인기 질문 목록 확인하기 - '
+ '홈페이지에 접속한 사람은 채택이 되지 않은 인기 질문을 확인함으로써 사람들이 관심을 많이 가지는 아직 채택이 되지 않은 인기 질문에 답변을 해서 인지도를 높일 수 있다.');

Before(({ I }) => {
  I.setupDatabase();

  I.amOnPage('/');
});

Scenario('질문이 있는 경우', ({ I }) => {
  I.writeQuestions();

  I.amOnPage('/');

  I.see('No \'Access-Control-Allow-Origin\' 에러가 뜹니다');
  I.see('추천');
  I.see('조회');
});

Scenario('질문이 없는 경우', ({ I }) => {
  I.see('질문을 등록해주세요!');
});
