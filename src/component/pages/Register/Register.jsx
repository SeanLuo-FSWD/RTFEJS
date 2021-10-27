import React, { useState,useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, Link } from "react-router-dom";
import { globalContext } from "../../../store/context/globalContext";
import { FAKE_USERS } from "../../../fakeDb/fakeUsers";
import logo from "../../../img/logo.png"
import color1 from "../../../img/color1.png"
import color2 from "../../../img/color2.png"
import color3 from "../../../img/color3.png"
import color4 from "../../../img/color4.png"


const Register = () => {
  const { currentUser } = useContext(globalContext);
  const { register, handleSubmit } = useForm();
  const history = useHistory();
  // const [ fakeUser, setFakeUser ] = useState()

  const doSetFakeUser = (data) => {
    
    const user = FAKE_USERS.find(e => e.id == currentUser.id)
    user.color = data.color
    console.log(user);
  }

  const onSubmit = (data) => {
    console.log(data)
    console.log({...register})
    doSetFakeUser(data);
    history.push("/profile");

  };

  return (
    <div>
      <div className="left">      
        <img src={logo}/>
      </div>
      <div className="right">
        <div className="form">
          <h2>Welcome to Rooma</h2>
          <p>Pick a colour to get started with your roommates!</p>
          <form onSubmit ={handleSubmit(onSubmit)}>
            <img src={color1}/>
            <input type="radio" value="EAA994" {...register("color")}/>
            <img src={color2}/>
            <input type="radio" value="EAC794" {...register("color")} />
            <img src={color3}/>
            <input type="radio" value="94C1EA" {...register("color")} />
            <img src={color4}/>
            <input type="radio" value="9D9BF2" {...register("color")} />
            <button type="submit">submit</button>
          </form>
        </div>


      </div>


    </div>           
  )
}

export default Register;
