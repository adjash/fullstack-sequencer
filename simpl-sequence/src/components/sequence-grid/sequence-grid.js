export class SequenceGrid {
  constructor(beatData) {
    this.state = beatData;
  }

  init() {
    this.render();
  }

  render() {
    console.log(this.state);
  }
}
