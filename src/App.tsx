import React, {useState} from 'react';
import './sass/main.scss'
import './App.scss';
import {Header} from "./components/Header";
import {NewPatientForm} from "./components/NewPatientForm";
import {Person} from "./models/Person";
import {PatientsList} from "./components/PatientsList";

function App() {
    const [patients, setPatients] = useState<Person[]>([]);

    const addPatient = (patient: Person) => {
        setPatients([...patients, patient])
    }
    return (
        <div className="App">
            <Header/>
            <NewPatientForm addPatientFn={addPatient}/>
            <PatientsList patients={patients}/>
        </div>
    );
}

export default App;
