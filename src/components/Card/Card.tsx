import Image from "next/image";
import styles from "./Card.module.css";

interface Props {
  pokemon: PokemonData;
  isFavorite: boolean;
}

function Card({ pokemon, isFavorite }: Props) {
  return (
    <div className={`${styles.card}`}>
      <div className={`${styles.imageDiv}`}>
        <Image
          src={pokemon.image}
          fill={true}
          sizes="200px"
          alt="selected pokemon image"
        />
      </div>
      <p className={`${styles.name}`}>{pokemon.name}</p>
      <p className={`${styles.description}`}>{pokemon.description}</p>
      {isFavorite && <span className={`${styles.heart}`}>&#10084;</span>}
    </div>
  );
}

export default Card;
