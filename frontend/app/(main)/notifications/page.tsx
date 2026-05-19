'use client';

import { Flex, Text, Heading } from '@radix-ui/themes';
import { MaterialIcon } from '@/app/components/ui/MaterialIcon';

export default function NotificationsPage() {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      style={{
        height: '100%',
        width: '100%',
        background: 'var(--sada-page-gradient)',
        color: 'var(--sada-text)',
      }}
    >
      <Flex
        align="center"
        justify="center"
        style={{
          width: 76,
          height: 76,
          borderRadius: 24,
          background: 'var(--sada-accent-gradient)',
          boxShadow: 'var(--sada-shadow-glow)',
        }}
      >
        <MaterialIcon name="notifications" size={38} color="white" />
      </Flex>
      <Heading size="6" style={{ marginTop: '18px', color: 'var(--sada-text)' }}>
        Notifications
      </Heading>
      <Text size="2" style={{ marginTop: '8px', color: 'var(--sada-text-muted)' }}>
        Coming soon
      </Text>
    </Flex>
  );
}
