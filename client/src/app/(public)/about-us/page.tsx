import Link from 'next/link'
import React from 'react'

const AboutUs = () => {
    return (
        <div className='w-full min-h-screen text-white'>
            <div className='p-8'>
                <h1 className='text-2xl font-bold mb-4'>Về trang web</h1>
                <p className='text-gray-400 text-md'>Phiên bản 0.1b</p>
                <br></br>
                <p className='text-gray-400 text-md'>Copyright ©️2024 Skylark. Ltd. Bảo lưu mọi quyền</p>
            </div>
            <div className='p-8'>
                <h1 className='text-2xl font-bold mb-4'>Về công ty</h1>
                <p className='text-gray-400 text-md'>Skylark. Ltd.</p>
                <br></br>
                <p className='text-gray-400 text-md'>Địa chỉ: Đường Hàn Thuyên, Khu phố 6, P.Thủ Đức, Thành phố Hồ Chí Minh</p>
            </div>
            <div className='p-8'>
                <Link href={`/about-us/terms-of-use`} className='text-[#A958FE]'>Điều khoản sử dụng</Link> <br></br>
                <Link href={`/about-us/privacy-policy`} className='text-[#A958FE]'>Chính sách quyền riêng tư</Link>
            </div>
        </div>
    )
}

export default AboutUs