import React from 'react';

export default function MessageItem({ number, title, date, duration, imageUrl }) {
    return (
        <div className="message-item">
            <div className="message-number">{number}</div>

            {/* On utilise une div grise comme placeholder si pas d'image, ou une balise img */}
            <img src={imageUrl} alt={title} className="message-image" />

            <div className="message-title">
                {title}
            </div>

            <div className="message-meta">
                <span>Date: {date}</span>
                <span>Durée: {duration}</span>
                <a href="#" className="message-action">Écouter &rarr;</a>
            </div>
        </div>
    );
}