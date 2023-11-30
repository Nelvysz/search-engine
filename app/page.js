'use client';
import React from 'react'
import bg from 'public/SPACE_bg.png'
import { useState } from "react";
import AsyncSelect from "react-select/async";
import Image from "next/image"



export default function Home() {

  const [content, setcontent] = useState([]);

  const customStyles = {
    control: (base) => ({
      ...base,
      height: 38,
      width: 350,
      borderColor: '#dfe1e5',
      boxShadow: 'none',
      '&:hover': {
        borderColor: '#dfe1e5',
      },
    }),
    menu: (base) => ({
      ...base,
      width: 350,
      boxShadow: 'none'
    })
  };

  function Doc({ doc }) {
    return (
      <div
        key={doc.topic}
        className="flex ralative border rounded-[40px] shadow p-4 bg-white opacity-100"
      >
        <div className='relative flex-col w-1/2 pr-2'>
          <div className="ralative text-lg text-bold text-[#7D69A2]">
            {doc.topic}{" "}
          </div>
          <div className="relative  text-sm text-[8px] text-[#7D69A2]">
            {doc.description.substring(0, 100)}
          </div>
        </div>
        <div style={{ borderRadius: '40px', overflow: 'hidden' }} className='relative flex w-[150px] h-[150px] rounded-[40px] pl-2'>
          <Image
            src={`/SpacePic_PNG/${doc.topic}.png`}
            layout="fill" objectFit="cover"
          />
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundImage: `url(${bg.src})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: 'cover',
        width: "100vw",
        height: "100vh",
      }}
    >
      <div className='min-h-screen flex justify-center pt-[170px]'>
        <div className='absolute flex '>
          <AsyncSelect
            defaultOptions
            isClearable={true}
            placeholder="Search Universe ..."
            onChange={async (newValue) => {
              if (!newValue) {
                setcontent([]);
                return;
              }
              const response = await fetch(
                `/autocomplete?query=${newValue}`
              );
              const data = await response.json();
              setcontent(data);
            }}
            loadOptions={async (inputValue) => {
              if (inputValue.length < 2) return;
              const response = await fetch(
                `/autocomplete?query=${inputValue}`
              );
              const data = await response.json();
              return data.map((item) => ({
                value: item,
                label: (
                  <>
                    {item.topic}
                    <span className="text-gray-400 text-sm ml-3">
                      {item.topic}
                    </span>
                  </>
                ),
              }));
            }
            }
            styles={customStyles}
          />
        </div>
        <div className='pt-20 '>
          <div className='flex justify-center'>
            {content.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 bg-[#FFFFFF] bg-opacity-80 w-5/6 p-[20px] rounded-[40px]">
                {content.map((entry) => (
                  <Doc doc={entry} key={entry.topic} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

