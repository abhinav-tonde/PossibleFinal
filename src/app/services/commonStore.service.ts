import { Injectable } from "@angular/core";
import { UserInfo } from "../Entities/UserInfo";
import { Reports } from "../Entities/ReportType";

@Injectable({
    providedIn:'root'
})
export class CommonStore{
    
    users:UserInfo[] = [
        {userName:"userEmail1@host.com", password:"111111", reports:new Reports()},
        {userName:"userEmail2@host.com", password:"222222", reports:new Reports()},
        {userName:"userEmail3@host.com", password:"333333", reports:new Reports()},
        {userName:"userEmail4@host.com", password:"444444", reports:new Reports()},
        {userName:"userEmail5@host.com", password:"555555", reports:new Reports()}
    ]

    updateReportForId(input:any){
        let user = this.getInfoFor(input)
        user.reports.vehicles = input.vehicles
        user.reports.types = input.types
        user.reports.emails = input.emails
    }

    getInfoFor(userId: any):UserInfo {

        for(let itr of this.users){
            if(itr.userName === userId){
                return itr;
            }
        }
        
        return {
            userName:"",
            password:"",
            reports:new Reports()
        };
        
    }
    
    getReportForUser(userId:any):Reports{
        
        for(let itr of this.users){
            if(itr.userName === userId){
                return itr.reports;
            }
        }

        return new Reports();
    }

    getAllUsers():UserInfo[]{
        return this.users;
    }

    login(userName:string, userPass:string):UserInfo|undefined{

        let user:UserInfo | undefined

        console.log(userName);
        console.log(userPass);
        

        for(let itr of this.users){
            console.log(itr);
            
            if(itr.userName === userName && itr.password === userPass){
                user = itr;
                break;
            }else{
                console.log(`Login failed over ${userName} & ${userPass} in the store service.`);
                user = undefined
            }

        }

        return user;
    }

}