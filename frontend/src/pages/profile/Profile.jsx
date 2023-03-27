import { Avatar, Sheet, Typography } from "@mui/joy";
import { useSelector } from "react-redux";
import { Container } from "../../components/container/Container";
import { capitalize } from "lodash";
import { roundNumberToTwoDeciamls } from "../../utils/utils";

export const Profile = () => {
    const state = useSelector((state) => state.auth);

    const InfoCell = ({ label, value }) => {
        return (
            <Sheet>
                <p
                    style={{
                        letterSpacing: "1px",
                        fontSize: "0.8em",
                        fontWeight: "600",
                        color: "#c7c7c7",
                    }}
                >
                    {label}
                </p>
                <p style={{ marginTop: "0" }}>{value}</p>
            </Sheet>
        );
    };

    return (
        <Container name="Profile">
            <Sheet sx={{ display: "grid", gridTemplateColumns: "1fr 2fr" }}>
                <Sheet
                    sx={{
                        display: "flex",
                        justifyContent: "end",
                        mt: "64px",
                        pr: "64px",
                    }}
                >
                    <Avatar
                        sx={{ width: "3em", height: "3em", fontSize: "3em" }}
                    >
                        {state.user.firstName[0].toUpperCase()}
                        {state.user.lastName[0].toUpperCase()}
                    </Avatar>
                </Sheet>
                <Sheet
                    sx={{
                        mt: "64px",
                        pr: "20%",
                    }}
                >
                    <Typography
                        level="h2"
                        sx={{ letterSpacing: "1px", mb: 3 }}
                    >{`${capitalize(state.user.firstName)} ${capitalize(
                        state.user.lastName
                    )}`}</Typography>
                    <Sheet
                        sx={{
                            display: "grid",
                            gridTemplateColumns: "repeat(2, 1fr)",
                            gap: "30px 64px",
                        }}
                    >
                        <InfoCell label="EMAIL" value={state.user.email} />
                        <InfoCell label="PHONE" value={state.user.telNo} />
                        <InfoCell
                            label="ADDRESS"
                            value={`${state.user.address}, ${state.user.city}, ${state.user.province} ${state.user.postalCode}, ${state.user.country}`}
                        />
                        <InfoCell
                            label="BALANCE"
                            value={`$${roundNumberToTwoDeciamls(
                                state.user.balance
                            )}`}
                        />
                    </Sheet>
                </Sheet>
            </Sheet>
        </Container>
    );
};
