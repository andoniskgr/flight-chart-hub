import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu";
import { Plus, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { format, differenceInHours, differenceInMinutes, startOfDay, endOfDay, addDays } from "date-fns";
import FlightRouteDialog from "./FlightRouteDialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Aircraft {
  id: string;
  registration: string;
  aircraft_type: string;
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

const GanttView = () => {
  const [aircraft, setAircraft] = useState<Aircraft[]>([]);
  const [routes, setRoutes] = useState<FlightRoute[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<FlightRoute | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [routeToDelete, setRouteToDelete] = useState<FlightRoute | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Use UTC for timeline calculations
  const getUTCStartOfDay = (date: Date): Date => {
    const utcDate = new Date(Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      0, 0, 0, 0
    ));
    return utcDate;
  };

  const getUTCEndOfDay = (date: Date): Date => {
    const utcDate = new Date(Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate() + 1,
      0, 0, 0, 0
    ));
    return utcDate;
  };

  const dayStart = getUTCStartOfDay(currentTime);
  const dayEnd = getUTCEndOfDay(currentTime);

  const fetchData = async () => {
    try {
      const [aircraftRes, routesRes] = await Promise.all([
        supabase.from("aircraft").select("*").eq("status", "active").order("registration"),
        supabase.from("flight_routes").select("*").order("departure_time")
      ]);

      if (aircraftRes.error) throw aircraftRes.error;
      if (routesRes.error) throw routesRes.error;

      setAircraft(aircraftRes.data || []);
      setRoutes(routesRes.data || []);
    } catch (error: any) {
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Update current time every second for display, every minute for timeline position
  useEffect(() => {
    // Update immediately on mount
    setCurrentTime(new Date());
    
    // Update every second for accurate time display
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Update every second

    return () => clearInterval(timer);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-primary/20 text-primary border-primary/30";
      case "in_flight":
        return "bg-success/20 text-success border-success/30";
      case "completed":
        return "bg-muted text-muted-foreground";
      case "delayed":
        return "bg-warning/20 text-warning border-warning/30";
      case "cancelled":
        return "bg-destructive/20 text-destructive border-destructive/30";
      default:
        return "bg-muted";
    }
  };

  const getFlightPosition = (departureTime: string, arrivalTime: string) => {
    const departure = new Date(departureTime);
    const arrival = new Date(arrivalTime);
    
    // Convert to UTC for calculations
    const departureUTC = new Date(Date.UTC(
      departure.getUTCFullYear(),
      departure.getUTCMonth(),
      departure.getUTCDate(),
      departure.getUTCHours(),
      departure.getUTCMinutes(),
      departure.getUTCSeconds()
    ));
    const arrivalUTC = new Date(Date.UTC(
      arrival.getUTCFullYear(),
      arrival.getUTCMonth(),
      arrival.getUTCDate(),
      arrival.getUTCHours(),
      arrival.getUTCMinutes(),
      arrival.getUTCSeconds()
    ));
    
    const totalHours = differenceInHours(dayEnd, dayStart);
    const startOffset = differenceInHours(departureUTC, dayStart);
    const duration = differenceInHours(arrivalUTC, departureUTC);
    
    const left = (startOffset / totalHours) * 100;
    const width = (duration / totalHours) * 100;
    
    return { left: `${Math.max(0, left)}%`, width: `${Math.max(2, width)}%` };
  };

  const getCurrentTimePosition = () => {
    // Convert current time to UTC for position calculation
    const currentUTC = new Date(Date.UTC(
      currentTime.getUTCFullYear(),
      currentTime.getUTCMonth(),
      currentTime.getUTCDate(),
      currentTime.getUTCHours(),
      currentTime.getUTCMinutes(),
      currentTime.getUTCSeconds()
    ));
    
    const totalMinutes = differenceInMinutes(dayEnd, dayStart);
    const currentOffset = differenceInMinutes(currentUTC, dayStart);
    const position = (currentOffset / totalMinutes) * 100;
    return Math.max(0, Math.min(100, position)); // Clamp between 0 and 100
  };

  const handleEditFlight = (route: FlightRoute) => {
    setSelectedRoute(route);
    setDialogOpen(true);
  };

  const handleDeleteClick = (route: FlightRoute) => {
    setRouteToDelete(route);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!routeToDelete) return;

    try {
      const { error } = await supabase
        .from("flight_routes")
        .delete()
        .eq("id", routeToDelete.id);

      if (error) throw error;

      toast.success("Flight deleted successfully");
      setDeleteDialogOpen(false);
      setRouteToDelete(null);
      fetchData();
    } catch (error: any) {
      toast.error(error.message || "Failed to delete flight");
    }
  };

  if (loading) {
    return <div className="text-center py-8 text-muted-foreground">Loading schedule...</div>;
  }

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Flight Schedule</h2>
          <p className="text-sm text-muted-foreground">Gantt chart view of all flights</p>
        </div>
        <Button onClick={() => { setSelectedRoute(null); setDialogOpen(true); }}>
          <Plus className="h-4 w-4 mr-2" />
          Add Flight
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Timeline View</CardTitle>
              <CardDescription>
                {format(dayStart, "MMM dd, yyyy")} - {format(dayEnd, "MMM dd, yyyy")} (UTC)
              </CardDescription>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Local:</span>
                <span className="font-mono font-semibold">
                  {format(currentTime, "HH:mm:ss")}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">UTC:</span>
                <span className="font-mono font-semibold">
                  {String(currentTime.getUTCHours()).padStart(2, '0')}:
                  {String(currentTime.getUTCMinutes()).padStart(2, '0')}:
                  {String(currentTime.getUTCSeconds()).padStart(2, '0')}
                </span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Time Header */}
            <div className="flex border-b border-border pb-2 relative">
              <div className="w-48 font-semibold text-sm">Aircraft</div>
              <div className="flex-1 relative px-2">
                {/* Hourly vertical lines in header */}
                {Array.from({ length: 25 }, (_, i) => {
                  const hourPosition = (i / 24) * 100;
                  return (
                    <div
                      key={`header-hour-${i}`}
                      className="absolute top-0 bottom-0 w-px bg-border/50"
                      style={{ left: `${hourPosition}%` }}
                    />
                  );
                })}
                
                {/* Current time indicator in header (UTC based) */}
                {(() => {
                  const currentUTC = new Date(Date.UTC(
                    currentTime.getUTCFullYear(),
                    currentTime.getUTCMonth(),
                    currentTime.getUTCDate(),
                    currentTime.getUTCHours(),
                    currentTime.getUTCMinutes(),
                    currentTime.getUTCSeconds()
                  ));
                  const isVisible = currentUTC >= dayStart && currentUTC <= dayEnd;
                  return isVisible && (
                    <div
                      className="absolute top-0 bottom-0 w-0.5 bg-red-500 z-10"
                      style={{ left: `${getCurrentTimePosition()}%` }}
                    >
                      <div className="absolute -top-1 -left-1 w-3 h-3 bg-red-500 rounded-full" />
                    </div>
                  );
                })()}
                
                {/* Hour labels (UTC) */}
                <div className="flex justify-between text-xs text-muted-foreground relative z-0">
                  {Array.from({ length: 25 }, (_, i) => (
                    <span key={i}>{String(i).padStart(2, '0')}:00</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Gantt Rows */}
            {aircraft.map((ac) => {
              const aircraftRoutes = routes.filter((r) => r.aircraft_id === ac.id);
              
              return (
                <div key={ac.id} className="flex items-center border-b border-border/50 pb-4">
                  <div className="w-48 pr-4">
                    <div className="font-semibold text-sm">{ac.registration}</div>
                    <div className="text-xs text-muted-foreground">{ac.aircraft_type}</div>
                  </div>
                  <div className="flex-1 relative h-12 bg-muted/30 rounded">
                    {/* Hourly vertical lines */}
                    {Array.from({ length: 25 }, (_, i) => {
                      const hourPosition = (i / 24) * 100;
                      return (
                        <div
                          key={`hour-${i}`}
                          className="absolute top-0 bottom-0 w-px bg-border/50"
                          style={{ left: `${hourPosition}%` }}
                        />
                      );
                    })}
                    
                    {/* Current time indicator (red line) - UTC based */}
                    {(() => {
                      const currentUTC = new Date(Date.UTC(
                        currentTime.getUTCFullYear(),
                        currentTime.getUTCMonth(),
                        currentTime.getUTCDate(),
                        currentTime.getUTCHours(),
                        currentTime.getUTCMinutes(),
                        currentTime.getUTCSeconds()
                      ));
                      const isVisible = currentUTC >= dayStart && currentUTC <= dayEnd;
                      return isVisible && (
                        <div
                          className="absolute top-0 bottom-0 w-0.5 bg-red-500 z-10"
                          style={{ left: `${getCurrentTimePosition()}%` }}
                        >
                          <div className="absolute -top-1 -left-1 w-3 h-3 bg-red-500 rounded-full" />
                        </div>
                      );
                    })()}
                    
                    {aircraftRoutes.map((route) => {
                      const { left, width } = getFlightPosition(
                        route.departure_time,
                        route.arrival_time
                      );
                      
                      return (
                        <ContextMenu key={route.id}>
                          <ContextMenuTrigger asChild>
                            <div
                              className="absolute h-10 top-1 cursor-pointer group z-20"
                              style={{ left, width }}
                            >
                              <Badge
                                className={`${getStatusColor(route.status)} w-full h-full flex flex-col items-center justify-center p-1 text-xs`}
                                variant="outline"
                              >
                                <span className="font-semibold truncate w-full text-center">
                                  {route.flight_number}
                                </span>
                                <span className="text-[10px] truncate w-full text-center">
                                  {route.origin} → {route.destination}
                                </span>
                              </Badge>
                            </div>
                          </ContextMenuTrigger>
                          <ContextMenuContent>
                            <ContextMenuItem onClick={() => handleEditFlight(route)}>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Flight
                            </ContextMenuItem>
                            <ContextMenuItem 
                              onClick={() => handleDeleteClick(route)}
                              className="text-destructive focus:text-destructive"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete Flight
                            </ContextMenuItem>
                          </ContextMenuContent>
                        </ContextMenu>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <FlightRouteDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        route={selectedRoute}
        aircraft={aircraft}
        onSuccess={fetchData}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Flight</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete flight {routeToDelete?.flight_number}? 
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default GanttView;
