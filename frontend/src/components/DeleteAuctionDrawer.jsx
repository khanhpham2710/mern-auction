import { deleteAuction } from "@/store/slices/auctionSlice";
import { useDispatch } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { useState } from "react";

function DeleteAuctionDrawer({ id }) {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const handleDeleteAuction = () => {
    dispatch(deleteAuction(id));
    setIsOpen(false);
  };

  const handleCloseDialog = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-red-400 text-center text-white text-xl px-4 py-2 rounded-md transition-all duration-300 hover:bg-red-600 hover:text-white"
          onClick={() => setIsOpen(true)}
        >
          Delete Auction
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Auction?</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this auction?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            className="text-black bg-white hover:bg-gray-300 border-2 border-black transition-all"
            onClick={handleCloseDialog} 
          >
            Cancel
          </Button>
          <Button className="text-white" onClick={handleDeleteAuction}>
            Yes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteAuctionDrawer;
