import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility function to merge Tailwind and other class names
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(...inputs));
}

// Helper function to get cookie value by name
export const getCookie = (name: string): string | undefined => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(";").shift();
  }
  return undefined;
};

 export const deleteCookie = (name : string) => {
  document.cookie = `${name}=; Max-Age=0; path=/;`;
};
