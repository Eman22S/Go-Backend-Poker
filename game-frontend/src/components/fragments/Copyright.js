import React from "react";

import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

export default function Copyright() {
    return (
        <Box mt={5} pb={2}>
            <Typography variant="body2" color="textSecondary" align="center">
                {"Copyright © "}
                <Link color="inherit" href="#">
                    Real Gaming USA
                </Link>{" "}
                {new Date().getFullYear()}
                {"."}
            </Typography>
        </Box>
    );
}