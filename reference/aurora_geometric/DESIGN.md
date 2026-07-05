---
name: Aurora Geometric
colors:
  surface: '#f9f9ff'
  surface-dim: '#d3daea'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f0f3ff'
  surface-container: '#e7eefe'
  surface-container-high: '#e2e8f8'
  surface-container-highest: '#dce2f3'
  on-surface: '#151c27'
  on-surface-variant: '#444656'
  inverse-surface: '#2a313d'
  inverse-on-surface: '#ebf1ff'
  outline: '#747687'
  outline-variant: '#c4c5d9'
  surface-tint: '#2648ee'
  primary: '#183fe6'
  on-primary: '#ffffff'
  primary-container: '#3d5cff'
  on-primary-container: '#f3f2ff'
  inverse-primary: '#bac3ff'
  secondary: '#5e5e64'
  on-secondary: '#ffffff'
  secondary-container: '#e3e1e9'
  on-secondary-container: '#64646a'
  tertiary: '#565755'
  on-tertiary: '#ffffff'
  tertiary-container: '#6f6f6d'
  on-tertiary-container: '#f4f3f0'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dee0ff'
  primary-fixed-dim: '#bac3ff'
  on-primary-fixed: '#000f5c'
  on-primary-fixed-variant: '#002ecb'
  secondary-fixed: '#e3e1e9'
  secondary-fixed-dim: '#c7c6cd'
  on-secondary-fixed: '#1a1b21'
  on-secondary-fixed-variant: '#46464c'
  tertiary-fixed: '#e3e2df'
  tertiary-fixed-dim: '#c7c6c4'
  on-tertiary-fixed: '#1b1c1a'
  on-tertiary-fixed-variant: '#464745'
  background: '#f9f9ff'
  on-background: '#151c27'
  surface-variant: '#dce2f3'
typography:
  headline-xl:
    fontFamily: Space Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: 0.05em
  headline-xl-mobile:
    fontFamily: Space Grotesk
    fontSize: 36px
    fontWeight: '700'
    lineHeight: '1.1'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  section-padding: 80px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
---

## Brand & Style

This design system balances the high-tech, precise aesthetic of developer-centric tools with a warm, editorial approachability. It employs a **Corporate/Modern** foundation augmented by **Aurora** accents—vibrant, blurred gradients that provide a sense of depth and energy against deep backgrounds.

The personality is professional yet innovative, targeting a tech-savvy audience that appreciates clean interfaces with premium visual flourishes. The emotional response is one of reliability, focus, and modern sophistication.

## Colors

The palette is built on a high-contrast relationship between the immersive dark surfaces and the breathable, warm content areas.

- **Primary (Indigo Blue):** Used for actionable elements, primary buttons, and key highlights.
- **Secondary (Dark Navy-Black):** Reserved for high-impact structural components like headers, footers, and hero background treatments.
- **Tertiary (Warm Off-White):** The primary background for detailed content sections, providing a soft, paper-like readability that is easier on the eyes than pure white.
- **Accents (Aurora Mesh):** A blend of indigo, violet, and deep blue gradients used sparingly as background flourishes behind text or images to create a futuristic aura.

## Typography

The typography system pairs a technical, geometric display face with a highly legible, neutral sans-serif for body content. 

**Space Grotesk** is used for all headlines and brand-heavy moments. Its idiosyncratic letterforms provide a "developer-friendly" but modern character. **Inter** handles all long-form reading and UI labels, ensuring clarity and functional utility across all screen sizes.

## Layout & Spacing

This design system uses a **Fluid Grid** model with a maximum container width for desktop. 

- **Desktop (1280px+):** 12-column grid with 24px gutters. Large vertical breathing room (80px - 120px) between major sections.
- **Tablet (768px - 1024px):** 8-column grid with 20px gutters.
- **Mobile (<768px):** 4-column grid with 16px margins. 

Layouts should favor asymmetric balance, often centering headers while allowing content cards to sit in structured grids below. Spacing units follow an 8px base rhythm to maintain mathematical harmony.

## Elevation & Depth

Depth is achieved through a combination of **Tonal Layers** and **Ambient Shadows**.

1. **Surface 0:** The base off-white or dark-navy background.
2. **Surface 1 (Cards):** Pure white (in light mode) or slightly lightened navy (in dark mode).
3. **Shadows:** Elements on Surface 1 use an extra-diffused, low-opacity indigo-tinted shadow (e.g., `box-shadow: 0 10px 30px -10px rgba(61, 92, 255, 0.08)`).
4. **Aurora Accents:** These sit behind Surface 0 or Surface 1 to provide a "glow" that suggests a light source beneath the UI, rather than above it.

## Shapes

The shape language is consistently **Rounded (16px)**. This softens the technical typography and high-contrast colors, making the product feel friendly and tactile.

- **Standard Elements:** 16px (1rem) border radius for buttons, input fields, and small cards.
- **Large Containers:** 24px (1.5rem) or 32px (2rem) for hero sections or primary layout containers.
- **Icons:** Should sit within rounded square containers or use a rounded line style to match the UI radius.

## Components

### Buttons
- **Primary:** Solid Indigo Blue (#3D5CFF) background with white text. 16px radius.
- **Secondary/Ghost:** Thin indigo border with transparent background or a light grey fill for "Back" actions.
- **Interactions:** Subtle scale-down effect (0.98) on click and a slight shadow expansion on hover.

### Cards
Cards are the primary container for content. They feature a white background on the off-white tertiary surface, 16px corner radius, and soft indigo-tinted shadows. Internal padding should be generous (24px or 32px).

### Input Fields
Outlined style with a 1px light grey border that transitions to Indigo Blue on focus. Labels should use the `label-sm` typography level in a medium neutral grey.

### Chips & Tags
Small, rounded-pill shapes with a very light indigo background and indigo text, used for categories or status indicators.

### Navigation
The header should be "sticky" with a backdrop blur effect when scrolling over content sections, maintaining the dark navy-black identity even when the page transitions to the warm off-white content areas.