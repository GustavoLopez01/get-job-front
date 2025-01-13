import Main from "./DashboardRecruiter/Main"

export default function Dashboard() {
    const roleId = Number(sessionStorage.getItem('role'))
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
