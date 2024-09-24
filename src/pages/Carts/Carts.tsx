import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  import { useState, useEffect } from "react";
  import { AiFillDelete } from "react-icons/ai";
  import { VscOpenPreview } from "react-icons/vsc";
  import { Link } from "react-router-dom";
  import { CiCirclePlus } from "react-icons/ci";
import Scroller from "../shared/Scroller";
  
  const Carts = () => {
    const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem("cart") || "[]"));
  

  
  
    const handleRemoveAll = () => {
      setCartItems([]);
      localStorage.removeItem("cart");
    };
  
    const handleRemoveItem = (_id: string) => {
      const updatedCart = cartItems.filter((item: any) => item._id !== _id);
      setCartItems(updatedCart);
  
  
      if (updatedCart.length === 0) {
        localStorage.removeItem("cart");
      } else {
        localStorage.setItem("cart", JSON.stringify(updatedCart));
      }
    };
  
  
    const calculateTotal = () =>
      cartItems.reduce((total: number, item: any ) => total + item.price * item.quantity, 0);
  
  
    // console.log(calculateTotal());
  
    useEffect(() => {
      if (cartItems.length > 0) {
        localStorage.setItem("cart", JSON.stringify(cartItems));
  
        const totalPrice = calculateTotal().toFixed(2);
        localStorage.setItem("TotalPrice", totalPrice);
      } else {
        localStorage.removeItem("cart");
        localStorage.removeItem("totalPrice");
      }
    }, [cartItems]);
  
    useEffect(() => {
      const handleBeforeUnload = (e: BeforeUnloadEvent) => {
        if (cartItems.length > 0) {
          e.preventDefault();
          e.returnValue = ""; 
        }
      };
    
      window.addEventListener("beforeunload", handleBeforeUnload);
    
      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
      };
    }, [cartItems]);
    
    
    
  
    return (
      <div className="container mx-auto p-4 md:p-8">
         <div className="relative w-full h-[50vh] md:h-[72vh] bg-no-repeat bg-center bg-cover"
                style={{
                    backgroundImage: `url("https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTd8fGd5bSUyMGVxdWlwbWVudCUyMHN0b3JlfGVufDB8fDB8fHww")`,
                }}>
                <div className="absolute flex flex-col items-center justify-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-300 px-4 py-4 opacity-80 rounded">
                    <h2 className="text-2xl md:text-5xl font-bold md:mb-2 text-orange-600">
                        FlexFit Cart
                    </h2>
                 
                </div>
            </div>
  
        <div className="flex justify-center md:justify-end mt-10">
          <button
            onClick={handleRemoveAll}
            className="px-4 py-2 bg-red-500 text-white rounded-sm"
          >
            Clear All Items
          </button>
        </div>
        <div>
          {cartItems.length === 0 ? (
            <div className="flex flex-col justify-center items-center mt-10">
              <h1 className="text-3xl font-semibold text-center mb-6 text-orange-600">
                Your Cart is Empty.
              </h1>
              <Link
                to="/allproducts"
                className="text-2xl font-semibold text-center mb-6 underline underline-offset-2"
              >
                Add Some Products
              </Link>
            </div>
          ) : (
            <div>
              <div className="overflow-x-auto mt-10 text-orange-600">
                <Table className="text-center">
                  <TableHeader>
                    <TableRow className="bg-neutral-900 hover:bg-neutral-950">
                      <TableHead className="text-left">Products</TableHead>
                      <TableHead className="text-left">Name</TableHead>
                      <TableHead className="text-left">Category</TableHead>
  
                      <TableHead className="text-left">Details</TableHead>
                      <TableHead className="text-left">Quantity</TableHead>
                      <TableHead className="text-left">Add More</TableHead>
  
                      <TableHead className="text-left">Remove</TableHead>
  
                      <TableHead className="text-right">Price</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cartItems.map((item : any) => (
                      <TableRow key={item._id} className="border-b  hover:bg-neutral-900">
                        <TableCell className="flex items-center space-x-4">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-16 h-16 object-cover"
                          />
                          
                        </TableCell>
                        <TableCell className="text-left">{item.name}</TableCell>
                        <TableCell className="text-left">{item.category}</TableCell>
                        <TableCell className="text-left">
                          <Link to={`/products/${item._id}`}>
                            <VscOpenPreview
                              className="text-xl"
                              title="View Details"
                            />
                          </Link>
                        </TableCell>
                        <TableCell className="text-left">{item.quantity}</TableCell>
                        <TableCell className="text-center">
                          <Link to={`/products/${item._id}`}>
                            <CiCirclePlus
                              className="text-xl font-bold"
                              title="Add More Quantity"
                            />
                          </Link>
                        </TableCell>
                        <TableCell className="">
                          <AiFillDelete
                            className="text-red-600 cursor-pointer text-lg"
                            onClick={() => handleRemoveItem(item._id)}
                          />
                        </TableCell>
  
                        <TableCell className="text-right">${item.price}</TableCell>
                        <TableCell className="text-right">
                          ${item.price * item.quantity}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
  
              <div className="mt-8 flex flex-col md:flex-row justify-between items-center">
                <div className="text-lg font-semibold text-white">
                 <span className="text-orange-600"> Total:</span> {calculateTotal().toFixed(3)} $
                </div>
                <Link to="/payment">
                  <button className="mt-4 md:mt-0 bg-orange-600 text-white px-6 py-2 rounded shadow hover:bg-orange-700">
                    Proceed to Checkout
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
        <Scroller />
      </div>
    );
  };
  
  export default Carts;