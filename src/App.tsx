import React, { useState } from "react";
import { Button, Modal } from "antd";
import { DataNode, EventDataNode } from "antd/es/tree";
import styled from "styled-components";
import Tree from "./Tree";
import { view, zip, zipAllFile } from "./utils";
import renderFileTree from "./utils/renderFileTree";
import DB from "./utils/db";
import { Base64 } from "js-base64";
import MonacoEditor from "react-monaco-editor";
import prettier from "prettier/standalone";
import parserGraphql from "prettier/parser-typescript";

const Container = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`;

const CodeBox = styled.div`
  width: 650px;
`;

function App() {
  const [nodes, setNodes] = useState<any[]>([]);

  const [visible, setVisible] = useState(false);

  const [content, setContent] = useState<string>("");

  const handleView = async () => {
    const data = await view();
    const root = renderFileTree(data) as DataNode;
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

      const text = prettier.format(Base64.decode(data as string), {
        printWidth: 80,
        tabWidth: 2,
        parser: "typescript",
        plugins: [parserGraphql],
      });

      setContent(text);
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
        width={1000}
      >
        <Container>
          <Tree
            style={{ width: 250 }}
            treeData={nodes}
            onSelect={onTreeClick}
          />
          <CodeBox>
            <MonacoEditor
              width="650"
              height="400"
              language="javascript"
              theme="vs-dark"
              value={content}
            />
          </CodeBox>
        </Container>
      </Modal>
    </div>
  );
}

export default App;
