import { apiInstance } from "./api";

export interface User {
  _id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  events: Event[];
}

export interface Event {
  _id: string;
  id: number;
  event_name: string;
  event_category: string;
  start_time: string;
  end_time: string;
}

export interface RegisterEvent {
  id: string;
  eventId: string;
  event: Event;
}

export class EventsService {
  static createUser = async (user: User) => {
    await apiInstance.post("/users/create", user);
  };

  static login = async (userId: string) => {
    await apiInstance.post("/users/login", userId);
  };

  static getAllEvents = async (): Promise<Event[]> => {
    const { data } = await apiInstance.get("/events");
    return data.body as Event[];
  };

  //   static getRegisteredEvents = async (): Promise<Event[]> => {
  //     const { data } = await apiInstance.get("/events");
  //     return data.body as Event[];
  //   };

  static registerEvent = async (
    registerEvent: RegisterEvent
  ): Promise<User> => {
    const { data } = await apiInstance.put(
      `/users/${registerEvent.id}/events/${registerEvent.eventId}/register`,
      { event: registerEvent.event }
    );
    return data.body as User;
  };

  //   static unregisterEvent = async (): Promise<Event[]> => {
  //     const { data } = await apiInstance.get("/events");
  //     return data.body as Event[];
  //   };
}
