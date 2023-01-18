Feature('프로필 수정하기 - '
+ '자신을 다르게 드러내고 싶은 사람은 프로필을 수정해서 사람들에게 더 정확한 자신의 프로필을 드러낼 수 있다.');

Before(({ I }) => {
  I.setupDatabase();

  I.amOnPage('/');
});

Scenario('닉네임을 입력한 경우', ({ I }) => {
  I.login('tester@example.com');

  I.click('마이페이지');
  I.click('수정');

  I.fillField('display-name', '쥬쥬쥬');
  I.click('저장');
  I.wait(2);

  I.see('쥬쥬쥬');
});
