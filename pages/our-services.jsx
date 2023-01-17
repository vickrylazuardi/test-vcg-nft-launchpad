import Link from "next/link";
import React from "react";
import { IoRocketOutline } from "react-icons/io5";
import useMetaMask from "../wallet/hook";
import { useRouter } from "next/router";

export default function OurService(props) {
  const router = useRouter();

  const { account } = useMetaMask();

  return (
    <div className="global-container">
      <div className="container mx-auto">
        <div className="navigation-container flex items-center">
          <Link href="/">
            <a className="flex items-center">
              <img src="/images/icon-home.png" alt="" />
              <p className="mx-3 text-sm font-semibold">Launchpad</p>
            </a>
          </Link>
          <img src="/images/svg/arrow-gray.svg" alt="" />
          <p className="ml-3 text-sm font-bold">Our Services</p>
        </div>
        <div className="mt-4">
          <p className="text-xs font-semibold text-color-grey">
            VCGamers Launchpad
          </p>
          <h2 className="text-2xl font-bold">Services & Benefit</h2>
          <img
            src="/images/vicimon-rocket.png"
            className="mx-auto my-5"
            alt=""
          />
        </div>
        <div className="card-dark">
          <div className="flex flex-wrap justify-center">
            <div className="p-8 text-center basis-1/3 md:basis-1/2 sm:basis-full">
              <p className="text-lg font-bold">Engage your Users</p>
              <p className="text-sm font-seminbold text-color-grey">
                Gain direct access to targeted and loyal community who love to
                try new games
              </p>
              <div className="grid grid-cols-2 gap-x-3 text-center">
                <div className="mt-8">
                  <img
                    src="/images/svg/icon-tv-rocket-orange.svg"
                    className="m-auto"
                    alt=""
                  />
                  <p className="text-sm font-semibold mt-3">Launchpad</p>
                  <p className="text-xs font-semibold text-color-grey mt-2">
                    Crowd-Funding Web3 Platform
                  </p>
                </div>
                <div className="mt-8">
                  <img
                    src="/images/svg/icon-vctropy-orange.svg"
                    className="m-auto"
                    alt=""
                  />
                  <p className="text-sm font-semibold mt-3">Arena</p>
                  <p className="text-xs font-semibold text-color-grey mt-2">
                    Esport Tournament Platform
                  </p>
                </div>
              </div>
            </div>
            <div className="p-8 text-center basis-1/3 md:basis-1/2 sm:basis-full">
              <p className="text-lg font-bold">In-game Commerce</p>
              <p className="text-sm font-seminbold text-color-grey">
                Gain royalties from users’ transactions on your in-game assets
              </p>
              <div className="grid grid-cols-1 gap-x-3 text-center">
                <div className="mt-8">
                  <img
                    src="/images/svg/icon-nft-orange.svg"
                    className="m-auto"
                    alt=""
                  />
                  <p className="text-sm font-semibold mt-3">Marketplace 3.0</p>
                  <p className="text-xs font-semibold text-color-grey mt-2">
                    Buy and Sell Your NFT
                  </p>
                </div>
              </div>
            </div>
            <div className="p-8 text-center basis-1/3 md:basis-1/2 sm:basis-full">
              <p className="text-lg font-bold">Seamless Web3 Onboarding</p>
              <p className="text-sm font-seminbold text-color-grey">
                Utilize the endless benefits of blockchain in a simple and
                easy-to-use ways for your game
              </p>
              <div className="grid grid-cols-2 gap-x-3 text-center">
                <div className="mt-8">
                  <img
                    src="/images/svg/icon-creditcard-orange.svg"
                    className="m-auto"
                    alt=""
                  />
                  <p className="text-sm font-semibold mt-3">Payment System</p>
                  <p className="text-xs font-semibold text-color-grey mt-2">
                    Using FIAT or Crypto
                  </p>
                </div>
                <div className="mt-8">
                  <img
                    src="/images/svg/icon-wallet-orange.svg"
                    className="m-auto"
                    alt=""
                  />
                  <p className="text-sm font-semibold mt-3">VCGamers Wallet</p>
                  <p className="text-xs font-semibold text-color-grey mt-2">
                    Auto generate wallet
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 text-center">
          <p className="text-lg font-bold mb-4">Our Statistics</p>
          <div className="grid gap-x-4 grid-cols-3 md:gap-x-2">
            <div className="card-dark p-20">
              <p
                className="text-2xl font-bold mb-1 md:text-lg"
                style={{ color: "#E28058" }}
              >
                500K
              </p>
              <p className="text-sm font-semibold text-color-grey md:text-xs">
                User Register
              </p>
            </div>
            <div className="card-dark p-20">
              <p
                className="text-2xl font-bold mb-1 md:text-lg"
                style={{ color: "#E28058" }}
              >
                10,4M+
              </p>
              <p className="text-sm font-semibold text-color-grey md:text-xs">
                Web Impression
              </p>
            </div>
            <div className="card-dark p-20">
              <p
                className="text-2xl font-bold mb-1 md:text-lg"
                style={{ color: "#E28058" }}
              >
                4
              </p>
              <p className="text-sm font-semibold text-color-grey md:text-xs">
                Project Onboard
              </p>
            </div>
          </div>
        </div>
        <div className="mt-10 text-center">
          <p className="text-lg font-bold mb-4">Our Service</p>
          <div className="grid gap-4 grid-cols-3 md:grid-cols-2">
            <div className="card-dark p-20">
              <img
                src="/images/our-service-img-1.png"
                className="m-auto"
                alt=""
              />
              <p className="text-base font-semibold mt-5 md:text-sm">
                NFT Creation
              </p>
              <p className="text-sm font-semibold text-color-grey mt-2 md:text-xs">
                We provide everything you need to create and sell your own NFTs,
                including design support and smart contract development.
              </p>
            </div>
            <div className="card-dark p-20">
              <img
                src="/images/our-service-img-2.png"
                className="m-auto"
                alt=""
              />
              <p className="text-base font-semibold mt-5 md:text-sm">
                Community Building
              </p>
              <p className="text-sm font-semibold text-color-grey mt-2 md:text-xs">
                Building a strong community in Web3 is essential for any
                successful project. We offer a range of tools and resources to
                help you connect with your audience and grow your community.
              </p>
            </div>
            <div className="card-dark p-20">
              <img
                src="/images/our-service-img-3.png"
                className="m-auto"
                alt=""
              />
              <p className="text-base font-semibold mt-5 md:text-sm">KYC</p>
              <p className="text-sm font-semibold text-color-grey mt-2 md:text-xs">
                Our KYC service ensures that you are in compliance with
                regulations and can securely onboard new users.
              </p>
            </div>
            <div className="card-dark p-20">
              <img
                src="/images/our-service-img-4.png"
                className="m-auto"
                alt=""
              />
              <p className="text-base font-semibold mt-5 md:text-sm">UAT</p>
              <p className="text-sm font-semibold text-color-grey mt-2 md:text-xs">
                Our UAT service helps you test your project in a live
                environment to ensure it is ready for launch.
              </p>
            </div>
            <div className="card-dark p-20">
              <img
                src="/images/our-service-img-5.png"
                className="m-auto"
                alt=""
              />
              <p className="text-base font-semibold mt-5 md:text-sm">
                Smart Contract Creation
              </p>
              <p className="text-sm font-semibold text-color-grey mt-2 md:text-xs">
                Our team of experts can help you create custom smart contracts
                tailored to your specific needs
              </p>
            </div>
            <div className="card-dark p-20">
              <img
                src="/images/our-service-img-6.png"
                className="m-auto"
                alt=""
              />
              <p className="text-base font-semibold mt-5 md:text-sm">
                Close & Alpha Tests
              </p>
              <p className="text-sm font-semibold text-color-grey mt-2 md:text-xs">
                We offer a range of testing services to help you ensure your
                project is ready for launch.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-16 text-center">
          <p className="text-lg font-bold mb-4">
            We offer you endless possibilities to benefit fromblockchain and
            gaming community
          </p>
          <div className="md:flex md:flex-wrap md:flex-col-reverse">
            <a href="mailto:partner@vcgamers.com">
              <button
                className="btn btn-outline-orange-light mt-2 mr-3 md:w-full"
                style={{ padding: "10px 16px" }}
              >
                Connect with Us
              </button>
            </a>
            <button
              className="btn btn-orange-light mt-2 md:w-full"
              style={{ padding: "10px 16px" }}
              onClick={() => {
                if (account) {
                  router.push("/forms/new-project");
                } else {
                  router.push("/connect-wallet");
                }
              }}
            >
              <IoRocketOutline className="inline text-2xl mr-1" /> Launch
              Project Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
