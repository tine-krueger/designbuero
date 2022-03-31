import { IBusinessGraphicsProps } from "../../pages/business-graphics";


export interface IWordpressBusinessGraphicsPageProps {
  page: IWordpressBusinessGraphicsProps;
}

export interface IWordpressBusinessGraphicsProps {
  bilderBusinessGraphics: BilderBusinessGraphics;
  content: string;
  title: string;
}

interface BilderBusinessGraphics {
  firstImageLeft: FirstImageLeft;
  firstImageRight: FirstImageLeft;
  secondImageLeft: FirstImageLeft;
  secondImageRight: FirstImageLeft;
}

interface FirstImageLeft {
  altText: string;
  sourceUrl: string;
  title: string;
  mediaDetails: MediaDetails;
}

interface MediaDetails {
  height: number;
  width: number;
}

export function businessGraphicsData(data: IWordpressBusinessGraphicsProps): IBusinessGraphicsProps {
     
    const {bilderBusinessGraphics, ...rest} = data
    const businessGraphicsData: IBusinessGraphicsProps = {
        leftImages: [
            {
                src: bilderBusinessGraphics.firstImageLeft.sourceUrl,
                title: bilderBusinessGraphics.firstImageLeft.title,
                alt: bilderBusinessGraphics.firstImageLeft.altText
            },
            {
                src: bilderBusinessGraphics.secondImageLeft.sourceUrl,
                title: bilderBusinessGraphics.secondImageLeft.title,
                alt: bilderBusinessGraphics.secondImageLeft.altText
            },
        ],
        rightImages: [
            {
                src: bilderBusinessGraphics.firstImageRight.sourceUrl,
                title: bilderBusinessGraphics.firstImageRight.title,
                alt: bilderBusinessGraphics.firstImageRight.altText
            },
            {
                src: bilderBusinessGraphics.secondImageRight.sourceUrl,
                title: bilderBusinessGraphics.secondImageRight.title,
                alt: bilderBusinessGraphics.secondImageRight.altText
            },
        ],
        ...rest
    }

    return businessGraphicsData

}