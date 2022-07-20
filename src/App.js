import React, {useEffect, useRef, useState} from 'react';
import './App.css';
import Cropper from 'cropperjs';

import 'cropperjs/dist/cropper.min.css';

import ImageCropper from './components/ImageCropper';

function App() {  
  const [selectedFile, setSelectedFile] = useState(null);
  const onFileSelect = (e)=>{
    const file = e.target.files[0];
    const image = URL.createObjectURL(file);
    setSelectedFile(image);
  }    
  return (
    <React.Fragment>
      <div className="App">
        <input type='file' accept="*.jpg, *.png, *.jpeg" name="file" onChange={onFileSelect}/>        
      </div>
  
      {selectedFile?<ImageCropper image={selectedFile} /> : <div><h2>No file Selected yet</h2></div>}
    
    </React.Fragment>
  );
}

export default App;
