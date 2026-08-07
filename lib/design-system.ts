/**
 * FloorQuote Design System
 * 
 * Premium SaaS design tokens for the calculator experience.
 * Inspired by Stripe, Linear, Vercel, and Apple design philosophies.
 */

// ---------------------------------------------------------------------------
// Color Palette
// ---------------------------------------------------------------------------

export const colors = {
  // Backgrounds
  background: {
    primary: "#F8FAFC",
    card: "#FFFFFF",
    elevated: "#FFFFFF",
    glass: "rgba(255, 255, 255, 0.85)",
  },
  
  // Text
  text: {
    primary: "#0F172A",
    secondary: "#475569",
    muted: "#94A3B8",
    inverse: "#FFFFFF",
  },
  
  // Borders
  border: {
    default: "#E2E8F0",
    focus: "#2563EB",
    hover: "#CBD5E1",
    inactive: "#E2E8F0",
    subtle: "#F1F5F9",
  },
  
  // Accent Colors
  accent: {
    blue: "#2563EB",
    darkBlue: "#1D4ED8",
    lightBlue: "#3B82F6",
    teal: "#0F766E",
    purple: "#7C3AED",
    indigo: "#6366F1",
  },
  
  // Status Colors
  status: {
    success: "#10B981",
    warning: "#F59E0B",
    error: "#EF4444",
    info: "#3B82F6",
  },
  
  // Progress
  progress: {
    active: "#2563EB",
    inactive: "#E2E8F0",
  },
  
  // Gradients
  gradients: {
    primary: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    blue: "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
    teal: "linear-gradient(135deg, #14B8A6 0%, #0F766E 100%)",
    purple: "linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)",
    success: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
    background: "linear-gradient(135deg, #F8FAFC 0%, #EEF2FF 100%)",
  },
  
  // Surface Colors
  surface: {
    hover: "#F1F5F9",
    active: "#E2E8F0",
    selected: "#EFF6FF",
  },
} as const;

// ---------------------------------------------------------------------------
// Typography
// ---------------------------------------------------------------------------

export const typography = {
  fontFamily: {
    sans: "var(--font-inter)",
  },
  
  fontSize: {
    xs: "0.75rem",    // 12px
    sm: "0.875rem",   // 14px
    base: "1rem",     // 16px
    lg: "1.125rem",   // 18px
    xl: "1.25rem",    // 20px
    "2xl": "1.5rem",  // 24px
    "3xl": "1.875rem", // 30px
    "4xl": "2.25rem", // 36px
    "5xl": "3rem",    // 48px
  },
  
  fontWeight: {
    medium: "500",
    semibold: "600",
    bold: "700",
  },
  
  lineHeight: {
    tight: "1.25",
    normal: "1.5",
    relaxed: "1.75",
  },
} as const;

// ---------------------------------------------------------------------------
// Spacing
// ---------------------------------------------------------------------------

export const spacing = {
  xs: "0.5rem",    // 8px
  sm: "0.75rem",   // 12px
  md: "1rem",      // 16px
  lg: "1.5rem",    // 24px
  xl: "2rem",      // 32px
  "2xl": "3rem",   // 48px
  "3xl": "4rem",   // 64px
} as const;

// ---------------------------------------------------------------------------
// Border Radius
// ---------------------------------------------------------------------------

export const borderRadius = {
  sm: "0.5rem",    // 8px
  md: "0.75rem",   // 12px
  lg: "1rem",      // 16px
  xl: "1.5rem",    // 24px
  "2xl": "2rem",   // 32px
} as const;

// ---------------------------------------------------------------------------
// Shadows
// ---------------------------------------------------------------------------

export const shadows = {
  sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
  xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
  "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
  glow: "0 0 0 3px rgb(37 99 235 / 0.1)",
  glowBlue: "0 0 20px rgb(59 130 246 / 0.3)",
  glowTeal: "0 0 20px rgb(20 184 166 / 0.3)",
  inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
} as const;

// ---------------------------------------------------------------------------
// Transitions
// ---------------------------------------------------------------------------

export const transitions = {
  fast: "150ms ease-in-out",
  normal: "250ms ease-in-out",
  slow: "350ms ease-in-out",
} as const;

// ---------------------------------------------------------------------------
// Animation Variants (Framer Motion)
// ---------------------------------------------------------------------------

export const animations = {
  // Page transitions
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  },
  
  slideIn: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  },
  
  // Card animations
  cardEnter: {
    initial: { opacity: 0, y: 10, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: { duration: 0.25, ease: "easeOut" },
  },
  
  // Button animations
  buttonHover: {
    scale: 1.02,
    transition: { duration: 0.15 },
  },
  
  buttonTap: {
    scale: 0.98,
    transition: { duration: 0.1 },
  },
  
  // Progress bar
  progress: {
    transition: { duration: 0.5, ease: "easeInOut" },
  },
  
  // Stagger children
  staggerContainer: {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  },
} as const;

// ---------------------------------------------------------------------------
// Z-Index Scale
// ---------------------------------------------------------------------------

export const zIndex = {
  base: 0,
  dropdown: 10,
  sticky: 20,
  modal: 30,
  tooltip: 40,
} as const;

// ---------------------------------------------------------------------------
// Breakpoints
// ---------------------------------------------------------------------------

export const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const;
