import type { LoaderFunctionArgs } from "react-router";
import { getTransformedImage } from "../utils/image-service.server";
import { validateCategory } from "../utils/images";
import type { ImageFormat, ImageVariant } from "../config/images";
import { IMAGE_SIZES, IMAGE_FORMATS } from "../config/images";

export async function loader({ params, request }: LoaderFunctionArgs) {
  const { category, imageName } = params;
  const url = new URL(request.url);
  
  // Validate category
  if (!category) {
    return new Response("Missing category parameter", { status: 400 });
  }
  
  try {
    validateCategory(category);
  } catch (error) {
    return new Response(
      error instanceof Error ? error.message : "Invalid category",
      { status: 400 }
    );
  }
  
  // Validate image name
  if (!imageName) {
    return new Response("Missing image name parameter", { status: 400 });
  }
  
  // Parse query parameters
  const widthParam = url.searchParams.get("w");
  const formatParam = url.searchParams.get("f");
  const variantParam = url.searchParams.get("v");
  const forceParam = url.searchParams.get("force");
  const force = forceParam === "true" || forceParam === "1";
  
  // Validate width
  if (!widthParam) {
    return new Response("Missing width parameter (w)", { status: 400 });
  }
  
  const size = parseInt(widthParam, 10);
  if (isNaN(size) || size <= 0) {
    return new Response("Invalid width parameter (w)", { status: 400 });
  }
  
  // Validate size against category sizes
  const validSizes = IMAGE_SIZES[category];
  if (!validSizes.includes(size)) {
    return new Response(
      `Invalid size ${size}. Valid sizes for ${category}: ${validSizes.join(", ")}`,
      { status: 400 }
    );
  }
  
  // Validate format
  if (!formatParam) {
    return new Response("Missing format parameter (f)", { status: 400 });
  }
  
  const format = formatParam.toLowerCase() as ImageFormat;
  if (!IMAGE_FORMATS.includes(format)) {
    return new Response(
      `Invalid format ${format}. Valid formats: ${IMAGE_FORMATS.join(", ")}`,
      { status: 400 }
    );
  }
  
  // Parse variant (optional)
  let variant: ImageVariant = null;
  if (variantParam) {
    const variantLower = variantParam.toLowerCase();
    if (variantLower === "sq" || variantLower === "h") {
      variant = variantLower as ImageVariant;
    } else {
      return new Response(
        `Invalid variant ${variantParam}. Valid variants: sq, h`,
        { status: 400 }
      );
    }
  }
  
  try {
    // Get transformed image
    const buffer = await getTransformedImage({
      category,
      imageName,
      size,
      format,
      variant,
    }, undefined, force);
    
    // Determine content type
    const contentType =
      format === "jpeg"
        ? "image/jpeg"
        : format === "webp"
        ? "image/webp"
        : "image/avif";
    
    // Generate ETag for cache validation
    // Using a simple hash of the params (in production, you might want a proper hash)
    const etag = Buffer.from(
      `${category}-${imageName}-${size}-${format}-${variant || "none"}`
    ).toString("base64");
    
    // When force=true, bypass HTTP caching to ensure fresh images
    const cacheControl = force
      ? "no-cache, no-store, must-revalidate"
      : "public, max-age=31536000, immutable";
    
    return new Response(new Uint8Array(buffer), {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": cacheControl,
        ETag: `"${etag}"`,
      },
    });
  } catch (error) {
    // Handle specific error types
    if (error instanceof Error) {
      if (error.message.includes("not found")) {
        return new Response(error.message, { status: 404 });
      }
      if (error.message.includes("Invalid") || error.message.includes("not valid")) {
        return new Response(error.message, { status: 400 });
      }
    }
    
    // Log unexpected errors
    console.error("Error transforming image:", error);
    return new Response("Internal server error", { status: 500 });
  }
}

