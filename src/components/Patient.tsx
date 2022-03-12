import React from "react";
import {Checkbox, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import {Person} from "../models/Person";

export const Patient = ({patient, toggleAgreedFn} : {patient: Person, toggleAgreedFn:Function}) => {
    const handleAgreed = () => {
        toggleAgreedFn(patient.id);
    }
    return (
        <ListItem dense button onClick={handleAgreed}>
            <ListItemIcon>
                <Checkbox
                    edge={'start'}
                    checked={patient.agreed}
                    tabIndex={-1}
                    disableRipple
                />
            </ListItemIcon>
            <ListItemText>
                {patient.name} {patient.surname} {patient.disease} {patient.time}
            </ListItemText>
        </ListItem>
    )
}