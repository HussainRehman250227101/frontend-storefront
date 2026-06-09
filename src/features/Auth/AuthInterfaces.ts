export interface signupPostInterface {
    username: string,
    password:string,
    email:string,
    first_name:string,
    last_name:string,
    phone:number,
    profile_iamge = File,
    birth_date:Date
}


export interface userDataInterface {
    username: string,
    email:string,
    first_name:string,
    last_name:string,
    phone:number,
    birth_date:Date
}

export interface signupResponseInterface {
    username: string,
    email:string,
    first_name:string,
    last_name:string
}

export interface loginInterface {
    username:string,
    password:string
}

export interface accessRefreshInterface {
    refresh : string,
    access : string
}

export interface UserInitital {
    user : userDataInterface | null,
    status : 'idle' | 'loading' | 'succeeded' | 'failed',
    error: string | null,
    isAuthenticated:boolean 
}

export interface userProfileInterface {
     username:string,
     email:string,
     first_name:string,
     last_name:string
}