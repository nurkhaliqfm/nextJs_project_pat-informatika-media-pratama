import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Heading,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { updatePost, fetchPostById } from "@/pages/api/post";
import Link from "next/link";
import { FiX } from "react-icons/fi";

const EditPost = () => {
  const router = useRouter();
  const { id } = router.query;

  const [posts, setPosts] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors = {} },
    setValue,
  } = useForm();

  useEffect(() => {
    if (id) {
      const fetchPosts = async () => {
        const getPostbyId = await fetchPostById(id);
        setPosts(getPostbyId);
        setValue("title", getPostbyId.title);
        setValue("content", getPostbyId.content);
      };
      fetchPosts();
    }
  }, [id]);

  const onSubmit = (data) => {
    const updatePosts = async () => {
      const update = await updatePost(id, data);
      console.log(update);
      router.push(`/posts/${id}`);
    };

    updatePosts();
  };

  return (
    <Box p={10}>
      <Heading size="lg" mb={3}>
        Create New Post
      </Heading>
      {posts ? (
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
            <Button size="sm" type="submit" colorScheme="blue">
              Save
            </Button>
            <Link href={`/posts/${id}`}>
              <Button size="sm" colorScheme="gray" ml={2}>
                <FiX />
                &nbsp;Cancel
              </Button>
            </Link>
          </form>
        </Box>
      ) : (
        <Box>Loading...</Box>
      )}
    </Box>
  );
};

export default EditPost;
