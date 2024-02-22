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

    // const [phone, setPhone] = useState();
    const [user, setUser] = useState(null);
    const [otp, setOtp] = useState("");
    const [verifyStatus, setVerifyStatus] = useState(false)

    const [lastRequestTime, setLastRequestTime] = useState(null);
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState(false)


    // Validation ------------------------
    const [userr, setUserr] = useState({
        fmname: '',
        lname: '',
        phone: '',
        wordno: '',
        tole: '',
    })

    const provinces = provincesData;
    const districtsByProvince = districtsData;
    const municipalitiesByDistrict = municipalitiesData;

    const [selectedProvince, setSelectedProvince] = useState(null);
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [selectedMunicipality, setSelectedMunicipality] = useState(null);

    const [selectedOccupation, setSelectedOccupation] = useState(null)
    const [selectedPosition, setSelectedPosition] = useState(null)


    const [error, setError] = useState({
        fmname: '',
        lname: '',
        phone: '',
        province_type: '',
        district_type: '',
        municipality_type: '',
        occupation_type: '',
        position_type: '',
        wordno: '',
        tole: '',
    })

    const validateFmname = (fmname) => {
        const fmnameRegex = /^[A-Za-z ]+$/;
        return fmnameRegex.test(fmname)
    }

    const validateLname = (Lname) => {
        const lnameRegex = /^[A-Za-z ]+$/;
        return lnameRegex.test(Lname)
    }

    const validatePhone = (phone) => {
        const phoneRegex = /^\+9779\d{9}$/;
        return phoneRegex.test(phone)
    }

    const validateWordno = (wordno) => {
        const wordnoRegex = /^\d+$/;
        return wordnoRegex.test(wordno)
    }

    const validateTole = (tole) => {
        const toleRegex = /^[A-Za-z ]+$/;
        return toleRegex.test(tole)
    }

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
        

        if (!validatePhone(userr.phone)) {
            setError((preError) => ({ ...preError, phone: 'Invalid Phone number' }))
            alert('Invalid Phone number')
            return;
        }


        if (selectedProvince === null) {
            setError((prevErrors) => ({ ...prevErrors, province_type: 'Province is required' }));
            return;
        }
        if (selectedDistrict === null) {
            setError((prevErrors) => ({ ...prevErrors, district_type: 'District is required' }));
            return;
        }
        if (selectedMunicipality === null) {
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

        if (selectedOccupation === null) {
            setError((prevErrors) => ({ ...prevErrors, occupation_type: 'Occupation is required' }));
            return;
        }

        if (selectedPosition === null) {
            setError((prevErrors) => ({ ...prevErrors, position_type: 'Position is required' }));
            return;
        }

        setUser({
            fmname: '',
            lname: '',
            phone: '',
            wordno: '',
            tole: ''
        })

        setError({
            fmname: '',
            lname: '',
            phone: '',
            province_type: '',
            district_type: '',
            municipality_type: '',
            wordno: '',
            tole: ''
        })

        alert('submit')
    }
    // -----------------------------------

    const handleProvinceChange = (e) => {
        const provinceId = parseInt(e.target.value, 10);
        setSelectedProvince(provinceId);
        setSelectedDistrict(null); // Reset district when province changes
    };

    const handleDistrictChange = (e) => {
        const districtId = e.target.value;
        setSelectedDistrict(districtId);
    };


    const sendOtp = async () => {
        const currentTime = new Date();

        if (!lastRequestTime || currentTime.getTime() - lastRequestTime.getTime() >= 2 * 60 * 1000) {
            // If the user hasn't clicked in the last 2 minutes or it's the first click
            try {
                const recaptchaContainer = document.createElement('div');
                document.body.appendChild(recaptchaContainer);

                const recaptcha = new RecaptchaVerifier(auth, recaptchaContainer, {});
                const confirmation = await signInWithPhoneNumber(auth, phone, recaptcha);

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
            const data = await user.confirm(otp);
            toast.success("OTP Verified ! Request the Demo")

            console.log(data);
        } catch (err) {
            setMessage("Invalid OTP");
            console.error(err);
        }
    }

    return (
        <>
            <Header2 />
            <div className="my-4 new_container rounded shadow">
                <div className="row">
                    <div className="card">
                        <div className="card-body px-5">
                            <h2 className="cart-title text-center pb-3">Welcome</h2>
                            <form onSubmit={handleForm}>
                                <div className="mb-4">
                                    <div className="row g-2">
                                        {/* First and Middle name */}
                                        <div className="col-sm-6">
                                            <input
                                                type="text"
                                                className={`form-control ${error.fmname ? 'is-invalid' : ''}`}
                                                placeholder='Enter first and middle name'
                                                name='fmname'
                                                onChange={handleInputChange}
                                            />
                                            {error.fmname && <div id="name-error" className="invalid-feedback">{error.fmname}</div>}
                                        </div>

                                        {/* Last name */}
                                        <div className="col-sm-6">
                                            <input
                                                type="text"
                                                className={`form-control ${error.lname ? 'is-invalid' : ''}`}
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
                                        {/* Phone Number */}
                                        <div className="col-md-6">
                                            <PhoneInput
                                                country={'np'}
                                                className={`react-tel-input ${error.phone ? 'is-invalid' : ''}`}
                                                onChange={(phone) => setUserr((prevUser) => ({ ...prevUser, phone: "+" + phone }))}
                                            />
                                            <div style={{ lineHeight: '1' }}>
                                                <small className='text-warning'><i>* Please verify your mobile number before requesting a demo account</i></small>
                                            </div>
                                            {/* {error.phone && <div id="phone-error" className="invalid-feedback">{error.phone}</div>} */}
                                        </div>

                                        {/* Send OTP Button */}
                                        <div className="col-md-6">
                                            <div className="row">
                                                <div className="col-md-5">
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
                                                                    type="number"
                                                                    id="otp"
                                                                    className={`form-control ${message !== '' ? 'is-invalid' : ''}`}
                                                                    value={otp}
                                                                    placeholder="Enter OTP"
                                                                    onChange={(e) => setOtp(e.target.value)}
                                                                />

                                                                <button class="btn btn-outline-primary" type="button" id="button-addon2" onClick={verifyOtp}>Verify</button>
                                                                {message !== '' && <div className="invalid-feedback">{message}</div>}

                                                            </div>
                                                        </div>
                                                        :
                                                        ""
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <div className="row g-2">
                                        {/* Province */}
                                        <div className="col-sm-6">
                                            <select
                                                className={`form-select ${error.province_type ? 'is-invalid' : ''}`}
                                                name="province_type"
                                                aria-label="Province"
                                                onChange={(e) => {
                                                    handleProvinceChange(e);
                                                    setSelectedProvince(e.target.value);
                                                    setError((prevErrors) => ({ ...prevErrors, province_type: '' }));
                                                }}
                                                value={selectedProvince}
                                            >
                                                <option disabled>
                                                    Select province
                                                </option>
                                                {provinces.map((province) => (
                                                    <option key={province.id} value={province.id}>
                                                        {province.name}
                                                    </option>
                                                ))}
                                            </select>
                                            {error.province_type && (
                                                <div className="invalid-feedback">{error.province_type}</div>
                                            )}
                                        </div>

                                        {/* District */}
                                        <div className="col-sm-6">
                                            <select
                                                className={`form-select ${error.district_type ? 'is-invalid' : ''}`}
                                                name="district_type"
                                                aria-label="District"
                                                // onChange={handleDistrictChange}
                                                onChange={(e) => {
                                                    handleDistrictChange(e);
                                                    setSelectedDistrict(e.target.value);
                                                    setError((prevErrors) => ({ ...prevErrors, district_type: '' }));
                                                }}
                                                value={selectedDistrict}
                                            >
                                                <option selected disabled>
                                                    District
                                                </option>
                                                {selectedProvince &&
                                                    districtsByProvince[selectedProvince].map((district) => (
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

                                <div className="mb-4">
                                    <div className="row g-2">
                                        {/* Municipality */}
                                        <div className="col-sm-6">
                                            <select
                                                className={`form-select ${error.municipality_type ? 'is-invalid' : ''}`}
                                                name="municipality_type"
                                                aria-label="Municipality"
                                                onChange={(e) => {
                                                    setSelectedMunicipality(e.target.value);
                                                    setError((prevErrors) => ({ ...prevErrors, municipality_type: '' }));
                                                }}
                                                value={selectedMunicipality}
                                            >
                                                <option selected disabled>
                                                    Municipality
                                                </option>
                                                {selectedDistrict &&
                                                    municipalitiesByDistrict[selectedDistrict].map((municipality) => (
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
                                            <input
                                                type="text"
                                                className={`form-control ${error.wordno ? 'is-invalid' : ''}`}
                                                placeholder='Ward no'
                                                name='wordno'
                                                // value={userr.wordno}
                                                onChange={handleInputChange}
                                            />
                                            {error.wordno && <div id="name-error" className="invalid-feedback">{error.wordno}</div>}
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <div className="row g-2">
                                        {/* Tole */}
                                        <div className="col-md-6">
                                            <input
                                                type="text"
                                                className={`form-control ${error.tole ? 'is-invalid' : ''}`}
                                                placeholder='Tole'
                                                name='tole'
                                                // value={userr.wordno}
                                                onChange={handleInputChange}
                                            />
                                            {error.tole && <div id="name-error" className="invalid-feedback">{error.tole}</div>}
                                        </div>
                                        {/* Occupation */}
                                        <div className="col-sm-6">
                                            <select
                                                className={`form-select ${error.occupation_type ? 'is-invalid' : ''}`}
                                                name="occupation_type"
                                                aria-label="Occupation"
                                                onChange={(e) => {
                                                    setSelectedOccupation(e.target.value);
                                                    setError((prevErrors) => ({ ...prevErrors, occupation_type: '' }));
                                                }}
                                                value={selectedOccupation}
                                            >
                                                <option selected aria-readonly>Select Occupation</option>
                                                <option value="1">Type 1</option>
                                                <option value="1">Type 2</option>
                                                <option value="1">Type 3</option>
                                                <option value="1">Type 3</option>
                                            </select>
                                            {error.occupation_type && (
                                                <div className="invalid-feedback">{error.occupation_type}</div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    {/* Position */}
                                    <div className="col-sm-6">
                                        <select
                                            className={`form-select ${error.position_type ? 'is-invalid' : ''}`}
                                            name="occupation_type"
                                            aria-label="Occupation"
                                            onChange={(e) => {
                                                setSelectedPosition(e.target.value);
                                                setError((prevErrors) => ({ ...prevErrors, position_type: '' }));
                                            }}
                                            value={selectedPosition}
                                        >
                                            <option selected aria-readonly>Select Occupation</option>
                                            <option value="1">Type 1</option>
                                            <option value="1">Type 2</option>
                                            <option value="1">Type 3</option>
                                            <option value="1">Type 3</option>
                                        </select>
                                        {error.position_type && (
                                            <div className="invalid-feedback">{error.position_type}</div>
                                        )}
                                    </div>
                                </div>

                                <div className="mb-4">
                                    {/* Services */}
                                    <table className="custom-table">
                                        <thead>
                                            <tr>
                                                <th>Choose Services</th>
                                                <th>Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" checked />
                                                        <label className="form-check-label"> Default Service </label> <br />
                                                        <small className='px-3'>lorem ipsum dolor sit amet consectetur, adipisicing elit. Vitae, cupiditate?</small>
                                                    </div>
                                                </td>
                                                <td>Rs. 500</td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" />
                                                        <label className="form-check-label"> Service 1 </label> <br />
                                                        <small className='px-3'>lorem ipsum dolor sit amet consectetur, adipisicing elit. Vitae, cupiditate?</small>
                                                    </div>
                                                </td>
                                                <td>Rs. 200</td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" />
                                                        <label className="form-check-label"> Service 2 </label> <br />
                                                        <small className='px-3'>lorem ipsum dolor sit amet consectetur, adipisicing elit. Vitae, cupiditate?</small>
                                                    </div>
                                                </td>
                                                <td>Rs. 100</td>
                                            </tr>

                                        </tbody>
                                    </table>
                                </div>

                                {/* Request Demo button */}
                                <div className="mb-4">
                                    {
                                        (12345)
                                            ?
                                            <button type="submit" className="btn btn-primary">Request Demo</button>
                                            :
                                            <div>
                                                <button type="submit" className="btn btn-secondary" disabled>Request Demo</button>
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

                            {/* Video */}
                            <div className="video">
                                <iframe width="560" height="315" src="https://www.youtube.com/embed/FOa54Wm2vO0?si=aBGXMBKMXK3ukFZ6" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default RegistrationForm;