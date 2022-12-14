import React from "react";
import { LoginResponseInterface } from "../components/LoginForm/LoginInterface";
import { VERIFY_ACCESS_TOKEN, VERIFY_REFRESH_TOKEN } from "../constants/fetch_constants";


const CheckUserByToken = () => {
  const access_token = localStorage.getItem('access_token');
  const refresh_token = localStorage.getItem('refresh_token');

  if(access_token || refresh_token) {
    fetch(VERIFY_ACCESS_TOKEN,
      {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ access_token }) 
      })
      .then((res) => {
        if(res.ok) {
          // To dispatch
        } else {
          fetch(VERIFY_REFRESH_TOKEN, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ refresh_token }) 
          })
          .then((res) => {
            if(res.ok) {
              res.json().then((responseJson: LoginResponseInterface) => {
                const { access_token, refresh_token } = responseJson;
                localStorage.setItem('access_token', access_token);
                localStorage.setItem('refresh_token', refresh_token);
              })
            }
          })
        }
      })
  }

  return(
    <React.Fragment />
  )
}

export default CheckUserByToken;