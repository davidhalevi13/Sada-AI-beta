'use client';

import { useMemo } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { Flex } from '@radix-ui/themes';
import { ChatStarIcon } from '@/app/components/ui/chat-star-icon';
import { MaterialIcon } from '@/app/components/ui/MaterialIcon';
import { KBD_BADGE_PADDING, ICON_SIZE_DEFAULT } from '@/app/components/sidebar';
import { useCommandStore } from '@/lib/store/command-store';
import { useTranslation } from 'react-i18next';
import { getModifierSymbol } from '@/lib/utils/platform';
import { useIsMobile } from '@/lib/hooks/use-is-mobile';
import { useMobileSidebarStore } from '@/lib/store/mobile-sidebar-store';
import { SidebarItem } from './sidebar-item';

// ========================================
// Navigation item config
// ========================================

interface NavItem {
  icon: string;
  labelKey: string;
  route: string;
}

/** Primary navigation items — labels resolved via i18n */
const MAIN_NAV_ITEMS: NavItem[] = [
  // { icon: 'search', labelKey: 'nav.searchChats', route: '/search' },
  { icon: 'folder', labelKey: 'nav.collections', route: '/knowledge-base/' },
  { icon: 'inventory_2', labelKey: 'nav.allRecords', route: '/knowledge-base/?view=all-records' },
];

// ========================================
// Components
// ========================================

/** Keyboard shortcut badge */
const KbdBadge = ({ children }: { children: React.ReactNode }) => (
  <span
    style={{
      background: 'rgba(148, 163, 225, 0.09)',
      border: '1px solid rgba(196, 181, 253, 0.2)',
      padding: KBD_BADGE_PADDING,
      borderRadius: 999,
      fontSize: 11,
      lineHeight: 'var(--line-height-1)',
      letterSpacing: 0,
      color: 'var(--slate-11)',
      fontWeight: 600,
    }}
  >
    {children}
  </span>
);

/**
 * Static navigation section — "New Chat" button, Search, Collections, etc.
 */
export function StaticNavSection() {
  const dispatch = useCommandStore((s) => s.dispatch);
  const { t } = useTranslation();
  const modKey = useMemo(() => getModifierSymbol(), []);
  const isMobile = useIsMobile();
  const closeMobileSidebar = useMobileSidebarStore((s) => s.close);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleNewChat = () => {
    if (isMobile) closeMobileSidebar();
    dispatch('newChat');
  };

  const handleNavClick = () => {
    if (isMobile) closeMobileSidebar();
  };

  return (
    <Flex direction="column" gap="2">
      {/* New Chat */}
      <SidebarItem
        icon={
          <ChatStarIcon
            size={ICON_SIZE_DEFAULT}
            color="var(--accent-a11)"
          />
        }
        label={t('chat.newChat')}
        onClick={handleNewChat}
        textColor="var(--slate-12)"
        fontWeight={700}
        rightSlot={<KbdBadge>{modKey} +N</KbdBadge>}
        forceHighlight
      />

      <SidebarSearchButton />

      <SidebarItem
        icon={<MaterialIcon name="chat_bubble" size={ICON_SIZE_DEFAULT} />}
        label={t('chat.backToChatHome', { defaultValue: 'All chats' })}
        href="/chat/"
        isActive={pathname.startsWith('/chat') && !searchParams?.get('agentId')}
        onClick={handleNavClick}
      />

      {!isMobile &&
        MAIN_NAV_ITEMS.map((item) => (
          <SidebarItem
            key={item.route}
            icon={<MaterialIcon name={item.icon} size={ICON_SIZE_DEFAULT} />}
            label={t(item.labelKey)}
            href={item.route}
            isActive={
              item.route.includes('all-records')
                ? pathname.startsWith('/knowledge-base') && searchParams?.get('view') === 'all-records'
                : pathname.startsWith('/knowledge-base') && searchParams?.get('view') !== 'all-records'
            }
          />
        ))}
    </Flex>
  );
}

export function SidebarSearchButton() {
  const dispatch = useCommandStore((s) => s.dispatch);
  const { t } = useTranslation();
  const modKey = useMemo(() => getModifierSymbol(), []);
  const isMobile = useIsMobile();
  const closeMobileSidebar = useMobileSidebarStore((s) => s.close);

  const handleOpenSearch = () => {
    if (isMobile) closeMobileSidebar();
    dispatch('openCommandPalette');
  };

  return (
    <SidebarItem
      icon={<MaterialIcon name="search" size={ICON_SIZE_DEFAULT} />}
      label={t('nav.searchChats')}
      onClick={handleOpenSearch}
      rightSlot={<KbdBadge>{modKey} +K</KbdBadge>}
    />
  );
}
