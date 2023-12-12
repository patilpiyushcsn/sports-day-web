import { useEffect, useState } from "react";
import { Card } from "../../components/card/Card";
import { Event, EventsService } from "../../services/events.service";
import { RegisterEvent, UsersService } from "../../services/users.service";
import styles from "./Home.module.css";
import { useQuery, useMutation } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";

enum ActiveTab {
  AllEvents,
  SelectedEvents,
}

export const Home = () => {
  const [activeEvents, setAllEvents] = useState(ActiveTab.AllEvents);
  const [cardData, setCardData] = useState<Event[]>([]);

  // Get All Events
  const {
    data: allEventsData,
    refetch: allEventsRefetch,
    isSuccess: allEventsSuccess,
    status: allEventsSatus,
  } = useQuery<Event[], Error>({
    queryKey: ["allEvents"],
    queryFn: EventsService.getAllEvents,
  });

  // Get Selected Events
  const {
    data: selectedEventsData,
    refetch: selectedEventsRefetch,
    isSuccess: selectedEventsSuccess,
    status: selectedEventsSatus,
  } = useQuery<Event[], Error>({
    enabled: false,
    queryKey: ["registeredEvents"],
    queryFn: () => UsersService.getRegisteredEvents("65782d456c55fc2cdab3ce6f"),
  });

  useEffect(() => {
    if (allEventsSuccess && activeEvents === ActiveTab.AllEvents) {
      setCardData(allEventsData);
    }
  }, [allEventsSatus, activeEvents]);

  useEffect(() => {
    if (selectedEventsSuccess && activeEvents === ActiveTab.SelectedEvents) {
      setCardData(selectedEventsData);
    }
  }, [selectedEventsSatus, activeEvents]);

  // Register Event Mutation
  const {
    mutate: registerEventMutate,
    data: selectEventData,
    isSuccess: selectEventDataIsSuccess,
    status: selectEventDataStatus,
    error: selectEventError,
    isError: selectEventIsError,
  } = useMutation({
    mutationFn: UsersService.registerEvent,
  });

  useEffect(() => {
    console.log(selectEventData);
    console.log(selectEventData);
    if (selectEventIsError) {
      notify();
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
  });

  useEffect(() => {
    if (unRegisterEventSuccess) {
      setCardData(unRegisterEventData.events ?? []);
    }
  }, [unRegisterEventStatus]);

  const handleOnSelect = (sportEvent: Event) => {
    if (activeEvents === ActiveTab.AllEvents) {
      const registerEvent: RegisterEvent = {
        userId: "65782d456c55fc2cdab3ce6f",
        eventId: sportEvent?.id.toString(),
        event: sportEvent,
      };
      registerEventMutate(registerEvent);
    } else {
      const registerEvent: RegisterEvent = {
        userId: "65782d456c55fc2cdab3ce6f",
        eventId: sportEvent?.id.toString(),
      };
      unRegisterEventMutate(registerEvent);
    }
  };

  const activeEventsClass = `${styles.title} ${styles.selected}`;

  const handleAllEventsClick = () => {
    setAllEvents(ActiveTab.AllEvents);
    allEventsRefetch();
  };
  const handleSelectedEventsClick = () => {
    setAllEvents(ActiveTab.SelectedEvents);
    selectedEventsRefetch();
  };

  const notify = () => toast("Wow so easy!");

  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        <div
          className={
            activeEvents === ActiveTab.AllEvents
              ? activeEventsClass
              : styles.title
          }
          onClick={handleAllEventsClick}
        >
          All Events
        </div>
        <div
          className={
            activeEvents === ActiveTab.SelectedEvents
              ? activeEventsClass
              : styles.title
          }
          onClick={handleSelectedEventsClick}
        >
          Selected Events
        </div>
      </div>
      <div className={styles.cardsContainer}>
        {cardData?.map((sportEvent) => (
          <Card
            key={sportEvent.id}
            sportEvent={sportEvent}
            onClick={handleOnSelect}
            isRegister={activeEvents === ActiveTab.SelectedEvents}
          />
        ))}
      </div>
      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  );
};
