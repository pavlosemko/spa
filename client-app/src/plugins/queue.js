export default class Queue {
  queue = [];
  generator = null;
  inProgress = false;
  cb = null;
  constructor(cb) {
    this.cb = cb;
  }

  addToQueue(item) {
    this.queue.push(item);

    console.log("----- add to queue -----", this.queue);

    if (!this.inProgress) {
      this.start();
    }
  }

  start() {
    console.log("----- start queue------");
    this.inProgress = true;
    this.generator = this.process();
    this.generator.next();
  }

  finish() {
    console.log("----- finish queue------");
    this.inProgress = false;
    this.generator = null;
  }

  *process() {
    while (this.queue.length !== 0 && this.inProgress) {
      console.log("------ process queue ----->", this.queue);
      const item = this.queue.shift();
      if (typeof this.cb === "function") {
        this.cb(item);
      }
      yield;
    }

    this.finish();
  }
}
