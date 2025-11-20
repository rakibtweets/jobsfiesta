"use client";
import { Camera } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";

import { Button } from "../ui/button";

const UploadImagButton = () => {
  const [resource, setResource] = useState();
  console.log("🚀 ~ UploadImagButton ~ resource:", resource);
  return (
    <CldUploadWidget
      uploadPreset="jobfiesta_rakibtweets"
      signatureEndpoint={`/api/signed-image`}
      options={{
        folder: "candidate",
        sources: ["local", "url"],
        maxFileSize: 2 * 1024 * 1024,
        multiple: false,
      }}
      onSuccess={(result, { widget }) => {
        if (result.event !== "success") return;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-expect-error
        setResource(result); // { public_id, secure_url, etc }
        // console.log(result.info);
        // console.log({
        //   url: result?.info?.secure_url || "",
        //   public_id: result?.info?.public_id || "",
        // });
      }}
    >
      {({ open }) => {
        function handleOnClick() {
          setResource(undefined);
          open();
        }
        return (
          <Button onClick={() => handleOnClick()} className="md:flex md:w-full lg:w-auto">
            <Camera size={24} />
            Upload Photo
          </Button>
        );
      }}
    </CldUploadWidget>
  );
};
export default UploadImagButton;
