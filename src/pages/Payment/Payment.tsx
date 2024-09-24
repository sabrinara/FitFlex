
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAddOrderMutation } from "@/redux/api/api";
import { TOrders, TOrderProduct } from "@/types";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_upload_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Payment = () => {
    const [addOrder] = useAddOrderMutation();
    const cartItems: TOrderProduct[] = JSON.parse(localStorage.getItem("cart") || "[]");
    const allPrice = localStorage.getItem("TotalPrice") || "0";

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        address: "",
        company: "",
        postCode: "",
        city: "",
        country: "",
        imageFile: null as File | null,
        StripePayment: false,
        CashOnDelivery: true,
    });

    const navigate = useNavigate();
    const [uploading, setUploading] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            imageFile: e.target.files ? e.target.files[0] : null,
        });
    };

    const uploadImageToImgbb = async (file: File) => {
        const imageFormData = new FormData();
        imageFormData.append("image", file);

        try {
            const response = await fetch(image_upload_api, {
                method: "POST",
                body: imageFormData,
            });
            const data = await response.json();
            if (data.success) {
                return data.data.url;
            }
            throw new Error("Image upload failed");
        } catch (error) {
            console.error("Error uploading image:", error);
            toast.error("Failed to upload image");
            return null;
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setUploading(true);

        let userImage = "";
        if (formData.imageFile) {
            userImage = await uploadImageToImgbb(formData.imageFile);
        }

        if (!userImage) {
            setUploading(false);
            return;
        }

      
        const productArray = cartItems.map((item: TOrderProduct) => ({
            productId: item.productId,
            name: item.name,
            image: item.image,
            quantity: item.quantity,
            price: item.price,
            description: item.description,
        }));

        const orderData: TOrders = {
            _id: "", 
            name: formData.name,
            email: formData.email,
            phoneNumber: formData.phoneNumber,
            address: formData.address,
            userImage: userImage,
            products: productArray,
            createdAt: new Date().toISOString(),
        };

        try {
            const response = await addOrder(orderData).unwrap();
            console.log("Order placed successfully:", response);
            toast.success("Order placed successfully!");
            localStorage.removeItem("cart");
            navigate("/");
        } catch (error) {
            console.error("Failed to place order:", error);
            toast.error("Failed to place order");
        }
        finally {
            setUploading(false);
        }
    };

    return (
        <div className="relative w-full h-[110vh] bg-no-repeat bg-center bg-cover text-orange-600"
        style={{
            backgroundImage: `url("https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTJ8fGd5bXxlbnwwfHwwfHx8MA%3D%3D")`,
          }}
        >
         
            <div className="absolute flex flex-col items-center justify-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Card className="w-[350px] md:w-[500px] bg-transparent md:backdrop-blur-md my-10">
                    <CardHeader>
                        <CardTitle className="text-orange-600 text-center text-3xl">Payment</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-1.5 ">
                                    <Label htmlFor="name" className="text-orange-600">Name</Label>
                                    <Input
                                        type="text"
                                        id="name"
                                        placeholder="Your name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="flex flex-col space-y-1.5 ">
                                    <Label htmlFor="email" className="text-orange-600">Email</Label>
                                    <Input
                                        type="email"
                                        id="email"
                                        placeholder="Your email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="flex flex-col space-y-1.5 ">
                                    <Label htmlFor="phoneNumber" className="text-orange-600">Phone Number</Label>
                                    <Input
                                        type="number"
                                        id="phoneNumber"
                                        placeholder="Your phone number"
                                        value={formData.phoneNumber}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="flex flex-col space-y-1.5 ">
                                    <Label htmlFor="address" className="text-orange-600">Address</Label>
                                    <Input
                                        type="text"
                                        id="address"
                                        placeholder="Your address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className="flex flex-col space-y-1.5 ">
                                    <Label htmlFor="TotalPrice" className="text-orange-600 mb-2">Total Price</Label>
                                    <Input
                                        type="number"
                                        id="TotalPrice"
                                        defaultValue={allPrice}
                                        readOnly
                                        required
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col space-y-1.5 ">
                                <Label htmlFor="userImage" className="text-orange-600 my-2">Profile Image</Label>
                                <Input type="file" id="userImage" onChange={handleFileChange} required />
                            </div>
                            <CardFooter className="flex justify-between items-center mt-6 -mr-6 -ml-6">
                                <Button variant="outline" type="button">Cancel</Button>
                                <Button type="submit" className="bg-orange-600" disabled={uploading}>
                                    {uploading ? "Saving..." : "Save"}
                                </Button>
                            </CardFooter>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Payment;
