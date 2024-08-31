// import React from "react";

// import { FacebookLoginButton } from "react-social-login-buttons";
// import { LoginSocialFacebook } from 'reactjs-social-login';

// export default function FacebookButton() {
//   return (
//     <div>
//       {" "}
//       <LoginSocialFacebook
//         appId={"819169813360308"}
//         onResolve={(response) => {
//           console.log(response);
//         }}
//         onReject={(error) => {
//           console.log(error);
//         }}
//       >
//         <FacebookLoginButton />
//       </LoginSocialFacebook>
//     </div>
//   );
// }







import React, { useEffect } from 'react';

export default function FacebookButton() {
  useEffect(() => {
    // Load Facebook SDK
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: '819169813360308', // Replace with your Facebook App ID
        cookie: true, // Enable cookies to allow the server to access the session
        xfbml: true, // Parse social plugins on this webpage
        version: 'v16.0', // Use this Graph API version
      });

      // Check the login status upon initialization
      window.FB.getLoginStatus((response) => {
        console.log('Facebook login status:', response);
        if (response.status === 'connected') {
          fetchUserData(response.authResponse);
        }
      });
    };
  }, []);

  // Fetch user data after successful login
  const fetchUserData = (authResponse) => {
    window.FB.api('/me', { fields: 'name,email,picture' }, (userData) => {
      console.log('User data:', userData);
      // Handle user data (e.g., save to state or send to backend)
    });
  };

  // Handle Facebook Login
  const handleFBLogin = () => {
    window.FB.login(
      (response) => {
        if (response.status === 'connected') {
          fetchUserData(response.authResponse);
        } else {
          console.error('User did not log in successfully.');
        }
      },
      { scope: 'public_profile,email' } // Request specific permissions
    );
  };

  // Handle Facebook Logout
  const handleFBLogout = () => {
    window.FB.logout((response) => {
      console.log('User logged out:', response);
      // Handle post-logout actions
    });
  };

  return (
    <div className="App">
      <h1>React Facebook Login</h1>
      <button onClick={handleFBLogin}>Login with Facebook</button>
      <button onClick={handleFBLogout}>Logout from Facebook</button>
    </div>
  );
}

