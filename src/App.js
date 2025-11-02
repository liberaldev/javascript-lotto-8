import { MissionUtils } from '@woowacourse/mission-utils';
import Lotto from './Lotto.js';

class App {
  #amount;

  #lottoTickets;

  #lottoWinningNumbers;

  #lottoBonusNumber;

  constructor() {
    this.#lottoTickets = [];
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
    for (let i = 0; i < this.#amount / 1000; i += 1) {
      this.#lottoTickets.push(new Lotto(MissionUtils.Random.pickUniqueNumbersInRange(1, 45, 6)));
    }
  }

  #displayLottoTickets() {
    MissionUtils.Console.print(`\n${this.#lottoTickets.length}개를 구매했습니다.`);
    this.#lottoTickets.forEach((lottoTicket) => {
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

  async #inputBonusNumber() {
    try {
      this.#lottoBonusNumber = Number(await MissionUtils.Console.readLineAsync('\n보너스 번호를 입력해 주세요.\n'));
    } catch (error) {
      MissionUtils.Console.print(`\n${error.message}`);
      await this.#inputBonusNumber();
    }
  }

  async run() {
    await this.#inputAmount();
    this.#buyLottoTickets();
    this.#displayLottoTickets();
    await this.#inputWinningNumbers();
    await this.#inputBonusNumber();
  }
}

export default App;
