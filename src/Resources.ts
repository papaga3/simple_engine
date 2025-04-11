export interface ImgElement {
    image: HTMLImageElement,
    isLoaded: boolean
}

class Resources {
    resourceList: Record<string, string>;
    imageList: Record<string, ImgElement>;

    // Everything we plan to download
    constructor() {

        // create resource list
        this.resourceList = {
            sky: "/sprites/sky.png",
            ground: "/sprites/ground.png",
            hero: "/sprites/hero-sheet.png",
            shadow: "/sprites/shadow.png"
        }

        this.imageList = {};

        // Load image from resource list
        Object.keys(this.resourceList).forEach(key => {
            const img = new Image();
            img.src = this.resourceList[key];
            this.imageList[key] = { image: img, isLoaded: false };
            
            img.onload = () => {
                this.imageList[key].isLoaded = true;
            }
        })
    }
}

// Create One instance of resources for the whole application
export const resources = new Resources();