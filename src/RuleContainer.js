export default class RuleContainer {
  constructor() {
    this.childNode = null;
    this.type = 'route';
    this.conditionNodes = [];
    this.Id = guid();
  }
}

function guid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
