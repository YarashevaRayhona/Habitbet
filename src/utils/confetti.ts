import confetti from 'canvas-confetti';

export function fireWinConfetti() {
  const count = 200;
  const defaults = {
    origin: { y: 0.7 }
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio)
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
    colors: ['#00E5FF', '#7C3AED', '#22C55E']
  });
  fire(0.2, {
    spread: 60,
    colors: ['#FFD700', '#00E5FF', '#22C55E']
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    colors: ['#7C3AED', '#00E5FF']
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
}

export function fireCashRain() {
  confetti({
    particleCount: 80,
    spread: 80,
    origin: { y: 0.4 },
    colors: ['#22C55E', '#10B981', '#34D399', '#FFD700']
  });
}
