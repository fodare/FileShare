import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
   const [postdata, setPostData] = useState({});
   const [id, setId] = useState(1);
   const [idFromButtonClick, setIdFromButtonClick] = useState(1);

   const handleClick = () => {
      setIdFromButtonClick(id);
   };

   useEffect(() => {
      axios
         .get(`/api/posts/${id}`)
         .then((res) => {
            console.log(res.data);
            setPostData(res.data);
         })
         .catch((err) => {
            console.log(err);
         });
   }, [idFromButtonClick]);

   return (
      <div className="App">
         <input
            type="text"
            value={id}
            onChange={(e) => {
               setId(e.target.value);
            }}
         />
         <button type="button" onClick={handleClick}>
            Get Post
         </button>
         <div>
            <p>Post id: {postdata.id}</p>
            <p>Post userId: {postdata.userId}</p>
            <p>Post title: {postdata.title}</p>
            <p>Post body: {postdata.body}</p>
         </div>
      </div>
   );
}

export default App;
