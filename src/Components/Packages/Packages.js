import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import "./packages.css"
const Packages = () => {
    const [packages, setPackages] = useState([])

    useEffect(() => {
        fetch("https://travel-plan-server.herokuapp.com/packages?limit=6")
        .then(response => response.json())
        .then(data =>setPackages(data))
    }, []);
    return (
        <>
            <div className="container">
                <h2>Our Packages</h2>
                <div className="row">
                {packages.map((packs, index) =>{

                    return <div className="col-md-4" key={index}>
                        <div className="card">
                            <img src={packs.img} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">{packs.name}</h5>
                                <div className="card-text d-flex justify-content-between">
                                    <span className="btn btn-success">{packs.price}</span> <span className="btn btn-primary">{packs.duration}</span>
                                </div>
                                <Link to={`/order/${packs.name}`} className="btn text-danger my-2 float-end text-uppercase fw-bold">Book a tour</Link>
                            </div>
                        </div>
                    </div>;
                })}
</div>
            </div>
        </>
    );
};

export default Packages;
