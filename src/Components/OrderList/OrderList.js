import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Footer from "../Footer/Footer"
import Nav from "../Nav/Nav"


const OrderList = () => {
    const [orderList, setOrderList] = useState([])
    const param = useParams()
    console.log();
    useEffect(()=>{
        param.id===undefined ? 
            fetch('https://travel-plan-server.herokuapp.com/orders/')
            .then(res=> res.json())
            .then(data=> setOrderList(data))
        :
        fetch(`https://travel-plan-server.herokuapp.com/order/${param.id}`)
        .then(res=> res.json())
        .then(data=> setOrderList(data))
    },[param.id])
    console.log(orderList);
    return (
        <>
        <Nav/>
            <h2>{param.id===undefined ? 'My Bookings' : "All Bookings"}</h2>

            {orderList.map((data, index)=>{
                return <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{data.package_name}</h5>
                    <div className="card-text d-flex justify-content-between">
                        <span className="btn btn-success">{data.order_author}</span> <span className="btn btn-primary">{data.order_author_email}</span>
                    </div>
                </div>
            </div>
            })}
            <Footer/>
        </>
    )
}

export default OrderList
