import { useContext,useState } from "react"
import Login from "./components/Login"
import Register from "./components/Register"
import { AuthContext } from './context/authContext';
import HomePage from "./pages/HomePage";


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
    <section>
      {!isRegActive?<Login />:<Register />}
    </section>
  )
}


