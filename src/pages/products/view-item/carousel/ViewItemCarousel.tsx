import { Stack } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import Slider, { Settings } from "react-slick";
import "./style.css";

interface SliderRef {
  current: Slider | null;
}

const ViewItemCarousel = () => {
  const [nav1, setNav1] = useState<SliderRef | null>(null);
  const [nav2, setNav2] = useState<SliderRef | null>(null);
  const sliderRef1 = useRef<Slider | null>(null);
  const sliderRef2 = useRef<Slider | null>(null);

  useEffect(() => {
    setNav1(sliderRef1);
    setNav2(sliderRef2);
  }, []);

  // Slider settings (optional, you can customize as needed)
  const sliderSettings: Settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    swipeToSlide: true,
    focusOnSelect: true,
  };

  return (
    <Stack gap={1}>
      <Stack maxHeight={300} maxWidth={400}>
        <Slider
          asNavFor={nav2?.current || undefined}
          ref={sliderRef1}
          {...sliderSettings}
        >
          <div style={{ width: "100%", background: "red" }}>
            <img
              src="https://imgs.search.brave.com/x_rFDF8ZfdPz_ICvGjGYjzQkixSDbAaqZRn5_AQYR00/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy9i/L2I2L0ltYWdlX2Ny/ZWF0ZWRfd2l0aF9h/X21vYmlsZV9waG9u/ZS5wbmc"
              style={{
                height: 300,
                width: 400,
                objectFit: "cover",
              }}
            />
          </div>
          <div style={{ width: "100%", background: "red" }}>
            <img
              src="https://images.pexels.com/photos/842711/pexels-photo-842711.jpeg?auto=compress&cs=tinysrgb&w=800"
              style={{
                height: 300,
                width: 400,
                objectFit: "cover",
              }}
            />
          </div>
          <div>
            <h3>3</h3>
          </div>
          <div>
            <h3>4</h3>
          </div>
          <div>
            <h3>5</h3>
          </div>
          <div>
            <h3>6</h3>
          </div>
        </Slider>
      </Stack>

      <Stack maxWidth={400}>
        <Slider
          arrows={false}
          asNavFor={nav1?.current || undefined}
          ref={sliderRef2}
          slidesToShow={3}
          swipeToSlide={true}
          focusOnSelect={true}
          className="slider-container-2"
        >
          <Stack>
            <img
              width="120"
              height="90"
              style={{
                objectFit: "cover",
              }}
              src="https://imgs.search.brave.com/x_rFDF8ZfdPz_ICvGjGYjzQkixSDbAaqZRn5_AQYR00/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy9i/L2I2L0ltYWdlX2Ny/ZWF0ZWRfd2l0aF9h/X21vYmlsZV9waG9u/ZS5wbmc"
            />
          </Stack>
          <Stack>
            <img
              width="120"
              height="90"
              style={{
                objectFit: "cover",
              }}
              src="https://images.pexels.com/photos/842711/pexels-photo-842711.jpeg?auto=compress&cs=tinysrgb&w=800"
            />
          </Stack>
          <Stack>
            {/* <img
            width={130}
            src="https://imgs.search.brave.com/x_rFDF8ZfdPz_ICvGjGYjzQkixSDbAaqZRn5_AQYR00/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy9i/L2I2L0ltYWdlX2Ny/ZWF0ZWRfd2l0aF9h/X21vYmlsZV9waG9u/ZS5wbmc"
          /> */}
          </Stack>
          <Stack>
            {/* <img
            width={130}
            src="https://imgs.search.brave.com/x_rFDF8ZfdPz_ICvGjGYjzQkixSDbAaqZRn5_AQYR00/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy9i/L2I2L0ltYWdlX2Ny/ZWF0ZWRfd2l0aF9h/X21vYmlsZV9waG9u/ZS5wbmc"
          /> */}
          </Stack>
          <Stack>
            {/* <img
            width={130}
            src="https://imgs.search.brave.com/x_rFDF8ZfdPz_ICvGjGYjzQkixSDbAaqZRn5_AQYR00/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy9i/L2I2L0ltYWdlX2Ny/ZWF0ZWRfd2l0aF9h/X21vYmlsZV9waG9u/ZS5wbmc"
          /> */}
          </Stack>
          <Stack>
            {/* <img
            width={130}
            src="https://imgs.search.brave.com/x_rFDF8ZfdPz_ICvGjGYjzQkixSDbAaqZRn5_AQYR00/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy9i/L2I2L0ltYWdlX2Ny/ZWF0ZWRfd2l0aF9h/X21vYmlsZV9waG9u/ZS5wbmc"
          /> */}
          </Stack>
        </Slider>
      </Stack>
    </Stack>
  );
};

export default ViewItemCarousel;
