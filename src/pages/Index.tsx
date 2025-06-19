import { useState } from "react";
import Header from "@/components/Header";
import EventCard from "@/components/EventCard";
import CreateEventModal from "@/components/CreateEventModal";
import LoginForm from "@/components/LoginForm";
import CalendarView from "@/components/CalendarView";
import Leaderboard from "@/components/Leaderboard";
import { Event, Player, CreateEventData, ParticipationStatus } from "@/types";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentView, setCurrentView] = useState<
    "events" | "calendar" | "leaderboard" | "profile"
  >("events");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [events, setEvents] = useState<Event[]>([
    {
      id: "1",
      title: "Friday Night Poker",
      date: "2024-06-21",
      time: "19:00",
      location: "123 Main St, Downtown",
      description:
        "Weekly Texas Hold'em tournament with friends. Bring your A-game!",
      minParticipants: 4,
      maxParticipants: 8,
      currentParticipants: 6,
      status: "upcoming",
      userParticipation: "confirmed",
    },
    {
      id: "2",
      title: "Weekend Championship",
      date: "2024-06-22",
      time: "14:00",
      location: "Poker Club Central",
      description: "Monthly championship event with bigger stakes and prizes.",
      minParticipants: 6,
      maxParticipants: 12,
      currentParticipants: 9,
      status: "upcoming",
      userParticipation: "maybe",
    },
    {
      id: "3",
      title: "Casual Monday Game",
      date: "2024-06-24",
      time: "18:30",
      location: "Coffee Shop Backroom",
      description:
        "Low-stakes friendly game for beginners and experienced players alike.",
      minParticipants: 3,
      maxParticipants: 6,
      currentParticipants: 4,
      status: "upcoming",
      userParticipation: null,
    },
  ]);

  const leaderboardData: Player[] = [
    {
      id: "1",
      name: "Alex Johnson",
      avatar: "",
      monthlyWins: 12,
      yearlyWins: 45,
      monthlyPoints: 2850,
      yearlyPoints: 12400,
      gamesPlayed: 28,
      winRate: 75,
    },
    {
      id: "2",
      name: "Sarah Chen",
      avatar: "",
      monthlyWins: 10,
      yearlyWins: 38,
      monthlyPoints: 2640,
      yearlyPoints: 11200,
      gamesPlayed: 32,
      winRate: 68,
    },
    {
      id: "3",
      name: "Mike Rodriguez",
      avatar: "",
      monthlyWins: 8,
      yearlyWins: 42,
      monthlyPoints: 2420,
      yearlyPoints: 13100,
      gamesPlayed: 35,
      winRate: 62,
    },
    {
      id: "4",
      name: "Emma Davis",
      avatar: "",
      monthlyWins: 7,
      yearlyWins: 29,
      monthlyPoints: 2180,
      yearlyPoints: 9800,
      gamesPlayed: 25,
      winRate: 58,
    },
    {
      id: "5",
      name: "James Wilson",
      avatar: "",
      monthlyWins: 6,
      yearlyWins: 33,
      monthlyPoints: 1950,
      yearlyPoints: 10600,
      gamesPlayed: 30,
      winRate: 55,
    },
  ];

  const handleLogin = (email: string, password: string) => {
    console.log("Login attempt:", email);
    setIsLoggedIn(true);
  };

  const handleCreateEvent = (eventData: CreateEventData) => {
    const newEvent: Event = {
      ...eventData,
      id: Date.now().toString(),
      currentParticipants: 1,
      status: "upcoming",
      userParticipation: "confirmed",
    };
    setEvents((prev) => [...prev, newEvent]);
  };

  const handleParticipationChange = (
    eventId: string,
    status: ParticipationStatus
  ) => {
    setEvents((prev) =>
      prev.map((event) =>
        event.id === eventId
          ? {
              ...event,
              userParticipation: status,
              currentParticipants:
                status === "confirmed"
                  ? event.currentParticipants +
                    (event.userParticipation === "confirmed" ? 0 : 1)
                  : event.userParticipation === "confirmed"
                  ? Math.max(0, event.currentParticipants - 1)
                  : event.currentParticipants,
            }
          : event
      )
    );
  };

  if (!isLoggedIn) {
    return <LoginForm onLogin={handleLogin} />;
  }

  const renderContent = () => {
    switch (currentView) {
      case "events":
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold">Your Poker Events</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onParticipationChange={handleParticipationChange}
                />
              ))}
            </div>

            {events.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  No events scheduled yet.
                </p>
              </div>
            )}
          </div>
        );

      case "calendar":
        return <CalendarView events={events} />;

      case "leaderboard":
        return <Leaderboard players={leaderboardData} />;

      case "profile":
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">Your Profile</h1>
            <div className="bg-card rounded-lg border border-border p-6">
              <p className="text-muted-foreground">
                Profile settings coming soon...
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        currentView={currentView}
        onViewChange={setCurrentView}
        onCreateEvent={() => setIsCreateModalOpen(true)}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>

      <CreateEventModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateEvent}
      />
    </div>
  );
};

export default Index;
