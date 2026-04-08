/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

declare module '*.css'

declare module '*.mdx' {
  import type { ComponentType } from 'react'
  export const frontmatter: Record<string, unknown>
  const Component: ComponentType
  export default Component
}
