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
