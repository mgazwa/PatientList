import React from "react";
import {Person} from "../models/Person";
import {Container, List} from "@material-ui/core";
import {Patient} from "./Patient";

export const PatientsList = ({patients}: {patients: Person[]}) => {
    return (
        <Container maxWidth={'md'}>
            <List>
                {patients.map( (pat:Person) => <Patient key={pat.id} patient={pat}/>)}
            </List>
        </Container>
    )
}