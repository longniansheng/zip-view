import JSzip from "jszip";
import http from "@sinoui/http";
import DB from "./db";
import { Base64 } from "js-base64";

const ZIP = new JSzip();

export async function view() {
  return http
    .get("/files.zip", {
      responseType: "arraybuffer",
    })
    .then((data: any) => {
      DB.init();
      return ZIP.loadAsync(data).then((zip) => {
        zip.forEach((relativePath: string, zipEntry: any) => {
          const { name: fileName, dir } = zipEntry;

          if (!dir) {
            zip
              .file(fileName)
              ?.async("base64")
              .then((text) => {
                const zipFile = {
                  fileName,
                  content: text,
                };

                DB.Add(zipFile);
                DB.Get(fileName).then((data: any) => {
                  console.log(Base64.decode(data.content));
                });
              });
          }
        });

        return zip;
      });
    });
}
