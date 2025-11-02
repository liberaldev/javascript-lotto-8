import { MissionUtils } from '@woowacourse/mission-utils';

class App {
  #amount;

  async run() {
    this.#amount = Number(await MissionUtils.Console.readLineAsync('구입금액을 입력해 주세요.\n'));
  }
}

export default App;
