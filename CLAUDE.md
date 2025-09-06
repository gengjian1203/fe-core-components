# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Development & Building

- `pnpm dev` - Start Storybook development server (port 6006)
- `pnpm build` - Build the component library for distribution
- `pnpm build:watch` - Build in watch mode during development
- `pnpm build-storybook` - Build Storybook for production

### Testing & Quality

- `pnpm lint` - Run ESLint and fix issues automatically
- `pnpm lint:check` - Run ESLint without fixing issues
- `pnpm typecheck` - Run TypeScript compiler checks without emitting files
- `pnpm format` - Format code with Prettier
- `pnpm format:check` - Check code formatting without changes

### Bundle Analysis

- `pnpm analyze` - Analyze bundle size (max 50kb ESM, 55kb CJS)

## Project Architecture

### Component Structure

The project follows a **modified Atomic Design** methodology with two main categories:

- `src/components/Base/` - Foundation components that extend Ant Design (CXButton)
- `src/components/Case/` - Complex composed components (CXCard)

Each component follows this structure:

```
ComponentName/
├── ComponentName.tsx       # Main component
├── ComponentName.stories.tsx # Storybook stories
└── index.ts               # Exports
```

### Path Aliases

The project uses TypeScript path mapping:

- `@/*` → `src/*`
- `@/components/*` → `src/components/*`
- `@/hooks/*` → `src/hooks/*`
- `@/utils/*` → `src/utils/*`
- `@/types/*` → `src/types/*`
- `@/styles/*` → `src/styles/*`

### Build System

- **Rollup** with multiple output formats:
  - ESM (`dist/esm/index.js`) - Modern bundlers with tree shaking
  - CJS (`dist/cjs/index.js`) - Node.js compatibility
  - UMD (`dist/umd/index.js`) - Browser usage
- **TypeScript declarations** generated in `dist/types/`
- **CSS extraction** to `dist/styles.css`

### Component Library Strategy

This is an **Ant Design wrapper library**:
- Uses Ant Design 5.x as the base UI framework
- Components extend/wrap Ant Design components with custom props and styling
- Requires `@ant-design/v5-patch-for-react-19` for React 19 compatibility
- Custom utility function `cn()` for className merging (similar to clsx)

### Styling System

- **Tailwind CSS** with custom design tokens
- **CSS Variables** for theming support (`--color-primary-500`, etc.)
- **Dark mode** support via `dark` class
- Custom animations and shadows defined in tailwind.config.js
- Component base styles provided via Tailwind plugins

### Type Safety

- **Strict TypeScript** configuration with all strict flags enabled
- **Explicit return types** required for functions (`@typescript-eslint/explicit-function-return-type`)
- **Consistent naming conventions** enforced via ESLint
- **No implicit any** allowed

### Quality Standards

- **ESLint** with TypeScript, React, accessibility, and Storybook rules
- **Prettier** for code formatting
- **Husky + lint-staged** for pre-commit hooks
- **Conventional commits** with commitizen

## Development Workflow

### Adding New Components

1. Create component folder in appropriate category (Base/Case)
2. Implement component extending Ant Design base component
3. Create Storybook stories with controls and documentation
4. Export component in respective index files
5. Update main exports in `src/components/index.ts`

### Theme Customization

Components use CSS variables for theming. Define custom themes by overriding CSS variables:

```css
:root {
  --color-primary-500: 34 197 94;
  --color-primary-600: 22 163 74;
}
```

### Accessibility Requirements

- All components must support keyboard navigation
- Proper ARIA labels and roles required
- Color contrast must meet WCAG 2.1 AA standards
- Focus management implemented consistently

### Bundle Size Constraints

- ESM build must not exceed 50kb
- CJS build must not exceed 55kb
- Use bundlesize tool to monitor and enforce limits

## Key Dependencies

- **React 19** - Latest React features
- **Ant Design 5.x** - Base component library
- **@ant-design/icons** - Icon system
- **Tailwind CSS** - Utility-first CSS framework
- **Storybook 9.x** - Component development and documentation
- **TypeScript 5.x** - Type system
- **Rollup** - Module bundler
- **ESLint 9.x** - Linting with flat config format

## Storybook Configuration

- Uses Vite as the build tool
- Includes accessibility addon (`@storybook/addon-a11y`)
- Includes interaction testing addon
- Path aliases configured for proper imports
- TypeScript docgen for automatic prop documentation