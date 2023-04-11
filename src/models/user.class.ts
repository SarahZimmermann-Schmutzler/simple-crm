export class User {
    firstName: string;
    lastName: string;
    birthDate: number;
    street: string;
    number: number;
    zipcode: number;
    city: string;

    constructor(obj?: any) {
        this.firstName = obj ? obj.firstName : '';
        this.lastName = obj ? obj.lastName : '';
        this.birthDate = obj ? obj.birthDate : '';
        this.street = obj ? obj.street : '';
        this.number = obj ? obj.number : '';
        this.zipcode = obj ? obj.zipcode : '';
        this.city = obj ? obj.city : '';
    }
    // gebe in den construcor ein object vom typen any
    // ? verhilft dazu, dass wir object optional reingeben
    // nutzen es für if else abfrage
    // this.firstName ist der firstName des objects, sofern das object existiert; wenn nicht dann ''

    public toJSON() {
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            birthDate: this.birthDate,
            street: this.street,
            number: this.number,
            zipcode: this.zipcode,
            city: this.city
        };
    }
}