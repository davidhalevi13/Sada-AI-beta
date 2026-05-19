'use client';

import { useState } from 'react';
import { Flex } from '@radix-ui/themes';
import { MaterialIcon } from '@/app/components/ui/MaterialIcon';
import { ELEMENT_HEIGHT, ICON_SIZE_DEFAULT } from '@/app/components/sidebar';

interface CollapsibleSectionProps {
  /** Icon name for the section header (Google Material Icon) */
  icon: string;
  /** Label for the collapsible header */
  label: string;
  /** Whether the section is expanded */
  isExpanded: boolean;
  /** Toggle expand/collapse */
  onToggle: () => void;
  /** Whether any child is currently active (highlights the header) */
  hasActiveChild?: boolean;
  /** Child items to render when expanded */
  children: React.ReactNode;
}

/**
 * Collapsible sidebar section — used for the "People" dropdown.
 *
 * Header row: icon + label + expand_more chevron.
 * Matches SidebarItem hover treatment (olive-3 bg, olive-4 border).
 * Children rendered below when expanded.
 */
export function CollapsibleSection({
  icon,
  label,
  isExpanded,
  onToggle,
  hasActiveChild = false,
  children,
}: CollapsibleSectionProps) {
  const [isHovered, setIsHovered] = useState(false);
  const highlighted = isHovered || (hasActiveChild && !isExpanded);

  return (
    <Flex direction="column" style={{ width: '100%' }}>
      {/* Collapsible header */}
      <button
        type="button"
        onClick={onToggle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          // Reset native button defaults
          appearance: 'none',
          margin: 0,
          font: 'inherit',
          color: 'inherit',
          outline: 'none',
          textDecoration: 'none',
          // Layout
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-2)',
          width: '100%',
          height: ELEMENT_HEIGHT,
          padding: '0 12px',
          boxSizing: 'border-box',
          flexShrink: 0,
          // Visual
          borderRadius: 'var(--sada-radius-md)',
          background: highlighted
            ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.16), rgba(47, 123, 255, 0.08))'
            : 'transparent',
          border: highlighted ? '1px solid var(--sada-border)' : '1px solid transparent',
          boxShadow: highlighted ? '0 10px 22px rgba(0, 0, 0, 0.16)' : 'none',
          cursor: 'pointer',
          transition: 'background 150ms ease, border-color 150ms ease, box-shadow 150ms ease',
        }}
      >
        <MaterialIcon name={icon} size={ICON_SIZE_DEFAULT} color="var(--sada-purple-soft)" />
        <span
          style={{
            flex: 1,
            fontSize: 14,
            fontWeight: 400,
            lineHeight: '20px',
            color: hasActiveChild ? 'var(--sada-text)' : 'var(--sada-text-muted)',
            textAlign: 'left',
          }}
        >
          {label}
        </span>
        <MaterialIcon
          name="expand_more"
          size={ICON_SIZE_DEFAULT}
          color="var(--sada-purple-soft)"
          style={{
            transition: 'transform 150ms ease',
            transform: isExpanded ? 'rotate(0deg)' : 'rotate(-90deg)',
          }}
        />
      </button>

      {/* Children (sub-items) */}
      {isExpanded && children}
    </Flex>
  );
}
