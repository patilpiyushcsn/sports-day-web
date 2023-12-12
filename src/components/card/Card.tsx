import { Event } from "../../services/events.service";
import styles from "./Card.module.css";
import moment from "moment";

interface CustomEvent {
  sportEvent: Event;
  onClick: (sportEvent: Event) => void;
  isRegister?: boolean;
}

export const Card = ({
  sportEvent,
  onClick,
  isRegister = false,
}: CustomEvent) => {
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
        <div className={styles.buttonContainer}>
          <button onClick={() => onClick(sportEvent)}>{isRegister ? 'REMOVE' : 'SELECT'}</button>
        </div>
      </div>
    </div>
  );
};
