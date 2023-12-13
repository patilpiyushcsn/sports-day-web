import { useEffect, useState } from "react";
import { Card } from "../../components/card/Card";
import { Event, EventsService } from "../../services/events.service";
import { RegisterEvent, UsersService } from "../../services/users.service";
import styles from "./Home.module.css";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";
import { userStore } from "../../store/user-store";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const queryClient = useQueryClient();
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [registeredEvents, setRegisteredEvents] = useState<Event[]>([]);
  const { userId } = userStore();
  const navigate = useNavigate();

  if (!userId) {
    useEffect(() => {
      navigate("/login");
    });
  }

  // Get All Events
  const {
    data: getAllEventsData,
    isSuccess: getAllEventsSuccess,
    status: getAllEventsSatus,
  } = useQuery<Event[], Error>({
    queryKey: ["getAllEvents"],
    queryFn: EventsService.getAllEvents,
  });

  useEffect(() => {
    if (getAllEventsSuccess) {
      setAllEvents(getAllEventsData);
    }
  }, [getAllEventsSatus]);

  // Get Registered Events
  const {
    data: getRegisteredEventsData,
    isSuccess: getRegisteredEventsSuccess,
    status: getRegisteredEventsSatus,
  } = useQuery<Event[], Error>({
    queryKey: ["getRegisteredEvents"],
    queryFn: () => UsersService.getRegisteredEvents(userId),
  });

  useEffect(() => {
    if (getRegisteredEventsSuccess) {
      setRegisteredEvents(getRegisteredEventsData);
    }
  }, [getRegisteredEventsSatus]);

  // Register Event Mutation
  const { mutate: registerEventMutate } = useMutation({
    mutationFn: UsersService.registerEvent,
    onSuccess: () => {
      queryClient.resetQueries({ queryKey: ["getRegisteredEvents"], exact: true });
    },
  });

  // UnRegister Event Mutation
  const {
    mutate: unRegisterEventMutate,
  } = useMutation({
    mutationFn: UsersService.unRegisterEvent,
    onSuccess: () => {
      queryClient.resetQueries({ queryKey: ["getRegisteredEvents"], exact: true });
    },
  });

  const hasConflict = (
    registeredEvents: Event[],
    unRegisteredEvent: Event
  ): boolean => {
    for (const registeredEvent of registeredEvents) {
      if (
        registeredEvent.start_time < unRegisteredEvent.end_time &&
        registeredEvent.end_time > unRegisteredEvent.start_time
      ) {
        if (registeredEvent.event_name === unRegisteredEvent.event_name) {
          broadcastToast(`Same event cannot be registered by the user twice`);
        } else {
          broadcastToast(
            `Conflict between ${registeredEvent.event_name} and ${unRegisteredEvent.event_name}`
          );
        }
        return true;
      }
    }
    return false;
  };

  const handleOnSelect = (sportEvent: Event) => {
    if (userId) {
      if (registeredEvents.length >= 3) {
        if (!hasConflict(registeredEvents, sportEvent)) {
          broadcastToast(`Maximum 3 events can be registered`);
        }
      } else {
        if (!hasConflict(registeredEvents, sportEvent)) {
          const registerEvent: RegisterEvent = {
            userId: userId,
            eventId: sportEvent?.id.toString(),
            event: sportEvent,
          };
          registerEventMutate(registerEvent);
        }
      }
    } else {
      navigate("/login");
    }
  };

  const handleOnRemove = (sportEvent: Event) => {
    if (userId) {
      const registerEvent: RegisterEvent = {
        userId: userId,
        eventId: sportEvent?.id.toString(),
      };
      unRegisterEventMutate(registerEvent);
    } else {
      navigate("/login");
    }
  };

  const broadcastToast = (message: string) => toast.error(message);

  return allEvents.length === 0 ? (
    <div className={styles.loader}>Loading...</div>
  ) : (
    <>
      <h1>Sports Day</h1>
      <div className={styles.sportsDayEventsContainer}>
        <div className={styles.eventsContainer}>
          <div className={styles.title}>All Events</div>
          <div className={styles.eventCardsContainer}>
            {allEvents?.map((sportEvent) => (
              <Card
                key={sportEvent.id}
                sportEvent={sportEvent}
                onClick={handleOnSelect}
                isRegistered={false}
              />
            ))}
          </div>
        </div>
        <div className={styles.eventsContainer}>
          <div className={styles.title}>Selected Events</div>
          <div className={styles.eventCardsContainer}>
            {registeredEvents?.map((sportEvent) => (
              <Card
                key={sportEvent.id}
                sportEvent={sportEvent}
                onClick={handleOnRemove}
                isRegistered={true}
              />
            ))}
          </div>
        </div>

        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            error: {
              style: {
                background: "red",
                color: "white",
              },
            },
          }}
        />
      </div>
    </>
  );
};
