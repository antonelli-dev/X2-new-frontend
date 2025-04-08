import LogoutButton from "@/components/ui/LogOutButton/LogOutButton";

const SideBarButtonsContainer = () => {
  return (
    <div className="flex flex-col justify-between mt-auto mb-4">
      <button className="text-left text-xl py-1 px-4 cursor-pointer hover:font-bold">
        API
      </button>
      <button className="text-left text-xl py-1 px-4 cursor-pointer hover:font-bold">
        Contact
      </button>
      <LogoutButton />
    </div>
  );
};

export default SideBarButtonsContainer;
