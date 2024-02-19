<<<<<<< HEAD
import React from 'react';
import '../../App.css'; // Assuming global styles are here
import './SignUp.css'; // Specific styles for the sign-up component

function SignUp() {
  return (
    <div className='sign-up-container'>
      <div className='sign-up-content'>
        <h1 className='sign-up-title'>Sign Up</h1>
        <form className='sign-up-form'>
          <input
            type='email'
            name='email'
            placeholder='Enter your email'
            className='sign-up-input'
          />
          <button type='submit' className='sign-up-button'>Subscribe</button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
=======
import React from 'react'
import '../../App.css'
import { Button } from '../Button'
import './SignUp.css'
import '../Footer.css'

function SignUp() {
  return (
    <div className='sign-up'>
      <h1 className='sign-up-h1'>SIGN UP</h1>
            <div className='input-areas'>
                <form className='sign-up-form'>
                    <input type='email' name='email' placeholder='Your Email' className='footer-input'>
                    </input>
                    <Button buttonStyle='btn--outline'>Subscribe</Button> 
                </form>
            </div>
    </div>
  )
}

export default SignUp;
>>>>>>> 9af568b49d07e2ecf844c62fbcce8f5f1f775b2f
