import {useEffect, useRef, useState} from 'react';
import '../css/imageCropper.css';
import Cropper from 'cropperjs';

import 'cropperjs/dist/cropper.min.css';

function ImageCropper(props) {
  const [imageDestination, setImageDestination] = useState('');  
  const imageRef = useRef();
  const previewRef = useRef();
  useEffect(()=>{
    console.log(imageRef);
    console.log('heool');  
    const cropper = new Cropper(imageRef.current, {
      zoomable: false,
      scalable: false,
      aspectRatio: 132.28/170.08,
      crop: ()=>{              
        const canvas = cropper.getCroppedCanvas();
        setImageDestination(canvas.toDataURL("image/png"));        
      }
    });
  }, [props.image])


  //pass previewRef.current to get the stringify object that can be sent to server
  // this object can not be convertable to img or file type due to security issues
  // so we can not preview last returned object by this function
  function getBase64Image(img) {
    console.log(img);
    // Create an empty canvas element
    var canvas = document.createElement("canvas");

    try {
      //if we reduce the size of crop window then it will give exception

      canvas.width = img.width;
      canvas.height = img.height;
    
      // Copy the image contents to the canvas
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
    
      // Get the data-URL formatted image
      // Firefox supports PNG and JPEG. You could check img.src to
      // guess the original format, but be aware the using "image/jpg"
      // will re-encode the image.
      var dataURL = canvas.toDataURL("image/png");
      console.log(typeof canvas, typeof props.image);
      console.log(dataURL);
      return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
      
    } catch (error) {
      console.log(error);
      return null;
    }
  }




  return (
    <div className="image-container-container">      
      <div className="image-container">
        <img src={props.image} ref={imageRef} alt="source " />
      </div>
      <img className="image-preview" src={imageDestination} alt="destination " id="preview-image" ref={previewRef}/>            
    </div>
  );
}

export default ImageCropper;
