// import React, { useState, useEffect } from "react";
// import { googleLogout, useGoogleLogin } from "@react-oauth/google";
// import axios from "axios";

// function Google() {
//   const [user, setUser] = useState(null); // Start with `null`
//   const [profile, setProfile] = useState(null); // Start with `null`

//   const login = useGoogleLogin({
//     onSuccess: (codeResponse) => setUser(codeResponse),
//     onError: (error) => console.error("Login Failed:", error),
//   });

//   useEffect(() => {
//     if (user && user.access_token) {
//       // Fetch user profile
//       axios
//         .get(
//           `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
//           {
//             headers: {
//               Authorization: `Bearer ${user.access_token}`,
//               Accept: "application/json",
//             },
//           }
//         )
//         .then((res) => {
//           setProfile(res.data);
//           console.log("Profile data fetched successfully:", res.data);
//         })
//         .catch((err) => console.error("Error fetching profile data:", err));
//     }
//   }, [user]);

//   const logOut = () => {
//     googleLogout();
//     setUser(null);
//     setProfile(null);
//   };

//   return (
//     <div>
//       {/* Show login button if user is not logged in */}
//       {!profile ? (
//         <button onClick={login} style={buttonStyle}>
//           Login with Google
//         </button>
//       ) : (
//         // Show profile and logout button if logged in
//         <div>
//           <h3>Welcome, {profile.name}</h3>
//           <img src={profile.picture} alt="User Profile" style={imageStyle} />
//           <p>Email: {profile.email}</p>
//           <button onClick={logOut} style={buttonStyle}>
//             Logout
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// // Inline styles for buttons and images (optional)
// const buttonStyle = {
//   padding: "10px 20px",
//   margin: "10px 0",
//   backgroundColor: "#4285F4",
//   color: "white",
//   border: "none",
//   borderRadius: "5px",
//   cursor: "pointer",
// };

// const imageStyle = {
//   borderRadius: "50%",
//   width: "100px",
//   height: "100px",
// };

// export default Google;



// // client/src/App.jsx
// import React, { useState } from 'react';
// import { GoogleLogin, GoogleLogout } from 'react-google-login';
// // import './App.css';

// const CLIENT_ID = '507696283520-0nfish3bq19khujmhlat080cd2cdfdks.apps.googleusercontent.com.apps.googleusercontent.com';  // Replace with your Google Client ID

// function Google() {
//   const [user, setUser] = useState(null);
//   const [error, setError] = useState(null);

//   // Handle successful Google login
//   const handleLoginSuccess = async (response) => {
//     const { tokenId } = response;

//     // Send the token to the backend to verify it
//     try {
//       const res = await fetch('http://localhost:3000/api/auth/verify', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ token: tokenId }),
//       });

//       const data = await res.json();
//       if (data.success) {
//         setUser(data.user); // Set the user state on successful verification
//       } else {
//         setError('Token verification failed.');
//       }
//     } catch (err) {
//       console.error('Error verifying token', err);
//       setError('An error occurred.');
//     }
//   };

//   // Handle login failure
//   const handleLoginFailure = (error) => {
//     console.error('Google login failed:', error);
//   };

//   // Handle logout
//   const handleLogout = () => {
//     setUser(null);
//   };

//   return (
//     <div className="App">
//       <h1>Google Sign-In with React and Node</h1>

//       {!user ? (
//         <GoogleLogin
//           clientId={CLIENT_ID}
//           buttonText="Login with Google"
//           onSuccess={handleLoginSuccess}
//           onFailure={handleLoginFailure}
//           cookiePolicy={'single_host_origin'}
//         />
//       ) : (
//         <div>
//           <h2>Welcome, {user.name}</h2>
//           <img src={user.imageUrl} alt="Profile" width="100" />
//           <p>Email: {user.email}</p>
//           <GoogleLogout
//             clientId={CLIENT_ID}
//             buttonText="Logout"
//             onLogoutSuccess={handleLogout}
//           />
//         </div>
//       )}

//       {error && <p style={{ color: 'red' }}>{error}</p>}
//     </div>
//   );
// }

// export default Google;


import React, { useEffect } from 'react';

const Google = () => {
    useEffect(() => {
        window.gapi.load('auth2', () => {
            window.gapi.auth2.init({
                client_id: '507696283520-0nfish3bq19khujmhlat080cd2cdfdks.apps.googleusercontent.com',
            }).then(() => {
                window.gapi.signin2.render('g-signin2', {
                    scope: 'profile email',
                    width: 240,
                    height: 50,
                    longtitle: true,
                    theme: 'dark',
                    onsuccess: onSignIn,
                });
            });
        });
    }, []);

    const onSignIn = (googleUser) => {
        const profile = googleUser.getBasicProfile();
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
    };

    return (
        <div id="g-signin2"></div>
    );
};

export default Google;