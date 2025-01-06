"use client";

import React, { useContext, useEffect, useState } from "react";
import { HeroContext } from "@/context/Editar_Herois";
import { PUBLIC_ID, GetHeroesFromUsers } from "@/services/api";
import styles from "./content.module.css";
import Loader from "./Loader";

function Content() {  
  const context = useContext(HeroContext);
  const [loading, setLoading] = useState(true);

  function HeroInfo(props: { hero: string; img: string }) {
    return (
      <div className={styles.heroCard}>
        <img className={styles.heroImage} src={props.img} alt={props.hero} />
        <p className={styles.heroName}>{props.hero}</p>
      </div>
    );
  }

  const changeHeroes = () => {
    const newFavoriteHeroes: number[] = [];
    while (newFavoriteHeroes.length < 3) {
      const randomId =
        context?.listOfHeroes[
          Math.floor(Math.random() * context?.listOfHeroes.length)
        ].id;
      if (!newFavoriteHeroes.includes(randomId)) {
        newFavoriteHeroes.push(randomId);
      }
    }
    context?.setFavoriteHeroes(newFavoriteHeroes);
  };

  const showUserHeroes = (value: any) => {
    GetHeroesFromUsers(value).then((res) => {
      context?.setListUsers(res);
    });
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false); // Hide loader after data is loaded
    }, 3000);
  }, []);

  return (
    <>
    {loading && <Loader/>}
      {!loading && (
        <>
          <h1 className={styles.title}>Top-3 Characters</h1>

          <div className={styles.container}>
            {context?.listOfHeroes
              .filter((hero) => context?.favoriteHeroes.includes(hero.id))
              .map((hero, index) => (
                <HeroInfo key={index} hero={hero.hero} img={hero.img} />
              ))}
          </div>
          <div className={styles.buttonContainer}>
            <button
              className={styles.generateButton}
              onClick={changeHeroes}
            >
              Generate Heroes
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default Content;
