import { Routes, Route, Navigate } from "react-router-dom";
import Login from './pages/login/Login';
import { ProtectedRoute } from "./components/ProtectedRoute";
import Books from "./pages/books"
import Register from "./pages/register";

function App() {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/register' element={< Register />} />
      <Route element={<ProtectedRoute />}>
        <Route index path='/books' element={<Books />} /> 
        <Route path=':bookId' element={<Books />} /> 
      </Route>
    </Routes>

    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>Bagus/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
