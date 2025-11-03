import LottoRanking from '../src/LottoRanking.js';

describe('로토 랭킹 클래스 테스트', () => {
  test.each([
    [5, true, '2nd'],
    [5, false, '3rd'],
    [6, true, '1st'],
    [6, false, '1st'],
    [4, false, '4th'],
    [3, false, '5th'],
    [3, true, '5th'],
    [4, true, '4th'],
  ])('findRanking 메소드 테스트', (matchCount, hasBonusNum, result) => {
    expect(LottoRanking.findRanking(matchCount, hasBonusNum)).toBe(result);
  });
});
