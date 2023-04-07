
import { Avatar } from "react-native-paper";
import GradientAvatar from "./GradientAvatar";


export default function UserAvatar({item, avatarSize}){

  const {author} = item;

  const initials = author.name
  .split(" ")
  .map((part) => part[0])
  .join("");

  const gradientColors = ["#FF6B92", "#4c669f"];

  return (
    <>
      {author.avatar_url ? (
        <Avatar.Image size={avatarSize} source={{ uri: author.avatar_url }} />
        ) : (
          <GradientAvatar
          size={avatarSize}
          gradientColors={gradientColors}
          initials={initials}
          />
          )}   
    </>
  )

}