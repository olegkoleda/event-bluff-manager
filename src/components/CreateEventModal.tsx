import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import { CreateEventData } from "@/types";

interface CreateEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (eventData: CreateEventData) => void;
}

const CreateEventModal = ({
  isOpen,
  onClose,
  onSubmit,
}: CreateEventModalProps) => {
  const [formData, setFormData] = useState<CreateEventData>({
    title: "",
    date: "",
    time: "",
    location: "",
    description: "",
    minParticipants: 2,
    maxParticipants: 8,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      title: "",
      date: "",
      time: "",
      location: "",
      description: "",
      minParticipants: 2,
      maxParticipants: 8,
    });
    onClose();
  };

  const handleInputChange = (
    field: keyof CreateEventData,
    value: string | number
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Create New Poker Event
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium">
              Event Title
            </Label>
            <Input
              id="title"
              placeholder="Friday Night Poker"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              required
              className="w-full"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="date"
                className="text-sm font-medium flex items-center"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Date
              </Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange("date", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="time"
                className="text-sm font-medium flex items-center"
              >
                <Clock className="w-4 h-4 mr-2" />
                Time
              </Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) => handleInputChange("time", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="location"
              className="text-sm font-medium flex items-center"
            >
              <MapPin className="w-4 h-4 mr-2" />
              Location
            </Label>
            <Input
              id="location"
              placeholder="123 Main St, City, State"
              value={formData.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="minParticipants"
                className="text-sm font-medium flex items-center"
              >
                <Users className="w-4 h-4 mr-2" />
                Min Players
              </Label>
              <Input
                id="minParticipants"
                type="number"
                min="2"
                max="20"
                value={formData.minParticipants}
                onChange={(e) =>
                  handleInputChange("minParticipants", parseInt(e.target.value))
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxParticipants" className="text-sm font-medium">
                Max Players
              </Label>
              <Input
                id="maxParticipants"
                type="number"
                min={formData.minParticipants}
                max="20"
                value={formData.maxParticipants}
                onChange={(e) =>
                  handleInputChange("maxParticipants", parseInt(e.target.value))
                }
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Casual Texas Hold'em game with friends. Bring snacks!"
              rows={3}
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              className="resize-none"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="poker-gradient text-white">
              Create Event
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateEventModal;
