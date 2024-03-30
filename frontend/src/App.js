import { Route,Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import BookReviews from './components/BookReviews';
import CreateReviews from './components/CreateReviews'
import './App.css'

function App() {
  return (
    <>
    <Navbar/>
      <div>
    <Routes>        
      <Route path="/"  element={<BookReviews/>} />
      <Route path="/CreateReviews"  element={<CreateReviews />}/>
    </Routes>
    </div>
    </>
  );
}

export default App;
