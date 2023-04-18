import { FormEvent, useContext, useRef, SetStateAction } from "react";
import { arrOfNodesProps } from "@/arrOfNodes";
import { NodeContext, NodeContextProps } from "@/contexts/NodeContext";

interface NodeProps {
  test: arrOfNodesProps
  className?: string
}

export const Node = ({ test, ...rest }: NodeProps) => {
  const { data, setData } = useContext<NodeContextProps>(NodeContext)

  const inputRef = useRef<HTMLInputElement>(null)

  const hasNodeChildren = data.some(node => test.nodeName === node.parentName)

  const onSubmitHandle = (e: FormEvent) => {
    e.preventDefault()
    // console.log(inputRef.current?.value, inputRef.current?.name)

    const nodeName = inputRef.current ? inputRef.current.value : ''
    const parentName = inputRef.current ? inputRef.current.name : ''

    setData((prevState: arrOfNodesProps[]) => { 
      return [
        ...prevState,
        {
          nodeName: nodeName, parentName: parentName
        }
      ]
    })
    inputRef.current ? inputRef.current.value = '' : false
  }

  return (
    <li className="  px-10 mx-4 py-6 border-[#ccc] border-l border-b" draggable {...rest}>
      {test.nodeName}

      {
        hasNodeChildren &&
        <ul className="">
          {
            data.filter(node => node.parentName === test.nodeName).map(node => {
              return <Node key={node.nodeName} test={node} />
            })
          }
        </ul>
      }

      <form onSubmit={onSubmitHandle} >
        <input type="text" ref={inputRef} name={test.nodeName} className="border border-[#ccc] px-4 m-4 " />
      </form>
    </li>
  )
}