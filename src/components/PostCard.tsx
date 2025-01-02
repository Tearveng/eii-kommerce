import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid2,
  Typography,
} from "@mui/material";

const ResponsivePostCard = () => {
  const posts = [
    {
      title: "Post 1",
      image: "https://via.placeholder.com/400x300",
      description: "This is a brief description of post 1.",
    },
    {
      title: "Post 2",
      image: "https://via.placeholder.com/400x300",
      description: "This is a brief description of post 2.",
    },
    {
      title: "Post 3",
      image: "https://via.placeholder.com/400x300",
      description: "This is a brief description of post 3.",
    },
    {
      title: "Post 4",
      image: "https://via.placeholder.com/400x300",
      description: "This is a brief description of post 4.",
    },
  ];

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Grid2 container spacing={2} justifyContent="center">
        {posts.map((post, index) => (
          <Grid2 item xs={12} sm={6} md={3} key={index}>
            <PostCard {...post} />
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
};

export default ResponsivePostCard;

const PostCard = ({ title, image, description }) => {
  return (
    <Card sx={{ maxWidth: 345, boxShadow: 3 }}>
      <CardMedia component="img" height="140" image={image} alt={title} />
      <CardContent>
        <Typography variant="h6" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <Button size="small" sx={{ margin: 1 }}>
        Read More
      </Button>
    </Card>
  );
};
