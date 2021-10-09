import React, { useContext, useState } from "react";
import { server_url } from "../../../env.config";
import usePostForm from "../../../server_api/usePostForm";
import { globalContext } from "../../../store/context/globalContext";

function ProfilePg() {
  const [doPostForm] = usePostForm();
  const { currentUser, setCurrentUser } = useContext(globalContext);
  const [Files, setFiles] = useState(null);

  let img_src = "";
  let file_arr = [];
  let src_arr = [];

  function getImg(e) {
    file_arr = Array.from(e.target.files);

    file_arr.map((img) => {
      let binaryData = [];
      binaryData.push(img);
      const blob = new Blob(binaryData);

      img_src = window.URL.createObjectURL(blob);

      src_arr.push(img_src);
    });
    setFiles({ src_arr, file_arr });
  }

  const postSubmit = (e) => {
    e.preventDefault();

    let bodyFormData = new FormData();

    if (Files && Files.file_arr.length > 0) {
      for (let i = 0; i < Files.file_arr.length; i++) {
        bodyFormData.append("filesToUpload[]", Files.file_arr[i]);
      }
    }
    src_arr = [];
    file_arr = [];

    doPostForm("other/image", bodyFormData, (data) => {
      setCurrentUser({ ...currentUser, profileImg: data.profileImg });
    });
  };

  return (
    <div>
      <img
        src={`${server_url}${currentUser.profileImg}`}
        width="300"
        height="300"
      />
      <form onSubmit={postSubmit}>
        <input
          type="file"
          id="myFile"
          name="filename"
          accept="image"
          multiple
          onChange={(e) => getImg(e)}
        />
        <input type="submit" />
      </form>
    </div>
  );
}

export default ProfilePg;
