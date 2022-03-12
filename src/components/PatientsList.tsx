import React from "react";
import {Person} from "../models/Person";
import {Button, Container, List} from "@material-ui/core";
import {Patient} from "./Patient";

export const PatientsList = ({patients,toggleAgreed,clearListFn} : {patients: Person[], toggleAgreed:Function, clearListFn: Function}
) => {

    const handleClearList = () => clearListFn();


    return (
        <Container maxWidth={'md'}>
            <List>
                {patients.map( (pat:Person) => <Patient key={pat.id} patient={pat} toggleAgreedFn={toggleAgreed}/>)}
            </List>
            {patients.length > 0 && <Button variant='contained' onClick={handleClearList}>Wyczyść listę</Button>}
        </Container>
    )
}