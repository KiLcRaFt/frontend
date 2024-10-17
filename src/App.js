import { useEffect, useState } from 'react';
import './App.css';

function App() {
    const [pakiautomaadid, setPakiautomaadid] = useState([]);
    const [pakiautomaadid2, setPakiautomaadid2] = useState([]);

    useEffect(() => {
        fetch("https://localhost:7094/ParcelMachine")
            .then(res => res.json())
            .then(json => setPakiautomaadid(json));
    }, []);

    useEffect(() => {
        fetch("https://localhost:7094/ParcelMachine/smartpost")
            .then(res => res.json())
            .then(json => setPakiautomaadid2(json));
    }, []);


    return (
        <div>
            <div className="App">
                <p>Omniva pakiautomaatid</p>
                <select>
                    {pakiautomaadid.map(automaat =>
                        <option>
                            {automaat.NAME}
                        </option>)}
                </select>
            </div>
            <div className="App">
                <p>Smartpost pakiautomaatid</p>
                <select>
                    {pakiautomaadid2.map(automaat =>
                        <option>
                            {automaat.address} {automaat.city} {automaat.availability}
                        </option>)}
                </select>
            </div>
        </div>
    );
}

export default App;