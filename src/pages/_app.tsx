import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { NodeProvider } from '@/contexts/NodeContext'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NodeProvider>
      <Component {...pageProps} />
    </NodeProvider>
  )
}
