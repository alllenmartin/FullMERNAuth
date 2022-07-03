import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

 
const SignUp = () => {
const [data,setData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    password:""
});

const navigate = useNavigate();
const [error, setError] = useState("");

const handleChange = ({currentTarget:input}) => {
    setData({...data, [input.name]: input.value })
}

const handleSubmit = async (event) => {
    event.preventDefault();

    try {
        const url = "http://localhost:8012/api/users";
        const {data:res} = await axios.post(url,data);
        navigate("/signin");
        console.log(res.message);
    } catch (error) {
        if(error.response && error.response.status >= 400 && error.response.status <=500)
        {
            setError(error.response.data.message)
        }
    }

}


return (
    <div className={styles.signup_container}>
        <div className={styles.signup_form_container}>
            <div className={styles.left}>
                <h1>Welcome Back</h1>
                <Link to="/signin">
                    <button type="button" className={styles.white_btn}>
                        Sing in
                    </button>
                </Link>
            </div>
            <div className={styles.right}>
                <form className={styles.form_container} onSubmit={handleSubmit}>
                    <h1>Create Account</h1>
                    <input
                        type="text"
                        placeholder="First Name"
                        name="firstName"
                        onChange={handleChange}
                        value={data.firstName}
                        required
                        className={styles.input}
                    />
                    <input
                        type="text"
                        placeholder="Last Name"
                        name="lastName"
                        onChange={handleChange}
                        value={data.lastName}
                        required
                        className={styles.input}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        onChange={handleChange}
                        value={data.email}
                        required
                        className={styles.input}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={handleChange}
                        value={data.password}
                        required
                        className={styles.input}
                    />
                    {error && <div className={styles.error_msg}>{error}</div>}
                    <button type="submit" className={styles.green_btn}>
                        Sing Up
                    </button>
                </form>
            </div>
        </div>
    </div>
);
};

export default SignUp;