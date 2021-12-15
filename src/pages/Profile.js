import Header from "../components/Header"
import FormProfile from "../components/FormProfile"
import OverviewProfile from "../components/OverviewProfile"

const Profile = ()=> {
    return(
        <>
            <Header/>
            <div className="h-96 pt-24 container mx-auto">
                <div className="flex">
                    <OverviewProfile/>
                    <FormProfile/>
                </div>
            </div>
        </>
    )
}

export default Profile