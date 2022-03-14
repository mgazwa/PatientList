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
        if(time === false){
            tmpErrors.push('Musisz podać godzinę');
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

        const pat ={ name, surname, disease, time };

        fetch('http://localhost:3001/patient',{
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(pat)
        }).then(() => {
            //todo redirect to list
            console.log('new patient added')
        })
    }

    useEffect(()=> {
        if (time < 0) {
            setErrors(prevState => [...prevState, 'godzina nie może być ujemna'])
        }
    }, [time])

    const styles = makeStyles((theme:Theme) =>
       createStyles({
           form: {
               height: "50vh",
               display: "flex",
               flexDirection: "column",
               alignItems: "stretch",
               justifyContent: "space-evenly",
               flexWrap: "nowrap"
           }
       })
    );
    const classes = styles();


    let errorsJsx = null;
    if(errors.length > 0){
        errorsJsx = errors.map((err:String, index:number) => <Alert key={index} severity={'error'}>{err}</Alert> )
    }

    // const obj = {
    //     name,
    //     surname,
    //     disease,
    //     time,
    // }

// useEffect(() =>{
//     fetch("http://localhost:3001", {
//     method: "POST",
//     body: JSON.stringify(obj),
//     headers: {
//         "Content-Type": "application/json"
//     }
// })
//     .then(response => response.json())
//     .then(data => {
//         console.log(data);
//     })
//     .catch(error => {
//         console.log(error);
//     });
// },[])



    return (
        <Paper>
            <Container maxWidth={'md'}>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <FormGroup>
                        <InputLabel/>
                        <TextField {...nameFormParams} id="outlined-basic" label="Imię" variant="outlined" />
                        <InputLabel/>
                        <TextField {...surnameFormParams} id="outlined-basic" label="Nazwisko" variant="outlined"/>
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
                    <Button type={"submit"} variant='contained' color='primary' size='large' >Umów wizytę</Button>
                </form>
            </Container>

        </Paper>
    )
}