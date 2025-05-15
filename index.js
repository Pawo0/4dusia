import React, { useState } from "https://esm.sh/react/?dev";
import ReactDOMClient from "https://esm.sh/react-dom/client/?dev";

const birthdayActivities = [
    {
        id: 1,
        time: "17:00 - 17:45",
        title: "Wyruszenie w podroz",
        description: "Swietowanie dnia urodzin rozpoczniemy od osobistego odebrania solenizatki z miejsca jej osrodku pozyskiwania surowcow materialnych niezbednych do przetrwania w miejskiej jungli",
        color: "bg-pink-500",
        icon: "fa-solid fa-car"
    },
    {
        id: 2,
        time: "NIESPODZIEWANIE",
        title: "Posiłek w trakcie podróży",
        description: "Tutaj wystepuje pelna dowolnosc - z mocnym priorytetem w obrebie Bonarki. Oraz z personalna sugestia Domino Pizza",
        color: "bg-purple-500",
        icon: "fa-solid fa-cutlery"
    },
    {
        id: 3,
        time: "19:00 - 20:30",
        title: "Wr000lkowanie",
        description: "Powrocimy wspomnieniami do odjazdowej jazdy na odjazdowych wrotkach. Tym razem postaramy sie za wszelka cene utrzymac w stanie nienaruszonym wszelakie konczyny solenizatki",
        color: "bg-yellow-500",
        icon: "fa-solid fa-wheelchair-alt"
    },
    {
        id: 4,
        time: "21:00 - 23:00",
        title: "Noc muzeów",
        description: "Wspólnie wybierzemy sie na nocne zwiedzanie muzeum. Nie byle jakiego! Bedzie mozna dokladnie przetestowac recznie wszystkie eksponaty. Widzimy sie w muzeum gier wideo!",
        color: "bg-green-500",
        icon: "fa-solid fa-gamepad"
    },
    {
        id: 5,
        time: "23:00 - 00:00",
        title: "Bezpieczny powrót do domu",
        description: "Po przezytych aktywnosciach nastapi wypragniony powrot do domu. Nie byle czym! Opel Corsa 1.2 2004r melduje sie na miejscu. Zapewniamy pelna mozliwosc sterowania towarzyszacym podkladem muzycznym",
        color: "bg-blue-500",
        icon: "fa-solid fa-fighter-jet"
    },
    {
        id: 6,
        time: "10.04.2022 - 4:3V3R",
        title: "Kochanie solenizantki",
        description: "(Nieprzerwanie w dni robocze)",
        color: "bg-red-500",
        icon: "fa-solid fa-heart"
    },
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
                        Plan Dnia Dusi
                        <i className="fa-solid fa-cake-candles text-yellow-400 ml-3"></i>
                    </h1>
                    <p className="text-gray-300 text-xl">Kliknij na kafelek, aby zobaczyć szczegóły aktywności</p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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