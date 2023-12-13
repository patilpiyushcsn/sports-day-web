import { useEffect, useState } from "react";
import { Card } from "../../components/card/Card";
import { Event, EventsService } from "../../services/events.service";
import { RegisterEvent, UsersService } from "../../services/users.service";
import styles from "./Home.module.css";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";
import { AxiosError } from "axios";
import { userStore } from "../../store/user-store";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const queryClient = useQueryClient();
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [registeredEvents, setRegisteredEvents] = useState<Event[]>([]);
  const { userId } = userStore();
  const navigate = useNavigate();

  if (!userId) {
    navigate("/");
  }

  // Get All Events
  const {
    data: allEventsData,
    isSuccess: allEventsSuccess,
    status: allEventsSatus,
  } = useQuery<Event[], Error>({
    queryKey: ["allEvents"],
    queryFn: EventsService.getAllEvents,
  });

  // Get Selected Events
  const {
    data: selectedEventsData,
    isSuccess: selectedEventsSuccess,
    status: selectedEventsSatus,
  } = useQuery<Event[], Error>({
    queryKey: ["registeredEvents"],
    queryFn: () => UsersService.getRegisteredEvents(userId),
  });

  useEffect(() => {
    if (allEventsSuccess) {
      setAllEvents(allEventsData);
    }
  }, [allEventsSatus]);

  useEffect(() => {
    if (selectedEventsSuccess) {
      setRegisteredEvents(selectedEventsData);
    }
  }, [selectedEventsSatus]);

  // Register Event Mutation
  const {
    mutate: registerEventMutate,
    status: selectEventDataStatus,
    error: selectEventError,
    isError: selectEventIsError,
  } = useMutation({
    mutationFn: UsersService.registerEvent,
    onSuccess: () => {
      queryClient.resetQueries({ queryKey: ["registeredEvents"], exact: true });
    },
  });

  useEffect(() => {
    const eventError = selectEventError as AxiosError;
    if (selectEventIsError) {
      notify(eventError.response?.data?.body);
    }
  }, [selectEventDataStatus]);

  // UnRegister Event Mutation
  const {
    mutate: unRegisterEventMutate,
    isSuccess: unRegisterEventSuccess,
    status: unRegisterEventStatus,
    data: unRegisterEventData,
  } = useMutation({
    mutationFn: UsersService.unRegisterEvent,
    onSuccess: () => {
      queryClient.resetQueries({ queryKey: ["registeredEvents"], exact: true });
    },
  });

  useEffect(() => {
    if (unRegisterEventSuccess) {
      setRegisteredEvents(unRegisterEventData.events ?? []);
    }
  }, [unRegisterEventStatus]);

  const hasConflict = (existingEvents: Event[], newEvent: Event) => {
    for (const event of existingEvents) {
      if (
        event.start_time < newEvent.end_time &&
        event.end_time > newEvent.start_time
      ) {
        if (event.event_name === newEvent.event_name) {
          notify("Same event cannot be registered by the user twice");
        } else {
          notify(
            `Conflict between ${event.event_name} and ${newEvent.event_name}`
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
        notify("Maximum 3 events can be registered");
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
      navigate("/");
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
      navigate("/");
    }
  };

  const notify = (msg: string) => toast.error(msg);

  if (!allEvents) {
    return null;
  }

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
