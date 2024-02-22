import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { questions } from '../../data/FaqQuestions';

function FAQSection() {
  useEffect(() => {
    AOS.init()
  }, [])

  let [showAns, setShowAns] = useState(questions[0].id)

  return (
    <>
      <section id="faqs" className="py-5">
        <div className="text-center pb-5" data-aos="fade-up" data-aos-upoffset="200">
          <h3 className="heading-text">FAQs</h3>
          <small className="small-text">Frequently Asked Question</small>
          <br />
          <hr className="mt-2 w-25 m-auto" />
        </div>

        <div className="container">
          <div className="row">
            <div className="col-sm-12 col-md-6 col-lg-7 col-12 mx-auto" data-aos="zoom-in" data-aos-upoffset="200">
              <div className="mb-4 text-secondary">

                <div className="accordion" id="accordionExample">

                  {questions.map((faqItems, i) => {
                    return (
                      <div className="accordion-item" key={i}>
                        <h2 className="accordion-header">
                          <button
                            onClick={() => setShowAns(faqItems.id)}
                            className="accordion-button"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#${faqItems.id}`}
                            aria-expanded="true"
                            aria-controls="collapseOne"
                          >
                            {faqItems.question}
                          </button>
                        </h2>
                        <div
                          id={faqItems.id}
                          className={`accordion-collapse collapse ${showAns === faqItems.id ? 'show' : ''}`}
                          data-bs-parent="#accordionExample"
                        >
                          <div className="accordion-body">
                            <p>{faqItems.answer}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {/* <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        Why Should we pay for DHIS2?
                      </button>
                    </h2>
                    <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        <p>Data Management Solution for HMIS in Nepal using DHIS2: Register, Cards, monthly reports goes beyond doing just the basic and offering extra services to improve management, stability, security, performance etc.</p>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                        How our data Sure?
                      </button>
                    </h2>
                    <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis ducimus cum totam fugiat. Expedita maxime repudiandae aliquid qui autem assumenda aut vero numquam, alias modi? Quis ipsum blanditiis iusto totam saepe amet, assumenda illo quos voluptatem dolorem quisquam dolores id beatae. Minus quasi aperiam optio dolore, vero pariatur quisquam est?</p>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                        Who do I contact for billing?
                      </button>
                    </h2>
                    <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempore harum alias nobis earum. Esse doloremque, earum fugit dignissimos minima perferendis quas atque voluptas illum ab? Perspiciatis perferendis consequuntur accusamus minima et atque vero! Sapiente tenetur, debitis quo quidem provident consequuntur autem fuga reprehenderit corporis eos laborum quaerat neque iusto veniam.</p>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                        Who do I contact for billing?
                      </button>
                    </h2>
                    <div id="collapseFour" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempore harum alias nobis earum. Esse doloremque, earum fugit dignissimos minima perferendis quas atque voluptas illum ab? Perspiciatis perferendis consequuntur accusamus minima et atque vero! Sapiente tenetur, debitis quo quidem provident consequuntur autem fuga reprehenderit corporis eos laborum quaerat neque iusto veniam.</p>
                      </div>
                    </div>
                  </div> */}


                </div>

              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default FAQSection;
