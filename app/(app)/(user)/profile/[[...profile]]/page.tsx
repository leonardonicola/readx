import { UserProfile } from "@clerk/nextjs";

const UserProfilePage = () => (
  <UserProfile
    appearance={{
      elements: {
        rootBox: "w-full",
        cardBox: "w-full",
        navbarButtons: "gap-4"
      }
    }}
    path="/profile"
  />
);

export default UserProfilePage;
