import { defaultUsers } from "../components/mockdata/user.mock.js"

const USERS_KEY = "maipaws_users"

export const getUsers = () => {
  const raw = localStorage.getItem(USERS_KEY)
  if (raw) return JSON.parse(raw)

  // seed users ครั้งแรก
  localStorage.setItem(USERS_KEY, JSON.stringify(defaultUsers))
  return defaultUsers
}

export const saveUsers = (users) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}
