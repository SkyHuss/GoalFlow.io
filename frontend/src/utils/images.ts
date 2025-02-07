export function resizeAndCropImage(file: File, targetWidth: number, targetHeight: number) {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (!event.target?.result) {
          return reject("Error during file loading");
        }
        const img = new Image();
        img.src = event.target.result as string;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          if (!ctx) return reject("Error: can't resolve canvas context");
  
          const aspectRatio = img.width / img.height;
          let cropWidth = img.width;
          let cropHeight = img.height;
          if (aspectRatio > 1) {
            cropWidth = img.height * (targetWidth / targetHeight);
          } else {
            cropHeight = img.width * (targetHeight / targetWidth);
          }
  
          const cropX = (img.width - cropWidth) / 2;
          const cropY = (img.height - cropHeight) / 2;
  
          canvas.width = targetWidth;
          canvas.height = targetHeight;
          ctx.drawImage(img, cropX, cropY, cropWidth, cropHeight, 0, 0, targetWidth, targetHeight);
  
          resolve(canvas.toDataURL("image/jpeg"));
        };
      };
      reader.readAsDataURL(file);
    });
  }