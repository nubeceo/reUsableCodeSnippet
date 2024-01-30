// import all IDs and Api Endpoint from a specific file
import config from "../config/Config";

// import CLient Id Account from appwrite
import { Client, ID, Account } from 'appwrite'

// create all function inside a class so that anyfile can access it with just a object.{functionName}. 
// this is a best practice for clean and resusable code.
export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(config.APPWRITE_URL)
            .setProject(config.APPWRITE_PROJECT_ID);
        this.account = new Account(this.client)
    }

    // to rigister/signup a new user
    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);

            if (userAccount) {
                // call login function to login at the same time when the user register
                this.loginAccount({ email, password });

            } else {
                return userAccount;
            }

        } catch (error) {
            throw error;
        }
    }

    // to login user
    async loginAccount({ email, password }) {
        try {
            return await this.account.createEmailSession(email, password)
        } catch (error) {
            throw error;
        }
    }

    // to check if their is a already a session going
    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            throw error;
        }

        return null;
    }

    // to logout user
    async logoutAccount(){
        try {
            await this.account.deleteSessions();
        } catch (error) {
            throw error;
        }
    }
}

// create a object of the class
const authService = new AuthService();

// export the class
export default authService
