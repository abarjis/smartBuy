import React, { Fragment, useEffect } from 'react'
import MetaData from './components/layout/MetaData'
import Product from './components/product/Product'
import Loader from './components/layout/Loader'

import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from './actions/productActions'



const Home = () => {
    
    const dispatch = useDispatch();
    const { loading, products, error, productsCount } = useSelector(state => state.products)

    useEffect(() => {
      dispatch(getProducts());
     }, [dispatch])
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
              </Fragment>
          )}
        </Fragment>
    )
}

export default Home