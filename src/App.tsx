import React from 'react';
import './sass/main.scss'
import './App.scss';
import {Header} from "./components/Header";
import {NewPatientForm} from "./components/NewPatientForm";
import {Person} from "./models/Person";
import {PatientsList} from "./components/PatientsList";
import {useLocalStorage} from "./hooks/useLocalStorage";

function App() {
    const [patients, setPatients] = useLocalStorage('patientList', [])




    const addPatient = (patient: Person) => {
        setPatients([...patients, patient])
    }

    const toggleAgreed = (id :string) => {
        const updatedPatients = patients.map((patient:Person) => {
            if (patient.id === id) {
                patient.agreed= !patient.agreed;
            }
            return patient;
        })
        setPatients(updatedPatients);
    }

    const clearList = () => {
        setPatients([]);
    }


    return (
        <div className="App">
            <Header/>
            <NewPatientForm addPatientFn={addPatient}/>
            <PatientsList patients={patients} toggleAgreed={toggleAgreed} clearListFn={clearList}/>
        </div>
    );
}

export default App;
