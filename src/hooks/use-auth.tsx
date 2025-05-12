import * as React from "react";
// import { supabase } from "@/lib/supabase";
import type { User } from "@/types";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
};

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    // Check active session
    const checkSession = async () => {
      try {
        // const { data: { session }, error } = await supabase.auth.getSession();
        
        // if (error) {
        //   console.error("Error checking session:", error.message);
        //   return;
        // }
        
        // if (session?.user) {
        //   setUser({
        //     id: session.user.id,
        //     email: session.user.email,
        //   });
        // } else {
        //   setUser(null);
        // }
      } catch (err) {
        console.error("Unknown error checking session:", err);
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    // Set up auth subscription
    // const { data: { subscription } } = supabase.auth.onAuthStateChange(
    //   async (event, session) => {
    //     if (session?.user) {
    //       setUser({
    //         id: session.user.id,
    //         email: session.user.email,
    //       });
    //     } else {
    //       setUser(null);
    //     }
    //     setLoading(false);
    //   }
    // );

    // return () => {
    //   subscription.unsubscribe();
    // };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // const { error } = await supabase.auth.signInWithPassword({
      //   email,
      //   password,
      // });
      
      // if (error) {
      //   setError(error.message);
      // }
    } catch (err) {
      setError("An unexpected error occurred");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // const { error } = await supabase.auth.signUp({
      //   email,
      //   password,
      // });
      
      // if (error) {
      //   setError(error.message);
      // }
    } catch (err) {
      setError("An unexpected error occurred");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      setError(null);
      // const { error } = await supabase.auth.signOut();
      // if (error) {
      //   setError(error.message);
      // }
    } catch (err) {
      setError("An unexpected error occurred");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // const { error } = await supabase.auth.resetPasswordForEmail(email, {
      //   redirectTo: `${window.location.origin}/reset-password`,
      // });
      
      // if (error) {
      //   setError(error.message);
      // }
    } catch (err) {
      setError("An unexpected error occurred");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    error,
    signIn,
    signUp,
    signOut,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}