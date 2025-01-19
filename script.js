const canvas = document.getElementById("galaxyCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const stars = [];
const G = 0.1; // Gravitational constant

let speedMultiplier = 1;
let gravityMultiplier = 1;

document.getElementById("speedControl").addEventListener("input", (e) => {
  speedMultiplier = e.target.value;
});

document.getElementById("gravityControl").addEventListener("input", (e) => {
  gravityMultiplier = e.target.value;
});

document.getElementById("addStar").addEventListener("click", () => {
  addStar();
});

class Star {
  constructor(x, y, mass) {
    this.x = x;
    this.y = y;
    this.mass = mass;
    this.vx = (Math.random() - 0.5) * 2;
    this.vy = (Math.random() - 0.5) * 2;
    this.color = `hsl(${Math.random() * 360}, 100%, 70%)`;
  }

  update() {
    stars.forEach((star) => {
      if (star !== this) {
        const dx = star.x - this.x;
        const dy = star.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 10) {
          const force = (G * this.mass * star.mass) / (distance * distance);
          const ax = (force * dx) / distance;
          const ay = (force * dy) / distance;

          this.vx += ax * gravityMultiplier;
          this.vy += ay * gravityMultiplier;
        }
      }
    });

    this.x += this.vx * speedMultiplier;
    this.y += this.vy * speedMultiplier;

    if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
    if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.mass, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.shadowBlur = 15;
    ctx.shadowColor = this.color;
    ctx.fill();
    ctx.closePath();
  }
}

function addStar() {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height;
  const mass = Math.random() * 5 + 3;
  stars.push(new Star(x, y, mass));
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  stars.forEach((star) => {
    star.update();
    star.draw();
  });

  requestAnimationFrame(animate);
}

// Initial setup
for (let i = 0; i < 10; i++) addStar();

animate();
