 export class Student {

    id: number;
    private name: string;
    #gpa: number;
    set gpa(gpa) {
        this.#gpa = gpa;
    }
    get gpa() {
        return this.#gpa;

    }
    getName(){
        return this.name;
    }

    constructor(id:number,name:string,gpa:number){
        this.id=id;
        this.name=name;
        this.#gpa=gpa;
    }

}