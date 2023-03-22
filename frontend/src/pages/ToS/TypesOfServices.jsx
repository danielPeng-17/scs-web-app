import './TypesOfServices.css';
import { Container } from '../../components/container/Container';

export const TypesOfServices = () => {
    return (
      <Container name="Types of Services" >
        <div className="types-of-services-container">
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
      </Container>
    );
  };