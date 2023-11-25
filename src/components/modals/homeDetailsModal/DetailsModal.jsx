/* eslint-disable max-len */
import React, { useContext } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  Box,
  Link,
  Text,
  List,
  ListItem,
  Badge,
  Image,
  HStack,
  Center,
  Flex,
} from '@chakra-ui/react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
// import * as FaIcons from 'react-icons/fa';
// import * as MdIcons from 'react-icons/md';
import { ProjectContext } from '../../context/ProjectContext';
import { useResumeContext } from '../../context/ResumeContext';

const ProjectDetailsModal = () => {
  const { detailsModalShow, closeDetailsModal, detailsModalData } =
    useContext(ProjectContext);
  const { allIcons } = useResumeContext();

  const tech = detailsModalData?.technologies?.map((iconDetail, i) => {
    // Get the actual React component from our mapping using the class field
    const IconComponent = allIcons[iconDetail.class];

    return (
      <ListItem key={i} mx={3} textAlign="center">
        {IconComponent && <Box as={IconComponent} boxSize={12} />}
        <Text fontSize="xs" mt={2}>
          {iconDetail.name}
        </Text>
      </ListItem>
    );
  });

  return (
    <Modal
      isOpen={detailsModalShow}
      onClose={closeDetailsModal}
      size="lg"
      isCentered
    >
      <ModalOverlay />
      <ModalContent bg="gray.800" color="white" borderRadius="2xl">
        <ModalCloseButton />
        <ModalHeader fontFamily="'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif">
          <Flex justify="center" align="start" direction="column">
            <Badge colorScheme="blue">{detailsModalData?.startDate}</Badge>
            <Text
              fontSize="2xl"
              fontWeight="bold"
              borderBottom="2px solid"
              borderColor="blue.400"
              pb={2}
            >
              {detailsModalData?.title}
            </Text>
          </Flex>
          <Center mt={4}>
            <HStack spacing={4}>
              {detailsModalData?.url && (
                <Link href={detailsModalData.url} isExternal color="blue.400">
                  <HStack spacing={2}>
                    <FaExternalLinkAlt size={24} />
                    <Text>View Live</Text>
                  </HStack>
                </Link>
              )}
              {detailsModalData?.readmeurl && (
                <Link
                  href={detailsModalData.readmeurl}
                  isExternal
                  color="green.400"
                >
                  <HStack spacing={2}>
                    <FaGithub size={24} />
                    <Text>View on GitHub</Text>
                  </HStack>
                </Link>
              )}
            </HStack>
          </Center>
        </ModalHeader>
        <Box p={6}>
          <Text
            mb={6}
            fontSize="md"
            isTruncated
            noOfLines={5}
            borderBottom="1px solid"
            borderColor="gray.600"
            pb={4}
          >
            {detailsModalData?.description}
          </Text>
          <Box mb={6}>
            {detailsModalData?.images?.map((imgSrc, idx) => (
              <Image
                key={idx}
                src={imgSrc + '.png'}
                alt={`Project image ${idx}`}
                borderRadius="md"
                my={2}
                boxShadow="xl"
              />
            ))}
          </Box>
          <Box
            textAlign="center"
            mt={4}
            borderBottom="1px solid"
            borderColor="gray.600"
            pb={4}
          >
            <Text fontSize="lg" mb={4}>
              Technologies Used:
            </Text>
            <List display="inline-flex">{tech}</List>
          </Box>
        </Box>
      </ModalContent>
    </Modal>
  );
};

export default ProjectDetailsModal;
