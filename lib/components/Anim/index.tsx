import React, { useMemo } from 'react';
import { twMerge } from 'tailwind-merge';
import { Easing, motion } from 'framer-motion';

type Direction = 'up' | 'down' | 'left' | 'right';
type FadeType = 'in' | 'out';

const DEFAULT_DURATION_MS = 250;
const DIRECTION_OFFSET = 16;

const directionOffset: Record<Direction, { x?: number; y?: number }> = {
  up: { y: DIRECTION_OFFSET },
  down: { y: -DIRECTION_OFFSET },
  left: { x: DIRECTION_OFFSET },
  right: { x: -DIRECTION_OFFSET },
};

interface AnimProps {
  /** 'in' (기본값) 또는 'out' */
  type?: FadeType;
  /** 애니메이션 방향 */
  direction?: Direction;
  /** 애니메이션 지속 시간 (ms) */
  duration?: number;
  /** 애니메이션 지연 시간 (ms) */
  delay?: number;
  className?: string;
  children: React.ReactNode;
}

/**
 * # Anim.Fade
 * ---
 * - 방향(상/하/좌/우) + opacity 페이드 인/아웃 애니메이션 wrapper.
 * - `type="in"`: 지정 방향에서 진입 (opacity 0→1, offset→0).
 * - `type="out"`: 지정 방향으로 퇴장 (opacity 1→0, 0→-offset).
 * - fade-in easing: `easeOut`, fade-out easing: `easeIn`.
 * ---
 * @param type - `'in'` (기본값) 또는 `'out'`
 * @param direction - 진입/퇴장 방향 (`'up' | 'down' | 'left' | 'right'`, 기본값: `'up'`)
 * @param duration - 애니메이션 지속 시간(ms) (기본값: `250`)
 * @param delay - 애니메이션 시작 지연 시간(ms) (기본값: `0`)
 * @param className - motion.div에 추가할 className (기본: `w-full`)
 * @param children - 렌더링할 자식 요소
 * ---
 * @example
 * <Anim.Fade direction="up" duration={400}>
 *   <SomeComponent />
 * </Anim.Fade>
 *
 * <Anim.Fade type="out" direction="down" duration={200}>
 *   <SomeComponent />
 * </Anim.Fade>
 */
function Fade({
  type = 'in',
  direction = 'up',
  duration = DEFAULT_DURATION_MS,
  delay = 0,
  className,
  children,
}: AnimProps) {
  const initial = useMemo(
    () =>
      type === 'in'
        ? { opacity: 0, ...directionOffset[direction] }
        : { opacity: 1, x: 0, y: 0 },
    [type, direction],
  );

  const animate = useMemo(
    () =>
      type === 'out'
        ? {
            opacity: 0,
            ...{
              x: -(directionOffset[direction].x ?? 0),
              y: -(directionOffset[direction].y ?? 0),
            },
          }
        : { opacity: 1, x: 0, y: 0 },
    [type, direction],
  );

  const transition = useMemo(
    () => ({
      duration: duration / 1000,
      delay: delay / 1000,
      ease: (type === 'out' ? 'easeIn' : 'easeOut') as Easing,
    }),
    [duration, delay, type],
  );

  return (
    <motion.div
      className={twMerge('w-full', className)}
      initial={initial}
      animate={animate}
      transition={transition}
    >
      {children}
    </motion.div>
  );
}

/**
 * # Anim.ScaleFade
 * ---
 * - scale(0.85↔1) + opacity 페이드 인/아웃 애니메이션 wrapper.
 * - `type="in"`: scale 0.85→1, opacity 0→1.
 * - `type="out"`: scale 1→0.85, opacity 1→0.
 * - fade-in easing: `easeOut`, fade-out easing: `easeIn`.
 * - 방향 없이 중앙 기준 scale 애니메이션이 필요할 때 사용한다.
 * ---
 * @param type - `'in'` (기본값) 또는 `'out'`
 * @param duration - 애니메이션 지속 시간(ms) (기본값: `250`)
 * @param delay - 애니메이션 시작 지연 시간(ms) (기본값: `0`)
 * @param className - motion.div에 추가할 className (기본: `w-fit`)
 * @param children - 렌더링할 자식 요소
 * ---
 * @example
 * <Anim.ScaleFade>
 *   <SomeComponent />
 * </Anim.ScaleFade>
 *
 * <Anim.ScaleFade type="out" duration={200}>
 *   <SomeComponent />
 * </Anim.ScaleFade>
 */
function ScaleFade({
  type = 'in',
  duration = DEFAULT_DURATION_MS,
  delay = 0,
  className,
  children,
}: Omit<AnimProps, 'direction'>) {
  const initial = useMemo(
    () => (type === 'in' ? { opacity: 0, scale: 0.85 } : { opacity: 1, scale: 1 }),
    [type],
  );

  const animate = useMemo(
    () => (type === 'out' ? { opacity: 0, scale: 0.85 } : { opacity: 1, scale: 1 }),
    [type],
  );

  const transition = useMemo(
    () => ({
      duration: duration / 1000,
      delay: delay / 1000,
      ease: (type === 'out' ? 'easeIn' : 'easeOut') as Easing,
    }),
    [duration, delay, type],
  );

  return (
    <motion.div
      className={twMerge('w-fit', className)}
      initial={initial}
      animate={animate}
      transition={transition}
    >
      {children}
    </motion.div>
  );
}

/**
 * # Anim UI
 * ---
 * - 간단설명: framer-motion 기반 애니메이션 래퍼 컴포넌트 (Compound Component 패턴)
 * - `Anim.Fade`: 방향 + opacity 페이드 인/아웃
 * - `Anim.ScaleFade`: scale + opacity 페이드 인/아웃
 */
const Anim = { Fade, ScaleFade };

export default Anim;
