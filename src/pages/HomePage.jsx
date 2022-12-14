import React, { useContext } from 'react'
import Maps from '../components/Maps';
import { AuthContext } from './../context/authContext';
import ListPage from "./ListPage";

const HomePage = () => {

    const { userId, handleLogOut } = useContext(AuthContext)
    const [coord, setCoord] = React.useState({
        lat: 0,
        long: 0,
        msg: 0,
    })


    React.useEffect(() => {
        console.log("cambió")
    }, [coord])
    return (
        <section className='flex flex-col'>
            <div className='flex fle-row'>
                <h5 className="text-sm">Su ID de usuario es: <span>{userId}</span></h5>
                <button className="text-sm btn-logout" onClick={handleLogOut}>Cerrar Sesión</button>
            </div>

            <Maps coord={coord}></Maps>
            <ListPage setCoord={setCoord}></ListPage>

        </section>
    )

}

export default HomePage