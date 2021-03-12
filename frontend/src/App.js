import './components/layout/Navbar.css';
import './components/layout/Footer.css';
import './Home.css';
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './Home'



function App() {
  return (
    <div className="App">
         <Navbar />
          <Home />
          <Footer />
      
      </div>
  );
}

export default App;
