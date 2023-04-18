import { arrOfNodesProps } from "@/arrOfNodes";
import { Node } from '@/components/Node'

export interface TreeOfNodesProps {
  data: arrOfNodesProps[]
}

export const TreeOfNodes = ({ data }: TreeOfNodesProps) => {
  const getRootNode = data.filter(node => node.parentName === null)

  return (
    <ul>
      {getRootNode.map(node => <Node key={node.nodeName} test={node} className={"border-none"} />)}
    </ul>
  )
}