// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

class Dot {
  constructor(x, y, m) {
    this.mass = m;
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
  }

  applyForce(force) {
    let f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    //this.acceleration.mult(0);
  }

  draw() {
    stroke(0);
    strokeWeight(2);
    fill(127, 127);
    circle(this.position.x, this.position.y, this.mass * 16);
  }

  attract(other, G = 1, MIN = 5, MAX = 25) {
    if(other === this) return;
    // Calculate direction of force
    let force = p5.Vector.sub(this.position, other.position);
    // Distance between objects
    let distance = force.mag();
    // Limiting the distance to eliminate "extreme" results for very close or very far objects
    distance = constrain(distance, MIN, MAX);
    // Calculate gravitional force magnitude
    let strength = (G * this.mass * other.mass) / (distance * distance);
    // Get force vector --> magnitude * direction
    force.setMag(strength);
    other.applyForce(force);
    //return force;
  }
}
