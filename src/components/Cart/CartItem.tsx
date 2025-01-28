import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
    Box,
    CardMedia,
    IconButton,
    ListItem,
    Stack,
    Typography,
} from "@mui/material";
import { FixedSizeList, ListChildComponentProps } from "react-window";

const CartItem = () => {
    return (
        <Box
            sx={{
                width: "100%",
                height: 300,
                maxWidth: 460,
                bgcolor: "background.paper",
            }}
        >
            <FixedSizeList
                itemData={[1, 2, 4]}
                height={300}
                width={460}
                itemSize={75}
                itemCount={200}
                overscanCount={5}
            >
                {renderRow}
            </FixedSizeList>
        </Box>
    );
};

export default CartItem;

const renderRow = (props: ListChildComponentProps) => {
    const { index, style, data } = props;
    return (
        <ListItem style={style} key={index} component="div" disablePadding>
            <RowItem />

            {/* <ListItemText primary={`Item ${data + 1}`} /> */}
        </ListItem>
    );
};

const RowItem = () => {
    return (
        <Stack
            direction="row"
            p={1}
            width="100%"
            alignItems="center"
            justifyContent="space-between"
        >
            <Stack direction="row" alignItems="center" gap={1}>
                <Stack>
                    <CardMedia
                        component="img"
                        height="68"
                        image={`https://via.placeholder.com/400x300`}
                        alt={""}
                    />
                </Stack>
                <Typography variant="body2">The Business Project</Typography>
            </Stack>
            <Stack direction="row" gap={1}>
                <IconButton
                    sx={{ bgcolor: "primary.main", width: 25, height: 25 }}
                    disableFocusRipple
                    disableRipple
                    disableTouchRipple
                >
                    <RemoveIcon sx={{ fontSize: 14, color: "#ffffff" }} />
                </IconButton>
                <Typography>20</Typography>
                <IconButton
                    sx={{ bgcolor: "primary.main", width: 25, height: 25 }}
                    disableFocusRipple
                    disableRipple
                    disableTouchRipple
                >
                    <AddIcon sx={{ fontSize: 14, color: "#ffffff" }} />
                </IconButton>
            </Stack>
        </Stack>
    );
};
