import { useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  const [tooded, setTooded] = useState([]);
  const idRef = useRef();
  const nameRef = useRef();
  const priceRef = useRef();
  const isActiveRef = useRef();

  useEffect(() => {
    fetch("https://localhost:7094/tooded")
        .then(res => res.json())
        .then(json => setTooded(json));
  }, []);

  //////////////////////////////////////////////-->

  function kustuta(index) {
    fetch("https://localhost:7094/tooded/kustuta/" + index, {"method": "DELETE"})
        .then(res => res.json())
        .then(json => setTooded(json));
  }

  //////////////////////////////////////////////-->

  function lisa() {
    const uusToode = {
      "id": Number(idRef.current.value),
      "name": nameRef.current.value,
      "price": Number(priceRef.current.value),
      "isActive": isActiveRef.current.checked
    }
    fetch("https://localhost:7094/tooded/lisa", {"method": "POST", "body": JSON.stringify(uusToode)})
        .then(res => res.json())
        .then(json => setTooded(json));
  }

  //////////////////////////////////////////////-->

  function dollariteks() {
    const kurss = 1.1;                                      ////////////////////////
    fetch("https://localhost:7094/tooded/hind-dollaritesse/" + kurss, {"method": "PATCH"})
        .then(res => res.json())
        .then(json => setTooded(json));
  }

  //////////////////////////////////////////////-->

  return (
      <div className="App">
        <label>ID</label> <br />
        <input ref={idRef} type="number" /> <br />
        <label>Nimi</label> <br />
        <input ref={nameRef} type="text" /> <br />
        <label>Hind</label> <br />
        <input ref={priceRef} type="number" /> <br />
        <label>Aktiivne</label> <br />
        <input ref={isActiveRef} type="checkbox" /> <br />
        <button onClick={() => lisa()}>Lisa</button>
        {tooded.map((toode, index) =>
            <div>
              <div>{toode.id}</div>
              <div>{toode.name}</div>
              <div>{toode.price}</div>
              <button onClick={() => kustuta(index)}>x</button>
            </div>)}
        <button onClick={() => dollariteks()}>Muuda dollariteks</button>
      </div>
  );
}

export default App;