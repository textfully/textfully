"use client";

import { useState, useEffect } from "react";
import constate from "constate";
import { logError } from "@/lib/logger";
import { OrganizationResponse } from "@/types/responses";
import { getData, removeData, setData } from "@/lib/storage";
import { fetchOrganizations as _fetchOrganizations } from "@/api/organizations/fetch-organizations";

const useOrganization = () => {
  const [organizations, setOrganizations] = useState<
    OrganizationResponse[] | null | undefined
  >(undefined);
  const [selectedOrganization, setSelectedOrganization] = useState<
    OrganizationResponse | null | undefined
  >(undefined);

  // Load the last selected organization from storage
  useEffect(() => {
    const savedOrg = getData("SELECTED_ORGANIZATION");
    if (savedOrg) {
      try {
        setSelectedOrganization(JSON.parse(savedOrg));
      } catch (error) {
        logError("Error parsing saved organization:", error);
      }
    }
  }, []);

  const fetchOrganizations = async () => {
    try {
      const fetchedOrganizations = await _fetchOrganizations();
      setOrganizations(fetchedOrganizations);

      // If no organization is selected, select the first one
      if (!selectedOrganization && fetchedOrganizations?.length > 0) {
        const orgToSelect = fetchedOrganizations[0];
        setSelectedOrganizationWithStorage(orgToSelect);
      }
    } catch (error) {
      logError("Error fetching organizations:", error);
      setOrganizations(null);
    }
  };

  // Wrap setSelectedOrganization to save to storage
  const setSelectedOrganizationWithStorage = (
    org: OrganizationResponse | null | undefined
  ) => {
    setSelectedOrganization(org);
    if (org) {
      setData("SELECTED_ORGANIZATION", JSON.stringify(org));
    } else {
      removeData("SELECTED_ORGANIZATION");
    }
  };

  return {
    organizations,
    fetchOrganizations,
    selectedOrganization,
    setSelectedOrganization: setSelectedOrganizationWithStorage,
  };
};

export const [OrganizationProvider, useOrganizationContext] =
  constate(useOrganization);
