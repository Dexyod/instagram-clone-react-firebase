import React, { useState } from "react";
import { Button } from "@material-ui/core";
import firebase from "firebase";
import { storage, db } from "../firebase";
import "./ImageUpload.css";

function ImageUpload({ username }) {
  //set up some states
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [caption, setCaption] = useState("");

  //handleChange method to upload image
  const handleChange = (e) => {
    if (e.target.files[0]) {
      //only uploads the first file selected
      setImage(e.target.files[0]);
    }
  };

  //handleUpload method
  const handleUpload = (e) => {
    //access storage on firebase and get reference to the file name selected and put in storage
    const uploadTask = storage.ref(`images/${image.name}`).put(image);

    //Main block of code for uploading image
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        //progress function visual ...
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        //workout how much progress has completed and setProgress
        setProgress(progress);
      },
      (error) => {
        //Error function ...
        console.log(error);
      },
      () => {
        //Complete function ...
        //go to reference of images with the name of the image and retrieve the download Url
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            //post image inside of db using download url
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageUrl: url,
              username: username,
            });

            setProgress(0);
            setCaption("");
            setImage("");
          });
      }
    );
  };

  return (
    <div className="imageupload">
      <progress className="imageupload__progress" value={progress} max="100" />
      <input
        type="text"
        placeholder="Enter a caption..."
        onChange={(event) => setCaption(event.target.value)}
        value={caption}
      />
      <input type="file" onChange={handleChange} />
      <Button onClick={handleUpload}>Upload</Button>
    </div>
  );
}

export default ImageUpload;
