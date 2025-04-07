import LogoutButton from "@/components/ui/LogOutButton/LogOutButton";

const SideBarButtonsContainer = () => {
  return (
    <div className="flex flex-col justify-between mt-auto mb-4">
      <button className="text-left text-xl py-1 px-4 hover:underline">
        API
      </button>
      <button className="text-left text-xl py-1 px-4 hover:underline">
        Contact
      </button>
      <LogoutButton />
    </div>
  );
};

export default SideBarButtonsContainer;
