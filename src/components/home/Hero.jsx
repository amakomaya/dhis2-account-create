
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useRef, useState } from 'react';
import { useTypewriter } from 'react-simple-typewriter';
import emailjs from '@emailjs/browser';

const Hero = () => {
    const [user, setUser] = useState({
        email: '',
        organizationType: '',
        agreeTerms: false
    });

    const [errors, setErrors] = useState({
        email: '',
        organizationType: '',
        agreeTerms: '',
    });

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const [msg, setMsg] = useState("")

    const [text] = useTypewriter({
        words: ['Empowering Health Information Management with DHIS2', 'Visualize Your Data with DHIS2', 'Manage Your Report With DHIS2'],
        loop: 0
    })

    const form = useRef();

    useEffect(() => {
        AOS.init()
    }, [])

    const sendEmail = (e) => {
        e.preventDefault();

        // Validate email
        if (user.email === '') {
            setErrors((prevErrors) => ({ ...prevErrors, email: 'Email is required' }));
            return;
        }

        if (!validateEmail(user.email)) {
            setErrors((prevErrors) => ({ ...prevErrors, email: 'Invalid email format' }));
            return;
        }

        // Validate organization type
        if (user.organizationType === '') {
            setErrors((prevErrors) => ({ ...prevErrors, organizationType: 'Organization type is required' }));
            return;
        }

        // Validate terms and conditions checkbox
        if (!user.agreeTerms) {
            setErrors((prevErrors) => ({ ...prevErrors, agreeTerms: 'Please agree to terms and conditions' }));
            return;
        }

        // If all validations pass
        emailjs
            .sendForm('service_lzv5uvt', 'template_82rwkla', form.current, {
                publicKey: 'QgNcDf6lLYy9ePtdy',
            })
            .then(
                () => {
                    console.log('SUCCESS!');
                    setMsg("Please verify your email for account activation")
                    setUser({
                        email: '',
                        organizationType: '',
                        agreeTerms: false
                    });
                    setErrors({
                        email: '',
                        organizationType: '',
                        agreeTerms: '',
                    });
                },
                (error) => {
                    console.log('FAILED...', error.text);
                },
            );
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: '', // Clear the error when the user starts typing
        }));
    };

    return (
        <>
            <section className="hero-section py-5" id="hero">
                <div className="container-fluid py-5">
                    <div className="row justify-content-evenly py-5">
                        <div className="col-md-5 pt-2" data-aos="fade-up" data-aos-upoffset="200">
                            <h1 className="fw-bold">
                                {text}
                            </h1>

                            <p className="text-secondary">Explore the comprehensive Data Management Solution for HMIS in Nepal using
                                DHIS2: Register, Cards, and monthly Reports. Get Started for free register your account
                                establish a data management server. </p>
                        </div>
                        <div className="col-md-4  pb-5 pt-4 px-4 border rounded shadow registration-form" data-aos="zoom-in" data-aos-upoffset="200">

                            {(msg !== '')
                                ?
                                <p className="text-center text-primary">
                                    <div><i class="bi bi-check-circle-fill"></i> Success !</div>
                                    Please verify your email for account activation</p>
                                :
                                <p className="text-center">Let's Start !</p>}


                            <form ref={form} onSubmit={sendEmail}>
                                <div className="row g-3">
                                    <div className="col-md-12">
                                        <input type="email" className={`form-control custom-form ${errors.email ? 'is-invalid' : ''}`} id='email' name="email" onChange={handleInputChange} value={user.email}
                                            placeholder="Enter your email address" />
                                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                    </div>

                                    <div className="col-md-12">
                                        <select
                                            class={`form-select custom-form ${errors.organizationType ? 'is-invalid' : ''}`}
                                            name="organizationType"
                                            onChange={(e) => handleInputChange(e)}
                                            value={user.organizationType}>
                                            <option selected aria-readonly>Select Organization type</option>
                                            <option value="Health">Health</option>
                                            <option value="Education">Education</option>
                                            <option value="Tourism">Tourism</option>
                                            <option value="Industry">Industry</option>
                                            <option value="Research and Study">Research and Study</option>
                                            <option value="Survey /Data collection">Survey /Data collection</option>
                                            <option value="Business Analysis">Business Analysis</option>
                                            <option value="Others">Others</option>
                                        </select>
                                        {errors.organizationType && (
                                            <div className="invalid-feedback">{errors.organizationType}</div>
                                        )}
                                    </div>

                                    <div className="col-md-12 ms-2">
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                name="agreeTerms"
                                                id="flexCheckChecked"
                                                checked={user.agreeTerms}
                                                onChange={handleInputChange}
                                            />
                                            <label className="form-check-label" htmlFor="flexCheckChecked">
                                                <small>Agree to all terms and conditions</small>
                                            </label>
                                        </div>
                                        {user.agreeTerms === false && (
                                            <div className="invalid-feedback">{errors.agreeTerms}</div>
                                        )}
                                    </div>

                                    <div class="d-grid gap-2">
                                        <button class="btn btn-primary custom-form" type="submit">Create Account</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
export default Hero;