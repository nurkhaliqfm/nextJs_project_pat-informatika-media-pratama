import { fetchPostById, deletePost } from "../api/post";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { FiEdit, FiTrash2, FiChevronLeft } from "react-icons/fi";

const PostDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  const [posts, setPosts] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchPosts = async () => {
        const getPostbyId = await fetchPostById(id);
        setPosts(getPostbyId);
      };
      fetchPosts();
    }
  }, [id]);

  const handleDelete = () => {
    deletePost(id);
    router.push("/");
  };

  return (
    <Box p={5}>
      {posts ? (
        <Box p={5} borderWidth="1px" borderRadius="lg">
          <Heading mb="4">{posts.title}</Heading>
          <Text mb="4">{posts.content}</Text>
          <Link href={`/posts/edit/${posts.id}`}>
            <Button size="sm" colorScheme="blue" mr={2}>
              <FiEdit />
              &nbsp;Edit Post
            </Button>
          </Link>
          <Button size="sm" colorScheme="red" onClick={handleDelete}>
            <FiTrash2 />
            &nbsp;Hapus Post
          </Button>
          <Link href={`/`}>
            <Button size="sm" colorScheme="gray" ml={2}>
              <FiChevronLeft />
              &nbsp; Back
            </Button>
          </Link>
        </Box>
      ) : (
        <Box>Loading...</Box>
      )}
    </Box>
  );
};

export default PostDetail;
