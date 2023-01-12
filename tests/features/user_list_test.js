Feature('회원 목록 확인하기 - '
+ '새로운 기술을 배우고 싶은 사람은 회원 목록을 확인함으로써 해당 기술을 잘 사용하는 사람들을 찾아 구독하여 좋은 해결법들을 얻을 수 있다.');

Before(({ I }) => {
  I.setupDatabase();

  I.amOnPage('/');
});

Scenario('회원 목록 확인하기', ({ I }) => {
  I.click('사람들');

  I.see('joo');
});
