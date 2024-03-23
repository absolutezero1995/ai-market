import { ChangeEvent, FormEvent, useState } from 'react'
import { useAppDispatch } from '../../hooks/redux.ts'
import { register } from '../../features/auth/authSlice.ts'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  const [formData, setFormData] = useState({ email: '', password: '', name: '' })
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await dispatch(register(formData))
    navigate('/chat')
  }


  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2.5">
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        className="border-2 border-gray-300 p-2 rounded-md"
      />
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
        Sign Up
      </button>
    </form>
  )
}

export default Signup
