import { useLocation, useNavigate } from 'react-router-dom'

const RequireAuthMessage = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogin = () => {
    navigate('/login', { state: { from: location } })
  }

  return (
    <div>
      <p>Для доступа к этому разделу необходимо войти в систему.</p>
      <button onClick={handleLogin} className="bg-gray-300 p-2 rounded-md">
        Войти
      </button>
    </div>
  )
}

export default RequireAuthMessage
