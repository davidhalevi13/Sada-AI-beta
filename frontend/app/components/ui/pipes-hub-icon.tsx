'use client';

import React from 'react';

interface SadaAIIconProps {
  size?: number;
  color?: string;
  style?: React.CSSProperties;
  className?: string;
}

export function SadaAIIcon({
  size = 80,
  style,
  className,
}: SadaAIIconProps) {
  return (
    <img
      src="/logo/sada-ai-logo-3D.png"
      alt=""
      aria-hidden="true"
      width={size}
      height={size}
      style={{
        width: size,
        height: size,
        objectFit: 'contain',
        display: 'inline-flex',
        flexShrink: 0,
        ...style,
      }}
      className={className}
    />
  );
}
