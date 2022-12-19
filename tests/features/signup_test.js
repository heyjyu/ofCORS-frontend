Feature('회원가입 - '
+ '서비스를 이용하려는 사람은 로그인을 함으로써 로그인이 필요한 서비스를 이용할 수 있다.');

Before(({ I }) => {
  I.setupDatabase();

  I.amOnPage('/');
});

Scenario('회원 가입 성공', ({ I }) => {
  I.click('회원가입');

  I.fillField('display-name', 'joo');
  I.fillField('email', 'test@example.com');
  I.fillField('password', 'Abcdef1!');
  I.fillField('password-check', 'Abcdef1!');
  I.submit();

  I.fillField('email', 'test@example.com');
  I.fillField('password', 'Abcdef1!');
  I.click('로그인');

  I.dontSee('로그인');
});

Scenario('존재하는 이메일을 입력한 경우', ({ I }) => {
  I.click('회원가입');

  I.fillField('display-name', 'joo');
  I.fillField('email', 'exist@email.com');
  I.fillField('password', 'Abcdef1!');
  I.fillField('password-check', 'Abcdef1!');
  I.submit();

  I.click('회원가입');

  I.fillField('display-name', 'joo');
  I.fillField('email', 'exist@email.com');
  I.fillField('password', 'Abcdef1!');
  I.fillField('password-check', 'Abcdef1!');
  I.submit();

  I.see('해당 이메일은 사용할 수 없습니다');
});

Scenario('닉네임을 입력하지 않은 경우', ({ I }) => {
  I.click('회원가입');

  I.fillField('email', 'test@example.com');
  I.fillField('password', 'Abcdef1!');
  I.fillField('password-check', 'Abcdef1!');
  I.submit();

  I.see('닉네임을 입력해주세요');
});

Scenario('이메일을 입력하지 않은 경우', ({ I }) => {
  I.click('회원가입');

  I.fillField('display-name', 'joo');
  I.fillField('password', 'Abcdef1!');
  I.fillField('password-check', 'Abcdef1!');
  I.submit();

  I.see('이메일을 입력해주세요');
});

Scenario('비밀번호를 입력하지 않은 경우', ({ I }) => {
  I.click('회원가입');

  I.fillField('display-name', 'joo');
  I.fillField('email', 'test@example.com');
  I.fillField('password-check', 'Abcdef1!');
  I.submit();

  I.see('비밀번호를 입력해주세요');
});

Scenario('비밀번호 확인을 입력하지 않은 경우', ({ I }) => {
  I.click('회원가입');

  I.fillField('display-name', 'joo');
  I.fillField('email', 'test@example.com');
  I.fillField('password', 'Abcdef1!');
  I.submit();

  I.see('비밀번호를 입력해주세요');
});

Scenario('3글자 미만의 닉네임을 입력한 경우', ({ I }) => {
  I.click('회원가입');

  I.fillField('display-name', 'jo');
  I.fillField('email', 'test@example.com');
  I.fillField('password', 'Abcdef1!');
  I.fillField('password-check', 'Abcdef1!');
  I.submit();

  I.see('닉네임을 다시 확인해주세요');
});

Scenario('비밀번호에 대문자가 포함되지 않은 경우', ({ I }) => {
  I.click('회원가입');

  I.fillField('display-name', 'jo');
  I.fillField('email', 'test@example.com');
  I.fillField('password', 'abcdef1!');
  I.fillField('password-check', 'abcdef1!');
  I.submit();

  I.see('비밀번호를 다시 확인해주세요');
});

Scenario('비밀번호에 소문자가 포함되지 않은 경우', ({ I }) => {
  I.click('회원가입');

  I.fillField('display-name', 'joo');
  I.fillField('email', 'test@example.com');
  I.fillField('password', 'ABCDEF1!');
  I.fillField('password-check', 'ABCDEF1!');
  I.submit();

  I.see('비밀번호를 다시 확인해주세요');
});

Scenario('비밀번호에 숫자가 포함되지 않은 경우', ({ I }) => {
  I.click('회원가입');

  I.fillField('display-name', 'joo');
  I.fillField('email', 'test@example.com');
  I.fillField('password', 'Abcdefg!');
  I.fillField('password-check', 'Abcdefg!');
  I.submit();

  I.see('비밀번호를 다시 확인해주세요');
});

Scenario('비밀번호에 특수문자가 포함되지 않은 경우', ({ I }) => {
  I.click('회원가입');

  I.fillField('display-name', 'joo');
  I.fillField('email', 'test@example.com');
  I.fillField('password', 'Abcdefg1');
  I.fillField('password-check', 'Abcdefg1');
  I.submit();

  I.see('비밀번호를 다시 확인해주세요');
});

Scenario('비밀번호가 8글자 미만인 경우', ({ I }) => {
  I.click('회원가입');

  I.fillField('display-name', 'joo');
  I.fillField('email', 'test@example.com');
  I.fillField('password', 'Abcde1!');
  I.fillField('password-check', 'Abcde1!');
  I.submit();

  I.see('비밀번호를 다시 확인해주세요');
});

Scenario('비밀번호가 비밀번호 확인과 일치하지 않는 경우', ({ I }) => {
  I.click('회원가입');

  I.fillField('display-name', 'joo');
  I.fillField('email', 'test@example.com');
  I.fillField('password', 'Abcdef1!');
  I.fillField('password-check', 'ABcdef1!');
  I.submit();

  I.see('비밀번호가 일치하지 않습니다');
});
