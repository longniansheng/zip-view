import React from "react";
import { view, zip, zipAllFile } from "./utils";

function App() {
  const handleView = async () => {
    const data = await view();
    // console.log(data);
  };

  const handleDownload = async () => {
    await zipAllFile();
    zip();
  };

  return (
    <div className="App">
      <button onClick={handleView}>预览zip</button>
      <button onClick={handleDownload}>download</button>
    </div>
  );
}

export default App;
