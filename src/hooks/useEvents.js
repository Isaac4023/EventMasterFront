import { useEffect, useState } from "react";
import { getEvents } from "../services/eventService";

export default function useEvents() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    setEvents(getEvents());
  }, []);

  return { events };
}