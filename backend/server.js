import app from "./app.js";
import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(_dirname,"/frontend/dist")));
	app.use("*",(_,res) => {
        res.sendFile(path.resolve(_dirname, "frontend","dist","index.html"));
    });
}

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});