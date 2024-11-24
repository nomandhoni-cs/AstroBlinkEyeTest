import React, { useEffect, useRef } from "react";

const StarryBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const c = canvas.getContext("2d");
    if (!c) return;

    const n_stars = 150;
    const colors = [
      "#FE4C55",
      "#FF6363",
      "#FF7A7B",
      "#D94A54",
      "#E15761",
      "#FF8485",
      "#C4454A",
      "#FF9497",
      "#F3474F",
      "#FFA3A5",
      ...Array(98).fill("#fff"),
    ];

    const randomInt = (max: number, min: number) =>
      Math.floor(Math.random() * (max - min) + min);

    class Star {
      x: number;
      y: number;
      radius: number;
      color: string;
      dy: number;

      constructor(
        x: number = randomInt(0, canvas?.width ?? window.innerWidth),
        y: number = randomInt(0, canvas?.height ?? window.innerHeight),
        radius: number = Math.random() * 1.1,
        color: string = colors[randomInt(0, colors.length)]
      ) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.dy = -Math.random() * 0.3;
      }

      draw() {
        const context = c as CanvasRenderingContext2D;
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.shadowBlur = randomInt(3, 15);
        context.shadowColor = this.color;
        context.strokeStyle = this.color;
        context.fillStyle = "rgba(255, 255, 255, .5)";
        context.fill();
        context.stroke();
        context.closePath();
      }

      update(arrayStars: Star[]) {
        if (this.y - this.radius < 0) this.createNewStar(arrayStars);
        this.y += this.dy;
        this.draw();
      }

      createNewStar(arrayStars: Star[]) {
        const i = arrayStars.indexOf(this);
        arrayStars.splice(i, 1);
        arrayStars.push(new Star());
      }
    }

    let stars: Star[] = [];
    const init = () => {
      for (let i = 0; i < n_stars; i++) {
        stars.push(new Star());
      }
    };
    init();

    const animate = () => {
      requestAnimationFrame(animate);
      c.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((s) => s.update(stars));
    };

    animate();

    const handleResize = () => {
      if (!canvas) return;
      const width = window.innerWidth;
      const height = window.innerHeight;
      const dpr = window.devicePixelRatio || 1;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      c.scale(dpr, dpr);

      stars = [];
      init();
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full fixed inset-0 -z-10 overflow-hidden"
    />
  );
};

export default StarryBackground;