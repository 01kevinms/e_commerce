import { useState, useEffect } from "react";

export function useWishlist<t extends {id:string}>() {

  // Carregar do localStorage sem sobrescrever
   const [wishlist, setWishlist] = useState<t[]>(() => {
    try{

      const saved = localStorage.getItem("wishlist");
      return saved ? JSON.parse(saved) : [];
    } catch{
      return [];
    }
  });

  // Atualizar localStorage sempre que a lista mudar
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  function toggle(product:t) {
    setWishlist((prev) => {
      const exists = prev.some((item) => item.id === product.id);

      if (exists) {
        return prev.filter((item) => item.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  }

  function remove(id:string) {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  }

  return { wishlist, toggle, remove };
}