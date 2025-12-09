// Événement personnalisé pour demander l'ouverture de la popup de connexion
export const OPEN_LOGIN_POPUP_EVENT = "openLoginPopup";

export function requestLoginPopup() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(OPEN_LOGIN_POPUP_EVENT));
  }
}
