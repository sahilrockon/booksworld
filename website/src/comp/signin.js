import {React,useContext,useState} from "react"
import { context } from "./context";
import {useNavigate } from 'react-router-dom';


//import {useNavigate} from 'react-router-dom';


export default function Sign()
{


  const navigate = useNavigate();

  const goToHomePage = () => {
    navigate('/');
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);

  const[span ,setspan ]= useState('hidden');
  const {setUser,setLiked,setEmaill,setPass,api}=useContext(context);
  //const navigate=useNavigate();


  const HandleSignIn = async (e) => {
    e.preventDefault();
    setEmailError('');
    setPasswordError('');

    if (!email.trim()) {
      setEmailError('Please enter your email')  ;
      return;
    }

    if (!password.trim()) {
      setPasswordError('Please enter your password');
      return;
    }
    setLoading(true);


    try {
      const response = await fetch(`${api}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (response.ok) {
        const userData = await response.json();
        console.log(userData);
        setUser(userData.firstName);
        setLiked(userData.liked);
        setEmaill(email);
        setPass(password);
        goToHomePage();
       

      
        
      } else {
        setspan('visible');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false); // Ensure setLoading is called in the 'finally' block
    }
  };







return(
<>
{loading && (
        <div className="loader-overlay">
          <div className="spinner-border" style={{ width: '3rem', height: '3rem' }} role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

<section class="" style={{position:'fixed'}}>

  <div class="px-4 py-5 px-md-5 text-center text-lg-start" style={{backgroundColor: 'hsl(0, 0%, 96%)'}}>
    <div class="container">
      <div class="row gx-lg-5 align-items-center">
        <div class="col-lg-6 mb-5 mb-lg-0">
          <h2 class="my-5 display-3 fw-bold ls-tight text-danger">
            Welcome Back!! <br />
          </h2>
          <p style={{color: 'hsl(217, 10%, 50.8%)'}}>
           
          </p>
        </div>

        <div class="col-lg-6 mb-5 mb-lg-0">
          <div class="card">
            <div class="card-body py-5 px-md-5" style={{padding:'10px',margin:'10px'}}>
            <form onSubmit={HandleSignIn}>
            <div className="mb-3">
              <label htmlFor="inputEmail" className="form-label"><b>Email</b></label>
              <input
                type="email"
                className="form-control"
                id="inputEmail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                required
              />
              {emailError && <div className="text-danger">{emailError}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="inputPassword" className="form-label"><b>Password</b></label>
              <input
                type="password"
                className="form-control"
                id="inputPassword"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
              />
              {passwordError && <div className="text-danger">{passwordError}</div>}
            </div>
            <br/>
            <br/>

            <span style={{color:'red',visibility:span}}><b>Invalid Gmail or Password</b></span>
            <br/>

            <button type="submit" className="btn btn-primary">Sign In</button>
          </form>
        
            </div>
           
          </div>
        </div>
      </div>
    
    </div>
   
  </div>
  <div style={{margin:'20px'}}>

  <h2 style={{ textAlign: 'center' , font: '2.2rem', marginTop: '20px',color:'red' }}>
        Discover a world of stories, adventures, and knowledge. Dive into a collection of books
        covering various genres. Let your imagination soar!
      </h2>
          </div>
</section>
</>)};
