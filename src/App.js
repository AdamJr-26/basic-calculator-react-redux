import React from 'react';
import ColorPicker from './ColorPicker';
import Calculator from './pages/Calculator';
import {styles} from './styles';


function App() {

  return (
    <div className="App" style={styles.app}>
      <ColorPicker />
      <Calculator styles={styles} />
      <footer>Created by: Adam Marcaida Jr.</footer>
    </div>
  );
}


export default App;
