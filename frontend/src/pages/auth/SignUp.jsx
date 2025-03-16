import { useContext, useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/inputs/Input";
import { validateEmail } from "../../utils/helper";
import ProfilePhotoSelector from "../../components/inputs/ProfilePhotoSelector";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/userContext";

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // For button state

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!formData.fullName) {
      setError("Please enter your full name");
      return;
    }
    if (!validateEmail(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }
    if (!formData.password || formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setError("");
    setLoading(true);

    try {
      let profileImageUrl = "";

      if (image) {
        const uniqueFilename = `profile_${Date.now()}`;

        // Upload Image to Cloudinary
        const formDataToUpload = new FormData();
        formDataToUpload.append("file", image);
        formDataToUpload.append("upload_preset", "mern-exp-tracker");
        formDataToUpload.append("folder", "expense-tracker-img");
        formDataToUpload.append("public_id", uniqueFilename);
        const cloudName = import.meta.env.VITE_APP_CLOUDINARY_CLOUDNAME;
        const cloudinaryResponse = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          {
            method: "POST",
            body: formDataToUpload,
          }
        );

        const cloudinaryData = await cloudinaryResponse.json();
        if (cloudinaryData.secure_url) {
          profileImageUrl = cloudinaryData.secure_url;
        } else {
          throw new Error("Image upload failed");
        }
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        profileImageUrl: profileImageUrl,
      });

      console.log(response.data);

      const { token, user } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="lg:w-[100%] h-auto md:h-full flex flex-col justify-center">
        <h3 className="text-2xl font-semibold text-black">Create an Account</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Please enter your details to sign up
        </p>

        <form onSubmit={handleSignUp}>
          <ProfilePhotoSelector image={image} setImage={setImage} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-2 lg:col-span-1">
              <Input
                type="text"
                value={formData.fullName}
                label="Full Name"
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                placeholder="Enter your full name"
              />
            </div>

            <div className="col-span-2 lg:col-span-1">
              <Input
                type="text"
                value={formData.email}
                label="Email Address"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="Enter your email address"
              />
            </div>

            <div className="col-span-2">
              <Input
                type="password"
                label="Password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                placeholder="Enter your password"
              />
            </div>

            {error && (
              <p className="text-red-500 text-xs pb-2.5 col-span-2">{error}</p>
            )}

            <button
              type="submit"
              className={`btn-primary col-span-2 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Processing..." : "SIGN UP"}
            </button>
            <p className="col-span-2">
              Already have an account?{" "}
              <Link className="font-medium text-primary underline" to="/login">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
