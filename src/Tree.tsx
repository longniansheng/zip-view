import * as React from "react";
import { Tree as AntdTree } from "antd";
import { TreeProps, DataNode } from "antd/es/tree";

const { TreeNode, DirectoryTree } = AntdTree;

export interface ITreesProps extends TreeProps {}

const renderTreeNodes = (data: DataNode[]) =>
  data.map((item: DataNode) => {
    if (item.children) {
      return (
        <TreeNode title={item.title} {...item}>
          {renderTreeNodes(item.children)}
        </TreeNode>
      );
    }
    return <TreeNode {...item} />;
  });

export default function Tree({ treeData, onSelect, ...rest }: ITreesProps) {
  return (
    <DirectoryTree onSelect={onSelect} {...rest}>
      {renderTreeNodes(treeData as DataNode[])}
    </DirectoryTree>
  );
}
