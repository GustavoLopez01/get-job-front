import { useAppSelector } from "../store/store"
import Main from "./DashboardRecruiter/Main"

export default function Dashboard() {
    const { roleId } = useAppSelector((state) => state.userSlice)
    return (
        <>
            <div className="w-full pt-5">
                {roleId === 1 ? (
                    <Main />
                ) : (
                    <></>
                )}
            </div>
        </>
    )
}
