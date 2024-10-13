import { AddPreferences } from "./AddPreferences";
import { BulkSearchModal } from "./BulkSearch";
import { BulkSearchViewModal } from "./BulkSearchView";
import { NDRReattemptModal } from "./ReattemptModal";
import { FilterModal } from "./FilterModal";
import { NDRJourney } from "./NDRJourney";
import { SavedFilters } from "./SavedFilters";
import { SavedPreferences } from "./SavedPrefences";
import { EscalationModal } from "./EscalationModal";
import { BulkRTOModal } from "./BulkRTOModal";
import { BulkReattemptModal } from "./BulkReattemptModal";

export const currentModalObj = {
  filterModal: FilterModal,
  bulkSearchModal: BulkSearchModal,
  bulkSearchViewModal: BulkSearchViewModal,
  savedFilters: SavedFilters,
  preferencesModal: AddPreferences,
  savedPreferences: SavedPreferences,
  ndrJourney: NDRJourney,
  NDRReattemptModal:NDRReattemptModal,
  escalationModal:EscalationModal,
  bulkRTOModal:BulkRTOModal,
  bulkReattemptModal:BulkReattemptModal
};
