import {
  getPokemonDescription,
  getPokemonList,
  getPokemonSpriteUrl,
  isPokemonFav,
  setPokemonFav,
} from "./api/utils";
import Select from "../components/Select/Select";
import Card from "@/components/Card/Card";
import styles from "@/styles/Home.module.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface Props {
  pokemonList: PokemonData[];
  currentPokemon: PokemonData;
}

interface Params {
  id: number;
}

interface StaticProps {
  params: Params;
}

function capitalize(name: string) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

function PokeDex({ pokemonList, currentPokemon }: Props) {
  const [isFavorite, setIsFavorite] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    process.env.NEXT_PUBLIC_URL &&
      router.push(process.env.NEXT_PUBLIC_URL + (Number(e.target.value) + 1));
  };

  const handlePrevClick = () => {
    process.env.NEXT_PUBLIC_URL &&
      router.push(process.env.NEXT_PUBLIC_URL + Number(currentPokemon?.id));
  };

  const handleNextClick = () => {
    process.env.NEXT_PUBLIC_URL &&
      router.push(
        process.env.NEXT_PUBLIC_URL + (Number(currentPokemon?.id) + 2)
      );
  };

  const handleFavClick = () => {
    setPokemonFav(currentPokemon?.id);
    setIsFavorite((prevState) => !prevState);
  };

  useEffect(() => {
    isPokemonFav(currentPokemon?.id).then((res) => setIsFavorite(res));
  }, [currentPokemon]);

  return (
    <div className={`${styles.wrapper}`}>
      <Select
        value={currentPokemon}
        handleChange={handleChange}
        selectedPokemonID={currentPokemon?.id}
      >
        {pokemonList.map((pokemon, i) => (
          <option key={pokemon.url} value={i}>
            {capitalize(pokemon.name)}
          </option>
        ))}
      </Select>
      <Card pokemon={currentPokemon} isFavorite={isFavorite} />
      <button className={`${styles.button}`} onClick={handleFavClick}>
        {!isFavorite ? "+ Add to fav" : "- Remove"}
      </button>
      <div className={`${styles.buttonsWrapper}`}>
        <button
          className={`${styles.button}`}
          disabled={currentPokemon?.id === 0}
          onClick={handlePrevClick}
        >
          Previous
        </button>
        <button
          className={`${styles.button}`}
          disabled={currentPokemon?.id === 149}
          onClick={handleNextClick}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export const getStaticPaths = async () => {
  const pokemonList: PokemonData[] = await getPokemonList();

  return {
    paths: pokemonList?.map((pokemon, i) => ({
      params: { id: (i + 1).toString() },
    })),
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params }: StaticProps) => {
  const pokemonList = await getPokemonList();
  const id = params?.id;
  const currentPokemonDescription = await getPokemonDescription(id);
  const currentPokemonImg = await getPokemonSpriteUrl(id);

  return {
    props: {
      pokemonList,
      currentPokemon: {
        id: Number(id) - 1,
        description: currentPokemonDescription,
        image: currentPokemonImg,
        name: capitalize(pokemonList[Number(id) - 1].name),
      },
    },
  };
};

export default PokeDex;
