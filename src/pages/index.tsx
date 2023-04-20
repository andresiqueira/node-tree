import { useContext, useEffect } from 'react'
import { TreeOfNodes } from '@/components/TreeOfNodes'
import { NodeContext, NodeContextProps } from '@/contexts/NodeContext'

export default function Home() {
  const { data, } = useContext<NodeContextProps>(NodeContext)

  return (
    <main className="bg-gray-200 text-black flex w-full min-h-screen flex-col items-center justify-between p-24">
      <TreeOfNodes data={data} />
      <span className='inline-block w-2/3 text-gray-600 px-12'>
        <h3 className='text-2xl bold my-4'>Array</h3>
        {JSON.stringify(data)}
      </span>
    </main>
  )
}
