export const DEV_IMAGE_URL = "http://35.226.125.254:9292";

function cardImagePath(assetPaths) {
    return `${assetPaths.imagePath}${assetPaths.themePath}/cards/allcards_normal.png`;
}

function chipImagePath(assetPaths) {
    return `${assetPaths.imagePath}${assetPaths.themePath}/chips/allchips_normal.png`;
}

export { cardImagePath, chipImagePath };
