import React, { useState } from 'react';
import video from '../assets/video.mp4';
import '../Styles/home.css';
import { Button } from '@chakra-ui/react';
import Navbar from '../Components/Navbar';
import { useToast } from '@chakra-ui/react';
import axios from 'axios';

const Home = () => {
    const [destination, setDestination] = useState('');
    const [when, setWhen] = useState('');
    const [interest, setInterest] = useState('');
    const [duration, setDuration] = useState('');
    const [traveller, setTraveller] = useState('');
    const [budget, setBudget] = useState('');
    const toast = useToast();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (destination && when && interest && duration && traveller && budget) {
            toast({
                title: 'Your query has been submitted , we will reach out to you soon',
                position: 'top',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
            setDestination('');
            setWhen('');
            setInterest('');
            setDuration('');
            setTraveller('');
            setBudget('');
        } else {
            toast({
                title: 'Please fill all the required fields',
                position: 'top',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }


        const data = {
            destination,
            when,
            interest,
            duration,
            traveller,
            budget
        };

        try {
            const response = await axios.post('http://localhost:4500/enquiryRouter', data);
            console.log('Response:', response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="video-background-container">
            <video autoPlay loop muted className="video-background">
                <source src={video} type="video/mp4" />
            </video>
            <Navbar />
            <div className="container">
                <h1 className="heading">We care, so you can travel carefree</h1>
                <h4 className="sub-heading">Let our experts plan your private, tailor-made, and secure tour in 70+ destinations</h4>

                <form action="submit" className="plan_form">
                    <select className="form-control" value={destination} onChange={(e) => setDestination(e.target.value)}>
                        <option value="">Where do you want to go ?</option>
                        <option value="Paris">Paris</option>
                        <option value="Tokyo">Tokyo</option>
                        <option value="New York">New York</option>
                        <option value="London">London</option>
                        <option value="Rome">Rome</option>
                        <option value="Sydney">Sydney</option>
                        <option value="Dubai">Dubai</option>
                        <option value="Barcelona">Barcelona</option>
                        <option value="Bangkok">Bangkok</option>
                        <option value="Cape Town">Cape Town</option>
                        <option value="Prague">Prague</option>
                        <option value="Istanbul">Istanbul</option>
                        <option value="Rio de Janeiro">Rio de Janeiro</option>
                        <option value="Amsterdam">Amsterdam</option>
                    </select>

                    <input type="date" className="form-control" value={when} onChange={(e) => setWhen(e.target.value)} placeholder="When ?" min={new Date().toISOString().split('T')[0]} />
                    <select className="form-control" value={interest} onChange={(e) => setInterest(e.target.value)}>
                        <option value="">Your interest</option>
                        <option value="Adventure">Adventure</option>
                        <option value="Culture">Culture</option>
                        <option value="Nature">Nature</option>
                        <option value="Food and Cuisine">Food and Cuisine</option>
                        <option value="History and Heritage">History and Heritage</option>
                        <option value="Relaxation and Spa">Relaxation and Spa</option>
                        <option value="Shopping">Shopping</option>
                    </select>
                    <input type="text" className="form-control" value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="Duration (days)" />
                    <input type="number" className="form-control" value={traveller} onChange={(e) => setTraveller(e.target.value)} placeholder="No. of travelers" />
                    <select className="form-control" value={budget} onChange={(e) => setBudget(e.target.value)}>
                        <option value="">Budget Per Person</option>
                        <option value="$4000-$5000">$4000-$5000</option>
                        <option value="$5000-$6000">$5000-$6000</option>
                        <option value="$6000-$7000">$6000-$7000</option>
                        <option value="$7000-$8000">$7000-$8000</option>
                        <option value="$8000-$9000">$8000-$9000</option>
                        <option value="$9000-$10000">$9000-$10000</option>
                        <option value="$10000+">$10000+</option>
                    </select>
                    <Button onClick={handleSubmit} colorScheme="#0a57a7" bg="#0a57a7" size="lg" mb="1">
                        Create my trip now
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default Home;
