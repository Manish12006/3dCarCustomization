import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './styles.css';
import './Loader.css'; // Custom loader styles
import { Canvas } from '@react-three/fiber';
import MainScene from './MainScene';
import { useProgress } from '@react-three/drei';
import Simplescene from './Simplescene';

// Custom Loader component
function CustomLoader({ onFinish }) {
  const { progress, loaded, total } = useProgress();
  const [hide, setHide] = useState(false);

  useEffect(() => {
    if (loaded === total) {
      setTimeout(() => {
        setHide(true);
        setTimeout(onFinish, 600); 
      }, 300);
    }
  }, [loaded, total, onFinish]);

  return (
    <div className={`loader-screen ${hide ? 'fade-out' : ''}`}>
      <div className="spinner"></div>
      <div className="intro-text">
        <h1>Unleash Your Dream Ride</h1>
        <p>Customize. Modify. Drive the Future.</p>
      </div>

    </div>
  );
}

// App Wrapper
function AppWrapper() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <CustomLoader onFinish={() => setIsLoading(false)} />}
      <div className={`canvas-fade ${!isLoading ? 'fade-in' : ''}`}>
        <Canvas
          gl={{ antialias: true }}
          shadows
          camera={{ position: [104.450, 37.362, 101.276], fov: 50 }}
        >
          <MainScene />
          {/* <Simplescene/> */}
        </Canvas>
      </div>

    </>
  );
}

// Mount the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<AppWrapper />);
