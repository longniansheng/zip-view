const DB = {
  init() {
    let req = indexedDB.open("view-zip", 2);

    req.onupgradeneeded = (e) => {
      let db = req.result;
      db.createObjectStore("zip-file", { keyPath: "fileName" });
      req.result.close();
    };
  },

  Add(payload: any) {
    return new Promise((resolve, reject) => {
      let db = indexedDB.open("view-zip", 2);
      db.onsuccess = () => {
        db.result
          .transaction("zip-file", "readwrite")
          .objectStore("zip-file")
          .add(payload);
        db.result.close();
        resolve();
      };
      db.onerror = (e) => {
        reject(e);
      };
    });
  },

  Get(key: string): Promise<{ fileName: string; content: string | Blob }> {
    return new Promise((resolve, reject) => {
      let db = indexedDB.open("view-zip", 2);
      db.onsuccess = () => {
        let req = db.result
          .transaction("zip-file", "readonly")
          .objectStore("zip-file")
          .get(key);
        db.result.close();

        req.onsuccess = (e: any) => {
          resolve(e.target.result);
        };
        req.onerror = (err) => {
          reject(err);
        };
      };
      db.onerror = (e) => {
        reject(e);
      };
    });
  },

  GetAll(): Promise<Array<{ fileName: string; content: string | Blob }>> {
    return new Promise((resolve, reject) => {
      let db = indexedDB.open("view-zip", 2);
      db.onsuccess = () => {
        let req = db.result
          .transaction("zip-file", "readonly")
          .objectStore("zip-file")
          .getAll();
        db.result.close();

        req.onsuccess = (e: any) => {
          resolve(e.target.result);
        };
        req.onerror = (err) => {
          reject(err);
        };
      };
      db.onerror = (e) => {
        reject(e);
      };
    });
  },
};

export default DB;
