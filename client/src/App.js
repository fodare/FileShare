import React from "react";
import UploadCard from "./components/UploadCard";
import UploadedFiles from "./components/UploadedFiles";

function App() {
   return (
      <div className="parent-div">
         <div className="app-div">
            <UploadCard />
         </div>
         <div className="uploaded-files">
            <UploadedFiles />
         </div>
      </div>
   );
}

export default App;
