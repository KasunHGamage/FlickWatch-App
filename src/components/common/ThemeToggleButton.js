import React from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../state/theme/ThemeContext";

export default function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();

  const iconName = theme === "dark" ? "sunny-outline" : "moon-outline";

  return (
    <TouchableOpacity
      onPress={toggleTheme}
      activeOpacity={0.8}
      style={{ paddingHorizontal: 12, paddingVertical: 6 }}
      accessibilityRole="button"
      accessibilityLabel="Toggle theme"
    >
      <Ionicons name={iconName} size={22} color={theme === "dark" ? "#fff" : "#111"} />
    </TouchableOpacity>
  );
}