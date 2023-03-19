import { useState } from "react";
import { Button, Input, Option, Select } from "@mui/joy";

export const SelectOperator = ({
    setColumnIdentifier,
    setTableIdentifier,
    setWhereIdentifier,
}) => {
    const [showWhereCondition, setShowWhereCondition] = useState(false);

    return (
        <>
            <div style={{ display: "inline-flex", marginTop: "48px" }}>
                <p style={{ marginRight: "16px" }}>SELECT</p>
                <Input
                    sx={{ width: "300px" }}
                    onBlur={(e) => {
                        e.preventDefault();
                        if (setColumnIdentifier) {
                            setColumnIdentifier(e.target.value);
                        }
                    }}
                    placeholder="Column1, Column2, etc..."
                />
                <p style={{ margin: "auto 16px" }}>FROM</p>
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
            </div>
            <div>
                <Button
                    onClick={() => {
                        setShowWhereCondition(!showWhereCondition);
                        setWhereIdentifier("");
                    }}
                    sx={{ display: "block", my: 3 }}
                >
                    {showWhereCondition
                        ? "Remove where condition"
                        : "Add where condition"}
                </Button>
                {showWhereCondition ? (
                    <div style={{ display: "inline-flex" }}>
                        <p style={{ marginRight: "16px" }}>WHERE</p>
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
                ) : null}
            </div>
        </>
    );
};
