import {
  Flex,
  Spacer,
  Box,
  Heading,
  Stack,
  Text,
  Button,
} from "@chakra-ui/react";
import {
  FiBookOpen,
  FiPlus,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import Link from "next/link";
import { fetchAllPosts } from "./api/post";
import { useEffect, useState } from "react";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [link, setLink] = useState([]);

  function replaceSign(str) {
    if (str === "&laquo; Previous") {
      return str.replace(/&laquo;/g, "");
    } else if (str === "Next &raquo;") {
      return str.replace(/&raquo;/g, "");
    } else {
      return str;
    }
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const allPosts = await fetchAllPosts(currentPage);
      setPosts(allPosts.data);
      setCurrentPage(allPosts.current_page);
      setLink(allPosts.links);
    };
    fetchPosts();
  }, [currentPage]);

  const handlePageBtn = (pageUrl) => {
    const urlParams = new URLSearchParams(pageUrl.split("?")[1]);
    const page = urlParams.get("page");
    setCurrentPage(page);
  };

  return (
    <Box p={5}>
      <Flex>
        <Box p="1">
          <Heading size="lg" mb={3}>
            All Posts
          </Heading>
        </Box>
        <Box p="1">
          <Link href={`/posts/new`}>
            <Button size="sm" colorScheme="blue" mr={2}>
              <FiPlus /> Buat Post Baru
            </Button>
          </Link>
        </Box>
      </Flex>

      {posts.length === 0 ? (
        <Text>No posts found.</Text>
      ) : (
        <Stack spacing={5}>
          {posts.map((post) => (
            <Box key={post.id} borderWidth="1px" borderRadius="lg" p={5}>
              <Flex>
                <Box p="1">
                  <Heading size="md">{post.title}</Heading>
                </Box>
                <Spacer />
                <Box p="1">
                  <Link href={`/posts/${post.id}`}>
                    <Button size="sm" colorScheme="blue" mr={2}>
                      <FiBookOpen /> &nbsp; Detail
                    </Button>
                  </Link>
                </Box>
              </Flex>
            </Box>
          ))}
        </Stack>
      )}

      <Flex justify="center" align="center" maxW="container.lg" mx="auto">
        {link.map((link, index) => (
          <Button
            key={index}
            isActive={link.active}
            isDisabled={link.url === null}
            onClick={() => handlePageBtn(link.url)}
            mt={8}
            mr={4}
          >
            <p>{replaceSign(link.label)}</p>
          </Button>
        ))}
      </Flex>
    </Box>
  );
};

export default Home;
