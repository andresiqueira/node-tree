import { arrOfNodes, arrOfNodesProps } from "@/arrOfNodes"
import { useState, createContext, ReactNode, Dispatch, SetStateAction } from "react"

export interface NodeContextProps {
  data: arrOfNodesProps[];
  setData: Dispatch<SetStateAction<arrOfNodesProps[]>>
}

const defaultState: NodeContextProps = {
  data: arrOfNodes,
  setData: () => { }
}

export const NodeContext = createContext<NodeContextProps>(defaultState)

export const NodeProvider = ({ children }: { children: ReactNode }) => {

  const [data, setData] = useState<arrOfNodesProps[]>(arrOfNodes)

  console.log(data)
  
  return (
    <NodeContext.Provider value={{ data, setData }}>
      {children}
    </NodeContext.Provider>
  )
}