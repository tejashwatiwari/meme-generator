import './App.css';
import Body from './Components/Body';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CommunityMemes from './Components/CommunityMemes/CommunityMemes';
import Footer from './Components/Footer/footer';
import RandomMeme from './Components/RandomMeme/RandomMeme';
import AIMeme from './Components/AIMeme/AIMeme';
import WorkshopCourses from './Components/WorkshopCourses/WorkshopCourses';
import Automeme from './Components/AutoMeme/automeme';

function App() {
  return (
    <Router>
    <div className="App">
      <Navbar />
      <Switch>
        <Route path="/" exact component={Body} />
        <Route path="/memes" component={CommunityMemes} /> 
        <Route path="/random-meme" component={RandomMeme} />
        <Route path="/ai-meme" component={AIMeme} />
        <Route path="/workshop" component={WorkshopCourses} />
        <Route path="/automeme" component={Automeme} />
      </Switch>
    </div>
    <Footer />
  </Router>


  );
}

export default App;
