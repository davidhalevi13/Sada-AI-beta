'use client';

import React from 'react';
import { Flex, Box, Text } from '@radix-ui/themes';

export interface SettingsSectionProps {
  title?: string;
  description?: string;
  rightAction?: React.ReactNode;
  children: React.ReactNode;
}

export function SettingsSection({ title, description, rightAction, children }: SettingsSectionProps) {
  return (
    <Flex
      direction="column"
      gap="4"
      style={{
        border: '1px solid var(--sada-border)',
        borderRadius: 'var(--sada-radius-lg)',
        padding: 'var(--space-4)',
        backdropFilter: 'blur(25px)',
        background:
          'linear-gradient(180deg, rgba(18, 24, 48, 0.82), rgba(8, 11, 24, 0.72))',
        boxShadow: 'var(--sada-shadow-soft)',
      }}
    >
      {/* Section header — only rendered when title is provided */}
      {title && (
        <>
          <Flex align="center" justify="between">
            <Flex direction="column" gap="1">
              <Text size="3" weight="medium" style={{ color: 'var(--sada-text)' }}>
                {title}
              </Text>
              {description && (
                <Text size="1" style={{ color: 'var(--sada-text-muted)', fontWeight: 300, lineHeight: '16px' }}>
                  {description}
                </Text>
              )}
            </Flex>
            {rightAction}
          </Flex>
          {/* Divider */}
          <Box style={{ height: 1, background: 'linear-gradient(90deg, transparent, var(--sada-border), transparent)', width: '100%' }} />
        </>
      )}
      {/* Content rows with gap */}
      <Flex direction="column" gap="5">
        {children}
      </Flex>
    </Flex>
  );
}
