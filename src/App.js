import { Form, Button } from 'react-bootstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Singup from './components/Singup/Singup';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import Login from './components/Login/Login';
import Home from './components/Home/Home';
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home/>
        </Route>
        <Route path="/signup">
          <Singup />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
      </Switch>
      
    </Router>
  );
}

export default App;
