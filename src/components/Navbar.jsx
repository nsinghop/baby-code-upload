
import React, { useEffect, useState } from "react";
import { auth,googleProvider } from "../services/Firebase";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      alert("Login Failed: " + error.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <div className="navbar flex px-10 py-5 justify-between bg-blue-700 items-center">
      <h2 className="text-amber-50">Student Dashboard</h2>
      {user ? (
        <div className="flex items-center gap-2">
          <img className="h-10" src={user.photoURL} alt="" />
          
          <span className="text-white font-medium">{user.displayName}</span>

          <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded transition">
            Logout
          </button>
        </div>
      ) : (
        <button onClick={handleGoogleLogin} className="text-black px-4 flex justify-center items-center gap-3 bg-amber-50 py-1.5 rounded transition">
          <img src="/google-icon-logo-svgrepo-com.svg" className="h-5" alt="" />
          Login with Google
        </button>
      )}
    </div>
  );
};

export default Navbar;