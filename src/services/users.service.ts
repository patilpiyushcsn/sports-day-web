import { apiInstance } from "./api";
import { Event } from "./events.service";

export interface User {
  _id?: string;
  username: string;
  firstName: string;
  lastName: string;
  events?: Event[];
}

export interface RegisterEvent {
  userId: string;
  eventId: string;
  event?: Event;
}

export class UsersService {
  static createUser = async (user: User) => {
    await apiInstance.post("/users", user);
  };

  static login = async (username: string): Promise<User> => {
    const { data } = await apiInstance.post("/users/login", { username });

    return data.body as User;
  };

  static registerEvent = async (
    registerEvent: RegisterEvent
  ): Promise<User> => {
    const { data } = await apiInstance.put(
      `/users/${registerEvent.userId}/events/${registerEvent.eventId}/register`,
      { event: registerEvent.event }
    );
    return data;
  };

  static unRegisterEvent = async (
    registerEvent: RegisterEvent
  ): Promise<User> => {
    const { data } = await apiInstance.put(
      `/users/${registerEvent.userId}/events/${registerEvent.eventId}/unregister`
    );
    return data.body as User;
  };

  static getRegisteredEvents = async (userId: string): Promise<Event[]> => {
    const { data } = await apiInstance.get(
      `/users/${userId}/events/registered`
    );
    return data.body as Event[];
  };
}
