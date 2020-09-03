export default function renderFileTree(data: any) {
  let root = { name: "root", children: [] };

  data.forEach((file: any) => {
    const { name } = file;

    const node = {
      id: name,
      title: getTitle(name),
    };

    let item = root.children.find((f: any) =>
      file.name.includes(f.name)
    ) as any;
    let cur = item ? item : root;
    while (item) {
      const temp = item?.children?.find((f: any) => file.name.includes(f.name));
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
