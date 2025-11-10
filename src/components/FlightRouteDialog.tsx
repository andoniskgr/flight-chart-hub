import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AirportCombobox } from "@/components/AirportCombobox";
import { toast } from "sonner";
import { format } from "date-fns";

interface Aircraft {
  id: string;
  registration: string;
}

interface FlightRoute {
  id: string;
  flight_number: string;
  aircraft_id: string;
  origin: string;
  destination: string;
  departure_time: string;
  arrival_time: string;
  status: "scheduled" | "in_flight" | "completed" | "cancelled" | "delayed";
}

interface FlightRouteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  route: FlightRoute | null;
  aircraft: Aircraft[];
  onSuccess: () => void;
}

const FlightRouteDialog = ({ open, onOpenChange, route, aircraft, onSuccess }: FlightRouteDialogProps) => {
  const [formData, setFormData] = useState({
    flight_number: "",
    aircraft_id: "",
    origin: "",
    destination: "",
    departure_time: "",
    arrival_time: "",
    status: "scheduled" as "scheduled" | "in_flight" | "completed" | "cancelled" | "delayed",
  });
  const [loading, setLoading] = useState(false);

  // Convert UTC datetime to local datetime for input (datetime-local interprets as local time)
  // When editing, we need to show UTC time, so we'll display it as if it were local
  const formatDateTimeLocal = (utcDateString: string): string => {
    if (!utcDateString) return "";
    const utcDate = new Date(utcDateString);
    // Extract UTC components directly (treating UTC as if it were local for input)
    // This way the user sees and inputs UTC times
    const year = utcDate.getUTCFullYear();
    const month = String(utcDate.getUTCMonth() + 1).padStart(2, '0');
    const day = String(utcDate.getUTCDate()).padStart(2, '0');
    const hours = String(utcDate.getUTCHours()).padStart(2, '0');
    const minutes = String(utcDate.getUTCMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  // Convert datetime input to UTC
  // Since we're treating the input as UTC (even though browser sees it as local),
  // we need to create a UTC date from the input string
  const convertLocalToUTC = (dateTimeString: string): string => {
    if (!dateTimeString) return "";
    // Parse the datetime string (YYYY-MM-DDTHH:mm)
    // Treat the input as UTC time directly
    const [datePart, timePart] = dateTimeString.split('T');
    const [year, month, day] = datePart.split('-').map(Number);
    const [hours, minutes] = timePart.split(':').map(Number);
    
    // Create UTC date
    const utcDate = new Date(Date.UTC(year, month - 1, day, hours, minutes, 0));
    return utcDate.toISOString();
  };

  // Format UTC time for display (24-hour format)
  const formatUTCTime = (dateString: string): string => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return format(date, 'yyyy-MM-dd HH:mm') + ' UTC';
  };

  useEffect(() => {
    if (route) {
      setFormData({
        flight_number: route.flight_number,
        aircraft_id: route.aircraft_id,
        origin: route.origin,
        destination: route.destination,
        departure_time: formatDateTimeLocal(route.departure_time),
        arrival_time: formatDateTimeLocal(route.arrival_time),
        status: route.status,
      });
    } else {
      setFormData({
        flight_number: "",
        aircraft_id: aircraft[0]?.id || "",
        origin: "",
        destination: "",
        departure_time: "",
        arrival_time: "",
        status: "scheduled",
      });
    }
  }, [route, aircraft]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Convert local datetime inputs to UTC
      const data = {
        ...formData,
        departure_time: convertLocalToUTC(formData.departure_time),
        arrival_time: convertLocalToUTC(formData.arrival_time),
      };

      if (route) {
        const { error } = await supabase
          .from("flight_routes")
          .update(data)
          .eq("id", route.id);

        if (error) throw error;
        toast.success("Flight updated successfully");
      } else {
        const { error } = await supabase
          .from("flight_routes")
          .insert([data]);

        if (error) throw error;
        toast.success("Flight added successfully");
      }

      onSuccess();
      onOpenChange(false);
    } catch (error: any) {
      toast.error(error.message || "Failed to save flight");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{route ? "Edit Flight" : "Add Flight"}</DialogTitle>
          <DialogDescription>
            {route ? "Update flight route details" : "Schedule a new flight route"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="flight_number">Flight Number</Label>
              <Input
                id="flight_number"
                value={formData.flight_number}
                onChange={(e) => setFormData({ ...formData, flight_number: e.target.value })}
                placeholder="AA101"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="aircraft">Aircraft</Label>
              <Select 
                value={formData.aircraft_id} 
                onValueChange={(value) => setFormData({ ...formData, aircraft_id: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {aircraft.map((ac) => (
                    <SelectItem key={ac.id} value={ac.id}>
                      {ac.registration}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="origin">Origin</Label>
              <AirportCombobox
                value={formData.origin}
                onValueChange={(value) => setFormData({ ...formData, origin: value })}
                placeholder="Select origin airport..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="destination">Destination</Label>
              <AirportCombobox
                value={formData.destination}
                onValueChange={(value) => setFormData({ ...formData, destination: value })}
                placeholder="Select destination airport..."
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="departure_time">Departure Time (UTC, 24-hour format)</Label>
              <Input
                id="departure_time"
                type="datetime-local"
                value={formData.departure_time}
                onChange={(e) => setFormData({ ...formData, departure_time: e.target.value })}
                step="60"
                required
              />
              {formData.departure_time && (
                <p className="text-xs text-muted-foreground">
                  Will be saved as UTC: {formatUTCTime(convertLocalToUTC(formData.departure_time))}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="arrival_time">Arrival Time (UTC, 24-hour format)</Label>
              <Input
                id="arrival_time"
                type="datetime-local"
                value={formData.arrival_time}
                onChange={(e) => setFormData({ ...formData, arrival_time: e.target.value })}
                step="60"
                required
              />
              {formData.arrival_time && (
                <p className="text-xs text-muted-foreground">
                  Will be saved as UTC: {formatUTCTime(convertLocalToUTC(formData.arrival_time))}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select 
              value={formData.status} 
              onValueChange={(value: any) => setFormData({ ...formData, status: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="in_flight">In Flight</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="delayed">Delayed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? "Saving..." : route ? "Update" : "Add"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default FlightRouteDialog;
