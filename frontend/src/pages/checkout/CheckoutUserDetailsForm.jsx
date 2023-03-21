import { Input, FormLabel } from "@mui/joy";

import { updateFormData } from "./utils";

export const CheckoutUserDetailsForm = ({ formData, setFormData }) => {
    return (
        <form>
            <FormLabel>First Name</FormLabel>
            <Input
                placeholder="John"
                required
                defaultValue={formData.user.firstName}
                onBlur={(e) =>
                    updateFormData(setFormData, "user", {
                        firstName: e.target.value,
                    })
                }
            />

            <FormLabel>Last Name</FormLabel>
            <Input
                placeholder="Doe"
                required
                defaultValue={formData.user.lastName}
                onBlur={(e) =>
                    updateFormData(setFormData, "user", {
                        lastName: e.target.value,
                    })
                }
            />

            <FormLabel>Phone Number</FormLabel>
            <Input
                placeholder="Phone Number"
                required
                defaultValue={formData.user.telNo}
                onBlur={(e) =>
                    updateFormData(setFormData, "user", {
                        telNo: e.target.value,
                    })
                }
            />
        </form>
    );
};
