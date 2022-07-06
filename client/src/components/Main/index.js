import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";




 
const SignIn = () => {
const [data,setData] = useState({
    token:""
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
                <h1>Create Account</h1>
                <Link to="/signup">
                    <button type="button" className={styles.white_btn}>
                        Sing up
                    </button>
                </Link>
            </div>
            <div className={styles.right}>
                <form className={styles.form_container} onSubmit={handleSubmit}>
                    <h1>Sign In</h1>
                    <input
                        type="number"
                        placeholder="Password"
                        name="password"
                        onChange={handleChange}
                        value={data.token}
                        required
                        className={styles.input}
                    />
                    {error && <div className={styles.error_msg}>{error}</div>}
                    <button type="submit" className={styles.green_btn}>
                        Sing In
                    </button>
                </form>
            </div>
        </div>
    </div>
);
};

export default SignIn;