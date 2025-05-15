import React, { useState } from "https://esm.sh/react/?dev";
import ReactDOMClient from "https://esm.sh/react-dom/client/?dev";

const birthdayActivities = [
    {
        id: 1,
        time: "17:00",
        title: "Wyruszenie w podroz",
        description: "Swietowanie dnia urodzin rozpoczniemy od osobistego odebrania solenizatki z miejsca jej osrodku pozyskiwania surowcow materialnych niezbednych do przetrwania w miejsiek jungli",
        color: "bg-pink-500",
        icon: "fa-solid fa-mug-hot"
    },
    {
        id: 2,
        time: "9:30",
        title: "Śniadanie urodzinowe",
        description: "Ulubione śniadanie solenizanta",
        color: "bg-yellow-500",
        icon: "fa-solid fa-utensils"
    },
    {
        id: 3,
        time: "11:00",
        title: "Otwarcie prezentów",
        description: "Czas na rozpakowanie wszystkich niespodzianek",
        color: "bg-purple-500",
        icon: "fa-solid fa-gift"
    },
    {
        id: 4,
        time: "13:00",
        title: "Obiad z rodziną",
        description: "Wspólny obiad w gronie najbliższych",
        color: "bg-green-500",
        icon: "fa-solid fa-bowl-food"
    },
    {
        id: 5,
        time: "15:30",
        title: "Gry i zabawy",
        description: "Czas na wspólne gry i aktywności",
        color: "bg-blue-500",
        icon: "fa-solid fa-gamepad"
    },
    {
        id: 6,
        time: "18:00",
        title: "Tort urodzinowy",
        description: "Zdmuchnięcie świeczek i krojenie tortu",
        color: "bg-red-500",
        icon: "fa-solid fa-cake-candles"
    },
    {
        id: 7,
        time: "19:30",
        title: "Przyjęcie",
        description: "Przyjęcie z przyjaciółmi i znajomymi",
        color: "bg-indigo-500",
        icon: "fa-solid fa-champagne-glasses"
    },
    {
        id: 8,
        time: "22:00",
        title: "Pokaz fajerwerków",
        description: "Specjalny pokaz na zakończenie dnia",
        color: "bg-emerald-500",
        icon: "fa-solid fa-sparkles"
    }
];

function ActivityTile({ activity, isActive, onClick }) {
    return (
        <div
            className={`${activity.color} p-4 rounded-lg shadow-lg cursor-pointer transition-all transform hover:scale-105 ${isActive ? 'ring-4 ring-white' : ''}`}
            onClick={() => onClick(activity.id)}
        >
            <div className="flex items-center justify-between mb-2">
                <span className="text-white font-bold">{activity.time}</span>
                <i className={`${activity.icon} text-white text-xl`}></i>
            </div>
            <h3 className="text-white text-xl font-bold">{activity.title}</h3>
        </div>
    );
}

function ActivityDetails({ activity }) {
    if (!activity) return null;

    return (
        <div className={`${activity.color} p-6 rounded-lg shadow-lg mt-6 text-white`}>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-3xl font-bold">{activity.title}</h2>
                <span className="text-2xl">{activity.time}</span>
            </div>
            <div className="flex items-center mb-4">
                <i className={`${activity.icon} text-3xl mr-4`}></i>
                <p className="text-xl">{activity.description}</p>
            </div>
        </div>
    );
}

function App() {
    const [selectedActivity, setSelectedActivity] = useState(null);

    const handleActivityClick = (id) => {
        const activity = birthdayActivities.find(act => act.id === id);
        setSelectedActivity(activity);
    };

    return (
        <div className="min-h-screen bg-gray-900 p-8">
            <div className="max-w-6xl mx-auto">
                <header className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-white mb-2">
                        <i className="fa-solid fa-cake-candles text-yellow-400 mr-3"></i>
                        Plan Dnia Urodzinowego
                        <i className="fa-solid fa-cake-candles text-yellow-400 ml-3"></i>
                    </h1>
                    <p className="text-gray-300 text-xl">Kliknij na kafelek, aby zobaczyć szczegóły aktywności</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {birthdayActivities.map((activity) => (
                        <ActivityTile
                            key={activity.id}
                            activity={activity}
                            isActive={selectedActivity?.id === activity.id}
                            onClick={handleActivityClick}
                        />
                    ))}
                </div>

                {selectedActivity && <ActivityDetails activity={selectedActivity} />}
            </div>
        </div>
    );
}

const container = document.getElementById('root');
const root = ReactDOMClient.createRoot(container);
root.render(<App/>);