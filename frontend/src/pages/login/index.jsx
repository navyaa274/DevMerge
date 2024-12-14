import React, { useEffect, useState } from 'react';
import '../../styles/style.css'
import googleImg from '../../assets/images/google.png';
import logo from "../../svgs/dv1.jpg"
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/actions/userActions';
import toastOptions from '../../constants/toast';
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, message, error, id, isAuthenticated } = useSelector(state => state.userAuth)

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(email, password));
  };
  
  useEffect(() => {
    if(message){
        toast.success(message, toastOptions);
        dispatch({ type: "CLEAR_MESSAGE" })
        navigate(`/login/${id}`)
    }
    if(error){
        toast.error(error, toastOptions);
        dispatch({ type: "CLEAR_ERROR" })
    }
    if(isAuthenticated){
        navigate("/")
    }
  }, [dispatch, message, error, isAuthenticated, navigate, id])


  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form">
        <h2>LOG-IN</h2>
        <input
          type="email"
          name="email"
          className="box"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          name="password"
          className="box"
          placeholder="Enter valid password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" id="submit" disabled={loading}>
          { loading===true ? 
            <span className='spinner'></span>
            : "Login"
          }
        </button>
        <Link to="/forgot-password" style={{ marginBottom: '10px' }}><u>Forget Password?</u></Link>
        {/* <button type="button" className="box2" onClick={handleGoogle}>
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
            <Link to="/register" style={{ color: 'grey' }}>New To DevMerge? Create an Account</Link>
        </div>
      </form>
      <div className="side">
        <img
          // className="imgee"
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
  )
}

export default Login;