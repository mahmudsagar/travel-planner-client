import { Link } from "react-router-dom"

const ThankYou = () => {
    return (
        <div className="text-center">
            <h1 >Thank You for chosing us</h1>
            <p>Wish you a happy journey</p>
            <Link to="/">Go to Home</Link>
        </div>
    )
}

export default ThankYou
