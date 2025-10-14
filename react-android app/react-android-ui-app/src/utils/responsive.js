export const isMobile = () => {
    return window.innerWidth <= 768; // Adjust the width as needed for mobile detection
};

export const getResponsiveFontSize = (baseSize) => {
    const scaleFactor = isMobile() ? 0.875 : 1; // Scale down font size for mobile
    return `${baseSize * scaleFactor}px`;
};

export const getResponsivePadding = (basePadding) => {
    const scaleFactor = isMobile() ? 0.8 : 1; // Scale down padding for mobile
    return `${basePadding * scaleFactor}px`;
};