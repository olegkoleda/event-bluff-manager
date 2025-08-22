import { Calendar, Users, Trophy, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

type ViewType = "events" | "calendar" | "leaderboard" | "profile";

interface HeaderProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
  onCreateEvent: () => void;
}

const Header = ({ currentView, onViewChange, onCreateEvent }: HeaderProps) => {
  const navItems = [
    { id: "events" as const, label: "Events", icon: Calendar },
    { id: "calendar" as const, label: "Calendar", icon: Calendar },
    { id: "leaderboard" as const, label: "Leaderboard", icon: Trophy },
    { id: "profile" as const, label: "Profile", icon: Users },
  ] as const;

  return (
    <header className="bg-white border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <div className="flex items-center">
              <div className="w-8 h-8 poker-gradient rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-sm">♠</span>
              </div>
              <h1 className="text-xl font-bold text-foreground">PokerEvents</h1>
            </div>

            <nav className="hidden md:flex space-x-6">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => onViewChange(item.id)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      currentView === item.id
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              onClick={onCreateEvent}
              className="poker-gradient text-white hover:opacity-90"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Event
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
