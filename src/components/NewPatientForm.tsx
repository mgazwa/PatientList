import React, {useEffect, useState} from "react";
import {
    Button,
    Container, createStyles,
    FormGroup,
    InputLabel,
    makeStyles,
    MenuItem,
    Paper,
    Select,
    TextField, Theme
} from "@material-ui/core";
import {Alert} from "@material-ui/lab";
import {Person} from "../models/Person";
import {useInput} from "../hooks/useInput";

export const NewPatientForm = ({addPatientFn}: {addPatientFn: Function}) => {

    const [name,setName, nameFormParams] = useInput('');
    const [surname, setSurname, surnameFormParams] = useInput('');
    const [disease,setDisease, diseaseFormParams] = useInput('');
    const [time, setTime, timeFormParams] = useInput('');
    const [errors,setErrors] = useState<String[]>([]);



    const handleSubmit = (e:any) => {
        e.preventDefault()
        const tmpErrors: String[] = [];

        if(name.trim().length < 1){
            tmpErrors.push('Pole "Imię" nie może być puste');
        }

        if(surname.trim().length < 1){
            tmpErrors.push('Pole "Nazwisko" nie może być puste');

        }

        setErrors(tmpErrors);
        if (tmpErrors.length === 0) {
            const newPatient = new Person(name, surname, disease,time)
            addPatientFn(newPatient);
            setName('');
            setSurname('');
            setDisease('');
            setTime('');
        }
    }

    useEffect(()=> {
        if (time < 0) {
            setErrors(prevState => [...prevState, 'godzina nie może być ujemna'])
        }
    }, [time])

    const styles = makeStyles((theme:Theme) =>
       createStyles({
           form: {
               display: 'flex',
               justifyContent: 'space-between',
               alignItems: 'center',
               flexWrap: 'wrap'
           }
       })
    );
    const classes = styles();


    let errorsJsx = null;
    if(errors.length > 0){
        errorsJsx = errors.map((err:String, index:number) => <Alert key={index} severity={'error'}>{err}</Alert> )
    }
    return (
        <Paper>
            <Container maxWidth={'md'}>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <FormGroup>
                        <InputLabel>Imię</InputLabel>
                        <TextField {...nameFormParams} />
                        <InputLabel>Nazwisko</InputLabel>
                        <TextField {...surnameFormParams}/>
                    </FormGroup>
                    <FormGroup>
                        <InputLabel>Rozpoznanie</InputLabel>
                        <Select {...diseaseFormParams}>
                            <MenuItem value={'Koksartroza'}>Koksartroza</MenuItem>
                            <MenuItem value={'Gonartroza'}>Gonartroza</MenuItem>
                            <MenuItem value={'Zwyrodnienie stawów kręgosłupa'}>Zwyrodnienie stawów kręgosłupa</MenuItem>
                            <MenuItem value={'Złamanie'}>Złamanie</MenuItem>
                            <MenuItem value={'Zwichnięcie stawu'}>Zwichnięcie stawu</MenuItem>
                        </Select>
                    </FormGroup>
                    <FormGroup>
                        <InputLabel>Godzina wizyty</InputLabel>
                        <TextField type='time' {...timeFormParams}/>
                    </FormGroup>
                    {errorsJsx}
                    <Button type={"submit"} variant='contained' color='primary'>Umów wizytę</Button>
                </form>
            </Container>

        </Paper>
    )
}