import conf from "@/conf/conf";
// we have to deal with
// Client is responsible to talk to appwrite
import { Client, Account, ID } from "appwrite"


 // creating some types
type CreateUserAccount = {
    email: string;
    password: string;
    name: string;
}

type LoginUserAccount = {
    email: string;
    password: string;
}
// taken reference from client for setting up the connection
const appwriteClient = new Client()

appwriteClient.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId)
// taking reference from the account, exporting it so anyone can talk to account
export const account = new Account(appwriteClient)

export class AppwriteService {
    // create new record of user inside appwrite
    async createUserAccount({ email, password, name }: CreateUserAccount){
        try {
            const userAccount = await account.create(ID.unique(), email, password, name)
            if(userAccount){
                return this.login({ email, password })
            } else{
                return userAccount
            }
        } catch (error: any) {
            console.log("Appwrite error :: createUserAccount ",error)
            throw error
        }
    }
    // login user
    async login({ email, password }: LoginUserAccount){
        try {
            return await account.createEmailSession(email, password)
        } catch (error: any) {
            console.log("Appwrite error :: login :: ",error)
            throw error
        }
    }
    // it will return a user itself, thats y make it as promise
    async isLoggedIn(): Promise<boolean>{
        try {
            const data = await this.getCurrentUser()
            return Boolean(data)
        } catch (error: any) {}

        return false
    }
    // get current user details
    async getCurrentUser(){
        try {
            return account.get()
        } catch (error: any) {
            console.log("Appwrite error :: getCurrentUser :: ",error)
        }
        return null
    }
    // logout current user
    async logout(){
        try {
            return await account.deleteSession("current")
        } catch (error: any) {
            console.log("Appwrite error :: logout :: ",error)
        }
    }
}

// creating object of this class
const appwriteService = new AppwriteService()

// exporting this object
export default appwriteService