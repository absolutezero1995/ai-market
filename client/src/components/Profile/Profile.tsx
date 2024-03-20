import { useAppSelector } from '../../hooks/redux'

const Profile = () => {
  const user = useAppSelector((state) => state.auth.user)

  const makeFirstLetterCapital = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  return user ? (
    <div>
      <h1>{makeFirstLetterCapital(user.name)}&lsquo;s Profile</h1>
      <p>Email: {user.email}</p>
    </div>
  ) : (
    <p>Please log in</p>
  )
}

export default Profile
