import { getAuth } from "@firebase/auth";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Nav from "../Nav/Nav";
import Footer from "../Footer/Footer";

const Order = () => {
    const [address, setAddress] = useState("");
    const [number, setNumber] = useState("");
    const [order, setOrder] = useState(null);
    const history = useHistory();
    const auth = getAuth();
    const param = useParams();
    const currentUser = auth.currentUser;
    const handleOrder = () => {
        const orderDetail = {
            package_name: param.name,
            order_uid: currentUser.uid,
            order_author: currentUser.displayName,
            order_author_email: currentUser.email,
            order_address: address,
            order_nnumber: number,
        };
        fetch("https://travel-plan-server.herokuapp.com/orders", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(orderDetail),
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                history.push("/thank-you");
            });
    };

    useEffect(() => {
        fetch(`https://travel-plan-server.herokuapp.com/packages/${param.name}`)
            .then((res) => res.json())
            .then((data) => setOrder(data));
    }, [param.name]);
    return (
        <>
            <Nav />
            <div className="container">
                <div className="row">
                    <div className="col-md-7">
                        <h2>You chose</h2>
                        <img src={order.img} className="w-100" alt="" />
                        <h3>{order.name}</h3>
                        <p>{order.price}</p>
                        <p>{order.duration}</p>
                    </div>
                    <div className="col-md-5">
                        <h2>You Detail</h2>
                        <input
                            type="text"
                            disabled
                            name="name"
                            className="form-control mb-3"
                            value={currentUser?.displayName}
                        />
                        <input
                            type="email"
                            disabled
                            name="name"
                            className="form-control mb-3"
                            value={currentUser?.email}
                        />
                        <input
                            name="number"
                            type="text"
                            className="form-control mb-3"
                            id="number"
                            placeholder="enter your phonenumber"
                            onBlur={(e) => setNumber(e.target.value)}
                        />
                        <textarea
                            name="address"
                            id="address"
                            className="form-control"
                            cols={30}
                            rows={10}
                            placeholder="enter your adress"
                            onChange={(e) => setAddress(e.target.value)}
                        ></textarea>
                        <button
                            className="btn btn-success mt-3"
                            onClick={handleOrder}
                        >
                            submit
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Order;
