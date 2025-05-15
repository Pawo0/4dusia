import React, { useState, useEffect } from "https://esm.sh/react/?dev";
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
        description: "Jako że nasza jubilantka bedzie po godzinach ciezkiej pracy, naprawdopodobniej bedzie potrzebowala napelnic swoj brzuch. I tutaj wystepuje pelna dowolnosc - z mocnym priorytetem w obrebie Bonarki. Oraz z personalna sugestia Domino's Pizza.",
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

function formatTimeLeft(milliseconds) {
    if (milliseconds <= 0) return "0";

    const seconds = Math.floor((milliseconds / 1000) % 60);
    const minutes = Math.floor((milliseconds / (1000 * 60)) % 60);
    const hours = Math.floor((milliseconds / (1000 * 60 * 60)) % 24);

    return `${hours}h ${minutes}m ${seconds}s`;
}

function App() {
    const [selectedActivity, setSelectedActivity] = useState(null);
    const [visibleActivities, setVisibleActivities] = useState([]);
    const [nextRevealTime, setNextRevealTime] = useState(null);
    const [timeToNextReveal, setTimeToNextReveal] = useState("");

    useEffect(() => {
        // Główna data rozpoczęcia
        const startDate = new Date(2025, 4, 15, 23, 0, 0);
        
        // Daty dla każdego kafelka
        const tileRevealDates = [
            startDate, // Pierwszy kafelek od razu
            new Date(2025, 4, 16, 2, 0, 0),  // Drugi kafelek o 2:00
            new Date(2025, 4, 16, 8, 0, 0),  // Trzeci kafelek o 5:00
            new Date(2025, 4, 16, 14, 0, 0),  // Czwarty kafelek o 8:00
            new Date(2025, 4, 16, 15, 30, 0), // Piąty kafelek o 11:00
            new Date(2025, 4, 16, 17, 0, 0)  // Szósty kafelek o 14:00
        ];

        const updateVisibleActivities = () => {
            const now = new Date();
            
            // Znajdź, ile kafelków powinno być widocznych
            let visibleCount = 0;
            for (let i = 0; i < tileRevealDates.length; i++) {
                if (now >= tileRevealDates[i]) {
                    visibleCount = i + 1;
                } else {
                    break;
                }
            }
            
            // Ogranicz do liczby dostępnych aktywności
            visibleCount = Math.min(visibleCount, birthdayActivities.length);
            
            // Utwórz listę widocznych ID
            const newVisibleActivities = birthdayActivities
                .slice(0, visibleCount)
                .map(activity => activity.id);
                
            setVisibleActivities(newVisibleActivities);
            
            // Oblicz czas do następnego odkrycia
            if (visibleCount < birthdayActivities.length) {
                const nextReveal = tileRevealDates[visibleCount];
                setNextRevealTime(nextReveal.getTime());
                
                const timeRemaining = nextReveal.getTime() - now.getTime();
                setTimeToNextReveal(formatTimeLeft(timeRemaining > 0 ? timeRemaining : 0));
            } else {
                setNextRevealTime(null);
                setTimeToNextReveal("");
            }
        };
        
        // Wywołaj funkcję od razu, aby ustawić początkowy stan
        updateVisibleActivities();
        
        // Aktualizuj co sekundę
        const interval = setInterval(() => {
            updateVisibleActivities();
        }, 1000);
        
        return () => clearInterval(interval);
    }, []);

    // Pomocnicza funkcja do odkrywania kolejnego kafelka (tylko do testów)
    const advanceTime = () => {
        if (visibleActivities.length < birthdayActivities.length) {
            const nextActivityId = birthdayActivities[visibleActivities.length].id;
            setVisibleActivities([...visibleActivities, nextActivityId]);
        }
    };

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
                    <p className="text-gray-300 text-xl mb-4">Kliknij na kafelek, aby zobaczyć szczegóły aktywności</p>

                    {visibleActivities.length < birthdayActivities.length && (
                        <div className="mb-6">
                            <p className="text-gray-300 text-lg">
                                Odkryto {visibleActivities.length} z {birthdayActivities.length} aktywności
                            </p>
                            <p className="text-yellow-400 text-lg">
                                Następna aktywność pojawi się za: {timeToNextReveal}
                            </p>
                        </div>
                    )}

                    {/*<button*/}
                    {/*    onClick={advanceTime}*/}
                    {/*    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"*/}
                    {/*>*/}
                    {/*    Odkryj kolejną aktywność (do testów)*/}
                    {/*</button>*/}
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {birthdayActivities
                        .filter(activity => visibleActivities.includes(activity.id))
                        .map((activity) => (
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