import { Input, Option, Select } from "@mui/joy";

export const UpdateOperator = ({
    setUpdateIdentifier,
    setTableIdentifier,
    setWhereIdentifier,
}) => {
    return (
        <>
            <div style={{ display: "inline-flex", marginTop: "48px" }}>
                <p style={{ marginRight: "16px" }}>UPDATE</p>
                <Select
                    sx={{ width: "300px" }}
                    placeholder="Select an option"
                    onChange={(e, value) => {
                        e.preventDefault();
                        if (setTableIdentifier) {
                            setTableIdentifier(value);
                        }
                    }}
                >
                    <Option value="users">Users</Option>
                    <Option value="products">Product</Option>
                    <Option value="orders">Orders</Option>
                    <Option value="payment">Payment</Option>
                    <Option value="trip">Trip</Option>
                    <Option value="truck">Truck</Option>
                </Select>
                <p style={{ margin: "auto 16px" }}>SET</p>
                <Input
                    sx={{ width: "340px" }}
                    onBlur={(e) => {
                        e.preventDefault();
                        if (setUpdateIdentifier) {
                            setUpdateIdentifier(e.target.value);
                        }
                    }}
                    placeholder="Column1=value1, Column2=value2, etc..."
                />
            </div>
            <div
                style={{
                    display: "inline-flex",
                    width: "100%",
                    marginTop: "24px",
                }}
            >
                <p style={{ marginRight: "16px" }}>WHERE</p>
                <Input
                    sx={{ width: "340px" }}
                    onBlur={(e) => {
                        e.preventDefault();
                        if (setWhereIdentifier) {
                            setWhereIdentifier(e.target.value);
                        }
                    }}
                    placeholder="Condition1=value1"
                />
            </div>
        </>
    );
};
