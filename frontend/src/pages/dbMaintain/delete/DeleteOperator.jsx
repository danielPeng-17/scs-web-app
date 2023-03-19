import { Input, Option, Select } from "@mui/joy";

export const DeleteOperator = ({
    setTableIdentifier,
    setWhereIdentifier,
}) => {
    return (
        <>
            <div style={{ display: "inline-flex", marginTop: "48px" }}>
                <p style={{ marginRight: "16px" }}>DELETE FROM</p>
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
                </Select>
                <p style={{ margin: "auto 16px" }}>WHERE</p>
                <Input
                    sx={{ width: "300px" }}
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
