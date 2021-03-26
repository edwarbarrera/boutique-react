import React from 'react';
import ProduitDisplay from './ProductDisplay'

class Librairie extends React.Component {

    constructor(props){
        super(props);
        this.state={
            aciveComponent="products"
        }
    }
handleClick=(datatype)=>{
    console.log("button clicked!"+datatype);
    this.setState({aciveCompnent:datatype});
}

    render(){
        return(
            <React.Fragment>
                <nav>
                    <button onClick={()=> this.handleClick("products")}>products</button>
                   
                    <button onClick={()=> this.handleClick("suppliers")}></button>
                </nav>
                <main>
                    {
                        this.state.aciveCompnent==="products" ?
                        <div><ProductDisplay /></div> :
                        <div>Suppliers</div>
                    }
                </main>
            </React.Fragment>
        )
    }

}
export default Librairie;