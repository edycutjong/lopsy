import '@testing-library/jest-dom'
import { vi } from 'vitest'

vi.mock('next/font/google', () => ({
  Inter: () => ({
    style: { fontFamily: 'Inter' },
    className: 'inter-mock',
    variable: '--font-inter',
  }),
  JetBrains_Mono: () => ({
    style: { fontFamily: 'JetBrains Mono' },
    className: 'jetbrains-mono-mock',
    variable: '--font-jetbrains-mono',
  }),
}))
