import type { CSSProperties } from 'react';

const MODEL_ROW_CARD_STATIC: CSSProperties = {
  width: '100%',
  minWidth: 0,
  minHeight: 88,
  padding: '16px 20px',
  border: '1px solid var(--sada-border)',
  borderRadius: 16,
  boxShadow: 'var(--sada-shadow-soft)',
  transition: 'background 160ms ease, border-color 160ms ease, box-shadow 160ms ease, transform 160ms ease',
  boxSizing: 'border-box',
};

export function modelRowCardStyle(hover: boolean): CSSProperties {
  return {
    ...MODEL_ROW_CARD_STATIC,
    background: hover
      ? 'linear-gradient(135deg, rgba(124, 58, 237, 0.18), rgba(37, 99, 235, 0.12)), var(--sada-surface)'
      : 'var(--sada-surface)',
    boxShadow: hover ? 'var(--sada-shadow-soft), var(--sada-shadow-glow)' : 'var(--sada-shadow-soft)',
    transform: hover ? 'translateY(-1px)' : 'translateY(0)',
  };
}

export const MODEL_ROW_ICON_CONTAINER_STYLE: CSSProperties = {
  width: 44,
  height: 44,
  padding: 6,
  background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.22), rgba(37, 99, 235, 0.16))',
  border: '1px solid var(--sada-border)',
  borderRadius: 14,
  flexShrink: 0,
};
