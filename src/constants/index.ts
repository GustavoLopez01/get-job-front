export const BASE_URL = import.meta.env.VITE_PATH_JOB


export const ROUTES_RECRUITER = [
    { label: "Inicio", value: "dashboard" },
    { label: "Agregar vacante", value: "add-vacancy" },
    { label: "Mis vacantes", value: "my-vacancies" },
    { label: "Mi perfil", value: "profile" },
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