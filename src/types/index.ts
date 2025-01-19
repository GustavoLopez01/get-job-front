
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
    fullName: string
    email: string
    password: string
    userAccount: {
        gender: string
        age: number
        isVerified: boolean
    }
}

export type DataUser = Omit<User, 'userAccount' | 'id' | 'password'> & {
    roleId: number
}

export type JobToSave = Omit<Job, 'id' | 'createdAt' | 'updatedAt'> 

export type Route = {
    label: string
    value: string
}