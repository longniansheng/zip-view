interface Type {
  path: string;

  bufferType:
    | "string"
    | "blob"
    | "arraybuffer"
    | "text"
    | "base64"
    | "binarystring"
    | "array"
    | "uint8array"
    | "nodebuffer";
}

const settings: Type[] = [
  {
    path: "dir1/demo.docx",
    bufferType: "blob",
  },
];

export default settings;
