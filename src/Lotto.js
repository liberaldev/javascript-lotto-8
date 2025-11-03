import LottoRanking from './LottoRanking.js';

class Lotto {
  #numbers;

  constructor(numbers) {
    Lotto.#validate(numbers);
    this.#numbers = numbers;
  }

  static #validate(numbers) {
    const LOTTO_SIZE = 6;
    const MIN_NUMBER = 1; const MAX_NUMBER = 45;

    if (numbers.length !== LOTTO_SIZE) {
      throw new Error(`[ERROR] 로또 번호는 ${LOTTO_SIZE}개여야 합니다.`);
    }

    if (numbers.some((number) => number < MIN_NUMBER || number > MAX_NUMBER)) {
      throw new Error(`[ERROR] 각 로또 번호는 ${MIN_NUMBER}부터 ${MAX_NUMBER}까지여야 합니다.`);
    }

    if (new Set(numbers).size !== LOTTO_SIZE) {
      throw new Error('[ERROR] 로또 번호는 중복된 숫자가 있으면 안됩니다.');
    }
  }

  getNumbers() {
    return this.#numbers;
  }

  ranking(winningNumbers, bonusNumber) {
    const winningNumbersSet = new Set(winningNumbers);
    const matchCount = winningNumbersSet.intersection(new Set(this.#numbers)).size;
    const hasBonusNum = this.#numbers.includes(bonusNumber);
    return LottoRanking.findRanking(matchCount, hasBonusNum);
  }
}

export default Lotto;
