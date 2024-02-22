

import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

const CustomizeSection = () => {
    useEffect(() => {
        AOS.init()
    }, [])
    return (
        <>
            <section id="customization_process" class="my-5">
                <div class="overlay"></div>
                <div class="container pb-5">
                    <div class="text-center py-5" data-aos="fade-up" data-aos-upoffset="200">
                        <h3 class="heading-text">Customization Process</h3>

                        <hr class="w-25 m-auto" />
                    </div>

                    <div class="container img-fluid">
                        <div class="row" data-aos="fade-right" data-aos-upoffset="200">
                            <div class="col-sm-12 col-md-4 col-lg-3 col-12">
                                <div class="card">
                                    <div class="card-body text-center">
                                        <i class="bi bi-pie-chart"></i>
                                        <h5 class="card-title mt-3">Custom Organization-based Survey</h5>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-12 col-md-4 col-lg-3 col-12">
                                <div class="card">
                                    <div class="card-body text-center">
                                        <i class="bi bi-cloud-plus"></i>
                                        <h5 class="card-title mt-3">FHIR-based EMR Interoperability</h5>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-12 col-md-4 col-lg-3 col-12">
                                <div class="card">
                                    <div class="card-body text-center">
                                        <i class="bi bi-h-circle"></i>
                                        <h5 class="card-title mt-3">Health Domain Expertise Available</h5>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-12 col-md-4 col-lg-3 col-12">
                                <div class="card">
                                    <div class="card-body text-center">
                                        <i class="bi bi-journal-check"></i>
                                        <h5 class="card-title mt-3">Custom Organization-based Data Sets/Registers</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row mt-5" data-aos="fade-left" data-aos-upoffset="200">
                            <div class="col-sm-12 col-md-4 col-lg-3 col-12">
                                <div class="card">
                                    <div class="card-body text-center">
                                        <i class="bi bi-display"></i>
                                        <h5 class="card-title mt-3">Custom Application (Online, Offline, Web, Mobile)</h5>
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

export default CustomizeSection;