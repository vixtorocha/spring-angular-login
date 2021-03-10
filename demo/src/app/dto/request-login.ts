export class RequestLogin {
    email : string;
    password : string;

    public setUserName(p_Email : string) {
        this.email = p_Email;
    }

    public getUserName() : string {
        return this.email;
    }

    public setPassword(p_Password : string) {
        this.password = p_Password;
    }

    public getPassword() : string {
        return this.password;
    }
}
