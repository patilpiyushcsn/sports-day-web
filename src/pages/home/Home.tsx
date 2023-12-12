import { Card } from "../../components/card/Card";
import {
  Event,
  EventsService,
  RegisterEvent,
} from "../../services/events.service";
import styles from "./Home.module.css";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";

export const Home = () => {
  // Access the client
  const queryClient = useQueryClient();

  // Get All Events
  const { data } = useQuery<Event[], Error>({
    queryKey: ["events"],
    queryFn: EventsService.getAllEvents,
  });

  // Register Event Mutation
  const { mutate: registerEventMutate } = useMutation({
    mutationFn: EventsService.registerEvent,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });

  const handleOnSelect = (sportEvent: Event) => {
    const registerEvent: RegisterEvent = {
      id: "657744174660040513ae1554",
      eventId: sportEvent?.id.toString(),
      event: sportEvent,
    };
    registerEventMutate(registerEvent);
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>All Events</div>
      <div className={styles.cardsContainer}>
        {data?.map((sportEvent) => (
          <Card
            sportEvent={sportEvent}
            key={sportEvent.id}
            onClick={handleOnSelect}
          />
        ))}
      </div>
    </div>
  );
};
