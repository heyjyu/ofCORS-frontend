import styled from 'styled-components';
import useExchangeFormStore from '../hooks/useExchangeFormStore';
import useUserStore from '../hooks/useUserStore';

const Container = styled.div`
  width: 30em;
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
  const userStore = useUserStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    exchangeFormStore.validateAccount();
  };

  const handleClickExchange = async () => {
    await exchangeFormStore.requestExchange();
    exchangeFormStore.reset();
    userStore.fetchMe();
  };

  return (
    <Container>
      <p>
        홍길동님이 보유하신 포인트는 총
        {' '}
        {userStore.user.points}
        pt입니다
      </p>
      <div>
        <div>
          포인트 환전 신청 전 꼭 읽어주세요!
        </div>
        <p>환전을 하기 위한 최소 포인트는 500pt 입니다.</p>
        <p>ofCORS 가입자와 신청자가 일치하지 않는 경우 환전 승인이 거절될 수 있습니다.</p>
        <p>환전 신청한 금액은 다음주 목요일 오후 8시 이내에 입금처리 됩니다.</p>
        <p>(전 주 월요일~일요일 신청 내역)</p>
      </div>
      <div>
        <div>환전할 포인트</div>
        <div>
          <input type="number" onChange={(e) => exchangeFormStore.changePoints({ points: e.target.value, pointsOfUser: userStore.user.points })} />
          <span>pt</span>
        </div>
        <p>1pt 당 KRW60으로 환전됩니다</p>
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="banks">은행명</label>
        <select name="banks" id="banks" onChange={(e) => exchangeFormStore.changeBank(e.target.value)}>
          <option value="">
            선택해주세요
          </option>
          {banks.map((bank) => (
            <option key={bank} value={bank}>
              {bank}
            </option>
          ))}
        </select>
        <label htmlFor="account-number">계좌 번호</label>
        <input name="account-number" id="account-number" onChange={(e) => exchangeFormStore.changeAccountNumber(e.target.value)} />
        <button type="submit">
          검증
        </button>
      </form>
      <p>* 개인 명의의 계좌로만 환전 가능합니다</p>
      <p>* 가입자와 동일한 명의의 계좌가 아니거나 입력하신 계좌번호가 올바르지 않은 경우 환전이 불가하오니 정확히 입력해주시기 바랍니다</p>
      <button type="button" onClick={handleClickExchange} disabled={!exchangeFormStore.accountNumberValidated || !exchangeFormStore.isValidateSuccessful}>
        환전 신청하기
      </button>
    </Container>
  );
}
