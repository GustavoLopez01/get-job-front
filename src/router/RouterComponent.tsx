import { 
  Route, 
  Routes
} from "react-router";
import App from "../App";
import { MainLayout } from "../layouts/MainLayout";
import AddVacancy from "../components/Vacancy/AddVacancy";
import MyVacancies from "../components/Vacancy/MyVacancies";
import Profile from "../components/Profile/Profile";
import Dashboard from "../components/Dashboard";

export default function RouterComponent() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<App />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="add-vacancy" element={<AddVacancy />} />
        <Route path="my-vacancies" element={<MyVacancies />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  )
}
