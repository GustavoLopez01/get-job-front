import { 
  Route, 
  Routes
} from "react-router";
import App from "../App";
import { JobList } from "../components/Job/JobList";
import { MainLayout } from "../layouts/MainLayout";

export default function RouterComponent() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<App />} />
        <Route path="dashboard" element={<JobList />} />
      </Route>
    </Routes>
  )
}
