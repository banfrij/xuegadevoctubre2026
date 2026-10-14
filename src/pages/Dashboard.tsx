import { LogOut } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'

export default function Dashboard() {
  const { user, logOut } = useAuth()

  return (
    <main className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="container flex items-center justify-between py-4">
          <a className="font-semibold text-slate-900" href="/dashboard">
            Xuega Dev
          </a>
          <button
            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            onClick={() => void logOut()}
            type="button"
          >
            <LogOut aria-hidden="true" size={16} />
            Cerrar sesión
          </button>
        </div>
      </header>
      <section className="container py-12">
        <div className="grid-responsive">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-sm font-medium text-indigo-600">Panel</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
              ¡Hola!
            </h1>
            <p className="mt-3 text-slate-600">
              Has iniciado sesión como {user?.email}.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
