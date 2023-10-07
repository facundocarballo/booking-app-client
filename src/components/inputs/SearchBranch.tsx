import {
  Button,
  HStack,
  Select,
  Spacer,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { useBusinessProvider } from "@/src/contexts/business";
import { BusinessCategory } from "@/src/types/business/category";
import { useHomeProvider } from "@/src/contexts/home";
import { GeoHash } from "@/src/types/GeoHash";
import { useBranchProvider } from "@/src/contexts/branch";

export const SearchBranch = () => {
  // Attributes
  const [categorySelected, setCategorySelected] = React.useState<
    string | undefined
  >(undefined);
  const [precisionSelected, setPrecisionSelected] = React.useState<string>(
    GeoHash.DISTANCE[4].precision.toString()
  );
  const [loading, setLoading] = React.useState<boolean>(false);
  const geoHash = React.useRef("");
  const objSize = {
    xl: "30%",
    lg: "50%",
    md: "70%",
    sm: "90%",
    base: "95%",
  };
  const selectCategorySize = {
    xl: "25%",
    lg: "40%",
    md: "58%",
    sm: "75%",
    base: "80%",
  };
  const selectPrecisionSize = {
    xl: "5%",
    lg: "10%",
    md: "12%",
    sm: "15%",
    base: "20%",
  };
  // Context
  const { user } = useHomeProvider();
  const { categories, setCategories } = useBusinessProvider();
  const { setSearchBranches } = useBranchProvider();
  // Methods
  const handlerGetAllBusinessCategories = async () => {
    const c = await BusinessCategory.GetAllBusinessCategories();
    setCategorySelected(c[0].id);
    setCategories(c);
  };

  const handleSearch = async () => {
    setSearchBranches([]);
    if (!user || !categorySelected) return;
    setLoading(true);
    console.log("Usamos este Geohash: ", getGeoHashOfQuery());
    const res = await user.GetBranchesFromSearch(
      categorySelected,
      getGeoHashOfQuery()
    );
    setSearchBranches(res);
    setLoading(false);
  };

  const getGeoHashOfQuery = (): string => {
    let gh = "";
    let i = 0;
    while (i < Number(precisionSelected)) {
      gh += geoHash.current[i];
      i++;
    }

    return gh;
  };

  const getCurrenteGeoHash = () => {
    navigator.geolocation.getCurrentPosition((p) => {
      geoHash.current = GeoHash.encode(
        p.coords.latitude,
        p.coords.longitude,
        12
      );
    });
  };

  React.useEffect(() => {
    if (categories !== undefined) {
      setCategories(categories);
      return;
    }
    handlerGetAllBusinessCategories();
    getCurrenteGeoHash();
  }, []);

  // Component
  return (
    <>
      <VStack w="full">
        <HStack w={objSize}>
          <Text variant="caption">Que quieres hacer hoy?</Text>
          <Spacer />
        </HStack>
        
        {!categories ? (
          <Spinner />
        ) : (
          <HStack w="full">
            <Spacer />
            <Select
              defaultValue={categories[0].id}
              onChange={(e) => setCategorySelected(e.currentTarget.value)}
              w={selectCategorySize}
              h="40px"
              borderRadius={10}
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.description}
                </option>
              ))}
            </Select>
            <Select
              w={selectPrecisionSize}
              h="40px"
              defaultValue={GeoHash.DISTANCE[4].precision}
              onChange={(e) => setPrecisionSelected(e.currentTarget.value)}
              borderRadius={10}
            >
              {GeoHash.DISTANCE.map((d) => (
                <option key={d.precision} value={d.precision}>
                  {d.label}
                </option>
              ))}
            </Select>
            <Spacer />
          </HStack>
        )}

        <HStack w={objSize}>
          <Spacer />
          <Button
            isDisabled={geoHash.current === ""}
            variant="callToAction"
            onClick={handleSearch}
          >
            SEARCH
          </Button>
          {geoHash.current === "" ? (
            <Text variant="alert">
              Accept the Geolocation to search for a business
            </Text>
          ) : null}
          {loading ? <Spinner /> : null}
        </HStack>
      </VStack>
    </>
  );
};
