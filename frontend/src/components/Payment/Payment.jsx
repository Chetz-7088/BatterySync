import React, { useState } from "react";
import axios from 'axios';
import PageTransitionWrapper from "../../PageTransitionWrapper";
import Navbar from "../Navbar/Navbar";

const Payment = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        amount: 500
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
    
        try {
          // Create order on backend
          const orderResponse = await axios.post('/api/create-order', {
            amount: formData.amount * 100, // Razorpay expects amount in paise
            currency: 'INR'
          });
    
          const options = {
            key: process.env.REACT_APP_RAZORPAY_KEY_ID,
            amount: orderResponse.data.amount,
            currency: orderResponse.data.currency,
            name: "Your Company Name",
            description: "Premium Membership",
            order_id: orderResponse.data.id,
            handler: async function(response) {
              // Verify payment on backend
              await axios.post('/api/verify-payment', {
                payment_id: response.razorpay_payment_id,
                order_id: response.razorpay_order_id,
                signature: response.razorpay_signature
              });
    
              // Activate membership
              await axios.post('/api/activate-membership', {
                name: formData.name,
                email: formData.email
              });
    
              alert('Payment Successful! Membership Activated');
              // Redirect to dashboard or success page
            },
            prefill: {
              name: formData.name,
              email: formData.email
            },
            theme: {
              color: "#F37254"
            }
        };
    
        const rzp = new window.Razorpay(options);
        rzp.open();
        } catch (err) {
            setError(err.response?.data?.message || 'Payment failed');
        } finally {
            setLoading(false);
        }
    };
    return (
        <>
        <PageTransitionWrapper>
            <div className="">
                <Navbar />
                <h2>Explore Plans</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Name:</label>
                        <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                    </div>
                    {error && <div className="error">{error}</div>}
                    <button type="submit" disabled={loading}>
                        {loading ? 'Processing...' : 'Pay'}
                    </button>
                </form>
            </div>
        </PageTransitionWrapper>
        </>
    );
};

export default Payment;