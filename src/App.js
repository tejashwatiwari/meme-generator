import './App.css';
import Body from './Components/Body';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CommunityMemes from './Components/CommunityMemes/CommunityMemes';

function App() {
  return (
    <Router>
    <div className="App">
      <Navbar />
      <Switch>
        <Route path="/" exact component={Body} />
        <Route path="/memes" component={CommunityMemes} /> 
      </Switch>
    </div>
  </Router>
  );
}

export default App;
