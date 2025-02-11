"use client";

import { useState } from "react";
import constate from "constate";
import { logError } from "@/lib/logger";
import { OrganizationResponse } from "@/types/responses";
import { fetchOrganizations as _fetchOrganizations } from "@/api/organizations/fetch-organizations";

const useOrganization = () => {
  const [organizations, setOrganizations] = useState<
    OrganizationResponse[] | null | undefined
  >(undefined);
  const [selectedOrganization, setSelectedOrganization] = useState<
    OrganizationResponse | null | undefined
  >(undefined);

  const fetchOrganizations = async () => {
    try {
      const fetchedOrganizations = await _fetchOrganizations();
      setOrganizations(fetchedOrganizations);
    } catch (error) {
      logError("Error fetching organizations:", error);
    }
  };

  return {
    organizations,
    fetchOrganizations,
    selectedOrganization,
    setSelectedOrganization,
  };
};

export const [OrganizationProvider, useOrganizationContext] =
  constate(useOrganization);
