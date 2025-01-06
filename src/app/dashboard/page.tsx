"use client";

import React, { useContext } from 'react';
import Link from 'next/link';
import { HeroContext } from '@/context/Editar_Herois';
import styles from './dashboard.module.css';

function Dashboard() {
    const context = useContext(HeroContext);
    console.log(context?.listOfHeroes);

    function HeroInfo(props: { id: number, hero: string, img: string, superPowers: string }) {
        const isFavorite = context?.favoriteHeroes.includes(props.id);

        return (
            <tr key={props.id}>
                <td className={styles.tableCell}>{props.id}</td>
                <td className={styles.tableCell}>
                    <img src={props.img} alt={props.hero} className={styles.heroImage} />
                </td>
                <td className={styles.tableCell}>{props.hero}</td>
                <td className={styles.tableCell}>{props.superPowers ? props.superPowers : "N/D"}</td>
                <td className={styles.tableCell}>
                    <Link href={`/dashboard/${props.id}`}>
                        <button className={`${styles.actionButton} ${styles.editButton}`}>Editar</button>
                    </Link>
                    <button
                        onClick={() => context?.handleDelete(props.id)}
                        className={`${styles.actionButton} ${styles.deleteButton}`}
                    >
                        Eliminar
                    </button>
                    <button
                        onClick={() => context?.handleToggleFavorite(props.id)}
                        className={`${styles.actionButton} ${styles.favoriteButton}`}
                    >
                        {isFavorite ? "Remover Favorito" : "Adicionar Favorito"}
                    </button>
                </td>
            </tr>
        );
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Lista de Super-Heróis</h1>
            <Link href={`/dashboard/new_hero/`}>
                <button className={styles.addButton}>Adicionar Herói</button>
            </Link>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th className={styles.tableHeader}>ID</th>
                        <th className={styles.tableHeader}>Imagem</th>
                        <th className={styles.tableHeader}>Nome</th>
                        <th className={styles.tableHeader}>Superpoder</th>
                        <th className={styles.tableHeader}>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {context?.listOfHeroes.map((hero) => (
                        <HeroInfo key={hero.id} id={hero.id} hero={hero.hero} img={hero.img} superPowers={hero.superPowers} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Dashboard;
