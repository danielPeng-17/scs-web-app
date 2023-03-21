import { Checkbox, Divider, Typography } from "@mui/joy";
import { formatPhoneNumber } from "../../utils/utils";
import { formTitles } from "./constants";

export const ReviewDetails = ({ formData }) => {
    const isBillingSameAsShipping = formData.isBillingSameAsShipping;

    const Title = ({ index }) => (
        <Typography level="h4" component="h1">
            {formTitles[index]}
        </Typography>
    );

    const AddressDetails = ({ name }) => (
        <p>
            Address: {formData[name].address}, {formData[name].city},{" "}
            {formData[name].province} {formData[name].postalCode},{" "}
            {formData[name].country}
        </p>
    );

    return (
        <>
            <Divider sx={{ my: 3 }} />
            <div style={{ textAlign: "left" }}>
                <Title index={0} />
                <p>First name: {formData.user.firstName}</p>
                <p>Last name: {formData.user.lastName}</p>
                <p>Phone Number: {formatPhoneNumber(formData.user.telNo)}</p>

                <Divider sx={{ my: 3 }} />

                <Title index={1} />
                <AddressDetails name="shipping" />

                <Divider sx={{ my: 3 }} />

                <Title index={2} />
                {isBillingSameAsShipping ? (
                    <Checkbox
                        label="Same as my shipping address"
                        variant="soft"
                        color="neutral"
                        disabled
                        defaultChecked={isBillingSameAsShipping}
                        sx={{ my: 2 }}
                    />
                ) : (
                    <AddressDetails name="billing" />
                )}

                <Divider sx={{ my: 3 }} />

                <Title index={3} />
                <p>Name on card: {formData.paymentData.cardName}</p>
                <p>Card number: {formData.paymentData.cardNo}</p>
                <p>Expiration date: {formData.paymentData.cardExp}</p>
                <p>CVV: {formData.paymentData.cardCVV}</p>
                
                <Divider sx={{ my: 3 }} />
                
                <Typography level="h4" component="h1">
                    Delivery details
                </Typography>
                <p>Branch location: {formData.branchSource}</p>
                <p>Delivery date: {formData.dateReceived}</p>
            </div>
        </>
    );
};
