import Image from 'next/image'
import background from "../../../public/images/bg.jpg"

export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <div className='flex justify-center items-center h-screen'>
            <div className='flex-1 h-full p-5'>
                <h2 className='text-xl mb-6'>QuizWiz</h2>
                {children}

            </div>
            <div className='relative md:flex-1 h-full'>
                <Image src={background} className='object-fill' fill alt="" />
            </div>
        </div>
    )
}
