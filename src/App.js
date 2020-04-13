import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import MainPage from './MainPage';

class App extends React.Component {
  
  render() {
     return (
       <BrowserRouter>
        <div className="App">
          <MainPage />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
