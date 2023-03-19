import { Nav } from "../../components/nav/Nav";
import { CheckoutForm } from "./CheckoutForm";
import { OrderSummary } from "./OrderSummary";
import { Table } from '@mui/joy';
import MapWindow from "./MapWindow";
import Sheet from '@mui/joy/Sheet';
import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';
import FormLabel from '@mui/joy/FormLabel';
import Typography from '@mui/joy/Typography';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signInAction } from "../../auth/store/sliceReducer";
import { useNavigate } from "react-router-dom";

export const Checkout = () => {
    const [location, setLocation] = useState({});
    return (
        <>
            <Nav />
            <Table borderAxis="both">
            <thead>
                <tr>
                <th rowSpan={2} style={{ textAlign: '0', textAlign: 'center' }}>
                    <CheckoutForm setLocation={setLocation}/>
                </th>
                <th colSpan={1} style={{ textAlign: 'center' }}>
                    <MapWindow location={location} />
                </th>
                </tr>
                <tr>
                <th>
                    <OrderSummary />
                </th>
                </tr>
            </thead>

            </Table>
        </>
    );
}
