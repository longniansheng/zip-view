import React from "react";
import { view } from "./utils";

function App() {
  const hanleClick = async () => {
    const data = await view();
  };
  return (
    <div className="App">
      <button onClick={hanleClick}>预览zip</button>
    </div>
  );
}

export default App;
