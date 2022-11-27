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
         // console.log(files[i]["size"], files[i]["type"]);
         // Make decision on how to validate file before submission
         data.append("file", files[i]);
      }

      axios
         .post(`/api/file/upload`, data)
         .then((e) => {
            console.log(e.data, e.status);
         })
         .catch((err) => {
            console.log(err);
         });
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
               <p className="supported-file-tag">Supported file formats</p>
               <p className="supported-files">txt, pdf, png, jpg, jpeg, gif</p>
            </div>
            <button type="submit" className="btn btn-secondary btn-lg">
               Upload
            </button>
         </form>
      </div>
   );
}

export default UploadCard;
