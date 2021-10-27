import React, { Component } from 'react';
import { useForm } from 'react-hook-form';
import { globalContext } from "../../../store/context/globalContext";
import { useContext } from "react";
import { FAKE_USERS } from "../../../fakeDb/fakeUsers"
import logo from "../../../img/logo.png"

const Profile =() => {
  const { currentUser } = useContext(globalContext);
  console.log(currentUser)
  console.log(FAKE_USERS)
  const { register, handleSubmit } = useForm();
  const history = useHistory();
  // const [ fakeUser, setFakeUser ] = useState()
  
  const doSetFakeUser = (data) => {
      
    const user = FAKE_USERS.find(e => e.id == currentUser.id)
    user.name = data.name;
    user.age = data.age;
    user.status = data.status;
    user.pronounce = data.pronounce
    console.log(user);
  }
  
  const onSubmit = (data) => {
    console.log(data)
    console.log({...register})
    doSetFakeUser(data);
    history.push("/profile");
  
  };


{
    return (
      <div>
        <div class="left">      
          <img src={logo}/>
        </div>
        <div class="right">
          <form onSubmit ={handleSubmit(onSubmit)}>
            <h2>Create Profile</h2>
            <div>Name<input type="text"  {...register("name")} /></div>
            <div>Age<input type="text"  {...register("age")}/></div>
            <div>Status<input type="text"  {...register("status")} /></div>
            <div>Pronounce<input type="text"  {...register("pronounce")}/></div>
            <div>Preference
              <label>First checkbox
                <input type="checkbox" checked="checked"/>
              </label>
              <label>Second checkbox
                <input type="checkbox"/>
              </label>
              <label>Disabled
                  <input type="checkbox" disabled="disabled"/>
              </label>
            </div>
            <div>Interests<input type="text"/></div>  
            <button type="submit">submit</button>
        </form>
        </div>
      </div>
    )
  }
}

export default Profile
