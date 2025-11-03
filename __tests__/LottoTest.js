import Lotto from '../src/Lotto';

describe('로또 클래스 테스트', () => {
  test('로또 번호의 개수가 6개가 넘어가면 예외가 발생한다.', () => {
    expect(() => {
      new Lotto([1, 2, 3, 4, 5, 6, 7]);
    }).toThrow('[ERROR]');
  });

  // TODO: 테스트가 통과하도록 프로덕션 코드 구현
  test('로또 번호에 중복된 숫자가 있으면 예외가 발생한다.', () => {
    expect(() => {
      new Lotto([1, 2, 3, 4, 5, 5]);
    }).toThrow('[ERROR]');
  });

  test('getNumber 메소드 테스트', () => {
    const lotto = new Lotto([1, 2, 3, 4, 5, 6]);

    expect(lotto.getNumbers()).toEqual([1, 2, 3, 4, 5, 6]);
  });

  test.each([
    [[1, 2, 3, 4, 5, 6], 9, '1st'],
    [[1, 2, 3, 4, 5, 10], 6, '2nd'],
    [[1, 2, 3, 4, 5, 10], 11, '3rd'],
    [[10, 1, 2, 3, 4, 15], 11, '4th'],
    [[10, 1, 2, 3, 14, 15], 16, '5th'],
  ])('raking 메소드 테스트', (winningNumbers, bonusNumber, result) => {
    const lotto = new Lotto([2, 3, 1, 6, 5, 4]);
    expect(lotto.ranking(winningNumbers, bonusNumber)).toBe(result);
  });
});
