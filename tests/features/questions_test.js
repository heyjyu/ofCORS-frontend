Feature('질문 목록 확인하기 - '
+ '사람들의 문제를 해결해주고 싶은 사람은 질문 목록을 확인해서 자신이 답변할 수 있는 질문을 찾아 답변할 수 있다.');

Before(({ I }) => {
  I.setupDatabase();

  I.amOnPage('/');
});

Scenario('질문이 있는 경우', ({ I }) => {
  I.writeQuestions();

  I.amOnPage('/questions');

  I.see('No \'Access-Control-Allow-Origin\' 에러가 뜹니다');
  I.see('추천');
  I.see('조회');
});

Scenario('질문이 없는 경우', ({ I }) => {
  I.see('질문을 등록해주세요!');
});
