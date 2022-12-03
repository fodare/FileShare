import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UploadCard() {
   const [files, setFiles] = useState([]);
   const [message, setMessage] = useState([]);

   const notify = () => {
      toast(message);
   };

   const onInputChange = (e) => {
      setFiles(e.target.files);
   };

   const onSubmit = (e) => {
      e.preventDefault();
      const data = new FormData();

      for (let i = 0; i < files.length; i++) {
         if (files[i]["size"] > 70000) {
            // Tweak number here to set max file size
            // alert(
            //    `${files[i]["name"]} is too large! File size is ${files[i]["size"]}. Maximum files size should be 70000 bytes`
            // );
            setMessage(
               `${files[i]["name"]} is too large! File size is ${files[i]["size"]}. Maximum files size should be 70000 bytes`
            );
         } else {
            data.append("file", files[i]);
            axios
               .post(`/api/file/upload`, data)
               .then((e) => {
                  console.log(e.data, e.status);
                  setMessage(`File uploaded successfully!`);
               })
               .catch((err) => {
                  console.log(err);
               });
         }
      }
   };

   return (
      <div className="upload-card">
         <span>
            <ToastContainer />
         </span>
         <form
            className=""
            method="POST"
            action="#"
            id=""
            onSubmit={onSubmit}
            encType="multipart/form-data"
         >
            <label htmlFor="formFile" className="form-label">
               Upload file
            </label>
            <input
               className="form-control"
               type="file"
               id="formFile"
               onChange={onInputChange}
               multiple
            />

            <div className="supported-file-div margin-top-sm">
               <p className="supported-file-tag">Supports all file types</p>
               <p className="supported-files">Max file size in bytes: 70000</p>
            </div>
            <button
               type="submit"
               className="btn btn-secondary btn-lg"
               onClick={notify}
            >
               Upload
            </button>
         </form>
      </div>
   );
}

export default UploadCard;
