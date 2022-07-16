interface AssociationMessage {
  associationChatMessageID: number;
  createdAt: string;
}

interface AssociationMessageSystem extends AssociationMessage {
  systemMessage: string;
  type: string;
  colorClass: string;
}

interface AssociationMessageUser extends AssociationMessage {
  userName: string;
  message: string;
  roleColor: string;
  roleName: string;
}

const isAssociationMessageSystem = function (
  object: object
): object is AssociationMessageSystem {
  return (
    'systemMessage' in object && 'type' in object && 'colorClass' in object
  );
};

const isAssociationMessageUser = function (
  object: object
): object is AssociationMessageUser {
  return (
    'userName' in object &&
    'message' in object &&
    'roleColor' in object &&
    'roleName' in object
  );
};

export type { AssociationMessageSystem, AssociationMessageUser };
export { isAssociationMessageSystem, isAssociationMessageUser };
