import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import IndexPage from "./pages/IndexPage"
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Layout from "./layout";
import './App.css'
import axios from "axios";
import { UserContextProvider } from "./UserContext";
import AccountPage from "./pages/AccountPage";

export default function App() {

  axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
  axios.defaults.withCredentials = true;

  return (
    
    <UserContextProvider>

        <Router>
          <Routes>
            <Route path = "/" element ={<Layout/>}>
            
              <Route path = "/" element={<IndexPage />} />
              <Route path = "/login" element = {<LoginPage />} />
              <Route path = "/register" element = {<RegisterPage />} />
              <Route path = "/account" element = {<AccountPage />} />

            </Route>
          </Routes>
      </Router>

    </UserContextProvider>
    
  );
}
