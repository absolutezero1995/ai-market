import { ChangeEvent, FormEvent, useState } from 'react'
import { useAppDispatch } from '../../hooks/redux.ts'
import { register } from '../../features/auth/authSlice.ts'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  const [formData, setFormData] = useState({ email: '', password: '', name: '' })
  const [error, setError] = useState('');

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const res = await dispatch(register(formData));
    console.log(res, 'res16')
    navigate('/')
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="form-container">
    <form onSubmit={handleSubmit} className="signup_form">
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
      />
      <button type="submit" className="sign_up_btn">
        Sign Up
      </button>
      <h1 className="error-signup">{error}</h1>
    </form>
    </div>
  )
}

export default Signup
