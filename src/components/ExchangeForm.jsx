import styled from 'styled-components';
import useExchangeFormStore from '../hooks/useExchangeFormStore';
import useExchangeStore from '../hooks/useExchangeStore';
import useUserStore from '../hooks/useUserStore';
import Header from './ui/Header';
import Title from './ui/Title';

const Wrapper = styled.div`
  margin-block: 1em;
  padding: 1em;
  border: 1px solid #EAEAEC;
  background-color: white;
  color: #8E8E8E;

  p {
    margin-block: 0.5em;
  }

  input {
    width: 17em;
    margin-right: 0.5em;
    padding: 0.5em 0.75em;
    border: 1px solid #EAEAEC;

    :focus {
      border: 1px solid #6C40FF;
      outline: none;
    }

    ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    }
  }

  div {
    display: flex;
    align-items: center;
    gap: 1em;

    p {
      color: #FF424D;
    }
  }

  button {
    font-weight: 700;
    padding: 0.5em 1em;
    border: 1px solid #AB92FF;
    border-radius: 0.25em;
    background: #BAA5FF;
    color: white;
  }
`;

const Select = styled.select`
  padding: 0.5em 2.5em 0.5em 0.75em;
  border: 1px solid #EAEAEC;
  border-radius: 0.5em;
  background: url(/assets/images/triangle.svg) no-repeat center right 0.75em;
  background-color: white;
  color: #838383;
  -moz-appearance:none; /* Firefox */
  -webkit-appearance:none; /* Safari and Chrome */
  appearance:none;

  :focus {
    outline: none;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  font-weight: 700;
  font-size: 1em;
  padding: 1em 2em;
  border: 1px solid #AB92FF;
  border-radius: 0.25em;
  background: #BAA5FF;
  color: white;

  :disabled {
    border: 1px solid #EAEAEC;
    background: #BBBBBB;
    cursor: default;
  }
`;

const Table = styled.table`
  width: 100%;
  color: #8E8E8E;

  thead {
    color: black;
  }

  tbody {
    border-top: 10px solid white;
    text-align: center;
  }
`;

const banks = [
  'KB국민은행',
  'SC제일은행',
  '경남은행',
  '광주은행',
  '기업은행',
  '농협',
  '대구은행',
  '부산은행',
  '산업은행',
  '수협',
  '신한은행',
  '신협',
  '외환은행',
  '우리은행',
  '우체국',
  '전북은행',
  '제주은행',
  '축협',
  '하나은행(서울은행)',
  '한국씨티은행(한미은행)',
  'K뱅크',
  '카카오뱅크',
  '유안타증권',
  '현대증권',
  '미래에셋증권',
  '대우증권',
  '삼성증권',
  '한국투자증권',
  '우리투자증권',
  '교보증권',
  '하이투자증권',
  '에이치엠씨투자증권',
  '키움증권',
  '이트레이드증권',
  '에스케이증권',
  '대신증권',
  '솔로몬투자증권',
  '한화증권',
  '하나대투증권',
  '굿모닝신한증권',
  '동부증권',
  '유진투자증권',
  '메리츠증권',
  '엔에이치투자증권',
  '부국증권',
];

export default function ExchangeForm() {
  const exchangeFormStore = useExchangeFormStore();
  const exchangeStore = useExchangeStore();
  const userStore = useUserStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    exchangeFormStore.validateAccount();
  };

  const handleClickExchange = async () => {
    await exchangeFormStore.requestExchange();
    userStore.fetchMe();
    exchangeStore.fetchExchanges();
    exchangeFormStore.reset();
  };

  return (
    <div>
      <Header>
        <Title>
          환전하기
        </Title>
      </Header>
      <Wrapper>
        <p>
          홍길동님이 보유하신 포인트는 총
          {' '}
          {userStore.user.points}
          pt입니다
        </p>
      </Wrapper>
      <Wrapper>
        <div>
          포인트 환전 신청 전 꼭 읽어주세요!
        </div>
        <hr />
        <p>환전을 하기 위한 최소 포인트는 500pt 입니다.</p>
        <p>ofCORS 가입자와 신청자가 일치하지 않는 경우 환전 승인이 거절될 수 있습니다.</p>
        <p>환전 신청한 금액은 다음주 목요일 오후 8시 이내에 입금처리 됩니다.</p>
        <p>(전 주 월요일~일요일 신청 내역)</p>
      </Wrapper>
      <Wrapper>
        <div>
          <div>환전할 포인트</div>
          <div>
            <input type="number" value={exchangeFormStore.fields.points || ''} onChange={(e) => exchangeFormStore.changePoints({ points: e.target.value, pointsOfUser: userStore.user.points })} />
          </div>
          <p>* 1pt 당 KRW60으로 환전됩니다</p>
        </div>
      </Wrapper>
      <Wrapper>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="banks">은행명</label>
            <Select name="banks" value={exchangeFormStore.fields.bank || ''} id="banks" onChange={(e) => exchangeFormStore.changeBank(e.target.value)}>
              <option value="">
                선택해주세요
              </option>
              {banks.map((bank) => (
                <option key={bank} value={bank}>
                  {bank}
                </option>
              ))}
            </Select>
            <label htmlFor="account-number">계좌 번호</label>
            <input name="account-number" value={exchangeFormStore.fields.accountNumber || ''} id="account-number" onChange={(e) => exchangeFormStore.changeAccountNumber(e.target.value)} />
            <Button type="submit">
              검증
            </Button>
          </div>
        </form>
        <p>* 개인 명의의 계좌로만 환전 가능합니다</p>
        <p>* 가입자와 동일한 명의의 계좌가 아니거나 입력하신 계좌번호가 올바르지 않은 경우 환전이 불가하오니 정확히 입력해주시기 바랍니다</p>
      </Wrapper>
      <ButtonWrapper>
        <Button type="button" onClick={handleClickExchange} disabled={!exchangeFormStore.accountNumberValidated || !exchangeFormStore.isValidateSuccessful}>
          환전 신청하기
        </Button>
      </ButtonWrapper>
      <Header>
        <Title>환전 처리결과</Title>
      </Header>
      <Wrapper>
        <Table>
          <thead>
            <tr>
              <th>환전 신청 일시</th>
              <th>환전 신청 포인트</th>
              <th>실수령금액</th>
              <th>처리 결과</th>
            </tr>
          </thead>
          <tbody>
            {exchangeStore.exchanges.map((exchange) => (
              <tr key={exchange.id}>
                <td>{exchange.createdAt.replace('T', ' ').split('.')[0]}</td>
                <td>
                  {exchange.quantity}
                  pt
                </td>
                <td>
                  {exchange.totalAmount}
                  원
                </td>
                <td>{exchange.status === 'processing' ? '처리중' : '처리완료'}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Wrapper>
    </div>
  );
}
