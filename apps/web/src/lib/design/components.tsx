'use client';

import { colors, spacing, shape, typography, touchTarget, animation, shadow } from './tokens';
import type { ReactNode, ButtonHTMLAttributes } from 'react';

// ---------------------------------------------------------------------------
// Button primitives
// ---------------------------------------------------------------------------

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

const btnBase: React.CSSProperties = {
  fontFamily: typography.fontFamily,
  fontWeight: typography.semibold,
  border: 'none',
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: spacing[2],
  borderRadius: shape.md,
  transition: `background ${animation.fast}, opacity ${animation.fast}`,
  minHeight: touchTarget.min,
};

export function Button({
  variant = 'primary', size = 'md', style, children, ...rest
}: ButtonProps) {
  const variantStyles: Record<string, React.CSSProperties> = {
    primary: { background: colors.primary, color: colors.textInverse },
    secondary: { background: colors.bgSecondary, color: colors.text, border: `1px solid ${colors.border}` },
    ghost: { background: 'transparent', color: colors.textSecondary },
    danger: { background: colors.danger, color: colors.textInverse },
  };

  const sizeStyles: Record<string, React.CSSProperties> = {
    sm: { padding: `${spacing[1]} ${spacing[3]}`, fontSize: typography.sm },
    md: { padding: `${spacing[2]} ${spacing[4]}`, fontSize: typography.base },
    lg: { padding: `${spacing[3]} ${spacing[6]}`, fontSize: typography.lg },
  };

  return (
    <button
      style={{ ...btnBase, ...variantStyles[variant], ...sizeStyles[size], ...style }}
      {...rest}
    >
      {children}
    </button>
  );
}

// ---------------------------------------------------------------------------
// Card
// ---------------------------------------------------------------------------

interface CardProps {
  children: ReactNode;
  padding?: string;
  style?: React.CSSProperties;
  as?: 'div' | 'article' | 'section';
  onClick?: () => void;
}

export function Card({ children, padding = spacing[4], style, as: Tag = 'div', onClick }: CardProps) {
  return (
    <Tag
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={onClick ? (e) => { if (e.key === 'Enter' || e.key === ' ') onClick(); } : undefined}
      style={{
        background: colors.surface,
        border: `1px solid ${colors.border}`,
        borderRadius: shape.lg,
        padding,
        boxShadow: shadow.sm,
        cursor: onClick ? 'pointer' : undefined,
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}

// ---------------------------------------------------------------------------
// StatusBadge — never color-only; includes text label
// ---------------------------------------------------------------------------

type StatusLevel = 'success' | 'warning' | 'error' | 'info' | 'neutral';

interface StatusBadgeProps {
  status: StatusLevel;
  label: string;
  icon?: string;
}

export function StatusBadge({ status, label, icon }: StatusBadgeProps) {
  const statusColors: Record<StatusLevel, { bg: string; fg: string }> = {
    success: { bg: colors.successBg, fg: colors.success },
    warning: { bg: colors.warningBg, fg: colors.warning },
    error: { bg: colors.errorBg, fg: colors.error },
    info: { bg: colors.infoBg, fg: colors.info },
    neutral: { bg: colors.bgSecondary, fg: colors.textSecondary },
  };

  const { bg, fg } = statusColors[status];

  return (
    <span
      role="status"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: spacing[1],
        padding: `${spacing[1]} ${spacing[2]}`,
        borderRadius: shape.full,
        background: bg,
        color: fg,
        fontSize: typography.sm,
        fontWeight: typography.medium,
        lineHeight: 1,
      }}
    >
      {icon && <span aria-hidden="true">{icon}</span>}
      {label}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Form primitives
// ---------------------------------------------------------------------------

interface FormFieldProps {
  label: string;
  error?: string;
  children: ReactNode;
  required?: boolean;
}

export function FormField({ label, error, children, required }: FormFieldProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[1] }}>
      <label style={{ fontSize: typography.sm, fontWeight: typography.medium, color: colors.text }}>
        {label}
        {required && <span aria-hidden="true" style={{ color: colors.danger }}> *</span>}
      </label>
      {children}
      {error && <p role="alert" style={{ fontSize: typography.xs, color: colors.error, margin: 0 }}>{error}</p>}
    </div>
  );
}

interface InputProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  error?: boolean;
  [key: string]: unknown;
}

export function Input({ value, onChange, placeholder, type = 'text', error, ...rest }: InputProps) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      aria-invalid={error ? 'true' : undefined}
      style={{
        width: '100%',
        padding: spacing[3],
        fontSize: typography.base,
        fontFamily: typography.fontFamily,
        border: `1px solid ${error ? colors.danger : colors.border}`,
        borderRadius: shape.md,
        background: colors.surface,
        color: colors.text,
        outline: 'none',
        minHeight: touchTarget.min,
        boxSizing: 'border-box',
      }}
      {...rest}
    />
  );
}

// ---------------------------------------------------------------------------
// Loading / Skeleton
// ---------------------------------------------------------------------------

export function Skeleton({ width = '100%', height = '1rem' }: { width?: string; height?: string }) {
  return (
    <div
      aria-hidden="true"
      style={{
        width,
        height,
        borderRadius: shape.sm,
        background: `linear-gradient(90deg, ${colors.borderLight} 25%, ${colors.border} 50%, ${colors.borderLight} 75%)`,
        backgroundSize: '200% 100%',
        animation: `shimmer 1.5s ease-in-out infinite`,
      }}
    />
  );
}

// ---------------------------------------------------------------------------
// Empty state
// ---------------------------------------------------------------------------

interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}

export function EmptyState({ icon = '📭', title, description, action }: EmptyStateProps) {
  return (
    <div
      role="status"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: spacing[2],
        padding: spacing[12],
        textAlign: 'center',
      }}
    >
      <span aria-hidden="true" style={{ fontSize: '2rem' }}>{icon}</span>
      <p style={{ fontWeight: typography.semibold, margin: 0 }}>{title}</p>
      {description && <p style={{ color: colors.textSecondary, margin: 0, fontSize: typography.sm }}>{description}</p>}
      {action}
    </div>
  );
}
