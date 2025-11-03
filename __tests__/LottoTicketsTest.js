import LottoTickets from '../src/LottoTickets.js';
import Lotto from '../src/Lotto.js';

describe('로토 티켓스 클래스 테스트', () => {
  test('add/getTickets 메소드 테스트', () => {
    const lottoTickets = new LottoTickets();
    const lottoTicket = new Lotto([1, 2, 3, 4, 5, 6]);
    lottoTickets.add(lottoTicket);
    expect(lottoTickets.getTickets()).toEqual([lottoTicket]);
  });

  test('count 메소드 테스트', () => {
    const lottoTickets = new LottoTickets();
    expect(lottoTickets.count()).toBe(0);
  });
});
