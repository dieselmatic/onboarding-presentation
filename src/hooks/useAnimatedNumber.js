import { useSpring, useMotionValue } from 'framer-motion';
import { useEffect, useState } from 'react';

export function useAnimatedNumber(target, options = {}) {
  const {
    format = 'integer',
    decimals,
    prefix = '',
    suffix = '',
    animate = true,
  } = options;

  const motionValue = useMotionValue(animate ? 0 : target);
  const spring = useSpring(motionValue, {
    stiffness: 80,
    damping: 20,
    mass: 1,
  });

  const [display, setDisplay] = useState(() => formatNumber(animate ? 0 : target, format, decimals, prefix, suffix));

  useEffect(() => {
    motionValue.set(target);
  }, [target, motionValue]);

  useEffect(() => {
    const unsubscribe = spring.on('change', (v) => {
      setDisplay(formatNumber(v, format, decimals, prefix, suffix));
    });
    return unsubscribe;
  }, [spring, format, decimals, prefix, suffix]);

  return display;
}

export function formatNumber(value, format = 'integer', decimals, prefix = '', suffix = '') {
  let formatted;
  switch (format) {
    case 'currency':
      formatted = Math.round(value).toLocaleString('en-US');
      return `$${formatted}`;
    case 'currencyDecimal':
      formatted = value.toFixed(decimals ?? 2);
      return `$${formatted}`;
    case 'percent':
      formatted = Math.round(value).toString();
      return `${formatted}%`;
    case 'multiplier':
      formatted = value.toFixed(decimals ?? 1);
      return `${formatted}x`;
    case 'decimal':
      formatted = value.toFixed(decimals ?? 1);
      return `${prefix}${formatted}${suffix}`;
    case 'integer':
    default:
      formatted = Math.round(value).toLocaleString('en-US');
      return `${prefix}${formatted}${suffix}`;
  }
}
