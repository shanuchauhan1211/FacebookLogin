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
    const initFacebookSDK = () => {
      window.FB.init({
        appId: '819169813360308', // Replace with your actual Facebook App ID
        cookie: false,            // Enable cookies to allow the server to access the session
        xfbml: true,             // Parse social plugins on this webpage
        version: 'v16.0',        // Use a valid Graph API version
      });

      // Check the login status when SDK is ready
      window.FB.getLoginStatus((response) => {
        console.log('Facebook login status:', response);
        if (response.status === 'connected') {
          fetchUserData(response.authResponse);
        }
      });
    };

    // Load the Facebook SDK script asynchronously
    const loadFacebookSDK = () => {
      if (document.getElementById('facebook-jssdk')) {
        return; // If SDK script is already loaded, skip
      }

      const js = document.createElement('script');
      js.id = 'facebook-jssdk';
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      js.onload = initFacebookSDK; // Initialize the SDK after loading
      document.body.appendChild(js);
    };

    loadFacebookSDK();
  }, []);

  const fetchUserData = (authResponse) => {
    window.FB.api('/me', { fields: 'name,email,picture' }, (userData) => {
      console.log('User data:', userData);
      // Handle user data (e.g., save to state or send to backend)
    });
  };

const redirectToFacebookLogin = () => {
  const clientId = '819169813360308';
  const redirectUri = 'https://facebook-login-gold.vercel.app/login';
  window.location.href = `https://www.facebook.com/v16.0/dialog/oauth?client_id=${clientId}&redirect_uri=${redirectUri}&scope=email,public_profile`;
};


  const handleFBLogin = () => {
 redirectToFacebookLogin();
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

  // Updated logout function with status check
  const handleFBLogout = () => {
    window.FB.getLoginStatus((response) => {
      if (response.status === 'connected') {
        window.FB.logout((logoutResponse) => {
          console.log('User logged out:', logoutResponse);
          // Handle post-logout actions here
        });
      } else {
        console.warn('User is not logged in or already logged out.');
      }
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

