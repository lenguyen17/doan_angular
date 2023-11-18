export class User {
    name: string = '';
    id: number = 0;
    username: string = '';
    password: string ='';
    constructor(name: string = '', id: number = 0, username: string ='', password: string = ''){
        this.name = name;
        this.id = id;
        this.username = username;
        this.password = password;
    }
}