'use client'
import Checkbox from '@mui/material/Checkbox';

function SearchItems({ heading = '', subHeading = '', image = '' }) {
    return (
        <div className="flex flex-row flex-wrap border-2 rounded border-black">
            <div className="w-1/4 m-2">
                <Image width={60} height={60} src={image} />
            </div>
            <div className="flex flex-row flex-wrap justify-center">
                <h1 className="text-2xl font-bold ml-3 mr-3 m-auto">{heading}</h1>
                <p className="text-sm italic ml-2 mr-2 m-auto">{subHeading}</p>
            </div>
        </div>
    )
}

export default function Page() {
    return (
        <div className="flex flex-col h-full w-full">
            <h1 className="text-2xl text-center font-bold">Title</h1>
            <h2 className="text-xl text-center font-bold italic">Date</h2>
            <h3 className="text-lg text-center underline font-bold">Duration</h3>
            <div className="flex flex-row flex-wrap justify-center">
                <div className="flex flex-col bg-white m-5 overflow-auto">
                    <h1 className="text-2xl font-bold">Breakfast</h1>
                    <div className="flex flex-col bg-white m-5  max-h-[15rem] overflow-auto">
                        <div className="flex flex-row flex-wrap justify-center">
                            <Checkbox />
                            <SearchItems heading="Heading" subHeading="Subheading" image={images.gallery01} />
                            <Checkbox />
                            <SearchItems heading="Heading" subHeading="Subheading" image={images.gallery01} />
                            <Checkbox />
                            <SearchItems heading="Heading" subHeading="Subheading" image={images.gallery01} />
                            <Checkbox />
                            <SearchItems heading="Heading" subHeading="Subheading" image={images.gallery01} />
                            <Checkbox />
                            <SearchItems heading="Heading" subHeading="Subheading" image={images.gallery01} />
                            <Checkbox />
                            <SearchItems heading="Heading" subHeading="Subheading" image={images.gallery01} />
                            <Checkbox />
                            <SearchItems heading="Heading" subHeading="Subheading" image={images.gallery01} />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col bg-white m-5 overflow-auto">
                    <h1 className="text-2xl font-bold">Lunch</h1>
                    <div className="flex flex-col bg-white m-5  max-h-[15rem] overflow-auto">
                        <div className="flex flex-row flex-wrap justify-center">
                            <Checkbox />
                            <SearchItems heading="Heading" subHeading="Subheading" image={images.gallery01} />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col bg-white m-5 overflow-auto">
                    <h1 className="text-2xl font-bold">Dinner</h1>
                    <div className="flex flex-col bg-white m-5  max-h-[15rem] overflow-auto">
                        <div className="flex flex-row flex-wrap justify-center">
                            <Checkbox />
                            <SearchItems heading="Heading" subHeading="Subheading" image={images.gallery01} />
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}