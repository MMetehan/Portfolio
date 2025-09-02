import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../ThemeContext';

const MouseLightning = () => {
    const { theme } = useTheme();
    const canvasRef = useRef(null);
    const animationRef = useRef(null);
    const mouseRef = useRef({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let time = 0;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        const handleMouseMove = (e) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
            setIsVisible(true);
        };

        const handleMouseLeave = () => {
            setIsVisible(false);
        };

        const createRealisticLightning = (startX, startY, endX, endY, intensity = 1) => {
            const points = [];
            const segments = Math.floor(8 + Math.random() * 6);

            for (let i = 0; i <= segments; i++) {
                const t = i / segments;
                let x = startX + (endX - startX) * t;
                let y = startY + (endY - startY) * t;

                if (i > 0 && i < segments) {
                    const deviation = intensity * (20 - Math.abs(segments / 2 - i) * 2);
                    const angle = Math.atan2(endY - startY, endX - startX) + Math.PI / 2;
                    const randomOffset = (Math.random() - 0.5) * deviation;

                    x += Math.cos(angle) * randomOffset;
                    y += Math.sin(angle) * randomOffset;
                }

                points.push({ x, y });
            }

            return points;
        };

        const createLightningBranch = (startPoint, targetX, targetY, intensity = 0.5) => {
            const points = [];
            const segments = Math.floor(3 + Math.random() * 4);

            const branchLength = 0.3 + Math.random() * 0.4;
            const finalX = startPoint.x + (targetX - startPoint.x) * branchLength;
            const finalY = startPoint.y + (targetY - startPoint.y) * branchLength;

            for (let i = 0; i <= segments; i++) {
                const t = i / segments;
                let x = startPoint.x + (finalX - startPoint.x) * t;
                let y = startPoint.y + (finalY - startPoint.y) * t;

                if (i > 0 && i < segments) {
                    const deviation = intensity * 15;
                    x += (Math.random() - 0.5) * deviation;
                    y += (Math.random() - 0.5) * deviation;
                }

                points.push({ x, y });
            }

            return points;
        };

        const drawLightningLayer = (ctx, points, opacity, lineWidth, color) => {
            if (points.length < 2) return;

            ctx.globalAlpha = opacity;
            ctx.lineWidth = lineWidth;
            ctx.strokeStyle = color;
            ctx.shadowBlur = lineWidth * 2;
            ctx.shadowColor = color;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';

            ctx.beginPath();
            ctx.moveTo(points[0].x, points[0].y);

            for (let i = 1; i < points.length; i++) {
                ctx.lineTo(points[i].x, points[i].y);
            }

            ctx.stroke();
            ctx.shadowBlur = 0;
        };

        const drawLightningParticles = (ctx, x, y, color) => {
            const particleCount = 3 + Math.floor(Math.random() * 4);

            for (let i = 0; i < particleCount; i++) {
                const angle = (Math.PI * 2 * i) / particleCount + Math.random() * 0.5;
                const distance = 5 + Math.random() * 10;
                const px = x + Math.cos(angle) * distance;
                const py = y + Math.sin(angle) * distance;
                const size = 1 + Math.random() * 2;

                ctx.fillStyle = color;
                ctx.globalAlpha = 0.6 + Math.random() * 0.4;
                ctx.shadowBlur = 8;
                ctx.shadowColor = color;

                ctx.beginPath();
                ctx.arc(px, py, size, 0, Math.PI * 2);
                ctx.fill();

                ctx.shadowBlur = 0;
            }
        };

        // Animation loop
        const animate = () => {
            time += 0.016;
            const { x: mouseX, y: mouseY } = mouseRef.current;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            if (isVisible) {
                const interactiveElements = document.querySelectorAll('button, .my-self-image, .social-link, .skill-item, .theme-toggle, .language-toggle, .interactive-title, h2, h3, .card, [role="button"]');

                interactiveElements.forEach((element) => {
                    const rect = element.getBoundingClientRect();
                    const centerX = rect.left + rect.width / 2;
                    const centerY = rect.top + rect.height / 2;
                    const distance = Math.sqrt(Math.pow(centerX - mouseX, 2) + Math.pow(centerY - mouseY, 2));
                    const isHovered = element.matches(':hover');

                    if (distance < 300 && !isHovered) {
                        const opacity = Math.max(0.3, 1 - distance / 300);
                        const intensity = distance < 150 ? 1.5 : distance < 250 ? 1 : 0.7;
                        const lightningPath = createRealisticLightning(mouseX, mouseY, centerX, centerY, intensity);

                        drawLightningLayer(ctx, lightningPath, opacity * 0.3, 8, theme === 'dark' ? '#00ffff30' : '#6366f130');
                        drawLightningLayer(ctx, lightningPath, opacity * 0.6, 4, theme === 'dark' ? '#00ffff80' : '#6366f180');
                        drawLightningLayer(ctx, lightningPath, opacity, 2, theme === 'dark' ? '#ffffff' : '#ffffff');

                        if (Math.random() < 0.3 && distance < 200) {
                            const branchPoint = Math.floor(lightningPath.length * (0.3 + Math.random() * 0.4));
                            if (lightningPath[branchPoint]) {
                                const branchPath = createLightningBranch(lightningPath[branchPoint], centerX, centerY, intensity * 0.6);
                                drawLightningLayer(ctx, branchPath, opacity * 0.7, 2, theme === 'dark' ? '#00ffff80' : '#6366f180');
                            }
                        }

                        if (Math.random() < 0.4) {
                            drawLightningParticles(ctx, centerX, centerY, theme === 'dark' ? '#00ffff' : '#6366f1');
                        }
                    }
                });

                const glowSize = 8 + Math.sin(time * 3) * 2;
                ctx.shadowBlur = 20;
                ctx.shadowColor = theme === 'dark' ? '#00ffff' : '#6366f1';
                ctx.fillStyle = theme === 'dark' ? '#00ffff' : '#6366f1';
                ctx.globalAlpha = 0;

                ctx.beginPath();
                ctx.arc(mouseX, mouseY, glowSize, 0, Math.PI * 2);
                ctx.fill();

                ctx.shadowBlur = 0;
                ctx.globalAlpha = 1;
            }

            animationRef.current = requestAnimationFrame(animate);
        };
        animate();

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
            window.removeEventListener('resize', resizeCanvas);
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [theme]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-50"
            style={{
                opacity: isVisible ? 1 : 0,
                transition: 'opacity 0.3s ease',
                backgroundColor: 'transparent'
            }}
        />
    );
};

export default MouseLightning;
