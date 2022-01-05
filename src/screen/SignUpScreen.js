import React, { useRef } from 'react'
import { auth } from '../firebase';
import './SignUpScreen.css';

function SignUpScreen() {

    //Target the data to fetch using ref hook
    const emailRef = useRef(null); //Initial value is null
    const passwordRef = useRef(null);



    //Authentication
    const register = (e) => {
        //to prevent default reload on input data
        e.preventDefault();
        auth.createUserWithEmailAndPassword(
            //get the current value 
            emailRef.current.value,
            passwordRef.current.value
        ).then((authUser) => {
            console.log(authUser)
        })
        .catch((error) => {
            alert(error.message);
        });
        emailRef.current.value = "";
        passwordRef.current.value = "";
        
    }

    const signIn = (e) => {
        e.preventDefault(); //prevent refresh action on submit

        auth.signInWithEmailAndPassword(
            emailRef.current.value,
            passwordRef.current.value
        ).then((authUser) => {
            console.log(authUser)
        })
        .catch((error) => {
            alert(error.message)
        });
        emailRef.current.value = "";
        passwordRef.current.value = "";
    }

    return (
        <div className='signUpScreen'>
            <form className='signUp__input'>
                <h1>Sign In</h1>
                <input ref={emailRef} name="emailField" type="email" placeholder='Email' />
                <input ref={passwordRef} type="password" name="passField" placeholder='Password' />
                <button onClick={signIn} type="submit" className='signUp__button'>Sign In</button>

                {/*On clicking sign up now it will trigger the register function */}
                <h4>New to Netflix? <span className='signUpScreen__link' onClick={register}>Sign Up now.</span></h4>
            </form>
        </div>
    )
}

export default SignUpScreen
