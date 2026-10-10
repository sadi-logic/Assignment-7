import React from 'react';

const Footer = () => {
    return (
        <div>
            <div className="divider"></div>
            <div className='flex flex-col lg:flex-row items-center justify-center lg:justify-between container mx-auto text-[#1D271F] text-[14px] py-5'>
                <p>বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।</p><br/>
                <p>সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।</p>
            </div>
        </div>
    );
};

export default Footer;