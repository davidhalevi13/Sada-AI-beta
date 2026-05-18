'use client';

import { useState } from 'react';
import { Flex, IconButton } from '@radix-ui/themes';
import { MaterialIcon } from '@/app/components/ui/MaterialIcon';
import { CHAT_ITEM_HEIGHT, ELEMENT_HEIGHT, ICON_SIZE_DEFAULT } from '@/app/components/sidebar';

interface ChatSectionHeaderProps {
  title: string;
  onAdd?: () => void;
  /** `aria-label` for the add button (required for a11y when `onAdd` is set). */
  addAriaLabel?: string;
  /** Called when the title is clicked (opens "More Chats") */
  onTitleClick?: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  collapseAriaLabel?: string;
  controlsId?: string;
}

/**
 * Section header for a chat group ("Shared Chats", "Your Chats").
 * Shares the same label styling as TimeGroup sub-headings,
 * with an optional "+" action button on the right.
 */
export function ChatSectionHeader({
  title,
  onAdd,
  addAriaLabel,
  onTitleClick,
  isCollapsed = false,
  onToggleCollapse,
  collapseAriaLabel,
  controlsId,
}: ChatSectionHeaderProps) {
  const [isHovered, setIsHovered] = useState(false);
  const isCollapsible = Boolean(onToggleCollapse);
  const rootIsClickable = isCollapsible || Boolean(onTitleClick);
  const handleHeaderClick = isCollapsible ? onToggleCollapse : onTitleClick;
  const collapsedHoverBackground =
    'linear-gradient(135deg, rgba(139, 92, 246, 0.14), rgba(47, 123, 255, 0.08))';

  return (
    <Flex
      align="center"
      justify="between"
      onClick={handleHeaderClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        height: isCollapsed ? CHAT_ITEM_HEIGHT : ELEMENT_HEIGHT,
        padding: isCollapsed ? '5px 8px' : '0 8px',
        marginTop: isCollapsed ? 0 : 'var(--space-2)',
        borderRadius: isCollapsed ? 'var(--chat-sidebar-item-radius, 18px)' : 0,
        border: isCollapsed && isHovered
          ? '1px solid var(--chat-sidebar-item-border-hover, rgba(196, 181, 253, 0.28))'
          : '1px solid transparent',
        background: isCollapsed && isHovered ? collapsedHoverBackground : 'transparent',
        boxShadow: isCollapsed && isHovered
          ? 'var(--chat-sidebar-item-shadow-hover, 0 12px 24px rgba(0, 0, 0, 0.22))'
          : 'none',
        cursor: rootIsClickable ? 'pointer' : 'default',
        transition: 'background 150ms ease, border-color 150ms ease, box-shadow 150ms ease',
      }}
    >
      <Flex align="center" gap="1" style={{ minWidth: 0, flex: 1 }}>
        {isCollapsible ? (
          <IconButton
            type="button"
            variant="ghost"
            size="1"
            color="gray"
            onClick={(event) => {
              event.stopPropagation();
              onToggleCollapse?.();
            }}
            aria-label={collapseAriaLabel ?? title}
            aria-expanded={!isCollapsed}
            aria-controls={controlsId}
            style={{
              width: isCollapsed ? 28 : 24,
              height: isCollapsed ? 28 : 24,
              minWidth: isCollapsed ? 28 : 24,
              margin: 0,
              borderRadius: isCollapsed ? 12 : 999,
              background: isCollapsed ? 'rgba(148, 163, 225, 0.06)' : 'transparent',
              border: isCollapsed ? '1px solid rgba(196, 181, 253, 0.1)' : 'none',
              color: 'rgba(202, 211, 255, 0.82)',
            }}
          >
            <MaterialIcon
              name={isCollapsed ? 'chevron_right' : 'keyboard_arrow_down'}
              size={ICON_SIZE_DEFAULT}
              color="currentColor"
            />
          </IconButton>
        ) : null}
        <span
          style={{
            minWidth: 0,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            fontSize: 11,
            fontWeight: 700,
            lineHeight: 'var(--line-height-1)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'rgba(202, 211, 255, 0.74)',
            cursor: rootIsClickable ? 'pointer' : 'default',
          }}
        >
          {title}
        </span>
      </Flex>
      {onAdd && (
        <IconButton
          variant="ghost"
          size="1"
          color="gray"
          onClick={(event) => {
            event.stopPropagation();
            onAdd();
          }}
          aria-label={addAriaLabel ?? 'Add'}
          style={{
            margin: 0,
            borderRadius: '999px',
            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.18), rgba(47, 123, 255, 0.1))',
            border: '1px solid rgba(196, 181, 253, 0.16)',
            boxShadow: '0 8px 18px rgba(0, 0, 0, 0.18)',
          }}
        >
          <MaterialIcon name="add" size={ICON_SIZE_DEFAULT} color="var(--accent-11)" />
        </IconButton>
      )}
    </Flex>
  );
}
