import {
  type PointerEvent as ReactPointerEvent,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
} from "react";

interface Point {
  x: number;
  y: number;
}

interface Ripple extends Point {
  radius: number;
  opacity: number;
  born: number;
}

interface KineticGridProps {
  children: ReactNode;
  className?: string;
}

const CELL_SIZE = 55;
const INFLUENCE_RADIUS = 260;
const MAX_WARP = 24;
const DOT_SPACING = 28;
const LERP_SPEED = 0.08;

const lerp = (from: number, to: number, amount: number) =>
  from + (to - from) * amount;

function KineticGrid({ children, className = "" }: KineticGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<Point>({ x: -9999, y: -9999 });
  const targetMouseRef = useRef<Point>({ x: -9999, y: -9999 });
  const ripplesRef = useRef<Ripple[]>([]);
  const frameRef = useRef<number>(0);
  const sizeRef = useRef({ width: 0, height: 0, pixelRatio: 1 });

  const draw = useCallback((now: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const { width, height, pixelRatio } = sizeRef.current;
    const mouse = mouseRef.current;
    const ripples = ripplesRef.current;

    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    context.clearRect(0, 0, width, height);

    context.fillStyle = "rgba(245, 245, 242, 0.035)";
    for (let x = DOT_SPACING / 2; x < width; x += DOT_SPACING) {
      for (let y = DOT_SPACING / 2; y < height; y += DOT_SPACING) {
        context.beginPath();
        context.arc(x, y, 0.65, 0, Math.PI * 2);
        context.fill();
      }
    }

    for (let index = ripples.length - 1; index >= 0; index -= 1) {
      const ripple = ripples[index];
      const age = (now - ripple.born) / 1000;
      ripple.radius = age * 400;
      ripple.opacity = Math.max(0, 1 - age * 1.2);
      if (ripple.opacity === 0) ripples.splice(index, 1);
    }

    const columns = Math.max(2, Math.ceil(width / CELL_SIZE)) + 1;
    const rows = Math.max(2, Math.ceil(height / CELL_SIZE)) + 1;
    const cellWidth = width / (columns - 1);
    const cellHeight = height / (rows - 1);

    const points: Point[][] = [];
    const proximity: number[][] = [];
    for (let row = 0; row < rows; row += 1) {
      points[row] = [];
      proximity[row] = [];
      for (let column = 0; column < columns; column += 1) {
        const baseX = column * cellWidth;
        const baseY = row * cellHeight;
        const edgePin = Math.min(
          column / 1.5,
          (columns - 1 - column) / 1.5,
          row / 1.5,
          (rows - 1 - row) / 1.5,
          1,
        );
        const pin = edgePin * edgePin;
        const distance = Math.hypot(baseX - mouse.x, baseY - mouse.y);
        const active = Math.max(0, 1 - distance / INFLUENCE_RADIUS) * pin;
        let offsetX = 0;
        let offsetY = 0;

        for (const ripple of ripples) {
          const deltaX = baseX - ripple.x;
          const deltaY = baseY - ripple.y;
          const rippleDistance = Math.hypot(deltaX, deltaY);
          const difference = rippleDistance - ripple.radius;
          if (Math.abs(difference) < 55) {
            const strength = (1 - Math.abs(difference) / 55) * ripple.opacity * 18 * pin;
            const angle = Math.atan2(deltaY, deltaX);
            const direction = difference < 0 ? 1 : -1;
            offsetX += Math.cos(angle) * strength * direction;
            offsetY += Math.sin(angle) * strength * direction;
          }
        }

        if (distance < INFLUENCE_RADIUS && distance > 0 && pin > 0) {
          const progress = distance / INFLUENCE_RADIUS;
          const amount = (1 - progress) ** 2 * Math.min(1, distance / 60) * MAX_WARP * pin;
          const angle = Math.atan2(baseY - mouse.y, baseX - mouse.x);
          offsetX -= Math.cos(angle) * amount;
          offsetY -= Math.sin(angle) * amount;
        }

        points[row][column] = { x: baseX + offsetX, y: baseY + offsetY };
        proximity[row][column] = active;
      }
    }

    const drawSegment = (first: Point, second: Point, amount: number) => {
      const smooth = amount * amount * (3 - 2 * amount);
      context.beginPath();
      context.moveTo(first.x, first.y);
      context.lineTo(second.x, second.y);
      context.strokeStyle = `rgba(245, 245, 242, ${0.1 + smooth * 0.5})`;
      context.lineWidth = lerp(0.75, 1.4, smooth);
      context.stroke();
    };

    for (let row = 0; row < rows; row += 1) {
      for (let column = 0; column < columns - 1; column += 1) {
        drawSegment(points[row][column], points[row][column + 1], (proximity[row][column] + proximity[row][column + 1]) / 2);
      }
    }
    for (let column = 0; column < columns; column += 1) {
      for (let row = 0; row < rows - 1; row += 1) {
        drawSegment(points[row][column], points[row + 1][column], (proximity[row][column] + proximity[row + 1][column]) / 2);
      }
    }

    for (let row = 0; row < rows; row += 1) {
      for (let column = 0; column < columns; column += 1) {
        const point = points[row][column];
        const active = proximity[row][column];
        const smooth = active * active * (3 - 2 * active);
        context.beginPath();
        context.arc(point.x, point.y, lerp(1.4, 3, smooth), 0, Math.PI * 2);
        context.fillStyle = `rgba(245, 245, 242, ${0.17 + smooth * 0.83})`;
        context.fill();
      }
    }

    for (const ripple of ripples) {
      context.beginPath();
      context.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
      context.strokeStyle = `rgba(245, 245, 242, ${ripple.opacity * 0.22})`;
      context.lineWidth = 1.5;
      context.stroke();
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const resize = () => {
      const bounds = container.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      sizeRef.current = { width: bounds.width, height: bounds.height, pixelRatio };
      canvas.width = Math.round(bounds.width * pixelRatio);
      canvas.height = Math.round(bounds.height * pixelRatio);
    };
    const observer = new ResizeObserver(resize);
    observer.observe(container);
    resize();

    const animate = (now: number) => {
      mouseRef.current.x = lerp(mouseRef.current.x, targetMouseRef.current.x, LERP_SPEED);
      mouseRef.current.y = lerp(mouseRef.current.y, targetMouseRef.current.y, LERP_SPEED);
      draw(now);
      frameRef.current = requestAnimationFrame(animate);
    };
    frameRef.current = requestAnimationFrame(animate);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frameRef.current);
    };
  }, [draw]);

  const pointerPosition = (
    event: ReactPointerEvent<HTMLDivElement> | ReactMouseEvent<HTMLDivElement>,
  ) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    return { x: event.clientX - bounds.left, y: event.clientY - bounds.top };
  };

  return (
    <div
      ref={containerRef}
      className={`kinetic-grid ${className}`}
      onPointerMove={(event) => { targetMouseRef.current = pointerPosition(event); }}
      onPointerLeave={() => { targetMouseRef.current = { x: -9999, y: -9999 }; }}
      onClick={(event) => {
        const point = pointerPosition(event);
        ripplesRef.current.push({ ...point, radius: 0, opacity: 1, born: performance.now() });
      }}
    >
      <canvas ref={canvasRef} className="kinetic-grid-canvas" aria-hidden="true" />
      <div className="kinetic-grid-content">{children}</div>
    </div>
  );
}

export default KineticGrid;
