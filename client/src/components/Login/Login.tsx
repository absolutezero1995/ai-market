import { ChangeEvent, FormEvent, useState } from 'react'
import { useAppDispatch } from '../../hooks/redux.ts'
import { login } from '../../features/auth/authSlice.ts'
import { useLocation, useNavigate } from 'react-router-dom'

const Login = () => {
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2.5">
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={credentials.email}
        onChange={handleChange}
        className="border-2 border-gray-300 p-2 rounded-md"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={credentials.password}
        onChange={handleChange}
        className="border-2 border-gray-300 p-2 rounded-md"
      />
      <button type="submit" className="border-2 border-gray-300 p-2 rounded-md bg-gray-300">
        Login
      </button>
    </form>
  )
}

export default Login
