import { useEffect } from "react";
import { getJobsByUser } from "../../api/job-api";

export default function MyVacancies() {

    const getMyVacancies = async () => {
        try {
            const data = await getJobsByUser()            
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getMyVacancies()
    }, [])

    return (
        <div>MyVacancies</div>
    )
}
