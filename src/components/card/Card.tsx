import { Event } from "../../services/events.service";
import styles from "./Card.module.css";
import moment from "moment";

interface CardEvent {
  sportEvent: Event;
  onClick: (sportEvent: Event) => void;
  isRegistered?: boolean;
}

export const Card = ({
  sportEvent,
  onClick,
  isRegistered = false,
}: CardEvent) => {
  const { event_category, event_name, start_time, end_time } = sportEvent;

  return (
    <div className={styles.cardContainer}>
      <div className={styles.vertical}>
        <h1>{event_category[0]}</h1>
      </div>
      <div className={styles.eventDetails}>
        <div className={styles.eventName}>{event_name}</div>
        <div>{`(${event_category})`}</div>
        <div>{`${moment(start_time).format("LT")} - ${moment(end_time).format(
          "LT"
        )}`}</div>
        <div className={`${styles.buttonContainer}`}>
          <button
            className={`${isRegistered ? styles.bgcRed : styles.bgcGreen}`}
            onClick={() => onClick(sportEvent)}
          >
            {isRegistered ? "REMOVE" : "SELECT"}
          </button>
        </div>
      </div>
    </div>
  );
};
