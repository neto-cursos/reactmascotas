import { useForm } from "./../../hooks/useForm"
import { useContext } from 'react';
import { AuthContext } from "./../../context/authContext";

export const Register = () => {

    const { handleRegisterWithCredentials } = useContext(AuthContext)

    const { handleChange, pass, email } = useForm({
        initialState: {
            email: '',
            pass: ''
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        handleRegisterWithCredentials(pass, email);

    }

    return (
        <div className="container-auth">
            <h2>Crear Cuenta</h2>

            <form onSubmit={handleSubmit}>
                <input
                    name="email"
                    type="email"
                    placeholder="Ingrese un E-mail válido"
                    onChange={handleChange}
                    value={email}
                />
                <input
                    name="pass"
                    type="password"
                    placeholder="Ingrese su password"
                    onChange={handleChange}
                    value={pass}
                />
                <div className="container-buttons">
                    <button type="submit">Registrar</button>
                </div>
            </form>
        </div>
    )
}