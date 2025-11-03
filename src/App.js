import { MissionUtils } from '@woowacourse/mission-utils';
import Lotto from './Lotto.js';
import LottoTickets from './LottoTickets.js';

class App {
  #amount;

  #lottoTickets;

  #lottoWinningNumbers;

  #lottoBonusNumber;

  #revenueByRanking;

  constructor() {
    this.#revenueByRanking = {
      '1st': 2000000000,
      '2nd': 30000000,
      '3rd': 1500000,
      '4th': 50000,
      '5th': 5000,
    };
  }

  #validateAmount() {
    if (Number.isNaN(this.#amount)) {
      throw new Error('[ERROR] 숫자를 입력하십시오');
    }
    if (this.#amount % 1000 !== 0) {
      throw new Error('[ERROR] 1000원으로 나누어떨어지지 않습니다. 1000원 단위로 입력하십시오');
    }
  }

  async #inputAmount() {
    try {
      this.#amount = Number(await MissionUtils.Console.readLineAsync('구입금액을 입력해 주세요.\n'));
      this.#validateAmount();
    } catch (error) {
      MissionUtils.Console.print(`\n${error.message}\n`);
      await this.#inputAmount();
    }
  }

  #buyLottoTickets() {
    this.#lottoTickets = new LottoTickets();
    for (let i = 0; i < this.#amount / 1000; i += 1) {
      this.#lottoTickets.add(new Lotto(MissionUtils.Random.pickUniqueNumbersInRange(1, 45, 6)));
    }
  }

  #displayLottoTickets() {
    MissionUtils.Console.print(`\n${this.#lottoTickets.count()}개를 구매했습니다.`);
    this.#lottoTickets.getTickets().forEach((lottoTicket) => {
      MissionUtils.Console.print(`[${lottoTicket.getNumbers().sort((a, b) => (a - b)).join(', ')}]`);
    });
  }

  #validateWinningNumbers() {
    if (this.#lottoWinningNumbers.includes(NaN)) {
      throw new Error('[ERROR] 숫자를 입력하세요');
    }

    if (this.#lottoWinningNumbers.length !== 6) {
      throw new Error('[ERROR] 6개 숫자를 입력하세요');
    }

    if (this.#lottoWinningNumbers.some((number) => number < 1 || number > 45)) {
      throw new Error('[ERROR] 1부터 45까지의 숫자를 입력하세요');
    }
  }

  async #inputWinningNumbers() {
    try {
      this.#lottoWinningNumbers = (await MissionUtils.Console.readLineAsync('\n당첨 번호를 입력해 주세요.\n')).split(',');
      this.#lottoWinningNumbers = this.#lottoWinningNumbers.map((number) => Number(number));
      this.#validateWinningNumbers();
    } catch (error) {
      MissionUtils.Console.print(`\n${error.message}`);
      await this.#inputWinningNumbers();
    }
  }

  #validateBonusNumber() {
    if (Number.isNaN(this.#lottoBonusNumber)) {
      throw new Error('[ERROR] 숫자를 입력하세요');
    }

    if (this.#lottoBonusNumber < 1 || this.#lottoBonusNumber > 45) {
      throw new Error('[ERROR] 1부터 45까지의 숫자를 입력하세요');
    }
  }

  async #inputBonusNumber() {
    try {
      this.#lottoBonusNumber = Number(await MissionUtils.Console.readLineAsync('\n보너스 번호를 입력해 주세요.\n'));
      this.#validateBonusNumber();
    } catch (error) {
      MissionUtils.Console.print(`\n${error.message}`);
      await this.#inputBonusNumber();
    }
  }

  #calculateRevenue() {
    const winCount = this.#lottoTickets.countWining(
      this.#lottoWinningNumbers,
      this.#lottoBonusNumber,
    );
    let revenue = 0;
    Object.entries(winCount).forEach(([ranking, count]) => {
      revenue += count * this.#revenueByRanking[ranking];
    });
    return revenue;
  }

  #revenueRate() {
    return (this.#calculateRevenue() / this.#amount) * 100;
  }

  #displayStatistics() {
    const winCount = this.#lottoTickets.countWining(
      this.#lottoWinningNumbers,
      this.#lottoBonusNumber,
    );
    MissionUtils.Console.print('\n당첨 통계\n---');
    MissionUtils.Console.print(`3개 일치 (${this.#revenueByRanking['5th'].toLocaleString('ko-KR')}원) - ${winCount['5th']}개`);
    MissionUtils.Console.print(`4개 일치 (${this.#revenueByRanking['4th'].toLocaleString('ko-KR')}원) - ${winCount['4th']}개`);
    MissionUtils.Console.print(`5개 일치 (${this.#revenueByRanking['3rd'].toLocaleString('ko-KR')}원) - ${winCount['3rd']}개`);
    MissionUtils.Console.print(`5개 일치, 보너스 볼 일치 (${this.#revenueByRanking['2nd'].toLocaleString('ko-KR')}원) - ${winCount['2nd']}개`);
    MissionUtils.Console.print(`6개 일치 (${this.#revenueByRanking['1st'].toLocaleString('ko-KR')}원) - ${winCount['1st']}개`);
    MissionUtils.Console.print(`총 수익률은 ${this.#revenueRate()}%입니다.`);
  }

  async run() {
    await this.#inputAmount();
    this.#buyLottoTickets();
    this.#displayLottoTickets();
    await this.#inputWinningNumbers();
    await this.#inputBonusNumber();
    await this.#displayStatistics();
  }
}

export default App;
