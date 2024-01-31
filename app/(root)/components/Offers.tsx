import React from 'react'

import innovate from "@/assets/innovation.png"
import client from "@/assets/client.png"
import datacyle from "@/assets/datacyclr.png"
import solution from "@/assets/solution.png"
import expect from "@/assets/expect.png"
import Image from 'next/image'

const Offers = () => {
    const OffersData = [
        {
            img: datacyle,
            name: "Data Lifecycle Mastery",
            description: [
                "Detaining our data collection strategy, we emphasize sources, methods, and proprietary techniques.",
                "Showcasing advanced analytics techniques, we illustrate our ability to extract meaningful insights from complex datasets.",
                "Demonstrating a commitment to data accuracy, we implement rigorous quality assurance, validation processes, and error-checking mechanisms."
            ]
        },
        {
            img: expect,
            name: "Visualization and Communication Excellence",
            description: [
                "Illustrating our ability to communicate complex data effectively through advanced data visualization tools and technologies.",
                "Providing examples of transforming intricate data into easily understandable formats, ensuring a user=friendly experience."
            ]
        },
        {
            img: solution,
            name: "Security, Compliance, and Custom Solutions",
            description: [
                "Addressing concerns related to data security and compliance, we assure clients of confidentiality.",
                "Showcasing how our company tailors data services to meet specific client needs, with examples of successful case studies"
            ]
        },
        {
            img: innovate,
            name: "Innovation and Thought Leadership",
            description: [
                "Communicating our commitment to continuous improvement and staying at the forefront of data advancements.",
                "Demonstrating thought leadership through educational resources such as blog posts, whitepapers, and webinars."
            ]
        },
        {
            img: client,
            name: "Client Collaboration and Support",
            description: [
                "Emphasizing a collaborative approach with clients, we involve them in the process and seek ongoing feedback.",
                "Showcasing testimonials or success stories that reflect positive client experiences.",
                "Providing clear avenues for potential clients to get in touch, ensuring a seamless experience for those interested in exploring our data expertise."
            ]
        }
    ]
  return (
    <div className='py-12'>
        <h4 className='text-xl md:text-2xl font-bold capitalize'>
            Our Process
        </h4>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 mt-8'>
      {
            OffersData.map((offer, i) => (
                <div key={i} className='max bg-white shadow-lg rounded-xl'>
                    <div className='w-full h-44'>
                        <Image src={offer.img} alt={offer.name} width={300} height={100} className='w-full h-full rounded-t-xl' />
                    </div>
                    <div className='m-6 p-3'>
                    <h4 className='text-lg md:text-xl font-medium capitalize h-16'>
                            {offer.name}
                        </h4>
                        <ul className='list-disc space-y-4'>
                            {
                                offer.description.map((description, i) => (
                                    <li key={`${i}-desc`} className='text-xs md:text-sm'>
                                        {description}
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            ))
        }
      </div>
    </div>
  )
}

export default Offers