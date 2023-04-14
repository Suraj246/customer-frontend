import React, { useState, useEffect } from 'react'
import axios from 'axios'
const Create = () => {
    const [input, setInput] = useState({ customer: "", email: "", })

    const [isActive, setIsActive] = useState(false)
    const [selected, setSelected] = useState('')
    const [error, setError] = useState(false)
    const inputHandler = (e) => {
        const { value, name } = e.target
        setInput({ ...input, [name]: value })
    }
    const submit = (e) => {
        if (input.customer === '' || input.email === '') {
            alert("fill the boxes")
            return
        }
        axios.post('http://localhost:5000/api/create', { input, city: selected })
            .then((res) => {
                window.location.reload()
                setInput({ customer: '', email: '' })
                setSelected('')
            })
            .catch((err) => {
                if (err.response.data.message === false) {
                    setError(!error)
                }
                else if (err.response.status === 409) {
                    alert(err.response.data.message)
                    setInput({ email: '' })

                }
                else {
                    alert(err)
                }
            })

    }

    const options = ["Bangalore", "Delhi", "Hydrabad", "Mumbai"]
    return (
        <div>
            <div className="header-title">
                <span className='title'>Add new customer</span>
            </div>
            <div className="form">
                <div className="f">
                    <div className="fullname-container">
                        <label htmlFor="customer">Full name</label>
                        <input type="text" name="customer" id="customer" value={input.customer} onChange={inputHandler} placeholder='e.g steve jobs' />
                    </div>
                    <div className="fullname-container">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" value={input.email} onChange={inputHandler} placeholder='e.g stevejobs@gmail.com' />
                    </div>

                    <div className="dropdown-container">
                        <label>City</label>

                        <div className="dropdown" onClick={(e) => setIsActive(!isActive)}>
                            {selected ?
                                <>
                                    <div className="dropdown-btn" >{selected}</div>
                                    <i className='bx bx-chevron-down arrow-city'></i>
                                </>

                                :
                                <>
                                    <span className="se">Select City</span>
                                    <i className='bx bx-chevron-down arrow-city'></i>
                                </>

                            }
                            {isActive &&
                                <div className="dropdown-content">

                                    {options.map((option, idx) => {
                                        return (
                                            <div className="dropdown-item"
                                                key={idx}
                                                onClick={e => {
                                                    setSelected(option)
                                                    setIsActive(false)
                                                }}
                                            >
                                                {option}

                                            </div>
                                        )
                                    })}

                                </div>
                            }
                        </div>

                    </div>


                </div>
                <dir className="submit-container">
                    {error ?
                        <div className="error-email">
                            <i className='bx bx-error warning'></i>
                            <span className="er">Email invalid</span>
                        </div>
                        : null
                    }
                    <button onClick={submit} className='submit'>SUBMIT</button>
                </dir>


            </div>
        </div>
    )
}

export default Create
