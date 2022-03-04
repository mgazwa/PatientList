import React from "react";
import {Checkbox, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import {Person} from "../models/Person";

export const Patient = ({patient} : {patient: Person}) => {
    return (
        <ListItem dense button>
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