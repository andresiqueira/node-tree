export interface arrOfNodesProps {
  nodeName: string;
  parentName: string | null;
}

export const arrOfNodes: arrOfNodesProps[] = [
  { nodeName: "NODE_0", parentName: null },
  { nodeName: "NODE_1", parentName: "NODE_0" },
  { nodeName: "NODE_2", parentName: "NODE_0" },
  { nodeName: "NODE_3", parentName: "NODE_1" },
]
