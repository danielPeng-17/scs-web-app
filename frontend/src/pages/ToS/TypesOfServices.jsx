import "./TypesOfServices.css";
import { Container } from "../../components/container/Container";

export const TypesOfServices = () => {
    return (
        <Container name="Types of Services">
            <div className="types-of-services-container">
              <p>
                  We offer a range of services to help enhance your e-commerce
                  website. These services include a product catalog, allowing
                  you to display your products in an organized manner. We also
                  offer product search functionality, enabling your customers
                  to easily find what they're looking for.
              </p>

              <p>
                  Our shopping cart feature makes it easy for your customers
                  to add items to their cart and checkout when they're ready.
                  We offer payment processing services, allowing your
                  customers to pay securely and conveniently.
              </p>

              <p>
                  To ensure a smooth and hassle-free shopping experience, we
                  provide order tracking, enabling customers to track their
                  orders in real-time. We also offer user account management,
                  allowing customers to create and manage their accounts, view
                  order history, and manage their personal information.
              </p>

              <p>
                  Lastly, we offer customer support services, providing your
                  customers with the assistance they need to make their
                  shopping experience a success. With these services, you can
                  take your e-commerce website to the next level and provide
                  your customers with a seamless shopping experience.
              </p>
            </div>
        </Container>
    );
};
