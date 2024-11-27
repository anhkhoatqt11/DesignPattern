import React from 'react'
import ComicInfo from './(components)/ComicInfo'

// const ComicsDetailLayout = () => {
//   return (
//     <div className='bg-[#141414]'>
//         <ComicInfo />
//     </div>
//   )
// }

// export default ComicsDetailLayout   


export default async function ComicDetailLayout ({ params }) {
    return (
        <div className='w-full h-full'>
            <ComicInfo id={params.id} />
        </div>
    )
}