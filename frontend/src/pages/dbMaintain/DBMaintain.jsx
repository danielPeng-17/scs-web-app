import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Option, Select } from "@mui/joy";

import { Container } from "../../components/container/Container";
import { SelectOperator } from "./select/SelectOperator";
import { InsertOperator } from "./insert/InsertOperator";
import { UpdateOperator } from "./update/UpdateOperator";
import { DeleteOperator } from "./delete/DeleteOperator";
import { queryAction } from "./store/sliceReducer";

export const DBMaintain = () => {
    const dispatch = useDispatch();
    const state = useSelector((state) => state.dbm);

    const [operator, setOperator] = useState(null);
    const [columnIdentifier, setColumnIdentifier] = useState("");
    const [tableIdentifier, setTableIdentifier] = useState("");
    const [whereIdentifier, setWhereIdentifier] = useState("");
    const [valuesIdentifier, setValuesIdentifier] = useState("");
    const [updateIdentifier, setUpdateIdentifier] = useState("");

    const onSubmitQuery = () => {
        let query = "";
        if (operator === "select") {
            query = `SELECT ${columnIdentifier} FROM ${tableIdentifier} ${
                whereIdentifier !== "" ? `WHERE ${whereIdentifier}` : ""
            };`;
        } else if (operator === "update") {
            query = `UPDATE ${tableIdentifier} SET ${updateIdentifier}
                WHERE ${whereIdentifier};`;
        } else if (operator === "insert") {
            query = `INSERT INTO ${tableIdentifier} (${columnIdentifier})
                VALUES (${valuesIdentifier});`;
        } else if (operator === 'delete') {
            query = `DELETE FROM ${tableIdentifier} WHERE ${whereIdentifier};`;
        } else {
            query = "";
        }

        if (query !== "") {
            dispatch(queryAction({query}));
        }
    };

    return (
        <Container name="DB Maintain">
            <div style={{ display: "inline-flex" }}>
                <p style={{ marginRight: "16px" }}>Select an operator: </p>
                <Select
                    sx={{ width: "165px" }}
                    placeholder="Select an option"
                    onChange={(e, value) => {
                        e.preventDefault();

                        setOperator(value);
                    }}
                >
                    <Option value="select">SELECT</Option>
                    <Option value="insert">INSERT</Option>
                    <Option value="update">UPDATE</Option>
                    <Option value="delete">DELETE</Option>
                </Select>
            </div>
            <div>
                {operator === "select" ? (
                    <SelectOperator
                        setColumnIdentifier={setColumnIdentifier}
                        setTableIdentifier={setTableIdentifier}
                        setWhereIdentifier={setWhereIdentifier}
                    />
                ) : null}
                {operator === "insert" ? (
                    <InsertOperator
                        setColumnIdentifier={setColumnIdentifier}
                        setTableIdentifier={setTableIdentifier}
                        setValuesIdentifier={setValuesIdentifier}
                    />
                ) : null}
                {operator === "update" ? (
                    <UpdateOperator
                        setUpdateIdentifier={setUpdateIdentifier}
                        setTableIdentifier={setTableIdentifier}
                        setWhereIdentifier={setWhereIdentifier}
                    />
                ) : null}
                {operator === "delete" ? (
                    <DeleteOperator
                        setTableIdentifier={setTableIdentifier}
                        setWhereIdentifier={setWhereIdentifier}
                    />
                ) : null}
            </div>
            <div style={{ marginTop: "48px" }}>
                <Button onClick={() => onSubmitQuery()}>Run Query</Button>
            </div>
            <div>
                {state.data ?
                    <>Map over query data here</>
                    :
                    null
                }
            </div>
        </Container>
    );
};
