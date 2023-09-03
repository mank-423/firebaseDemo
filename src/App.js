import './App.css';
import Data from './components/Data';
import Login from './components/Login';

function App() {
  return (
    <div className="App">
      <h1>Firebase course</h1>
      <br />
      
      <h3>Login and signup</h3>
      <Login />

      <br />
      <h3>Read data</h3>
      <Data />



    </div>
  );
}

export default App;
