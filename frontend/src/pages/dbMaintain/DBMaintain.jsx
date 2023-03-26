import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Option, Select } from "@mui/joy";

import { Container } from "../../components/container/Container";
import { SelectOperator } from "./select/SelectOperator";
import { InsertOperator } from "./insert/InsertOperator";
import { UpdateOperator } from "./update/UpdateOperator";
import { DeleteOperator } from "./delete/DeleteOperator";
import { queryAction, clearResponseAction } from "./store/sliceReducer";

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
            query = `SELECT ${columnIdentifier} FROM scs.${tableIdentifier} ${
                whereIdentifier !== "" ? `WHERE ${whereIdentifier}` : ""
            };`;
        } else if (operator === "update") {
            query = `UPDATE scs.${tableIdentifier} SET ${updateIdentifier}
                WHERE ${whereIdentifier};`;
        } else if (operator === "insert") {
            query = `INSERT INTO scs.${tableIdentifier} (${columnIdentifier})
                VALUES (${valuesIdentifier});`;
        } else if (operator === 'delete') {
            query = `DELETE FROM scs.${tableIdentifier} WHERE ${whereIdentifier};`;
        } else {
            query = "";
        }
        if (query !== "") {
            console.log("not blank");
            console.log(query);
            dispatch(queryAction({query, type: operator}));
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
                        dispatch(clearResponseAction());
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
                {state.response && operator === 'select' ?
                        state.response.map((item) =>{
                            return(<pre key={item.id}>  {JSON.stringify(item)} </pre>);
                        })
                    :
                    null
                }
                {
                    state.response && operator !== 'select' ?
                        <pre> {state.response}</pre>
                    :
                    null
                }
            </div>
        </Container>
    );
};
