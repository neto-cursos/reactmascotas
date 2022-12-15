import React,{ useContext,useState } from "react";
// import Login from "./components/Login";
import Register from "./components/Register";
import { AuthContext } from './context/authContext';
// import HomePage from "./pages/HomePage";
const HomePage = React.lazy(() => import("./pages/HomePage"));
const Login = React.lazy(() => import("./components/Login"));
// const Register = React.lazy(() => import("./components/Register"));

const App = () => {

  const { status, userId } = useContext(AuthContext)

  if (status === 'checking') return <p className="loading"><span>espere un momento por favor...</span></p>

  return (
    <main>
      <h1><b>Bienvenido al </b> <span>Geolocalizador</span> <b>De</b> <span>Mascotas</span></h1>
      {
        (status === 'authenticated' && userId)
          ? <HomePage />
          : <AuthPage />
      }
    </main>
  )
}
export default App


export const AuthPage = () => {
  const [isRegActive,setIsRegActive]=useState(false);
  return (
    <section className="flex-col">
      <div className='text-center font-bold text-sky-700 cursor-pointer hover:text-amber-600 text-xl' onClick={()=>(isRegActive?setIsRegActive(false):setIsRegActive(true))}>{isRegActive?"Iniciar Sesión":"crear cuenta"}</div>
      {!isRegActive?<Login />:<Register />}
    </section>
  )
}


