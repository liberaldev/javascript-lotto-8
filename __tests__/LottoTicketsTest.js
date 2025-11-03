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

  test.each([
    [
      [
        [1, 5, 6, 2, 4, 3], [1, 2, 3, 4, 5, 7], [11, 12, 13, 4, 5, 6],
      ],
      [1, 2, 3, 4, 5, 6],
      8,
      {
        '1st': 1, '2nd': 0, '3rd': 1, '4th': 0, '5th': 1,
      },
    ],
    [
      [
        [1, 5, 6, 2, 4, 3], [1, 2, 3, 4, 5, 7], [11, 12, 13, 4, 5, 6],
      ],
      [21, 22, 33, 44, 15, 26],
      35,
      {
        '1st': 0, '2nd': 0, '3rd': 0, '4th': 0, '5th': 0,
      },
    ],
  ])('countWining 메소드 테스트', (numsArr, winningNumbers, bonusNumbers, result) => {
    const lottoTickets = new LottoTickets();
    numsArr.forEach((nums) => {
      lottoTickets.add(new Lotto(nums));
    });
    expect(lottoTickets.countWining(winningNumbers, bonusNumbers)).toEqual(result);
  });
});
