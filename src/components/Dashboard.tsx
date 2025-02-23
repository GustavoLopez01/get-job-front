import { useAppSelector } from "../store/store"
import Jobs from "./DashboardEmplooye/Jobs"
import Main from "./DashboardRecruiter/Main"

export default function Dashboard() {
  const { roleId } = useAppSelector((state) => state.userSlice)
  if(roleId <= 0) return <></>
  return (
    <>
      <div className="w-full pt-5">
        {roleId === 1 ? (
          <Main />
        ) : (
          <>
            <Jobs />
          </>
        )}
      </div>
    </>
  )
}
