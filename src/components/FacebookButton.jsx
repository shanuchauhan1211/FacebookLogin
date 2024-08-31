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
  const [fandata,setFandata]=useState('');
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
  return <option onClick={()=>{setSome(true)  ; fetchfollowers();}} value=''>{data.name}</option>
})
          }
        </select>
<div className="h-[200px] w-2/3 bg-slate-400 gap-4 items-center justify-center text-center rounded-md shadow-md flex">
<div className="h-[180px] w-[180px] bg-white rounded-md shadow-md"> <p>Total Followers</p><p>{fandata.fan_count}</p></div>
<div className="h-[180px] w-[180px] bg-white rounded-md shadow-md"><p>Total  Engagement</p></div>
<div className="h-[180px] w-[180px] bg-white rounded-md shadow-md"><p>Total Reaction</p></div>
<div className="h-[180px] w-[180px] bg-white rounded-md shadow-md"><p>Total Reaction</p></div>
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

