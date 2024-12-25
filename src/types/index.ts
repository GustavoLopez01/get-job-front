
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

export type JobToSave = Omit<Job, 'id' | 'createdAt' | 'updatedAt'> 