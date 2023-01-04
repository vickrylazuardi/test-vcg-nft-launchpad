import React from "react";
import { AiOutlineArrowDown } from "react-icons/ai";

export default function ContentTournament(props) {
  return (
    <div className="grid gap-x-4 gap-y-4 grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
      <div className="card-tournament">
        <div className="card-img">
          <img src="/images/feature.png" alt="" />
          <p className="label-status open">Open Register</p>
        </div>
        <div className="card-detail py-4 px-5">
          <h4 className="font-bold text-lg">VCG MLBB SEA Monthly Tournament</h4>
          <p className="font-bold text-sm mt-4">
            <img
              className="creator-img inline mr-2"
              src="/images/Prod.png"
              alt=""
            />
            Mobile Legends: Bang Bang
          </p>
          <div className="mt-4">
            <div className="flex justify-between">
              <p className="font-bold">Slot Tim</p>
              <p className="font-bold">
                55/<span className="text-color-grey">64</span>
              </p>
            </div>
            <div className="progress-bar mt-2">
              <div
                className="progress-bar-inner-bar"
                style={{
                  width: `${(50 / 100) * 100}%`,
                }}
              />
            </div>
          </div>
          <div className="mt-4">
            <div className="grid grid-cols-2 gap-x-1">
              <div
                className="text-center p-2"
                style={{
                  background: "#161B28",
                  borderRadius: "10px 0px 0px 10px",
                }}
              >
                <p className="text-xs font-bold mb-2">Pendaftaran</p>
                <p className="text-color-grey text-xs mb-1">April 30, 2022</p>
                <AiOutlineArrowDown className="m-auto" />
                <p className="text-color-grey text-xs mt-1">May 2, 2022</p>
              </div>
              <div
                className="text-center p-2"
                style={{
                  background: "#161B28",
                  borderRadius: "0px 10px 10px 0px",
                }}
              >
                <p className="text-xs font-bold mb-2">Jadwal Turnamen</p>
                <p className="text-color-grey text-xs mb-1">
                  September 5, 2022
                </p>
                <AiOutlineArrowDown className="m-auto" />
                <p className="text-color-grey text-xs mt-1">
                  September 30, 2022
                </p>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between">
              <p className="text-xs font-bold">Biaya Pendaftaran</p>
              <p className="text-xs font-bold">Gratis</p>
            </div>
            <div className="flex justify-between mt-2">
              <p className="text-xs font-bold">Total Hadiah</p>
              <p className="text-xs font-bold">Rp. 5.000.000</p>
            </div>
          </div>
          <div className="mt-4">
            <div class="flex gap-x-2">
              <div class="flex-none">
                <button
                  className="btn btn-outline-white"
                  style={{ padding: "5px 20px" }}
                >
                  Detail
                </button>
              </div>
              <div class="flex-1">
                <button
                  className="btn btn-light-green w-full"
                  style={{ padding: "5px 20px" }}
                >
                  Ikut Turnamen
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card-tournament">
        <div className="card-img">
          <img src="/images/feature.png" alt="" />
          <p className="label-status ongoing">On Going</p>
        </div>
        <div className="card-detail py-4 px-5">
          <h4 className="font-bold text-lg">VCG MLBB SEA Monthly Tournament</h4>
          <p className="font-bold text-sm mt-4">
            <img
              className="creator-img inline mr-2"
              src="/images/Prod.png"
              alt=""
            />
            Mobile Legends: Bang Bang
          </p>
          <div className="mt-4">
            <div className="flex justify-between">
              <p className="font-bold">Slot Tim</p>
              <p className="font-bold">
                55/<span className="text-color-grey">64</span>
              </p>
            </div>
            {/* <div className="progress-bar mt-2">
              <div
                className="progress-bar-inner-bar"
                style={{
                  width: `${(50 / 100) * 100}%`,
                }}
              />
            </div> */}
          </div>
          <div className="mt-4">
            <div className="grid grid-cols-2 gap-x-1">
              <div
                className="text-center p-2"
                style={{
                  background: "#161B28",
                  borderRadius: "10px 0px 0px 10px",
                }}
              >
                <p className="text-xs font-bold mb-2">Pendaftaran</p>
                <p className="text-color-grey text-xs mb-1">April 30, 2022</p>
                <AiOutlineArrowDown className="m-auto" />
                <p className="text-color-grey text-xs mt-1">May 2, 2022</p>
              </div>
              <div
                className="text-center p-2"
                style={{
                  background: "#161B28",
                  borderRadius: "0px 10px 10px 0px",
                }}
              >
                <p className="text-xs font-bold mb-2">Jadwal Turnamen</p>
                <p className="text-color-grey text-xs mb-1">
                  September 5, 2022
                </p>
                <AiOutlineArrowDown className="m-auto" />
                <p className="text-color-grey text-xs mt-1">
                  September 30, 2022
                </p>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between">
              <p className="text-xs font-bold">Biaya Pendaftaran</p>
              <p className="text-xs font-bold">Gratis</p>
            </div>
            <div className="flex justify-between mt-2">
              <p className="text-xs font-bold">Total Hadiah</p>
              <p className="text-xs font-bold">Rp. 5.000.000</p>
            </div>
          </div>
          <div className="mt-4">
            <div class="flex gap-x-2">
              <div class="flex-none">
                <button
                  className="btn btn-outline-white"
                  style={{ padding: "5px 20px" }}
                >
                  Detail
                </button>
              </div>
              <div class="flex-1">
                <button
                  className="btn btn-light-blue w-full"
                  style={{ padding: "5px 20px" }}
                >
                  Lihat Jadwal
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card-tournament">
        <div className="card-img">
          <img src="/images/feature.png" alt="" />
          <p className="label-status soon">Coming Soon</p>
        </div>
        <div className="card-detail py-4 px-5">
          <h4 className="font-bold text-lg">VCG MLBB SEA Monthly Tournament</h4>
          <p className="font-bold text-sm mt-4">
            <img
              className="creator-img inline mr-2"
              src="/images/Prod.png"
              alt=""
            />
            Mobile Legends: Bang Bang
          </p>
          <div className="mt-4">
            <div className="flex justify-between">
              <p className="font-bold">Slot Tim</p>
              <p className="font-bold">
                55/<span className="text-color-grey">64</span>
              </p>
            </div>
            {/* <div className="progress-bar mt-2">
              <div
                className="progress-bar-inner-bar"
                style={{
                  width: `${(50 / 100) * 100}%`,
                }}
              />
            </div> */}
          </div>
          <div className="mt-4">
            <div className="grid grid-cols-2 gap-x-1">
              <div
                className="text-center p-2"
                style={{
                  background: "#161B28",
                  borderRadius: "10px 0px 0px 10px",
                }}
              >
                <p className="text-xs font-bold mb-2">Pendaftaran</p>
                <p className="text-color-grey text-xs mb-1">April 30, 2022</p>
                <AiOutlineArrowDown className="m-auto" />
                <p className="text-color-grey text-xs mt-1">May 2, 2022</p>
              </div>
              <div
                className="text-center p-2"
                style={{
                  background: "#161B28",
                  borderRadius: "0px 10px 10px 0px",
                }}
              >
                <p className="text-xs font-bold mb-2">Jadwal Turnamen</p>
                <p className="text-color-grey text-xs mb-1">
                  September 5, 2022
                </p>
                <AiOutlineArrowDown className="m-auto" />
                <p className="text-color-grey text-xs mt-1">
                  September 30, 2022
                </p>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between">
              <p className="text-xs font-bold">Biaya Pendaftaran</p>
              <p className="text-xs font-bold">Gratis</p>
            </div>
            <div className="flex justify-between mt-2">
              <p className="text-xs font-bold">Total Hadiah</p>
              <p className="text-xs font-bold">Rp. 5.000.000</p>
            </div>
          </div>
          <div className="mt-4">
            <div class="flex gap-x-2">
              <div class="flex-none">
                <button
                  className="btn btn-outline-white"
                  style={{ padding: "5px 20px" }}
                >
                  Detail
                </button>
              </div>
              <div class="flex-1">
                <button
                  className="btn btn-light-green w-full"
                  style={{ padding: "5px 20px" }}
                  disabled
                >
                  <span className="font-semibold">Dibuka</span> 05:11:20
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
