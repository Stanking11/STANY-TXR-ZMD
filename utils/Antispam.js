class AntiSpam {
  constructor() {
    this.cooldown = new Map();
    this.cooldownTime = config.security.cooldown || 5000;
  }

  add(userId) {
    this.cooldown.set(userId, Date.now());
    setTimeout(() => this.cooldown.delete(userId), this.cooldownTime);
  }

  check(userId) {
    const lastUsed = this.cooldown.get(userId);
    return lastUsed && Date.now() - lastUsed < this.cooldownTime;
  }
}

module.exports = new AntiSpam();
