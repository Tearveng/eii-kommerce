import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import ButtonBuy from "../../components/Button/ButtonBuy.tsx";
import ButtonCart from "../../components/Button/ButtonCart.tsx";

const ViewItemsPage = () => {
  const posts = [
    {
      title: "Extra Bass",
      image: "https://via.placeholder.com/400x300",
      showMore: true,
      description:
        "Turn down the world's noise with the long-lasting noise cancellation performance of the WH-CH710N wireless headphones. Dual Noise Sensor technology automatically senses your environment to deliver an amazing sound experience. ",
    },
    {
      title: "Post 2",
      image: "https://via.placeholder.com/400x300",
      showMore: false,
      description:
        "Turn down the world's noise with the long-lasting noise cancellation performance of the WH-CH710N wireless headphones. Dual Noise Sensor technology automatically",
    },
    {
      title: "Post 3",
      image: "https://via.placeholder.com/400x300",
      showMore: false,
      description: "This is a brief description of post 3.",
    },
    {
      title: "Post 4",
      image: "https://via.placeholder.com/400x300",
      showMore: true,
      description: "This is a brief description of post 4.",
    },
    {
      title: "Extra Bass",
      image: "https://via.placeholder.com/400x300",
      showMore: false,
      description:
        "Turn down the world's noise with the long-lasting noise cancellation performance of the WH-CH710N wireless headphones. Dual Noise Sensor technology automatically senses your environment to deliver an amazing sound experience. ",
    },
    {
      title: "Post 2",
      image: "https://via.placeholder.com/400x300",
      showMore: false,
      description:
        "Turn down the world's noise with the long-lasting noise cancellation performance of the WH-CH710N wireless headphones. Dual Noise Sensor technology automatically",
    },
    {
      title: "Post 3",
      image: "https://via.placeholder.com/400x300",
      showMore: false,
      description: "This is a brief description of post 3.",
    },
    {
      title: "Post 4",
      image: "https://via.placeholder.com/400x300",
      showMore: true,
      description: "This is a brief description of post 4.",
    },
    {
      title: "Extra Bass",
      image: "https://via.placeholder.com/400x300",
      showMore: false,
      description:
        "Turn down the world's noise with the long-lasting noise cancellation performance of the WH-CH710N wireless headphones. Dual Noise Sensor technology automatically senses your environment to deliver an amazing sound experience. ",
    },
    {
      title: "Post 2",
      image: "https://via.placeholder.com/400x300",
      showMore: false,
      description:
        "Turn down the world's noise with the long-lasting noise cancellation performance of the WH-CH710N wireless headphones. Dual Noise Sensor technology automatically",
    },
    {
      title: "Post 3",
      image: "https://via.placeholder.com/400x300",
      showMore: false,
      description: "This is a brief description of post 3.",
    },
    {
      title: "Post 4",
      image: "https://via.placeholder.com/400x300",
      showMore: true,
      description: "This is a brief description of post 4.",
    },
  ];

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Grid container spacing={2} justifyContent="center">
        {posts.map((post, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
            <PostCard {...post} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ViewItemsPage;

interface PostCardProps {
  title: string;
  image: string;
  description: string;
}

const PostCard = ({ title, image, description }: PostCardProps) => {
  return (
    <Card sx={{ maxWidth: 345, boxShadow: 2, maxHeight: 463, flexGrow: 1 }}>
      <CardMedia component="img" height="186" image={image} alt={title} />
      <CardContent>
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack>
            <Typography variant="body3" component="div">
              {title}
            </Typography>
            <Typography variant="subtitle1" component="div">
              {title}
            </Typography>
          </Stack>

          <Typography variant="h6" component="div">
            $100
          </Typography>
        </Stack>
        <Typography
          variant="body2"
          color="text.secondary"
          maxHeight={100}
          sx={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            WebkitLineClamp: 2, // Limit to 2 lines
            textOverflow: "ellipsis",
            maxWidth: "300px", // Set a max width for the container
          }}
        >
          {description}
        </Typography>
      </CardContent>
      <CardActions sx={{ px: 2 }}>
        <Stack
          width="100%"
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
        >
          <ButtonCart />
          <ButtonBuy />
        </Stack>
      </CardActions>
    </Card>
  );
};
