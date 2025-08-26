"use client";

import { Button } from "@/components/ui/button";
import { FaWhatsapp } from "react-icons/fa";
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
import { useAuthStore } from "@/stores/useAuthStore";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { notify } from "@/utils/notify";
import { produce } from "immer";
import { ToastContainer } from "react-toastify";
import { FaLock } from "react-icons/fa";
import strengthText from "@/utils/strengthText";
import calcStrength from "@/utils/calcStrength";
import strengthColor from "@/utils/strengthColor";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import SelectWithIcon from "@/components/Select";
import { HiOutlineBadgeCheck } from "react-icons/hi";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const GET_PROFILE_GET = `${API_URL}/api/v1/profile/me`;
const UPDATE_PROFILE_PUT = `${API_URL}/api/v1/profile/me`;
const CHANGE_PASSWORD_PUT = `${API_URL}/api/v1/profile/me/password`;
const CHANGE_FEE_PUT = `${API_URL}/api/v1/admin/settings/fee`;
const GET_FEE_ADMIN = `${API_URL}/api/v1/admin/settings/fee`;
const POST_WOOWA_API_KEYS = `${API_URL}/api/v1/woowa-api-keys`;

const BankOptions = [
  {
    title: "Mandiri",
    value: "MANDIRI",
    icon: IconMandiri,
  },
  {
    title: "BCA",
    value: "BCA",
    icon: IconBCA,
  },
  {
    title: "BRI",
    value: "BRI",
    icon: IconMandiri,
  },
  {
    title: "BNI",
    value: "BNI",
    icon: IconMandiri,
  },
  {
    title: "BTN",
    value: "BTN",
    icon: IconMandiri,
  },
  {
    title: "CIMB Niaga",
    value: "CIMB_NIAGA",
    icon: IconMandiri,
  },
  {
    title: "Danamon",
    value: "DANAMON",
    icon: IconMandiri,
  },
  {
    title: "Permata",
    value: "PERMATA",
    icon: IconMandiri,
  },
  {
    title: "Maybank",
    value: "MAYBANK",
    icon: IconMandiri,
  },
  {
    title: "OCBC NISP",
    value: "OCBC_NISP",
    icon: IconMandiri,
  },
  {
    title: "Panin Bank",
    value: "PANIN",
    icon: IconMandiri,
  },
  {
    title: "Bank Mega",
    value: "MEGA",
    icon: IconMandiri,
  },
];

type Profile = {
  id: string;
  email: string;
  username: string;
  firstName: string | null;
  lastName: string | null;
  avatar: string | null;
  whatsappNumber: string | null;
  role: "ADMIN" | "USER" | string; // bisa dipersempit jika role hanya dua
  isActive: boolean;
  isVerified: boolean;
  createdAt: string; // ISO Date string
  updatedAt: string; // ISO Date string
};

const Page = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { auth, isHydrated } = useAuthStore();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [originalProfile, setOriginalProfile] = useState<Profile | null>(null);
  const [password, setPassword] = useState<{
    oldPassword: string;
    newPassword: string;
  }>({
    oldPassword: "",
    newPassword: "",
  });
  const [fee, setFee] = useState<number>(5); // Default fee
  const [woowaApiKey, setWoowaApiKey] = useState<string>("");

  const strength = useMemo(
    () => calcStrength(password.newPassword),
    [password.newPassword]
  );

  const fetchProfile = async () => {
    try {
      const response = await axios.get(GET_PROFILE_GET, {
        headers: {
          Authorization: `Bearer ${auth?.accessToken}`,
        },
      });

      if (response.status === 200) {
        const profileData = response.data.data;
        setProfile(profileData);
        setOriginalProfile(profileData);
      }
    } catch (error: any) {
      notify.error("Error fetching profile");
      console.error("Error fetching profile:", error);
    }
  };

  const submitWoowaApiKey = async () => {
    try {
      const response = await axios.post(
        POST_WOOWA_API_KEYS,
        {
          key: woowaApiKey,
        },
        {
          headers: {
            Authorization: `Bearer ${auth?.accessToken}`,
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        notify.success("Woowa API Key added successfully!");
      }
    } catch (error: any) {
      notify.error("Error adding Woowa API Key");
      console.error("Error adding Woowa API Key:", error);
    }
  };

  const updateProfile = async () => {
    if (!profile || !originalProfile) return;

    try {
      setIsLoading(true);
      const payload: Partial<
        Pick<Profile, "email" | "username" | "whatsappNumber">
      > = {};

      if (profile.email !== originalProfile.email) {
        payload.email = profile.email;
      }

      if (profile.username !== originalProfile.username) {
        payload.username = profile.username;
      }

      if (profile.whatsappNumber !== originalProfile.whatsappNumber) {
        payload.whatsappNumber = profile.whatsappNumber;
      }

      // Jika tidak ada perubahan, tampilkan pesan
      if (Object.keys(payload).length === 0) {
        notify.info("Tidak ada perubahan data profile");
        return;
      }

      const response = await axios.put(UPDATE_PROFILE_PUT, payload, {
        headers: {
          Authorization: `Bearer ${auth?.accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        setIsLoading(false);
        notify.success("Profile updated successfully!");
        const updatedProfile = response.data.data;
        setProfile(updatedProfile);
        setOriginalProfile(updatedProfile); // Update data asli setelah berhasil
      }
    } catch (error: any) {
      setIsLoading(false);
      notify.error("Gagal memperbarui profil");
      console.error("Error updating profile:", error);
    }
  };

  const updatePassword = async () => {
    try {
      setIsLoading(true);
      const response = await axios.put(CHANGE_PASSWORD_PUT, password, {
        headers: {
          Authorization: `Bearer ${auth?.accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        setIsLoading(false);
        notify.success("Password updated successfully!");
        setPassword(
          produce((draft) => {
            draft.oldPassword = "";
            draft.newPassword = "";
          })
        );
      }
    } catch (error: any) {
      setIsLoading(false);
      console.error("Error updating password:", error);
      notify.error("Gagal memperbarui password");
    }
  };

  // Handle input changes
  const handleInputChange = (field: keyof Profile, value: string) => {
    setProfile((prev) =>
      prev
        ? produce(prev, (draft) => {
            (draft as any)[field] = value;
          })
        : null
    );
  };

  const getAdminFee = async () => {
    try {
      const response = await axios.get(GET_FEE_ADMIN, {
        headers: {
          Authorization: `Bearer ${auth?.accessToken}`,
        },
      });

      if (response.status === 200) {
        setFee(response.data.data.feePercent);
      }
    } catch (error: any) {
      console.error("Error fetching admin fee:", error);
      notify.error("Error fetching admin fee");
    }
  };

  const changeAdminFee = async () => {
    try {
      const response = await axios.put(
        CHANGE_FEE_PUT,
        {
          feePercent: fee,
        },
        {
          headers: {
            Authorization: `Bearer ${auth?.accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        notify.success("Fee updated successfully!");
      }
    } catch (error: any) {
      console.error("Error changing admin fee:", error);
      notify.error("Error changing admin fee");
    }
  };

  useEffect(() => {
    if (isHydrated && auth?.accessToken) {
      fetchProfile();
      getAdminFee();
    }
  }, [auth, isHydrated]);

  return (
    <>
      <ToastContainer />
      <ContainerPage title="Setting">
        <ContainerComponent title="Profile Setting">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:bg-white md:p-6 md:rounded-lg">
            <Input
              Icon={AiOutlineUser}
              placeholder="Username"
              className="my-1"
              value={profile?.username || ""}
              onChange={(e) => handleInputChange("username", e.target.value)}
            />
            <Input
              Icon={FaWhatsapp}
              placeholder="Nomor Whatsapp"
              className="my-1"
              value={profile?.whatsappNumber || ""}
              onChange={(e) =>
                handleInputChange("whatsappNumber", e.target.value)
              }
            />
            <Input
              Icon={FaRegEnvelope}
              placeholder="Email"
              className="my-1"
              value={profile?.email || ""}
              onChange={(e) => handleInputChange("email", e.target.value)}
            />
            {auth?.user.role === "ADMIN" && (
              <>
                <Input
                  Icon={CgPassword}
                  placeholder="Password lama"
                  className="my-1"
                  value={password.oldPassword}
                  onChange={(e) =>
                    setPassword(
                      produce((draft) => {
                        draft.oldPassword = e.target.value;
                      })
                    )
                  }
                />
                <div className="w-full flex flex-col gap-2">
                  <Input
                    Icon={TbLockPassword}
                    placeholder="Password baru"
                    className="my-1"
                    value={password.newPassword}
                    onChange={(e) =>
                      setPassword(
                        produce((draft) => {
                          draft.newPassword = e.target.value;
                        })
                      )
                    }
                  />
                  {password.newPassword && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-black font-light">
                          Password Strength
                        </span>
                        <span className="text-sm text-zinc-400">
                          {strengthText(strength)}
                        </span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-zinc-200 overflow-hidden">
                        <div
                          className={`h-full ${strengthColor(
                            strength
                          )} transition-all duration-300`}
                          style={{ width: `${strength}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
            {auth?.user.role === "ADMIN" && (
              <Button
                disabled={
                  isLoading ||
                  strength < 80 ||
                  !password.newPassword ||
                  !password.oldPassword
                }
                onClick={() => updatePassword()}
                className={`flex items-center gap-2 bg-red-700 hover:bg-red-800 w-full md:col-span-2 justify-self-end place-self-end text-white p-2 rounded ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? (
                  <AiOutlineLoading3Quarters className="animate-spin" />
                ) : (
                  <FaLock />
                )}
                Ganti Password
              </Button>
            )}
            <Button
              disabled={isLoading}
              onClick={() => updateProfile()}
              className={`flex items-center gap-2 bg-black w-full md:col-span-2 justify-self-end place-self-end text-white p-2 rounded ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? (
                <AiOutlineLoading3Quarters className="animate-spin" />
              ) : (
                <IoIosSave />
              )}
              Simpan Profile
            </Button>
          </div>
        </ContainerComponent>

        {auth?.user.role === "ADMIN" && (
          <ContainerComponent title="General Setting">
            <div className="flex flex-col gap-10 md:bg-white md:p-6 md:rounded-lg">
              <div className="w-full flex flex-col lg:flex-row gap-5">
                <div className="w-full xl:w-8/12 flex flex-col gap-2">
                  <div className="flex gap-2">
                    <CiBank className="text-2xl" />
                    <p className="text-base font-normal">Rekening Bank</p>
                  </div>
                  <div className="flex flex-col lg:flex-row gap-2 items-start lg:items-center w-full">
                    {/* <Input
                      className="w-full my-1"
                      placeholder="Tambah Rekening Bank"
                    /> */}
                    <div className="flex flex-col lg:flex-row gap-2 items-start lg:items-center w-full">
                      <SelectWithIcon
                        // Icon={HiOutlineBadgeCheck}
                        options={BankOptions}
                        getOptionLabel={(option) => option.title}
                        getOptionValue={(option) => option.value}
                        className="w-full font-semibold"
                        placeholder="Pilih Bank"
                        // onValueChange={(e) =>
                        //   setTopUp(
                        //     produce(topUp, (draft) => {
                        //       draft.accountRequestId = e;
                        //     })
                        //   )
                        // }
                      />
                    </div>
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
                  <div className="w-full flex items-center gap-3">
                    <div className="w-8/12">
                      <Input
                        type="text"
                        inputMode="decimal"
                        pattern="[0-9]*\.?[0-9]*"
                        value={fee}
                        className="my-1"
                        onChange={(e) => {
                          const val = e.target.value;
                          if (/^[0-9]*\.?[0-9]*$/.test(val) || val === "") {
                            setFee(val === "" ? 0 : Number(val)); // simpan sebagai number
                          }
                        }}
                        onBlur={() => {
                          // convert ke number hanya saat blur
                          setFee((prev) => (prev ? Number(prev) : 0));
                        }}
                      />
                    </div>
                    <Button
                      onClick={() => changeAdminFee()}
                      className="flex items-center gap-2 bg-black w-fit text-white p-2 rounded"
                    >
                      Ubah Fee
                    </Button>
                  </div>
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
                    <div className="w-11/12">
                      <Input
                        placeholder=""
                        className="my-1"
                        onChange={(e) =>
                          setWoowaApiKey(
                            produce(woowaApiKey, (draft) => {
                              draft = e.target.value;
                            })
                          )
                        }
                      />
                    </div>
                    <Button
                      onClick={() => submitWoowaApiKey()}
                      className="flex items-center gap-2 bg-black w-fit text-white p-2 rounded"
                    >
                      <FaPlus />
                    </Button>
                  </div>
                </div>
                <div className="w-full xl:w-6/12 flex flex-col gap-2">
                  <div className="flex gap-2">
                    <TbApi className="text-2xl" />
                    <p className="text-base font-normal">API Moota</p>
                  </div>
                  <div className="flex flex-row gap-2 items-center w-full">
                    <div className="w-11/12">
                      <Input placeholder="" className="my-1" />
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
                  <p className="text-base font-normal">
                    Pending Followup Topup
                  </p>
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
                  <p className="text-base font-normal">
                    Processing Followup Topup
                  </p>
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
                  <p className="text-base font-normal">
                    Complete Followup Topup
                  </p>
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
        )}
      </ContainerPage>
    </>
  );
};

export default Page;
