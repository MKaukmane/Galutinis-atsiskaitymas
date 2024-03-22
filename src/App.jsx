import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './components/UI/Header';
import Home from './components/pages/Home';
import Register from './components/pages/Register';
import Login from './components/pages/Login';
import Footer from './components/UI/Footer';

const App = () => {

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route index element={<Home />}/>
          <Route path='/'>

          </Route>
          <Route path='/user'>
            <Route path='register' element={<Register />} />
            <Route path='login' element={<Login />} />
          </Route>
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;