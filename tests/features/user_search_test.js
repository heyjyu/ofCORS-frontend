Feature('회원 검색하기 - '
+ '구루를 찾아 구독하고 싶은 사람은 회원 검색을 함으로써 구루를 찾아 구독할 수 있다.');

Before(({ I }) => {
  I.setupDatabase();

  I.amOnPage('/');
});

Scenario('검색 결과가 있는 경우', ({ I }) => {
  I.click('사람들');

  I.fillField('search-users', 'joo');
  I.pressKey('Enter');

  I.see('joo');
});

Scenario('검색 결과가 없는 경우', ({ I }) => {
  I.click('사람들');

  I.fillField('search-users', 'hoo');
  I.pressKey('Enter');

  I.see('검색결과가 없습니다');
});
