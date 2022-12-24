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
               console.log(
                  `Error retrieving files from server.Response code: ${e.status}`
               );
            }
         })
         .catch((err) => {
            console.log(
               `Error retrieving files from backend service. Message: ${err}`
            );
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

   const copyDownloadLink = (e) => {
      var downloadLink = e.target.value;
      navigator.clipboard.writeText(downloadLink);
      notify("Link copied");
   };

   return (
      <div className="uploaded-files margin-top-sm">
         <span>
            <ToastContainer theme="dark" autoClose={8000} />
         </span>
         <h1>Uploaded Files:</h1>
         <div className="margin-top-1m">
            {dataFiles.map((file, index) => (
               <div className="hstack gap-3 margin-top-1m" key={index}>
                  <input
                     className="form-control"
                     type="test"
                     value={file.name}
                     disabled
                  />
                  <button
                     onClick={copyDownloadLink}
                     type="button"
                     className="btn btn-secondary"
                     value={`http://127.0.0.1:5000/api/file/${file.name}`}
                  >
                     Share
                  </button>
                  <button
                     onClick={deleteFile}
                     type="button"
                     className="btn btn-outline-danger"
                     value={file.name}
                  >
                     Delete
                  </button>
               </div>
            ))}
         </div>
      </div>
   );
}

export default UploadedFiles;
