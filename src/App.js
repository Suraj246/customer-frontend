import './App.css';
import Create from './components/Create'
import Customers from './components/Customers'
import React, { useEffect, useState } from 'react'
import axios from 'axios';

function App() {

  const [isActive, setIsActive] = useState(false)
  const [selected, setSelected] = useState('')
  const [data, setData] = useState([])

  // get unique cities
  const arr = new Set([])
  data.filter((item) => arr.add(item.city))
  const array = [...arr];

  // get reversed array
  let reversed_array = [];
  for (let i = data.length - 1; i >= 0; i--) {
    reversed_array.push(data[i]);
  }



  // get data from backend
  useEffect(() => {
    // axios.get('http://localhost:5000/')
    axios.get('https://customer-backend-mwab.onrender.com')
      .then((res) => {
        setData(res?.data?.products)
      })
      .catch((err) => alert(err))
  }, [])

  // filter data on user click
  const filterItems = (mode) => {
    const get = data.filter((item) => {
      return item.city === mode;
    });
    setData(get)
  };

  return (
    <div className="App">
      <Create />
      <div className='filter-container'>
        <div className='filtertitle'>
          <span>Customers</span>

        </div>
        <div className='filter-container-flex'>
          {selected ?
            <div className='emailerror-container'>
              <button className='remove-filter' onClick={() => window.location.reload()}>
                <img src="/img/remove.png" alt="" className='remove' />
                <span> Remove filter </span>
              </button>
            </div>
            :
            <div className='emailerror-container none'>
              <button className='remove-filter'>
                <img src="/img/remove.png" alt="" className='remove' />
                <span> Remove filter </span>
              </button>
            </div>
          }

          <div className="dropdown-container">

            <div className="dropdown-filter" onClick={(e) => setIsActive(!isActive)}>
              {selected ?
                <>
                  <div className="dropdown-btn" >{selected}</div>
                  <i className='bx bx-chevron-down arrow-city arrow'></i>
                </>

                :
                <>
                  <span className="se">Filter by City</span>
                  <i className='bx bx-chevron-down arrow-city arrow'></i>
                </>

              }
              {isActive &&
                <div className="dropdown-content">
                  <div style={{ display: "grid" }}>
                    {array.map((item, idx) => {
                      return (
                        <div className="dropdown-item"
                          key={idx}
                          onClick={e => {
                            setSelected(item)
                            setIsActive(false)
                          }}
                        >
                          <span
                            onClick={() => filterItems(item)}
                          >{item}</span>

                        </div>
                      )
                    }
                    )
                    }
                  </div>

                  {/* {data?.map((option, idx) => {
                    return (
                      <div className="dropdown-item"
                        key={idx}
                        onClick={e => {
                          setSelected(option?.city)
                          setIsActive(false)
                        }}
                      >
                        <span onClick={() => filterItems(option?.city)}
                        >
                          {option?.city}
                        </span>
                      </div>
                    )
                  })} */}

                </div>
              }
            </div>

          </div>
        </div>
      </div>
      <div className="customer-container">
        <Customers data={reversed_array} />
      </div>
    </div>
  );
}

export default App;
