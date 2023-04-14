import React from 'react'
import axios from 'axios'

const Customers = ({ data }) => {

    // delete data on user click
    const deleteItem = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/delete/${id}`)
            window.location.reload()

        } catch (error) {
            alert(error)
        }
    }

    return (
        <div className="customers-page">
            {data.length === 0 ? "Loading..." :

                data?.map((item, idx) => {
                    return (
                        <div key={idx} className="product">
                            <div className='city-img'>
                                {item.image === '' ?
                                    <img src='/img/Web capture_12-1-2023_11741_www.figma.com.jpeg' alt="" />
                                    :
                                    <img src={item.image} alt="" />
                                }
                            </div>
                            <div className="bottom">
                                <div className="cust-details">
                                    <span className='cust-name'>{item.customer}</span>
                                    <span className='cust-email'>{item.email}</span>
                                    <span className='cust-email'>{item.city}</span>
                                </div>
                                <div>
                                    <i className='bx bxs-trash-alt'
                                        onClick={() => deleteItem(item._id)}
                                    ></i>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Customers
