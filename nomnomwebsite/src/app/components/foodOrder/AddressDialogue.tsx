import { Button } from "@/components/ui/button";

export const AddressDialogue = ({
  setIsOpen,
}: {
  setIsOpen: (open: boolean) => void;
}) => {
  const handleAddressSubmit = () => {
    return;
  };

  return (
    <div className="w-[432px] flex flex-col gap-6">
      <p className="text-l">Delivery address</p>
      <div className="w-[432px] h-[112px] flex flex-col px-3 py-2 border-1 rounded-md border-[#E4E4E7]">
        <p className="text-[14px] text-[#71717A]">
          Please provide specific address details such as building <br />
          number, entrance, and apartment number
        </p>
        <input
          type="text"
          className="w-full h-10 text-[14px]"
          //   value={address}
        />
      </div>
      <div className="flex w-full justify-end pt-6">
        <div className="flex gap-4">
          <Button
            className="bg-gray-300 text-black"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-black text-white"
            onClick={handleAddressSubmit}
          >
            Deliver here
          </Button>
        </div>
      </div>
    </div>
  );
};
