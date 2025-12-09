"use client";

import React from "react";
import type { User } from "@/services/auth.service";
import DisplayField from "../DisplayField";
import "./style.css";
import Button from "../Button";

interface UserProfileProps {
  user: User;
  onLogout: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, onLogout }) => {
  return (
    <div className="user-profile-popup">
      <div className="user-profile-fields">
        <DisplayField label="Prénom" value={user.first_name} />

        <DisplayField label="Nom" value={user.last_name} />

        <DisplayField label="Email" value={user.email} />

        {user.birthdate && (
          <DisplayField
            label="Date de naissance"
            value={new Date(user.birthdate).toLocaleDateString("fr-FR")}
          />
        )}

        {user.street && <DisplayField label="Rue" value={user.street} />}

        {user.postal_code && (
          <DisplayField label="Code postal" value={user.postal_code} />
        )}

        {user.city && <DisplayField label="Ville" value={user.city} />}

        {user.phone && <DisplayField label="Téléphone" value={user.phone} />}
      </div>

      <div className="user-actions">
        <Button label="Se déconnecter" onClick={onLogout} />
      </div>
    </div>
  );
};

export default UserProfile;
