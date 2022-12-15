import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UploadedFiles() {
   const [dataFiles, setDataFiles] = useState([]);

   const notify = (toastMessage) => {
      toast(toastMessage);
   };

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

   const deleteFile = (e) => {
      let fileName = e.target.value;
      if (fileName === "No stored files") {
         console.log(fileName);
      } else {
         const data = { name: fileName };
         axios
            .post(`/api/file/delete`, data)
            .then((e) => {
               notify(`${fileName} deleted successfully!`);
            })
            .catch((err) => {
               notify(`Error deleting file!`);
            });
      }
   };

   return (
      <div className="uploaded-files margin-top-sm">
         <span>
            <ToastContainer theme="dark" autoClose={8000} />
         </span>
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
                  <button
                     type="button"
                     className="btn-close"
                     aria-label="Close"
                     value={file.name}
                     onClick={deleteFile}
                  ></button>
               </div>
            ))}
         </div>
      </div>
   );
}

export default UploadedFiles;
