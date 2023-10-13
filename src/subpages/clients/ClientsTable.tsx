import { useBookProvider } from "@/src/contexts/book";
import { useBranchProvider } from "@/src/contexts/branch";
import { useProductProvider } from "@/src/contexts/product";
import { getDateString } from "@/src/handlers/dates";
import { ClientTable } from "@/src/types/Client/table";
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
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import React from "react";

export const ClientsTable = () => {
  // Attributes
  const [clientsTable, setClientsTable] = React.useState<ClientTable[]>([]);
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
      return;
    }

    console.log("Se ejecutooo....");
    const c = await ClientTable.GetClientsTable(clients, products, books);
    setClientsTable(c);
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
      <TableContainer>
        <Table variant="simple">
          <TableCaption>Your clients</TableCaption>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Description</Th>
              <Th>Last Book</Th>
              <Th isNumeric>Total Spend</Th>
              {products.map((p) => (
                <Th key={p.id}>{p.name}</Th>
              ))}
              <Th>Created At</Th>
            </Tr>
          </Thead>
          <Tbody>
            {clientsTable.map((c) => (
              <Tr>
                <Th>{c.name}</Th>
                <Th>{c.description}</Th>
                <Th>{getDateString(c.lastBook)}</Th>
                <Th>{c.totalSpend}</Th>
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
