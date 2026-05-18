'use client';

import { Flex } from '@radix-ui/themes';
import { ELEMENT_HEIGHT } from '@/app/components/sidebar';

interface SectionHeaderProps {
  /** Section label (e.g., "Overview", "Workspace", "Personal") */
  title: string;
}

/**
 * Section header label — matches ChatSectionHeader styling.
 *
 * 12px font, neutral-11 color, 0.04px letter spacing.
 * Rendered inside a 32px-tall row with left padding.
 */
export function SectionHeader({ title }: SectionHeaderProps) {
  return (
    <Flex
      align="center"
      style={{
        height: ELEMENT_HEIGHT,
        padding: '0 12px',
      }}
    >
      <span
        style={{
          fontSize: 12,
          fontWeight: 700,
          lineHeight: '16px',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--sada-text-subtle)',
        }}
      >
        {title}
      </span>
    </Flex>
  );
}
