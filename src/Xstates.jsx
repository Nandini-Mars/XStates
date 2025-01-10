import React, { useState } from 'react';
import { useEffect } from 'react';
import "./XStatesStyle.css";


const countryURL = "https://crio-location-selector.onrender.com/countries";
const stateURL = "https://crio-location-selector.onrender.com/country=%7BcountryName%7D/states";
const cityURL = "https://crio-location-selector.onrender.com/country=%7BcountryName%7D/state=%7BstateName%7D/cities";


const XStates = () => {
    const [country, setCountry] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState("");
    const [state, setState] = useState([]);
    const [selectedState, setSelectedState] = useState("");
    const [city, setCity] = useState([]);
    const [selectedCity, setSelectedCity] = useState("");

    const countryURL = "https://crio-location-selector.onrender.com/countries";
    const stateURL = `https://crio-location-selector.onrender.com/country=${selectedCountry}/states`;
    const cityURL = `https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`;

    useEffect(() => {
        const countryList = async () => {
            const response = await fetch(countryURL);
            //console.log(response);
           const responseData = await response.json();
          console.log(responseData);
            setCountry(responseData);
        }
        countryList();
    }, [])

    useEffect(() => {
        setSelectedState("");
        setSelectedCity("");

        const stateList = async () => {
            const response = await fetch(stateURL);
            //console.log(response);
           const responseData = await response.json();
          console.log(responseData);
          setState(responseData);
        }
        stateList();
    }, [selectedCountry])

    useEffect(() => {
        const cityList = async () => {
            const response = await fetch(cityURL);
            //console.log(response);
           const responseData = await response.json();
          console.log(responseData);
          setCity(responseData);
        }
        cityList();
    }, [selectedState])

    return(
        <div>
            <h1>Select Location</h1>
            <div className='select'>
            <form>
                <select 
                style={{ height: "50px" }}
                defaultValue=""
                name="selectedCountry"
                value={selectedCountry}
                onChange={(event) => (setSelectedCountry(event.target.value))}>
                <option value="" disabled>
                        Select Country
                    </option>
                    {country.map((country, idx) => (
                        <option key={idx} value={country}>
                            {country}
                        </option>
                    ))}
                </select>
            </form>
            <form>
                <select 
                style={{ height: "50px" }}
                disabled = {selectedCountry ? false:true}
                defaultValue=""
                name="selectedState"
                value={selectedState}
                onChange={(event)=>setSelectedState(event.target.value)}>
                <option value="" disabled>
                        Select State
                    </option>
                    {state.map((state, idx) => (
                        <option key={idx} value={state}>
                            {state}
                        </option>
                    ))}
                </select>
            </form>
            <form>
                <select 
                style={{ height: "50px" }} 
                disabled = {selectedState ? false:true}
                onChange={(event)=>setSelectedCity(event.target.value)}
                defaultValue="">
                <option value="" disabled>
                        Select City
                    </option>
                    {city.map((city, idx) => (
                        <option key={idx} value={city}>
                            {city}
                        </option>
                    ))}
                </select>
            </form>
            <br/>
            <br/>
            {selectedCity ? (
<>
<p>
<strong>You selected {selectedCity}</strong>, {selectedState}, {selectedCountry}
</p>
</>) : (
<></>
)}
            </div>
        </div>
    )

}

export default XStates;