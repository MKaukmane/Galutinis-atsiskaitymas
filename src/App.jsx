import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import UsersContext from './contexts/UsersContext';
import Header from './components/UI/Header';
import Home from './components/pages/Home';
import Register from './components/pages/Register';
import Login from './components/pages/Login';
import Footer from './components/UI/Footer';
import NewQuestions from './components/pages/NewQuestions';
import EditQuestion from './components/pages/EditQuestion';

const App = () => {

  const { loginUser } = useContext(UsersContext);

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route index element={<Home />}/>
          <Route path='addNew' element={
              loginUser ? <NewQuestions /> : <Navigate to='/user/login' />
          }/>
          <Route path=':id/edit' element={
              loginUser ? <EditQuestion /> : <Navigate to='/user/login' />
          } />
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