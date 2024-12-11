import { 
  Route, 
  Routes
} from "react-router";
import App from "../App";
import { JobList } from "../components/Job/JobList";
import { MainLayout } from "../layouts/MainLayout";
import AddVacancy from "../components/Vacancy/AddVacancy";
import MyVacancies from "../components/Vacancy/MyVacancies";

export default function RouterComponent() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<App />} />
        <Route path="dashboard" element={<JobList />} />
        <Route path="add-vacancy" element={<AddVacancy />} />
        <Route path="my-vacancies" element={<MyVacancies />} />
      </Route>
    </Routes>
  )
}
