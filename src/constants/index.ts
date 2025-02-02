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

export const BACKGROUND_COLOR = [
    'rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(255, 159, 64, 0.2)',
]

export const BORDER_COLOR = [
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)',
]

export const LAT_LNG = {
  lat: 19.4350522,
  lng: -99.1411493,
}
