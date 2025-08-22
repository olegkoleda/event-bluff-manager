
import { Check, Clock, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ParticipationButtonsProps {
  eventId: string;
  currentStatus: 'confirmed' | 'maybe' | null;
  onStatusChange: (eventId: string, status: 'confirmed' | 'maybe' | null) => void;
  disabled?: boolean;
}

const ParticipationButtons = ({ 
  eventId, 
  currentStatus, 
  onStatusChange, 
  disabled = false 
}: ParticipationButtonsProps) => {
  const buttons = [
    {
      status: 'confirmed' as const,
      label: 'Confirmed',
      icon: Check,
      activeClass: 'bg-green-600 text-white border-green-600',
      inactiveClass: 'bg-white text-green-600 border-green-600 hover:bg-green-50'
    },
    {
      status: 'maybe' as const,
      label: 'Maybe',
      icon: Clock,
      activeClass: 'bg-yellow-600 text-white border-yellow-600',
      inactiveClass: 'bg-white text-yellow-600 border-yellow-600 hover:bg-yellow-50'
    },
    {
      status: null,
      label: 'Leave',
      icon: X,
      activeClass: 'bg-red-600 text-white border-red-600',
      inactiveClass: 'bg-white text-red-600 border-red-600 hover:bg-red-50'
    }
  ];

  return (
    <div className="flex space-x-2">
      {buttons.map((button) => {
        const Icon = button.icon;
        const isActive = currentStatus === button.status;
        
        return (
          <Button
            key={button.label}
            variant="outline"
            size="sm"
            disabled={disabled}
            onClick={() => onStatusChange(eventId, button.status)}
            className={`flex-1 ${
              isActive ? button.activeClass : button.inactiveClass
            } transition-colors duration-200`}
          >
            <Icon className="w-3 h-3 mr-1" />
            {button.label}
          </Button>
        );
      })}
    </div>
  );
};

export default ParticipationButtons;
