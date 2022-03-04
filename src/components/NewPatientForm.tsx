import React, {useState} from "react";
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

export const NewPatientForm = ({addPatientFn}: {addPatientFn: Function}) => {
    const [name,setName] = useState('');
    const [surname, setSurname] = useState('');
    const [disease,setDisease] = useState('');
    const [time, setTime] = useState('');
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

        if(isNaN(Number(time))){
            tmpErrors.push('Podaj godzinę w formacie gg.mm');
        }else if (Number(time) <= 0){
            tmpErrors.push('Należy wpisać liczbę dodatnią');
        }

        setErrors(tmpErrors);
        if (tmpErrors.length === 0) {
            const newPatient = new Person(name, surname, disease,Number(time))
            addPatientFn(newPatient);
            setName('');
            setSurname('');
            setDisease('');
            setTime('');
        }
    }

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
                        <TextField value={name} onChange={ (e:any) => setName(e.target.value)} />
                        <InputLabel>Nazwisko</InputLabel>
                        <TextField value={surname} onChange={ (e:any) => setSurname(e.target.value)}/>
                    </FormGroup>
                    <FormGroup>
                        <InputLabel>Rozpoznanie</InputLabel>
                        <Select value={disease} onChange={ (e:any) => setDisease(e.target.value)}>
                            <MenuItem value={'Koksartroza'}>Koksartroza</MenuItem>
                            <MenuItem value={'Gonartroza'}>Gonartroza</MenuItem>
                            <MenuItem value={'Zwyrodnienie stawów kręgosłupa'}>Zwyrodnienie stawów kręgosłupa</MenuItem>
                            <MenuItem value={'Złamanie'}>Złamanie</MenuItem>
                            <MenuItem value={'Zwichnięcie stawu'}>Zwichnięcie stawu</MenuItem>
                        </Select>
                    </FormGroup>
                    <FormGroup>
                        <InputLabel>Godzina wizyty</InputLabel>
                        <TextField value={time} onChange={ (e:any) => setTime(e.target.value)}/>
                    </FormGroup>
                    <Button type={"submit"} variant='contained' color='primary'>Umów wizytę</Button>
                </form>
            </Container>

        </Paper>
    )
}