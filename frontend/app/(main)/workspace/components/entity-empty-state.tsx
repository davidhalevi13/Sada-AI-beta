'use client';

import React from 'react';
import { Flex, Heading, Text, Button } from '@radix-ui/themes';
import { MaterialIcon } from '@/app/components/ui/MaterialIcon';

export interface EntityEmptyStateProps {
  /** Material icon name shown at the top */
  icon: string;
  /** Empty state title */
  title: string;
  /** Empty state description */
  description: string;
  /** CTA button label */
  ctaLabel: string;
  /** CTA button Material icon name */
  ctaIcon: string;
  /** Callback when CTA is clicked */
  onCtaClick: () => void;
}

/**
 * EntityEmptyState — centered empty state for Groups & Teams pages.
 *
 * Shown when no entities exist. Displays icon, title, description, and CTA.
 */
export function EntityEmptyState({
  icon,
  title,
  description,
  ctaLabel,
  ctaIcon,
  onCtaClick,
}: EntityEmptyStateProps) {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      gap="4"
      style={{
        flex: 1,
        minHeight: '400px',
        padding: 'var(--space-6)',
        color: 'var(--sada-text)',
      }}
    >
      <Flex
        align="center"
        justify="center"
        style={{
          width: '64px',
          height: '64px',
          borderRadius: '22px',
          background: 'var(--sada-gradient-soft)',
          border: '1px solid var(--sada-border)',
          boxShadow: '0 16px 36px rgba(0, 0, 0, 0.22)',
        }}
      >
        <MaterialIcon name={icon} size={28} color="var(--sada-purple-soft)" />
      </Flex>

      <Flex direction="column" align="center" gap="2" style={{ maxWidth: '420px', textAlign: 'center' }}>
        <Heading size="3" weight="medium" style={{ color: 'var(--sada-text)' }}>
          {title}
        </Heading>
        <Text size="2" style={{ color: 'var(--sada-text-muted)' }}>
          {description}
        </Text>
      </Flex>

      <Button size="2" onClick={onCtaClick} style={{ marginTop: 'var(--space-2)' }}>
        <MaterialIcon name={ctaIcon} size={16} color="currentColor" />
        {ctaLabel}
      </Button>
    </Flex>
  );
}
