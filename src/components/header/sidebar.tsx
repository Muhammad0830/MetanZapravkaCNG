"use client";
import {
  LayoutDashboard,
  ListChecks,
  CreditCard,
  Clock4,
  BarChart3,
  Settings,
  Sun,
  Moon,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import "@ant-design/v5-patch-for-react-19";
import { TbGasStation } from "react-icons/tb";
import { cn } from "@/lib/utils";
import NavBarItem from "./NavBarItem";
import { motion, AnimatePresence } from "framer-motion";
import NextLink from "next/link";
import ProfileButton from "./ProfileButton";
import LangDropDown from "./LangDropDown";

const navLinksData = [
  {
    icon: <LayoutDashboard className="w-5 h-5" />,
    label: "Bosh sahifa", // Home / Dashboard
    url: "/dashboard",
  },
  {
    icon: <ListChecks className="w-5 h-5" />,
    label: "Operatsiyalar", // Operations / Tasks
    url: "/operations",
  },
  {
    icon: <CreditCard className="w-5 h-5" />,
    label: `To'lovlar`, // Payments
    url: "/payments",
  },
  {
    icon: <Clock4 className="w-5 h-5" />,
    label: "Ish smenasi", // Work shifts / Time
    url: "/workshifts",
  },
  {
    icon: <BarChart3 className="w-5 h-5" />,
    label: "Hisobotlar", // Reports / Analytics
    url: "/reports",
  },
  {
    icon: <Settings className="w-5 h-5" />,
    label: "Sozlamalar", // Settings
    url: "/settings",
  },
];

const SideBar = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const { theme: currentTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(currentTheme === "dark" ? "light" : "dark");
  };

  if (!mounted) return null;

  return (
    <div className="h-screen flex">
      {/* SideBar */}
      <motion.div
        suppressHydrationWarning
        className="w-60 flex flex-col border-r border-r-black/50 dark:border-r-white bg-background-secondary overflow-hidden"
        initial={{ width: 240 }}
        animate={collapsed ? { width: 65 } : { width: 240 }}
      >
        {/* Logo */}
        <NextLink
          href={"/"}
          className="w-full h-16 text-black dark:text-white px-4 py-2 flex items-center border-b border-b-black dark:border-b-white"
        >
          <AnimatePresence>
            <motion.div
              initial={{ marginRight: 8 }}
              animate={collapsed ? { marginRight: 0 } : { marginRight: 8 }}
              layout
              className="ml-[1px]"
            >
              <TbGasStation
                className="w-8 h-8"
                color={currentTheme === "dark" ? "white" : "black"}
              />
            </motion.div>
          </AnimatePresence>
          <AnimatePresence mode="wait" initial={false}>
            {!collapsed && (
              <motion.div
                layout
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 40 }}
                transition={{ duration: 0.2 }}
                className="whitespace-nowrap lg:text-2xl text-lg font-bold"
              >
                MyGaz
              </motion.div>
            )}
          </AnimatePresence>
        </NextLink>

        <div className="flex-1 flex justify-between flex-col">
          {/* Nav links */}
          <div className="flex flex-col items-center gap-1 p-2">
            {navLinksData?.map((item, index) => (
              <NavBarItem collapsed={collapsed} item={item} key={index} />
            ))}
          </div>

          {/* Profile */}
          <ProfileButton collapsed={collapsed} />
        </div>
      </motion.div>

      <div className="flex-1 h-screen overflow-hidden">
        {/* Header */}
        <div className="bg-background-secondary !px-4 h-16 flex items-center border-b border-bottom-[#d1d5db] justify-between text-black dark:text-white ">
          {/* SideBar Controller */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="flex w-7 h-7 border border-black dark:border-white rounded-sm cursor-pointer hover:border-primary dark:hover:border-primary group transition-colors duration-150"
          >
            <div className="translate-x-2 h-full w-[1px] bg-black dark:bg-white group-hover:bg-primary dark:group-hover:bg-primary transition-colors duration-150" />
          </button>

          <div className="flex items-center gap-2">
            {/* Theme toggle button */}
            {mounted && (
              <button
                type="submit"
                onClick={toggleTheme}
                className={`relative cursor-pointer flex justify-center items-center overflow-hidden p-[8px] rounded-lg transition-all ${
                  currentTheme === "dark"
                    ? "hover:bg-[#172554]"
                    : "hover:bg-[#e5e7eb]"
                }`}
                style={{
                  border: `1px solid ${
                    currentTheme === "dark" ? "#4b5563" : "#d1d5db"
                  }`,
                }}
              >
                <motion.div
                  initial={
                    currentTheme === "light"
                      ? {
                          rotate: 90,
                          y: "-150%",
                        }
                      : { rotate: 0, y: 0 }
                  }
                  animate={
                    currentTheme === "dark"
                      ? { rotate: 0, y: 0 }
                      : { rotate: 90, y: "-150%" }
                  }
                >
                  <Sun className="w-5 h-5" color="orange" />
                </motion.div>
                <motion.div
                  className="absolute"
                  initial={
                    currentTheme === "dark"
                      ? { rotate: 90, y: "150%" }
                      : { rotate: 0, y: 0 }
                  }
                  animate={
                    currentTheme === "light"
                      ? { rotate: 0, y: 0 }
                      : { rotate: 90, y: "150%" }
                  }
                >
                  <Moon className="w-5 h-5 text-black" />
                </motion.div>
              </button>
            )}

            {/* lang change button */}
            <LangDropDown
              currentTheme={currentTheme}
              langDropdownOpen={langDropdownOpen}
              setLangDropdownOpen={setLangDropdownOpen}
            />
          </div>
        </div>

        <div
          className={cn(
            "lg:p-6 p-4 h-[calc(100svh-64px)] overflow-y-scroll",
            currentTheme === "dark" ? "bg-[#000000]" : "bg-[#ffffff]"
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
