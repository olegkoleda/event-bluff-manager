export type ParticipationStatus = "confirmed" | "maybe" | null;

export type EventStatus = "upcoming" | "ongoing" | "completed" | "cancelled";

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  minParticipants: number;
  maxParticipants: number;
  currentParticipants: number;
  status: EventStatus;
  userParticipation: ParticipationStatus;
}

export interface Player {
  id: string;
  name: string;
  avatar: string;
  monthlyWins: number;
  yearlyWins: number;
  monthlyPoints: number;
  yearlyPoints: number;
  gamesPlayed: number;
  winRate: number;
}

export interface CreateEventData
  extends Omit<
    Event,
    "id" | "currentParticipants" | "status" | "userParticipation"
  > {
  // Additional fields specific to event creation
}

export interface LoginCredentials {
  email: string;
  password: string;
}
