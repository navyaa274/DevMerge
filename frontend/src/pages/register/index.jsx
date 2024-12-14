import React, { useEffect, useState } from 'react';
import '../../styles/style.css'
import logo from "../../svgs/dv1.jpg"
import googleImg from '../../assets/images/google.png';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../redux/actions/userActions.js';
import { toast } from 'react-toastify';
import toastOptions from '../../constants/toast';

const Register = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [details, setDetails] = useState({
    name: '',
    username: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    passwordMatch: null
  })

  const { loading, message, error, id, isAuthenticated } = useSelector(state => state.userAuth)

  const handleChange = (e) => {
    const { name, value } = e.target;

    setDetails({
        ...details,
        [name]: value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted", details); // Debugging line

    if (details.password !== details.confirmPassword) {
      setDetails((prevDetails) => ({
        ...prevDetails,
        passwordMatch: false, // Update passwordMatch state
      }));
      toast.warning('Passwords do not match. Please re-enter the passwords.', toastOptions);
    } else {
      setDetails((prevDetails) => ({
        ...prevDetails,
        passwordMatch: true, // Update passwordMatch state
      }));
      dispatch(registerUser(details));
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setDetails((prevDetails) => ({
      ...prevDetails,
      password: value,
      passwordMatch: value === prevDetails.confirmPassword,
    }));
  };
  
  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setDetails((prevDetails) => ({
      ...prevDetails,
      confirmPassword: value,
      passwordMatch: prevDetails.password === value,
    }));
  };
  
  useEffect(() => {
    if(message){
        toast.success(message, toastOptions);
        dispatch({ type: "CLEAR_MESSAGE" });
        navigate(`/verify/${id}`);
    }
    if(error){
        toast.error(error, toastOptions);
        dispatch({ type: "CLEAR_ERROR" });
    }
    if(isAuthenticated){
      navigate("/")
    }
  }, [dispatch, message, error, isAuthenticated, navigate, id])

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <h2>Register</h2>

        {/* Name and Username Row */}
        <div className="row">
          <input
            type="text"
            name="name"
            className="box"
            placeholder="Enter Name"
            value={details.name}
            onChange={handleChange}
            required/>
            
          <input
            type="text"
            name="username"
            className="box"
            placeholder="Enter Username"
            value={details.username}
            onChange={handleChange}
            required
          />
        </div>

        {/* Email and Phone Row */}
        <div className="row">
          <input
            type="email"
            name="email"
            className="box"
            placeholder="Enter Email"
            value={details.email}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="mobile"
            className="box"
            placeholder="Enter Mobile Number"
            value={details.mobile}
            onChange={handleChange}
            required
          />
        </div>

        {/* Password and Confirm Password Row */}
        <div className="row">
          <input
            type="password"
            name="password"
            className="box"
            placeholder="Enter Password"
            value={details.password}
            onChange={handlePasswordChange}
            required
          />
          <input
            type="password"
            name="password2"
            className="box"
            placeholder="Re-Enter Password"
            value={details.confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
          />
        </div>

        {/* Display password match status */}
        {details.passwordMatch === false && (
          <p style={{ color: 'red' }}>Re-entered password does not match.</p>
        )}
        {details.passwordMatch === true && (
          <p style={{ color: 'green' }}>Passwords match!</p>
        )}

        <button type="submit" id="submit" disabled={loading}>
          {
            loading===true ? 
            <span className='spinner'></span>
            : "Register"
          }
        </button>

        {/* <button type="button" className="box2" onClick={() => window.location.href = "http://localhost:3000/auth/google"}>
          <img src={googleImg} alt="Google" height="40px" />Continue with Google
        </button> */}

        <button
          type="button"
          className="box2"
          onClick={() => window.location.href = "http://localhost:3000/auth/google"} // Redirect to backend for Google login
        >
          <img src={googleImg} alt="Google" className="google-img" />
          Continue with Google
        </button>

        <div style={{ marginTop: '8px' }}>
          <Link to="/login" style={{ color: 'red' }}>
            Already have an account ?
          </Link>
        </div>
      </form>

      <div className="side">
        <img
          // className="img"
          // src="https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          src={logo}
          alt="Rocket"
        />
        {/* <div className="text">
          <p id="p1">Build your Software,</p><br />
          <p id="p2">It's not rocket science.</p>
        </div> */}
      </div>
    </div>
  );
};

export default Register;
