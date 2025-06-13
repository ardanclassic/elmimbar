"use client";
import * as React from "react";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const positions: ToasterProps["position"][] = ["top-center"];

export function CustomToaster() {
  return (
    <Sonner
      richColors
      closeButton
      visibleToasts={3}
      duration={4000}
      position={positions[0]}
      toastOptions={{
        classNames: {
          toast: "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg",
          title: "text-gray-900 dark:text-white",
          description: "text-gray-500 dark:text-gray-400",
          actionButton: "bg-blue-600 hover:bg-blue-700 text-white",
          cancelButton: "bg-gray-200 dark:bg-gray-700",
        },
      }}
    />
  );
}
