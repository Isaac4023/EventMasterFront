import { useEffect, useState } from "react";
import { getEvents } from "../services/eventService";

export default function useEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const data = await getEvents();
      setEvents(data);
    } catch (error) {
      console.log("Error loading events:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    events,
    loading
  };
}