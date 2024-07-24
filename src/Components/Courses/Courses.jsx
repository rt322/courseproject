import {
  Button,
  Container,
  HStack,
  Heading,
  Image,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import study from "../../assets/images/stuudy.png";
import "../Courses/Courses.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllCourses } from "../../redux/actions/course";
import toast from "react-hot-toast";
import { addtoplaylist } from "../../redux/actions/profile";
import { getMyProfile } from "../../redux/actions/user";

const Coursecard = ({
  views,
  title,
  imgsrc,
  id,
  addtoplaylist,
  creator,
  description,
  lecturecount,
}) => {
  return (
    <VStack
      className="course"
      alignItems={["center", "flex-start"]}
      spacing={4} // Add spacing between elements
      padding={4} // Add padding inside the card
    >
      <Image src={imgsrc} boxSize="60" />
      <Heading
        textAlign={["center", "left"]}
        size={"lg"}
        fontFamily={"sans-serif"}
        noOfLines={2}
        children={title}
      />
      <Text children={description} noOfLines={2} />

      <HStack>
        <Text
          fontWeight={"bold"}
          textTransform={"uppercase"}
          children={"Creator"}
        />

        <Text
          fontFamily={"sans-serif"}
          textTransform={"uppercase"}
          children={creator}
        />
      </HStack>

      <Heading
        textAlign={"center"}
        size={"xs"}
        children={`Lectures-${lecturecount}`}
      />
      <Heading textAlign={"center"} size={"xs"} children={`Views-${views}`} />

      <Stack direction={["column", "row"]} alignItems={"center"}>
        <Link to={`/course/${id}`}>
          <Button colorScheme="yellow">Watch now</Button>
        </Link>
        <Button
          variant={"ghost"}
          colorScheme="yellow"
          onClick={() => addtoplaylist(id)}
        >
          Add to Playlist
        </Button>
      </Stack>
    </VStack>
  );
};

const Courses = () => {
  const dispatch = useDispatch();

  const addtoPlaylist = async (courseId) => {
    await dispatch(addtoplaylist(courseId));
    dispatch(getMyProfile());
  };

  const { courses, error, message } = useSelector((state) => state.course);
  useEffect(() => {
    dispatch(getAllCourses());
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }

    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [dispatch, error, message]);

  return (
    <Container paddingY={"8"} maxWidth="100%"> {/* Ensure container takes full width */}
      <Heading children="All Courses" margin={8} />

      <Stack
        direction={["column", "row"]}
        justifyContent={["flex-start", "flex-start"]} // Align to start on both mobile and desktop
        alignItems={["flex-start", "flex-start"]} // Align to start on both mobile and desktop
        spacing={4} // Add spacing between course cards
      >
        {courses.length > 0 ? (
          courses.map((item) => (
            <Coursecard
              key={item._id}
              title={item.title}
              description={item.description}
              views={item.views}
              imgsrc={item.poster.url}
              id={item._id}
              creator={item.createdBy}
              lecturecount={item.numOfVideos}
              addtoplaylist={addtoPlaylist}
            />
          ))
        ) : (
          <Heading children="course not found" />
        )}
      </Stack>
    </Container>
  );
};
export default Courses;
