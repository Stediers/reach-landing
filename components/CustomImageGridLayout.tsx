import { DialogClose } from "./ui/dialog";
import { CustomDialog } from "./DialogPopup";
import ImageComponent from "./ImageComponent";
import { Button } from "./ui/button";
import { SheetClose } from "./ui/sheet";
import { Images } from "lucide-react";

export default function CustomImageGridLayout({
  imageUrls,
}: {
  imageUrls: string[];
}) {
  const firstImage = imageUrls[0];
  const nextThreeImages = imageUrls.slice(1, 4);
  const remainingImages = imageUrls.slice(5);
  return (
    <div className="grid grid-cols-2 grid-rows-1 w-full h-[60vh] gap-5 rounded-2xl overflow-hidden">
      <ImageComponent
        src={firstImage}
        className="w-full h-full"
        alt="firstImage"
      />

      <div className="grid grid-cols-2 grid-rows-2 gap-5 h-full">
        {nextThreeImages.map((imageUrl, index) => (
          <ImageComponent
            key={index}
            src={imageUrl}
            className="w-full h-full"
            alt={`image-${index}`}
          />
        ))}
        {remainingImages.length > 1 ? (
          <CustomDialog
            title="More Images"
            description="View more images"
            triggerJSX={
              <div className="w-full h-full flex flex-col space-y-5 items-center justify-center bg-gray-300 bg-opacity-50">
                <Images size={48} />
                <p className="text-lg font-medium">+{remainingImages.length}</p>
              </div>
            }
            footerJSX={
              <DialogClose asChild>
                <Button className="w-full">Okay</Button>
              </DialogClose>
            }
            maxWidth="max-w-5xl"
          >
            <div className="grid grid-cols-2 gap-5 w-full">
              {remainingImages.map((imageUrl, index) => (
                <ImageComponent
                  key={index}
                  src={imageUrl}
                  className="w-full h-[50vh]"
                  alt={`image-${index}`}
                  popup={false}
                />
              ))}
            </div>
          </CustomDialog>
        ) : (
          <ImageComponent
            src={remainingImages[0]}
            className="w-full h-full"
            alt="remainingImage"
          />
        )}
      </div>
    </div>
  );
}
