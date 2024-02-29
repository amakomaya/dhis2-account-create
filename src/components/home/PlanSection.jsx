import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

const PlanSection = () => {
    useEffect(() => {
        AOS.init()
    }, [])
    return (
        <>
            <section id="plan" className="mt-5">
                <div className="text-center mb-5" data-aos="fade-up" data-aos-upoffset="200">
                    <h3 class="heading-text">Plans of DHIS2</h3>
                    <hr className="w-25 m-auto text-secondary" />
                </div>

                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 col-md-6 col-lg-6 col-12" data-aos="fade-right" data-aos-upoffset="200">
                            <div className="mb-4 text-secondary shadow rounded py-4 ps-4">
                                <h3 className="text-primary">Calculate Price</h3>
                                <ul className='premium'>
                                    <li>All HMIS tools custom data tracking</li>
                                    <li>ICD - 11 Codes</li>
                                    <li>Data Interoperability</li>
                                    <li>API for developers</li>
                                    <li>Advance data field</li>
                                    <li>Report Card for individual patients - HMIS2 Report</li>
                                    <li>24/7 Support</li>
                                    <li>Print card, Report format</li>
                                    <li>Monthly Report</li>
                                    <li>Video tutorials for how to use (free only)</li>
                                    <li>How to operate system training</li>
                                    <li>Free user guidelines book</li>
                                </ul>
                                <a href='#contact-us' className="btn btn-primary px-5">Contact Us Now</a>
                            </div>
                        </div>

                        <div className="col-sm-12 col-md-6 col-lg-6 col-12" data-aos="fade-left" data-aos-upoffset="200">
                            <div className="row">
                                <div className="col-md-7 mx-auto shadow rounded py-5 ps-4">
                                    <h6>
                                        <i className="bi bi-shield-fill-check text-primary fs-5"></i> 15 days demo datasets for anyone organizations 
                                        (Health, Education, Tourism, Industry, Research and Study, Survey /Data collection, Business Analysis, Others)
                                        <br />
                                        <i className="bi bi-shield-fill-check text-primary fs-5"></i> Video tutorials <br />
                                        <i className="bi bi-shield-fill-check text-primary fs-5"></i> Support office team
                                    </h6>
                                    <div className="text-center pt-3">
                                        <button className="btn btn-primary btn-block px-5">Free</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default PlanSection;