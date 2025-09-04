// Animation utilities for enhanced user experience
export class ParticleSystem {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private animationFrame: number | null = null;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    this.init();
  }

  private init() {
    this.resizeCanvas();
    this.createParticles();
    this.animate();
    
    window.addEventListener('resize', () => this.resizeCanvas());
  }

  private resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  private createParticles() {
    const numParticles = Math.floor((this.canvas.width * this.canvas.height) / 15000);
    
    for (let i = 0; i < numParticles; i++) {
      this.particles.push(new Particle(this.canvas));
    }
  }

  private animate = () => {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.particles.forEach(particle => {
      particle.update();
      particle.draw(this.ctx);
    });

    this.animationFrame = requestAnimationFrame(this.animate);
  };

  public destroy() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
    window.removeEventListener('resize', () => this.resizeCanvas());
  }
}

class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  canvas: HTMLCanvasElement;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5;
    this.size = Math.random() * 2 + 1;
    this.opacity = Math.random() * 0.5 + 0.2;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0 || this.x > this.canvas.width) this.vx *= -1;
    if (this.y < 0 || this.y > this.canvas.height) this.vy *= -1;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(0, 255, 255, ${this.opacity})`;
    ctx.fill();
    
    // Add quantum glow effect
    ctx.shadowColor = 'cyan';
    ctx.shadowBlur = 10;
    ctx.fill();
    ctx.shadowBlur = 0;
  }
}

// Typing animation utility
export class TypingAnimation {
  private element: HTMLElement;
  private text: string;
  private speed: number;
  private currentIndex: number = 0;
  private isDeleting: boolean = false;

  constructor(element: HTMLElement, text: string, speed: number = 100) {
    this.element = element;
    this.text = text;
    this.speed = speed;
  }

  start() {
    this.type();
  }

  private type() {
    const current = this.text.substring(0, this.currentIndex);
    this.element.textContent = current;

    if (!this.isDeleting && this.currentIndex < this.text.length) {
      this.currentIndex++;
      setTimeout(() => this.type(), this.speed);
    } else if (this.isDeleting && this.currentIndex > 0) {
      this.currentIndex--;
      setTimeout(() => this.type(), this.speed / 2);
    }
  }

  reset() {
    this.currentIndex = 0;
    this.isDeleting = false;
  }
}

// Smooth scroll utility
export const smoothScrollTo = (elementId: string, offset: number = 0) => {
  const element = document.getElementById(elementId);
  if (element) {
    const targetPosition = element.offsetTop - offset;
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }
};

// Interactive hover effects
export const addHoverGlow = (element: HTMLElement) => {
  element.addEventListener('mouseenter', () => {
    element.style.boxShadow = '0 0 20px rgba(0, 255, 255, 0.5)';
    element.style.transform = 'scale(1.02)';
    element.style.transition = 'all 0.3s ease';
  });

  element.addEventListener('mouseleave', () => {
    element.style.boxShadow = '';
    element.style.transform = '';
  });
};