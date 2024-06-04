import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css';

function Signup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signupScheme = z.object({
        username: z.string().min(5, 'Invalid user name'),
        email: z.string().email('Invalid email address'),
        password: z.string().min(8, 'Password must be of at least 8 length')
    });

    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(signupScheme)
    });

    const handleSubmission = async (formData) => {

        try {
            const url = "http://127.0.0.1:8000/api/signup/";
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (!response.ok) {

                throw new Error("Network response was not okay");
            } else {
                const data = await response.json();
                console.log(data);
                navigate('/login');  

            }
        } catch (error) {
            console.error("Error during form submission:", error);
        }
    };

    return (
        <div className="signup-container">
            <h1>Sign up</h1>
            <p>It's quick and easy</p>
            <span className="bottom-line"></span>
            <form onSubmit={handleSubmit(handleSubmission)}>
                <div className="signup-detail">
                    <div className="signup-name-detail">
                        <input
                            type="text"
                            value={username}
                            {...register('username')}
                            placeholder='First Name'
                            onChange={(e) => setUsername(e.target.value)}
                            autoComplete="given-name"
                        />
                        {errors.username && <span className='wrong-data'>{errors.username.message}</span>}
                        
                    </div>
                    <input
                        type="email"
                        value={email}
                        {...register('email')}
                        placeholder='Email'
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
                    />
                    {errors.email && <span className='wrong-data'>{errors.email.message}</span>}
                    <input
                        type="password"
                        value={password}
                        {...register('password')}
                        placeholder='Password'
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="current-password"
                    />
                    {errors.password && <span className='wrong-data'>{errors.password.message}</span>}
                    <button type='submit'>Sign Up</button>
                </div>
                <span id='link-back'>Already have an account? <Link to='/login'><b>Login</b></Link></span>
            </form>
        </div>
    );
}

export default Signup;
