import React, { useState } from 'react';
import LoginForm from '../components/ui/loginForm';
import { useParams } from 'react-router-dom';
import RegisterForm from '../components/ui/registerForm';

const Login = () => {
   const { type } = useParams;
   const [formType, setFormType] = useState(
      type === 'register' ? type : 'login'
   );
   const toggleFormType = () => {
      setFormType((prevState) =>
         prevState === 'register' ? 'login' : 'register'
      );
   };
   return (
      <div className="container mt-4">
         <div className="row">
            <div className="col-md-6 offset-md-3 shadow p-4">
               {formType === 'register' ? (
                  <>
                     <h3 className="mb-3">Register</h3>
                     <RegisterForm />
                     <p>
                        Already have account?{' '}
                        <a role="Button" onClick={toggleFormType}>
                           {' '}
                           Sign In{' '}
                        </a>
                     </p>
                  </>
               ) : (
                  <>
                     <h3 className="mb-3">Login</h3>
                     <LoginForm />
                     <p>
                        Don`t have account?{' '}
                        <a role="Button" onClick={toggleFormType}>
                           {' '}
                           Sign Up{' '}
                        </a>
                     </p>
                  </>
               )}
            </div>
         </div>
      </div>
   );
};

export default Login;
