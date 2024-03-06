import styles from "./CityItem.module.css";
import { useCities } from "../contexts/CitiesContext";
import { Link, useNavigate } from "react-router-dom";
const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

function CityItem({ city }) {
  const { cityName, emoji, date, id, position } = city;
  const { isLoading, currentCity, deleteCity } = useCities();

  async function handleDelete(id, e) {
    e.preventDefault();
    deleteCity(id);
  }

  return (
    <li>
      <Link
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
        className={`${styles.cityItem} ${
          currentCity.id === id ? styles["cityItem--active"] : ""
        }`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formatDate(date)})</time>
        <button
          onClick={(e) => handleDelete(id, e)}
          className={styles.deleteBtn}
        >
          &times;
        </button>
      </Link>
    </li>
  );
}

export default CityItem;
