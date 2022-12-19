import { useEffect, useRef } from 'react';

function Interaction() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const randomColors = ['#ada2ff', '#c0deff', '#ffe5f1', '#fff8e1'];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let radius = 30;
    let x = 0 + radius;
    let y = 0 + radius;
    let dx = 10;
    let dy = 10;

    let mouse: { x: number | undefined; y: number | undefined } = {
      x: undefined,
      y: undefined,
    };

    const offset = 90;

    const maximumRadius = 60;
    const minimumRadius = 2;
    class Circle {
      color: string;

      constructor(
        public dx: number,
        public dy: number,
        public x: number,
        public y: number,
        public radius: number,
      ) {
        this.color = randomColors[Math.floor(Math.random() * randomColors.length - 1)];
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = this.color;
        ctx.fill();
      }

      update() {
        if (this.x + this.radius > window.innerWidth || this.x - this.radius < 0) {
          this.dx *= -1;
        }

        if (this.y + this.radius > window.innerHeight || this.y - this.radius < 0) {
          this.dy *= -1;
        }

        if (
          mouse.x &&
          mouse.y &&
          Math.abs(mouse.x - this.x) < offset &&
          Math.abs(mouse.y - this.y) < offset &&
          this.radius < maximumRadius
        ) {
          this.radius += 3;
        }

        if (
          mouse.x &&
          mouse.y &&
          Math.abs(mouse.x - this.x) > offset &&
          Math.abs(mouse.y - this.y) > offset &&
          this.radius > minimumRadius
        ) {
          this.radius -= 2;
        }

        this.x += this.dx;
        this.y += this.dy;

        this.draw();
      }
    }

    const circles: Circle[] = [];

    for (let i = 0; i < 1000; i++) {
      const circle = new Circle(
        3 * Math.random(),
        3 * Math.random(),
        30 + (window.innerWidth - 60) * Math.random(),
        30 + (window.innerHeight - 60) * Math.random(),
        minimumRadius,
      );

      circles.push(circle);
    }

    function animate() {
      if (!ctx) return;

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      circles.forEach((circle) => {
        circle.update();
      });

      window.requestAnimationFrame(animate);
    }

    window.addEventListener('mousemove', (e) => {
      console.log(e.clientX, e.clientY);
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    animate();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }} className="App">
      <canvas
        ref={canvasRef}
        style={{ backgroundColor: '#6B728E' }}
        width={window.innerWidth * window.devicePixelRatio}
        height={window.innerHeight * window.devicePixelRatio}
      >
        canvas is not supported
      </canvas>
    </div>
  );
}

export default Interaction;
