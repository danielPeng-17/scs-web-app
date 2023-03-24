import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input, Box, Link as TextLink } from "@mui/joy";
import { Search } from "@mui/icons-material";

import { Logo } from "../logo/Logo";
import "./nav.css";
import { LoggedInMenu } from "./loggedInMenu/LoggedInMenu";
import BrowserInfo from "./browserDetect/BrowserInfo";

export const Nav = () => {
    const state = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const isLoggedIn = state.isLoggedIn;

    const RoundedButton = ({ text, variant }) => (
        <Button
            variant={variant}
            sx={{ borderRadius: "24px", px: 3, letterSpacing: "1px" }}
        >
            {text}
        </Button>
    );

    const StyledTextLink = ({ text, route }) => (
        <TextLink
            color="primary"
            variant="plain"
            sx={{
                fontWeight: "bold",
                height: "32px",
                py: "4px",
                mx: 1,
                ":hover": { bgcolor: "white" },
            }}
            onClick={() => navigate(route)}
        >
            {text}
        </TextLink>
    );

    const SearchBar = () => (
        <div>
            <Input
                placeholder="Search"
                sx={{
                    borderRadius: "25px",
                }}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        // TODO: on search function
                    }
                }}
                endDecorator={
                    <Button
                        variant="outlined"
                        color="neutral"
                        sx={{ border: "none", borderRadius: "25px" }}
                        // TODO: on search function
                        onClick={() => {}}
                    >
                        <Search />
                    </Button>
                }
            />
        </div>
    );

    return (
        <Box
            sx={{
                boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                px: 3,
                display: "flex",
                justifyContent: "space-between",
                letterSpacing: "1px",
            }}
        >
            <div>
                <Link to="/">
                    <Logo />
                </Link>
            </div>
            <div>
                <div
                    style={{
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <StyledTextLink text="Home" route="/" />
                    <StyledTextLink text="About" route="/aboutUs" />
                    <StyledTextLink text="Contacts" route="/contactUs" />
                    <StyledTextLink text="Cart" route="/shoppingCart" />
                    <StyledTextLink text="Services" route="/ToS" />
                    <BrowserInfo />
                </div>
            </div>

            <div>
                <div
                    style={{
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    {!isLoggedIn ? (
                        <>
                            <StyledTextLink text="Login" route="/signIn" />

                            <Link to="/signUp">
                                <RoundedButton text="Signup" variant="solid" />
                            </Link>
                        </>
                    ) : null}
                    {isLoggedIn && <SearchBar />}
                    {isLoggedIn && <LoggedInMenu />}
                </div>
            </div>
        </Box>
    );
};
