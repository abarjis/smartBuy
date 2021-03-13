import { BrowserRouter as Router, Route } from 'react-router-dom'


/*
CSS files
*/
import './components/layout/Navbar.css';
import './components/layout/Footer.css';
import './Home.css';



/*
Components
*/
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './Home'



function App() {
  return (
    <Router>
    <div className="App">
    <Navbar />
       <div className="container container-fluid">
         <Route path="/" component={Home} exact />
        </div>
     <Footer />
      </div>
      </Router>
  );
}

export default App;
