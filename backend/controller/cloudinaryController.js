const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const { cloudinaryServices } = require("../services/cloudinary.service");
const { secret } = require("../config/secret");

const uploadDir = path.join(__dirname, "..", "public", "uploads");

const hasRealValue = (value) => {
  if (!value) return false;

  const normalized = value.trim().toLowerCase();
  return (
    normalized &&
    !normalized.includes("your ") &&
    !normalized.includes("you cloud")
  );
};

const hasCloudinaryConfig = () =>
  [
    secret.cloudinary_name,
    secret.cloudinary_api_key,
    secret.cloudinary_api_secret,
    secret.cloudinary_upload_preset,
  ].every(hasRealValue);

const safeFilename = (originalName = "jewellery-image.jpg") => {
  const parsed = path.parse(originalName);
  const ext = parsed.ext || ".jpg";
  const base = parsed.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60) || "jewellery-image";

  return `${Date.now()}-${crypto.randomBytes(4).toString("hex")}-${base}${ext}`;
};

const getUploadBaseUrl = (req) => `${req.protocol}://${req.get("host")}`;

const saveLocalImage = async (file, req) => {
  await fs.promises.mkdir(uploadDir, { recursive: true });

  const filename = safeFilename(file.originalname);
  const filePath = path.join(uploadDir, filename);

  await fs.promises.writeFile(filePath, file.buffer);

  return {
    url: `${getUploadBaseUrl(req)}/uploads/${filename}`,
    id: `local/${filename}`,
  };
};

const uploadImage = async (file, req) => {
  if (!file?.buffer) {
    const error = new Error("Image file is required");
    error.statusCode = 400;
    throw error;
  }

  if (!hasCloudinaryConfig()) {
    return saveLocalImage(file, req);
  }

  try {
    const result = await cloudinaryServices.cloudinaryImageUpload(file.buffer);
    return {
      url: result.secure_url,
      id: result.public_id,
    };
  } catch (error) {
    console.warn("Cloudinary upload failed, saving image locally instead.");
    return saveLocalImage(file, req);
  }
};

// add image
const saveImageCloudinary = async (req, res, next) => {
  try {
    const result = await uploadImage(req.file, req);
    res.status(200).json({
      success: true,
      message: "image uploaded successfully",
      data: result,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

// add image
const addMultipleImageCloudinary = async (req, res, next) => {
  try {
    const files = req.files || [];
    const uploadResults = await Promise.all(
      files.map((file) => uploadImage(file, req))
    );

    res.status(200).json({
      success: true,
      message: "image uploaded successfully",
      data: uploadResults,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

// cloudinary ImageDelete
const cloudinaryDeleteController = async (req, res) => {
  try {
    const { folder_name, id } = req.query;

    if (folder_name === "local") {
      const filename = path.basename(id);
      const filePath = path.join(uploadDir, filename);

      if (fs.existsSync(filePath)) {
        await fs.promises.unlink(filePath);
      }

      return res.status(200).json({
        success: true,
        message: "delete image successfully",
        data: { result: "ok" },
      });
    }

    const public_id = `${folder_name}/${id}`;
    const result = await cloudinaryServices.cloudinaryImageDelete(public_id);
    res.status(200).json({
      success: true,
      message: "delete image successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Failed to delete image",
    });
  }
};

exports.cloudinaryController = {
  cloudinaryDeleteController,
  saveImageCloudinary,
  addMultipleImageCloudinary,
};
