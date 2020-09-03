import JSZip from "jszip";
import { saveAs } from "file-saver";
import DB from "./db";
import { Base64 } from "js-base64";

const ZIP = new JSZip();

export async function zipFile(filePath: string) {
  const { content } = await DB.Get(filePath);
  ZIP.file(
    filePath,
    content instanceof Blob ? content : Base64.decode(content)
  );
}

export function zip() {
  ZIP.generateAsync({ type: "blob" }).then((blob) => {
    saveAs(blob, "hello.zip");
  });
}

export async function zipAllFile() {
  const result = await DB.GetAll();
  result.forEach(async ({ fileName, content }) => {
    ZIP.file(
      fileName,
      content instanceof Blob ? content : Base64.decode(content)
    );
  });
}
