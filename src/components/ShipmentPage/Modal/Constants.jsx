import { AddPreferences } from "./AddPreferences";

import { BulkSearchModal } from "./BulkSearch";
import { BulkSearchViewModal } from "./BulkSearchView";
import { EscalationRequest } from "./EscalationRequest";
import { FilterModal } from "./FilterModal";
import { NDRJourney } from "./NDRJourney";
import { RequestActions } from "./RequestActions";
import { ReviewLineitemEscalation } from "./ReviewLineItemEscalation";
import { SavedFilters } from "./SavedFilters";
import { SavedPreferences } from "./SavedPrefences";

export const currentModalObj = {
  filterModal: FilterModal,
  bulkSearchModal: BulkSearchModal,
  bulkSearchViewModal: BulkSearchViewModal,
  savedFilters: SavedFilters,
  preferencesModal: AddPreferences,
  savedPreferences: SavedPreferences,
  shipmentAction: RequestActions,
  escalationRequest: EscalationRequest,
  reviewLineitemEscalation: ReviewLineitemEscalation,
  ndrJourney: NDRJourney,
};
