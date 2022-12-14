import { useForm } from './../../hooks/useForm';
import { useContext } from 'react';
import { AuthContext } from './../../context/authContext';

export const Login = () => {

    const { handleLoginWithGoogle, handleLoginWithCredentials } = useContext(AuthContext)

    const { handleChange, pass, email } = useForm({
        initialState: {
            email: '',
            pass: ''
        }
    })


    const handleSubmit = (e) => {
        e.preventDefault()
        const result=handleLoginWithCredentials(pass, email)
        console.log("result");
        console.log(result);
    }

    return (
        <div className="container-auth">
            <h2>Inicio de Sesión</h2>

            <form onSubmit={handleSubmit}>
                <input
                    name="email"
                    type="email"
                    placeholder="Ingrese su E-mail"
                    onChange={handleChange}
                    value={email}
                />
                <input
                    name="pass"
                    type="password"
                    placeholder="Ingrese su Password"
                    onChange={handleChange}
                    value={pass}
                />

                <div className="container-buttons">
                    <button type="submit">Iniciar Sesión</button>
                    <button type="button" onClick={handleLoginWithGoogle}> Google </button>
                </div>
            </form>
        </div>
    )
}