"use client";

import React, { useState } from "react";

type Mode = "login" | "register" | "profile";

type AuthProfileFormProps = {
  mode?: Mode;
  onSubmit?: (data: any) => void;
  initialProfile?: {
    email?: string;
    first_name?: string;
    last_name?: string;
    birthdate?: string;
    street?: string;
    postal_code?: string;
    city?: string;
    phone?: string;
  };
};

export default function AuthProfileForm({
  mode = "login",
  onSubmit,
  initialProfile = {},
}: AuthProfileFormProps) {
  const [currentMode, setCurrentMode] = useState<Mode>(mode);

  // Champs login + register
  const [email, setEmail] = useState(initialProfile.email || "");
  const [password, setPassword] = useState("");

  // Champs inscription + profil
  const [firstName, setFirstName] = useState(initialProfile.first_name || "");
  const [lastName, setLastName] = useState(initialProfile.last_name || "");
  const [birthdate, setBirthdate] = useState(initialProfile.birthdate || "");

  // Champs profil
  const [street, setStreet] = useState(initialProfile.street || "");
  const [postalCode, setPostalCode] = useState(initialProfile.postal_code || "");
  const [city, setCity] = useState(initialProfile.city || "");
  const [phone, setPhone] = useState(initialProfile.phone || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (onSubmit) {
      const data: any = { email };

      if (currentMode !== "profile") data.password = password;

      if (currentMode !== "login") {
        data.first_name = firstName;
        data.last_name = lastName;
        data.birthdate = birthdate;
      }

      if (currentMode === "profile") {
        data.street = street;
        data.postal_code = postalCode;
        data.city = city;
        data.phone = phone;
      }

      onSubmit(data);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        {currentMode === "login" && "Connexion"}
        {currentMode === "register" && "Inscription"}
        {currentMode === "profile" && "Créer / Modifier votre Profil"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* REGISTER + PROFILE */}
        {(currentMode === "register" || currentMode === "profile") && (
          <>
            <div>
              <label className="block mb-1 font-medium">Prénom</label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Votre prénom"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Nom</label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Votre nom"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Date de naissance</label>
              <input
                type="date"
                className="w-full border rounded px-3 py-2"
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
              />
            </div>
          </>
        )}

        {/* Email */}
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            className="w-full border rounded px-3 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@example.com"
          />
        </div>

        {/* Password */}
        {currentMode !== "profile" && (
          <div>
            <label className="block mb-1 font-medium">Mot de passe</label>
            <input
              type="password"
              className="w-full border rounded px-3 py-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
            />
          </div>
        )}

        {/* PROFILE ONLY */}
        {currentMode === "profile" && (
          <>
            <div>
              <label className="block mb-1 font-medium">Rue</label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                placeholder="Rue et numéro"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Code postal</label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                placeholder="75000"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Ville</label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Paris"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Téléphone</label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+33 6 12 34 56 78"
              />
            </div>
          </>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {currentMode === "login" && "Se connecter"}
          {currentMode === "register" && "Créer mon compte"}
          {currentMode === "profile" && "Enregistrer le profil"}
        </button>
      </form>

      {/* Switch modes */}
      {currentMode !== "profile" && (
        <p className="text-center mt-4 text-sm">
          {currentMode === "login" ? (
            <>
              Pas de compte ?{" "}
              <button
                className="text-blue-600 underline"
                onClick={() => setCurrentMode("register")}
              >
                Créer un compte
              </button>
              <br />
              <button
                className="text-green-600 underline mt-2"
                onClick={() => setCurrentMode("profile")}
              >
                Continuer → Créer votre profil
              </button>
            </>
          ) : (
            <>
              Vous avez déjà un compte ?{" "}
              <button
                className="text-blue-600 underline"
                onClick={() => setCurrentMode("login")}
              >
                Se connecter
              </button>
            </>
          )}
        </p>
      )}
    </div>
  );
}
