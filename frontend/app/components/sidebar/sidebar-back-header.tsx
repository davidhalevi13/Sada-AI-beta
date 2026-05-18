'use client';

import { Flex, Text } from '@radix-ui/themes';
import { MaterialIcon } from '@/app/components/ui/MaterialIcon';
import { SECTION_HEADER_PADDING } from '@/app/components/sidebar';

interface SidebarBackHeaderProps {
  /** Title displayed next to the back arrow */
  title: string;
  /** Called when the user clicks the back arrow / header */
  onBack: () => void;
  backgroundColor?: string;
}

/**
 * SidebarBackHeader — a fixed-height back-navigation header
 * designed for the SidebarBase `header` slot.
 *
 * Renders a chevron-left icon + title. The full area is clickable.
 */
export function SidebarBackHeader({ title, onBack, backgroundColor }: SidebarBackHeaderProps) {
  return (
    <Flex
      align="center"
      style={{
        height: '100%',
        cursor: 'pointer',
        borderRadius: 'var(--sada-radius-md)',
        padding: SECTION_HEADER_PADDING,
        background: backgroundColor || 'linear-gradient(135deg, rgba(139, 92, 246, 0.12), rgba(47, 123, 255, 0.06))',
        borderBottom: '1px solid var(--sada-border)',
        color: 'var(--sada-text)',
      }}
      onClick={onBack}
    >
      <MaterialIcon name="chevron_left" size={24} color="var(--sada-purple-soft)" />
      <Text size="2" weight="medium" style={{ color: 'var(--sada-text)' }}>
        {title}
      </Text>
    </Flex>
  );
}
