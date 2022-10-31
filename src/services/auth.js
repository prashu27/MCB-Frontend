import users from '../data/users.json'

export const login = async (formData) => {
  const { email, password } = formData
  localStorage.removeItem('token')

  const userFound = users.find((user) => user.email === email)

  if (!userFound)
    return { status: 404, error: 'User with this email not found!!' }

  if (userFound.passowrd !== password)
    return {
      status: 400,
      error:
        'Invalid username or passowrd, Please check the entries and try again',
    }

  return { status: 200, data: userFound }

  //return await server().get(`login?email=${email}&password=${password}`)
}
