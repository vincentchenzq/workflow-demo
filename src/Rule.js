export default class Rule {
  constructor({ PostActivityCode, PreActivityCode, Id }) {
    this.PostActivityCode = PostActivityCode;
    this.PreActivityCode = PreActivityCode;
    this.Id = Id;
    this.childNode = null;
    this.type = 'condition';
  }
}
