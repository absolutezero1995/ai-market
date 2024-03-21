import { ChangeEvent, FormEvent, useState } from 'react'
import { useAppDispatch } from '../../hooks/redux.ts'
import { login } from '../../features/auth/authSlice.ts'
import { useLocation, useNavigate } from 'react-router-dom'
import './Signin.css';

const Signin = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' })
    const dispatch = useAppDispatch()

    const location = useLocation()
    const navigate = useNavigate()

    // Показывает с какой страницы пришел пользователь, чтобы вернуть обратно после авторизации
    const from = location.state?.from?.pathname || '/'

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await dispatch(login(credentials))
        navigate(from, { replace: true })
    }

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={credentials.email}
                onChange={handleChange}
                className="form-input"
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                value={credentials.password}
                onChange={handleChange}
                className="form-input"
            />
            <button type="submit" className="form-button">
                Login
            </button>
        </form>
    )
}

export default Signin;
