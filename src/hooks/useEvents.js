import { useEffect, useState } from "react";
import { getEvents } from "../services/eventService";

export default function useEvents() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
  const load = async () => {
    const data = await getEvents();
    setEvents(data);
  };

  load();
}, []);

  return { events };
}