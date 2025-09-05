import { useEffect, useState, useCallback } from 'react';
import { getUserPreferences, updateUserStats, SessionTimer } from '@/utils/localStorage';
import { ParticleSystem } from '@/utils/animations';

// Custom hook for quantum-themed effects and interactions
export const useQuantumEffects = () => {
  const [particleSystem, setParticleSystem] = useState<ParticleSystem | null>(null);
  const [sessionTimer] = useState(() => new SessionTimer());
  const [userStats, setUserStats] = useState(() => getUserPreferences());

  useEffect(() => {
    // Start session tracking
    sessionTimer.start();
    
    // Update login count
    updateUserStats({ 
      totalLogins: userStats.lastLoginTime ? userStats.favoriteServices.length + 1 : 1 
    });

    return () => {
      sessionTimer.stop();
    };
  }, []);

  const initializeParticles = useCallback((canvas: HTMLCanvasElement) => {
    if (userStats.animationsEnabled) {
      const system = new ParticleSystem(canvas);
      setParticleSystem(system);
      return system;
    }
    return null;
  }, [userStats.animationsEnabled]);

  const cleanupParticles = useCallback(() => {
    if (particleSystem) {
      particleSystem.destroy();
      setParticleSystem(null);
    }
  }, [particleSystem]);

  const addQuantumGlow = useCallback((element: HTMLElement) => {
    if (!userStats.animationsEnabled) return;

    const handleMouseEnter = () => {
      element.style.boxShadow = '0 0 20px rgba(0, 255, 255, 0.6)';
      element.style.transform = 'translateY(-2px) scale(1.02)';
      element.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    };

    const handleMouseLeave = () => {
      element.style.boxShadow = '';
      element.style.transform = '';
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [userStats.animationsEnabled]);

  const playQuantumSound = useCallback((type: 'hover' | 'click' | 'success' | 'error') => {
    // Sound effects disabled for better user experience
    return;
  }, []);

  const createRippleEffect = useCallback((event: React.MouseEvent<HTMLElement>) => {
    if (!userStats.animationsEnabled) return;

    const element = event.currentTarget;
    const rect = element.getBoundingClientRect();
    const ripple = document.createElement('span');

    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: radial-gradient(circle, rgba(0, 255, 255, 0.3) 0%, transparent 70%);
      border-radius: 50%;
      pointer-events: none;
      transform: scale(0);
      animation: quantumRipple 0.6s ease-out;
    `;

    // Add CSS animation if not already present
    if (!document.getElementById('quantum-ripple-style')) {
      const style = document.createElement('style');
      style.id = 'quantum-ripple-style';
      style.textContent = `
        @keyframes quantumRipple {
          to {
            transform: scale(2);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }

    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  }, [userStats.animationsEnabled]);

  return {
    initializeParticles,
    cleanupParticles,
    addQuantumGlow,
    playQuantumSound,
    createRippleEffect,
    userPreferences: userStats
  };
};

// Hook for form enhancements
export const useQuantumForm = () => {
  const [isValidating, setIsValidating] = useState(false);
  const [validationResults, setValidationResults] = useState<Record<string, boolean>>({});
  const { playQuantumSound } = useQuantumEffects();

  const validateField = useCallback(async (
    name: string, 
    value: string, 
    validator: (value: string) => boolean | Promise<boolean>
  ) => {
    setIsValidating(true);
    
    try {
      const isValid = await validator(value);
      setValidationResults(prev => ({ ...prev, [name]: isValid }));
      playQuantumSound(isValid ? 'success' : 'error');
      return isValid;
    } catch (error) {
      setValidationResults(prev => ({ ...prev, [name]: false }));
      playQuantumSound('error');
      return false;
    } finally {
      setIsValidating(false);
    }
  }, [playQuantumSound]);

  const resetValidation = useCallback(() => {
    setValidationResults({});
  }, []);

  return {
    validateField,
    resetValidation,
    isValidating,
    validationResults
  };
};

// Hook for interactive quantum elements
export const useQuantumInteractions = () => {
  const [activeElements, setActiveElements] = useState<Set<string>>(new Set());
  const { addQuantumGlow, playQuantumSound, createRippleEffect } = useQuantumEffects();

  const registerQuantumElement = useCallback((id: string, element: HTMLElement) => {
    const cleanup = addQuantumGlow(element);
    setActiveElements(prev => new Set([...prev, id]));

    return () => {
      if (cleanup) cleanup();
      setActiveElements(prev => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    };
  }, [addQuantumGlow]);

  const handleQuantumClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
    createRippleEffect(event);
    playQuantumSound('click');
  }, [createRippleEffect, playQuantumSound]);

  const handleQuantumHover = useCallback(() => {
    playQuantumSound('hover');
  }, [playQuantumSound]);

  return {
    registerQuantumElement,
    handleQuantumClick,
    handleQuantumHover,
    activeElementsCount: activeElements.size
  };
};