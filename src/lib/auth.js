import { getUsers, saveUsers } from "./userStore.js"

const TOKEN_KEY = "maipaws_token"
const USER_KEY = "maipaws_current_user"

export const isAuthed = () => Boolean(localStorage.getItem(TOKEN_KEY))

export const getCurrentUser = () => {
  const raw = localStorage.getItem(USER_KEY)
  return raw ? JSON.parse(raw) : null
}

export const loginMock = ({ email, password }) => {
  const users = getUsers()

  const found = users.find(
    (u) =>
      u.email.toLowerCase() === email.toLowerCase() &&
      u.password === password
  )

  if (!found) throw new Error("Invalid email or password")

  const safeUser = {
    id: found.id,
    email: found.email,
    role: found.role,
    profile: found.profile || {},
  }

  localStorage.setItem(TOKEN_KEY, "mock-token-" + Date.now())
  localStorage.setItem(USER_KEY, JSON.stringify(safeUser))

  return safeUser
}

// ✅ รองรับ profile เพิ่มเติม
export const registerMock = ({ email, password, profile }) => {
  const users = getUsers()

  const exists = users.some(
    (u) => u.email.toLowerCase() === email.toLowerCase()
  )
  if (exists) throw new Error("Email already exists")

  if (!password || password.length < 4) {
    throw new Error("Password must be at least 4 characters")
  }

  const newUser = {
    id: "u_" + Date.now(),
    email,
    password,
    role: "user",
    profile: {
      displayName: profile?.displayName || email.split("@")[0],
      firstName: profile?.firstName || "",
      lastName: profile?.lastName || "",
      phone: profile?.phone || "",
      birthday: profile?.birthday || "",
      avatarUrl: profile?.avatarUrl || "/avatars/default-user.png",
    },
  }

  saveUsers([...users, newUser])
  return newUser
}

export const logoutMock = () => {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}
