'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SignUpPage() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [premon, setPremon] = useState('')
    const [adresse, setadresse] = useState('')
    const [telephone, setTelephone] = useState('')
    const [role, setRole] = useState('')

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
            const res = await fetch('/api/auth/sign-up', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            })
            
            if (!res.ok) {
                const body = await res.json().catch(() => ({}))
                throw new Error(body?.message || 'Erreur lors de l\'inscription.')
            }  
            // si succès, redirige vers la page de connexion
            router.push('/auth/sinn-up')
        } catch (err: any) {
            setError(err?.message || 'Erreur inconnue')
        } finally {
            setLoading(false)
        }
    }

    return (
        
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
                <h1 className="text-2xl font-semibold mb-2">S'inscrire</h1>
                <p className="text-sm text-gray-500 mb-6">Crée un compte pour commencer.</p>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            placeholder=" Entrez votre email"
                            required
                        />
                    </div>
                      <label htmlFor="nom" className="block text-sm font-medium text-gray-700">Nom</label>
                        <div className="relative">
                            <input
                                type="text"
                                id="nom"
                                value={premon}
                                onChange={(e) => setPremon(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                placeholder=" Entrez votre prénom"
                                required
                            />
                        </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Mot de passe</label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                placeholder=" Créez un mot de passe"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm text-gray-600"
                            >
                                {showPassword ? 'Cacher' : 'Montrer'}
                            </button>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="premon" className="block text-sm font-medium text-gray-700">Prénom</label>
                        <div className="relative">
                            <input
                                type="text"
                                id="premon"
                                value={premon}
                                onChange={(e) => setPremon(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                placeholder=" Entrez votre prénom"
                                required
                            />
                        </div>

                        <label htmlFor="adresse" className="block text-sm font-medium text-gray-700">Adresse</label>
                        <div className="relative">
                            <input
                                type="text"
                                id="adresse"
                                value={adresse}
                                onChange={(e) => setadresse(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                placeholder=" Entrez votre prénom"
                                required
                            />
                        </div>
                        <label htmlFor="telephone" className="block text-sm font-medium text-gray-700">telephone"</label>
                        <div className="relative">
                            <input
                                type="text"
                                id="telephone"
                                onChange={(e) => setTelephone(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                placeholder=" Entrez votre prénom"
                                required
                            />
                        </div>
                         <label htmlFor="role" className="block text-sm font-medium text-gray-700">role"</label>
                        <div className="relative">
                            <input
                                type="text"
                                id="role"
                                onChange={(e) => setRole(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                placeholder=" Entrez votre prénom"
                                required
                            />
                        </div>
                    </div>
                    {error && (
                        <div className="text-sm text-red-700 bg-red-50 border border-red-100 p-3 rounded">
                            {error}
                        </div>
                    )}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                    >
                        {loading ? 'Inscription...' : 'S\'inscrire'}
                    </button>
                </form>
            </div>
        </div>
    )
}   
