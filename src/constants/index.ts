export const BASE_URL = import.meta.env.VITE_PATH_JOB

export const GENERAL_ROUTES = [
    { label: "Inicio", value: "dashboard" },
    { label: "Mi perfil", value: "profile" },
]

export const ROUTES_RECRUITER = [
    { label: "Agregar vacante", value: "add-vacancy" },
    { label: "Mis vacantes", value: "my-vacancies" },
]

export const ROUTES_WORKER = [
    { label: "Mis postulaciones", value: "my-job-applications" }
]

export const CATEGORIES = [
    { 
        label: "Tecnología de la Información (TI) y Desarrollo de Software",
        value: "TI"
    },
    {
        label: "Salud y Medicina",
        value: "health"
    },
    {
        label: "Educación",
        value: "education"
    },
    {
        label: "Logística y Transporte",
        value: "logistic"
    },
    {
        label: "Construcción e Ingenieria",
        value: "engineering"
    },
    {
        label: "Finanzas y Contabilidad",
        value: "finance"
    }
]