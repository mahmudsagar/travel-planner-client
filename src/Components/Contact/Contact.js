const Contact = () => {
    return (
        <>
            <div className="container">
                <h2>Contact Us</h2>
                <div className="my-3">
                    <label
                        htmlFor="exampleFormControlInput2"
                        className="form-label"
                    >
                        Email address
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="exampleFormControlInput2"
                        placeholder="name@example.com"
                    />
                </div>
                <div className="mb-3">
                    <label
                        htmlFor="exampleFormControlTextarea2"
                        className="form-label"
                    >
                        Enter your message
                    </label>
                    <textarea
                        className="form-control"
                        id="exampleFormControlTextarea2"
                        rows={3}
                    ></textarea>
                </div>
            </div>
        </>
    );
};

export default Contact;
