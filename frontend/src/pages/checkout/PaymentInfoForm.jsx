import {
    Input,
    FormLabel,
    Select,
    Option,
    Divider,
    Typography,
} from "@mui/joy";
import { useEffect, useState } from "react";

import { updateFormData } from "./utils";

export const PaymentInfoForm = ({ formData, setFormData }) => {
    const expSplit = formData.paymentData.cardExp.split("/");

    const [exp, setExp] = useState(`${expSplit[0] ?? ""}/${expSplit[1] ?? ""}`);

    useEffect(() => {
        const temp = exp.split("/");

        if (temp[0].length === 2 && temp[1].length === 2) {
            updateFormData(setFormData, "paymentData", {
                cardExp: exp,
            });
        }
    }, [exp, setFormData]);

    return (
        <>
            <form>
                <FormLabel>Name on card</FormLabel>
                <Input
                    placeholder="John Doe"
                    required
                    defaultValue={formData.paymentData.cardName}
                    onBlur={(e) =>
                        updateFormData(setFormData, "paymentData", {
                            cardName: e.target.value,
                        })
                    }
                />

                <FormLabel>Card Number</FormLabel>
                <Input
                    placeholder="XXXX-XXXX-XXXXX"
                    required
                    defaultValue={formData.paymentData.cardNo}
                    onBlur={(e) =>
                        updateFormData(setFormData, "paymentData", {
                            cardNo: e.target.value,
                        })
                    }
                />

                <FormLabel>Expiration Date</FormLabel>
                <div style={{ width: "100%", display: "inline-flex" }}>
                    <Input
                        placeholder="MM"
                        required
                        sx={{ width: "calc(50% - 0.625em)" }}
                        defaultValue={
                            formData.paymentData.cardExp.split("/")[0] ?? ""
                        }
                        onBlur={(e) =>
                            setExp(
                                `${e.target.value}/${exp.split("/")[1] ?? ""}`
                            )
                        }
                    />
                    <p
                        style={{
                            fontSize: "1.25em",
                            fontWeight: "bold",
                            margin: "auto 12px",
                        }}
                    >
                        /
                    </p>
                    <Input
                        placeholder="YY"
                        required
                        sx={{ width: "calc(50% - 0.625em)" }}
                        defaultValue={
                            formData.paymentData.cardExp.split("/")[1] ?? ""
                        }
                        onBlur={(e) =>
                            setExp(
                                `${exp.split("/")[0] ?? ""}/${e.target.value}`
                            )
                        }
                    />
                </div>

                <FormLabel>CVV</FormLabel>
                <Input
                    placeholder="CVV"
                    required
                    defaultValue={formData.paymentData.cardCVV}
                    onBlur={(e) =>
                        updateFormData(setFormData, "paymentData", {
                            cardCVV: e.target.value,
                        })
                    }
                />

                <Divider sx={{ my: 3 }} />

                <Typography level="h4" component="h1">
                    Delivery Details
                </Typography>
                <div style={{ display: "inline-flex", width: "100%" }}>
                    <div style={{ width: "50%", marginRight: "8px" }}>
                        <FormLabel>Branch location</FormLabel>
                        <Select
                            placeholder="Select an option"
                            defaultValue={formData.branchSource}
                            onChange={(_, newValue) =>
                                updateFormData(setFormData, null, {
                                    branchSource: newValue,
                                })
                            }
                        >
                            <Option value="Ryerson">Ryerson</Option>
                            <Option value="TMU">TMU</Option>
                        </Select>
                    </div>

                    <div style={{ width: "50%" }}>
                        <FormLabel>Delivery date</FormLabel>
                        <Input
                            type="date"
                            defaultValue={formData.dateReceived}
                            onBlur={(e) =>
                                updateFormData(setFormData, null, {
                                    dateReceived: e.target.value,
                                })
                            }
                        />
                    </div>
                </div>
            </form>
        </>
    );
};
