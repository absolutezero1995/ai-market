import { ChangeEvent, FormEvent, useState } from 'react'
import { useAppDispatch } from '../../hooks/redux.ts'
import { login } from '../../features/auth/authSlice.ts'
import { useLocation, useNavigate } from 'react-router-dom'
import './Signin.css';

const Signin = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' })
    const [error, setError] = useState('')
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
        if (credentials.email === '' || credentials.password === '') {
            return setError('enter your fields')
        }
        await dispatch(login(credentials))
        navigate(from, { replace: true })
    }

    return (
        <div className="form-container">
        <form onSubmit={handleSubmit} className="signup_form">
        <h1 className="signup-form_h1">sign-in</h1>
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={credentials.email}
                onChange={handleChange}
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                value={credentials.password}
                onChange={handleChange}
            />
            <button type="submit" className="sign_up_btn">
                Sign in
            </button>
            <h1 className="error-signup">{error}</h1>
        </form>
        </div>
    )
}

export default Signin;