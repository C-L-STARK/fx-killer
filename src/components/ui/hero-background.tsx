"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export const HeroBackground = ({
    className,
}: {
    className?: string;
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let width = window.innerWidth;
        let height = window.innerHeight;

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        window.addEventListener("resize", resize);
        resize();

        // Configuration
        const lines: Line[] = [];
        const lineCount = 50;
        const speed = 0.2;

        class Line {
            x: number;
            y: number;
            length: number;
            angle: number;
            speed: number;
            color: string;
            width: number;

            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.length = Math.random() * 200 + 100; // Longer lines for "trading" feel
                this.angle = Math.random() * Math.PI * 2;
                this.speed = Math.random() * speed + 0.1;
                // FX Killer colors: Red (#ff102a) and White/Grey
                const isRed = Math.random() > 0.8; // 20% red lines
                this.color = isRed
                    ? `rgba(255, 16, 42, ${Math.random() * 0.5 + 0.3})` // Brighter Red (0.3-0.8)
                    : `rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1})`; // Brighter White (0.1-0.4)
                this.width = Math.random() * 2 + 1; // Thicker lines
            }

            update() {
                this.x += Math.cos(this.angle) * this.speed;
                this.y += Math.sin(this.angle) * this.speed;

                // Wrap around screen
                if (this.x < -this.length) this.x = width + this.length;
                if (this.x > width + this.length) this.x = -this.length;
                if (this.y < -this.length) this.y = height + this.length;
                if (this.y > height + this.length) this.y = -this.length;
            }

            draw(ctx: CanvasRenderingContext2D) {
                ctx.beginPath();
                ctx.moveTo(this.x, this.y);
                const endX = this.x + Math.cos(this.angle) * this.length;
                const endY = this.y + Math.sin(this.angle) * this.length;

                // Create gradient for fading tail
                const gradient = ctx.createLinearGradient(this.x, this.y, endX, endY);
                gradient.addColorStop(0, "transparent");
                gradient.addColorStop(0.5, this.color);
                gradient.addColorStop(1, "transparent");

                ctx.strokeStyle = gradient;
                ctx.lineWidth = this.width;
                ctx.lineTo(endX, endY);
                ctx.stroke();
            }
        }

        // Initialize lines
        for (let i = 0; i < lineCount; i++) {
            lines.push(new Line());
        }

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            // Optional: Add a subtle grid background
            drawGrid(ctx, width, height);

            lines.forEach((line) => {
                line.update();
                line.draw(ctx);
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className={cn("absolute inset-0 z-0 bg-black", className)}>
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
            />
            {/* Overlay gradient for depth - Reduced opacity */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-40 pointer-events-none" />
        </div>
    );
};

function drawGrid(ctx: CanvasRenderingContext2D, width: number, height: number) {
    ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
    ctx.lineWidth = 1;
    const gridSize = 100;

    for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
    }

    for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
    }
}
