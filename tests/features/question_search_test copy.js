Feature('해결되지 않은 질문 검색하기 - '
+ '자신있는 분야에 대한 질문에 답변을 하고 싶은 사람은 해결되지 않은 질문 중 검색을 함으로써 해결되지 않은 질문에 답을 하고, 포인트를 획득할 수 있다.');

Before(({ I }) => {
  I.setupDatabase();

  I.amOnPage('/');
});

Scenario('검색 결과가 있는 경우', ({ I }) => {
  I.writeQuestions();

  I.amOnPage('/questions');

  I.fillField('search-questions', 'Access-Control-Allow-Origin');
  I.pressKey('Enter');

  I.see('No \'Access-Control-Allow-Origin\' 에러가 뜹니다');
});

Scenario('검색 결과가 없는 경우', ({ I }) => {
  I.amOnPage('/questions');

  I.fillField('search-questions', '없는 질문 제목입니다.');
  I.pressKey('Enter');

  I.see('질문이 아직 없습니다!');
});
