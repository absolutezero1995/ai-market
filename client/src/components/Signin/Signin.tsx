import { ChangeEvent, FormEvent, useState } from 'react'
import { useAppDispatch } from '../../hooks/redux.ts'
import { login } from '../../features/auth/authSlice.ts'
import { useNavigate } from 'react-router-dom'
import './Signin.css';

const Signin = () => {
    const [formData, setFormData] = useState({ email: '', password: '' })
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await dispatch(login(formData))
        navigate('/chat')
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2.5">
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="border-2 border-gray-300 p-2 rounded-md"
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="border-2 border-gray-300 p-2 rounded-md"
            />
            <button type="submit" className="border-2 border-gray-300 p-2 rounded-md bg-gray-300">
                Login
            </button>
        </form>
    )
}

export default Signin;