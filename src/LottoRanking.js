class LottoRanking {
  static #FIRST = new LottoRanking('1st', 2000000000, 6, false, '6개 일치');

  static #SECOND = new LottoRanking('2nd', 30000000, 5, true, '5개 일치, 보너스 볼 일치');

  static #THIRD = new LottoRanking('3rd', 1500000, 5, false, '5개 일치');

  static #FOURTH = new LottoRanking('4th', 50000, 4, false, '4개 일치');

  static #FIFTH = new LottoRanking('5th', 5000, 3, false, '3개 일치');

  constructor(key, prize, matchCount, hasBonusNum, description) {
    this.key = key;
    this.prize = prize;
    this.matchCount = matchCount;
    this.hasBonusNum = hasBonusNum;
    this.description = description;
  }

  static values() {
    return [this.#FIRST, this.#SECOND, this.#THIRD, this.#FOURTH, this.#FIFTH];
  }

  static findRanking(matchCount, hasBonusNum) {
    const ranking = this.values().find(
      (item) => (matchCount === item.matchCount && hasBonusNum === item.hasBonusNum)
        || (matchCount === item.matchCount && !item.hasBonusNum),
    );
    if (ranking) {
      return ranking.key;
    }
    return null;
  }
}

export default LottoRanking;
