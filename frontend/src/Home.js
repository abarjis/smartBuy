import React, { Fragment } from 'react'
import MetaData from './components/layout/MetaData'
import { useDispatch, useSelector } from 'react-redux'




const Home = () => {
    return (
        <Fragment>
             <MetaData title={'Best Place For Used EV Cars'} />

            <h1 id="products_heading">Latest Products</h1>
            <section id="products" className="container mt-5">
      <div className="row">
        <div className="col-sm-12 col-md-6 col-lg-3 my-3">
          <div className="card p-3 rounded">
            <img
              className="card-img-top mx-auto"
              src="https://tesla-cdn.thron.com/delivery/public/image/tesla/c82315a6-ac99-464a-a753-c26bc0fb647d/bvlatuR/std/1200x628/lhd-model-3-social"
              alt="EV CAR"
            />
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">
                <a href="">TESLA Model 3</a>
              </h5>
              <div className="ratings mt-auto">
                <div className="rating-outer">
                  <div className="rating-inner"></div>
                </div>
                <span id="no_of_reviews">(5 Reviews)</span>
              </div>
              <p className="card-text">$38,000</p>
              <a href="#" id="view_btn" className="btn btn-block">View Details</a>
            </div>
          </div>
        </div>
      </div>
    </section>
            
        </Fragment>
    )
}

export default Home