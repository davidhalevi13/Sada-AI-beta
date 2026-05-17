'use client';

import { Box, Flex, IconButton, Text } from '@radix-ui/themes';
import Link from 'next/link';
import { HEADER_ELEMENT_SIZE } from '@/app/components/sidebar';
import { UserAvatar } from '@/app/components/ui/user-avatar';
import { useUserStore } from '@/lib/store/user-store';
import { useIsMobile } from '@/lib/hooks/use-is-mobile';
import { toast } from '@/lib/store/toast-store';
import { PipesHubIcon } from '@/app/components/ui';

/**
 * Sidebar header — logo and user avatar.
 * Avatar resolves to the user's profile picture if set, otherwise shows initials.
 *
 * On mobile, tapping the avatar shows a "coming soon" toast instead of
 * navigating — the profile page is not yet adapted for mobile.
 */
export function ChatSidebarHeader() {
  const profile = useUserStore((s) => s.profile);
  const isMobile = useIsMobile();

  const avatar = (
    <UserAvatar
      fullName={profile?.fullName}
      firstName={profile?.firstName}
      lastName={profile?.lastName}
      email={profile?.email}
      src={profile?.avatarUrl}
      size={HEADER_ELEMENT_SIZE}
      radius="small"
    />
  );

  return (
    <Flex
      align="center"
      justify="between"
      gap="2"
      style={{
        height: '100%',
        padding: '10px var(--space-3)',
      }}
    >
      <Flex align="center" gap="2" style={{ minWidth: 0 }}>
        <Box
          style={{
            width: 34,
            height: 34,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 12,
            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.28), rgba(37, 99, 235, 0.16))',
            border: '1px solid rgba(196, 181, 253, 0.2)',
            boxShadow: '0 12px 28px rgba(0, 0, 0, 0.22)',
          }}
        >
          <PipesHubIcon size={HEADER_ELEMENT_SIZE} color="var(--accent-11)" />
        </Box>
        <Text
          size="2"
          weight="bold"
          style={{
            color: 'var(--slate-12)',
            letterSpacing: 0,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          PipesHub
        </Text>
      </Flex>
      {isMobile ? (
        // Use a real <button> via Radix IconButton so keyboard (Enter/Space)
        // and assistive tech can activate the toast — `<Box role="button">`
        // alone does not handle keyboard activation.
        <IconButton
          variant="ghost"
          color="gray"
          aria-label="Open profile"
          onClick={() => {
            toast.info('Coming soon', {
              description: 'Profile page on mobile is coming soon.',
            });
          }}
          style={{ margin: 0, padding: 0, lineHeight: 0, cursor: 'pointer', borderRadius: 12 }}
        >
          {avatar}
        </IconButton>
      ) : (
        <Link
          href="/workspace/profile/"
          aria-label="Open profile"
          style={{
            textDecoration: 'none',
            lineHeight: 0,
            borderRadius: 12,
            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.22)',
          }}
        >
          {avatar}
        </Link>
      )}
    </Flex>
  );
}
