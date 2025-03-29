import { useRef, useEffect } from "react";

export default function PythagorasBaum() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    function drawTree(x1, y1, x2, y2, q, minLength, color) {
      const x = x1 - x2;
      const y = y1 - y2;
      if (x * x + y * y >= minLength * minLength) {
        const a = q * q;
        const b = q * q + 1;
        const c = q * q + q + 1;

        const x3 = x2 - y1 + y2;
        const y3 = x1 - x2 + y2;
        const x4 = x1 - y1 + y2;
        const y4 = x1 - x2 + y1;
        const x5 = (a * x1 + x2 - c * (y1 - y2)) / b;
        const y5 = (c * (x1 - x2) + a * y1 + y2) / b;

        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineTo(x3, y3);
        ctx.lineTo(x4, y4);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = "green";
        ctx.beginPath();
        ctx.moveTo(x4, y4);
        ctx.lineTo(x3, y3);
        ctx.lineTo(x5, y5);
        ctx.closePath();
        ctx.fill();

        drawTree(x4, y4, x5, y5, q, minLength, "red");
        drawTree(x5, y5, x3, y3, q, minLength, "blue");
      }
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawTree(350, 400, 400, 400, Math.tan(Math.PI / 3), 10, "red");
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={600}
      style={{ border: "1px solid black" }}
    />
  );
}
