import React, { useEffect, useState } from "react";
import axios from "axios";

function UploadCard() {
   const [files, setFiles] = useState([]);

   const onInputChange = (e) => {
      setFiles(e.target.files);
   };

   const onSubmit = (e) => {
      e.preventDefault();
      const data = new FormData();

      for (let i = 0; i < files.length; i++) {
         console.log(
            `File info: ${files[i]["name"]} ${files[i]["size"]} ${typeof files[
               i
            ]["size"]}`
         );
         if (files[i]["size"] > 70000) {
            // Tweak number here to set max file size
            console.log(
               `File ${files[i]["name"]} is too large! File size is ${files[i]["size"]}`
            );
         } else {
            data.append("file", files[i]);
            axios
               .post(`/api/file/upload`, data)
               .then((e) => {
                  console.log(e.data, e.status);
               })
               .catch((err) => {
                  console.log(err);
               });
         }
      }
   };

   return (
      <div className="upload-card">
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
            <button type="submit" className="btn btn-secondary btn-lg">
               Upload
            </button>
         </form>
      </div>
   );
}

export default UploadCard;
