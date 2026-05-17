'use client';

import { Flex, IconButton } from '@radix-ui/themes';
import { MaterialIcon } from '@/app/components/ui/MaterialIcon';
import { ELEMENT_HEIGHT, ICON_SIZE_DEFAULT } from '@/app/components/sidebar';

interface ChatSectionHeaderProps {
  title: string;
  onAdd?: () => void;
  /** `aria-label` for the add button (required for a11y when `onAdd` is set). */
  addAriaLabel?: string;
  /** Called when the title is clicked (opens "More Chats") */
  onTitleClick?: () => void;
}

/**
 * Section header for a chat group ("Shared Chats", "Your Chats").
 * Shares the same label styling as TimeGroup sub-headings,
 * with an optional "+" action button on the right.
 */
export function ChatSectionHeader({ title, onAdd, addAriaLabel, onTitleClick }: ChatSectionHeaderProps) {
  return (
    <Flex
      align="center"
      justify="between"
      style={{
        height: ELEMENT_HEIGHT,
        padding: '0 var(--space-3)',
        marginTop: 'var(--space-1)',
      }}
    >
      <span
        onClick={onTitleClick}
        style={{
          fontSize: 11,
          fontWeight: 700,
          lineHeight: 'var(--line-height-1)',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--slate-10)',
          cursor: onTitleClick ? 'pointer' : 'default',
        }}
      >
        {title}
      </span>
      {onAdd && (
        <IconButton
          variant="ghost"
          size="1"
          color="gray"
          onClick={onAdd}
          aria-label={addAriaLabel ?? 'Add'}
          style={{
            margin: 0,
            borderRadius: '999px',
            background: 'rgba(139, 92, 246, 0.08)',
          }}
        >
          <MaterialIcon name="add" size={ICON_SIZE_DEFAULT} color="var(--accent-11)" />
        </IconButton>
      )}
    </Flex>
  );
}
