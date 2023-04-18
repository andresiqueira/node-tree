import { useContext } from 'react'
import { TreeOfNodes } from '@/components/TreeOfNodes'
import { NodeProvider, NodeContext, NodeContextProps } from '@/contexts/NodeContext'

export default function Home() {
  const { data, } = useContext<NodeContextProps>(NodeContext)

  return (
    <NodeProvider>
      <main className="bg-white text-black flex min-h-screen flex-col items-center justify-between p-24">
        <TreeOfNodes data={data} />
      </main>
    </NodeProvider>
  )
}
