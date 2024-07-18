import {
  User,
  CreditCard,
  Settings,
  Keyboard,
  Users,
  UserPlus,
  Mail,
  MessageSquare,
  PlusCircle,
  Plus,
  Github,
  LifeBuoy,
  Cloud,
  LogOut,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

type MenuItem = {
  label: string;
  subMenu: {
    icon?: JSX.Element;
    title: string;
    onClick: () => void;
  }[];
};

export default function CustomDropdown({
  triggerJSX,
  items,
  itemsClassName,
  width = "w-56",
}: {
  triggerJSX: JSX.Element;
  items: MenuItem[];
  itemsClassName?: string;
  width?: string;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{triggerJSX}</DropdownMenuTrigger>
      <DropdownMenuContent className={width}>
        {items.map((item, index) => (
          <DropdownMenuGroup key={index}>
            <DropdownMenuLabel>{item.label}</DropdownMenuLabel>
            <div className={itemsClassName}>
              {item.subMenu.map((subItem, subIndex) => (
                <DropdownMenuItem key={subIndex} onClick={subItem.onClick}>
                  {subItem.icon && <span className="mr-2">{subItem.icon}</span>}
                  <p className="text-sm">{subItem.title}</p>
                </DropdownMenuItem>
              ))}
            </div>
          </DropdownMenuGroup>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
