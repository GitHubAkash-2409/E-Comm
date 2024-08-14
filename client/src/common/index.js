const backendDomain = "http://localhost:8080"

const SummaryApi = {
    signUp : {
        url : `${backendDomain}/api/signup`,
        method : "POST"
    },
    signIn : {
        url : `${backendDomain}/api/login`,
        method : "POST"
    },
    CurrentUserDetails : {
        url : `${backendDomain}/api/user-details`,
        method : "GET"
    },
    logOut : {
        url : `${backendDomain}/api/userLogout`,
        method : "GET"
    },
    allUser : {
        url : `${backendDomain}/api/all-users`,
        method : "GET"
    },
    updateUser : {
        url : `${backendDomain}/api/update-user`,
        method : "POST"
    }
}

export default SummaryApi