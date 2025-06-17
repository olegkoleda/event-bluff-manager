
import React from 'react';
import { Calendar, Clock, MapPin, Users, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ParticipationButtons from './ParticipationButtons';

interface EventCardProps {
  event: {
    id: string;
    title: string;
    date: string;
    time: string;
    location: string;
    description: string;
    minParticipants: number;
    maxParticipants: number;
    currentParticipants: number;
    status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
    userParticipation?: 'confirmed' | 'maybe' | null;
  };
  onParticipationChange: (eventId: string, status: 'confirmed' | 'maybe' | null) => void;
}

const EventCard = ({ event, onParticipationChange }: EventCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'ongoing': return 'bg-green-100 text-green-800 border-green-200';
      case 'completed': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const isEventFull = event.currentParticipants >= event.maxParticipants;
  const participationRate = (event.currentParticipants / event.maxParticipants) * 100;

  return (
    <div className="bg-card rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground mb-2">{event.title}</h3>
            <Badge className={`${getStatusColor(event.status)} text-xs font-medium`}>
              {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
            </Badge>
          </div>
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            <MoreVertical className="w-4 h-4" />
          </Button>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="w-4 h-4 mr-2" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 mr-2" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Users className="w-4 h-4 mr-2" />
            <span>
              {event.currentParticipants}/{event.maxParticipants} participants
              {isEventFull && <span className="text-red-600 ml-1">(Full)</span>}
            </span>
          </div>
        </div>

        {event.description && (
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {event.description}
          </p>
        )}

        <div className="mb-4">
          <div className="flex justify-between text-xs text-muted-foreground mb-1">
            <span>Participation</span>
            <span>{Math.round(participationRate)}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="poker-gradient h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(participationRate, 100)}%` }}
            />
          </div>
        </div>

        <ParticipationButtons
          eventId={event.id}
          currentStatus={event.userParticipation}
          onStatusChange={onParticipationChange}
          disabled={event.status === 'completed' || event.status === 'cancelled'}
        />
      </div>
    </div>
  );
};

export default EventCard;
