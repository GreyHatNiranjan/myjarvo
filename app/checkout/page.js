'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../components/Header';
import { useAppSelector } from "../lib/hooks";
import { useSession, signIn, signOut } from "next-auth/react"
import Image from 'next/image';
const Checkout = () => {
    const { data: session,status } = useSession()
    const [activeButton, setActiveButton] = useState('guest');
    const router = useRouter();
    const cartItems = useAppSelector((state) => state.counter.cart);
    const [products, setProducts] = useState([]);
    const [selectedPayment, setSelectedPayment] = useState('upi');

    // Initialize form data and errors
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        country: 'India',
        city: '',
        state: '',
        zip: '',
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        setProducts(cartItems?.filter((item) => item != null) || []);
        if (session) {
            setActiveButton('login');
        }
    }, [cartItems]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Validate the form fields
    const validateForm = () => {
        const newErrors = {};
        const { firstName, lastName, email, phone, address, city, state, zip } = formData;

        if (firstName.length < 2 || firstName.length > 30) {
            newErrors.firstName = 'First Name must be between 2 and 30 characters.';
        }
        if (lastName.length < 2 || lastName.length > 30) {
            newErrors.lastName = 'Last Name must be between 2 and 30 characters.';
        }
        if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            newErrors.email = 'Email is invalid.';
        }
        if (!/^\d{10}$/.test(phone)) {
            newErrors.phone = 'Phone number must be exactly 10 digits.';
        }
        if (address.length < 5 || address.length > 100) {
            newErrors.address = 'Address must be between 5 and 100 characters.';
        }
        if (city.length < 2 || city.length > 30) {
            newErrors.city = 'City must be between 2 and 30 characters.';
        }
        if (state.length < 2 || state.length > 30) {
            newErrors.state = 'State must be between 2 and 30 characters.';
        }
        if (!/^\d{6}$/.test(zip)) {
            newErrors.zip = 'ZIP Code must be exactly 6 digits.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Returns true if there are no errors
    };

    const handlePlaceOrder = () => {
        if (validateForm()) {
            // Proceed with placing the order
            router.push("/payment")
            console.log('Order placed!', formData);
        } else {
            console.log('Please fill all required fields correctly.');
        }
    };

    // Total price calculation logic
    const totalPrice = products.reduce((total, product) => {
        return total + product.discountedPrice * product.min_quantity;
    }, 0);

    // Calculate the final total with potential discount
    const finalTotal = selectedPayment === 'upi' && totalPrice > 500
        ? totalPrice - 50 // Apply discount
        : totalPrice;

        useEffect(() => {
            if (status === "authenticated") {
                setActiveButton('login')
            } else if (status === "unauthenticated") {
                setActiveButton('guest')
            }
        }, [status]);
    return (
        <>
            <Header />
            <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 py-12">
                <div className="max-w-4xl mx-auto bg-white p-8 md:p-16 rounded-lg shadow-xl">
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-10 text-center text-gray-800">
                        Secure Checkout
                    </h2>

                    {/* Checkout Options */}
                    <div className="flex flex-col sm:flex-row justify-around mb-10">
                        <button onClick={() => setActiveButton('guest')} className={`w-full sm:w-auto text-white py-3 px-6 rounded-full mb-4 sm:mb-0 transition duration-200 ${activeButton === 'guest' ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-700'}`}>Guest Checkout</button>
                        {!session && <>
                            <button onClick={() => {
                                setActiveButton('login')
                                router.push('/profile')
                            }
                            } className={`w-full sm:w-auto text-white py-3 px-6 rounded-full mb-4 sm:mb-0 transition duration-200 ${activeButton === 'login' ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-700'}`}>Login</button>
                            <button onClick={() => {
                                setActiveButton('register')
                                router.push('/profile')
                            }} className={`w-full sm:w-auto text-white py-3 px-6 rounded-full transition duration-200 ${activeButton === 'register' ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-700'}`}>Register</button>
                        </>

                        }
                        {session && <>
                            <button onClick={() => {
                                setActiveButton('login')
                                // router.push('/profile')
                            }
                            } className={`w-full sm:w-auto text-white py-3 px-6 rounded-full mb-4 sm:mb-0 transition duration-200 ${activeButton === 'login' ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-700'}`}>Logged In</button>
                        </>

                        }


                    </div>

                    {/* Order Summary */}
                    <div className="mb-10 bg-gray-100 p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold mb-4 text-gray-800">Order Summary</h3>
                        <div className="space-y-4">
                            {products.map((product) => (
                                <div key={product.id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm">
                                    <Image width={30} height={30} src={product.image1} alt={product.title} className="w-16 h-16 object-cover rounded-md" />
                                    <div className="flex-1 mx-4">
                                        <p className="text-gray-800 font-semibold">{product.title}</p>
                                        <p className="text-gray-500">Quantity: {product.min_quantity}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-gray-800 font-bold">₹{product.min_quantity * product.discountedPrice}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between items-center font-bold text-lg mt-6 border-t pt-4 border-gray-300">
                            <span className="text-gray-900">Total:</span>
                            <span className="text-gray-900">₹{finalTotal}</span>
                        </div>
                    </div>

                    {/* Address Form */}
                    <div className="mb-10">
                        <h3 className="text-lg font-semibold mb-6 text-gray-800">Billing Details</h3>
                        <form>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                                <input type="text" name="firstName" placeholder="First Name" className={`p-4 border rounded-lg w-full focus:outline-none focus:ring-2 ${errors.firstName ? 'border-red-500' : 'focus:ring-blue-400'}`} value={formData.firstName} onChange={handleInputChange} />
                                {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
                                <input type="text" name="lastName" placeholder="Last Name" className={`p-4 border rounded-lg w-full focus:outline-none focus:ring-2 ${errors.lastName ? 'border-red-500' : 'focus:ring-blue-400'}`} value={formData.lastName} onChange={handleInputChange} />
                                {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                                <input type="email" name="email" placeholder="Email" className={`p-4 border rounded-lg w-full focus:outline-none focus:ring-2 ${errors.email ? 'border-red-500' : 'focus:ring-blue-400'}`} value={formData.email} onChange={handleInputChange} />
                                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                                <input type="tel" name="phone" placeholder="Phone Number" className={`p-4 border rounded-lg w-full focus:outline-none focus:ring-2 ${errors.phone ? 'border-red-500' : 'focus:ring-blue-400'}`} value={formData.phone} onChange={handleInputChange} />
                                {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                            </div>
                            <div className="mb-6">
                                <input type="text" name="address" placeholder="Address" className={`p-4 border rounded-lg w-full focus:outline-none focus:ring-2 ${errors.address ? 'border-red-500' : 'focus:ring-blue-400'}`} value={formData.address} onChange={handleInputChange} />
                                {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
                                <input type="text" name="city" placeholder="City" className={`p-4 border rounded-lg w-full focus:outline-none focus:ring-2 ${errors.city ? 'border-red-500' : 'focus:ring-blue-400'}`} value={formData.city} onChange={handleInputChange} />
                                {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
                                <input type="text" name="state" placeholder="State" className={`p-4 border rounded-lg w-full focus:outline-none focus:ring-2 ${errors.state ? 'border-red-500' : 'focus:ring-blue-400'}`} value={formData.state} onChange={handleInputChange} />
                                {errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}
                                <input type="text" name="zip" placeholder="ZIP Code" className={`p-4 border rounded-lg w-full focus:outline-none focus:ring-2 ${errors.zip ? 'border-red-500' : 'focus:ring-blue-400'}`} value={formData.zip} onChange={handleInputChange} />
                                {errors.zip && <p className="text-red-500 text-sm">{errors.zip}</p>}
                            </div>
                        </form>
                    </div>

                    {/* Shipping & Payment */}
                    <div className="mb-10">
                        <h3 className="text-lg font-semibold mb-6 text-gray-800">Shipping</h3>
                        <div className="flex flex-col sm:flex-row justify-around">
                            <span className="text-gray-700">Normal Shipping ₹50.00</span>
                            <span className="text-gray-700">Free Shipping & extraa   ₹50 discount for orders above ₹499</span>
                        </div>
                    </div>

                    {/* Payment Section */}
                    <div className="mb-10">
                        <h3 className="text-lg font-semibold mb-6 text-gray-800">Payment</h3>
                        <div className="flex flex-col sm:flex-row justify-around">
                            <button
                                onClick={() => setSelectedPayment('upi')}
                                className={`w-full sm:w-auto py-3 px-6 rounded-full transition duration-200 ${selectedPayment === 'upi' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
                            >
                                Credit/Debit/UPI
                            </button>
                            <button
                                onClick={() => setSelectedPayment('cod')}
                                className={`w-full sm:w-auto max-md:mt-3 py-3 px-6 rounded-full mb-4 sm:mb-0 transition duration-200 ${selectedPayment === 'cod' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
                            >
                                Cash on Delivery
                            </button>
                        </div>

                        {/* Display Total Price */}
                        <div className="flex justify-between items-center font-base text-base mt-6 border-t pt-4 border-gray-300">
                            <span className="text-gray-900">Total:</span>
                            <span className="text-gray-900">₹{totalPrice}</span>
                        </div>
                        {selectedPayment === 'upi' && totalPrice > 500 &&<div className="flex justify-between items-center text-base mt-2 border-gray-300">
                            <span className="text-gray-900">UPI Discount</span>
                            <span className="text-gray-900">-₹50</span>
                        </div>}
                        {selectedPayment === 'cod' && totalPrice > 500 &&<div className="flex justify-between items-center text-base mt-2 border-gray-300">
                            <span className="text-gray-900">UPI Discount</span>
                            <span className="text-gray-900">-₹0</span>
                        </div>}
                        <div className="flex justify-between items-center font-bold text-lg mt-2 pt-2 border-gray-300">
                            <span className="text-gray-900">Final Price:</span>
                            <span className="text-gray-900">₹{finalTotal}</span>
                        </div>
                        {selectedPayment === 'upi' && totalPrice > 500 && (
                            <p className="text-green-600 mt-2">You saved ₹50 on your total!</p>
                        )}
                        {selectedPayment === 'cod' && totalPrice > 500 && (
                            <p className="text-red-600 mt-2">You can save ₹50 by selecting UPI </p>
                        )}
                        {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
                        {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                        {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
                        {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
                        {errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}
                        {errors.zip && <p className="text-red-500 text-sm">{errors.zip}</p>}
                    </div>

                    {/* Place Order Button */}
                    <button
                        onClick={handlePlaceOrder}
                        disabled={!Object.values(formData).every(field => field)}
                        className={`w-full bg-yellow-500 text-white py-4 rounded-lg font-bold hover:bg-yellow-600 transition duration-300 ${!Object.values(formData).every(field => field) ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        Place Order
                    </button>
                </div>
            </div>
        </>
    );
};

export default Checkout;
