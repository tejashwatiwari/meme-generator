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
        <Route path="/" exact component={Body} /> {/* Homepage */}
        <Route path="/community-memes" component={CommunityMemes} /> {/* Community Memes page */}
      </Switch>
    </div>
  </Router>
  );
}

export default App;
