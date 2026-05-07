import React from 'react';
import Header from '../components/Header';
import MessageItem from '../components/MessageItem';

// Fausses données pour le MVP (à remplacer par Supabase plus tard)
const mockMessages = [
    {
        id: 1,
        number: "05",
        title: "Le problème du développement culturel d'aujourd'hui",
        date: "Janvier 21, 2024",
        duration: "45 Min",
        imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop"
    },
    {
        id: 2,
        number: "04",
        title: "Les messages cachés des paraboles",
        date: "Janvier 14, 2024",
        duration: "1h 4 Min",
        imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop"
    },
    {
        id: 3,
        number: "03",
        title: "Dans les coulisses de la création",
        date: "Janvier 07, 2024",
        duration: "56 Min",
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop"
    },
    {
        id: 4,
        number: "02",
        title: "L'art du mouvement dans la foi",
        date: "Décembre 31, 2023",
        duration: "40 Min",
        imageUrl: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=150&h=150&fit=crop"
    }
];

export default function Home() {
    return (
        <div>
            <Header />

            {/* Le gros titre façon Fyrre Magazine */}
            <h1 className="hero-title">MESSAGES</h1>

            {/* La liste des prédications */}
            <div className="messages-list">
                {mockMessages.map((msg) => (
                    <MessageItem
                        key={msg.id}
                        number={msg.number}
                        title={msg.title}
                        date={msg.date}
                        duration={msg.duration}
                        imageUrl={msg.imageUrl}
                    />
                ))}
            </div>
        </div>
    );
}