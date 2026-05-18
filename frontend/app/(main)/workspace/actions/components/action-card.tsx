'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Flex, Text } from '@radix-ui/themes';
import { MaterialIcon } from '@/app/components/ui/MaterialIcon';
import { ConnectorIcon } from '@/app/components/ui';
import type { ActionCatalogItem } from '../types';

export type ActionCardCta = 'setup' | 'configure' | 'authenticate' | 'unavailable';

interface ActionCardProps {
  item: ActionCatalogItem;
  cta: ActionCardCta;
  ctaLabel: string;
  /** When false, merged-type cards omit the trailing “+” (e.g. personal browse). */
  showQuickAdd?: boolean;
  onCta?: (item: ActionCatalogItem) => void;
  onCardClick?: (item: ActionCatalogItem) => void;
}

export function ActionCard({
  item,
  cta,
  ctaLabel,
  showQuickAdd = true,
  onCta,
  onCardClick,
}: ActionCardProps) {
  const { t } = useTranslation();
  const [isHovered, setIsHovered] = useState(false);

  const isMergedType = item.rowKind === 'byToolsetType';
  const authenticatedCount = isMergedType ? item.instances.filter((i) => i.isAuthenticated).length : 0;
  const needsAuthCount = isMergedType ? item.instances.filter((i) => !i.isAuthenticated).length : 0;
  const showCatalogAuthNeeded =
    isMergedType && item.hasOrgInstance && !item.isUserAuthenticated && needsAuthCount > 0;

  const canClickBody =
    cta !== 'unavailable' &&
    Boolean(onCardClick) &&
    (item.rowKind === 'byInstance' || (isMergedType && item.hasOrgInstance));

  return (
    <Flex
      direction="column"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        if (canClickBody) onCardClick?.(item);
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
        cursor: canClickBody ? 'pointer' : 'default',
        boxShadow: isHovered ? 'var(--sada-shadow-soft), var(--sada-shadow-glow)' : 'var(--sada-shadow-soft)',
        transition: 'background 160ms ease, border-color 160ms ease, box-shadow 160ms ease, transform 160ms ease',
        transform: isHovered ? 'translateY(-1px)' : 'translateY(0)',
      }}
    >
      <Flex direction="column" gap="3" style={{ width: '100%', flex: 1 }}>
        <Flex align="start" justify="between" gap="2" style={{ width: '100%' }}>
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
            {item.toolsetType ? (
              <ConnectorIcon type={item.toolsetType} size={16} />
            ) : (
              <MaterialIcon name="extension" size={16} color="var(--gray-11)" />
            )}
          </Flex>
          {showCatalogAuthNeeded ? (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (item.hasOrgInstance) onCardClick?.(item);
              }}
              style={{
                appearance: 'none',
                margin: 0,
                padding: '2px 8px',
                border: 'none',
                borderRadius: 'var(--radius-2)',
                backgroundColor: 'var(--amber-a3)',
                cursor: item.hasOrgInstance ? 'pointer' : 'default',
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                gap: 4,
              }}
            >
              <MaterialIcon name="vpn_key" size={12} color="var(--amber-11)" />
              <Text size="1" weight="medium" style={{ color: 'var(--amber-11)' }}>
                {t('workspace.actions.card.authNeededBadge')}
              </Text>
            </button>
          ) : null}
        </Flex>

        <Flex direction="column" gap="1" style={{ width: '100%' }}>
          <Text size="2" weight="medium" style={{ color: 'var(--gray-12)' }}>
            {item.title}
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
            {item.description}
          </Text>
        </Flex>
      </Flex>

      {isMergedType && item.hasOrgInstance ? (
        <ToolsetInstanceSummaryBar
          authenticatedCount={authenticatedCount}
          needsAuthCount={needsAuthCount}
          showAdd={showQuickAdd}
          onAdd={(e) => {
            e.stopPropagation();
            onCta?.(item);
          }}
          onBadgeClick={(e) => {
            e.stopPropagation();
            if (item.hasOrgInstance) onCardClick?.(item);
          }}
        />
      ) : (
        <button
          type="button"
          disabled={cta === 'unavailable'}
          onClick={(e) => {
            e.stopPropagation();
            if (cta !== 'unavailable') onCta?.(item);
          }}
          style={{
            appearance: 'none',
            margin: 0,
            width: '100%',
            height: 32,
            borderRadius: 'var(--radius-2)',
            border: '1px solid var(--gray-a6)',
            background: cta === 'unavailable' ? 'rgba(255, 255, 255, 0.05)' : 'var(--sada-accent-gradient)',
            color: cta === 'unavailable' ? 'var(--gray-9)' : 'var(--gray-12)',
            fontSize: 14,
            fontWeight: 500,
            cursor: cta === 'unavailable' ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
            boxShadow: cta === 'unavailable' ? 'none' : 'var(--sada-shadow-glow)',
          }}
        >
          <MaterialIcon name="add" size={16} color="currentColor" />
          {ctaLabel}
        </button>
      )}
    </Flex>
  );
}

function ToolsetInstanceSummaryBar({
  authenticatedCount,
  needsAuthCount,
  showAdd,
  onAdd,
  onBadgeClick,
}: {
  authenticatedCount: number;
  needsAuthCount: number;
  showAdd: boolean;
  onAdd: (e: React.MouseEvent) => void;
  onBadgeClick: (e: React.MouseEvent) => void;
}) {
  const { t } = useTranslation();
  const [isAddHovered, setIsAddHovered] = useState(false);
  const onlyOnePill = (authenticatedCount > 0) !== (needsAuthCount > 0);

  return (
    <Flex align="center" gap="2" style={{ width: '100%', overflow: 'hidden' }}>
      <Flex
        align="center"
        gap="2"
        className="no-scrollbar"
        style={{ flex: 1, overflowX: 'auto', minWidth: 0 }}
      >
        {authenticatedCount > 0 && (
          <Flex
            align="center"
            justify="center"
            onClick={onBadgeClick}
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
              {authenticatedCount === 1
                ? t('workspace.actions.card.activeOne')
                : t('workspace.actions.card.activeMany', { count: authenticatedCount })}
            </Text>
          </Flex>
        )}
        {needsAuthCount > 0 && (
          <Flex
            align="center"
            justify="center"
            onClick={onBadgeClick}
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
              {needsAuthCount === 1
                ? t('workspace.actions.card.inactiveOne')
                : t('workspace.actions.card.inactiveMany', { count: needsAuthCount })}
            </Text>
          </Flex>
        )}
      </Flex>
      {showAdd ? (
        <button
          type="button"
          onClick={onAdd}
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
      ) : null}
    </Flex>
  );
}
