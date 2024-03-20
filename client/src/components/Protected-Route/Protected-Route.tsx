import { useSelector } from 'react-redux'
import { RootState } from '../../store/store.ts'
import RequireAuthMessage from '../Require-Auth-Message/Require-Auth-Message.tsx'
import { ReactNode } from 'react'

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)

  if (!isAuthenticated) {
    return <RequireAuthMessage />
  }

  return children // Если пользователь аутентифицирован, отображаем дочерние компоненты
}

export default ProtectedRoute
