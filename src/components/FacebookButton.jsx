import React, { useEffect, useState } from "react";
import axios from "axios";

import { FacebookLoginButton } from "react-social-login-buttons";
import { LoginSocialFacebook } from "reactjs-social-login";

export default function FacebookButton() {
  const access_token='EAALpB9W8brQBO0uDWhJGGmc7qZBRmjdX0C05ZCgYGzirPiikLzELHfVgOThR3EzGsRejBwEcai62OVm3B7VT1GHNF6nFgeXxSUtrrnNSP9CgXAbEUsmX00XlTMbqdZCgbZBMqlndN0ZCBMjkfw0VWzAZAWEO4udyTYZAvZCh9PSb1Joyc0NHZABDQe4ix'
  const accesstoken='EAALpB9W8brQBO1QeRGqPZBz8wTAUZBj7sIZCIFl4hKYEIn7PRUIaQfck9sN1vM7RJuNyOgVXXdu7818kHXbCRxUTbzVjOIDFpLwCWrljlMGKuCAAeoYp3ZBpnVFFR3ZCvZAle1FN0dUhNrKn7PorozKanCAeVCoyQDZCNwc2WIYsZBSEJlrrjKj5kDc2'
 const fan_token='EAALpB9W8brQBOZBkhbxuW0QWZBXyAoavJiOQEmQaZA5RXmoWqZCKEZAkQw9uZBpv3ZBPfOZAgzWBmVUaYwX97KagQWWf9ptfwXJroqWJZB8GDiZCuCIM1o7tKKeirmWBlglKKYLKVYAAVYDUQpxbqFDBACbiW7ZCwNhfChdeRpqsYth8ZCZCnDhcZATT5Cqqf9'
  const credentials={
    id:'',
    name:'',
    picture:''
  }
  const [data, setData] = useState(credentials);
  const [pagedata,setPagedata] = useState([]);
  const [some,setSome] =useState(false);
  const [fandata,setFandata]=useState([]);
  const[yes,setYes]=useState(false);
  const initial = {
    value1: "",
    value2: "",
  };
const [val,setVal]=useState(initial);
useEffect(()=>{
  axios
    .get(`https://graph.facebook.com/me?fields=id,name,picture&access_token=${accesstoken}`)
    .then((response) => {
      
      setData({...data,['id']:response.data.id , ['name']:response.data.name , ['picture']:response.data.picture.data.url});
    })
    .catch((err) => {
      console.log(err);
    });
}
,[]);

function fetchPageData()
{
  axios.get(`https://graph.facebook.com/me/accounts?access_token=${access_token}`).then((response)=>{

setPagedata(response.data.data);
  })
}
  
function fetchfollowers(){
  axios.get(`https://graph.facebook.com/me/accounts?fields=fan_count,country_page_likes,engagement,followers_count,impressum,influences,new_like_count,likes&access_token=${fan_token}`).then((response)=>{
console.log(response);
    setFandata(response.data);
      })
}

function handleSubmit()
{
  
  fetchPageData();
  if(data.id===val.value1 && data.name===val.value2){
    setYes(true);
  }
  else
  {
    setYes(false);
  }
}




return (
  <>
    {yes ? (
      <div className="flex flex-col items-center gap-4 justify-center h-screen w-full bg-gradient-to-t from-[white] to-[#00eeff]">
        <div className="text-2xl  "> {data.name}</div>
        <img
          className="rounded-[50%] h-[200px] w-[200px] object-contain"
          src={data.picture}
          alt="my profile"
        />

        <select  className="w-[150px] h-[30px] text-center" name="pages" id="">
          <option value="">Pages</option>
          {
pagedata.map((data)=> {
  return <option onClick={()=>{setSome(true); fetchfollowers();}} value=''>{data.name}</option>
})
          }
        </select>
<div className={`h-[200px] w-2/3 ${some?`block`:`hidden`} bg-[#1a9685] gap-4 items-center justify-center text-center rounded-md shadow-md flex`}>
<div className="h-[180px] w-[180px] bg-white rounded-md shadow-md"> <p>Total Followers</p><p>{fandata.fan_count}</p></div>
<div className="h-[180px] w-[180px] bg-white rounded-md shadow-md"><p>Total  Engagement</p><p>0</p></div>
<div className="h-[180px] w-[180px] bg-white rounded-md shadow-md"><p>Total Reaction</p><p>{fandata.followers_count}</p></div>
<div className="h-[180px] w-[180px] bg-white rounded-md shadow-md"><p>Total Reaction</p><p>0</p></div>
</div>

      </div>

      
    ) : (
      <div>
        <div className=" flex flex-col justify-center gap-4 items-center bg-gradient-to-t from-[white] to-[#00eeff] h-screen w-full ">
          <p className="text-3xl font-bold">facebook login</p>
          <p className="text-2xl font-bold">ID</p>
          <input
            className="rounded-md pl-2"
            type="text"
            value={val.value1}
            onChange={(e) => {
              setVal({ ...val, ["value1"]: e.target.value });
            }}
          />
          <p className="text-2xl font-bold">Name</p>
          <input
            className="rounded-md pl-2"
            type="text"
            value={val.value2}
            onChange={(e) => {
              setVal({ ...val, ["value2"]: e.target.value });
            }}
          />
          <button  onClick={handleSubmit}>Submit </button>
        </div>
      </div>
    )}
  </>
);
}

// import React, { useEffect } from 'react';

// export default function FacebookButton() {
//   useEffect(() => {
//     const initFacebookSDK = () => {
//       window.FB.init({
//         appId: '819169813360308', // Replace with your actual Facebook App ID
//         cookie: false,            // Enable cookies to allow the server to access the session
//         xfbml: true,             // Parse social plugins on this webpage
//         version: 'v16.0',        // Use a valid Graph API version
//       });

//       // Check the login status when SDK is ready
//       window.FB.getLoginStatus((response) => {
//         console.log('Facebook login status:', response);
//         if (response.status === 'connected') {
//           fetchUserData(response.authResponse);
//         }
//       });
//     };

//     // Load the Facebook SDK script asynchronously
//     const loadFacebookSDK = () => {
//       if (document.getElementById('facebook-jssdk')) {
//         return; // If SDK script is already loaded, skip
//       }

//       const js = document.createElement('script');
//       js.id = 'facebook-jssdk';
//       js.src = 'https://connect.facebook.net/en_US/sdk.js';
//       js.onload = initFacebookSDK; // Initialize the SDK after loading
//       document.body.appendChild(js);
//     };

//     loadFacebookSDK();
//   }, []);

//   const fetchUserData = (authResponse) => {
//     window.FB.api('/me', { fields: 'name,email,picture' }, (userData) => {
//       console.log('User data:', userData);
//       // Handle user data (e.g., save to state or send to backend)
//     });
//   };

// const redirectToFacebookLogin = () => {
//   const clientId = '819169813360308';
//   const redirectUri = 'https://facebook-login-gold.vercel.app/login';
//   window.location.href = `https://www.facebook.com/v16.0/dialog/oauth?client_id=${clientId}&redirect_uri=${redirectUri}&scope=email,public_profile`;
// };

//   const handleFBLogin = () => {
//  redirectToFacebookLogin();
//     window.FB.login(
//       (response) => {
//         if (response.status === 'connected') {
//           fetchUserData(response.authResponse);
//         } else {
//           console.error('User did not log in successfully.');
//         }
//       },
//       { scope: 'public_profile,email' } // Request specific permissions
//     );
//   };

//   // Updated logout function with status check
//   const handleFBLogout = () => {
//     window.FB.getLoginStatus((response) => {
//       if (response.status === 'connected') {
//         window.FB.logout((logoutResponse) => {
//           console.log('User logged out:', logoutResponse);
//           // Handle post-logout actions here
//         });
//       } else {
//         console.warn('User is not logged in or already logged out.');
//       }
//     });
//   };

//   return (
//     <div className="App">
//       <h1>React Facebook Login</h1>
//       <button onClick={handleFBLogin}>Login with Facebook</button>
//       <button onClick={handleFBLogout}>Logout from Facebook</button>
//     </div>
//   );
// }
