// import React, { useEffect, useState } from 'react';
// import { Link, useNavigate, useParams } from 'react-router-dom';
// import '../../styles/otp.css';
// import { useDispatch, useSelector } from 'react-redux';
// import { resendVerifyOtp, verifyUserOtp } from '../../redux/actions/userActions';
// import { toast } from 'react-toastify';
// import toastOptions from '../../constants/toast';

// const VerifyOtp = () => {
//     const spans = Array.from({ length: 128 });

//     const [otp, setOtp] = useState('');

//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const { id } = useParams();

//     const { loading, message, error, isAuthenticated } = useSelector(state => state.userAuth)

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         dispatch(verifyUserOtp(id, otp));
//     }

//     const handleResendOTP = () => {
//         dispatch(resendVerifyOtp(id));
//     }

//     useEffect(() => {
//         if(message){
//             console.log(message)
//             toast.success(message, toastOptions);
//             dispatch({ type: "CLEAR_MESSAGE" })
//             // navigate("/")
//         }
//         if(error){
//             toast.error(error, toastOptions);
//             dispatch({ type: "CLEAR_ERROR" })
//         }
//         if(isAuthenticated){
//             navigate("/")
//         }
//     }, [dispatch, message, error, navigate, isAuthenticated])


//     return (
//         <section>
//             <div className="signup-cont">
//                 {spans.map((_, index) => (
//                     <span key={index} className="span"></span>
//                 ))}
//                 <div className="signin" style={{ width: "400px"}}>
//                     <div className="content">
//                         <h2>Enter OTP</h2>
//                         <form className="form" onSubmit={handleSubmit}>
//                             <div className="inputBx">
//                                 <input
//                                     type="number"
//                                     value={otp}
//                                     required
//                                     onChange={(e) => setOtp(e.target.value)}
//                                 />
//                                 <i>OTP</i>
//                             </div>
//                             <div className="links">
//                                 <Link to={`/verify/${id}`} onClick={handleResendOTP}>
//                                     Resend OTP
//                                 </Link>
//                             </div>
//                             <div className="inputBx">
//                                 <button type="submit" >
//                                     {
//                                         loading===true 
//                                             ? <span className="spinner"></span> 
//                                             : "Verify"
//                                     }
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default VerifyOtp;








import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import '../../styles/otp.css';
import { useDispatch, useSelector } from 'react-redux';
import { resendVerifyOtp, verifyUserOtp } from '../../redux/actions/userActions';
import { toast } from 'react-toastify';
import toastOptions from '../../constants/toast';

const VerifyOtp = () => {
    const [otp, setOtp] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const { loading, message, error, isAuthenticated, otpVerified } = useSelector(state => state.userAuth);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(verifyUserOtp(id, otp));
    }

    const handleResendOTP = () => {
        dispatch(resendVerifyOtp(id));
    }

    useEffect(() => {
        if (message) {
            toast.success(message, toastOptions);
            dispatch({ type: "CLEAR_MESSAGE" });
        }
        if (error) {
            toast.error(error, toastOptions);
            dispatch({ type: "CLEAR_ERROR" });
        }
        if (isAuthenticated) {
            navigate("/home");
        }
    }, [dispatch, message, error, navigate, isAuthenticated, otpVerified]);

    return (
        <section>
            <div className="signup-cont">
                {/* {Array.from({ length: 128 }).map((_, index) => (
                    <span key={index} className="span"></span>
                ))} */}
                <div className="signin" style={{ width: "400px" }}>
                    <div className="content">
                        <h2>Enter OTP</h2>
                        <form className="form" onSubmit={handleSubmit}>
                            <div className="inputBx">
                                <input
                                    type="number"
                                    value={otp}
                                    required
                                    onChange={(e) => setOtp(e.target.value)}
                                />
                                <i>OTP</i>
                            </div>
                            <div className="links">
                                <Link to={`/verify/${id}`} onClick={handleResendOTP}>
                                    Resend OTP
                                </Link>
                            </div>
                            <div className="inputBx">
                                <button className="submit" type="submit">
                                    {loading ? <span className="spinner"></span> : "Verify"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VerifyOtp;
