import React from "react";
import "./style.css";

interface PopUpProps {
    title: string;
    content: React.ReactNode;
    onClose: () => void;
}

const PopUp: React.FC<PopUpProps> = ({ title, content, onClose }) => {
    return (
        <div className="popup-overlay">
            <div className="popup-title">
                <h2>{title}</h2>
                <p onClick={onClose}>X</p>
            </div>
            <div className="popup-content">{content}</div>
        </div>
    );
};

export default PopUp;