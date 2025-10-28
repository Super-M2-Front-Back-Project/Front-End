// components/ProfileCard.jsx
"use client"; // nécessaire si on utilise interactions côté client

import React from "react";

interface Profile {
  name: string;
  premon: string;
  email: string;
  role: string;
}

interface ProfileCardProps {
  profile: Profile | null;
  onClick?: (profile: Profile) => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile, onClick }) => {
  if (!profile) return <p>Profil non disponible.</p>;

  const { name, email, role } = profile;

  return (
    <div onClick={() => onClick && onClick(profile)}>
      <h3>{name}</h3>
      <p>Nom</p>
      <p>Prémon</p>
      <p>Email: {email}</p>
      <p>Rôle: {role}</p>
      <p>Télephone</p>
    </div>
  );
};

export default ProfileCard;
