import { useEffect, useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Layers3 } from 'lucide-react'
import { firebaseConfigured } from '../config/firebase'
import { useAuth } from '../hooks/useAuth'

export default function Login() {
  const { signIn, register, user } = useAuth()
  const navigate = useNavigate()
  const [isRegistering, setIsRegistering] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (user) navigate('/dashboard', { replace: true })
  }, [navigate, user])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setSubmitting(true)

    try {
      if (isRegistering) {
        await register(email, password)
      } else {
        await signIn(email, password)
      }
      navigate('/dashboard', { replace: true })
    } catch {
      setError('No se pudo completar el acceso. Revisa tus datos e inténtalo de nuevo.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12">
      <section className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
        <div className="mb-8 flex items-center gap-3">
          <span className="rounded-xl bg-indigo-600 p-2.5 text-white">
            <Layers3 aria-hidden="true" size={22} />
          </span>
          <div>
            <p className="font-semibold text-slate-900">Xuega Dev</p>
            <p className="text-sm text-slate-500">xuegadevoctube2026</p>
          </div>
        </div>

        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
          {isRegistering ? 'Crea tu cuenta' : 'Bienvenido de nuevo'}
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          {isRegistering
            ? 'Regístrate para acceder a tu espacio.'
            : 'Inicia sesión para continuar.'}
        </p>

        {!firebaseConfigured && (
          <p className="mt-6 rounded-lg bg-amber-50 p-3 text-sm text-amber-800">
            Configura las variables de Firebase en el archivo .env para habilitar el acceso.
          </p>
        )}

        <form className="mt-7 space-y-5" onSubmit={handleSubmit}>
          <label className="block text-sm font-medium text-slate-700">
            Correo electrónico
            <input
              autoComplete="email"
              className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              onChange={(event) => setEmail(event.target.value)}
              required
              type="email"
              value={email}
            />
          </label>
          <label className="block text-sm font-medium text-slate-700">
            Contraseña
            <input
              autoComplete={isRegistering ? 'new-password' : 'current-password'}
              className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              minLength={6}
              onChange={(event) => setPassword(event.target.value)}
              required
              type="password"
              value={password}
            />
          </label>

          {error && (
            <p aria-live="polite" className="text-sm text-red-600">
              {error}
            </p>
          )}

          <button
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-3 font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={submitting || !firebaseConfigured}
            type="submit"
          >
            {submitting
              ? 'Un momento...'
              : isRegistering
                ? 'Crear cuenta'
                : 'Iniciar sesión'}
            <ArrowRight aria-hidden="true" size={18} />
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          {isRegistering ? '¿Ya tienes cuenta?' : '¿Aún no tienes cuenta?'}{' '}
          <button
            className="font-medium text-indigo-600 hover:text-indigo-700"
            onClick={() => {
              setIsRegistering(!isRegistering)
              setError('')
            }}
            type="button"
          >
            {isRegistering ? 'Inicia sesión' : 'Regístrate'}
          </button>
        </p>
      </section>
    </main>
  )
}
