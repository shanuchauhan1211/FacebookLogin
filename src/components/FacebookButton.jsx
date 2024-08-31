import React from "react";

import { FacebookLoginButton } from "react-social-login-buttons";
import { LoginSocialFacebook } from 'reactjs-social-login';

export default function FacebookButton() {
  return (
    <div>
      {" "}
      <LoginSocialFacebook
        appId={"819169813360308"}
        onResolve={(response) => {
          console.log(response);
        }}
        onReject={(error) => {
          console.log(error);
        }}
      >
        <FacebookLoginButton />
      </LoginSocialFacebook>
    </div>
  );
}
