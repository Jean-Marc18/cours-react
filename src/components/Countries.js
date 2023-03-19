/* eslint-disable react/jsx-no-comment-textnodes */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Card from './Card';

const Countries = () => {
    const [data, setData] = useState([]);
    const [rangeValue, setRangeValue] = useState(36);
    const [selectRadio, setSelectRadio] = useState("")
    const radios = ["Africa", "America", "Asia", "Europe", "Oceania"]

    useEffect(() => {
        axios.get("https://restcountries.com/v3.1/all").then((res) => setData(res.data))
    }, [])
    return (

        <div className='countries'>
            <ul className="radio-container">
                <input type="range"
                    min="1"
                    max="250"
                    defaultValue={rangeValue}
                    onChange={(e) => setRangeValue(e.target.value)}
                />
                {
                    radios.map((continent) => (
                        <li>
                            <input type="radio"
                                name="continentRadio"
                                id={continent}
                                checked={continent === selectRadio}
                                onChange={(e) => setSelectRadio(e.target.id)}
                            />
                            <label htmlFor={continent}>{continent}</label>
                        </li>
                    ))
                }
            </ul>
            {
                // Si le radio est true c-a-d est active le bouton s'affiche
                selectRadio && <button onClick={() => setSelectRadio("")}>Annuler la recherche</button>
            }
            <ul>
                {
                    data
                        // Filtrer en fonction des continents de nos radios
                        .filter((country) => country.continents[0].includes(selectRadio))

                        // ranger les pays du plus grand au plus petit
                        .sort((a,b) => b.population - a.population)

                        // C'est pour afficher le nombre de pays grâce au range
                        .slice(0, rangeValue)

                        //afficher les pays et autres
                        .map((country, index) => (
                            <Card key={index} country={country} />
                        ))
                }
            </ul>
        </div>
    );
};
export default Countries;