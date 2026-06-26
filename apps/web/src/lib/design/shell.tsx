'use client';

import { ReactNode, useState } from 'react';
import { colors, spacing, typography, touchTarget, shadow, shape } from './tokens';

// ---------------------------------------------------------------------------
// ShellLayout — responsive PWA shell
// - Mobile:   bottom navigation + content
// - Tablet:   side navigation + content
// - Desktop:  broader side navigation + content
// ---------------------------------------------------------------------------

interface ShellLayoutProps {
  children: ReactNode;
  topBar?: ReactNode;
  bottomNav?: ReactNode;    // mobile bottom nav
  sideNav?: ReactNode;      // tablet/desktop side nav
  activeBreakpoint?: 'mobile' | 'tablet' | 'desktop';
}

export function ShellLayout({
  children,
  topBar,
  bottomNav,
  sideNav,
}: ShellLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100dvh',
        background: colors.bgSecondary,
        fontFamily: typography.fontFamily,
        color: colors.text,
      }}
    >
      {/* Top bar — always visible */}
      {topBar && (
        <header
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 50,
            background: colors.surface,
            borderBottom: `1px solid ${colors.border}`,
            padding: `${spacing[2]} ${spacing[4]}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            minHeight: touchTarget.min,
            /* safe-area inset for notched devices */
            paddingTop: 'env(safe-area-inset-top, 0px)',
          }}
        >
          {/* Mobile hamburger */}
          <button
            aria-label="Toggle navigation"
            className="sidebar-toggle-desktop"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: spacing[2],
              fontSize: '1.5rem',
              display: 'none', // visible at tablet+ via media query
            }}
          >
            ☰
          </button>
          {topBar}
        </header>
      )}

      {/* Body */}
      <div style={{ display: 'flex', flex: 1 }}>
        {/* Sidebar — for tablet/desktop, overlaid on mobile */}
        {sideNav && (
          <>
            {/* Overlay for mobile sidebar */}
            {sidebarOpen && (
              <div
                role="presentation"
                onClick={() => setSidebarOpen(false)}
                style={{
                  position: 'fixed',
                  inset: 0,
                  zIndex: 40,
                  background: 'rgba(0,0,0,0.3)',
                }}
              />
            )}
            <nav
              aria-label="Main navigation"
              className="sidebar"
              style={{
                position: 'fixed',
                top: 0,
                left: sidebarOpen ? 0 : '-100%',
                zIndex: 50,
                width: '280px',
                height: '100dvh',
                overflowY: 'auto',
                background: colors.surface,
                borderRight: `1px solid ${colors.border}`,
                paddingTop: 'env(safe-area-inset-top, 0px)',
                paddingBottom: 'env(safe-area-inset-bottom, 0px)',
                transition: 'left 200ms ease-in-out',
                boxShadow: shadow.lg,
              }}
            >
              {sideNav}
            </nav>
          </>
        )}

        {/* Main content */}
        <main
          role="main"
          className="main-content"
          style={{
            flex: 1,
            padding: spacing[4],
            paddingBottom: bottomNav ? 'calc(5rem + env(safe-area-inset-bottom, 0px))' : spacing[4],
            maxWidth: '960px',
            width: '100%',
            margin: '0 auto',
          }}
        >
          {children}
        </main>
      </div>

      {/* Bottom navigation — mobile only */}
      {bottomNav && (
        <nav
          aria-label="Bottom navigation"
          className="bottom-nav"
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 50,
            background: colors.surface,
            borderTop: `1px solid ${colors.border}`,
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            /* safe-area bottom for notched devices */
            paddingBottom: 'env(safe-area-inset-bottom, 0px)',
          }}
        >
          {bottomNav}
        </nav>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// NavItem — individual navigation item for bottom/side nav
// ---------------------------------------------------------------------------

interface NavItemProps {
  icon: string;
  label: string;
  active?: boolean;
  onClick?: () => void;
  badge?: string | number;
}

export function NavItem({ icon, label, active, onClick, badge }: NavItemProps) {
  return (
    <button
      aria-current={active ? 'page' : undefined}
      onClick={onClick}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: spacing[1],
        padding: `${spacing[1]} ${spacing[3]}`,
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: active ? colors.primary : colors.textTertiary,
        fontWeight: active ? typography.semibold : typography.normal,
        fontSize: typography.xs,
        fontFamily: typography.fontFamily,
        minWidth: touchTarget.min,
        minHeight: touchTarget.min,
        position: 'relative',
      }}
    >
      <span aria-hidden="true" style={{ fontSize: '1.5rem' }}>{icon}</span>
      {label}
      {badge !== undefined && (
        <span
          aria-label={`${badge} notifications`}
          style={{
            position: 'absolute',
            top: spacing[1],
            right: spacing[1],
            background: colors.danger,
            color: colors.textInverse,
            fontSize: '0.625rem',
            fontWeight: typography.bold,
            borderRadius: shape.full,
            padding: '0.125rem 0.375rem',
            lineHeight: 1.2,
          }}
        >
          {badge}
        </span>
      )}
    </button>
  );
}

// ---------------------------------------------------------------------------
// SOS Button — visually separated, always reachable
// ---------------------------------------------------------------------------

interface SOSButtonProps {
  onClick?: () => void;
}

export function SOSButton({ onClick }: SOSButtonProps) {
  return (
    <button
      aria-label="SOS — ขอความช่วยเหลือ"
      onClick={onClick}
      style={{
        width: '56px',
        height: '56px',
        borderRadius: '50%',
        background: colors.danger,
        color: colors.textInverse,
        border: '3px solid #ffffff',
        boxShadow: '0 2px 8px rgba(220,38,38,0.4)',
        cursor: 'pointer',
        fontSize: '1.25rem',
        fontWeight: typography.bold,
        fontFamily: typography.fontFamily,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        lineHeight: 1,
      }}
    >
      SOS
    </button>
  );
}
