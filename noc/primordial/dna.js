class DNA {

  constructor(subject, rna = {}, bases = {}) {
    subject.dna = this;
    this.subject = subject;
    this.rna = rna;
    this.bases = bases;
    this.read();
    Object.entries(rna).forEach(([key, val]) => this.set(key, val));
  }

  read() {
    Object.entries(this.subject).forEach(([key, val]) => {
      if (["x", "y"].includes(key)) return;
      if (typeof this.subject[key] === "number") this.set(key, val);
    });
  }

  write() {
    this.keys.forEach(key => {
      if (["x", "y"].includes(key)) return;
      if (typeof this.subject[key] === "number") this.subject[key] = this.get(key);
    });
  }

  get keys() {
    return Object.keys(this.rna);
  }

  set(key, val) {
    if (val === undefined) val = random();
    if (this.bases[key]) {
      this.rna[key] = val < 1 ? val : val / this.bases[key];
      this.write();
      return;
    }
    let base = 1;
    while (base < val) base *= 10;
    this.bases[key] = base;
    this.rna[key] = val / base;
    this.write();
  }

  get(key) {
    return this.rna[key] * this.bases[key];
  }

  copy(subject, mutationRate) {
    this.read();
    let copy = new DNA(subject, this.rna, this.bases);
    if(mutationRate) copy.mutate(mutationRate);
    return copy;
  }

  mutate(mutationRate = 0.1) {
    Object.entries(this.rna).forEach(([key, val]) => {
      if (random() < mutationRate) {
        if (random() < mutationRate) {
          this.set(key);
        } else {
          this.set(key, randomGaussian(val, mutationRate));
        }
      } else {
        this.set(key, val);
      }
    });
    this.write();
    return this;
  }

}

export default DNA;