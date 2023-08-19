import { IconButton, IconButtonProps, styled } from "@mui/material";


export const StyledIconButton = styled(IconButton)<IconButtonProps & { backgroundcolor?: string }>(({
    backgroundcolor,
}) => ({
    backgroundColor: backgroundcolor,
    "&:hover, &.Mui-focusVisible": { backgroundColor: backgroundcolor}
}))


