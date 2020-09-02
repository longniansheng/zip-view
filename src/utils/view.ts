import JSzip from "jszip";
import http from "@sinoui/http";
// import axios from "axios";
const indexDB = window.indexedDB;

let curDb = undefined;

const zip = new JSzip();

export function view() {
  http
    .get("/files.zip", {
      responseType: "arraybuffer",
    })
    .then((data: any) => {
      // 加载zip
      zip.loadAsync(data).then((files: any) => {
        files.forEach((relativePath: string, zipEntry: any) => {
          console.log("relativePath", relativePath);
          const { name: fileName, dir, ...rest } = zipEntry;
          if (!dir) {
            zip
              .file(fileName)
              ?.async("base64")
              .then((text) => {
                const req = indexDB.open("viewIndexDB");

                req.onupgradeneeded = function () {
                  const db = req.result;
                  db.createObjectStore("zip_review", {
                    autoIncrement: true,
                  });
                };

                req.onsuccess = function () {
                  curDb = req.result;
                  console.log("curDb::", curDb);

                  const tran = curDb.transaction(
                    ["handleFileName"],
                    "readwrite"
                  );
                  const objectStore = tran.objectStore("handleFileName");

                  const zipFile = {
                    file_name: fileName,
                    file_content: text,
                  };
                  const adduser = objectStore.add(zipFile); // 为当前数据表增加记录
                  adduser.onsuccess = function () {};
                };
              });
          }
        });
      });
    });
}
