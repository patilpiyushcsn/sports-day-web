import { apiInstance } from "./api";

export interface Event {
  _id: string;
  id: number;
  event_name: string;
  event_category: string;
  start_time: string;
  end_time: string;
}

export class EventsService {
  static getAllEvents = async (): Promise<Event[]> => {
    const { data } = await apiInstance.get("/events");
    return data.body as Event[];
  };
}
