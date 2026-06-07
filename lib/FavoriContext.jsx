'use client'

import { createContext, useContext, useState, useEffect } from 'react'

const FavorisContext = createContext()

export function FavorisProvider({ children}) {
    const [favoris,setFavoris] = useState([])

    useEffect(() => {
        const stockes = localStorage.getItem('favoris')
        if (stockes) {
            setFavoris (JSON.parse(stockes))
        }
    }, [])

    const toggleFavori = (produit) => {
        setFavoris(prev => {
            const existe = prev.find(f => f.id === produit.id)
            let nouveauxFavoris
            if (existe) {
                nouveauxFavoris = prev.filter(f => f.id !== produit.id)
            } else{
                nouveauxFavoris = [...prev, produit]
            }
            localStorage.setItem('favoris', JSON.stringify(nouveauxFavoris))
            return nouveauxFavoris
        })
    }

    const estFavori = (id) => {
        return favoris.some(f => f.id === id)
    }

    return (
        <FavorisContext.Provider value={{ favoris, toggleFavori, estFavori}}>
            {children}
        </FavorisContext.Provider>
    )
}

export function useFavoris(){
    return useContext(FavorisContext)
}