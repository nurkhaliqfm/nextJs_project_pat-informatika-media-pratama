import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Heading,
} from "@chakra-ui/react";
import { createPost, fetchAllPosts } from "../api/post";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Link from "next/link";
import { FiX } from "react-icons/fi";

const NewPost = () => {
  const {
    register,
    handleSubmit,
    formState: { errors = {} },
  } = useForm();
  const router = useRouter();

  const onSubmit = (data) => {
    const createPosts = async () => {
      const create = await createPost(data);
      console.log(create);
      router.push("/");
    };

    createPosts();
  };

  return (
    <Box p={10}>
      <Box p="1">
        <Heading size="lg" mb={3}>
          Create New Post
        </Heading>
        <Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl mb="4">
              <FormLabel>Title</FormLabel>
              <Input
                type="text"
                {...register("title", {
                  required: {
                    value: true,
                    message: "Title is required",
                  },
                  maxLength: {
                    value: 20,
                    message: "Title must be no more than 20 characters",
                  },
                })}
              />
              {errors.title && <p>{errors.title.message}</p>}
            </FormControl>
            <FormControl mb="4">
              <FormLabel>Content</FormLabel>
              <Textarea
                name="content"
                {...register("content", {
                  required: {
                    value: true,
                    message: "Content is required",
                  },
                  maxLength: {
                    value: 255,
                    message: "Content must be no more than 255 characters",
                  },
                })}
              />
              {errors.content && <p>{errors.content.message}</p>}
            </FormControl>
            <Button type="submit" colorScheme="blue">
              Create
            </Button>
            <Link href={`/`}>
              <Button size="sm" colorScheme="gray" ml={2}>
                <FiX />
                &nbsp; Cancel
              </Button>
            </Link>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default NewPost;
