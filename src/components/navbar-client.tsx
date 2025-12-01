"use client";
import { AnimeNavBar } from "@/components/ui/anime-navbar";
import { Home, FolderKanban, User, Mail, GraduationCap } from "lucide-react";

export default function NavbarClient() {
  return (
    <AnimeNavBar
      items={[
        { name: "Home", url: "/", icon: Home },
        { name: "About", url: "#about", icon: User },
        { name: "Journey", url: "#education", icon: GraduationCap },
        { name: "Projects", url: "#projects", icon: FolderKanban },
        { name: "Contact", url: "#contact", icon: Mail },
      ]}
    />
  );
}
