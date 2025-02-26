"use client";

import { useState, useEffect } from "react";
import constate from "constate";
import { logError } from "@/lib/logger";
import { OrganizationResponse } from "@/types/responses";
import { getData, removeData, setData } from "@/lib/storage";
import { migrateSelectedOrganization } from "@/lib/migrations";
import { fetchOrganizations as _fetchOrganizations } from "@/api/organizations/fetch-organizations";
import { fetchOrganizationById } from "@/api/organizations/fetch-organization";
import { useAuthContext } from "./use-auth-context";

const useOrganization = () => {
  const { user } = useAuthContext();

  const [organizations, setOrganizations] = useState<
    OrganizationResponse[] | null | undefined
  >(undefined);
  const [selectedOrganization, setSelectedOrganization] = useState<
    OrganizationResponse | null | undefined
  >(undefined);
  const [isLoadingOrganization, setIsLoadingOrganization] =
    useState<boolean>(true);

  // Load the organization ID from storage and fetch the current data
  useEffect(() => {
    if (!user) return;
    migrateSelectedOrganization();

    const loadInitialData = async () => {
      setIsLoadingOrganization(true);
      try {
        // Fetch all organizations first
        const fetchedOrganizations = await _fetchOrganizations();
        setOrganizations(fetchedOrganizations);

        // Check if we have a saved organization ID
        const savedOrgId = getData("SELECTED_ORGANIZATION_ID");

        if (savedOrgId) {
          // Try to find the saved organization in the fetched list first
          const savedOrg = fetchedOrganizations.find(
            (org) => org.id === savedOrgId
          );

          if (savedOrg) {
            setSelectedOrganization(savedOrg);
          } else {
            // If not found in the list, try to fetch it directly
            try {
              const org = await fetchOrganizationById(savedOrgId);
              setSelectedOrganization(org);
            } catch (error) {
              logError("Error fetching saved organization:", error);
              // Clear the invalid organization ID from storage
              removeData("SELECTED_ORGANIZATION_ID");

              // Select the first organization if available
              if (fetchedOrganizations.length > 0) {
                setSelectedOrganizationWithStorage(fetchedOrganizations[0]);
              }
            }
          }
        } else if (fetchedOrganizations.length > 0) {
          // If no saved organization but we have organizations, select the first one
          setSelectedOrganizationWithStorage(fetchedOrganizations[0]);
        } else {
          // No saved org and no orgs available
          setSelectedOrganization(null);
        }
      } catch (error) {
        logError("Error fetching organizations:", error);
        setOrganizations(null);
        setSelectedOrganization(null);
      } finally {
        setIsLoadingOrganization(false);
      }
    };

    loadInitialData();
  }, [user]);

  const fetchOrganizations = async () => {
    try {
      const fetchedOrganizations = await _fetchOrganizations();
      setOrganizations(fetchedOrganizations);

      // Only select the first organization if none is currently selected
      if (selectedOrganization === null && fetchedOrganizations.length > 0) {
        setSelectedOrganizationWithStorage(fetchedOrganizations[0]);
      }
    } catch (error) {
      logError("Error fetching organizations:", error);
      setOrganizations(null);
    }
  };

  const setSelectedOrganizationWithStorage = (
    org: OrganizationResponse | null | undefined
  ) => {
    if (org) {
      setData("SELECTED_ORGANIZATION_ID", org.id);
    } else {
      removeData("SELECTED_ORGANIZATION_ID");
    }
    setSelectedOrganization(org);
  };

  return {
    organizations,
    fetchOrganizations,
    selectedOrganization,
    setSelectedOrganization: setSelectedOrganizationWithStorage,
    isLoadingOrganization,
  };
};

export const [OrganizationProvider, useOrganizationContext] =
  constate(useOrganization);
