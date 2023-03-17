import { Nav } from '../../components/nav/Nav';
import Box from '@mui/joy/Box';
import './TypesOfServices.css';

export const TypesOfServices = () => {
    return (
      <Box>
        <Nav />
        <div className="types-of-services-container">
          <h1 className="title">Types of Services</h1>
          <p className="subtitle">Here are the different types of services we offer:</p>
          <ul className="services-list">
            <li>Product Catalog</li>
            <li>Product Search</li>
            <li>Shopping Cart</li>
            <li>Payment Processing</li>
            <li>Order Tracking</li>
            <li>User Account Management</li>
            <li>Customer Support</li>
          </ul>
        </div>
      </Box>
    );
  };


