import JSZip from "jszip";
import { DataNode } from "antd/es/tree";
import settings from "./setting";

export default function renderFileTree(data: JSZip.JSZipObject[]) {
  let root: DataNode = {
    key: "root",
    title: "root",
    children: [],
  };

  data.forEach((file: JSZip.JSZipObject) => {
    const { name } = file;

    const node: DataNode = {
      key: name,
      title: getTitle(name),
      isLeaf: !file.dir,
      selectable: !settings.some(
        (item) => item.path === name && item.bufferType !== "string"
      ),
    };

    let item = root.children?.find((f: DataNode) =>
      file.name.includes(f.key as string)
    );
    let cur = item ? item : root;

    while (item) {
      const temp = item.children?.find((f: DataNode) =>
        file.name.includes(f.key as string)
      );
      if (temp) {
        cur = temp;
      }
      item = temp;
    }

    cur.children ? cur.children.push(node) : (cur.children = [{ ...node }]);
  });

  return root;
}

function getTitle(path: string = "") {
  const paths = path.split("/").filter(Boolean);
  const len = paths.length;
  return len === 0 ? "" : paths[len - 1];
}
