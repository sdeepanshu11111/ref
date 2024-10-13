import { AddNoteModal } from "./AddNote";
import { AddPreferences } from "./AddPreferences";
import { BulkAddNote } from "./BulkAddNote";
import { BulkAddTags } from "./BulkAddTags";
import { BulkOrderPlaceViaCSV } from "./BulkPlaceOrderVIaCSV";
import { BulkSearchModal } from "./BulkSearch";
import { BulkSearchViewModal } from "./BulkSearchView";
import { BulkUpdateCSV } from "./BulkUpdateCSV";
import { EditCustomerInfoModal } from "./EditCustomerInfo";
import { EditQuantityModal } from "./EditQuantity";
import { FilterModal } from "./FilterModal";
import { SavedFilters } from "./SavedFilters";
import { SavedPreferences } from "./SavedPrefences";
import { UpdateTagsModal } from "./UpdateTags";

export const currentModalObj = {
  editQuantity: EditQuantityModal,
  addNoteModal: AddNoteModal,
  updateTagModal: UpdateTagsModal,
  editCustomerInfo: EditCustomerInfoModal,
  filterModal: FilterModal,
  bulkSearchModal: BulkSearchModal,
  bulkSearchViewModal: BulkSearchViewModal,
  savedFilters: SavedFilters,
  bulkAddNote: BulkAddNote,
  bulkUpdateCSV: BulkUpdateCSV,
  bulkAddTags: BulkAddTags,
  preferencesModal: AddPreferences,
  savedPreferences: SavedPreferences,
  bulkPlaceOrderviaCSV:BulkOrderPlaceViaCSV
};
