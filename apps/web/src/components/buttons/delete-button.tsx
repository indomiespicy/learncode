import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";

export const DeleteButton = ({
  handleDelete,
  isPending = false,
}: {
  handleDelete: () => void;
  isPending?: boolean;
}) => {
  return (
    <Button
      className="text-destructive hover:bg-destructive"
      variant="outline"
      onClick={handleDelete}
      disabled={isPending}
    >
      <Trash2 />
    </Button>
  );
};
