Feature('해결된 질문 중 검색하기 (검색창을 통한 검색) - '
+ '해결되지 않은 문제가 있는 사람은 해결된 질문 중 자신의 문제를 검색함으로써 해결법을 질문 없이도 빠르게 얻을 수 있다.');

Before(({ I }) => {
  I.setupDatabase();

  I.amOnPage('/');
});

Scenario('검색 결과가 있는 경우', ({ I }) => {
  I.writeQuestions();

  I.amOnPage('/');

  I.fillField('search', 'Access-Control-Allow-Origin');
  I.pressKey('Enter');

  I.see('No \'Access-Control-Allow-Origin\' 에러가 뜹니다');
});

Scenario('검색 결과가 없는 경우', ({ I }) => {
  I.fillField('search', '없는 질문 제목입니다.');
  I.pressKey('Enter');

  I.see('검색 결과를 찾지 못했습니다');
});
