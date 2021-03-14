import React, { Fragment, useState, useEffect } from 'react'
import MetaData from './components/layout/MetaData'
import Product from './components/product/Product'
import Loader from './components/layout/Loader'

import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from './actions/productActions'

import { useAlert } from 'react-alert';


const Home = () => {
    
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, products, error, productsCount } = useSelector(state => state.products)

  useEffect(() => {
      if (error) {
          return alert.error(error)
        }

      dispatch(getProducts());
     }, [dispatch, alert, error])
    return (
        <Fragment>
          {loading ? <Loader /> : (
            <Fragment>
      <MetaData title={'Best Place For Used EV Cars'} />

    <h1 id="products_heading">Latest Products</h1>
    <section id="products" className="container mt-5">
    <div className="row">
    {products && products.map(product => (

    <Product key={product._id} product={product} />

        ))}
      </div>
      </section>
      <div className="d-flex justify-content-center mt-5">
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={resPerPage}
                                totalItemsCount={productsCount}
                                onChange={setCurrentPageNo}
                                nextPageText={'Next'}
                                prevPageText={'Prev'}
                                firstPageText={'First'}
                                lastPageText={'Last'}
                                itemClass="page-item"
                                linkClass="page-link"
                            />
                        </div>



              </Fragment>
          )}
        </Fragment>
    )
}

export default Home