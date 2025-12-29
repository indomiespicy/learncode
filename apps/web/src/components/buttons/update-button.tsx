import { Edit } from "lucide-react";
import { Button } from "../ui/button";

export const UpdateButton = ({
  handleUpdate,
  isPending = false,
}: {
  handleUpdate: () => void;
  isPending?: boolean;
}) => {
  return (
    <Button variant="outline" onClick={handleUpdate} disabled={isPending}>
      <Edit />
    </Button>
  );
};
