import React, { useEffect, useRef } from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';

import emailjs from '@emailjs/browser';

function SupportSection() {
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
            .sendForm('service_lzv5uvt', 'template_zy97vvs', form.current, {
                publicKey: 'QgNcDf6lLYy9ePtdy',
            })
            .then(
                () => {
                    console.log('SUCCESS!');
                    alert("Successfully Send Your Message !")
                },
                (error) => {
                    console.log('FAILED...', error.text);
                },
            );
    };

    useEffect(() => {
        AOS.init()
    }, [])

    return (
        <>
            <section id="contact-us" class="py-5">
                <div class="text-center pb-5" data-aos="fade-up" data-aos-upoffset="200">
                    <h3 class="heading-text"> Support</h3>
                    <small class="small-text">feel free to reach out our team is
                        ready
                        do addres any
                        inqueres you
                        may have. </small><br />

                    <hr class="mt-2 w-25 m-auto" />
                </div>

                <div class="container">
                    <div class="row">
                        <div class="col-sm-12 col-md-6 col-lg-7 col-12 mx-auto" data-aos="zoom-up" data-aos-upoffset="200">
                            <div class="mb-4 text-secondary">
                                <form ref={form} onSubmit={sendEmail}>
                                    <div class="mb-3">
                                        <input type="text" class="form-control contact-form" id="fname" name="from_name"
                                            placeholder="your first name" required/>
                                    </div>

                                    <div class="mb-3">
                                        <input type="text" class="form-control contact-form" id="lname" name="lname"
                                            placeholder="your last name" required/>
                                    </div>
                                    <div class="mb-3">
                                        <input type="email" class="form-control contact-form" id="email" name="from_email"
                                            placeholder="your email" required/>
                                    </div>

                                    <div class="col-md-12 mb-3">
                                        <select class="form-select" aria-label="Default select example">
                                            <option selected>Subject</option>
                                            <option value="1">Health Facility Setup</option>
                                            <option value="2">Subscription Issues</option>
                                            <option value="3">General Inquery</option>
                                        </select>
                                    </div>

                                    <div class="mb-3">
                                        <textarea class="form-control contact-form" placeholder="your message"
                                            id="floatingTextarea2" name='message' style={{ height: '150px' }} required></textarea>
                                    </div>

                                    <div class="mb-3 text-center">
                                        <button type='submit' className='send-btn'>Send <i class="bi bi-send-fill"></i></button>
                                    </div>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </section>


        </>
    )
}

export default SupportSection   