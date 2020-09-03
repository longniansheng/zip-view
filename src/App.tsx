import React, { useState } from "react";
import { Button, Modal } from "antd";
import { DataNode, EventDataNode } from "antd/es/tree";
import styled from "styled-components";
import Tree from "./Tree";
import { view, zip, zipAllFile } from "./utils";
import renderFileTree from "./utils/renderFileTree";
import DB from "./utils/db";
import { Base64 } from "js-base64";

const Container = styled.div`
  display: flex;
`;

const DetailInfo = styled.div`
  flex: 1;
`;

function App() {
  const [nodes, setNodes] = useState<any[]>([]);

  const [visible, setVisible] = useState(false);

  const [content, setContent] = useState<string>("");

  const handleView = async () => {
    const data = await view();
    const root = renderFileTree(data) as DataNode;
    console.log(root.children);
    setNodes(root.children as DataNode[]);
    setVisible(true);
    setContent("");
  };

  const handleDownload = async () => {
    await zipAllFile();
    zip();
  };

  const onTreeClick = async (
    selectedKeys: React.ReactText[],
    e: {
      event: "select";
      selected: boolean;
      node: EventDataNode;
      selectedNodes: DataNode[];
      nativeEvent: MouseEvent;
    }
  ) => {
    const { key, selectable, isLeaf } = e.node;
    if (isLeaf && selectable !== false) {
      const { content: data } = await DB.Get(key as string);
      setContent(Base64.decode(data as string));
    }
  };

  return (
    <div className="App">
      <Button onClick={handleView}>预览zip</Button>
      <Button onClick={handleDownload}>download</Button>
      <Modal
        visible={visible}
        onCancel={() => setVisible(false)}
        maskClosable={false}
        destroyOnClose
        width={800}
      >
        <Container>
          <Tree treeData={nodes} onSelect={onTreeClick} />
          <DetailInfo dangerouslySetInnerHTML={{ __html: content }} />
        </Container>
      </Modal>
    </div>
  );
}

export default App;
