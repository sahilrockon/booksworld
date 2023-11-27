import React, { useState } from "react";
import './logincss.css';

export default function Login() {
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
      let result = await fetch('http://localhost:4000/register', {
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

      <section className="">
        <div className="px-6 py-2 px-md-2 text-center text-lg-start" style={{backgroundColor: 'hsl(0, 0%, 96%)'}}>
          <div className="col-lg-4 mb-3 mb-lg-0" style={{float:'left',marginRight:'10vw'}}>
           
        <div className="col-lg-4 mb-3 mb-lg-0" style={{float:'left',marginRight:'10vw'}}>

             <h2 style={{color:'Red',visibility:show}}>Account Created  &#x1F603;</h2>

          <h1 className="my-5 display-3 fw-bold ls-tight">
            Welcome To  <br />
            <span className="text-danger">BooKsWorld</span>
          </h1>
          <p style={{color: 'hsl(217, 10%, 50.8%)'}}>
           
          </p>
        </div>
          </div>

          <div className="col-lg-6 mb-5 mb-lg-0" style={{float:'left'}}>
            <div className="card">
              <div className="card-body py-5 px-md-5">
                <form onSubmit={handleOnSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <input type="text" id="form3Example1" required className="form-control" value={first} onChange={(e) => { setFirst(e.target.value); setErrors({ ...errors, first: '' }); }} />
                        <label className="form-label" htmlFor="form3Example1"><b>First Name</b></label>
                        {errors.first && <div className="text-danger">{errors.first}</div>}
                      </div>
                    </div>
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <input type="text" id="form3Example2" required className="form-control" value={last} onChange={(e) => { setLast(e.target.value); setErrors({ ...errors, last: '' }); }} />
                        <label className="form-label" htmlFor="form3Example2"><b>Last Name</b></label>
                        {errors.last && <div className="text-danger">{errors.last}</div>}
                      </div>
                    </div>
                  </div>
                  <div className="form-outline mb-4">
                    <input type="email" id="form3Example3" required className="form-control" value={email} onChange={(e) => { setEmail(e.target.value); setErrors({ ...errors, email: '' }); }} />
                    <label className="form-label" htmlFor="form3Example3"><b>Email Address</b></label>
                    {errors.email && <div className="text-danger">{errors.email}</div>}
                  </div>
                  <div className="form-outline mb-4">
                    <input type="password" id="form3Example4" required className="form-control" value={password} onChange={(e) => { setPassword(e.target.value); setErrors({ ...errors, password: '' }); }} />
                    <label className="form-label" htmlFor="form3Example4"><b>Password</b></label>
                    {errors.password && <div className="text-danger">{errors.password}</div>}
                  </div>
                  <button type="submit" className="btn btn-primary btn-block mb-4">
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
    </>
  );
}
