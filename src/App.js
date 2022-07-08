import logo from './logo.svg';
import {useEffect, useRef, useState} from 'react';
import './App.css';
import Cropper from 'cropperjs';

import 'cropperjs/dist/cropper.min.css';

function App() {
  const [imageDestination, setImageDestination] = useState('');
  const imageRef = useRef();
  useEffect(()=>{
    console.log(imageRef);
    const cropper = new Cropper(imageRef.current, {
      zoomable: true,
      scalable: true,
      aspectRatio: 1,
      crop: ()=>{        
        const canvas = cropper.getCroppedCanvas();
        setImageDestination(canvas.toDataURL("image/png"));
      }
    });
  }, [])
  return (
    <div className="App">
      <input type='file' accept="*.jpg, *.png, *.jpeg" name="file" />
      <div className="image-container">
        <img src={logo} ref={imageRef} alt="source " />
      </div>
      <img className="image-preview" src={imageDestination} alt="source " />
    </div>
  );
}

export default App;
