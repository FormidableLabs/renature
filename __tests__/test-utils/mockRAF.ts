type RAFCallback = (timestamp: DOMHighResTimeStamp) => void;

export class MockRAF {
  #now: number;
  #callbacks: Record<number, RAFCallback>;
  #callbacksLength: number;

  constructor() {
    this.#now = 0;
    this.#callbacks = {};
    this.#callbacksLength = 0;
  }

  get now(): number {
    return this.#now;
  }

  rAF = (cb: RAFCallback): number => {
    this.#callbacksLength += 1;
    this.#callbacks[this.#callbacksLength] = cb;

    return this.#callbacksLength;
  };

  cancel = (id: number): void => {
    delete this.#callbacks[id];
  };

  step = (opts: { time?: number; count?: number } = {}): void => {
    const options = {
      time: 1000 / 60,
      count: 1,
      ...opts,
    };

    let prevCallbacks: Record<
      number,
      (timestamp: DOMHighResTimeStamp) => void
    > = {};

    for (let i = 0; i < options.count; i++) {
      prevCallbacks = this.#callbacks;
      this.#callbacks = {};

      this.#now += options.time;

      Object.keys(prevCallbacks).forEach((id) => {
        const callback = prevCallbacks[parseInt(id, 10)];
        callback(this.#now);
      });
    }
  };
}
