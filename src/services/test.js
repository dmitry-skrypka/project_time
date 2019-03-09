function Pinger_ping(ip, callback) {
  if (!this.inUse) {
    this.inUse = true;
    this.callback = callback;
    this.ip = ip;

    const _that = this;

    this.img = new Image();

    this.img.onload = function () {
      _that.good();
    };
    this.img.onerror = function () {
      _that.good();
    };

    this.start = new Date().getTime();
    this.img.src = `https://${ip}`;
    this.timer = setTimeout(() => {
      _that.bad();
    }, 1500);
    this.time = new Date().getTime() - this.start;
    return this.time;
  }
}

export default Pinger_ping;
