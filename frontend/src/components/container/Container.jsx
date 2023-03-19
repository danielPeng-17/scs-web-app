import { Sheet, Typography } from "@mui/joy";
import { Nav } from "../nav/Nav";

export const Container = ({name, children}) => {
    return (
        <>
            <Nav />
            <Sheet sx={{ my: 3, px: 4 }}>
                {name ? 
                    <Typography level="display2">
                        {name}
                    </Typography>
                    : 
                    null
                }
                <div style={{ marginTop: name ? '16px': undefined }}>
                    {children}
                </div>
            </Sheet>
        </>
        
    );
}