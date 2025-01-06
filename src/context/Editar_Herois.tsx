import React, { createContext, useContext, useEffect, useState } from 'react';
import { redirect } from 'next/navigation';
import { PUBLIC_ID, PRIVATE_ID, GetUsers, GetHeroesFromUsers, GetTopHeroesFromUsers, UpdateSuperhero, UpdateTop } from '@/services/api';
type AppContextType = {
    users: any[];
    setListUsers: React.Dispatch<React.SetStateAction<any[]>>;
    listOfHeroes: any[];
    setListOfHeroes: React.Dispatch<React.SetStateAction<any[]>>;
    favoriteHeroes: number[];
    setFavoriteHeroes: React.Dispatch<React.SetStateAction<number[]>>;
    submitForm: (e: any, novo_heroi: any) => void;
    handleDelete: (id: number) => void;
    handleToggleFavorite: (id: number) => void;
};

export const HeroContext = createContext<AppContextType | undefined>(undefined);
export function HeroProvider({ children }: { children: React.ReactNode }) {
    const [listOfHeroes, setListOfHeroes] = useState<any[]>([]);
    const [favoriteHeroes, setFavoriteHeroes] = useState<any[]>([]);
    const [users, setListUsers] = useState<any[]>([]);

    useEffect(() => {
        GetUsers().then(res => {
            setListUsers(res);
        });
    }, []);

    useEffect(() => {
        GetHeroesFromUsers(PUBLIC_ID).then(res => {
            setListOfHeroes(res);
        });
    }, []);

    useEffect(() => {
        GetTopHeroesFromUsers(PUBLIC_ID).then(res => {
            setFavoriteHeroes(res);
        });
    }, []);

    const submitForm = (e: any, novo_heroi: any) => {
        e.preventDefault();

        setListOfHeroes((currentData) => {
            const updatedList = currentData.map((item) => {
                if (item.id === parseInt(novo_heroi.id)) {
                    return {
                        ...item,
                        hero: novo_heroi.name,
                        superPowers: novo_heroi.super_power,
                        img: novo_heroi.image_url,
                    };
                }
                return item;
            });

            if (!updatedList.some(item => item.id === parseInt(novo_heroi.id))) {
                updatedList.push({
                    id: currentData.length ? currentData[currentData.length - 1].id + 1 : 1,
                    hero: novo_heroi.name,
                    superPowers: novo_heroi.super_power,
                    img: novo_heroi.image_url,
                });
            }

            UpdateSuperhero(updatedList);
            return updatedList;
        });
        redirect('/dashboard');
    };

    const handleDelete = (id: number) => {
        setListOfHeroes(listOfHeroes.filter(hero => hero.id !== id));
        UpdateSuperhero(listOfHeroes.filter(hero => hero.id !== id));
    };

    const handleToggleFavorite = (id: number) => {
        if (favoriteHeroes.includes(id)) {
            setFavoriteHeroes(favoriteHeroes.filter(favId => favId !== id));
            UpdateTop(favoriteHeroes.filter(favId => favId !== id));
        } else {
            setFavoriteHeroes([...favoriteHeroes, id]);
            UpdateTop([...favoriteHeroes, id]);
        }
    };

    return (
        < HeroContext.Provider value={{ users, setListUsers, listOfHeroes, setListOfHeroes, favoriteHeroes, setFavoriteHeroes, submitForm, handleDelete, handleToggleFavorite }}>
            {children}
        </ HeroContext.Provider>
    );
}