/**
 * Mo-nut Design System — Tokens
 *
 * Brand tokens for typography, color, spacing, shape, and animation.
 */

export const colors = {
  // Primary: teal/blue-green — trust, calm, professional
  primary: '#0d9488',
  primaryLight: '#14b8a6',
  primaryDark: '#0f766e',
  primaryBg: '#f0fdfa',

  // Accent: warm amber — reminders, attention
  accent: '#f59e0b',
  accentLight: '#fbbf24',
  accentBg: '#fffbeb',

  // Danger: red — reserved for SOS and high-risk only
  danger: '#dc2626',
  dangerLight: '#fca5a5',
  dangerBg: '#fef2f2',

  // Neutrals
  bg: '#ffffff',
  bgSecondary: '#f8fafc',
  surface: '#ffffff',
  border: '#e2e8f0',
  borderLight: '#f1f5f9',
  text: '#0f172a',
  textSecondary: '#475569',
  textTertiary: '#94a3b8',
  textInverse: '#ffffff',

  // Status — never color-only, use accompanying icons/text
  success: '#16a34a',
  successBg: '#f0fdf4',
  warning: '#d97706',
  warningBg: '#fffbeb',
  error: '#dc2626',
  errorBg: '#fef2f2',
  info: '#2563eb',
  infoBg: '#eff6ff',
} as const;

export const spacing = {
  0: '0',
  1: '0.25rem',  //  4px
  2: '0.5rem',   //  8px
  3: '0.75rem',  // 12px
  4: '1rem',     // 16px
  5: '1.25rem',  // 20px
  6: '1.5rem',   // 24px
  8: '2rem',     // 32px
  10: '2.5rem',  // 40px
  12: '3rem',    // 48px
  16: '4rem',    // 64px
  20: '5rem',    // 80px
} as const;

export const typography = {
  fontFamily: '"Sarabun", "Noto Sans Thai", system-ui, -apple-system, sans-serif',
  fontFamilyMono: '"JetBrains Mono", "Noto Sans Thai", monospace',

  // Scale
  xs: '0.75rem',    // 12px
  sm: '0.875rem',   // 14px
  base: '1rem',     // 16px
  lg: '1.125rem',   // 18px
  xl: '1.25rem',    // 20px
  '2xl': '1.5rem',  // 24px
  '3xl': '1.875rem',// 30px

  // Weights
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,

  // Line heights
  leadingTight: 1.25,
  leadingNormal: 1.5,
  leadingRelaxed: 1.75,
} as const;

export const shape = {
  none: '0',
  sm: '0.25rem',   //  4px
  md: '0.5rem',    //  8px
  lg: '0.75rem',   // 12px
  xl: '1rem',      // 16px
  full: '9999px',
} as const;

export const shadow = {
  sm: '0 1px 2px 0 rgba(0,0,0,0.05)',
  md: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)',
  lg: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)',
} as const;

export const animation = {
  fast: '150ms',
  normal: '200ms',
  slow: '300ms',
  easing: 'ease-in-out',
} as const;

// Touch target minimum 44×44 CSS px (WCAG 2.2)
export const touchTarget = {
  min: '44px',
} as const;

export type ColorToken = keyof typeof colors;
export type SpacingToken = keyof typeof spacing;
export type TypographyToken = keyof typeof typography;
