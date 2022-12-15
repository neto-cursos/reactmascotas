import React, { useContext } from 'react'
import CardInfo from '../components/Cards/CardInfo';
import Maps from '../components/Maps';
import { AuthContext } from './../context/authContext';
import ListPage from "./ListPage";
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
const HomePage = () => {

    const { userId, handleLogOut } = useContext(AuthContext)
    const [coord, setCoord] = React.useState({
        lat: 0,
        long: 0,
        msg: 0,
    })
    const handleAlarma=()=>{

    }


    React.useEffect(() => {
        console.log("cambió")
    }, [coord])
    return (
        <section className='flex flex-col'>
            <div className='flex fle-row'>
                <h5 className="text-sm">Su ID de usuario es: <span>{userId}</span></h5>
                <button className="text-sm btn-logout" onClick={handleLogOut}>Cerrar Sesión</button>
            </div>
            <div className='flex flex-row justify-center align-middle items-center'>
            <CardInfo title="En Rango" value={"Estado"} icon={null} colorFrom={"from-[#FBEDCA]"} colorTo={"to-[#FBEDCA]"} borderColor={"border-yellow-600"} bgRound={"bg-yellow-600"}></CardInfo>
            <button className="text-sm h-16" onClick={handleAlarma}><p><CircleNotificationsIcon></CircleNotificationsIcon></p> Encender Alarma</button>
            </div>
            <Maps coord={coord}></Maps>
            <ListPage setCoord={setCoord}></ListPage>

        </section>
    )

}

export default HomePage