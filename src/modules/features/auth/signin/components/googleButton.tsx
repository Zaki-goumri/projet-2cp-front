import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import React from "react";
import { useState } from "react";

const Google = React.memo(({ width }: { width: number }) => {
    

    return(
        <GoogleOAuthProvider clientId="<your_client_id>" >

        <GoogleLogin
          onSuccess={(credentialResponse) => {
            console.log(credentialResponse);
          }}
          onError={() => {
            console.log("Login Failed");
          }}
          type="standard"
          shape="circle"
          theme="outline"
          size="large"
          width={width}
          cancel_on_tap_outside={true}
        />
            </GoogleOAuthProvider>
        )
})
export default Google;