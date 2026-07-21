import React, { useEffect, useRef } from 'react';

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  decay: number;
  wobbleSpeed: number;
  wobbleRange: number;
  wobbleOffset: number;
}

interface Smoke {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  decay: number;
}

interface CanvasSizzleProps {
  intensity?: 'low' | 'medium' | 'high';
  className?: string;
  active?: boolean;
}

export const CanvasSizzle: React.FC<CanvasSizzleProps> = ({
  intensity = 'medium',
  className = '',
  active = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let sparks: Spark[] = [];
    let smoke: Smoke[] = [];

    // Fit canvas to parent container
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width || 400;
      canvas.height = rect.height || 300;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle colors based on premium fire and coal branding
    const COLORS = [
      'rgba(255, 90, 0, ',   // Deep orange
      'rgba(255, 179, 0, ',  // Bright amber
      'rgba(240, 50, 20, ',  // Fiery red
      'rgba(255, 230, 100, ', // Sparkling yellow
    ];

    const createSpark = (startX: number, startY: number): Spark => {
      const angle = (Math.random() * -Math.PI / 2) - Math.PI / 4; // rising upwards and outwards
      const speed = Math.random() * 2.5 + 1.2;
      return {
        x: startX + (Math.random() * 160 - 80),
        y: startY + (Math.random() * 10 - 5),
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1.0, // extra upward buoyancy
        size: Math.random() * 2.2 + 0.8,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        alpha: 1.0,
        decay: Math.random() * 0.02 + 0.015,
        wobbleSpeed: Math.random() * 0.05 + 0.02,
        wobbleRange: Math.random() * 1.5 + 0.5,
        wobbleOffset: Math.random() * Math.PI * 2,
      };
    };

    const createSmoke = (startX: number, startY: number): Smoke => {
      return {
        x: startX + (Math.random() * 200 - 100),
        y: startY,
        vx: (Math.random() * 0.6 - 0.3),
        vy: -(Math.random() * 1.2 + 0.8),
        size: Math.random() * 30 + 20,
        alpha: Math.random() * 0.15 + 0.05,
        decay: Math.random() * 0.003 + 0.002,
      };
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (!active) {
        animationFrameId = requestAnimationFrame(draw);
        return;
      }

      const spawnRate = intensity === 'high' ? 0.8 : intensity === 'medium' ? 0.4 : 0.15;
      const basePulseX = canvas.width / 2;
      const basePulseY = canvas.height - 20;

      // 1. Spawn Sparks
      if (Math.random() < spawnRate) {
        const count = intensity === 'high' ? 3 : 1;
        for (let i = 0; i < count; i++) {
          sparks.push(createSpark(basePulseX, basePulseY));
        }
      }

      // 2. Spawn Steam/Smoke
      if (Math.random() < spawnRate * 0.3) {
        smoke.push(createSmoke(basePulseX, basePulseY));
      }

      // 3. Update & Draw Smoke (Behind sparks)
      ctx.filter = 'blur(10px)';
      for (let i = smoke.length - 1; i >= 0; i--) {
        const sm = smoke[i];
        sm.x += sm.vx;
        sm.y += sm.vy;
        sm.size += 0.25; // Expands as it rises
        sm.alpha -= sm.decay;

        if (sm.alpha <= 0) {
          smoke.splice(i, 1);
          continue;
        }

        ctx.fillStyle = `rgba(180, 180, 180, ${sm.alpha})`;
        ctx.beginPath();
        ctx.arc(sm.x, sm.y, sm.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.filter = 'none';

      // 4. Update & Draw Sparks
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        
        // Wobble movement for organic sizzling floating paths
        s.wobbleOffset += s.wobbleSpeed;
        const currentVx = s.vx + Math.sin(s.wobbleOffset) * s.wobbleRange * 0.1;

        s.x += currentVx;
        s.y += s.vy;
        s.alpha -= s.decay;

        // Spark gravity / deceleration
        s.vy += 0.02;

        if (s.alpha <= 0 || s.x < 0 || s.x > canvas.width || s.y < 0) {
          sparks.splice(i, 1);
          continue;
        }

        // Draw spark with glowing glow
        ctx.fillStyle = s.color + s.alpha + ')';
        ctx.shadowBlur = s.size * 3;
        ctx.shadowColor = s.color + '1)';
        
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Reset shadow settings
      ctx.shadowBlur = 0;

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [intensity, active]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none mix-blend-screen z-10 ${className}`}
    />
  );
};
