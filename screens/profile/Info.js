import React from 'react';


    
          var email =  '';
          var username =  '';
          var id = '';
        
    

  export function setID(ido){
    id= ido ;
    }
  export function getID(){
      return id;
  }
  export function setUserName(ido){
     username= ido;
}
export function getUserName(){
  return username;
}
export function setEmail(ido){
    email= ido ;
}
export function getEmail(){
  return email;
}
    module.exports = {
        functions: setID, getID, setEmail,setUserName,getEmail,getUserName
      };
