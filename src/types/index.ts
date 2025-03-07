
export type Job = {
    id: number
    name: string
    description: string
    active: boolean
    salary: number
    showSalary: boolean
    details: string
    createdAt: string
    updatedAt: string
}

export type JobRequest = {
    id: number
    userId: number
    userAccountId: number
    jobId: number
}

export type JobInnerJobRequest = {
    id: number
    name: string
    description: string
    active: boolean
    salary: number
    showSalary: boolean
    details: string
    createdAt: string
    updatedAt: string
    jobRequests: JobRequest[]
}


export type User = {
    id: number
    name: string
    lastName: string
    email: string
    password: string
    roleId: number
    userAccount: {
        gender: string
        age: number
        isVerified: boolean
        verifyToken: string
    }
}

export type UserAccountSave = Omit<User, 'userAccount'> & {
    gender: string
    isVerified: boolean
    age: number
} 

export type DataUser = Omit<User, 'password'> & {
    roleId: number
}

export type JobToSave = Omit<Job, 'id' | 'createdAt' | 'updatedAt'> & {
    address: string
}

export type Route = {
    label: string
    value: string
}

export type MapStreet = {
    address: {
        city: string
        country_code: string
        postcode: string
        road: string
        state: string
    }
    lat: string
    lon: string
    display_name: string
}

export type UserSave = {
    name: '',
    lastName: '',
    roleId: 0,
    email: '',
    password: '',
}


export type FetchResponse = {
    message: string
    success: boolean
}

export type ResponseData = {
    success: boolean
}

export type State = {
    name: string
    key: string
}