const apis = () => {
    const local = 'http://localhost:5000';
    console.log("welcome to fetch apis");
    const list = {
        registerUser: `${local}/user/register`,
        loginUser: `${local}/user/login`,
        forgetPass: `${local}/user/forgetPass`,
        verifyOtp: `${local}/user/verifyOtp`,
        updatePass: `${local}/user/updatePass`,
    }
    return list;
}

export default apis;