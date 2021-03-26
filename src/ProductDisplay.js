import { render } from '@testing-library/react';
import React from 'react'
import ProductTable from '../../productapp/src/ProductTable';

export default class ProductDisplay extends React.Component {
  
  
    constructor(props) {
        super(props);
        this.state = {
            networkError: false,
            startEditing: false,
            product: {},
            porductId: 100,
            products: []
        }
    }


    showForm = (product) => {
        this.setState({ startEditing: true, product: product });
    }

    cancel = () => {
        this.setState({ startEditing: false, product: {} });
    }

   
    deleteProduct = (porductId) => {
        fetch(`http://localhost:8080/api/products/${productId}`, {
            method: "DELETE",
        }).then((data) => data.json)
            .then((res) => this.setState(
                {
                    products:
                        this.state.products.filter((product) => product.id !== productId)
                }
            ))
    }
   
   
    save = (product) => {
        if (!product.id) {
            fetch(`http://localhost:8080/api/products`, {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(product)
            })
                .then((data) => data.json())
                .then(
                    (res) => {
                        this.setState({
                            products: this.state.products.concat(res),
                            startEditing: false
                        });
                        console.log(res)
                    }
                )

        }
        else {
            fetch(`http://localhost:8080/api/products/${product.id}`, {
                method: "PUT",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(product)
            })
                .then((data) => data.json())
                .then(
                    (res) => this.setState(
                        {
                            products: this.state.products.map((p) => p.id ? res : p),
                            startEditing: false
                        }
                    )
                )

        }
    }
 
 
    render() {
        if (this.state.networkError) { return <p>problemes de connexion !</p> }
        else {
            return this.state.startEditing

                ?
                <ProductForm product={this.state.product} cancelCallBack={this.cancel}
                    saveCallback={this.save} />
                :
                <ProductTable products={this.state.products} showForm={this.showForm} deleteCallback={this.deleteProduct} />
        }
    }


    componentDidMount = () => {
        let promesse = fetch = ("http://localhost:8080/api/products");
        promesse.then((data) => {
            console.log(data);
            return data.json()
        }).then((res) => {
            console.log(res);
            this.setState({ product: res })
        })
            .catch((err) => {
                console.log(err)
                this.setState({ networkError: true })
            })
    }
}