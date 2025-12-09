"use client";

import React, { useState, useEffect } from "react";
import InputField from "../InputField";
import Button from "../Button";
import { AuthService } from "@/services";
import "./style.css";

type Mode = "login" | "register" | "profile";

type FormData = {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  birthdate: string;
  street: string;
  postal_code: string;
  city: string;
  phone: string;
};

type AuthResponse = {
  token?: string;
  user?: unknown;
};

type AuthProfileFormProps = {
  mode?: Mode;
  setTitle: (title: string) => void;
  onSubmit?: (data: AuthResponse) => void;
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
  setTitle,
  initialProfile = {},
}: AuthProfileFormProps) {
  const [currentMode, setCurrentMode] = useState<Mode>(mode);

  const [data, setData] = useState<FormData>({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    birthdate: "",
    street: "",
    postal_code: "",
    city: "",
    phone: "",
  });

  const handleChange = (field: keyof FormData, value: string) => {
    setData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  }

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    let response: AuthResponse = {};

    if (currentMode === "login") {
      response = await AuthService.login({
        email: data.email,
        password: data.password,
      });
    }

    if (currentMode === "register") {
      response = await AuthService.register({
        email: data.email,
        password: data.password,
        first_name: data.first_name,
        last_name: data.last_name,
        birthdate: data.birthdate,
        street: data.street,
        postal_code: data.postal_code,
        city: data.city,
        phone: data.phone,
      });

      setCurrentMode("login");
    }

    setData({
      email: "",
      password: "",
      first_name: "",
      last_name: "",
      birthdate: "",
      street: "",
      postal_code: "",
      city: "",
      phone: "",
    });

    // callback si fourni
    if (onSubmit) onSubmit(response);

  } catch (error: unknown) {
    console.error("Erreur du formulaire :", error);
  }
};


  useEffect(() => {
    setTitle(
      currentMode === "login"
        ? "Connexion"
        : currentMode === "register"
        ? "Inscription"
        : "Votre Profil"
    );
  }, [currentMode, setTitle]);

  return (
    <div className="AuthProfileForm-container">
      <form onSubmit={handleSubmit} className="Auth-form">
        {/* REGISTER + PROFILE */}
        {(currentMode === "register" || currentMode === "profile") && (
          <>
            <InputField
              id="first_name"
              name="first_name"
              label="Prénom"
              type="text"
              value={data.first_name}
              onChange={(value) => handleChange("first_name", value)}
              placeholder="John"
            />

            <InputField
              id="last_name"
              name="last_name"
              label="Nom"
              type="text"
              value={data.last_name}
              onChange={(value) => handleChange("last_name", value)}
              placeholder="Doe"
            />

            <InputField
              id="birthdate"
              name="birthdate"
              label="Date de naissance"
              type="date"
              value={data.birthdate}
              onChange={(value) => handleChange("birthdate", value)}
            />
          </>
        )}

        {/* Email */}
        <InputField
          id="email"
          name="email"
          label="Email"
          type="email"
          value={data.email}
          onChange={(value) => handleChange("email", value)}
          placeholder="email@example.com"
        />

        {/* Mot de passe seulement pour login/register */}
        {currentMode !== "profile" && (
          <InputField
            id="password"
            name="password"
            label="Mot de passe"
            type="password"
            value={data.password}
            onChange={(value) => handleChange("password", value)}
            placeholder="********"
          />
        )}

        {/* REGISTER ONLY */}
        {currentMode === "register" && (
          <>
            <InputField
              id="street"
              name="street"
              label="Rue"
              type="text"
              value={data.street}
              onChange={(value) => handleChange("street", value)}
              placeholder="5 Avenue des Champs-Élysées"
            />

            <InputField
              id="postal_code"
              name="postal_code"
              label="Code postal"
              type="text"
              value={data.postal_code}
              onChange={(value) => handleChange("postal_code", value)}
              placeholder="75000"
            />

            <InputField
              id="city"
              name="city"
              label="Ville"
              type="text"
              value={data.city}
              onChange={(value) => handleChange("city", value)}
              placeholder="Paris"
            />

            <InputField
              id="phone"
              name="phone"
              label="Téléphone"
              type="text"
              value={data.phone}
              onChange={(value) => handleChange("phone", value)}
              placeholder="+33 6 12 34 56 78"
            />
          </>
        )}

        <Button
          type="submit"
          label={
            currentMode === "login"
              ? "Se connecter"
              : currentMode === "register"
              ? "Créer mon compte"
              : "Enregistrer le profil"
          }
        />
      </form>

      {/* Switch modes */}
      {currentMode !== "profile" && (
        <div className="Auth-change-mode">
          {currentMode === "login" ? (
            <span onClick={() => setCurrentMode("register")}>
              Pas de compte ? Créer un compte
            </span>
          ) : (
            <span onClick={() => setCurrentMode("login")}>
              Vous avez déjà un compte ? Se connecter
            </span>
          )}
        </div>
      )}
    </div>
  );
}
