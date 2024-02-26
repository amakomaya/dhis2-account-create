// Import Libraries
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '../firebase/Setup';
import Header2 from './Header2';
import provincesData from '../../data/provincesData';
import districtsData from '../../data/districtsData';
import municipalitiesData from '../../data/municipalitiesData';

function RegistrationForm() {

    const [user, setUser] = useState(null);
    const [verifyStatus, setVerifyStatus] = useState(false);
    const [lastRequestTime, setLastRequestTime] = useState(null);

    const [phoneHide, setPhoneHide] = useState(true);

    const [status, setStatus] = useState(false);

    const [showRemainingServices, setShowRemainingServices] = useState(false);


    // Variable Declaration
    const provinces = provincesData;
    const districtsByProvince = districtsData;
    const municipalitiesByDistrict = municipalitiesData;


    const [userr, setUserr] = useState({
        fmname: '',
        lname: '',
        phone: '',
        otp: '',
        wordno: '',
        tole: '',
        selectedProvince: '',
        selectedDistrict: '',
        selectedMunicipality: '',
        purpose: '',
    })

    const [error, setError] = useState({
        fmname: '',
        lname: '',
        otp: '',
        province_type: '',
        district_type: '',
        municipality_type: '',
        wordno: '',
        tole: '',
        purpose: '',
    })

    const validateFmname = (fmname) => {
        const fmnameRegex = /^[A-Za-z ]+$/;
        return fmnameRegex.test(fmname)
    }

    const validateLname = (Lname) => {
        const lnameRegex = /^[A-Za-z ]+$/;
        return lnameRegex.test(Lname)
    }

    const validateWordno = (wordno) => {
        const wordnoRegex = /^\d+$/;
        return wordnoRegex.test(wordno)
    }

    const validateTole = (tole) => {
        const toleRegex = /^[A-Za-z ]+$/;
        return toleRegex.test(tole)
    }

    const validatePhone = (phone) => {
        const phoneRegex = /^9\d{9}$/;
        return phoneRegex.test(phone)
    }

    const toggleRemainingServices = () => {
        setShowRemainingServices(!showRemainingServices);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setUserr((preUser) => ({
            ...preUser, [name]: value
        }));

        setError((preError) => ({
            ...preError, [name]: ''
        }))
    }

    const handleForm = (e) => {
        // setStatus(true)
        e.preventDefault();
        if (!validateFmname(userr.fmname)) {
            setError((preError) => ({ ...preError, fmname: 'Invalid First and Middle Name' }))
            return;
        }

        if (!validateLname(userr.lname)) {
            setError((preError) => ({ ...preError, lname: 'Invalid Last Name' }))
            return;
        }

        if (userr.selectedProvince === '') {
            setError((prevErrors) => ({ ...prevErrors, province_type: 'Province is required' }));
            return;
        }
        if (userr.selectedDistrict === '') {
            setError((prevErrors) => ({ ...prevErrors, district_type: 'District is required' }));
            return;
        }
        if (userr.selectedMunicipality === '') {
            setError((prevErrors) => ({ ...prevErrors, municipality_type: 'Municipality is required' }));
            return;
        }

        if (!validateWordno(userr.wordno)) {
            setError((preError) => ({ ...preError, wordno: 'Invalid Word No' }))
            return;
        }

        

        if (!validateTole(userr.tole)) {
            setError((preError) => ({ ...preError, tole: 'Invalid tole' }))
            return;
        }

        if (!validatePhone(userr.phone)) {
            setError((preError) => ({ ...preError, phone: 'Invalid Phone number' }))
            alert('Invalid Phone number')
            return;
        }

        if (userr.purpose === '') {
            setError((prevErrors) => ({ ...prevErrors, purpose: 'purpose is required' }));
            return;
        }

        setUser({
            fmname: '',
            lname: '',
            province_type: '',
            district_type: '',
            municipality_type: '',
            wordno: '',
            tole: '',
            phone: '',
            purpose: '',
        })

        setError({
            fmname: '',
            lname: '',
            province_type: '',
            district_type: '',
            municipality_type: '',
            wordno: '',
            tole: '',
            phone: '',
            purpose: '',
        })

        alert('submit')
    }
    // -----------------------------------

    const handleProvinceChange = (e) => {
        const provinceId = parseInt(e.target.value, 10);
        setUserr(prevUserr => ({
            ...prevUserr,
            selectedProvince: provinceId,
            selectedDistrict: null // Reset district when province changes
        }));
    };

    const handleDistrictChange = (e) => {
        const districtId = e.target.value;
        setUserr(prevUserr => ({
            ...prevUserr,
            selectedDistrict: districtId
        }));
    };


    const sendOtp = async () => {

        const currentTime = new Date();

        if (!lastRequestTime || currentTime.getTime() - lastRequestTime.getTime() >= 2 * 60 * 1000) {
            // If the user hasn't clicked in the last 2 minutes or it's the first click
            try {
                const recaptchaContainer = document.createElement('div');
                document.body.appendChild(recaptchaContainer);

                const recaptcha = new RecaptchaVerifier(auth, recaptchaContainer, {});
                const confirmation = await signInWithPhoneNumber(auth, userr.phone, recaptcha);
                // Save the ConfirmationResult object in state
                setUser(confirmation);
                console.log(confirmation);
                setVerifyStatus(true)

                toast.success("OTP send successfully ! Please check your phone");
                setLastRequestTime(currentTime);

            } catch (err) {
                console.error(err);
            }
        }
        else {
            // If the user has clicked within the last 2 minutes
            toast.error('Please wait 2 minutes before request OTP again')
        }
    }

    const verifyOtp = async () => {
        try {
            const data = await user.confirm(userr.otp);
            toast.success("OTP Verified! Request the Demo");

            setPhoneHide(false)

            console.log(data);
        } catch (err) {
            setError((prevError) => ({ ...prevError, otp: 'Invalid OTP' }));
            console.error(err);
        }
    };

    return (
        <>
            <Header2 />
            <div className="my-4 new_container rounded shadow">
                <div className="row">
                    <div className="card">
                        <div className="card-body px-5">
                            <h2 className="cart-title text-center text-primary fw-bold pt-5 pb-2">Register Now</h2>
                            <form onSubmit={handleForm} className=''>
                                <div className="mb-2">
                                    <div className="row g-2">
                                        {/* First and Middle name */}
                                        <div className="col-sm-12">
                                            <small>First and Middle Name <span className="text-danger">*</span></small>
                                            <input
                                                type="text"
                                                className={`form-control custom-reg-form ${error.fmname ? 'is-invalid' : ''}`}
                                                placeholder='enter first and middle name'
                                                name='fmname'
                                                onChange={handleInputChange}
                                            />
                                            {error.fmname && <div id="name-error" className="invalid-feedback">{error.fmname}</div>}
                                        </div>

                                        {/* Last name */}
                                        <div className="col-sm-12">
                                            <small>Last Name <span className="text-danger">*</span></small>
                                            <input
                                                type="text"
                                                className={`form-control custom-reg-form ${error.lname ? 'is-invalid' : ''}`}
                                                placeholder='Enter last name'
                                                name='lname'
                                                onChange={handleInputChange}
                                            />
                                            {error.lname && <div id="name-error" className="invalid-feedback">{error.lname}</div>}
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-2">
                                    <div className="row g-2">
                                        {/* Province */}
                                        <div className="col-sm-6">
                                            <small>Province <span className="text-danger">*</span></small>
                                            <select
                                                className={`form-select custom-reg-form ${error.province_type ? 'is-invalid' : ''}`}
                                                name="province_type"
                                                aria-label="Province"
                                                onChange={(e) => {
                                                    handleProvinceChange(e);
                                                    setUserr(prevUserr => ({ ...prevUserr, selectedProvince: e.target.value }));
                                                    setError((prevErrors) => ({ ...prevErrors, province_type: '' }));
                                                }}
                                                value={userr.selectedProvince}
                                            >
                                                <option selected>
                                                    Select province
                                                </option>
                                                {provinces.map((province) => (
                                                    <option key={province.id} value={province.id}>
                                                        {province.province_name}
                                                    </option>
                                                ))}
                                            </select>
                                            {error.province_type && (
                                                <div className="invalid-feedback">{error.province_type}</div>
                                            )}
                                        </div>

                                        {/* District */}
                                        <div className="col-sm-6">
                                            <small>District <span className="text-danger">*</span></small>
                                            <select
                                                className={`form-select custom-reg-form ${error.district_type ? 'is-invalid' : ''}`}
                                                name="district_type"
                                                aria-label="District"
                                                onChange={(e) => {
                                                    handleDistrictChange(e);
                                                    setUserr(prevUserr => ({ ...prevUserr, selectedDistrict: e.target.value }));
                                                    setError((prevErrors) => ({ ...prevErrors, district_type: '' }));
                                                }}
                                                value={userr.selectedDistrict}
                                            >
                                                <option selected disabled>
                                                    District
                                                </option>
                                                {userr.selectedProvince &&
                                                    districtsByProvince[userr.selectedProvince].map((district) => (
                                                        <option key={district.id} value={district.id}>
                                                            {district.name}
                                                        </option>
                                                    ))}
                                            </select>
                                            {error.district_type && (
                                                <div className="invalid-feedback">{error.district_type}</div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-2">
                                    <div className="row g-2">
                                        {/* Municipality */}
                                        <div className="col-sm-6">
                                            <small>Municipality <span className="text-danger">*</span></small>
                                            <select
                                                className={`form-select custom-reg-form ${error.municipality_type ? 'is-invalid' : ''}`}
                                                name="municipality_type"
                                                aria-label="Municipality"
                                                onChange={(e) => {
                                                    setUserr(prevUserr => ({ ...prevUserr, selectedMunicipality: e.target.value }));
                                                    setError((prevErrors) => ({ ...prevErrors, municipality_type: '' }));
                                                }}
                                                value={userr.selectedMunicipality}
                                            >
                                                <option selected disabled>
                                                    Municipality
                                                </option>
                                                {userr.selectedDistrict &&
                                                    municipalitiesByDistrict[userr.selectedDistrict].map((municipality) => (
                                                        <option key={municipality} value={municipality}>
                                                            {municipality}
                                                        </option>
                                                    ))}
                                            </select>
                                            {error.municipality_type && (
                                                <div className="invalid-feedback">{error.municipality_type}</div>
                                            )}
                                        </div>
                                        {/* Word no */}
                                        <div className="col-sm-6">
                                            <small>Ward No <span className="text-danger">*</span></small>
                                            <input
                                                type="text"
                                                className={`form-control custom-reg-form ${error.wordno ? 'is-invalid' : ''}`}
                                                placeholder='Ward no'
                                                name='wordno'
                                                onChange={handleInputChange}
                                            />
                                            {error.wordno && <div id="name-error" className="invalid-feedback">{error.wordno}</div>}
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-2">
                                    <div className="row g-2">
                                        {/* Tole */}
                                        <div className="col-md-12">
                                            <small>Tole <span className="text-danger">*</span></small>
                                            <input
                                                type="text"
                                                name="tole"
                                                className={`form-control custom-reg-form ${error.tole ? 'is-invalid' : ''}`}
                                                placeholder='Tole'
                                                onChange={handleInputChange}
                                            />
                                            {error.tole && <div id="name-error" className="invalid-feedback">{error.tole}</div>}
                                        </div>

                                    </div>
                                </div>

                                <div className="mb-2">
                                    <div className="row g-2">
                                        {/* Phone */}
                                        <div className="col-md-6">
                                            <small>Phone <span className="text-danger">*</span></small>
                                            {phoneHide ? 
                                            (<input
                                                type="text"
                                                className={`form-control custom-reg-form ${error.phone ? 'is-invalid' : ''}`}
                                                placeholder='9xxxxxxxxx'
                                                name='phone'
                                                onChange={handleInputChange}
                                            />) : 
                                            (<input
                                                type="text"
                                                className={`form-control custom-reg-form ${error.phone ? 'is-invalid' : ''}`}
                                                placeholder='9xxxxxxxxx'
                                                name='phone'
                                                onChange={handleInputChange}
                                                readOnly
                                            />)}
                                            <div style={{ lineHeight: '1' }}>
                                                <small className='text-warning'>* Please verify your mobile number before requesting a demo account</small>
                                            </div>

                                            {error.phone && <div id="name-error" className="invalid-feedback">{error.phone}</div>}
                                        </div>
                                        <div className="col-md-6">
                                            <div className="row">
                                                <div className="col-md-4 mt-4">
                                                    <button type="button" class="btn btn-outline-primary btn-design" onClick={sendOtp}>Send OTP</button>
                                                    <div id="recaptcha"></div>
                                                    <ToastContainer />
                                                </div>

                                                {
                                                    (123) //verifyStatus
                                                        ?
                                                        <div className="col-md-7">
                                                            <div class="row">
                                                                <div className="col-md-7">
                                                                <small>Enter OTP <span className="text-danger">*</span></small>
                                                                    <input
                                                                        className={`form-control custom-reg-form ${error.otp ? 'is-invalid' : ''}`}
                                                                        name="otp"
                                                                        arial-label="Otp"
                                                                        type="number"
                                                                        id="otp"
                                                                        onChange={handleInputChange}
                                                                        placeholder=".............."
                                                                    />


                                                                    {error.otp && <div id="name-error" className="invalid-feedback">{error.otp}</div>}

                                                                </div>
                                                                <div className="col-md-3 mt-4">
                                                                    <button class="btn btn-outline-primary btn-design" type="button" id="button-addon2" onClick={verifyOtp}>Verify</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        :
                                                        ""
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-2">
                                    <div className="row g-2">
                                        {/* Phone Number */}
                                        {/* <div className="col-md-6">
                                        <small>Phone No <span className="text-danger">*</span></small>
                                            {phoneHide? (<PhoneInput
                                                country={'np'}
                                                className={`react-tel-input ${error.phone ? 'is-invalid' : ''}`}
                                                onChange={(phone) => setUserr((prevUser) => ({ ...prevUser, phone: "+" + phone }))}
                                            />): (<PhoneInput
                                                country={'np'}
                                                className={`react-tel-input ${error.phone ? 'is-invalid' : ''}`}
                                                onChange={(phone) => setUserr((prevUser) => ({ ...prevUser, phone: "+" + phone }))}
                                                value={userr.phone}
                                                disabled
                                            />)}
                                            <div style={{ lineHeight: '1' }}>
                                                <small className='text-secondary'><i>* Please verify your mobile number before requesting a demo account</i></small>
                                            </div>
                                            {error.phone && <div id="phone-error" className="invalid-feedback">{error.phone}</div>}
                                        </div> */}

                                        {/* Send OTP Button */}
                                        {/* <div className="col-md-6">
                                            <div className="row">
                                                <div className="col-md-5 mt-4">
                                                    <small></small>
                                                    <button type="button" class="btn btn-outline-primary" onClick={sendOtp}>Send OTP</button>
                                                    <div id="recaptcha"></div>
                                                    <ToastContainer />
                                                </div>

                                                {
                                                    (verifyStatus)
                                                        ?
                                                        <div className="col-md-7">
                                                            <div class="input-group">
                                                                <input
                                                                    className={`form-control ${error.otp ? 'is-invalid' : ''}`}
                                                                    name="otp"
                                                                    arial-label="Otp"
                                                                    type="number"
                                                                    id="otp"
                                                                    onChange={handleInputChange}
                                                                    // value={otp}
                                                                    placeholder="Enter OTP"
                                                                />

                                                                <button class="btn btn-outline-primary" type="button" id="button-addon2" onClick={verifyOtp}>Verify</button>
                                                                {error.otp && <div id="name-error" className="invalid-feedback">{error.otp}</div>}
                                                            </div>
                                                        </div>
                                                        :
                                                        ""                                                }
                                            </div>
                                        </div> */}
                                    </div>
                                </div>

                                {/* Services */}
                                <div className="mb-3">
                                    <small>Factors influencing the cost of system</small>
                                    {/* service table */}
                                    <table className="table custom-table table-bordered border-primary">
                                        <thead>
                                            <tr className='text-center' style={{ backgroundColor: "#eaebf7" }}>
                                                <th>Title</th>
                                                <th>Details</th>
                                                <th>Factors</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {/* Service 1 */}
                                            <tr>
                                                <td rowSpan={4}>Implementation Scope</td>
                                                <td rowSpan={4}>The scale and complexity of the DHIS2 implementation, including the number of users, facilities, and data points, can impact the overall cost.</td>
                                                <td>Small-scale</td>
                                            </tr>
                                            <tr><td>Medium-scale</td></tr>
                                            <tr><td>Large-scale</td></tr>
                                            <tr><td>HMIS Programs</td></tr>

                                            {/* Remaining Services */}
                                            {showRemainingServices && (
                                                <>
                                                    {/* Service 2 */}
                                                    <tr>
                                                        <td rowSpan={4}>Customization Requirements</td>
                                                        <td rowSpan={4}>Tailoring the DHIS2 platform to meet specific organizational needs may involve additional development work, and the level of customization required can influence the pricing.</td>
                                                        <td>Basic</td>
                                                    </tr>
                                                    <tr><td>Moderate</td></tr>
                                                    <tr><td>Extensive</td></tr>
                                                    <tr><td>HMIS Programs</td></tr>

                                                    {/* Service 3 */}
                                                    <tr>
                                                        <td rowSpan={2}>Training and Support</td>
                                                        <td rowSpan={2}>Training and support services provided by Amakomaya can be part of the pricing structure. This may include initial training sessions, ongoing support, and access to resources.</td>
                                                        <td>Training sessions</td>
                                                    </tr>
                                                    <tr><td>Ongoing support</td></tr>

                                                    {/* Service 4 */}
                                                    <tr>
                                                        <td rowSpan={2}>Hosting and Infrastructure</td>
                                                        <td rowSpan={2}>Depending on the client's preferences, Amakomaya may offer hosting services for DHIS2</td>
                                                        <td>Cloud-based hosting</td>
                                                    </tr>
                                                    <tr><td>On-premises hosting</td></tr>

                                                    {/* Service 5 */}
                                                    <tr>
                                                        <td rowSpan={2}>Consultation and Analysis</td>
                                                        <td rowSpan={2}>Services related to data analysis, reporting, and insights derived from DHIS2 data may be offered, and these could be included in the pricing model.</td>
                                                        <td>Consultation services</td>
                                                    </tr>
                                                    <tr><td>In-depth analysis and reporting</td></tr>

                                                    {/* Service 6 */}
                                                    <tr>
                                                        <td rowSpan={2}>Licensing Fees</td>
                                                        <td rowSpan={2}>While DHIS2 is open-source, there might be costs associated with specific add-ons, extensions, or premium features that are not part of the core open-source platform</td>
                                                        <td>DHIS2 core (open-source)</td>
                                                    </tr>
                                                    <tr><td>Licensing fees for specific add-ons or premium features</td></tr>
                                                </>
                                            )}
                                            <tr style={{ border: 'none' }}>
                                                <td colSpan={3} className="text-center" style={{ border: 'none' }}>
                                                    <button onClick={toggleRemainingServices} className="btn btn-light" type='button'>
                                                        {showRemainingServices ? 'Hide services' : 'Show more service'} <i class="bi bi-chevron-down"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    {/* purpose textarea */}
                                    <div className="row">
                                        <div className="col-md-12">
                                            <small>Enter your main purpose for requesting demo <span className="text-danger">*</span></small>
                                            <textarea
                                                type="text"
                                                className={`form-control custom-reg-form ${error.purpose ? 'is-invalid' : ''}`}
                                                placeholder='Enter your main purpose for requesting demo'
                                                name='purpose'
                                                // value={userr.purpose}
                                                onChange={handleInputChange}
                                                rows="3"
                                            />
                                            {error.purpose && <div id="name-error" className="invalid-feedback">{error.purpose}</div>}
                                        </div>
                                    </div>
                                </div>

                                {/* Request Demo button */}
                                <div className="mb-4 text-center">
                                    {
                                        (12345)
                                            ?
                                            <button type="submit" className="btn btn-primary btn-design">Request Demo</button>
                                            :
                                            <div>
                                                <button type="submit" className="btn btn-secondary btn-design" disabled>Request Demo</button>
                                            </div>
                                    }
                                </div>
                            </form>

                            {/* Successful message for Demo request */}
                            <div className="mt-4">
                                {
                                    (status)
                                        ?
                                        <div class="alert alert-success" role="alert">
                                            Your request is successfully submit ! Please check your email.
                                        </div>

                                        :
                                        ""
                                }
                            </div>

                            <hr />
                            {/* Video */}
                            <div className="video text-center">
                                <iframe width="560" height="315" src="https://www.youtube.com/embed/FOa54Wm2vO0?si=aBGXMBKMXK3ukFZ6" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                            </div>
                            <hr />
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default RegistrationForm;