import React, { useContext, useState } from "react";
import './logincss.css';
import { context } from "./context";
import { FaEye, FaEyeSlash } from 'react-icons/fa';




export default function Login() {


    const [showPassword, setShowPassword] = useState(false);
  
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };



  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState("hidden");
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    first: '',
    last: ''
  });
  const{api}=useContext(context);

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    let errorFields = { email: '', password: '', first: '', last: '' };

    if (!email) {
      errorFields.email = 'Email is required.';
    }

    if (!password) {
      errorFields.password = 'Password is required.';
    }

    if (!first) {
      errorFields.first = 'First name is required.';
    }

    if (!last) {
      errorFields.last = 'Last name is required.';
    }

    if (Object.values(errorFields).some(field => field)) {
      setErrors({ ...errorFields });
      return;
    }

    setLoading(true);
    const liked=[];
    try {
      let result = await fetch(`${api}/register`, {
        method: 'post',
        body: JSON.stringify({ first, last, email, password,liked }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      result = await result.json();
      console.warn(result);

      if (result) {
        setFirst('');
        setLast('');
        setEmail('');
        setPassword('');
        setShow("visible");
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error saving data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Loader Overlay */}
      {loading && (
        <div className="loader-overlay">
          <div className="spinner-border" style={{ width: '3rem', height: '3rem' }} role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
<section className="d-flex flex-column justify-content-center align-items-center " style={{ minHeight: '60vh', backgroundColor: '#f0f8ff' }}>
  <h1 class="my-1 display-6 fw-bold ls-tight text-danger">!!!Welcome!!!</h1>
  <div className="d-flex justify-content-center align-items-center col-lg-6 mb-5 mb-lg-0">

    
    <div className="card" style={{ border: '3px solid black' }}>
      <div className="card-body py-5 px-md-5" style={{ width: '100%', backgroundColor: '#fff' }}>

                <form onSubmit={handleOnSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <input type="text" id="form3Example1" required className="form-control"  placeholder="First Name"  value={first} onChange={(e) => { setFirst(e.target.value); setErrors({ ...errors, first: '' }); }} />
                        {errors.first && <div className="text-danger">{errors.first}</div>}
                      </div>
                    </div>
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <input type="text" id="form3Example2" required className="form-control" placeholder="Last Name"  value={last} onChange={(e) => { setLast(e.target.value); setErrors({ ...errors, last: '' }); }} />
                        {errors.last && <div className="text-danger">{errors.last}</div>}
                      </div>
                    </div>
                  </div>
                  <div className="form-outline mb-4">
                    <input type="email" id="form3Example3" required className="form-control" placeholder="Email"  value={email} onChange={(e) => { setEmail(e.target.value); setErrors({ ...errors, email: '' }); }} />
                    {errors.email && <div className="text-danger">{errors.email}</div>}
                  </div>
                  <div className="form-outline mb-4">
                <div className="input-group">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="form3Example4"
                    required
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setErrors({ ...errors, password: '' });
                    }}
                  />
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.password && <div className="text-danger">{errors.password}</div>}
              </div>
                  <br/><br/>
                  <button type="submit" className="btn btn-primary btn-block mb-4">
                    Sign up
                  </button>
                  <br/><br/><br/>
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
                  </div>
                </form>
              </div>
            </div>
          </div>
      </section>
    </>
  );
}
