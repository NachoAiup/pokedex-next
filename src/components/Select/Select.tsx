import styles from "./Select.module.css";

interface CurrentPokemon {
  id: number;
  description: string;
  url: string;
}

interface Props {
  children: JSX.Element[];
  value: CurrentPokemon;
  selectedPokemonID: number;
  handleChange: (e: any) => void;
}

export default function Select({
  children,
  handleChange,
  selectedPokemonID,
}: Props) {
  return (
    <div className={`${styles.wrapper}`}>
      <select
        className={`${styles.select}`}
        value={selectedPokemonID}
        onChange={handleChange}
      >
        {children}
      </select>
    </div>
  );
}
