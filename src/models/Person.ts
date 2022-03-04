import {v4 as uuid} from 'uuid';

export class Person {

    id: string = uuid();
    name: string;
    surname: string;
    disease: string;
    time: number;
    agreed: boolean = false;


    constructor(name: string, surname: string, disease: string, time: number) {
        this.name = name;
        this.surname = surname;
        this.disease = disease;
        this.time = time;
    }
}