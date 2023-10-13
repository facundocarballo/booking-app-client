import { useBookProvider } from "@/src/contexts/book";
import { useBranchProvider } from "@/src/contexts/branch";
import { useProductProvider } from "@/src/contexts/product";
import { getDateString } from "@/src/handlers/dates";
import { ClientTable } from "@/src/types/Client/table";
import { InfoIcon } from "@chakra-ui/icons";
import {
  Box,
  Spinner,
  VStack,
  Table,
  Thead,
  Tbody,
  Text,
  Tr,
  Th,
  TableContainer,
  HStack,
  Input,
  Spacer,
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Divider,
} from "@chakra-ui/react";
import React from "react";

export const ClientsTable = () => {
  // Attributes
  const [clientsTable, setClientsTable] = React.useState<ClientTable[]>([]);
  const [clientsTableFilter, setClientsTableFilter] = React.useState<
    ClientTable[]
  >([]);
  const [searchInput, setSearchInput] = React.useState<string>("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef(null);
  // Context
  const { clients, branchSelected } = useBranchProvider();
  const { books, setBooks } = useBookProvider();
  const { products } = useProductProvider();
  // Methods
  const handleGetClientsTable = async () => {
    if (!branchSelected) return;
    if (!clients) return;
    if (!books) {
      const b = await branchSelected.GetBusyBooks(
        new Date(0),
        new Date(Date.now())
      );
      const c = await ClientTable.GetClientsTable(clients, products, b);
      setClientsTable(c);
      setClientsTableFilter(c);
      return;
    }
    const c = await ClientTable.GetClientsTable(clients, products, books);
    setClientsTable(c);
    setClientsTableFilter(c);
  };

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.currentTarget.value;
    setSearchInput(input);
    if (input === "") {
      setClientsTableFilter(clientsTable);
      return;
    }
    const c = clientsTable.filter(
      (client) =>
        client.name.includes(input) || client.description.includes(input)
    );
    setClientsTableFilter(c);
  };

  React.useEffect(() => {
    handleGetClientsTable();
  }, []);

  // Component
  if (!clients)
    return (
      <VStack w="full">
        <Box h="100px" />
        <Spinner />
      </VStack>
    );

  if (!branchSelected)
    return (
      <VStack w="full">
        <Box h="100px" />
        <Text>Branch not selected</Text>
      </VStack>
    );
  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Clients Info
            </AlertDialogHeader>

            <AlertDialogBody>
              <Text variant="info">Dates: MM-DD-YYYY</Text>
              <Box h='10px' />
              <Divider />
              <Box h='10px' />
              <Text variant="caption">Books Frequency</Text>
              <Text variant="info">
                Shows how often a client ask for a book.
              </Text>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} variant="callToAction" onClick={onClose}>
                OK
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      <HStack w="full">
        <Box w="10px" />
        <Input
          w={{ lg: "50%", md: "60%", sm: "80%", base: "90%" }}
          borderRadius={10}
          placeholder="Clients"
          value={searchInput}
          onChange={handleSearchInput}
        />
        <Spacer />
        <Button variant="callToAction" onClick={onOpen}>
          <InfoIcon />
        </Button>
        <Box w="5px" />
      </HStack>
      <Box h="10px" />
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Description</Th>
              <Th>Last Book</Th>
              <Th>Total Spend</Th>
              <Th>Books Frequency</Th>
              {products.map((p) => (
                <Th key={p.id}>{p.name}</Th>
              ))}
              <Th>Created At</Th>
            </Tr>
          </Thead>
          <Tbody>
            {clientsTableFilter.map((c) => (
              <Tr>
                <Th>{c.name}</Th>
                <Th>{c.description}</Th>
                <Th>{getDateString(c.lastBook)}</Th>
                <Th>{c.totalSpend}</Th>
                <Th>{c.booksFrequency}</Th>
                {c.productsBooks.map((p) => (
                  <Th>{p}</Th>
                ))}
                <Th>{getDateString(c.createdAt)}</Th>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};
