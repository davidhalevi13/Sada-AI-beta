'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Flex, Text } from '@radix-ui/themes';
import { ConnectorIcon, MaterialIcon } from '@/app/components/ui';
import type { Connector } from '../types';

// ========================================
// Props
// ========================================

interface ConnectorCardProps {
  connector: Connector;
  /** 'registry' cards show "+ Setup" button. 'active' cards show instance badge. */
  variant: 'registry' | 'active';
  /** Number of instances with isActive=true. */
  activeInstanceCount?: number;
  /** Number of instances with isActive=false. */
  inactiveInstanceCount?: number;
  /** Fired when "+ Setup" is clicked (registry / first-time setup). */
  onSetup?: (connector: Connector) => void;
  /**
   * Fired when the "+" control is clicked on an active connector card
   * (add another instance — must not reuse an existing instance `_key`).
   */
  onAddInstance?: (connector: Connector) => void;
  /** Fired when the card body is clicked (navigate to type page). */
  onCardClick?: (connector: Connector) => void;
}

// ========================================
// ConnectorCard
// ========================================

export function ConnectorCard({
  connector,
  variant,
  activeInstanceCount = 0,
  inactiveInstanceCount = 0,
  onSetup,
  onAddInstance,
  onCardClick,
}: ConnectorCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Flex
      direction="column"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        // For active connectors, clicking the card body navigates to type page
        if (variant === 'active' && onCardClick) {
          onCardClick(connector);
        }
      }}
      style={{
        width: '100%',
        background: isHovered
          ? 'linear-gradient(135deg, rgba(124, 58, 237, 0.18), rgba(37, 99, 235, 0.12)), var(--sada-surface)'
          : 'var(--sada-surface)',
        border: '1px solid var(--sada-border)',
        borderRadius: 16,
        padding: 14,
        gap: 24,
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
            width: 32,
            height: 32,
            padding: 8,
            background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.22), rgba(37, 99, 235, 0.16))',
            border: '1px solid var(--sada-border)',
            borderRadius: 12,
            flexShrink: 0,
          }}
        >
          <ConnectorIcon type={connector.type} size={16} />
        </Flex>

        {/* Title + description */}
        <Flex direction="column" gap="1" style={{ width: '100%' }}>
          <Text size="2" weight="medium" style={{ color: 'var(--gray-12)' }}>
            {connector.name}
          </Text>
          <Text
            size="2"
            style={{
              color: 'var(--gray-11)',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {connector.appDescription}
          </Text>
        </Flex>
      </Flex>

      {/* ── Bottom action ── */}
      {variant === 'registry' ? (
        <SetupButton onClick={() => onSetup?.(connector)} />
      ) : (
        <ActiveInstanceBar
          activeCount={activeInstanceCount}
          inactiveCount={inactiveInstanceCount}
          onAdd={() => {
            if (onAddInstance) {
              onAddInstance(connector);
            } else {
              onSetup?.(connector);
            }
          }}
          onBadgeClick={() => onCardClick?.(connector)}
        />
      )}
    </Flex>
  );
}

// ========================================
// Sub-components
// ========================================

/** "+ Setup" button for registry / unconfigured connectors. */
function SetupButton({ onClick }: { onClick?: () => void }) {
  const [isHovered, setIsHovered] = useState(false);
  const { t } = useTranslation();

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        appearance: 'none',
        margin: 0,
        font: 'inherit',
        outline: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        width: '100%',
        height: 32,
        borderRadius: 'var(--radius-2)',
        background: isHovered ? 'var(--sada-accent-gradient)' : 'rgba(255, 255, 255, 0.07)',
        border: '1px solid var(--sada-border)',
        boxShadow: isHovered ? 'var(--sada-shadow-glow)' : 'none',
        cursor: 'pointer',
        transition: 'background 150ms ease, box-shadow 150ms ease, border-color 150ms ease',
      }}
    >
      <MaterialIcon name="add" size={16} color="var(--gray-11)" />
      <span
        style={{
          fontSize: 14,
          fontWeight: 500,
          lineHeight: '20px',
          color: 'var(--gray-11)',
        }}
      >
        {t('workspace.actions.cta.setup')}
      </span>
    </button>
  );
}

/** Instance badge bar: shows active (green) and/or inactive (amber) pills + "+" add button. */
function ActiveInstanceBar({
  activeCount,
  inactiveCount,
  onAdd,
  onBadgeClick,
}: {
  activeCount: number;
  inactiveCount: number;
  onAdd?: () => void;
  onBadgeClick?: () => void;
}) {
  const [isAddHovered, setIsAddHovered] = useState(false);
  const { t } = useTranslation();
  const onlyOnePill = (activeCount > 0) !== (inactiveCount > 0);

  const handleBadgeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onBadgeClick?.();
  };

  return (
    <Flex align="center" gap="2" style={{ width: '100%', overflow: 'hidden' }}>
      {/* Scrollable pills container */}
      <Flex
        align="center"
        gap="2"
        className="no-scrollbar"
        style={{ flex: 1, overflowX: 'auto', minWidth: 0 }}
      >
        {/* Active pill */}
        {activeCount > 0 && (
          <Flex
            align="center"
            justify="center"
            onClick={handleBadgeClick}
            style={{
              flex: onlyOnePill ? 1 : undefined,
              flexShrink: onlyOnePill ? undefined : 0,
              height: 28,
              borderRadius: 'var(--radius-2)',
              backgroundColor: 'var(--green-a3)',
              padding: '0 8px',
              cursor: 'pointer',
            }}
          >
            <Text size="1" weight="medium" style={{ color: 'var(--green-a11)', whiteSpace: 'nowrap' }}>
              {activeCount === 1 ? t('workspace.actions.card.activeOne') : t('workspace.actions.card.activeMany', { count: activeCount })}
            </Text>
          </Flex>
        )}

        {/* Inactive pill */}
        {inactiveCount > 0 && (
          <Flex
            align="center"
            justify="center"
            onClick={handleBadgeClick}
            style={{
              flex: onlyOnePill ? 1 : undefined,
              flexShrink: onlyOnePill ? undefined : 0,
              height: 28,
              borderRadius: 'var(--radius-2)',
              backgroundColor: 'var(--amber-a3)',
              padding: '0 8px',
              cursor: 'pointer',
            }}
          >
            <Text size="1" weight="medium" style={{ color: 'var(--amber-a11)', whiteSpace: 'nowrap' }}>
              {inactiveCount === 1 ? t('workspace.actions.card.inactiveOne') : t('workspace.actions.card.inactiveMany', { count: inactiveCount })}
            </Text>
          </Flex>
        )}
      </Flex>

      {/* Add button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onAdd?.();
        }}
        onMouseEnter={() => setIsAddHovered(true)}
        onMouseLeave={() => setIsAddHovered(false)}
        style={{
          appearance: 'none',
          margin: 0,
          padding: 0,
          outline: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 32,
          height: 32,
          borderRadius: 'var(--radius-2)',
          background: isAddHovered ? 'var(--sada-accent-gradient)' : 'rgba(255, 255, 255, 0.07)',
          border: '1px solid var(--sada-border)',
          boxShadow: isAddHovered ? 'var(--sada-shadow-glow)' : 'none',
          cursor: 'pointer',
          flexShrink: 0,
          transition: 'background 150ms ease, box-shadow 150ms ease, border-color 150ms ease',
        }}
      >
        <MaterialIcon name="add" size={16} color="var(--gray-11)" />
      </button>
    </Flex>
  );
}
