

'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [remember, setRemember] = useState(false)

  function validate() {
    if (!email) return 'L\'email est requis.'
    // simple regex basique pour l'email
    const re = /^\S+@\S+\.\S+$/
    if (!re.test(email)) return "L\'adresse e-mail n\'est pas valide."
    if (!password) return 'Le mot de passe est requis.'
    if (password.length < 6) return 'Mot de passe trop court (≥ 6).'
    return null
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    const v = validate()
    if (v) return setError(v)

    setLoading(true)
    try {
      // Exemple d'appel à une API d'auth (implémenter côté serveur)
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, remember }),
      })

      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body?.message || 'Erreur lors de la connexion.')
      }

      // si succès, redirige vers tableau de bord
      router.push('/dashboard')
    } catch (err: any) {
      setError(err?.message || 'Erreur inconnue')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-semibold mb-2">Se connecter</h1>
        <p className="text-sm text-gray-500 mb-6">Connecte-toi pour accéder à ton espace.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="text-sm text-red-700 bg-red-50 border border-red-100 p-3 rounded">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">E‑mail</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-lg border-gray-200 shadow-sm p-2"
              placeholder="prenom@exemple.com"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Mot de passe</label>
            <div className="mt-1 relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-lg border-gray-200 shadow-sm p-2 pr-10"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                aria-label={showPassword ? 'Cacher le mot de passe' : 'Afficher le mot de passe'}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-sm opacity-70"
              >
                {showPassword ? 'Cacher' : 'Afficher'}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="inline-flex items-center gap-2">
              <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
              <span>Se souvenir de moi</span>
            </label>
            <a href="/forgot" className="text-blue-600 hover:underline">Mot de passe oublié ?</a>
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-blue-600 text-white font-medium hover:opacity-95 disabled:opacity-60"
            disabled={loading}
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">ou</div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => alert('Intégrer OAuth Google / NextAuth ici')}
            className="py-2 rounded-lg border border-gray-200 text-sm"
          >
            Continuer avec Google
          </button>

          <button
            type="button"
            onClick={() => alert('Intégrer OAuth GitHub / NextAuth ici')}
            className="py-2 rounded-lg border border-gray-200 text-sm"
          >
            Continuer avec GitHub
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-gray-600">
          Pas de compte ? <a href="/register" className="text-blue-600 hover:underline">S'inscrire</a>
        </p>
      </div>
    </div>
  )
}
