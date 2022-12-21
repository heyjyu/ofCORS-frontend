Feature('로그인 - '
+ '서비스를 이용하려는 사람은 로그인을 함으로써 로그인이 필요한 서비스를 이용할 수 있다.');

Before(({ I }) => {
  I.setupDatabase();

  I.amOnPage('/');
});

Scenario('로그인', ({ I }) => {
  I.click('로그인');

  I.fillField('email', 'tester@example.com');
  I.fillField('password', 'Abcdef1!');

  I.submit();

  I.see('로그아웃');
  I.dontSee('회원가입');
  I.dontSee('로그인');
});

Scenario('이메일을 입력하지 않은 경우', ({ I }) => {
  I.click('로그인');

  I.fillField('password', 'Abcdef1!');

  I.submit();

  I.see('이메일을 입력해주세요');
});

Scenario('비밀번호를 입력하지 않은 경우', ({ I }) => {
  I.click('로그인');

  I.fillField('email', 'tester@example.com');

  I.submit();

  I.see('비밀번호를 입력해주세요');
});

Scenario('이메일과 비밀번호를 입력하지 않은 경우', ({ I }) => {
  I.click('로그인');

  I.submit();

  I.see('이메일과 비밀번호를 입력해주세요');
});

Scenario('존재하지 않는 이메일을 입력한 경우', ({ I }) => {
  I.click('로그인');

  I.fillField('email', 'wrong@example.com');
  I.fillField('password', 'Abcdef1!');

  I.submit();

  I.see('이메일 혹은 비밀번호가 맞지 않습니다');
});

Scenario('비밀번호가 틀린 경우', ({ I }) => {
  I.click('로그인');

  I.fillField('email', 'tester@example.com');
  I.fillField('password', 'ABcdef1!');

  I.submit();

  I.see('이메일 혹은 비밀번호가 맞지 않습니다');
});
