import { Button } from "@/components/ui/button";
import { FaWhatsapp } from "react-icons/fa";
import HeaderPage from "@/components/HeaderPage";
import { AiOutlineUser } from "react-icons/ai";
import Input from "@/components/Input";
import { FaRegEnvelope } from "react-icons/fa";
import { CgPassword } from "react-icons/cg";
import { TbLockPassword } from "react-icons/tb";
import ContainerPage from "@/components/ContainerPage";
import ContainerComponent from "@/components/ContainerComponent";
import { IoIosSave } from "react-icons/io";
import { CiBank, CiPercent } from "react-icons/ci";
import Image from "next/image";
import IconBCA from "@/assets/img/bca.png";
import IconMandiri from "@/assets/img/mandiri.png";
import { FaTrashAlt } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { TbApi } from "react-icons/tb";
import Textarea from "@/components/Textarea";

const Page = () => {
  return (
    <ContainerPage title="Setting">
      <ContainerComponent title="Profile Setting">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:bg-white md:p-6 md:rounded-lg">
          <Input Icon={AiOutlineUser} placeholder="Username" />
          <Input Icon={FaWhatsapp} placeholder="Nomor Whatsapp" />
          <Input Icon={FaRegEnvelope} placeholder="Email" />
          <Input Icon={CgPassword} placeholder="Password lama" />
          <Input Icon={TbLockPassword} placeholder="Password baru" />
          <Button className="flex items-center gap-2 bg-black w-fit justify-self-end place-self-end text-white p-2 rounded">
            <IoIosSave />
            Simpan Profile
          </Button>
        </div>
      </ContainerComponent>
      <ContainerComponent title="General Setting">
        <div className="flex flex-col gap-10 md:bg-white md:p-6 md:rounded-lg">
          <div className="w-full flex flex-col lg:flex-row gap-5">
            <div className="w-full xl:w-8/12 flex flex-col gap-2">
              <div className="flex gap-2">
                <CiBank className="text-2xl" />
                <p className="text-base font-normal">Rekening Bank</p>
              </div>
              <div className="flex flex-col lg:flex-row gap-2 items-start lg:items-center w-full">
                <Input className="w-full" placeholder="Tambah Rekening Bank" />
                <Button className="flex items-center gap-2 bg-black w-fit text-white p-2 rounded">
                  + Rekening
                </Button>
              </div>
            </div>

            <div className="w-full lg:w-4/12 flex flex-col gap-2">
              <div className="flex gap-2">
                <CiPercent className="text-2xl" />
                <p className="text-base font-normal">Fee Default</p>
              </div>
              <Input placeholder="Tambah Rekening Bank" defaultValue={5} />
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <Image src={IconBCA} alt="Icon BCA" />
              <p className="text-base font-semibold">
                62332242342 - Agung Prasetyo
              </p>
              <Button className="bg-white hover:bg-red-100 border border-red-200 text-red-500 hover:text-red-600 cursor-pointer p-2 rounded">
                <FaTrashAlt />
              </Button>
            </div>
            <div className="flex items-center gap-3">
              <Image src={IconMandiri} alt="Icon Mandiri" />
              <p className="text-base font-semibold">
                62332242342 - Agung Prasetyo
              </p>
              <Button className="bg-white hover:bg-red-100 border border-red-200 text-red-500 hover:text-red-600 cursor-pointer p-2 rounded">
                <FaTrashAlt />
              </Button>
            </div>
          </div>

          <div className="flex flex-col xl:flex-row gap-5">
            <div className="w-full xl:w-6/12 flex flex-col gap-2">
              <div className="flex gap-2">
                <TbApi className="text-2xl" />
                <p className="text-base font-normal">API Woowa</p>
              </div>
              <div className="flex flex-row gap-2 items-center w-full">
                <div className="w-10/12">
                  <Input placeholder="" />
                </div>
                <Button className="flex items-center gap-2 bg-black w-fit text-white p-2 rounded">
                  <FaPlus />
                </Button>
              </div>
            </div>
            <div className="w-full xl:w-6/12 flex flex-col gap-2">
              <div className="flex gap-2">
                <TbApi className="text-2xl" />
                <p className="text-base font-normal">API Woowa</p>
              </div>
              <div className="flex flex-row gap-2 items-center w-full">
                <div className="w-10/12">
                  <Input placeholder="" />
                </div>
                <Button className="flex items-center gap-2 bg-black w-fit text-white p-2 rounded">
                  <FaPlus />
                </Button>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col gap-2">
            <div className="flex gap-2">
              <FaWhatsapp className="text-2xl" />
              <p className="text-base font-normal">Pending Followup Topup</p>
            </div>
            <div className="flex flex-row gap-2 items-center w-full">
              <div className="w-11/12">
                <Textarea placeholder="" />
              </div>
              <Button className="flex items-center gap-2 bg-black w-fit text-white p-2 rounded">
                <FaPlus />
              </Button>
            </div>
          </div>
          <div className="w-full flex flex-col gap-2">
            <div className="flex gap-2">
              <FaWhatsapp className="text-2xl" />
              <p className="text-base font-normal">Processing Followup Topup</p>
            </div>
            <div className="flex flex-row gap-2 items-center w-full">
              <div className="w-11/12">
                <Textarea placeholder="" />
              </div>
              <Button className="flex items-center gap-2 bg-black w-fit text-white p-2 rounded">
                <FaPlus />
              </Button>
            </div>
          </div>
          <div className="w-full flex flex-col gap-2">
            <div className="flex gap-2">
              <FaWhatsapp className="text-2xl" />
              <p className="text-base font-normal">Complete Followup Topup</p>
            </div>
            <div className="flex flex-row gap-2 items-center w-full">
              <div className="w-11/12">
                <Textarea placeholder="" />
              </div>
              <Button className="flex items-center gap-2 bg-black w-fit text-white p-2 rounded">
                <FaPlus />
              </Button>
            </div>
          </div>
          <div className="w-full flex flex-col gap-2">
            <div className="flex gap-2">
              <FaWhatsapp className="text-2xl" />
              <p className="text-base font-normal">Pending Followup Akun</p>
            </div>
            <div className="flex flex-row gap-2 items-center w-full">
              <div className="w-11/12">
                <Textarea placeholder="" />
              </div>
              <Button className="flex items-center gap-2 bg-black w-fit text-white p-2 rounded">
                <FaPlus />
              </Button>
            </div>
          </div>
          <div className="w-full flex flex-col gap-2">
            <div className="flex gap-2">
              <FaWhatsapp className="text-2xl" />
              <p className="text-base font-normal">Added Followup Akun</p>
            </div>
            <div className="flex flex-row gap-2 items-center w-full">
              <div className="w-11/12">
                <Textarea placeholder="" />
              </div>
              <Button className="flex items-center gap-2 bg-black w-fit text-white p-2 rounded">
                <FaPlus />
              </Button>
            </div>
          </div>
        </div>
      </ContainerComponent>
    </ContainerPage>
  );
};

export default Page;
