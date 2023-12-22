import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './auth/Login';
// import Footer from './components/Footer';
import Home from './pages/Home';
import Signup from './auth/Signup';
import About from './pages/About';
import LanguageList from './language/HomeLanguage';
import LanguageSet from './language/LanguageSet';
import QuizPage from './language/QuizPage';
import Leaderboard from './language/Leaderboard';


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/user'>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>
        <Route path='languages'>
          <Route index element={<LanguageList />} />
          <Route path=':language_id' element={<LanguageSet />} />
          <Route path=':language_id/sets/:question_set_id' element={<QuizPage />} />
          {/* <Route path='questions/:question_set_id' element={<LanguageSet />} /> */}
          <Route path='leaderboard' element={<Leaderboard />} />
        </Route>
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
