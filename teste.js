class User {
    constructor(name, password) {
        this.name = name;
        this.password = password;
    }

    static create (name, password) {
        return new User(name, password);
    }
}

console.log(User.create())