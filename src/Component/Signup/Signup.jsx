import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import './Signup.css';

function Signup() {
    const [fName, setfName] = useState('');
    const [lName, setlName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signupScheme = z.object({
        fName: z.string().min(1, 'Invalid first name'),
        lName: z.string().min(1, 'Invalid last name'),
        email: z.string().email('Invalid email address'),
        password: z.string().min(8, 'Password must be of at least 8 length')
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(signupScheme)
    });

    const handleSubmission = (formData) => {
        console.log("This is form data", formData);
    };

    return (
        <div className="signup-container">
            <h1>Sign up</h1>
            <p>It's quick and easy</p>
            <span className="bottom-line"></span>
            <form onSubmit={handleSubmit(handleSubmission)}>
                <div className="signup-detail">
                    <div className="signup-name-detail">
                        <input type="text" value={fName} {...register('fName')} placeholder='First Name' onChange={(e) => setfName(e.target.value)} />
                        {errors.fName && <span className='wrong-data'>{errors.fName.message}</span>}
                        <input type="text" value={lName} {...register('lName')} placeholder='Last Name' onChange={(e) => setlName(e.target.value)} />
                        {errors.lName && <span className='wrong-data'>{errors.lName.message}</span>}
                    </div>
                    <input type="email" value={email} {...register('email')} placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
                    {errors.email && <span className='wrong-data'>{errors.email.message}</span>}
                    <input type="password" value={password} {...register('password')} placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
                    {errors.password && <span className='wrong-data'>{errors.password.message}</span>}
                    <button type='submit'>Sign Up</button>
                </div>
                <span id='link-back'>Already have an account? <Link to='/login'><b>Login</b></Link></span>
            </form>
        </div>
    );
}

export default Signup;
