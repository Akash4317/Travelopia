import { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import "../Styles/admin.css"
import axios from 'axios';

const Admin = () => {
    const [enquiries, setEnquiries] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState<boolean>(true);
    const [enquiriesPerPage] = useState(8);

    const token = localStorage.getItem('token');
    useEffect(() => {
        const fetchquery = async () => {
            try {
                const res = await axios.get('https://traveopia-backend.onrender.com/enquiry', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    }
                });
                setEnquiries(res.data);

            } catch (err) {
                console.log(err);
            }
            finally {
                setLoading(false);
            }
        }
        fetchquery();
    }, [])

    const totalPages = Math.ceil(enquiries.length / enquiriesPerPage);

    const indexOfLastEnquiry = currentPage * enquiriesPerPage;
    const indexOfFirstEnquiry = indexOfLastEnquiry - enquiriesPerPage;
    const currentEnquiries = enquiries.slice(indexOfFirstEnquiry, indexOfLastEnquiry);

    const paginate = (page: number) => {
        setCurrentPage(Math.max(1, Math.min(page, totalPages)));
    };

    return (
        <Box className='enquiries-section'>
            <Navbar />
            <Box className='enquiry-banner'></Box>
            {loading ? (
                <Flex align="center" justify="center">
                    <Text>Loading...</Text>
                </Flex>
            ) : (
                <>
                    <Flex flexWrap="wrap" justifyContent="space-between" className='enquiries-row'>
                        {currentEnquiries.map((enquiry) => (
                            <Box key={enquiry._id} width={{ base: '100%', sm: 'calc(50% - 8px)', lg: 'calc(25% - 16px)' }} marginBottom={4}>
                                <Box className='enquiry-card' boxShadow="md" borderRadius="md" p={4}>
                                    <Text fontSize="xl" fontWeight="bold" mb={2}>Trip to {enquiry.destination}</Text>
                                    <Text><strong>Interest:</strong> {enquiry.interest}</Text>
                                    <Text><strong>Duration:</strong> {enquiry.duration} days</Text>
                                    <Text><strong>Travelers:</strong> {enquiry.traveller}</Text>
                                    <Text><strong>Budget:</strong> {enquiry.budget}</Text>
                                    <Text><strong>UserID:</strong> {enquiry.userId}</Text>
                                    <Text><strong>Travel Date:</strong> {new Date(enquiry.when).toLocaleDateString()}</Text>
                                    <Text><strong>Request Date:</strong> {new Date(enquiry.createdAt).toLocaleDateString()}</Text>
                                </Box>
                            </Box>
                        ))}
                    </Flex>

                    <Box textAlign="center" marginTop="20px" marginBottom={"15px"}>
                        <Button mr={1} disabled={currentPage === 1} onClick={() => paginate(currentPage - 1)}>Previous</Button>
                        <Button>{currentPage}</Button>
                        <Button ml={1} disabled={currentPage === totalPages} onClick={() => paginate(currentPage + 1)}>Next</Button>
                    </Box>
                </>
            )}
        </Box>
    );

}

export default Admin;
