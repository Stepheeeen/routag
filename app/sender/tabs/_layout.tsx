import React from "react";
import { Tabs, usePathname, router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import Octicons from "@expo/vector-icons/Octicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

interface Link {
  path: string;
  label: string;
  icon: JSX.Element;
  activeIcon: JSX.Element;
}

const LINKS: Link[] = [
  {
    path: "/sender/tabs/Home",
    label: "Home",
    icon: <Feather name="home" size={27} color="#C0BABA" />,
    activeIcon: <Feather name="home" size={27} color="#273B4A" />,
  },
  {
    path: "/sender/tabs/Deliveries",
    label: "Deliveries",
    icon: <AntDesign name="clockcircle" size={27} color="#C0BABA" />,
    activeIcon: <AntDesign name="clockcircle" size={27} color="#273B4A" />,
  },
  {
    path: "/sender/tabs/Wallet",
    label: "Wallet",
    icon: <FontAwesome5 name="wallet" size={27} color="#C0BABA" /> ,
    activeIcon: <FontAwesome5 name="wallet" size={27} color="#273B4A" />,
  },
  {
    path: "/sender/tabs/Account",
    label: "Account",
    icon: <MaterialIcons name="person" size={27} color="#C0BABA" />,
    activeIcon: <MaterialIcons name="person" size={27} color="#273B4A" />,
  },
];

const Layout = () => {
  const pathname = usePathname();

  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: { display: "none" },
        }}
      >
        {LINKS.map((link) => (
          <Tabs.Screen key={link.path} name={link.label} />
        ))}
      </Tabs>

      <View
        style={{
          backgroundColor: "#F8F8F8",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          height: 90,
          borderTopColor: "#E5E5E5",
          borderTopWidth: 1,
          paddingVertical: 10,
        }}
      >
        {LINKS.map((link, index) => {
          const isActive = pathname === link.path;

          return (
            <TouchableOpacity
              key={index}
              onPress={() => router.push(link.path as any)}
              style={{ alignItems: "center", gap: 4 }}
            >
              
              {isActive ? link.activeIcon : link.icon}
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: isActive ? "600" : "400",
                  color: isActive ? "black" : "#C0BCBC",
                  marginTop: 4,
                }}
              >
                {link.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </>
  );
};

export default Layout;
