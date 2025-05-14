"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "sonner";

export type UserType = {
  _id: string;
  email: string;
  profileEmoji: string;
  phoneNumber: string;
  address: string;
  role: "Admin" | "User";
};

export type User = {
  user: UserType;
};

type AuthContextType = {
  user?: UserType;
  signIn: ({ email, password }: SignInType) => Promise<void>;
  signUp: ({
    profileEmoji,
    email,
    password,
    phoneNumber,
    address,
  }: SignUpType) => Promise<void>;
  signOut: () => void;
};

type DataType = {
  user: UserType;
  token: string;
};

type SignInType = {
  email: string;
  password: string;
};

export type SignUpType = {
  profileEmoji: string;
  email: string;
  password: string;
  phoneNumber: string;
  address: string;
};

const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<UserType>();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const signIn = async ({ email, password }: SignInType) => {
    try {
      const { data }: { data: DataType } = await axios.post(
        "http://localhost:3001/auth/signIn",
        { email, password }
      );

      localStorage.setItem("token", data.token);
      setUser(data.user);

      if (data.user.role === "User") {
        router.push("/");
      } else if (data.user.role === "Admin") {
        router.push("/admin/orders");
      }
    } catch (error) {
      toast.error("Failed to sign in!");
    }
  };

  const signUp = async ({
    profileEmoji,
    email,
    password,
    phoneNumber,
    address,
  }: SignUpType) => {
    try {
      const { data }: { data: DataType } = await axios.post(
        "http://localhost:3001/auth/signUp",
        { profileEmoji, email, password, phoneNumber, address }
      );

      localStorage.setItem("token", data.token);
      setUser(data.user);
    } catch (error) {
      toast.error("Failed to sign in!");
    }
  };

  const signOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("cart");
    setUser(undefined);
    router.push("/");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const getUser = async () => {
      setLoading(true);

      try {
        const { data } = await axios.get("http://localhost:3001/auth/me", {
          headers: { Authorization: `${token}` },
        });

        setUser(data);
      } catch (error) {
        localStorage.removeItem("token");
        setUser(undefined);
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, signUp }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
