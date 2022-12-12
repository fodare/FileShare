import React, { useState, useEffect } from "react";
import axios from "axios";

function UploadedFiles() {
   const [dataFiles, setDataFiles] = useState([]);
   useEffect(() => {
      axios
         .get(`/api/file/files`)
         .then((e) => {
            if (e.status === 200) {
               setDataFiles(e.data);
            } else {
               console.log(e.data);
            }
         })
         .catch((err) => {
            console.log(err);
         });
   }, []);

   return (
      <div className="uploaded-files margin-top-sm">
         <h1>Uploaded Files:</h1>
         <div className="uploaded-files-list">
            {dataFiles.map((file, index) => (
               <div key={index} className="uploaded-files margin-top-1m">
                  <button
                     className="btn btn-lg btn-secondary"
                     value={file.name}
                  >
                     {file.name}
                  </button>
               </div>
            ))}
         </div>
      </div>
   );
}

export default UploadedFiles;
