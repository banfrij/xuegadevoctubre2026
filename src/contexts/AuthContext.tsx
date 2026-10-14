import {
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from 'firebase/auth'
import { auth, firebaseConfigured } from '../config/firebase'
import { AuthContext, type AuthContextValue } from './auth-context'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(firebaseConfigured)

  useEffect(() => {
    if (!firebaseConfigured) return

    return onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })
  }, [])

  const value: AuthContextValue = {
    user,
    loading,
    signIn: async (email, password) => {
      await signInWithEmailAndPassword(auth, email, password)
    },
    register: async (email, password) => {
      await createUserWithEmailAndPassword(auth, email, password)
    },
    logOut: async () => {
      await signOut(auth)
    },
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
