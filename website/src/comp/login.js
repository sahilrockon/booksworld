import React from "react"
import {useState} from 'react';

export default function Login()
{
	const [first, setfirst] = useState("");
  const [last, setlast] = useState("");
	const [password,setpass] = useState("");
	const [email, setEmail] = useState("");
  const [liked,setliked]=useState([]);
  const[show,setshow]=useState("hidden");



	const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      let result = await fetch(
        'https://abc-hrad.onrender.com/register',
        {
          method: 'post',
          body: JSON.stringify({ first,last, email,password,liked}),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      result = await result.json();
      console.warn(result);
      if (result) {
        setEmail('');
        setlast('');  
        setEmail('');
        setpass('');
        setshow("visible");
        window.location.href = '/';

      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error saving data. Please try again.');

    }
  };





return(
<>
<section className="">
  <div className="px-6 py-2 px-md-2 text-center text-lg-start" style={{backgroundColor: 'hsl(0, 0%, 96%)'}}>

        <div className="col-lg-4 mb-3 mb-lg-0" style={{float:'left',marginRight:'10vw'}}>

<h2 style={{color:'Red',visibility:show}}>Account Created  &#x1F603;</h2>
<br/><br/><br/><br/><br/>
          <h1 className="my-5 display-3 fw-bold ls-tight">
            Welcome To  <br />
            <span className="text-danger">BooKsWorld</span>
          </h1>
          <p style={{color: 'hsl(217, 10%, 50.8%)'}}>
           
          </p>
        </div>

        <div className="col-lg-6 mb-5 mb-lg-0" style={{float:'left'}}>
          <div className="card">
            <div className="card-body py-5 px-md-5">
              <form>
                <div className="row">
                  <div className="col-md-6 mb-4">
                    <div className="form-outline">
                      <input type="text" id="form3Example1" required className="form-control"  value={first}   onChange={(e)=>{setfirst(e.target.value)}} />
                      <label className="form-label " for="form3Example1"><b>First Name</b></label>
                    </div>
                  </div>
                  <div className="col-md-6 mb-4">
                    <div className="form-outline">
                      <input type="text" id="form3Example2" required className="form-control" value={last}   onChange={(e)=>{setlast(e.target.value)}}/>
                      <label className="form-label" for="form3Example2"><b>Last Name</b></label>
                    </div>
                  </div>
                </div>

                <div className="form-outline mb-4">
                  <input type="email" id="form3Example3" required className="form-control" value={email}   onChange={(e)=>{setEmail(e.target.value)}} />
                  <label className="form-label" for="form3Example3"><b>Email Address</b></label>
                </div>

                <div className="form-outline mb-4">
                  <input type="password" id="form3Example4" required className="form-control"  value={password}   onChange={(e)=>{setpass(e.target.value)}} />
                  <label className="form-label" for="form3Example4"><b>Password</b></label>
                </div>

                <div className="form-check d-flex justify-content-center mb-4">
                  <input className="form-check-input me-2" type="checkbox" value="" id="form2Example33" checked />
                  <label className="form-check-label" for="form2Example33">
                    Subscribe to our newsletter
                  </label>
                </div>

                <button type="submit bg-primary " className="btn btn-primary btn-block mb-4" onClick={handleOnSubmit}>
                  Sign up
                </button>

                <div className="text-center">
                  <button type="button" className="btn btn-link btn-floating mx-1">
                    <i className="fab fa-facebook-f"></i>
                  </button>

                  <button type="button" className="btn btn-link btn-floating mx-1">
                    <i className="fab fa-google"></i>
                  </button>

                  <button type="button" className="btn btn-link btn-floating mx-1">
                    <i className="fab fa-twitter"></i>
                  </button>

                  <button type="button" className="btn btn-link btn-floating mx-1">
                    <i className="fab fa-github"></i>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
    </div>
</section>
</>)};
