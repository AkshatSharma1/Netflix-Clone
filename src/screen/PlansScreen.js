import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import db from '../firebase';
import {loadStripe} from "@stripe/stripe-js"
import "./PlansScreen.css"

function PlansScreen() {

    //get products data
    const [products, setProducts] = useState([]);
    //fetch data from userslice
    const user = useSelector(selectUser)
    //Get subscription status
    const [subscription, setSubscription] = useState(null);

    useEffect(() => {
        db.collection('customers')
            .doc(user.uid)
            .collection('subscriptions')
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(async subscription => {
                    setSubscription({
                        role: subscription.data().role,
                        current_period_end: subscription.data().current_period_end.seconds,
                        current_period_start: subscription.data().current_period_start.seconds,
                    })
            })
        })
    },[user.uid])

    //pop data from db
    useEffect(() => {
        db.collection('products').where('active', '==', true)
        .get()
        .then((querySnapshot) => {
            const products = {};
            querySnapshot.forEach(async productDoc => {
                products[productDoc.id] = productDoc.data();
                const priceSnap = await productDoc.ref.collection('prices').get();
                priceSnap.docs.forEach(price => {
                    products[productDoc.id].prices = {
                        priceId: price.id,
                        priceData: price.data(),
                    }
                });
            });
            setProducts(products);
        });
    }, []);

    console.log(products);
    console.log(subscription);

    const loadCheckOut = async (priceId) => {
        const docRef = await db
            .collection("customers")
            .doc(user.uid)
            .collection("checkout_sessions")
            .add({
                price: priceId,
                success_url: window.location.origin,
                cancel_url: window.location.origin,
            });
        
        docRef.onSnapshot(async (snap) => {
            const { error, sessionId } = snap.data();

            if (error) {
                alert(`An error occurred: ${ error.message }`)
            }

            //Load stripe
            if (sessionId)
            {
                //Initialise stripe
                const stripe = await loadStripe("pk_test_51JsAW5SBaEb0HgkWVh1MUaAl6YvQ5ClUx933qkCv6q5XTf6X1mfyrU8edat45TWIzW8lysF0Pi5rnWabDOYpAxee00bly30B9S");

                stripe.redirectToCheckout({ sessionId });
            }
    })
    }

    return (
        <div className='plansScreen'>

            <h3>Plans (Current Plan: {subscription?.role} )</h3>

            {subscription && (<p>Renewal Date:{" "}
            {new Date(subscription?.current_period_end*1000).toLocaleDateString()}
            </p>)}
            {Object.entries(products).map(([productId, productData]) => {
                //Check if subscription is active or not

                const isCurrentSubscription = productData.name?.toLowerCase().includes(subscription?.role);
                return (
                    <div
                        key={productId}
                        className={isCurrentSubscription ? "plansScreen__plan-disabled" : "plansScreen__plan"}>
                        
                        <div className='plansScreen__info'>
                            <h5>{productData.name}</h5>
                            <h6>{productData.description}</h6>
                        </div>

                        {/*Load checkout on click */}
                        <button onClick={() => !isCurrentSubscription && loadCheckOut(productData.prices.priceId)}>
                            {!isCurrentSubscription ? "Subscribe" : "Current Package"} 
                        </button>
                    </div>
                )
            })}
        </div>
    )
}

export default PlansScreen
