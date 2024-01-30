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