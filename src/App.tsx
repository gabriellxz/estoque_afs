import { JSX } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/login";
import Dashboard from "./pages/Dashboard/dahsboard";
import { AuthProvider } from "./context/authContext";
import Authenticated from "./security/authenticated";
import Home from "./pages/Dashboard/Home/home";
import CreateComponentes from "./pages/Dashboard/Componentes/createComponentes";
import CreateComputador from "./pages/Dashboard/Computador/createComputador";
import CreateNotebook from "./pages/Dashboard/Notebook/createNotebook";
import CreateMateriais from "./pages/Dashboard/Materiais/createMateriais";
import CreateCabos from "./pages/Dashboard/Cabos/createCabos";
import Perfil from "./pages/Dashboard/Perfil/perfil";

function App(): JSX.Element {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="dashboard" element={
            <Authenticated>
              <Dashboard />
            </Authenticated>
          }>
            <Route index element={<Home />} />
            <Route path="início" element={<Home />} />
            <Route path="criar-componente" element={<CreateComponentes />} />
            <Route path="criar-computador" element={<CreateComputador />} />
            <Route path="criar-notebook" element={<CreateNotebook />} />
            <Route path="criar-material" element={<CreateMateriais />} />
            <Route path="criar-cabos" element={<CreateCabos />} />
            <Route path="perfil" element={<Perfil />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
