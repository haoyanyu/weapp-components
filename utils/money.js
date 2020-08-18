function extend(obj, ...rest) {
  (rest || []).forEach(source => {
    if (source) {
      for (let prop in source) {
        obj[prop] = source[prop];
      }
    }
  });
  return obj;
}

function Money(money) {
  this.money = money;
}

Money.prototype = extend(Money.prototype, {
  toCent() {
    return parseInt(Math.round(this.money * 100), 10) || 0;
  },

  toYuan() {
    return this.adjustFixed(parseFloat(this.money / 100) || 0, 2);
  },

  format() {
    const decimal = String(this.money / 100).split('.')[1];
    const len = decimal ? Math.min(decimal.length, 2) : 0;
    return (this.money / 100).toFixed(len);
  },

  adjustFixed(num, len) {
    return (Math.round(num * Math.pow(10, len)) / Math.pow(10, len)).toFixed(len);
  }
});

export default money => new Money(money);
