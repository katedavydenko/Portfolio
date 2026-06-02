import { useEffect, useRef } from "react";
import styles from "./BubbleCanvas.module.css"

class Particle {
    constructor(ctx, x, y) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.vx = random(-4, 4);
        this.vy = random(-4, 4);
        this.life = 1;
        this.destroyed = false;
    }

    draw() {
        const ctx = this.ctx;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${this.life})`;
        ctx.fill();
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life -= 0.04;
        if (this.life <= 0) {
            this.destroyed = true;
        }
    }
}

const MAX_BUBBLES = 10;
const BUBBLE_SPAWN_RATE = 0.2; // Note: Not directly used in the current animation logic, but kept to not change anything.

const mouse = { x: 0, y: 0 };
const blower = { x: 1120, offsetY: 250, y: 0 };

const random = (min, max) => Math.random() * (max - min) + min;

class Bubble {
    constructor(ctx, mouse, blower, particles, h) {
        this.ctx = ctx;
        this.mouse = mouse;
        this.particles = particles;
        this.h = h;
        this.x = blower.x;
        this.y = blower.y;
        this.radius = random(10, 20);
        this.vx = random(-2, -0.5);
        this.vy = random(-2, -1);
        this.life = 1;
        this.destroyed = false;
        this.offset = Math.random() * 1000;
        this.hovered = false;
    }

    draw() {
        const ctx = this.ctx;
        ctx.save();

        const gradient = ctx.createRadialGradient(
            this.x - this.radius * 0.3,
            this.y - this.radius * 0.3,
            this.radius * 0.1,
            this.x,
            this.y,
            this.radius
        );

        gradient.addColorStop(0, "rgba(255, 253, 192, 0.7)");
        gradient.addColorStop(0.2, "rgba(255, 253, 192, 0.5)");
        gradient.addColorStop(1, "rgba(255, 253, 192, 0)");

        // body
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // soft outline
        ctx.strokeStyle = "rgba(255, 231, 136, 0.95)";
        ctx.lineWidth = 1;
        ctx.stroke();

        // highlight spot
        ctx.beginPath();
        ctx.arc(
            this.x - this.radius * 0.4,
            this.y - this.radius * 0.1,
            this.radius * 0.4,
            0,
            Math.PI * 2
        );
        ctx.fillStyle = "rgba(255, 228, 175, 0.85)";
        ctx.fill();

        ctx.restore();
    }

    update() {
        this.x += this.vx + Math.sin(performance.now() * 0.001 + this.offset) * 0.3;
        this.y += this.vy;

        if (this.y < this.h * 0.2) {
            this.life -= 0.01;
        }

        if (this.life <= 0 || this.y < -100) {
            this.destroyed = true;
        }

        this.checkHover();
    }

    checkHover() {
        const dx = this.x - this.mouse.x;
        const dy = this.y - this.mouse.y;
        const distance = Math.hypot(dx, dy);

        this.hovered = distance < this.radius;

        if (this.hovered) {
            this.pop();
        }
    }

    pop() {
        this.destroyed = true;
        for (let i = 0; i < 8; i++) {
            this.particles.push(new Particle(this.ctx, this.x, this.y));
        }
    }
}

const BubblesCanvas = ({ isLight }) => {
    const canvasRef = useRef(null);
    const isLightRef = useRef(isLight);
    useEffect(() => {
        isLightRef.current = isLight;
    }, [isLight]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        let animationId;
        const bubbles = [];
        const particles = [];

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            blower.y = canvas.height - blower.offsetY;
        };

        const BURST_DURATION = 1500;
        const PAUSE_DURATION = 2000;

        let cycleStart = 0;
        let isBursting = true;

        const spawnBubble = (time) => {
            const amount = Math.floor(random(2, 7));
            for (let i = 0; i < amount; i++) {
                if (bubbles.length >= MAX_BUBBLES) return;
                bubbles.push(
                    new Bubble(ctx, mouse, blower, particles, canvas.height)
                );
            }
        };

        const updateScene = () => {
            bubbles.forEach((bubble) => {
                bubble.update();
                bubble.draw();
            });
            particles.forEach((particle) => {
                particle.update();
                particle.draw();
            });
        };

        const cleanupScene = () => {
            bubbles.splice(0, bubbles.length, ...bubbles.filter((b) => !b.destroyed));
            particles.splice(0, particles.length, ...particles.filter((p) => !p.destroyed));
        };

        const spawnController = (time) => {
            if (isBursting) {
                if (time - cycleStart >= BURST_DURATION) {
                    isBursting = false;
                    cycleStart = time;
                }
                spawnBubble(time);
            } else {
                if (time - cycleStart >= PAUSE_DURATION) {
                    isBursting = true;
                    cycleStart = time;
                }
            }
        };

        const animate = (time) => {
            if (!isLightRef.current) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                animationId = requestAnimationFrame(animate);

                return;
            }
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            spawnController(time);
            updateScene();
            cleanupScene();
            animationId = requestAnimationFrame(animate);
        };

        const updateMouse = (x, y) => {
            mouse.x = x;
            mouse.y = y;
        };

        const handleMove = (e) => {
            updateMouse(e.clientX, e.clientY);
        };

        const handleTouch = (e) => {
            const touch = e.touches[0];
            updateMouse(touch.clientX, touch.clientY);
        };

        resize();
        animate();

        window.addEventListener("resize", resize);
        window.addEventListener("mousemove", handleMove);
        window.addEventListener("touchmove", handleTouch);

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", handleMove);
            window.removeEventListener("touchmove", handleTouch);
        };
    }, []);

    return <canvas ref={canvasRef} className={styles.canvasBubble}></canvas>;
};

export default BubblesCanvas;