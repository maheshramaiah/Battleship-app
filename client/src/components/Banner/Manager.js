class NotificationManager {
  constructor() {
    this.id = 0;
    this.notifications = [];
    this.timer = {};
  }

  subscribe(notify) {
    this.notify = notify;
  }

  push(msg) {
    const config = { msg, id: this.id++ };

    this.notifications = [...this.notifications, config];
    this.addTimer(config);
    this.refreshList();
  }

  clear() {
    this.notify && this.notify([]);
  }

  addTimer(config) {
    this.timer[config.id] = setTimeout(() => {
      this.removeNotification(config);
    }, 2000);
  }

  removeNotification(config) {
    this.notifications = this.notifications.filter(n => n.id !== config.id);
    this.refreshList();
  }

  refreshList() {
    this.notify && this.notify(this.notifications);
  }
}

export default NotificationManager;
