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
            }
         })
         .catch((err) => {
            console.log(err);
         });
   }, []);

   return (
      <div>
         <h1>Hello World</h1>
         <ul>
            {dataFiles.map((file, index) => (
               <li key={index}>{file.name}</li>
            ))}
         </ul>
      </div>
   );
}

export default UploadedFiles;
