import * as React from "react";
import { Tree as AntdTree } from "antd";
import { TreeProps } from "antd/es/tree";

const { DirectoryTree } = AntdTree;

export interface ITreesProps extends TreeProps {}

export default function Tree({ treeData, onSelect, ...rest }: ITreesProps) {
  return <DirectoryTree onSelect={onSelect} treeData={treeData} {...rest} />;
}
