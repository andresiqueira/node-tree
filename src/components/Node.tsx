import { FormEvent, useContext, useRef, DragEvent } from "react";
import { BsPlusCircleDotted } from 'react-icons/bs'
import { RiArrowDropRightLine } from 'react-icons/ri'
import { Icon } from '@iconify/react';
import { Popover } from '@headlessui/react'

import { arrOfNodesProps } from "@/arrOfNodes";
import { NodeContext, NodeContextProps } from "@/contexts/NodeContext";

interface NodeProps {
  node: arrOfNodesProps
  className?: string
}

export const Node = ({ node, ...rest }: NodeProps) => {
  const { data, setData } = useContext<NodeContextProps>(NodeContext)

  const inputRef = useRef<HTMLInputElement>(null)

  const hasNodeChildren = data.some(n => node.nodeName === n.parentName)

  const onSubmitHandle = (e: FormEvent) => {
    e.preventDefault()

    const nodeName = inputRef.current ? inputRef.current.value : ''
    const parentName = inputRef.current ? inputRef.current.name : ''

    const hasSameName = data.some((n) => n.nodeName === nodeName)

    !hasSameName && nodeName !== "" ?
      setData((prevState: arrOfNodesProps[]) => {
        return [
          ...prevState,
          {
            nodeName: nodeName, parentName: parentName
          }
        ]
      }) :
      alert("Os nós não podem ter o mesmo nome e nem em branco")

    inputRef.current ? inputRef.current.value = '' : false
  }

  return (
    <li
      id={node.nodeName}
      className="px-24 mx-4 py-6 border-[#c6cfd8] border-l-2 block relative w-full"
      
      draggable

      onDragStart={(e: DragEvent<any>) => {
        e.dataTransfer.setData('text', e.currentTarget.id)
      }}

      onDragOver={(e: DragEvent<any>) => {
        e.preventDefault()
      }}

      onDrop={(e: DragEvent<any>) => {
        const id = e.dataTransfer.getData('text')
        console.log(id)
      }}

      {...rest}
    >
      <span className="relative -top-5 -left-2 p-3 bg-white text-gray-500 rounded-md shadow-lg shadow-gray-700/20">{node.nodeName}</span>

      {node.nodeName !== "NODE_0" && <span className="absolute inline-block w-24 h-[0.125rem] top-20 left-0 bg-[#c6cfd8]"></span>}
      {node.nodeName === "NODE_0" && <span className="rounded-full bg-blue-800 w-16 h-16 flex items-center justify-center text-white text-md relative right-3">ROOT</span>}
      {node.nodeName !== "NODE_0" && <span className="rounded-full w-16 h-16 bg-blue-600 text-2xl text-white flex items-center justify-center relative right-3"><Icon icon="mdi:send" /></span>}
      {
        hasNodeChildren &&
        <ul className="">
          {
            data.filter(n => n.parentName === node.nodeName).map(n => {
              return <Node key={n.nodeName} node={n} />
            })
          }
        </ul>
      }

      <span className="relative inline-block w-[0.125rem] h-[78px] top-0 left-4 bg-[#c6cfd8]"></span>
      <span className="relative inline-block w-24 h-[0.125rem] top-0 left-4 bg-[#c6cfd8]"></span>

      <Popover className="relative -top-9 ml-28 h-14 flex ">
        <Popover.Button><BsPlusCircleDotted className="h-8 w-8 text-[#777]" /></Popover.Button>

        <Popover.Panel className="">
          <form onSubmit={onSubmitHandle} className="shadow-lg shadow-gray-700/20 flex flex-col bg-white px-1 py-6 w-[210px] relative right-10 bottom-2 rounded-md text-gray-600">
            <label className="mx-4" htmlFor={node.nodeName}>Nome do node</label>
            <input type="text" ref={inputRef} name={node.nodeName} className="border border-[#ccc] px-4 py-2 mx-4 mt-2 rounded-sm w-2/3" />
            <button className="bg-gray-200 text-gray-500 border-[#ccc] border absolute top-14 right-[18px] h-[42px]" type="submit"><RiArrowDropRightLine className="text-4xl" /></button>
          </form>
        </Popover.Panel>
      </Popover>
    </li>
  )
}