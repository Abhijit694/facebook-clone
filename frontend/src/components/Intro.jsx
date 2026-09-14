import { VscBriefcase } from "react-icons/vsc";
import { FaBriefcase } from "react-icons/fa";
import { LuGraduationCap } from "react-icons/lu";
import { FaGraduationCap } from "react-icons/fa6";
import { MdHomeWork } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { useState } from "react";
import { useSelector } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog"

const Intro = () => {

  const { userProfile } = useSelector(store => store.auth)

  const [introData, setIntroData] = useState({
    bioText: userProfile?.bio?.bioText,
    liveIn: userProfile?.bio?.liveIn,
    relationship: userProfile?.bio?.relationship,
    workplace: userProfile?.bio?.workplace,
    education: userProfile?.bio?.education,
    phone: userProfile?.bio?.phone,
    hometown: userProfile?.bio?.hometown
  })

    const arr1 = [
        {
            icon: <FaBriefcase/>,
            text: `Works at ${introData.workplace}`
        },
        {
            icon: <FaLocationDot className="text-[18px]" />,
            text: `Lives in ${introData.liveIn}`
        },
        {
            icon: <FaGraduationCap className="text-[18px]" />,
            text: `Studied at ${introData.education}`
        },
        {
            icon: <MdHomeWork className="text-[18px]" />,
            text: `From ${introData.hometown}`
        },
        {
            icon: <FaPhone/>,
            text: `${introData.phone}`
        },
        {
            icon: <FaHeart/>,
            text: `${introData.relationship}`
        },
    ]

    const editDetailsHandler = (e) => {
      const { name,value } = e.target
      setIntroData((prev) => ({
        ...prev,
        [name]:value
      }))
    }

    const editRelationshipHandler = (value) => {
      setIntroData({...introData, relationship: value})
    }

  return (
    <div className="bg-white dark:bg-[#262829] flex-1 rounded-lg p-5 h-max shadow-md md:w-90" >
      <h1 className="text-xl font-bold mb-2 text-gray-700 dark:text-gray-200" >Personal details</h1>
      {
        arr1.map((item,index) => {
          return (
            <div key={index} className="flex items-center gap-4 h-10">
              <span className="opacity-70 invert-50" >{item.icon}</span>
              <span>{item.text}</span>
            </div>
          )
        })
      }
      
      <Dialog>
        <DialogTrigger>
          <button className="md:w-80 bg-[#e1e4e8] hover:bg-[#c8cdd2] dark:bg-[#3a3c3d] text-gray-800 dark:text-gray-200 cursor-pointer py-1 rounded-md font-medium" >Edit details</button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-106.25 md:max-w-115 lg:max-w-130 " >
          <DialogHeader>
            <DialogTitle className="text-center md:text-xl font-semibold " >Edit details</DialogTitle>
          </DialogHeader>
          <div className="grid gap-2" >
            <div className="flex flex-col gap-2" >
              <label htmlFor="bio" className="text-lg font-medium">Bio</label>
              <textarea
                id="bio"
                placeholder="Tell something about yourself..."
                rows="3"
                maxLength="100"
                name="bioText"
                value={introData.bioText}
                className="py-1 px-2 md:text-base outline-none border-[1.25px] border-gray-400 rounded-md resize-none"
                onChange={editDetailsHandler}
              />
            </div>
            <div className="flex flex-col gap-2" >
              <label htmlFor="work" className="text-lg font-medium">Workplace</label>
              <input
                type="text"
                id="work"
                placeholder="Your workplace"
                name="workplace"
                value={introData.workplace}
                className="py-1 px-2 md:text-base outline-none border-[1.25px] border-gray-400 rounded-md"
                onChange={editDetailsHandler}
              />
            </div>
            <div className="flex flex-col gap-2" >
              <label htmlFor="education" className="text-lg font-medium">Education</label>
              <input
                type="text"
                id="education"
                placeholder="Your education"
                name="Education"
                value={introData.education}
                className="py-1 px-2 md:text-base outline-none border-[1.25px] border-gray-400 rounded-md"
                onChange={editDetailsHandler}
              />
            </div>

            <div className="grid grid-cols-2 gap-3" >
              <div className="flex flex-col gap-2" >
                <label htmlFor="liveIn" className="text-lg font-medium">Lives In</label>
                <input
                  type="text"
                  id="liveIn"
                  name="liveIn"
                  value={introData.liveIn}
                  className="py-1 px-2 md:text-base outline-none border-[1.25px] border-gray-400 rounded-md"
                  onChange={editDetailsHandler}
                />
              </div>
              <div className="flex flex-col gap-2" >
                <label htmlFor="hometown" className="text-lg font-medium">Hometown</label>
                <input
                  type="text"
                  id="hometown"
                  name="hometown"
                  value={introData.hometown}
                  className="py-1 px-2 md:text-base outline-none border-[1.25px] border-gray-400 rounded-md"
                  onChange={editDetailsHandler}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3" >
              <div className="flex flex-col gap-2" >
                <label htmlFor="phone" className="text-lg font-medium">Phone</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={introData.phone}
                  className="py-1 px-2 md:text-base outline-none border-[1.25px] border-gray-400 rounded-md"
                  onChange={editDetailsHandler}
                />
              </div>
              <div className="flex flex-col gap-2" >
                <label htmlFor="relationship" className="text-lg font-medium">Relationship</label>
                <select
                  name="relationship"
                  id="relationship"
                  className="py-1 px-2 md:text-base outline-none border-[1.25px] border-gray-400 rounded-md"
                  onValueChange={editRelationshipHandler}
                >
                  <option value="" selected >Choose status</option>
                  <option value="Single">Single</option>
                  <option value="In a relationship">In a relationship</option>
                  <option value="Engaged">Engaged</option>
                  <option value="Married">Married</option>
                  <option value="Separated">Separated</option>
                  <option value="Divorced">Divorced</option>
                  <option value="Widowed">Widowed</option>
                </select>
              </div>
            </div>

          </div>
          <DialogFooter>
            <button className="text-base border border-gray-700 rounded-md cursor-pointer py-1 px-2 hover:bg-gray-100" >Cancel</button>
            <button className="text-base bg-[#0866ff] hover:bg-[#1755db] text-white rounded-md cursor-pointer py-1 px-2" >Save</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Intro