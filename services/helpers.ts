const canvasGenerator = (
  filter: string,
  width: number,
  height: number,
  ref: any
) => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = width;
  canvas.height = height;

  ctx!.filter = filter;
  ctx!.translate(canvas.width / 2, canvas.height / 2);

  ctx!.drawImage(
    ref.current,
    -canvas.width / 2,
    -canvas.height / 2,
    canvas.width,
    canvas.height
  );

  const link = document.createElement("a");
  link.download = "image.jpg";
  link.href = canvas.toDataURL();
  return link;
};

export const saveImage = (
  filter: string,
  width: number,
  height: number,
  ref: any
) => {
  canvasGenerator(filter, width, height, ref).click();
};

export const generateLink = (
  filter: string,
  width: number,
  height: number,
  ref: any
) => {
  return canvasGenerator(filter, width, height, ref).href;
};

export const contrastFilter = (images) => {
  const imagesStyled = images.map((img) => {
    if (img.ref === "crop1")
      return {
        ...img,
        filter: "brightness(200%) saturate(50%) invert(0%) grayscale(100%)",
      };
    if (img.ref === "crop2")
      return {
        ...img,
        filter: "brightness(200%) saturate(85%) invert(0%) grayscale(0%)",
      };
    if (img.ref === "crop3")
      return {
        ...img,
        filter: "brightness(140%) saturate(105%) invert(100%) grayscale(25%)",
      };
  });

  return imagesStyled;
};

export const grayScaleFilter = (images) => {
  const imagesStyled = images.map((img) => {
    if (img.ref === "crop1")
      return {
        ...img,
        filter: "brightness(126%) saturate(130%) invert(18%) grayscale(30%)",
      };
    if (img.ref === "crop2")
      return {
        ...img,
        filter: "brightness(126%) saturate(130%) invert(18%) grayscale(75%)",
      };
    if (img.ref === "crop3")
      return {
        ...img,
        filter: "brightness(126%) saturate(130%) invert(18%) grayscale(100%)",
      };
  });

  return imagesStyled;
};
