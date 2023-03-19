import { Input, Option, Select } from "@mui/joy";

export const InsertOperator = ({
    setColumnIdentifier,
    setTableIdentifier,
    setValuesIdentifier,
}) => {
    return (
        <>
            <div style={{ display: "inline-flex", marginTop: "48px" }}>
                <p style={{ marginRight: "16px" }}>INSERT INTO</p>
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
                <p style={{ margin: "auto 16px" }}>{"("}</p>
                <Input
                    sx={{ width: "340px" }}
                    onBlur={(e) => {
                        e.preventDefault();
                        if (setColumnIdentifier) {
                            setColumnIdentifier(e.target.value);
                        }
                    }}
                    placeholder="Column1, Column2, etc..."
                />
                <p style={{ margin: "auto 16px" }}>{")"}</p>
            </div>

            <div
                style={{
                    display: "inline-flex",
                    width: "100%",
                    marginTop: "24px",
                }}
            >
                <p style={{ marginRight: "16px" }}>{'VALUES ('}</p>
                <Input
                    sx={{ width: "440px" }}
                    onBlur={(e) => {
                        e.preventDefault();
                        if (setValuesIdentifier) {
                            setValuesIdentifier(e.target.value);
                        }
                    }}
                    placeholder="Value1, Value2, etc..."
                />
                <p style={{ margin: "auto 16px" }}>{")"}</p>
            </div>
        </>
    );
};
