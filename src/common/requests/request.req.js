class OffRequest {
  constructor({ dayOff, duration, type, proof }) {
    this.dayOff = dayOff;
    this.duration = duration;
    this.type = type;
    this.proof = proof;
  }
}

module.exports = OffRequest