import {DocumentItemType} from "../../api/types";

export interface EditableRowProps {
  record: DocumentItemType;
  handleSaveEdit: (values: DocumentItemType) => void;
  handleCancelEdit: () => void;
}

export interface DisplayRowProps {
  record: DocumentItemType;
  handleEdit: (record: DocumentItemType) => void;
  handleDelete: (id: string) => void;
}