
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

export type User = {
    id: number
    fullName: string
    email: string
    password: string
    userAccount: {
        gender: string,
        age: number,
        isVerified: boolean
    }
}

export type JobToSave = Omit<Job, 'id' | 'createdAt' | 'updatedAt'> 

export type Route = {
    label: string
    value: string
}