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
