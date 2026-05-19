'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Flex, Text } from '@radix-ui/themes';
import { MaterialIcon } from '@/app/components/ui/MaterialIcon';
import type { BotType } from '../types';

// ========================================
// Icon mapping
// ========================================

const BOT_ICON_MAP: Record<BotType, string> = {
  slack: '/icons/connectors/slack.svg',
  discord: '/icons/connectors/discord.svg',
  telegram: '/icons/connectors/telegram.svg',
  github: '/icons/connectors/github.svg',
};

// ========================================
// Props
// ========================================

interface BotCardProps {
  name: string;
  botType: BotType;
  agentName?: string;
  onManage: () => void;
}

// ========================================
// BotCard
// ========================================

export function BotCard({ name, botType, agentName, onManage }: BotCardProps) {
  const { t } = useTranslation();
  const [isHovered, setIsHovered] = useState(false);
  const [iconError, setIconError] = useState(false);

  const iconSrc = BOT_ICON_MAP[botType];

  const BOT_TYPE_LABEL: Record<BotType, string> = {
    slack: t('workspace.bots.types.slack'),
    discord: t('workspace.bots.types.discord'),
    telegram: t('workspace.bots.types.telegram'),
    github: t('workspace.bots.types.github'),
  };

  return (
    <Flex
      direction="column"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        width: '100%',
        background: isHovered
          ? 'linear-gradient(135deg, rgba(124, 58, 237, 0.18), rgba(37, 99, 235, 0.12)), var(--sada-surface)'
          : 'var(--sada-surface)',
        border: '1px solid var(--sada-border)',
        borderRadius: 16,
        padding: 'var(--space-3)',
        gap: 'var(--space-6)',
        cursor: 'pointer',
        boxShadow: isHovered ? 'var(--sada-shadow-soft), var(--sada-shadow-glow)' : 'var(--sada-shadow-soft)',
        transition: 'background 160ms ease, border-color 160ms ease, box-shadow 160ms ease, transform 160ms ease',
        transform: isHovered ? 'translateY(-1px)' : 'translateY(0)',
      }}
    >
      {/* ── Top section: icon + text ── */}
      <Flex direction="column" gap="3" style={{ width: '100%', flex: 1 }}>
        {/* Icon container */}
        <Flex
          align="center"
          justify="center"
          style={{
            width: 'var(--space-8)',
            height: 'var(--space-8)',
            padding: 'var(--space-2)',
            background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.22), rgba(37, 99, 235, 0.16))',
            border: '1px solid var(--sada-border)',
            borderRadius: 12,
            flexShrink: 0,
          }}
        >
          {iconError ? (
            <MaterialIcon name="smart_toy" size={16} color="var(--gray-9)" />
          ) : (
            <img
              src={iconSrc}
              alt={BOT_TYPE_LABEL[botType]}
              width={16}
              height={16}
              onError={() => setIconError(true)}
              style={{ display: 'block', objectFit: 'contain' }}
            />
          )}
        </Flex>

        {/* Name + type + agent */}
        <Flex direction="column" gap="1" style={{ width: '100%' }}>
          <Text size="2" weight="medium" style={{ color: 'var(--gray-12)' }}>
            {name}
          </Text>
          <Text size="2" style={{ color: 'var(--gray-11)' }}>
            {BOT_TYPE_LABEL[botType]}
          </Text>
          <Text
            size="1"
            style={{
              color: 'var(--gray-10)',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {agentName || t('workspace.bots.defaultAssistant')}
          </Text>
        </Flex>
      </Flex>

      {/* ── Bottom action: Manage button ── */}
      <ManageButton onClick={onManage} />
    </Flex>
  );
}

// ========================================
// Sub-components
// ========================================

function ManageButton({ onClick }: { onClick: () => void }) {
  const { t } = useTranslation();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        appearance: 'none',
        margin: 0,
        font: 'inherit',
        outline: 'none',
        border: '1px solid var(--accent-a6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'var(--space-2)',
        width: '100%',
        height: 'var(--space-6)',
        borderRadius: 'var(--radius-2)',
        background: isHovered ? 'var(--sada-accent-gradient)' : 'rgba(124, 58, 237, 0.14)',
        boxShadow: isHovered ? 'var(--sada-shadow-glow)' : 'none',
        cursor: 'pointer',
        transition: 'background 150ms ease, box-shadow 150ms ease, border-color 150ms ease',
      }}
    >
      <MaterialIcon name="settings" size={16} color="var(--accent-11)" />
      <span
        style={{
          fontSize: 14,
          fontWeight: 500,
          lineHeight: '20px',
          color: 'var(--accent-11)',
        }}
      >
        {t('workspace.actions.cta.manage')}
      </span>
    </button>
  );
}
