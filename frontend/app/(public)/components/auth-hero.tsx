'use client';

import React from 'react';
import Image from 'next/image';
import { Box, Flex, Text } from '@radix-ui/themes';

// ─── Connector icons (order matches Figma layout, left to right) ─────────────

const CONNECTORS = [
  { src: '/login-page-assets/featured-connectors/hubspot.svg', name: 'HubSpot' },
  { src: '/login-page-assets/featured-connectors/zendesk.svg', name: 'Zendesk' },
  { src: '/login-page-assets/featured-connectors/teams.svg', name: 'Teams' },
  { src: '/login-page-assets/featured-connectors/sharepoint.svg', name: 'SharePoint' },
  { src: '/login-page-assets/featured-connectors/outlook.svg', name: 'Outlook' },
  { src: '/login-page-assets/featured-connectors/dropbox.svg', name: 'Dropbox' },
];

// ─── Vector line positions from Figma (node 5005:4513) ────────────────────────
// Each vector connects the search pill center to a connector icon below.
// `left` positions the CENTER of each vector (used with translateX(-50%)).
// scaleY(-1) flips the SVG vertically so the curves arc downward from the pill.
// Vectors are ordered left-to-right matching the connector icon row.

const VECTORS: { file: string; left: string; width: number }[] = [
  { file: 'vector_6.svg', left: 'calc(50% - 97px)', width: 202 },
  { file: 'vector_5.svg', left: 'calc(50% - 58px)', width: 122 },
  { file: 'vector_4.svg', left: 'calc(50% - 17px)', width: 41 },
  { file: 'vector_3.svg', left: 'calc(50% + 23.5px)', width: 41 },
  { file: 'vector_2.svg', left: 'calc(50% + 64px)', width: 121 },
  { file: 'vector_1.svg', left: 'calc(50% + 104px)', width: 202 },
];

// ─── Component ────────────────────────────────────────────────────────────────

export interface AuthHeroProps {
  /** When false, the hero is hidden (narrow / stacked auth shell). */
  splitLayout: boolean;
}

/**
 * AuthHero — the dark branded left panel used on all public auth pages.
 * Mirrors the Figma "Login Frame" (node 5005:4512) at 826×1024 reference size.
 */
export default function AuthHero({ splitLayout }: AuthHeroProps) {
  if (!splitLayout) return null;

  return (
    <Box
      style={{
        position: 'relative',
        flex: '0 0 57%',
        height: '100vh',
        overflow: 'hidden',
        background:
          'linear-gradient(180deg, #050711 0%, #0a0e1f 54%, #050711 100%)',
      }}
    >
      {/* ── Background image ─────────────────────────────────────── */}
      <img
        src="/login-page-assets/bg/login-page.png"
        alt=""
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          pointerEvents: 'none',
        }}
      />

      {/* ── Dark overlay (80% opacity per Figma) ─────────────────── */}
      <Box
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(145deg, rgba(139, 92, 246, 0.2), transparent 36%), linear-gradient(215deg, rgba(47, 123, 255, 0.18), transparent 42%), rgba(0, 0, 0, 0.26)',
          pointerEvents: 'none',
        }}
      />

      {/* ── Title text — top left ────────────────────────────────── */}
      <Text
        style={{
          position: 'absolute',
          left: '32px',
          top: '27px',
          color: '#ffffff',
          fontSize: '25.6px',
          fontWeight: 400,
          lineHeight: 'normal',
          width: '346px',
          textTransform: 'uppercase',
          letterSpacing: '0.02em',
          zIndex: 1,
          fontFamily: 'ClashGrotesk, sans-serif',
        }}
      >
        Explainable Enterprise Search for modern enterprises.
      </Text>

      {/* ── Search pill ──────────────────────────────────────────── */}
      <Box
        style={{
          position: 'absolute',
          left: '50%',
          top: '42.3%',
          transform: 'translateX(-50%)',
          width: '559px',
          height: '74px',
          backgroundColor: 'rgba(31, 31, 31, 0.8)',
          backdropFilter: 'blur(5px)',
          WebkitBackdropFilter: 'blur(5px)',
          border: '1px solid rgba(196, 181, 253, 0.52)',
          borderRadius: '9999px',
          boxShadow:
            '0px 25px 33px -8px rgba(0,0,0,0.9), 0 0 34px rgba(139, 92, 246, 0.22), 0px 0px 0px 1px rgba(255,255,255,0.14)',
          overflow: 'hidden',
          zIndex: 2,
        }}
      >
        <Flex
          align="center"
          style={{
            height: '100%',
            padding: '0 24px',
            gap: '14px',
          }}
        >
          {/* Sada AI logo mark */}
          <Image
            src="/logo/sada-ai-logo-3D.png"
            alt=""
            width={33}
            height={33}
            style={{ flexShrink: 0, opacity: 0.9, objectFit: 'contain', borderRadius: '6px' }}
          />

          {/* Search text */}
          <Text
            style={{
              color: 'white',
              fontSize: '19px',
              fontWeight: 400,
              textTransform: 'uppercase',
              letterSpacing: '0.03em',
              whiteSpace: 'nowrap',
            }}
          >
            Search across all of your business apps
          </Text>
        </Flex>
      </Box>

      {/* ── Vector connection lines ──────────────────────────────── */}
      {VECTORS.map((v, i) => (
        <img
          key={i}
          src={`/login-page-assets/vectors/${v.file}`}
          alt=""
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: v.left,
            top: 'calc(42.3% + 37px)',
            width: `${v.width}px`,
            height: '136px',
            transform: 'translateX(-50%)',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />
      ))}

      {/* ── Connector icon row ───────────────────────────────────── */}
      <Flex
        align="center"
        style={{
          position: 'absolute',
          left: '50%',
          top: 'calc(52% + 37px)',
          transform: 'translateX(-50%)',
          gap: '25px',
          zIndex: 2,
        }}
      >
        {CONNECTORS.map((c) => (
          <Flex
            key={c.name}
            align="center"
            justify="center"
            style={{
              width: '54px',
              height: '54px',
              borderRadius: '50%',
              backgroundColor: 'rgba(31, 31, 31, 0.8)',
              backdropFilter: 'blur(4px)',
              WebkitBackdropFilter: 'blur(4px)',
              border: '0.82px solid rgba(196, 181, 253, 0.52)',
              boxShadow:
                '0px 20px 26px -7px rgba(0,0,0,0.9), 0px 7px 13px -3px rgba(0,0,0,0.04), 0px 1px 1px 0px rgba(0,0,0,0.02), 0px 0px 0px 1px rgba(255,255,255,0.14)',
              flexShrink: 0,
            }}
          >
            <Image src={c.src} alt={c.name} width={20} height={20} />
          </Flex>
        ))}
      </Flex>

      {/* ── Sada AI wordmark — bottom right ─────────────────────── */}
      <Box
        style={{
          position: 'absolute',
          bottom: '32px',
          right: '32px',
          zIndex: 1,
        }}
      >
        <Flex align="center" gap="2">
          <Image
            src="/logo/sada-ai-logo-3D.png"
            alt=""
            width={45}
            height={45}
            style={{ objectFit: 'contain', borderRadius: '8px', flexShrink: 0 }}
          />
          <Text
            style={{
              color: 'white',
              fontFamily: 'ClashGrotesk, sans-serif',
              fontSize: '30px',
              fontWeight: 500,
              lineHeight: '45px',
              letterSpacing: '0.02em',
              opacity: 0.95,
            }}
          >
            Sada AI
          </Text>
        </Flex>
      </Box>
    </Box>
  );
}
