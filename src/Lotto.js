class Lotto {
  #numbers;

  constructor(numbers) {
    Lotto.#validate(numbers);
    this.#numbers = numbers;
  }

  static #validate(numbers) {
    if (numbers.length !== 6) {
      throw new Error('[ERROR] 로또 번호는 6개여야 합니다.');
    }

    if (numbers.some((number) => number < 1 || number > 45)) {
      throw new Error('[ERROR] 각 로또 번호는 1부터 45까지여야 합니다.');
    }

    if (new Set(numbers).size !== 6) {
      throw new Error('[ERROR] 로또 번호는 중복된 숫자가 있으면 안됩니다.');
    }
  }

  getNumbers() {
    return this.#numbers;
  }

  ranking(winningNumbers, bonusNumber) {
    const winningNumbersSet = new Set(winningNumbers);
    const RANKING_BY_COUNT = {
      6: '1st',
      5: '3rd',
      4: '4th',
      3: '5th',
    };
    let result = RANKING_BY_COUNT[winningNumbersSet.intersection(new Set(this.#numbers)).size]
      || null;
    if (result === '3rd' && this.#numbers.includes(bonusNumber)) {
      result = '2nd';
    }
    return result;
  }
}

export default Lotto;
