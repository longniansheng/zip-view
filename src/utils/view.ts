import JSZip from "jszip";
import http from "@sinoui/http";
import DB from "./db";
import settings from "./setting";

const ZIP = new JSZip();

export async function view(): Promise<JSZip.JSZipObject[]> {
  return http
    .get("/files.zip", {
      responseType: "arraybuffer",
    })
    .then((data: any) => {
      DB.init();
      return ZIP.loadAsync(data).then((zip: JSZip) => {
        const ret: JSZip.JSZipObject[] = [];
        zip.forEach((relativePath: string, zipEntry: JSZip.JSZipObject) => {
          const { name: fileName, dir } = zipEntry;
          ret.push(zipEntry);
          if (!dir) {
            // TODO: 生成相应的文件
            // 应该有相应的配置判断文件的保存类型（是否是二进制文件）

            const type =
              settings.find((item) => item.path === fileName)?.bufferType ??
              "base64";
            zip
              .file(fileName)
              ?.async(type)
              .then(
                (
                  text:
                    | string
                    | ArrayBuffer
                    | Blob
                    | number[]
                    | Uint8Array
                    | Buffer
                ) => {
                  const zipFile = {
                    fileName,
                    content: text,
                  };

                  DB.Add(zipFile);
                }
              );
          }
        });

        return ret;
      });
    });
}
