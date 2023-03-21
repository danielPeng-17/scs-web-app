import { Input, FormLabel, Select, Option, Checkbox } from "@mui/joy";

import { updateFormData } from "./utils";

export const CheckoutForm = ({ formData, setFormData, name }) => {
    return (
        <form>
            {name === "billing" ? (
                <Checkbox
                    label="Same as my shipping address"
                    variant="soft"
                    sx={{ mb: 2 }}
                    checked={formData.isBillingSameAsShipping}
                    onChange={(e) => {
                        const checked = e.target.checked;
                        setFormData((prevState) => ({
                            ...prevState,
                            isBillingSameAsShipping: checked,
                        }));

                        if (checked) {
                            const shippingData = formData.shipping;
                            setFormData((prevState) => ({
                                ...prevState,
                                billing: { ...shippingData },
                            }));
                        } else {
                            setFormData((prevState) => ({
                                ...prevState,
                                billing: {
                                    address: "",
                                    postalCode: "",
                                    city: "",
                                    province: "",
                                    country: "CA",
                                },
                            }));
                        }
                    }}
                />
            ) : null}
            {name === "shipping" ||
            (name === "billing" && !formData.isBillingSameAsShipping) ? (
                <>
                    <FormLabel>Address</FormLabel>
                    <Input
                        placeholder="123 Fake Street"
                        required
                        defaultValue={formData[name].address}
                        onBlur={(e) =>
                            updateFormData(setFormData, name, {
                                address: e.target.value,
                            })
                        }
                    />

                    <FormLabel>Postal Code</FormLabel>
                    <Input
                        placeholder="ABC123"
                        required
                        defaultValue={formData[name].postalCode}
                        onBlur={(e) =>
                            updateFormData(setFormData, name, {
                                postalCode: e.target.value,
                            })
                        }
                    />

                    <FormLabel>City</FormLabel>
                    <Input
                        placeholder="Toronto"
                        required
                        defaultValue={formData[name].city}
                        onBlur={(e) =>
                            updateFormData(setFormData, name, {
                                city: e.target.value,
                            })
                        }
                    />

                    <FormLabel>Province</FormLabel>
                    <Select
                        placeholder="Select a province"
                        defaultValue={formData[name].province}
                        onChange={(_, newValue) =>
                            updateFormData(setFormData, name, {
                                province: newValue,
                            })
                        }
                    >
                        <Option value="NL">Newfoundland and Labrador</Option>
                        <Option value="PE">Prince Edward Island</Option>
                        <Option value="NS">Nova Scotia</Option>
                        <Option value="NB">New Brunswick</Option>
                        <Option value="QC">Quebec</Option>
                        <Option value="ON">Ontario</Option>
                        <Option value="MB">Manitoba</Option>
                        <Option value="SK">Saskatchewan</Option>
                        <Option value="AB">Alberta</Option>
                        <Option value="BC">British Columbia</Option>
                        <Option value="YT">Yukon</Option>
                        <Option value="NT">Northwest Territories</Option>
                        <Option value="NU">Nunavut</Option>
                    </Select>
                </>
            ) : null}
        </form>
    );
};
