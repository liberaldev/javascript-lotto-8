import { MissionUtils } from '@woowacourse/mission-utils';

class App {
  #amount;

  #validateAmount() {
    if (Number.isNaN(this.#amount)) {
      throw new Error('[ERROR] 숫자를 입력하십시오');
    }
    if (this.#amount % 1000 !== 0) {
      throw new Error('[ERROR] 1000원으로 나누어떨어지지 않습니다. 1000원 단위로 입력하십시오');
    }
  }

  async run() {
    try {
      this.#amount = Number(await MissionUtils.Console.readLineAsync('구입금액을 입력해 주세요.\n'));
      this.#validateAmount();
    } catch (error) {
      MissionUtils.Console.print(error.message);
      this.#amount = Number(await MissionUtils.Console.readLineAsync('구입금액을 입력해 주세요.\n'));
    }
  }
}

export default App;
