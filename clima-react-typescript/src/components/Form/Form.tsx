import { useState, type ChangeEvent, type FormEvent } from "react";
import { countries } from "../../data/countries";
import styles from './Form.module.css';
import type { SearchType } from "../../types";
import Alert from "../Alert/Alert";

type FormProps = {
    fetchWeather: (search: SearchType) => Promise<void>
}

export default function Form({fetchWeather} : FormProps) {

    const [search, setSearch] = useState<SearchType>({
        city: '',
        country: ''
    })

    const [alert, setAlert] = useState('')

    const handleChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        setSearch({
            ...search,
            [event.target.name] : event.target.value
        })
    }

    const hanldeSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if(Object.values(search).includes('')){
            setAlert('Todos los campos son obligatorios')
            return
        }
        fetchWeather(search)
    }

    return (
        <form className={styles.form}
              onSubmit={hanldeSubmit}
        >
            {alert && <Alert>{alert}</Alert>}
            <div className={styles.field}>
                <label htmlFor="city">Ciudad:</label>
                <input 
                    id="city"
                    type="text"
                    name="city"
                    placeholder="Ciudad"
                    value={search.city}   
                    onChange={handleChange} 
                />
            </div>

            <div className={styles.field}>
                <label htmlFor="country">País:</label>
                <select
                    id="country"
                    value={search.country}
                    name="country"
                    onChange={handleChange}
                >
                    <option value="">-- Selecciones un País --</option>
                    {countries.map(country => (
                        <option 
                            key={country.code}
                            value={country.code}
                            >{country.name}
                        </option>
                    ))}
                </select>
            </div>

            <input className={styles.submit} type="submit" value='Consultar Clima' />
        </form>
    )
}
