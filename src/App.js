import Dashboard from "./pages/home/Dashboard";
import Login from "./components/Login"
import Register from "./components/Register"
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import Cotizar from "./components/cliente o promotor/Cotizar"
import UserData from "./components/UserData"
import SolicitudesData from "./components/SolicitudesData"
import Datos from "./components/datos inmueble/Datos"
import Solicitud from "./components/solicitud/Solicitud"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { PrivateRoute } from "./components/PrivateRoute";
import { useAuth } from './context/AuthContext.js'
import Login2 from "./pages/login/Login";


function App() {
  const { darkMode } = useContext(DarkModeContext);
  const { user } = useAuth()

  return (
    <div className={darkMode ? "app dark" : "app"}>
      
        <Routes>
          <Route path="Login2" element={<Login2 />} />
          <Route path="Login" element={<Login />} />
          <Route path="Register" element={<Register />} />
          <Route path="Solicitud" element={<PrivateRoute isAllowed={user}><Solicitud /></PrivateRoute>}/>
          <Route path="Datos" element={<PrivateRoute isAllowed={user}><Datos /></PrivateRoute>}/>
          <Route path="Cotizar" element={<PrivateRoute isAllowed={user}><Cotizar /></PrivateRoute>}/>
          <Route path="UserData" element={<PrivateRoute isAllowed={user}><UserData /></PrivateRoute>}/>
          <Route path="SolicitudesData" element={<PrivateRoute isAllowed={user}><SolicitudesData /></PrivateRoute>}/>
          <Route path="/" element={<PrivateRoute isAllowed={user}><Dashboard /></PrivateRoute>}/>
        </Routes>
    </div>
  );
}

export default App;
