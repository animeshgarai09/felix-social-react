import Resizer from "react-image-file-resizer";

const useImageResize = ({
    maxWidth = 600, // Is the maxWidth of the resized new image.
    maxHeight = 600, // Is the maxHeight of the resized new image.
    compressFormat = "JPEG", // Is the compressFormat of the resized new image.
    quality = 80, // Is the quality of the resized new image.
    rotation = 0, // Is the degree of clockwise rotation to apply to uploaded image.
    outputType = "base64", // Is the output type of the resized new image.
}) => {
    return (file) =>
        new Promise((resolve) => {
            Resizer.imageFileResizer(
                file,
                maxWidth,
                maxHeight,
                compressFormat,
                quality,
                rotation,
                (uri) => {
                    resolve(uri);
                },
                outputType
            );
        });
}

export default useImageResize