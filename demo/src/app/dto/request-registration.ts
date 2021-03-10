export class RequestRegistration {
    private firstName : string;
    private lastName : string;
    private password : string;
    private email : string;

    public setFirstName(p_FirstName: string) {
        this.firstName = p_FirstName;
    }

    public getFirstName() : string {
        return this.firstName;
    }

    public setLastName(p_LastName : string) {
        this.lastName = p_LastName;
    }

    public getLastName() : string {
        return this.lastName;
    }

    public setPassword(password) {
        this.password = password
    }

    public getPassword(){
        return this.password
    }

    public setEmail(p_Email : string) {
        this.email = p_Email;
    }

    public getEmail() : string {
        return this.email;
    }
}
