export class Grid {
  constructor(resolution) {
    if (resolution > width || resolution > height) console.error('The resolution is too high.');
    this.resolution = resolution;
    this.arr = new Array(this.colN);
    for (let i = 0; i < this.colN; i++) {
      this.arr[i] = (new Array(this.rowN)).fill([]);
    }
    this.clear();
  }

  get colN() {
    return floor(width / this.resolution);
  }

  get rowN() {
    return floor(height / this.resolution);
  }

  clear() {
    this.arr.forEach(cols => cols.forEach(rows => rows = []));
  }

  iterate(func = (m, i, j) => null) {
    for (let i = 0; i < this.colN; i++) {
      for (let j = 0; j < this.rowN; j++) {
        func(this.arr[i][j], i, j);
      }
    }
  }

  get(i, j) {
    if (i < 0 || i >= this.colN) return [];
    if (j < 0 || j >= this.rowN) return [];
    return this.arr[i][j];
  }

  assign(movers) {
    movers.forEach(mover => {
      let col = floor(mover.x / this.resolution);
      let row = floor(mover.y / this.resolution);
      col = constrain(col, 0, this.colN - 1);
      row = constrain(row, 0, this.rowN - 1);
      this.arr[col][row].push(mover);
    });
  }

  setNeighbors() {
    this.iterate((movers, i, j) => {
      let neighbors = [...movers];
      neighbors.push(...this.get(i - 1, j));
      neighbors.push(...this.get(i, j - 1));
      neighbors.push(...this.get(i - 1, j - 1));
      neighbors.push(...this.get(i + 1, j));
      neighbors.push(...this.get(i, j + 1));
      neighbors.push(...this.get(i + 1, j + 1));
      neighbors.push(...this.get(i - 1, j + 1));
      neighbors.push(...this.get(i + 1, j - 1));
      movers.forEach(b => b.neighbors = neighbors);
    });
  }

  reset(movers) {
    this.clear();
    this.assign(movers);
    this.setNeighbors();
  }
}

export default Grid;