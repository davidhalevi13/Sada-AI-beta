'use client';

import { Flex, Box } from '@radix-ui/themes';
import { useIsMobile } from '@/lib/hooks/use-is-mobile';
import {
  SIDEBAR_WIDTH,
  HEADER_HEIGHT,
  CONTENT_PADDING,
} from './constants';
import type { SecondaryPanelProps } from './types';

/**
 * SecondaryPanel — a secondary sidebar panel that opens to the right
 * of the primary sidebar. Used for overflow lists ("More Chats", etc.).
 *
 * Has the same width as the primary sidebar, its own header slot, and
 * a scrollable content area. No footer slot — secondary panels are
 * for browsing/searching, not persistent UI.
 *
 * On mobile, renders full-width to fill the parent full-screen container
 * provided by SidebarBase. Background matches the primary mobile sidebar.
 *
 * Reusable across Chat, KB, and other sidebars.
 */
export function SecondaryPanel({ header, children }: SecondaryPanelProps) {
  const isMobile = useIsMobile();

  return (
    <Flex
      direction="column"
      style={{
        width: isMobile ? '100%' : `${SIDEBAR_WIDTH}px`,
        height: '100%',
        background: 'linear-gradient(180deg, rgba(13, 18, 38, 0.98), rgba(5, 7, 17, 0.98))',
        ...(isMobile ? {} : { borderRight: '1px solid var(--sada-border)' }),
        boxShadow: '18px 0 54px rgba(0, 0, 0, 0.28)',
        backdropFilter: 'blur(22px)',
        flexShrink: 0,
        fontFamily: 'Manrope, sans-serif',
      }}
    >
      {/* Header — fixed height */}
      <Box
        style={{
          height: `${HEADER_HEIGHT}px`,
          flexShrink: 0,
          background: 'rgba(8, 11, 24, 0.74)',
          borderBottom: '1px solid var(--sada-border)',
        }}
      >
        {header}
      </Box>

      {/* Scrollable content area */}
      <Box
        className="no-scrollbar"
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: CONTENT_PADDING,
          background: 'transparent',
        }}
      >
        {children}
      </Box>
    </Flex>
  );
}
