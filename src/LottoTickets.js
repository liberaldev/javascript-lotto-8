class LottoTickets {
  #tickets;

  constructor() {
    this.#tickets = [];
  }

  add(ticket) {
    this.#tickets.push(ticket);
  }

  count() {
    return this.#tickets.length;
  }

  getTickets() {
    return this.#tickets;
  }

  countWining(winningNumbers, bonusNumber) {
    const result = {
      '1st': 0, '2nd': 0, '3rd': 0, '4th': 0, '5th': 0,
    };
    this.#tickets.forEach((lottoTicket) => {
      const ranking = lottoTicket.ranking(winningNumbers, bonusNumber);
      if (ranking) {
        result[ranking] += 1;
      }
    });
    return result;
  }
}

export default LottoTickets;
