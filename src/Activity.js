export default class Activity {
  constructor({ ActivityCode, ActivityType, Id }) {
    this.ActivityCode = ActivityCode;
    this.ActivityType = ActivityType;
    this.Id = Id;
    this.childNode = null;
    this.type = 'start';

    // start
    // notifier
    // approver
  }
}
